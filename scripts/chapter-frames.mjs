// Extracts 4:5 stills for the "Chapter 1" moment row from the raw gameplay capture into
// src/assets/images/ch1-*.jpg. Usage: npm run media:frames [-- --src raw-assets/videos/class-room.mp4]
import { mkdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { ffmpeg, kb, root } from './lib/media.mjs'

const srcArg = process.argv.indexOf('--src')
const src = resolve(root, srcArg > -1 ? process.argv[srcArg + 1] : 'raw-assets/videos/class-room.mp4')
const outDir = join(root, 'src/assets/images')

// Centre 656×820 window of the 1080p capture: clears the mission HUD (top-left) and subtitles (bottom).
// The crosshair ring at (1024, 540) is blurred out first.
const crop = (y = 130) => `delogo=x=1002:y=518:w=44:h=44,crop=656:820:632:${y},scale=960:-2:flags=lanczos`

/** t = seconds into the source; y = top of the crop window when the default clips on-screen text */
const FRAMES = [
  { name: 'ch1-corridor', t: 2 }, // waking in the school corridor
  { name: 'ch1-pieces', t: 47 }, // picking up a torn photo piece from the patterned tiles
  { name: 'ch1-classroom', t: 192 }, // the classroom where the teacher counts
  { name: 'ch1-count', t: 200, y: 158 }, // "the teacher is counting… find a cupboard" countdown
]

mkdirSync(outDir, { recursive: true })

for (const f of FRAMES) {
  const out = join(outDir, `${f.name}.jpg`)
  ffmpeg(['-ss', String(f.t), '-i', src, '-frames:v', '1', '-vf', crop(f.y), '-q:v', '3', out])
  console.log(`${f.name}.jpg  ${kb(statSync(out).size)}`)
}
