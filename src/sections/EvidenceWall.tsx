import { useRef } from 'react'
import { posters, videos } from '../assets/media'
import { Flashlight } from '../components/Flashlight'
import { LoopVideo } from '../components/LoopVideo'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

// Heights (svh) and tilts of the six clippings standing along the bottom edge.
const SLIPS = [
  { h: 'h-[34svh]', tilt: 'rotate-[-1.5deg]' },
  { h: 'h-[42svh]', tilt: '' },
  { h: 'h-[28svh]', tilt: 'rotate-[1.2deg]' },
  { h: 'h-[44svh]', tilt: '' },
  { h: 'h-[36svh]', tilt: 'rotate-[-1deg]' },
  { h: 'h-[31svh]', tilt: '' },
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

      {/* Six clippings, their lower ends cut by the section edge. Sideways scroll on phones. */}
      <ul className="absolute inset-x-0 -bottom-[6svh] z-0 flex items-end gap-3 overflow-x-auto px-3 [scrollbar-width:none] md:overflow-visible">
        {t.wall.clippings.map((c, i) => {
          const note = !c.body
          return (
            <li
              key={c.year}
              className={cn(
                'w-[30vw] min-w-[150px] shrink-0 bg-bone px-4 pt-4 text-void md:w-auto md:min-w-0 md:flex-1',
                SLIPS[i].h,
                SLIPS[i].tilt,
                note && 'bg-bone-dim',
              )}
            >
              <p className="font-display text-[15px] font-bold">{c.year}</p>
              <p aria-hidden className="mt-1 text-[13px] tracking-[0.3em] text-void/50">
                ----------------
              </p>
              <h3
                className={cn(
                  'mt-2 text-[17px] leading-[1.15] tracking-[-0.02em] md:text-[19px]',
                  note && 'font-serif font-normal italic tracking-normal',
                )}
              >
                {c.headline}
              </h3>
              {c.body && <p className="mt-2 text-[14px] leading-[1.45] md:text-[15px]">{c.body}</p>}
            </li>
          )
        })}
      </ul>

      <Flashlight />

      <div className="page-x relative z-20 pt-16 md:pt-[14svh] md:pl-[18%]">
        <div className="max-w-[34ch] bg-void/75 p-5 md:p-7">
          <h2 id="wall-title" data-reveal className="text-[30px] tracking-[-0.03em] md:text-[clamp(28px,2.4vw,34px)]">
            {t.wall.title}
          </h2>
          <p data-reveal className="mt-3 text-[20px] leading-[1.35] md:text-[24px]">
            {t.wall.intro}
          </p>
          <p data-reveal className="mt-3 text-[20px] leading-[1.35] text-blood-300 md:text-[24px]">
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
