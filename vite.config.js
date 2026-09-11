import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Mutlak yol şart: '/blog/8' gibi iç içe rotalarda './assets' yanlış çözümleniyordu
  base: '/',
  plugins: [react(), tailwindcss()],
})
