import '@fontsource/be-vietnam-pro/300.css'
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/600.css'
import '@fontsource/be-vietnam-pro/800.css'
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
