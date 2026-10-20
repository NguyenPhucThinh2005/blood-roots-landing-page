import { useRef } from 'react'
import { logos } from '../assets/media'
import { LangToggle } from '../components/Controls'
import { Cta } from '../components/Cta'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'
import { gsap, useGSAP } from '../lib/gsap'

type Folder = {
  id: 'making' | 'chapter' | 'entity' | 'wall' | 'premise'
  band: string
  ink: string
  tabX: string
}

// Back to front. Each folder takes the ground colour of the section it opens (docs/art-direction.md).
const FOLDERS: Folder[] = [
  { id: 'making', band: 'bg-[#3b2f2c]', ink: 'text-bone', tabX: 'left-[62%] md:left-[70%]' },
  { id: 'chapter', band: 'bg-soot', ink: 'text-bone', tabX: 'left-[34%] md:left-[50%]' },
  { id: 'entity', band: 'bg-blood-900', ink: 'text-bone', tabX: 'left-[6%] md:left-[30%]' },
  { id: 'wall', band: 'bg-bone-dim', ink: 'text-void', tabX: 'left-[48%] md:left-[11%]' },
  { id: 'premise', band: 'bg-bone', ink: 'text-void', tabX: 'left-[8%] md:left-[3%]' },
]

export function Hero() {
  const t = useT()
  const root = useRef<HTMLElement>(null)

  // Load sequence: settled by ~1.2s, four elements (logo, sentence, folders, action).
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('[data-hero-logo]', { clipPath: 'inset(0 0 100% 0)', yPercent: 6, duration: 1.1 })
          .from('[data-hero-tagline]', { autoAlpha: 0, y: 16, duration: 0.8 }, 0.25)
          .from('[data-folder]', { yPercent: 18, duration: 1, stagger: 0.06 }, 0.15)
          .from('[data-hero-cta]', { autoAlpha: 0, y: 12, duration: 0.6 }, 0.65)
      })
    },
    { scope: root },
  )

  return (
    <header ref={root} id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-void">
      <a href="#premise" className="sr-only-focusable absolute top-2 left-2 z-20 bg-bone px-3 py-2 text-void">
        {t.ui.skip}
      </a>

      <div className="page-x grid grid-cols-3 items-center pt-5 font-display text-step-small font-bold md:pt-6">
        <span />
        <span className="justify-self-center tracking-tight">{t.brand.studio}</span>
        <LangToggle className="justify-self-end" />
      </div>

      <div className="page-x flex flex-col items-center pt-[clamp(28px,6svh,72px)] text-center">
        <h1 className="w-[min(92vw,1040px)] md:w-[min(64vw,1040px)]">
          <img
            data-hero-logo
            src={logos.bloodRoot}
            alt={t.brand.game}
            width={1400}
            height={450}
            fetchPriority="high"
            className="h-auto w-full"
          />
        </h1>
        <p data-hero-tagline className="mt-5 max-w-[46ch] text-step-lead leading-[1.4] text-bone/90 md:mt-6">
          {t.hero.tagline}
        </p>
      </div>

      {/* The folder stack: five bands, each a link to its section. */}
      <nav aria-label={t.brand.game} className="relative mt-10 min-h-[46svh] flex-1 md:mt-12">
        {FOLDERS.map((f, i) => {
          const front = i === FOLDERS.length - 1
          return (
            <div
              key={f.id}
              data-folder
              className="absolute inset-x-0 bottom-0 mx-auto w-(--folder-w)"
              style={{ top: `calc(${i} * var(--folder-step))` }}
            >
              <a
                href={`#${f.id}`}
                className={cn(
                  'tab-shape absolute -top-8 flex h-8 items-center px-6 font-display text-step-small font-bold transition-transform duration-300 ease-(--ease-out) hover:-translate-y-1.5 focus-visible:-translate-y-1.5 md:-top-10 md:h-10 md:px-8 md:text-step-body',
                  f.band,
                  f.ink,
                  f.tabX,
                )}
              >
                {t.hero.tabs[f.id]}
              </a>
              <div className={cn('h-full', f.band)}>
                {front && (
                  <div className="p-6 md:p-8">
                    <span data-hero-cta className="inline-block w-full md:w-auto">
                      <Cta className="w-full md:w-auto" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </nav>
    </header>
  )
}
