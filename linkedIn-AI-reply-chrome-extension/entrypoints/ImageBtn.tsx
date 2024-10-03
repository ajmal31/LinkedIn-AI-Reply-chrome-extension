import { root } from "postcss";
import PromptBar from "./components/PromptBar";
import "./index.css";
import { useState } from "react";
import ReactDOM from "react-dom/client";

const ImageButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal ? (
        <PromptBar onClose={handleModal} />
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            zIndex: 10,
          }}
        >
          <img
            src="https://imgs.search.brave.com/iowLll4bKVM1hAXSnnf7Ec6SR0Qd6nR9eHQswwXfxmM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVyZXNhbmFp/Zm9ydGhhdC5jb20v/aWNvbnMvaWNvbi1n/ZW5lcmF0ZS5zdmc_/aGVpZ2h0PTIwNw"
            alt="Clickable"
            onClick={handleModal}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            contentEditable="false"
          />
        </div>
      )}
    </>
  );
};

export default ImageButton;
