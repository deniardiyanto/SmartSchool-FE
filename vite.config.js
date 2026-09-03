import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],

  base: '/',

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5075',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})