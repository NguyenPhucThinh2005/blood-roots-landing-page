import { lazy } from 'react'

// three.js, R3F and drei only load through these, so they land in their own chunk after first paint.
export const Stage = lazy(() => import('./Stage'))
export const ShelfPlate = lazy(() => import('./Plates').then((m) => ({ default: m.ShelfPlate })))
export const AltarPlate = lazy(() => import('./Plates').then((m) => ({ default: m.AltarPlate })))

export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
