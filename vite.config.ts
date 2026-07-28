import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honour PORT when the environment assigns one, so the dev server can be
  // started alongside another instance without colliding on 5173.
  server: process.env.PORT ? { port: Number(process.env.PORT) } : undefined,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
