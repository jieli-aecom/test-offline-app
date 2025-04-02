import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [viteSingleFile(), react(), tailwindcss()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000, // force inline everything
    minify: false,
  }
})
