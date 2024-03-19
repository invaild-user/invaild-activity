import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  server: {
    proxy: {
      '/api': {
        target: 'https://invalid-activity.kings-world.net/',
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
  },
});
