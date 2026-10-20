import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = { src: string; poster: string; className?: string; label?: string }

// Muted gameplay loop that only plays while on screen (and never under reduced motion,
// where the poster frame stands in).
export function LoopVideo({ src, poster, className, label }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (reduced) {
      v.pause()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduced])

  return (
    <video
      ref={video}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
