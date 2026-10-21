import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'
import { gsap, useGSAP } from '../lib/gsap'

// Problem and answer, filed as a survey record: a real two-column table on a sheet of paper, then the
// playtest figures that back it, rolling up to their values once.
export function Why() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const figures = gsap.utils.toArray<HTMLElement>('[data-figure]', root.current)
        figures.forEach((el) => {
          const end = Number(el.dataset.figure)
          const state = { v: 0 }
          el.textContent = '0'
          gsap.to(state, {
            v: end,
            duration: 1.4,
            ease: 'expo.out',
            onUpdate: () => {
              el.textContent = String(Math.round(state.v))
            },
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          })
        })
        // Text set by hand is not reverted by GSAP; put the final values back.
        return () => figures.forEach((el) => (el.textContent = el.dataset.figure ?? ''))
      })
    },
    { scope: root, dependencies: [t] },
  )

  return (
    <section ref={root} id="why" aria-labelledby="why-title" className="page-x bg-void py-24 md:py-[160px]">
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <h2 id="why-title" data-reveal className="text-step-head md:col-span-6">
          {t.why.title}
        </h2>
        <p
          data-reveal
          className="mt-6 max-w-[46ch] text-step-lead leading-[1.4] md:col-span-5 md:col-start-8 md:mt-0"
        >
          {t.why.intro}
        </p>
      </div>

      <div data-reveal className="mt-12 bg-bone px-5 py-6 text-void md:mt-20 md:px-12 md:py-12">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t.why.caption}</caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-b-2 border-void">
              <th scope="col" className="w-1/2 pr-8 pb-4 font-display text-step-body font-bold">
                {t.why.problemHead}
              </th>
              <th scope="col" className="w-1/2 pb-4 font-display text-step-body font-bold text-blood-700">
                {t.why.solutionHead}
              </th>
            </tr>
          </thead>
          <tbody>
            {t.why.rows.map((r) => (
              <tr
                key={r.problem}
                data-reveal
                className="flex flex-col gap-2 border-b border-void/25 py-5 last:border-0 md:table-row md:py-0"
              >
                <td className="align-top md:py-7 md:pr-8">
                  <span className="mb-1 block font-display text-step-small font-bold md:hidden">
                    {t.why.problemHead}
                  </span>
                  <span className="text-step-lead leading-[1.35]">{r.problem}</span>
                </td>
                <td className="align-top md:py-7">
                  <span className="mb-1 block font-display text-step-small font-bold text-blood-700 md:hidden">
                    {t.why.solutionHead}
                  </span>
                  <span className="font-display text-step-lead leading-[1.25] font-bold tracking-[-0.015em]">
                    {r.solution}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-20 grid gap-12 md:mt-[140px] md:grid-cols-12 md:gap-8">
        <h3 data-reveal className="text-step-title md:col-span-4">
          {t.why.proofTitle}
        </h3>
        <dl className="grid gap-y-10 md:col-span-8 md:grid-cols-3 md:gap-x-8">
          {t.why.figures.map((f) => (
            <div key={f.caption} data-reveal className="flex flex-col-reverse">
              <dt className="mt-3 max-w-[28ch] text-step-body leading-snug">{f.caption}</dt>
              <dd className="font-display text-[clamp(3rem,1.6rem+4.6vw,6rem)] leading-none font-bold tracking-[-0.04em] tabular-nums">
                <span data-figure={f.value}>{f.value}</span>
                {f.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <div className="md:col-span-8 md:col-start-5">
          <p data-reveal className="font-display text-step-body font-bold">
            {t.why.changesTitle}
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {t.why.changes.map((c) => (
              <li key={c} data-reveal className="text-step-body">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
