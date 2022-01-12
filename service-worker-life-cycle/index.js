if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/offline-app/service-worker-life-cycle/sw.js")
    .then(function (reg) {
      if (reg.installing) {
        console.log("worker installing");
      } else if (reg.waiting) {
        console.log("worker waiting");
      } else if (reg.active) {
        console.log("worker active");
      }
    })
    .catch(function (error) {
      console.log("registration fail with", error);
    });
}

console.log(1);
