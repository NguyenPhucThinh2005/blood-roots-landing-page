import { useId, useState, type FormEvent } from 'react'
import { FACEBOOK_URL } from '../assets/media'
import { getSound } from '../audio/sounds'
import { useSound } from '../audio/SoundProvider'
import { signupForm } from '../data/signup'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

type Status = 'idle' | 'invalid' | 'sending' | 'success' | 'error' | 'not-ready'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// The address side of the postcard: two lines to write on, then the page's one action.
// Posts to the team's Google Form (src/data/signup.ts); the response is opaque, so a request that
// leaves without a network error counts as sent.
export function SignupForm({ className }: { className?: string }) {
  const t = useT()
  const sound = useSound()
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('company')) return // honeypot: only bots fill the hidden field
    const email = String(data.get('email') ?? '').trim()
    const name = String(data.get('name') ?? '').trim()
    if (!EMAIL.test(email)) {
      setStatus('invalid')
      return
    }
    if (!signupForm.ready) {
      setStatus('not-ready')
      return
    }
    setStatus('sending')
    try {
      const body = new URLSearchParams({ [signupForm.fields.email]: email })
      if (name) body.set(signupForm.fields.name, name)
      await fetch(signupForm.action, { method: 'POST', mode: 'no-cors', body })
      form.reset()
      setStatus('success')
      if (sound.enabled) getSound('knock').play()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className={cn('font-serif text-step-lead italic', className)}>
        {t.signup.success}
      </p>
    )
  }

  const field =
    'w-full border-0 border-b-2 border-void/55 bg-transparent px-0 pt-1 pb-2 font-serif text-step-lead text-void outline-none transition-colors duration-200 placeholder:text-void/40 focus:border-blood-700'

  return (
    <form noValidate onSubmit={submit} className={cn('flex flex-col', className)}>
      <p className="font-display text-step-small font-bold">{t.signup.to}</p>

      <label htmlFor={`${id}-email`} className="mt-4 text-step-small text-void/75">
        {t.signup.email}
      </label>
      <input
        id={`${id}-email`}
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        aria-invalid={status === 'invalid'}
        aria-describedby={`${id}-status`}
        className={field}
      />

      <label htmlFor={`${id}-name`} className="mt-5 text-step-small text-void/75">
        {t.signup.name}
      </label>
      <input id={`${id}-name`} name="name" type="text" autoComplete="name" className={field} />

      {/* Honeypot, hidden from people and assistive tech. */}
      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-px w-px opacity-0"
      />

      <button type="submit" disabled={status === 'sending'} className="btn mt-8 w-full md:w-fit">
        {status === 'sending' ? t.signup.sending : t.signup.submit}
      </button>
      <p className="mt-3 text-step-small text-void/75">{t.signup.consent}</p>

      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className="mt-2 text-step-small font-bold text-blood-700"
      >
        {status === 'invalid' && t.signup.invalid}
        {status === 'error' && (
          <>
            {t.signup.error}{' '}
            <a href={signupForm.viewUrl} target="_blank" rel="noopener noreferrer" className="link">
              {t.signup.openForm}
            </a>
            .
          </>
        )}
        {status === 'not-ready' && (
          <>
            {t.signup.notReady}{' '}
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="link">
              Facebook
            </a>
          </>
        )}
      </p>
    </form>
  )
}
