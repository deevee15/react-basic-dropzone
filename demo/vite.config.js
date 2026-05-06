import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path';

import svgr from 'vite-plugin-svgr' 

import sass from 'sass'

export default defineConfig( ({ command, mode }) => {
  return ({
    base: '/',
    build: {
      rollupOptions: {
        input: './index.html'
      },
    },
    define: {
      BASE_URL: JSON.stringify('/'),
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          implementation: sass,
        },
      },
    },
    plugins: [
      react(),
      svgr({ exportAs: 'component' }),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
})