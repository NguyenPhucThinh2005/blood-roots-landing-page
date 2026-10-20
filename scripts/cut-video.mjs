// Cuts web clips from the raw gameplay capture into public/media/video (H.264, no audio, faststart)
// plus a poster frame per clip in src/assets/images (served through vite-imagetools).
// Usage: npm run media:video [-- --src raw-assets/videos/class-room.mp4]   (needs ffmpeg)
import { mkdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { ffmpeg, kb, root } from './lib/media.mjs'

const srcArg = process.argv.indexOf('--src')
const src = resolve(root, srcArg > -1 ? process.argv[srcArg + 1] : 'raw-assets/videos/class-room.mp4')
const outDir = join(root, 'public/media/video')
const posterDir = join(root, 'src/assets/images')

// The 1080p capture has the mission HUD burned in at x45–415 / y50–200, a 30px crosshair ring at
// (1024, 540) and a bright line on the bottom edge. Gameplay clips blur the ring out and crop to
// 1920×856 from y=216 (~2.25:1).
const GAMEPLAY = 'delogo=x=1002:y=518:w=44:h=44,crop=1920:856:0:216'
// The jigsaw UI is the point of that clip: keep 16:9, blur the faded HUD behind the overlay and drop
// the red tab on the right edge.
const JIGSAW = 'delogo=x=35:y=50:w=290:h=120,crop=1792:1008:0:36'

/** start/end in seconds of the source; poster is the offset (s) inside the clip. */
const CLIPS = [
  // 01:05–01:15 — torch beam sweeping down the stairwell
  { name: 'flashlight', start: 65, end: 75, crop: GAMEPLAY, poster: 2.5 },
  // 02:12.5–02:21.5 — walk down the lit corridor (01:40–02:10 has pickup prompts and photo pop-ups)
  { name: 'corridor', start: 132.5, end: 141.5, crop: GAMEPLAY, poster: 5 },
  // 02:57–03:09 — last torn-photo pieces snapped into the 3×3 frame, ends on "Hoàn thành!"
  { name: 'jigsaw', start: 177, end: 189, crop: JIGSAW, poster: 10.5 },
]

mkdirSync(outDir, { recursive: true })
mkdirSync(posterDir, { recursive: true })

for (const c of CLIPS) {
  const out = join(outDir, `${c.name}.mp4`)
  const vf = `${c.crop},scale=1600:-2:flags=lanczos,format=yuv420p`
  ffmpeg([
    '-ss',
    String(c.start),
    '-to',
    String(c.end),
    '-i',
    src,
    '-vf',
    vf,
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '26',
    '-profile:v',
    'high',
    '-maxrate',
    '3M',
    '-bufsize',
    '6M',
    '-movflags',
    '+faststart',
    out,
  ])
  const poster = join(posterDir, `poster-${c.name}.jpg`)
  ffmpeg(['-ss', String(c.start + c.poster), '-i', src, '-frames:v', '1', '-vf', vf, '-q:v', '2', poster])
  console.log(
    `${c.name.padEnd(11)} ${c.start}s–${c.end}s  ${kb(statSync(out).size).padStart(8)}  poster ${kb(statSync(poster).size)}`,
  )
}
