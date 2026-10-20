import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'

// Section entrance (taste-skill motion §10): children marked [data-reveal] rise 24px with opacity,
// in DOM order, 70ms apart, once, when the section's top reaches 88% of the viewport.
// Content is never hidden without motion support: the from-state only exists inside the media query.
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current)
        if (!targets.length) return
        gsap.set(targets, { autoAlpha: 0, y: 24 })
        ScrollTrigger.batch(targets, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.07 }),
        })
      })
    },
    { scope },
  )
}
