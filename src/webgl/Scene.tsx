import { Float, PerformanceMonitor, StatsGl } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { useState } from 'react'
import { Vector2 } from 'three'

const aberrationOffset = new Vector2(0.0012, 0.0008)

// Loaded via React.lazy in App so three.js lands in its own chunk.
// Placeholder scene that proves the R3F + postprocessing pipeline; replace once art direction is set.
export default function Scene() {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(Math.min(2, window.devicePixelRatio))}
      />
      <color attach="background" args={['#070505']} />
      <fog attach="fog" args={['#070505', 4, 9]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[2, 2, 3]} intensity={40} color="#d61f1f" />

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh>
          <torusKnotGeometry args={[1, 0.28, 220, 32]} />
          <meshStandardMaterial color="#2a0a0a" roughness={0.35} metalness={0.6} />
        </mesh>
      </Float>

      <EffectComposer multisampling={0}>
        <ChromaticAberration offset={aberrationOffset} />
        <Noise opacity={0.12} />
        <Vignette offset={0.25} darkness={0.9} />
      </EffectComposer>

      {import.meta.env.DEV && <StatsGl className="!right-0 !left-auto" />}
    </Canvas>
  )
}
