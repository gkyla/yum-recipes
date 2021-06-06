/* eslint-disable */
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-cacheable-response');

const { precacheAndRoute ,getCacheKeyForURL } = workbox.precaching
const { skipWaiting,clientsClaim } = workbox.core
const { StaleWhileRevalidate, NetworkFirst, CacheFirst } = workbox.strategies
const { registerRoute, registerNavigationRoute } = workbox.routing
const { Plugin } = workbox.cacheableResponse

skipWaiting()
clientsClaim()

console.log(workbox)

precacheAndRoute(self.__precacheManifest , {
    ignoreURLParametersMatching: [/.*/],
})

// SPA fallback
registerNavigationRoute(getCacheKeyForURL("index.html"))

registerRoute(
    ({ url }) => url.origin  === 'https://www.themealdb.com' && url.pathname.startsWith('/api/json/v1/1') && !url.pathname.includes('random')
    ,
    new StaleWhileRevalidate({
        cacheName: 'data-cache',
    }),
);

registerRoute(
    ({ url }) => url.origin === 'https://www.themealdb.com' && url.pathname.startsWith('/images'),
    new CacheFirst({
        cacheName: 'image-caches',
        plugins: [
            new Plugin({
              statuses: [0, 200]
            })
        ]
    }),
);

registerRoute(
    ({ url }) => url.pathname.includes('random'),
    new NetworkFirst(),
);

registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'font-caches',
    }),
);

