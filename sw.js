/* eslint-disable no-undef */
var staticCacheName = "wxn-2025-04-18d"
var filesToCache = [
  "/",
  "/index.html",
  "/boneco.gif",
  "/webxnet.svg",
  "/selo-google-site-seguro.png",
]
// Cache on install
self.addEventListener("install", (event) => {
  self.skipWaiting()
  console.log("[Service Worker] Install")
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("[Service Worker] Caching all files")
      return cache.addAll(filesToCache)
    })
  )
})

// Clean up old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== staticCacheName)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
