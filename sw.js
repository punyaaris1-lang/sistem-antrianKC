self.addEventListener('install', (e) => {
  self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
  // Hancurkan semua cache memori masa lalu
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // 100% Minta ke server internet, dilarang pakai memori HP
  e.respondWith(fetch(e.request));
});
