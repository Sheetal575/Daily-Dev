import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'next/router',
      '@apollo/client',
      'graphql-tag'
    ],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  build: {
    target: 'es2018',
  },
  server: {
    port: 3000,
    proxy: {
      '^/api(/|$)': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})