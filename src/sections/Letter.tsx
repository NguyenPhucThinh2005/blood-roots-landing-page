import { useRef } from 'react'
import { Cta } from '../components/Cta'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'

// "Founder's letter", object variant: a paper sheet with a scalloped edge and a tear-off strip.
export function Letter() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} aria-labelledby="letter-title" className="page-x bg-void py-24 md:py-[160px]">
      <div className="mx-auto max-w-[640px]">
        <h2 id="letter-title" data-reveal className="mb-8 text-step-head md:mb-10">
          {t.letter.title}
        </h2>

        <article data-reveal className="text-void">
          <div className="scallop-bottom bg-bone px-6 pt-8 pb-14 md:px-[60px] md:pt-[56px] md:pb-[72px]">
            <p className="text-step-lead italic">{t.letter.salutation}</p>
            <div className="mt-6 space-y-[1.55em]">
              {t.letter.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-10 font-serif text-[22px] italic">{t.letter.signature}</p>
            <p className="text-step-small text-void/70">{t.letter.role}</p>
          </div>

          <div className="mt-3 text-bone/50" aria-hidden>
            <div className="perforation" />
          </div>
          <div className="mt-3 flex flex-col gap-4 bg-bone-dim px-6 py-5 md:flex-row md:items-center md:justify-between md:px-[60px]">
            <p className="text-step-body">{t.letter.stub}</p>
            <Cta className="w-full shrink-0 md:w-auto" />
          </div>
        </article>
      </div>
    </section>
  )
}
