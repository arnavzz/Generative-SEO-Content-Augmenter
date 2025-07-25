import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import netlify from '@netlify/plugin-vite'

export default defineConfig({
  plugins: [react(), netlify()],
})
