import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
