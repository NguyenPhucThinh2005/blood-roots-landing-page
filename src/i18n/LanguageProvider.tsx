import { createContext, use, useEffect, useState, type ReactNode } from 'react'
import { en } from './en'
import { vi, type Dictionary } from './vi'

export type Language = 'vi' | 'en'

const dictionaries: Record<Language, Dictionary> = { vi, en }
const STORAGE_KEY = 'bloodroot:lang'

type LanguageContextValue = {
  lang: Language
  t: Dictionary
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLang(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'vi' || stored === 'en') return stored
  } catch {
    // Storage can be blocked (private mode); fall back to Vietnamese.
  }
  return 'vi'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(readStoredLang)
  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Non-critical.
    }
  }, [lang, t])

  const toggleLang = () => setLang((prev) => (prev === 'vi' ? 'en' : 'vi'))

  return <LanguageContext value={{ lang, t, setLang, toggleLang }}>{children}</LanguageContext>
}

export function useLanguage() {
  const ctx = use(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

export function useT() {
  return useLanguage().t
}
