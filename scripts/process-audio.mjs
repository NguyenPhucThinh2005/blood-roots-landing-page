// Converts game sounds into web audio (WebM/Opus + MP3 fallback) in public/media/audio.
// EBU R128 loudness measured with loudnorm then applied as linear gain, leading silence trimmed on one-shots, crossfaded seam on loops.
// Usage: npm run media:audio [-- --game ../3DTester]   (needs ffmpeg; set FFMPEG=path if not on PATH)
import { mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ffmpeg, gameDir, kb, mediaDuration, root } from './lib/media.mjs'

const assets = join(gameDir(), 'Assets')
const outDir = join(root, 'public/media/audio')

/**
 * kind: 'loop' crossfades the last `seam` seconds into the start so the file loops cleanly;
 *       'oneshot' trims leading/trailing silence.
 * lufs: integrated loudness target. Ambience sits lower so it never fights the UI sounds.
 */
const SOUNDS = [
  {
    name: 'ambience-night',
    src: 'Art/Minigames/Atmosphere/NightAmbience.wav',
    kind: 'loop',
    seam: 2,
    lufs: -26,
    mono: true,
  },
  {
    name: 'hum-fluorescent',
    src: 'Art/Minigames/Atmosphere/FluorescentHum.wav',
    kind: 'loop',
    seam: 0,
    lufs: -28,
    mono: true,
  },
  { name: 'heartbeat', src: 'Sounds/heartbeat.mp3', kind: 'loop', seam: 0, lufs: -20 },
  { name: 'knock', src: 'Sounds/knocking-the-door.mp3', kind: 'oneshot', lufs: -18 },
  { name: 'flashlight-on', src: 'Sounds/Sounds/FlashlightON.wav', kind: 'oneshot', lufs: -20 },
  { name: 'flashlight-off', src: 'Sounds/Sounds/FlashlightOFF.wav', kind: 'oneshot', lufs: -20 },
  { name: 'door-open', src: 'Sounds/Open_Door_SFX.mp3', kind: 'oneshot', lufs: -18 },
]

function shapeFilter(s, duration) {
  if (s.kind === 'oneshot') {
    // Cut silence before the first transient and after the tail, with tiny fades to avoid clicks.
    return (
      'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.01,afade=t=in:d=0.005,' +
      'areverse,silenceremove=start_periods=1:start_threshold=-60dB:start_silence=0.05,afade=t=in:d=0.03,areverse'
    )
  }
  if (!s.seam) return 'anull'
  const body = (duration - s.seam).toFixed(3)
  // Output = A (0..body) with the tail B (body..end) faded out over A's faded-in start.
  return (
    `asplit[a][b];[a]atrim=0:${body},asetpts=N/SR/TB,afade=t=in:d=${s.seam}[a1];` +
    `[b]atrim=${body},asetpts=N/SR/TB,afade=t=out:d=${s.seam}[b1];[a1][b1]amix=inputs=2:duration=first:normalize=0`
  )
}

mkdirSync(outDir, { recursive: true })

for (const s of SOUNDS) {
  const input = join(assets, s.src)
  const shape = shapeFilter(s, mediaDuration(input))
  const channels = s.mono ? ['-ac', '1'] : []
  const target = `loudnorm=I=${s.lufs}:TP=-1.5:LRA=11`

  // Pass 1: measure the shaped signal (loudnorm prints its JSON on stderr).
  const log = ffmpeg([
    '-i',
    input,
    '-filter_complex',
    `${shape},${target}:print_format=json`,
    ...channels,
    '-f',
    'null',
    '-',
  ])
  const m = JSON.parse(log.slice(log.lastIndexOf('{'), log.lastIndexOf('}') + 1))
  // Pass 2: a plain linear gain toward the target, capped so true peak stays under -1.5 dBTP.
  // (loudnorm's own linear mode refuses clips under 3 s and falls back to dynamic compression,
  // and clips under 400 ms have no integrated loudness at all, so those are peak-normalized to -6.)
  const inI = Number.parseFloat(m.input_i)
  const inTP = Number.parseFloat(m.input_tp)
  const wanted = Number.isFinite(inI) ? s.lufs - inI : -6 - inTP
  const gain = Math.min(wanted, -1.5 - inTP)
  const filter = `${shape},volume=${gain.toFixed(2)}dB,aresample=48000`

  const webm = join(outDir, `${s.name}.webm`)
  const mp3 = join(outDir, `${s.name}.mp3`)
  ffmpeg([
    '-i',
    input,
    '-filter_complex',
    filter,
    ...channels,
    '-vn',
    '-c:a',
    'libopus',
    '-b:a',
    s.mono ? '48k' : '80k',
    webm,
  ])
  ffmpeg([
    '-i',
    input,
    '-filter_complex',
    filter,
    ...channels,
    '-vn',
    '-c:a',
    'libmp3lame',
    '-b:a',
    s.mono ? '80k' : '128k',
    mp3,
  ])
  console.log(
    `${s.name.padEnd(16)} ${mediaDuration(mp3).toFixed(2).padStart(6)}s  webm ${kb(statSync(webm).size).padStart(7)}` +
      `  mp3 ${kb(statSync(mp3).size).padStart(7)}  (${m.input_i} LUFS, gain ${gain.toFixed(1)} dB)`,
  )
}
