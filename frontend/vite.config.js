import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
      '/employees': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
      '/requests': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
    },
  },
})
