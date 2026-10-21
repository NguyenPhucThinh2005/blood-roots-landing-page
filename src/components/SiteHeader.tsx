import { useLenis } from 'lenis/react'
import { useRef, useState, type MouseEvent } from 'react'
import { logos } from '../assets/media'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'
import { ScrollTrigger, useGSAP } from '../lib/gsap'
import { LangToggle } from './Controls'
import { Cta } from './Cta'

const LINKS = ['premise', 'why', 'features', 'puzzle', 'team'] as const

// A plain bar (wordmark, five links, the action) that slides down once the hero has gone, so every
// required section is one click away. Phones: wordmark, action and a menu in a native modal dialog
// (focus trap and Esc come with showModal). Sits above the 3D canvas (z-30), under the grain (z-60).
export function SiteHeader() {
  const t = useT()
  const lenis = useLenis()
  const dialog = useRef<HTMLDialogElement>(null)
  const [shown, setShown] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#top',
      start: 'bottom top+=96',
      onEnter: () => setShown(true),
      onLeaveBack: () => setShown(false),
    })
  })

  const openMenu = () => {
    dialog.current?.showModal()
    lenis?.stop()
  }
  const closeMenu = () => {
    dialog.current?.close()
    lenis?.start()
  }
  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    closeMenu()
    lenis?.scrollTo(`#${id}`) // Lenis honours html { scroll-padding-top } (index.css)
  }

  return (
    <header
      inert={!shown}
      className={cn(
        'fixed inset-x-0 top-0 z-40 h-(--header-h) bg-void text-bone transition-transform duration-[400ms] ease-(--ease-out) motion-reduce:transition-none',
        shown ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="page-x flex h-full items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label={t.brand.game}>
          <img src={logos.bloodRoot} alt="" width={140} height={45} className="h-8 w-auto md:h-9" />
        </a>

        <nav aria-label={t.nav.label} className="hidden lg:block">
          <ul className="flex gap-7 font-display text-step-small font-bold">
            {LINKS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="transition-colors duration-200 hover:text-blood-300">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <LangToggle className="hidden font-display text-step-small font-bold lg:inline" />
          <Cta className="px-4 py-2 text-step-small" />
          <button
            type="button"
            onClick={openMenu}
            className="font-display text-step-small font-bold lg:hidden"
            aria-haspopup="dialog"
          >
            {t.ui.menu}
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        onClose={() => lenis?.start()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-void text-bone backdrop:bg-void"
      >
        <div className="page-x flex h-full flex-col pt-4 pb-10">
          <div className="flex h-12 items-center justify-between">
            <img src={logos.bloodRoot} alt="" width={140} height={45} className="h-8 w-auto" />
            <button type="button" onClick={closeMenu} className="font-display text-step-small font-bold">
              {t.ui.close}
            </button>
          </div>
          <nav aria-label={t.nav.label} className="mt-10 flex-1">
            <ul className="space-y-2">
              {LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => go(e, id)}
                    className="block py-1 font-display text-step-head font-bold tracking-[-0.035em]"
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-between gap-4">
            <LangToggle className="font-display text-step-body font-bold" />
            <a href="#signup" onClick={(e) => go(e, 'signup')} className="btn">
              {t.cta}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  )
}
