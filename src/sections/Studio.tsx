import { useRef } from 'react'
import { logos } from '../assets/media'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'

// "Founder's letter", kept small: who made the game.
export function Studio() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} aria-labelledby="studio-title" className="page-x bg-void pb-24 md:pb-[160px]">
      <div className="mx-auto max-w-[640px]">
        <div data-reveal className="flex items-center gap-4">
          <img src={logos.hextrix} alt="" width={44} height={36} className="h-9 w-auto" />
          <h2 id="studio-title" className="text-step-title">
            {t.studio.title}
          </h2>
        </div>
        <p data-reveal className="mt-6">
          {t.studio.letter}
        </p>
        <ul data-reveal className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {t.studio.members.map((m) => (
            <li key={m.name}>
              <span className="block font-display text-step-body font-bold">{m.name}</span>
              <span className="block text-step-small text-bone/70">{m.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
