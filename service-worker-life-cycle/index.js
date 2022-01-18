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

const button = document.getElementById("calculate");

button.addEventListener("click", function () {
  const param1 = document.getElementById("param1");
  const param2 = document.getElementById("param2");

  const result = document.getElementById("result");
  result.textContent = param1.value + param2.value;
});
