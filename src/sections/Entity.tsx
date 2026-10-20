import { useMemo, useRef, useState } from 'react'
import { btsImages, chapterImages, puzzleImage } from '../assets/media'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'
import { gsap, useGSAP } from '../lib/gsap'
import { generateRoots } from '../lib/roots'

const PREVIEWS = [puzzleImage, btsImages.corridorRed, chapterImages.classroom, chapterImages.count]

// The colour chapter: the ground turns to dried blood, roots grow in with the scroll, and the
// four ways the entity works are an index whose rows open a picture beside them.
export function Entity() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const roots = useMemo(() => generateRoots(11), [])
  useReveal(root)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-root]',
          { drawSVG: '0%' },
          {
            drawSVG: '100%',
            ease: 'none',
            stagger: { each: 0.02, from: 'start' },
            scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'bottom 60%', scrub: 0.6 },
          },
        )
      })
    },
    { scope: root },
  )

  // "Index with preview, anchored to the row": the frame follows the row, never the pointer.
  const show = (i: number, row: HTMLElement) => {
    const f = frame.current
    const l = list.current
    if (!f || !l || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const y = row.offsetTop + row.offsetHeight / 2 - f.offsetHeight / 2
    const max = l.offsetHeight - f.offsetHeight
    const opening = active === null
    if (opening) f.style.transitionProperty = 'clip-path'
    f.style.transform = `translateY(${Math.min(Math.max(0, y), Math.max(0, max))}px)`
    if (opening) {
      f.getBoundingClientRect()
      f.style.transitionProperty = ''
    }
    setActive(i)
  }

  return (
    <section
      ref={root}
      id="entity"
      aria-labelledby="entity-title"
      className="page-x relative overflow-hidden bg-blood-900 py-24 md:py-[180px]"
    >
      <svg
        aria-hidden
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full text-blood-500/45"
      >
        {roots.map((r, i) => (
          <path
            key={i}
            data-root
            d={r.d}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={Math.max(0.8, r.width * 0.5)}
          />
        ))}
      </svg>

      <div className="relative">
        <h2 id="entity-title" data-reveal className="text-[15vw] md:text-[clamp(64px,8.4vw,150px)]">
          {t.entity.title}
        </h2>
        <p data-reveal className="mt-6 max-w-[32ch] text-[22px] leading-[1.35] md:mt-8 md:text-[32px]">
          {t.entity.statement}
        </p>

        <div className="relative mt-16 md:mt-24" onPointerLeave={() => setActive(null)}>
          <ul ref={list} className="md:max-w-[62%]">
            {t.entity.rows.map((r, i) => (
              <li key={r.name} data-reveal>
                <div
                  tabIndex={0}
                  onPointerEnter={(e) => show(i, e.currentTarget)}
                  onFocus={(e) => show(i, e.currentTarget)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    'flex flex-wrap items-baseline justify-between gap-x-6 py-3 outline-none transition-opacity duration-200 focus-visible:underline md:py-4',
                    active !== null && active !== i && 'md:opacity-40',
                  )}
                >
                  <img
                    src={PREVIEWS[i]}
                    alt=""
                    loading="lazy"
                    className="mb-3 aspect-[4/3] w-full object-cover md:hidden"
                  />
                  <span className="font-display text-[34px] leading-none font-bold tracking-[-0.035em] md:text-step-head">
                    {r.name}
                  </span>
                  <span className="text-step-body text-bone/85">{r.detail}</span>
                </div>
              </li>
            ))}
          </ul>

          <div
            ref={frame}
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-0 right-0 hidden aspect-[4/3] w-[30%] [transition:clip-path_320ms_var(--ease-out),transform_360ms_var(--ease-out)] motion-reduce:transition-none md:block',
              active === null ? '[clip-path:inset(100%_0_0_0)]' : '[clip-path:inset(0)]',
            )}
          >
            {PREVIEWS.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity duration-[240ms]',
                  active === i ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
