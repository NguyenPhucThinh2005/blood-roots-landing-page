import { useT } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

// The page's one primary action, named the same everywhere: it leads to the sign-up postcard.
export function Cta({ className }: { className?: string }) {
  const t = useT()
  return (
    <a href="#signup" className={cn('btn', className)}>
      {t.cta}
    </a>
  )
}
