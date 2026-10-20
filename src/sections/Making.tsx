import { useRef } from 'react'
import { btsImages, type BtsImage } from '../assets/media'
import { Plate3D } from '../components/Plate3D'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

// Strip colours rotate through four pairs so neighbouring tiles never match.
const STRIPS = [
  'bg-bone text-void',
  'bg-blood-900 text-bone',
  'bg-bone-dim text-void',
  'bg-[#3b2f2c] text-bone',
]

// "Photo tiles with label strips": every room and object as a print with its evidence tag.
// The first tile is the altar itself, rendered live from the team's models.
export function Making() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section
      ref={root}
      id="making"
      aria-labelledby="making-title"
      className="page-x bg-void py-24 md:py-[180px]"
    >
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <h2 id="making-title" data-reveal className="text-step-title md:col-span-5">
          {t.making.title}
        </h2>
        <p data-reveal className="mt-4 max-w-[52ch] md:col-span-6 md:col-start-7 md:mt-0">
          {t.making.intro}
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-2 gap-y-5 md:mt-14 md:grid-cols-4 md:gap-x-3 md:gap-y-7">
        {t.making.tiles.map((tile, i) => (
          <li key={tile.img} data-reveal className="flex flex-col">
            {tile.img === 'altar' ? (
              <Plate3D
                scene="altar"
                label={t.making.altarAlt}
                fallback={btsImages.altar}
                className="aspect-[4/5] w-full"
              />
            ) : (
              <img
                src={btsImages[tile.img as BtsImage]}
                alt={`${tile.name}, ${tile.where}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            )}
            <div
              className={cn(
                'flex min-h-[84px] flex-col justify-between gap-1 p-3 text-step-small leading-snug',
                STRIPS[i % 4],
              )}
            >
              <div className="flex justify-between gap-2 font-display font-bold">
                <span>{tile.name}</span>
                <span className="tabular-nums">{tile.tool}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-x-2">
                <span>{tile.where}</span>
                <span className="hidden opacity-80 md:inline">{tile.note}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
