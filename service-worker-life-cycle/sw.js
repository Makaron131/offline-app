const lastCacheStorageVersion = "v0.0.0";
const currentCacheStorageVersion = "v0.0.1";

self.addEventListener("install", function (event) {
  console.log("Service worker install");
  event.waitUntil(
    caches.open(currentCacheStorageVersion).then(function (cache) {
      return cache.addAll([
        "/offline-app/service-worker-life-cycle/index.js",
        "/offline-app/service-worker-life-cycle/index.html",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("Service worker fetch");
  console.log(event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response !== undefined) {
          console.log("cache hit!");
          return response;
        } else {
          console.log("cache not hit..");
          return fetch(event.request).then(function (response) {
            let responseClone = response.clone();

            caches.open(currentCacheStorageVersion).then(function (cache) {
              cache.put(event.request, responseClone);
            });

            return response;
          });
        }
      })
      .catch((err) => console.error(err))
  );
});

self.addEventListener("activate", function (event) {
  console.log("Service worker activate");
  event.waitUntil(caches.delete(lastCacheStorageVersion));
});
