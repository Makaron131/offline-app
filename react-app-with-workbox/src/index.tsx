import React from "react";
import ReactDOM from "react-dom";
import App from './app'


ReactDOM.render(<App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

