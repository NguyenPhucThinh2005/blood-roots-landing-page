import { btsImages, FACEBOOK_URL, logos } from '../assets/media'
import { modelCredits } from '../data/credits'
import { useT } from '../i18n/LanguageProvider'

// "The back of the card": the page's artefact turned over, then the name once more at full width.
export function Footer() {
  const t = useT()

  return (
    <footer className="page-x bg-void pb-10">
      <div className="scallop-top mx-auto grid gap-10 bg-bone px-6 pt-20 pb-8 text-void md:w-[84%] md:grid-cols-2 md:px-12 md:pt-28">
        <div>
          <p className="font-display text-step-title leading-[0.95] font-bold tracking-[-0.03em]">
            {t.footer.signoff}
          </p>
          <p className="mt-4 max-w-[36ch]">{t.footer.message}</p>
        </div>

        <div className="relative flex flex-col gap-3 md:pt-24">
          <img
            src={btsImages.altar}
            alt={t.footer.stampAlt}
            loading="lazy"
            className="absolute top-0 right-0 aspect-[3/4] w-16 border-[6px] border-bone object-cover object-top md:w-[88px]"
          />
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="link w-fit">
            {t.footer.links.facebook}
          </a>
          <a href="#top" className="link w-fit">
            {t.footer.links.top}
          </a>
        </div>

        <div className="space-y-1 text-center text-step-small text-void/75 md:col-span-2">
          <p>{t.footer.imprint}</p>
          {modelCredits.length > 0 && (
            <p>
              {t.footer.credits}:{' '}
              {modelCredits.map((c, i) => (
                <span key={c.model}>
                  {i > 0 && ' · '}
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    {c.title}
                  </a>{' '}
                  — {c.author},{' '}
                  <a
                    href={c.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    {c.license.replace(/-/g, ' ')}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      <img src={logos.bloodRoot} alt="" loading="lazy" className="mx-auto mt-14 w-full max-w-[1400px]" />
    </footer>
  )
}
