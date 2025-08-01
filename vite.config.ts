import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://aiinventory-633863780201.us-central1.run.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})