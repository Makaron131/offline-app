const input = document.querySelector("#text");
const result = document.querySelector("#result");

if (window.Worker) {
  const myWorker = new Worker("./worker.js");

  input.onchange = function () {
    // 向 worker 发送消息
    myWorker.postMessage(input.value);
    console.log("input onchange: post input value to worker");
  };

  // 获取来自 worker 的 message
  myWorker.onmessage = function (e) {
    console.log(`main thread onmessage: receive ${e.data} from worker`);
    result.textContent = e.data;
  };
}
