import { AdaptiveDpr, PerformanceMonitor, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

// One fixed, transparent WebGL canvas for the whole page. Every 3D "plate" is a drei <View> that
// tracks a box in the DOM and is scissored into this canvas, so mobile only ever holds one context.
// Loaded lazily from App, so three.js stays out of the initial bundle.
export default function Stage() {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      eventSource={document.getElementById('root') ?? undefined}
      className="pointer-events-none !fixed inset-0 z-30"
      shadows
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))}
      />
      <AdaptiveDpr pixelated />
      <View.Port />
    </Canvas>
  )
}
