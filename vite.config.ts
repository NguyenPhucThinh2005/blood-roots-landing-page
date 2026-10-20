import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  build: {
    // The lazy three.js chunk (src/webgl) is ~1MB minified by nature; keep the warning for everything else.
    chunkSizeWarningLimit: 1100,
  },
})
