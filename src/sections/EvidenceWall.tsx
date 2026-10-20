import { useRef } from 'react'
import { posters, videos } from '../assets/media'
import { Flashlight } from '../components/Flashlight'
import { LoopVideo } from '../components/LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

// Heights (svh) and tilts of the six clippings standing along the bottom edge. On phones only the
// first and the latest story stand there, side by side inside the margins (no row cut at the edge).
const SLIPS = [
  { h: 'h-[34svh]', tilt: 'rotate-[-1.5deg]', phone: true },
  { h: 'h-[42svh]', tilt: '', phone: false },
  { h: 'h-[28svh]', tilt: 'rotate-[1.2deg]', phone: false },
  { h: 'h-[44svh]', tilt: '', phone: false },
  { h: 'h-[40svh]', tilt: 'rotate-[-1deg]', phone: true },
  { h: 'h-[31svh]', tilt: '', phone: false },
]

// "Output slips along the edge": the hallway wall where Father pinned every story, read by flashlight.
export function EvidenceWall() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section
      ref={root}
      id="wall"
      aria-labelledby="wall-title"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-void select-none md:h-[96svh]"
    >
      <LoopVideo
        src={videos.corridor}
        poster={posters.corridor}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      {/* Six clippings, their lower ends cut by the section edge. */}
      <ul className="page-x absolute inset-x-0 -bottom-[6svh] z-0 flex items-end gap-3 md:px-3">
        {t.wall.clippings.map((c, i) => {
          const note = !c.body
          return (
            <li
              key={c.year}
              className={cn(
                'flex-1 bg-bone px-4 pt-4 text-void md:block',
                !SLIPS[i].phone && 'hidden',
                SLIPS[i].h,
                SLIPS[i].tilt,
                note && 'bg-bone-dim',
              )}
            >
              <p className="font-display text-step-small font-bold">{c.year}</p>
              <p aria-hidden className="mt-1 text-step-small tracking-[0.3em] text-void/50">
                ----------------
              </p>
              <h3
                className={cn(
                  'mt-2 text-step-body leading-[1.15] tracking-[-0.02em]',
                  note && 'font-serif font-normal tracking-normal italic',
                )}
              >
                {c.headline}
              </h3>
              {c.body && <p className="mt-2 text-step-small leading-[1.45]">{c.body}</p>}
            </li>
          )
        })}
      </ul>

      <Flashlight />

      <div className="page-x relative z-20 pt-16 md:pt-[14svh] md:pl-[18%]">
        <div className="max-w-[34ch] bg-void/75 p-5 md:p-7">
          <h2 id="wall-title" data-reveal className="text-step-title">
            {t.wall.title}
          </h2>
          <p data-reveal className="mt-3 text-step-lead leading-[1.35]">
            {t.wall.intro}
          </p>
          <p data-reveal className="mt-3 text-step-lead leading-[1.35] text-blood-300">
            {t.wall.outro}
          </p>
          <p data-reveal className="mt-4 text-step-small text-bone/70">
            <span className="pointer-coarse:hidden">{t.wall.hintPointer}</span>
            <span className="hidden pointer-coarse:inline">{t.wall.hintTouch}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
