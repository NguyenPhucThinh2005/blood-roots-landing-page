import { Howl, type HowlOptions } from 'howler'

// Register every sound here. Files live in public/media/audio (serve .webm + .mp3 fallback).
export const soundSources = {
  // ambience: { src: ['/media/audio/ambience.webm', '/media/audio/ambience.mp3'], loop: true, volume: 0.4 },
} satisfies Record<string, HowlOptions>

export type SoundName = keyof typeof soundSources

const cache = new Map<SoundName, Howl>()

// Howl instances are created on first use so nothing downloads until sound is needed.
export function getSound(name: SoundName) {
  let sound = cache.get(name)
  if (!sound) {
    sound = new Howl({ preload: true, ...(soundSources[name] as HowlOptions) })
    cache.set(name, sound)
  }
  return sound
}
