import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [viteSingleFile(), react()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000, // force inline everything
  }
})
