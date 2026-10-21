import { useRef } from 'react'
import { btsImages } from '../assets/media'
import { Plate3D } from '../components/Plate3D'
import { useReveal } from '../hooks/useReveal'
import { useT } from '../i18n/LanguageProvider'

// "Title, note, facts row", printed on the open front folder that the hero ends with.
export function Premise() {
  const t = useT()
  const root = useRef<HTMLElement>(null)
  useReveal(root)

  return (
    <section ref={root} id="premise" aria-labelledby="premise-title" className="bg-void">
      <div className="mx-auto w-(--folder-w) bg-bone px-6 pt-16 pb-16 text-void md:px-8 md:pt-[140px] md:pb-[120px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="premise-title" data-reveal className="text-step-head md:col-span-7">
            {t.premise.title}
          </h2>
          <p data-reveal className="max-w-[46ch] text-step-body md:col-span-4 md:col-start-9">
            {t.premise.note}
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-[120px] md:flex md:justify-between">
          {t.premise.facts.map((f) => (
            <div key={f.value} data-reveal className="flex flex-col-reverse">
              <dt className="mt-1.5 text-step-small text-void/70">{f.label}</dt>
              <dd className="font-display text-step-title leading-none font-bold tracking-[-0.03em]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <figure className="mt-14 flex flex-col-reverse gap-4 md:mt-16 md:grid md:grid-cols-12 md:items-end md:gap-8">
          <figcaption data-reveal className="max-w-[34ch] text-step-small text-void/75 md:col-span-4">
            {t.premise.shelfCaption}
          </figcaption>
          <div data-reveal className="md:col-span-7 md:col-start-6">
            <Plate3D
              scene="shelf"
              label={t.premise.shelfAlt}
              fallback={btsImages.house}
              className="aspect-[4/3] w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
