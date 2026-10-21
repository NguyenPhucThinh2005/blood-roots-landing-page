import { useRef, useState } from 'react'
import { btsImages, chapterImages, posters, videos } from '../assets/media'
import { LoopVideo } from '../components/LoopVideo'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

type Media = { img: string } | { video: string; poster: string }

// One picture or clip per feature, in the order of features.items.
const MEDIA: Media[] = [
  { img: chapterImages.pieces },
  { img: btsImages.house },
  { video: videos.jigsaw, poster: posters.jigsaw },
  { video: videos.flashlight, poster: posters.flashlight },
]

function Picture({
  media,
  alt,
  active,
  className,
}: {
  media: Media
  alt: string
  active: boolean
  className?: string
}) {
  return 'img' in media ? (
    <img src={media.img} alt={alt} loading="lazy" className={className} />
  ) : (
    <LoopVideo src={media.video} poster={media.poster} label={alt} active={active} className={className} />
  )
}

// "Held picture, passing captions": the footage holds on a sticky stage while the four features
// pass beside it, one screen each, and the stage swaps to each feature's own footage. Sticky is plain
// CSS (Lenis scrolls the document itself), so there is no pin spacer to shift other triggers.
// Reduced motion: a plain list, each feature with its picture.
export function Features() {
  const t = useT()
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const items = t.features.items
  useReveal(root)

  useGSAP(
    () => {
      if (reduced) return
      const steps = root.current?.querySelectorAll<HTMLElement>('[data-step]') ?? []
      const mm = gsap.matchMedia()
      // Desktop: the caption beside the stage's middle wins. Phone: the stage holds the top 40%, so
      // the caption entering the lower part of the screen wins.
      mm.add({ wide: '(min-width: 48rem)', narrow: '(max-width: 47.99rem)' }, (ctx) => {
        const line = ctx.conditions?.wide ? '55%' : '80%'
        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: `top ${line}`,
            end: `bottom ${line}`,
            onToggle: ({ isActive }) => isActive && setActive(i),
          })
        })
      })
    },
    { scope: root, dependencies: [reduced] },
  )

  return (
    <section
      ref={root}
      id="features"
      aria-labelledby="features-title"
      className="bg-soot pt-24 pb-12 md:pt-[160px] md:pb-[120px]"
    >
      <div className="page-x md:grid md:grid-cols-12 md:gap-8">
        <h2 id="features-title" data-reveal className="text-step-head md:col-span-7">
          {t.features.title}
        </h2>
        <p
          data-reveal
          className="mt-6 max-w-[40ch] text-step-lead leading-[1.4] md:col-span-4 md:col-start-9 md:mt-0 md:self-end"
        >
          {t.features.intro}
        </p>
      </div>

      {reduced ? (
        <ol className="page-x mt-14 grid gap-14 md:grid-cols-2 md:gap-x-8">
          {items.map((f, i) => (
            <li key={f.name}>
              <Picture
                media={MEDIA[i]}
                alt={f.alt}
                active={false}
                className="aspect-[4/3] w-full object-cover"
              />
              <h3 className="mt-5 text-step-title">{f.name}</h3>
              <p className="mt-3 max-w-[44ch]">{f.text}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="page-x relative mt-10 md:mt-0 md:grid md:grid-cols-12 md:gap-8">
          {/* The held stage. On phones it sticks under the header, above the passing captions. */}
          <div className="sticky top-14 z-10 -mx-(--margin) bg-soot px-(--margin) pt-2 pb-4 md:top-0 md:col-span-7 md:mx-0 md:flex md:h-svh md:items-center md:self-start md:p-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-void max-md:aspect-auto max-md:h-[40svh] max-md:max-h-[40svh]">
              {items.map((f, i) => (
                <Picture
                  key={f.name}
                  media={MEDIA[i]}
                  alt={f.alt}
                  active={active === i}
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover transition-[opacity,scale] duration-700 ease-(--ease-out)',
                    active === i ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0',
                  )}
                />
              ))}
            </div>
          </div>

          <ol className="md:col-span-4 md:col-start-9">
            {items.map((f, i) => (
              <li
                key={f.name}
                data-step
                className="flex min-h-[62svh] flex-col justify-center py-10 md:min-h-svh md:py-0"
              >
                <p className="font-display text-step-small font-bold tabular-nums">
                  {t.features.count(i + 1, items.length)}
                </p>
                <h3
                  className={cn(
                    'mt-3 text-step-title transition-opacity duration-500',
                    active === i ? 'opacity-100' : 'md:opacity-45',
                  )}
                >
                  {f.name}
                </h3>
                <p className="mt-4 max-w-[36ch] text-step-lead leading-[1.4]">{f.text}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
