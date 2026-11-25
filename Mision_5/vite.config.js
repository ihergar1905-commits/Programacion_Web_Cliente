import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Tailwind v4 se conecta como plugin de Vite: no hay tailwind.config.js ni postcss.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
