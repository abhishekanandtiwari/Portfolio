import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' lets the build work on GitHub Pages sub-paths too.
export default defineConfig({ plugins: [react()], base: './' })
