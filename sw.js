const CACHE_NAME = 'fc-kc-neon-v1'; // Nama sistem cache versi baru

self.addEventListener('install', (e) => {
  // Paksa service worker baru untuk langsung mengontrol HP user
  self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
  // Hancurkan semua memori cache masa lalu secara brutal
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // 100% BYPASS CACHE: Selalu minta file terbaru dari server internet
  e.respondWith(
    fetch(e.request).catch((err) => {
      console.log('Mode Offline / Gagal fetch: ', err);
    })
  );
});
