// 监听 message 事件，并向主线程（ UI 线程 ）发送 message
self.addEventListener("message", function (e) {
  console.log(`worker onmessage: receive message ${e.data} from UI thread`);

  self.postMessage(`ok, i got ${e.data}`);
});
