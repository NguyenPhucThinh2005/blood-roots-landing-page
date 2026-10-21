import { useRef, useState } from 'react'
import { logos } from '../assets/media'
import { teamPhotos } from '../data/team'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

// The studio's personnel sheet. "Index with preview" mirrored from the Entity section: the names are
// the index and the photo frame sits on the left, anchored to the row being read. On touch screens
// each row carries its own small photo instead.
export function Team() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  useReveal(root)

  const show = (i: number, row: HTMLElement) => {
    const f = frame.current
    const l = list.current
    if (!f || !l || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const y = row.offsetTop + row.offsetHeight / 2 - f.offsetHeight / 2
    const max = l.offsetHeight - f.offsetHeight
    const opening = active === null
    if (opening) f.style.transitionProperty = 'clip-path'
    f.style.transform = `translateY(${Math.min(Math.max(0, y), Math.max(0, max))}px)`
    if (opening) {
      f.getBoundingClientRect()
      f.style.transitionProperty = ''
    }
    setActive(i)
  }

  return (
    <section ref={root} id="team" aria-labelledby="team-title" className="page-x bg-ash py-24 md:py-[160px]">
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <div data-reveal className="flex items-center gap-4 md:col-span-5">
          <img src={logos.hextrix} alt="" width={44} height={36} className="h-10 w-auto" />
          <h2 id="team-title" className="text-step-head">
            {t.team.title}
          </h2>
        </div>
        <p
          data-reveal
          className="mt-6 max-w-[52ch] text-step-lead leading-[1.4] md:col-span-6 md:col-start-7 md:mt-0"
        >
          {t.team.letter}
        </p>
      </div>

      <div
        className="relative mt-14 md:mt-24 md:grid md:grid-cols-12 md:gap-8"
        onPointerLeave={() => setActive(null)}
      >
        <div className="relative hidden md:col-span-4 md:block">
          <div
            ref={frame}
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-0 left-0 aspect-[3/4] w-full [transition:clip-path_320ms_var(--ease-out),transform_360ms_var(--ease-out)] motion-reduce:transition-none',
              active === null ? '[clip-path:inset(100%_0_0_0)]' : '[clip-path:inset(0)]',
            )}
          >
            {t.team.members.map((m, i) => (
              <img
                key={m.id}
                src={teamPhotos[m.id]}
                alt=""
                loading="lazy"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover contrast-[1.08] grayscale-[0.85] transition-opacity duration-[240ms]',
                  active === i ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
          </div>
        </div>

        <ul ref={list} className="md:col-span-8">
          {t.team.members.map((m, i) => (
            <li key={m.id} data-reveal>
              <div
                tabIndex={0}
                onPointerEnter={(e) => show(i, e.currentTarget)}
                onFocus={(e) => show(i, e.currentTarget)}
                onBlur={() => setActive(null)}
                className={cn(
                  'flex gap-4 py-4 transition-opacity duration-200 outline-none focus-visible:underline md:grid md:grid-cols-8 md:gap-8 md:py-5',
                  active !== null && active !== i && 'md:opacity-45',
                )}
              >
                <img
                  src={teamPhotos[m.id]}
                  alt={t.team.photoAlt(m.name)}
                  loading="lazy"
                  className="aspect-[3/4] w-16 shrink-0 object-cover contrast-[1.08] grayscale-[0.85] md:hidden"
                />
                <div className="md:col-span-4">
                  <p className="font-display text-step-title leading-none font-bold tracking-[-0.03em]">
                    {m.name}
                  </p>
                  <p className="mt-2 text-step-body text-blood-300">{m.role}</p>
                  <p className="mt-2 text-step-small leading-snug md:hidden">{m.bio}</p>
                </div>
                <p className="hidden text-step-body leading-snug md:col-span-4 md:block">{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
