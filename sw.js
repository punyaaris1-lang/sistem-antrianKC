const CACHE_NAME = "fckc-cache-v3"; 
const urlsToCache = [
  "./antrian.html",
  "./system.html",
  "./admin.html",
  "./logo1.png",
  "./logo2.png"
];

self.addEventListener("install", event => {
  self.skipWaiting(); // Memaksa update Service Worker baru segera aktif
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Menghapus cache versi lama yg bikin 404
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
