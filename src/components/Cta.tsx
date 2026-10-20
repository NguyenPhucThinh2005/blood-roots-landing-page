import { FACEBOOK_URL } from '../assets/media'
import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

// The page's one primary action, named the same everywhere.
export function Cta({ className }: { className?: string }) {
  const t = useT()
  return (
    <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={cn('btn', className)}>
      {t.cta}
    </a>
  )
}
