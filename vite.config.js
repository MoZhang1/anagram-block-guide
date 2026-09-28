import {defineConfig} from 'vite';
export default defineConfig({
  base: '/anagram-block-guide/',
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: { output: { manualChunks(id) {
      if (id.endsWith('/src/data/catalog.json')) return 'catalog';
      if (id.includes('/node_modules/')) return 'vendor';
    } } },
  },
});
