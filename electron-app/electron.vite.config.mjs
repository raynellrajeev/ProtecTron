import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'renderer', // ✅ Ensure it looks inside `renderer/`
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'build'), // ✅ Ensures output goes to `build/`
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron', 'fs', 'path'],
      input: path.resolve(__dirname, 'renderer/index.html') // ✅ Explicitly set entry file
    }
  },
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    }
  }
})
