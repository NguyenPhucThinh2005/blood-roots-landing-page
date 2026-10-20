import { useEffect } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import { getSound, type SoundName } from './sounds'
import { useSound } from './SoundProvider'

type Bed = { name: SoundName; volume: number }

// Which ambience bed plays under which section; the night ambience covers everything else.
const BEDS: Record<string, Bed> = {
  wall: { name: 'hum', volume: 0.32 },
}
const BASE: Bed = { name: 'ambience', volume: 0.35 }
const FADE = 1400

// Loops keep playing and only their volume moves, so switching sections never clicks.
export function useSectionAmbience() {
  const { enabled } = useSound()

  useEffect(() => {
    if (!enabled) return
    const loops = [BASE, ...Object.values(BEDS)].map((b) => {
      const s = getSound(b.name)
      if (!s.playing()) s.play()
      return s
    })
    const base = getSound(BASE.name)
    base.fade(base.volume(), BASE.volume, FADE)

    const triggers = Object.entries(BEDS).map(([id, bed]) => {
      const loop = getSound(bed.name)
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: ({ isActive }) => {
          loop.fade(loop.volume(), isActive ? bed.volume : 0, FADE)
          base.fade(base.volume(), isActive ? BASE.volume * 0.3 : BASE.volume, FADE)
          if (isActive) getSound('flashlightOn').play()
        },
      })
    })

    return () => {
      triggers.forEach((t) => t.kill())
      loops.forEach((s) => s.fade(s.volume(), 0, 400))
    }
  }, [enabled])
}
