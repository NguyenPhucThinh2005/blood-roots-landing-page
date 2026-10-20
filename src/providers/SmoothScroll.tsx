import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger and Lenis share one frame loop.
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }}>
      <GsapSync />
      {children}
    </ReactLenis>
  )
}

function GsapSync() {
  const lenis = useLenis(ScrollTrigger.update)

  useEffect(() => {
    if (!lenis) return
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [lenis])

  return null
}
