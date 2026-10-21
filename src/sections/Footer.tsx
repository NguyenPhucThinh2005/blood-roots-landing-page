import { btsImages, FACEBOOK_URL, logos } from '../assets/media'
import { SignupForm } from '../components/SignupForm'
import { CONTACT_EMAIL } from '../data/signup'
import { modelCredits } from '../data/credits'
import { useT } from '../i18n/LanguageProvider'

// "The back of the card": the page's artefact turned over. Its address side is the sign-up form,
// then the name once more at full width.
export function Footer() {
  const t = useT()

  return (
    <footer className="page-x bg-void pb-10">
      <section
        id="signup"
        aria-labelledby="signup-title"
        className="scallop-top mx-auto grid gap-12 bg-bone px-6 pt-20 pb-8 text-void md:w-[84%] md:grid-cols-2 md:gap-16 md:px-12 md:pt-28"
      >
        <div className="flex flex-col">
          <h2 id="signup-title" className="text-step-head">
            {t.signup.title}
          </h2>
          <p className="mt-6 max-w-[36ch] text-step-lead leading-[1.4]">{t.signup.intro}</p>

          <div className="mt-10 md:mt-auto">
            <p className="font-display text-step-small font-bold">{t.footer.contact}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {CONTACT_EMAIL && (
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="link">
                    {CONTACT_EMAIL}
                  </a>
                </li>
              )}
              <li>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="link">
                  {t.footer.links.facebook}
                </a>
              </li>
              <li>
                <a href="#top" className="link">
                  {t.footer.links.top}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <img
            src={btsImages.altar}
            alt={t.footer.stampAlt}
            loading="lazy"
            className="absolute top-0 right-0 aspect-[3/4] w-16 border-[6px] border-bone object-cover object-top md:w-[88px]"
          />
          <SignupForm className="pt-24 md:pt-28" />
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
      </section>

      <img src={logos.bloodRoot} alt="" loading="lazy" className="mx-auto mt-14 w-full max-w-[1400px]" />
    </footer>
  )
}
