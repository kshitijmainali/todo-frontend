import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: false },
  plugins: [svgr(), react()],
  resolve: {
    alias: { '@src': path.resolve('src/') },
  },
});
