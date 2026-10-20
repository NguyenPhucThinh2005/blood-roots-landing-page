// Prepares source images: the jigsaw photo, editor-free crops of the behind-the-scenes screenshots
// (src/assets/images, served through vite-imagetools) and the 1200×630 Open Graph card (public/og.jpg).
// Usage: npm run media:images [-- --game ../3DTester]   (needs ffmpeg)
import { copyFileSync, mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ffmpeg, gameDir, kb, root } from './lib/media.mjs'

const raw = join(root, 'raw-assets')
const outDir = join(root, 'src/assets/images')

/**
 * Screenshots from Unity/Blender (Zalo-compressed). crop is w:h:x:y in source pixels and keeps only the
 * viewport; mask lists x:y:w:h boxes blurred out with delogo (3D cursor, crosshair, stray overlay text).
 */
const BTS = [
  {
    name: 'house',
    src: '1783435707913_1394576444463021729_g7695901290200698934_cba93c7e355f38a222ad2f173eec3045.jpg',
    crop: '704:392:88:12',
    mask: ['428:194:26:26', '104:18:18:18'],
  },
  {
    name: 'school',
    src: '1790782405656_4666243790141011514_g7695901290200698934_74765fe4ac3c947c1e3413f58cad7452.jpg',
    crop: '1440:1005:0:0',
  },
  {
    name: 'altar',
    src: '1790948746455_1394576444463021729_g7695901290200698934_f1daf418c086b6ffaa53cc0f42a27bdd.jpg',
    crop: '520:550:165:0',
  },
  {
    name: 'bedroom',
    src: '1790948748090_1394576444463021729_g7695901290200698934_040ddfa4bed362a321d5e2536b1fe443.jpg',
    crop: '855:552:65:0',
  },
  {
    name: 'stairs',
    src: 'z8003348059119_38fff27f220ff954acc42fc995cbe26a.jpg',
    crop: '1210:720:210:165',
    mask: ['760:420:50:50'],
  },
  {
    name: 'corridor-day',
    src: 'z8003348077842_772a88dd317ddd5bc49ac29667605978.jpg',
    crop: '1240:722:205:160',
    mask: ['762:415:50:50'],
  },
  {
    name: 'corridor-red',
    src: 'z8003348077908_0d4b9951440e9b8c8587e8b3a917e422.jpg',
    crop: '1240:722:200:145',
    mask: ['755:405:50:50'],
  },
  {
    name: 'classroom',
    src: 'z8003348077929_11b1e70e736535c8239ec44d5eaf4be2.jpg',
    crop: '1270:720:185:185',
    mask: ['760:440:50:50'],
  },
]

mkdirSync(outDir, { recursive: true })
const report = (file) =>
  console.log(`${file.replace(root, '').slice(1).padEnd(40)} ${kb(statSync(file).size).padStart(7)}`)

// The 3×3 jigsaw photo, as shipped in the game.
const puzzle = join(outDir, 'puzzle.jpg')
copyFileSync(join(gameDir(), 'Assets/Art/Minigames/Jigsaw/phong_hoc_dem.jpg'), puzzle)
report(puzzle)

for (const b of BTS) {
  const out = join(outDir, `bts-${b.name}.jpg`)
  const masks = (b.mask ?? []).map((m) => {
    const [x, y, w, h] = m.split(':')
    return `delogo=x=${x}:y=${y}:w=${w}:h=${h}`
  })
  ffmpeg(['-i', join(raw, 'images', b.src), '-vf', [...masks, `crop=${b.crop}`].join(','), '-q:v', '2', out])
  report(out)
}

// OG card: the 2.6:1 cover minus its empty side margins, fitted to 1200 wide, over a blurred,
// darkened fill of itself for the remaining top/bottom bands.
const og = join(root, 'public/og.jpg')
ffmpeg([
  '-i',
  join(raw, 'drive/BIA-GAME.png'),
  '-filter_complex',
  '[0]crop=5000:2102:200:0,split[a][b];' +
    '[a]scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630,gblur=sigma=24,eq=brightness=-0.12[bg];' +
    '[b]scale=1200:-2:flags=lanczos[fg];[bg][fg]overlay=0:(H-h)/2,format=yuvj420p',
  '-frames:v',
  '1',
  '-q:v',
  '3',
  og,
])
report(og)
