/* eslint-disable no-undef */
var staticCacheName = "wxn-2020-05-22d"
var filesToCache = [
  "/",
  "/index.html",
  "/boneco.gif",
  "/webxnet.svg",
  "/selo-google-site-seguro.png",
]
// Cache on install
this.addEventListener("install", (event) => {
  this.skipWaiting()
  console.log("[Service Worker] Install")
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("[Service Worker] Caching all files")
      return cache.addAll(filesToCache)
    })
  )
})
