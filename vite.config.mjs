import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

export default defineConfig({
  server:  { port: 8080 },
  preview: { port: 8080 },
  build: { outDir: 'dist', emptyOutDir: true },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [
    VitePWA({
      registerType: 'prompt',
      manifest: false,
      workbox: {
        // Precache everything from the build output — no need to maintain a manual list
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,json,txt}'],
        // Offline navigation fallback (same as current SW behaviour)
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
