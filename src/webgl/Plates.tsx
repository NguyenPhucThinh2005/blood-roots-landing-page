import { ContactShadows, Environment, Lightformer, PerspectiveCamera, View } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, type ReactNode } from 'react'
import { MathUtils, type PerspectiveCamera as Camera, type PointLight } from 'three'
import { Prop } from './Prop'

type PlateProps = { className?: string; still?: boolean; label: string }

// A plate is a DOM box (sized by className) whose contents are drawn into the shared canvas.
function Plate({ className, label, children }: { className?: string; label: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className={className}>
      <View className="absolute inset-0">{children}</View>
    </div>
  )
}

/** Camera that drifts a little toward the pointer. `still` (reduced motion) keeps it fixed. */
function DriftCamera({ position, target, still, fov = 32 }: {
  position: [number, number, number]
  target: [number, number, number]
  still?: boolean
  fov?: number
}) {
  const cam = useRef<Camera>(null)
  useFrame((state, delta) => {
    const c = cam.current
    if (!c) return
    const px = still ? 0 : state.pointer.x
    const py = still ? 0 : state.pointer.y
    c.position.x = MathUtils.damp(c.position.x, position[0] + px * 0.18, 2.5, delta)
    c.position.y = MathUtils.damp(c.position.y, position[1] + py * 0.08, 2.5, delta)
    c.lookAt(...target)
  })
  return <PerspectiveCamera ref={cam} makeDefault position={position} fov={fov} near={0.05} far={30} />
}

/** A flame: warm point light whose intensity wavers like a wick (static when `still`). */
function Flame({ position, color, intensity, still, seed = 0 }: {
  position: [number, number, number]
  color: string
  intensity: number
  still?: boolean
  seed?: number
}) {
  const light = useRef<PointLight>(null)
  useFrame(({ clock }) => {
    if (!light.current || still) return
    const t = clock.elapsedTime + seed
    // Sum of slow sines: a soft flicker well under 3 changes a second (WCAG 2.3.1).
    const n = Math.sin(t * 2.1) * 0.5 + Math.sin(t * 3.7 + 1.3) * 0.3 + Math.sin(t * 1.3 + 2.1) * 0.2
    light.current.intensity = intensity * (0.86 + n * 0.12)
  })
  return <pointLight ref={light} position={position} color={color} intensity={intensity} distance={4} decay={2} castShadow />
}

function DimRoom() {
  return (
    <Environment resolution={64} environmentIntensity={0.18}>
      <Lightformer form="rect" intensity={2} color="#ffd9b0" position={[0, 3, 2]} scale={[4, 1, 1]} />
      <Lightformer form="rect" intensity={0.6} color="#7a1010" position={[-3, 1, -1]} scale={[2, 2, 1]} />
    </Environment>
  )
}

/** The family grocery shelf: products the team modelled, under one weak bulb. */
export function ShelfPlate({ className, still, label }: PlateProps) {
  return (
    <Plate className={className} label={label}>
      <color attach="background" args={['#120d0c']} />
      <DriftCamera position={[0, 0.62, 2.35]} target={[0, 0.4, 0]} still={still} />
      <DimRoom />
      <ambientLight intensity={0.25} />
      <Flame position={[0.3, 1.5, 1]} color="#ffc98a" intensity={9} still={still} />
      <pointLight position={[-1.4, 0.8, 1.2]} color="#6a1a12" intensity={2.5} distance={4} />

      {/* the shelf: a dark wooden plank and the wall behind it */}
      <mesh position={[0, -0.03, 0]} receiveShadow>
        <boxGeometry args={[2.6, 0.06, 0.62]} />
        <meshStandardMaterial color="#3a2618" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.8, -0.32]} receiveShadow>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial color="#2c3d3f" roughness={1} />
      </mesh>

      <Prop name="NuocMam" height={0.5} position={[-0.78, 0, 0.02]} rotation={[0, 0.3, 0]} />
      <Prop name="TuongOt" height={0.42} position={[-0.32, 0, 0.1]} rotation={[0, -0.2, 0]} />
      <Prop name="Muoi" height={0.26} position={[0.12, 0, 0.14]} />
      <Prop name="chennuoc" height={0.12} position={[0.48, 0, 0.2]} />
      <Prop name="BanhMi" height={0.2} position={[0.86, 0, 0.04]} rotation={[0, -0.6, 0]} />
    </Plate>
  )
}

/** The altar: portrait, lamp, incense burner and chrysanthemums on the altar cabinet. */
export function AltarPlate({ className, still, label }: PlateProps) {
  return (
    <Plate className={className} label={label}>
      <color attach="background" args={['#0b0707']} />
      <fog attach="fog" args={['#0b0707', 4, 8]} />
      <DriftCamera position={[0, 1.25, 3.4]} target={[0, 1.05, 0]} still={still} fov={30} />
      <DimRoom />
      <ambientLight intensity={0.05} />
      <Flame position={[-0.15, 1.75, 0.55]} color="#ff3a1e" intensity={3.2} still={still} />
      <Flame position={[0.35, 1.7, 0.6]} color="#ffb067" intensity={2.4} still={still} seed={4} />

      <Prop name="tutho" height={1.2} position={[0, 0, 0]} />
      <Prop name="AnhTho" height={0.52} position={[0, 1.2, -0.1]} />
      <Prop name="DenTho" height={0.26} position={[-0.42, 1.2, 0.05]} />
      <Prop name="luhuong" height={0.16} position={[0.02, 1.2, 0.18]} />
      <Prop name="HoaCuc" height={0.62} position={[0.5, 1.2, -0.02]} />

      <ContactShadows position={[0, 0.001, 0]} opacity={0.6} scale={4} blur={2.4} far={1.5} />
    </Plate>
  )
}
