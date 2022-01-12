// version: 0.0.1
const lastCacheVersion = "v0.0.0";
const curCacheVersion = "v0.0.1";
const cacheList = self.serviceWorkerOption.assets;

// 安装的时候设置好需要缓存的文件
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(curCacheVersion).then((cache) => {
      cache.addAll([...cacheList, "/"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
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
            // let responseClone = response.clone();

            // caches.open(currentCacheStorageVersion).then(function (cache) {
            //   cache.put(event.request, responseClone);
            // });

            return response;
          });
        }
      })
      .catch((err) => console.error(err))
  );
});

// 新worker获得控制权后会触发该事件
// 这里删除旧缓存
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.delete(lastCacheVersion));
});

// 接收postMessage
self.addEventListener("message", function (e) {
  if (e.data === "skipWaiting") {
    self.skipWaiting();
  }
});
