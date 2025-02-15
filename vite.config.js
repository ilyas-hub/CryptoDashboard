import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173, // Default Vite preview port
    strictPort: true,
    host: true,
    allowedHosts: ['cryptodashboard-jt16.onrender.com'], // Add Render host
  }
})
