import { useSound } from '../audio/SoundProvider'
import { useLanguage } from '../i18n/LanguageProvider'
import { cn } from '../lib/cn'

export function LangToggle({ className }: { className?: string }) {
  const { t, toggleLang } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.ui.switchLanguageLabel}
      className={cn('link no-underline hover:underline', className)}
    >
      {t.ui.switchLanguage}
    </button>
  )
}

// Sound is a control on the page, off by default (no gate): it stays reachable from anywhere.
export function SoundToggle() {
  const { t } = useLanguage()
  const sound = useSound()
  return (
    <button
      type="button"
      onClick={sound.toggle}
      aria-pressed={sound.enabled}
      className="fixed right-(--margin) bottom-4 z-50 flex items-center gap-2.5 bg-void/80 py-2 pr-3 pl-2 font-display text-step-small font-bold text-bone transition-colors duration-200 hover:text-blood-300"
    >
      <span aria-hidden className="flex h-3.5 items-end gap-[3px]">
        {[0.5, 1, 0.7].map((h, i) => (
          <span
            key={i}
            className={cn(
              'w-[3px] bg-current transition-transform duration-300 ease-(--ease-out)',
              !sound.enabled && 'scale-y-[0.3]',
            )}
            style={{ height: `${h * 100}%`, transformOrigin: 'bottom' }}
          />
        ))}
      </span>
      <span className="sr-only md:not-sr-only">{sound.enabled ? t.ui.soundOff : t.ui.soundOn}</span>
    </button>
  )
}
