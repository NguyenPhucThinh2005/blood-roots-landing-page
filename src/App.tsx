import { lazy, Suspense, useRef } from 'react'
import { useSound } from './audio/SoundProvider'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useLanguage } from './i18n/LanguageProvider'
import { gsap, SplitText, useGSAP } from './lib/gsap'

const Scene = lazy(() => import('./webgl/Scene'))

// Foundation placeholder only: verifies Lenis, GSAP/SplitText/ScrollTrigger, i18n, sound and lazy WebGL.
// Real sections go in src/sections once the art direction is decided.
export default function App() {
  const { t, toggleLang } = useLanguage()
  const sound = useSound()
  const reducedMotion = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create('[data-split]', { type: 'words,chars', mask: 'chars' })
        gsap.from(split.chars, { yPercent: 110, stagger: 0.04, duration: 1.4, delay: 0.2 })
        gsap.from('[data-fade]', { autoAlpha: 0, y: 24, delay: 0.9 })
        gsap.to('[data-scroll-test]', {
          xPercent: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-scroll-test]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: root, dependencies: [t], revertOnUpdate: true },
  )

  return (
    <div ref={root}>
      {!reducedMotion && (
        <div className="fixed inset-0 -z-10" aria-hidden>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>
      )}

      <header className="fixed inset-x-0 top-0 z-10 flex items-center justify-between p-6 text-sm tracking-widest uppercase">
        <span>{t.brand.studio}</span>
        <div className="flex gap-4">
          <button type="button" onClick={sound.toggle} className="hover:text-blood-300">
            {sound.enabled ? t.ui.soundOff : t.ui.soundOn}
          </button>
          <button type="button" onClick={toggleLang} className="hover:text-blood-300">
            {t.ui.switchLanguage}
          </button>
        </div>
      </header>

      <main>
        <section className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
          <h1
            data-split
            className="text-[clamp(3rem,14vw,12rem)] leading-none font-extrabold text-blood-500 uppercase"
          >
            {t.brand.game}
          </h1>
          <p data-fade className="max-w-xl text-lg text-bone/80">
            {t.hero.tagline}
          </p>
          <p data-fade className="text-xs tracking-[0.4em] text-blood-300 uppercase">
            {t.hero.status}
          </p>
        </section>

        <section className="flex min-h-svh items-center overflow-hidden">
          <p data-scroll-test className="text-[20vw] font-extrabold whitespace-nowrap text-bone/10 uppercase">
            {t.brand.game} — {t.brand.studio}
          </p>
        </section>
      </main>
    </div>
  )
}
