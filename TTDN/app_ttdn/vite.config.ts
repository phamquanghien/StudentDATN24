import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Thay đổi cổng tại đây
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias cho thư mục src
    },
  },
});
