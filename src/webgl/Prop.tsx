import { useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'
import { useMemo } from 'react'
import { Box3, Group, Mesh, Vector3 } from 'three'

export const modelUrl = (name: string) => `/media/models/${name}.glb`

type PropProps = Omit<ThreeElements['group'], 'children'> & {
  /** File name in public/media/models, without extension */
  name: string
  /** Target height in scene units; the model is scaled to it and stood on y = 0, centred on x/z. */
  height: number
}

// The team's models come from different Blender files at different scales, so each one is measured
// at load and normalised instead of hand-tuning a scale per file.
export function Prop({ name, height, ...group }: PropProps) {
  const { scene } = useGLTF(modelUrl(name), false, true)

  const object = useMemo(() => {
    const model = scene.clone(true)
    const box = new Box3().setFromObject(model)
    const size = box.getSize(new Vector3())
    const centre = box.getCenter(new Vector3())
    model.position.set(-centre.x, -box.min.y, -centre.z)
    model.traverse((child) => {
      if (child instanceof Mesh) child.castShadow = child.receiveShadow = true
    })
    const wrapper = new Group()
    wrapper.add(model)
    wrapper.scale.setScalar(height / size.y)
    return wrapper
  }, [scene, height])

  return (
    <group {...group}>
      <primitive object={object} />
    </group>
  )
}
