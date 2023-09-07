const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

// Create a cache strategy for pages (navigate requests)
const pageCache = new StaleWhileRevalidate({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with a status code of 0 or 200 (OK)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

pageCache.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      for (const cacheName of cacheNames) {
        if (cacheName.startsWith('page-cache') && cacheName !== 'page-cache') {
          await caches.delete(cacheName);
        }
      }
    })
  );
});

registerRoute(({ request }) => request.mode === 'navigate', ({ event }) => {
  return pageCache.handle({ event });
});

// TODO: Implement asset caching
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker' ||
    request.destination === 'image',
  new StaleWhileRevalidate()
);