import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  // Use base path for production (GitHub Pages), root for development
  base: '/coding-practice/',
}))
