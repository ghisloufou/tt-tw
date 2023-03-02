/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/utils/test/setupTests.ts'],
    environmentMatchGlobs: [
      // all tests with .domspec.tsx will run in jsdom
      ['**/*.domspec.ts', 'jsdom'],
      ['**/*.domspec.tsx', 'jsdom'],
      ['**/*.test.tsx', 'jsdom'],
    ],
  },
});
