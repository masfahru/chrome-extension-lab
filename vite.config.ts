import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(async (): Promise<import('vite').UserConfig> => {
  const tailwindcss = (await import('@tailwindcss/vite')).default;

  return {
    plugins: [
      react(),
      tailwindcss(), // Initialize the plugin
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false,
      rollupOptions: {
        input: {
          popup: path.resolve(__dirname, 'src/popup.tsx'),
          options: path.resolve(__dirname, 'src/options.tsx'),
          background: path.resolve(__dirname, 'src/background.ts'),
          content_script: path.resolve(__dirname, 'src/content_script.tsx'),
        },
        output: {
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/vendor.js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.some((name) => name.endsWith('.css'))) {
              return 'css/styles.css';
            }
            return 'assets/[name][extname]';
          },
        },
      },
    },
    publicDir: 'public',
  };
});