import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    port: 5173,
    host: '127.0.0.1',
    proxy: {
      '/api/v1': {
        target: 'https://kavach-backend-50043048797.development.catalystappsail.in',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});