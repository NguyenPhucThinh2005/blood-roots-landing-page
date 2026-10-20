import '@fontsource-variable/libre-franklin/wght.css'
import '@fontsource-variable/source-serif-4/opsz.css'
import '@fontsource-variable/source-serif-4/opsz-italic.css'
import './index.css'

import { Analytics } from '@vercel/analytics/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { SoundProvider } from './audio/SoundProvider'
import { LanguageProvider } from './i18n/LanguageProvider'
import { SmoothScroll } from './providers/SmoothScroll'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SoundProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </SoundProvider>
    </LanguageProvider>
    <Analytics />
  </StrictMode>,
)
