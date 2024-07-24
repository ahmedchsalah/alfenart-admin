import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';
import {visualizer} from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.65, 0.90],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    compression({
      algorithm: 'gzip',
      threshold: 10240, // Compress files larger than 10 KB
    }),
    visualizer({ open: true })],
  optimizeDeps : {
    include : ['@tinymce/tinymce-react', 'tinymce/tinymce']
  }
})
