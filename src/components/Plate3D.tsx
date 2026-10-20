import { Suspense, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'
import { AltarPlate, hasWebGL, ShelfPlate } from '../webgl/lazy'

const PLATES = { shelf: ShelfPlate, altar: AltarPlate }

type Props = {
  scene: keyof typeof PLATES
  label: string
  /** Sizing classes for the plate box (aspect ratio, width). */
  className?: string
  /** Still image shown without WebGL. */
  fallback?: string
}

// A "tipped-in plate": a dark rectangle on the page holding a live render of the team's models.
// Without WebGL it shows the fallback still; under reduced motion the camera and flames hold still.
export function Plate3D({ scene, label, className, fallback }: Props) {
  const still = useReducedMotion()
  const [webgl] = useState(hasWebGL)
  const Scene = PLATES[scene]
  const box = cn('relative block bg-[#0b0707]', className)

  if (!webgl) {
    return fallback ? (
      <img src={fallback} alt={label} className={cn(box, 'object-cover')} loading="lazy" />
    ) : (
      <div role="img" aria-label={label} className={box} />
    )
  }

  return (
    <Suspense fallback={<div role="img" aria-label={label} className={box} />}>
      <Scene className={box} still={still} label={label} />
    </Suspense>
  )
}
