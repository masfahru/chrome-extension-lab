import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false, // Enable sourcemaps for dev, disable for prod
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup.tsx'),
        options: path.resolve(__dirname, 'src/options.tsx'),
        background: path.resolve(__dirname, 'src/background.ts'),
        content_script: path.resolve(__dirname, 'src/content_script.tsx'),
      },
      output: {
        entryFileNames: 'js/[name].js',        // e.g., js/popup.js, js/options.js
        chunkFileNames: 'js/vendor.js',       // All shared code from node_modules will go into js/vendor.js
                                              // This helps keep manifest.json and HTMLs similar to before.
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((name) => name.endsWith('.css'))) {
            // Vite automatically extracts CSS imported in your .tsx files
            // (e.g., import './styles.css'; in popup.tsx and options.tsx)
            // into a single file if configured this way.
            return 'css/styles.css'; // Output a single styles.css
          }
          // For other assets like images, fonts etc. (if any are processed by Rollup)
          return 'assets/[name][extname]';
        },
      },
    },
  },
  // Vite uses 'public' as the public directory by default.
  // Assets in 'public' (manifest.json, .html files, icon.png) will be copied to 'dist' automatically.
  publicDir: 'public',
});