import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const Notification = () => {
  const [visible, setVisible] = useState(false);

  const handleUpdate = () => {
    setVisible(true);
  };

  useEffect(() => {

    // sw.update
    window.addEventListener("sw.update", handleUpdate);

    return () => {
      window.removeEventListener("sw.update", handleUpdate);
    };
  }, []);

  return (
    <div
      className={styles.main}
      style={{
        transform: visible ? "" : "translateY(-100px)",
        transition: "all 0.7s ease-out",
      }}
    >
      资源需要更新：
      <a
        href="###"
        onClick={(e) => {
          e.preventDefault();
          try {
            navigator.serviceWorker.getRegistration().then((reg) => {
              reg && reg.waiting && reg.waiting.postMessage("skipWaiting");
            });
          } catch (e) {
            console.error(e);
          }
        }}
        className={styles.update}
      >
        点击更新
      </a>
    </div>
  );
};

export default Notification;
