import { Howler } from 'howler'
import { createContext, use, useEffect, useState, type ReactNode } from 'react'

type SoundContextValue = {
  enabled: boolean
  toggle: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

// Sound is off by default: browsers block autoplay, and horror audio should be opt-in.
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    Howler.mute(!enabled)
  }, [enabled])

  const toggle = () => setEnabled((prev) => !prev)

  return <SoundContext value={{ enabled, toggle }}>{children}</SoundContext>
}

export function useSound() {
  const ctx = use(SoundContext)
  if (!ctx) throw new Error('useSound must be used inside <SoundProvider>')
  return ctx
}
