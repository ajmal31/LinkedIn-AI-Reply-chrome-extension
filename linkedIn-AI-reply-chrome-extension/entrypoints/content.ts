import ReactDOM from "react-dom/client";
import ImageButton from "./ImageBtn";
import React from "react";

export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      onMount: (container) => {
        setTimeout(() => {
          // Find the parent container of the message box
          let messageBox = document.querySelector(".msg-form__contenteditable");
          if (!messageBox) return;

          // Find the parent container that has the proper position and dimensions
          const parentContainer = messageBox.closest(".flex-grow-1.relative");
          if (!parentContainer) return;

          // Create a new div for the image button
          const imgContainer = document.createElement("div");
          imgContainer.style.position = "absolute";
          imgContainer.style.bottom = "0px";
          imgContainer.style.right = "0px";
          imgContainer.style.zIndex = "10";
          imgContainer.style.width = "50px"; 
          imgContainer.style.height = "50px";

          parentContainer?.appendChild(imgContainer);

          // Render the React component inside the container
          const root = ReactDOM.createRoot(imgContainer);
          root.render(React.createElement(ImageButton as typeof ImageButton));
        }, 5000);
      },
      onRemove: (root) => {
        // root?.unmount();
      },
    });

    ui.mount();
  },
});


