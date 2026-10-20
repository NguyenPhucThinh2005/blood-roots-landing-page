import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

type Props = {
  /** Radius of the lit circle in px. */
  radius?: number
}

// A dark sheet, three times its parent's size, with a transparent hole in the middle. Only its transform
// moves (gsap.quickTo), so it stays on the compositor. Content under it is always in the DOM.
// Fine pointer: the hole follows the mouse. Touch: it follows a held finger and otherwise wanders.
// Reduced motion: the sheet is mostly lifted and does not move.
// The light moves over the parent element (read from the DOM: a parent's ref is not attached yet when
// this child's layout effect runs).
// The light's falloff around the lit circle (a light effect, not a gradient fill; docs/art-direction.md).
const falloff = (r: number) =>
  `radial-gradient(circle at center, transparent 0, transparent ${r * 0.55}px, rgb(7 5 5 / 0.55) ${r * 0.85}px, rgb(7 5 5) ${r * 1.25}px)` // taste-skill-ignore

export function Flashlight({ radius = 190 }: Props) {
  const sheet = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = sheet.current
      const box = el?.parentElement
      if (!el || !box) return
      const mm = gsap.matchMedia()

      mm.add(
        {
          fine: '(pointer: fine) and (prefers-reduced-motion: no-preference)',
          coarse: '(pointer: coarse) and (prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { fine, coarse, reduced } = ctx.conditions as Record<string, boolean>
          if (reduced) {
            gsap.set(el, { xPercent: -50, yPercent: -50, left: '50%', top: '50%', opacity: 0.35 })
            return
          }
          gsap.set(el, { xPercent: -50, yPercent: -50, left: 0, top: 0, opacity: coarse ? 0.82 : 0.94 })
          const toX = gsap.quickTo(el, 'x', { duration: fine ? 0.45 : 0.7, ease: 'power3' })
          const toY = gsap.quickTo(el, 'y', { duration: fine ? 0.45 : 0.7, ease: 'power3' })
          const place = (x: number, y: number) => {
            toX(x)
            toY(y)
          }
          const rect = () => box.getBoundingClientRect()
          place(rect().width * 0.35, rect().height * 0.55)

          const onMove = (e: PointerEvent) => {
            if (coarse && e.buttons === 0 && e.pointerType === 'touch') return
            const r = rect()
            place(e.clientX - r.left, e.clientY - r.top)
          }
          box.addEventListener('pointermove', onMove)
          box.addEventListener('pointerdown', onMove)

          // On touch, the light wanders across the wall when no finger is down.
          let wander: gsap.core.Tween | undefined
          if (coarse) {
            const state = { p: 0 }
            wander = gsap.to(state, {
              p: 1,
              duration: 14,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              onUpdate: () => {
                const r = rect()
                place(r.width * (0.15 + 0.7 * state.p), r.height * (0.62 + 0.12 * Math.sin(state.p * 9)))
              },
            })
            const pause = () => wander?.pause()
            const resume = () => wander?.resume()
            box.addEventListener('pointerdown', pause)
            box.addEventListener('pointerup', resume)
            box.addEventListener('pointercancel', resume)
          }

          return () => {
            box.removeEventListener('pointermove', onMove)
            box.removeEventListener('pointerdown', onMove)
            wander?.kill()
          }
        },
      )
    },
    { dependencies: [radius] },
  )

  return (
    <div
      ref={sheet}
      aria-hidden
      className="pointer-events-none absolute z-10 h-[300%] w-[300%] will-change-transform"
      style={{ background: falloff(radius) }}
    />
  )
}
