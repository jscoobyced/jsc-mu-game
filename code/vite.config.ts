/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      extension: ['ts'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/*.ts',
        'src/common/controller.ts',
        'src/common/mapManager.ts',
        'src/config/*.ts',
        'src/scenes/**/*.ts',
        'src/sprites/*.ts',
      ],
    },
  },
})
