self.addEventListener('install', (e) => {
  self.skipWaiting(); // Paksa langsung aktif saat itu juga
});

self.addEventListener('activate', (e) => {
  // HAPUS SEMUA CACHE LAMA TANPA SISA
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => caches.delete(key)));
    })
  );
  self.clients.claim(); // Ambil alih kontrol halaman saat ini juga
});

self.addEventListener('fetch', (e) => {
  // 100% BYPASS CACHE - SELALU MINTA KE SERVER (INTERNET)
  e.respondWith(fetch(e.request));
});
