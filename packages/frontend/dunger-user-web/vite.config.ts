import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import stylexPlugin from 'vite-plugin-stylex-dev';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // https://stylexjs.com/docs/learn/installation/#compiler
    stylexPlugin({
      useCSSLayers: true
    }),
    svgr(),
    // система импортов TypeScript (иначе он игнорирует baseUrl)
    tsconfigPaths()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0
        api: 'modern-compiler',
        // https://sass-lang.com/documentation/breaking-changes/mixed-decls/
        silenceDeprecations: ['mixed-decls']
      }
    }
  },
  // абсолютные импорты в SCSS-файлах
  resolve: { alias: { styles: '/src/styles' } }
});
