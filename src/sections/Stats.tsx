import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'

// "Column aligned on the decimal": the game's true numbers, set like a ledger.
export function Stats() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} aria-labelledby="stats-title" className="page-x bg-void pb-24 md:pb-[180px]">
      <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
        <h2 id="stats-title" data-reveal className="text-step-title md:col-span-5">
          <span className="block text-bone/60">{t.stats.titleA}</span>
          <span className="block">{t.stats.titleB}</span>
        </h2>

        <ul className="grid grid-cols-[52%_1fr] gap-x-6 gap-y-7 md:col-span-7 md:grid-cols-[minmax(0,auto)_1fr] md:gap-y-5">
          {t.stats.figures.map((f) => (
            <li key={f.caption} className="contents">
              <span
                data-reveal
                className="text-right font-display text-step-display leading-none font-bold tracking-[-0.04em] tabular-nums"
              >
                {f.value}
              </span>
              <span data-reveal className="self-end pb-1 text-step-body leading-snug md:max-w-[26ch]">
                {f.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
