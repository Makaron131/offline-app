import React from "react";

const App: React.FC = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '500px'
        }}
      >
        <div
          style={{
            fontSize: "20px",
            color: "blue",
            width: "200px",
          }}
        >
          main page v0.0.1
        </div>
      </div>
    </>
  );
};

export default App;
