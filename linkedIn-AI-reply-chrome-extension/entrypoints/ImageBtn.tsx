import React from "react";
import App from "./popup/App";

const ImageButton = () => {

  const [showApp, setShowApp] = useState(false);
  const handleClick = () => {
    // alert("clicked")
    setShowApp(!showApp);
    console.log("Status of showApp",showApp)
  };
 console.log("component renderes")
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 10,
        }}
        className=""
      >
        <img
          src="https://imgs.search.brave.com/iowLll4bKVM1hAXSnnf7Ec6SR0Qd6nR9eHQswwXfxmM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVyZXNhbmFp/Zm9ydGhhdC5jb20v/aWNvbnMvaWNvbi1n/ZW5lcmF0ZS5zdmc_/aGVpZ2h0PTIwNw"
          alt="Clickable"
          onClick={handleClick}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          contentEditable="false"
        />
      </div>
      {console.log("what's happeing for App ????")}
      {showApp && <App />}
    </>
  );
};

export default ImageButton;
