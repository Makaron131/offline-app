import React from "react";
import ReactDOM from "react-dom";
import App from './app'

import runtime from "serviceworker-webpack-plugin/lib/runtime";

ReactDOM.render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  runtime
    .register({ scope: "/" })
    .then((reg: ServiceWorkerRegistration) => {
      if (reg.waiting) {
        emitUpdate();
        console.log("service-worker waiting!");
        return;
      }

      // 当第一次下载到新的serviceWorker时，会触发这里
      // 这个worker会在后台被安装好
      reg.onupdatefound = function () {
        const installingWorker = reg.installing;
        console.log("installing worker:", installingWorker);
        if (installingWorker) {
          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
              case "installed":
                if (navigator.serviceWorker.controller) {
                  emitUpdate();
                }
                break;
              default:
                break;
            }
          };
        }
      };

      console.log("service-worker register success:", reg.scope);
    })
    .catch((err: unknown) => {
      console.log("service-worker register fail:", err);
    });

  let refresh = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refresh) {
      // console.log("refresh");
      refresh = true;
      window.location.reload();
    }
  });
}

function emitUpdate() {
  const event = document.createEvent("Event");
  // 这个事件是自定义的，用于通知客户端 service worker 有更新
  event.initEvent("sw.update", true, true);
  window.dispatchEvent(event);
}
