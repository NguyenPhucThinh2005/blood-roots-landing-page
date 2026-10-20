import { Howl, type HowlOptions } from 'howler'

// Every sound on the page. Files come from the game (npm run media:audio), WebM/Opus with MP3 fallback.
const src = (name: string) => [`/media/audio/${name}.webm`, `/media/audio/${name}.mp3`]

export const soundSources = {
  ambience: { src: src('ambience-night'), loop: true, volume: 0 },
  hum: { src: src('hum-fluorescent'), loop: true, volume: 0 },
  heartbeat: { src: src('heartbeat'), volume: 0.7 },
  knock: { src: src('knock'), volume: 0.6 },
  flashlightOn: { src: src('flashlight-on'), volume: 0.5 },
  flashlightOff: { src: src('flashlight-off'), volume: 0.5 },
  door: { src: src('door-open'), volume: 0.5 },
} satisfies Record<string, HowlOptions>

export type SoundName = keyof typeof soundSources

const cache = new Map<SoundName, Howl>()

// Howl instances are created on first use so nothing downloads until sound is switched on.
export function getSound(name: SoundName) {
  let sound = cache.get(name)
  if (!sound) {
    sound = new Howl({ preload: true, ...soundSources[name] })
    cache.set(name, sound)
  }
  return sound
}
