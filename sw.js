const CACHE_NAME = "fckc-cache-v1";
const urlsToCache = [
  "/",
  "/antrian.html",
  "/system.html",
  "/admin.html",
  "/logo1.png",
  "/logo2.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
