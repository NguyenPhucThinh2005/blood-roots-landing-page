// Shared helpers for the media:* scripts.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

/** Unity project folder: `--game <path>` or the sibling ../3DTester. */
export function gameDir() {
  const i = process.argv.indexOf('--game')
  return resolve(root, i > -1 ? process.argv[i + 1] : '../3DTester')
}

// winget installs ffmpeg here, but the shim folder is often missing from PATH in non-login shells.
const WINGET_LINKS = process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Microsoft/WinGet/Links')

function bin(name) {
  const env = process.env[name.toUpperCase()]
  if (env) return env
  if (WINGET_LINKS && existsSync(join(WINGET_LINKS, `${name}.exe`))) return join(WINGET_LINKS, `${name}.exe`)
  return name
}

function exec(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (r.error) throw r.error
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')}\n${r.stderr.slice(-2000)}`)
  return r
}

/** Runs ffmpeg and returns its stderr (where logs and filter reports go). */
export const ffmpeg = (args) => exec(bin('ffmpeg'), ['-hide_banner', '-nostats', '-y', ...args]).stderr

export function mediaDuration(file) {
  const out = exec(bin('ffprobe'), [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'csv=p=0',
    file,
  ]).stdout
  return Number.parseFloat(out)
}

export const kb = (n) => `${(n / 1024).toFixed(0)} KB`
