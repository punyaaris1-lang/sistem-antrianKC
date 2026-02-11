const CACHE_NAME = "fckc-cache-v4"; // Naik ke v4
const urlsToCache = [
  "/antrian.html",
  "/system.html",
  "/admin.html",
  "/logo1.png",
  "/logo2.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Menyimpan cache satu per satu agar kalau ada 1 file hilang, aplikasi tetap jalan
      return Promise.allSettled(
        urlsToCache.map(url => cache.add(url).catch(err => console.log('Lewati cache:', url)))
      );
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Hapus semua cache hantu versi lama
          }
        })
      );
    })
  );
  self.clients.claim();
});

// LOGIKA SAKTI: NETWORK FIRST, FALLBACK TO CACHE
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Kalau berhasil tembus internet, simpan data terbaru ke cache
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Kalau internet mati, baru pakai cache memori HP
        return caches.match(event.request);
      })
  );
});
