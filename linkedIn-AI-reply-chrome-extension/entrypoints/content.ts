// export default defineContentScript({
//   matches: ["https://www.linkedin.com/*"],
//   cssInjectionMode: "ui",
//   async main(ctx) {
//     alert("helo content.js file");
//     console.log("content script");

//     const ui = await createShadowRootUi(ctx, {
//       name: "language-learning-content-box",
//       position: "inline",
//       onMount: (container) => {
//         console.log("inside on mount started");
//         setTimeout(() => {
//           let messageBox = document.querySelector(".msg-form__contenteditable");

//           const imgContainer = document.createElement("div");
//           imgContainer.style.position = "absolute"; // Position the container absolutely
//           imgContainer.style.bottom = "10px"; // Position 10px from the bottom of the parent
//           imgContainer.style.right = "10px"; // Position 10px from the right of the parent
//           imgContainer.style.zIndex = "10"; // Ensure the button is above other elements

//           // Step 3: Create the image element
//           const img = document.createElement("img");
//           img.src = "https://imgs.search.brave.com/iowLll4bKVM1hAXSnnf7Ec6SR0Qd6nR9eHQswwXfxmM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aGVyZXNhbmFp/Zm9ydGhhdC5jb20v/aWNvbnMvaWNvbi1n/ZW5lcmF0ZS5zdmc_/aGVpZ2h0PTIwNw"; // Replace with the path to your image
//           img.alt = "Clickable Image"; // Add alt text for accessibility
//           img.style.cursor = "pointer"; // Change cursor to pointer for clickability
//           img.style.width = "30px"; // Set the width of the image (adjust as needed)
//           img.style.height = "30px"; // Set the height of the image (adjust as needed)
//           img.style.borderRadius = "50%"; // Make it circular if you want
//           img.contentEditable = "false"; // Ensure image is not editable

//           // Step 4: Add click event listener for the image
//           img.addEventListener("click", () => {
//             console.log("Image clicked");
//             // Add the desired action when the image is clicked
//             alert("Image clicked!");
//           });

//           // Step 5: Append the image to the container
//           imgContainer?.appendChild(img);

//           // Step 6: Append the container to the message input box (or its parent)
//           messageBox?.parentNode?.appendChild(imgContainer);
//         }, 10000);
//       },
//       // onRemove: (root) => {
//       //     root?.unmount();
//       // },
//     });
//     ui.mount();
//   },
// });

// entrypoints/example-ui.content/index.tsx
import ReactDOM from "react-dom/client";
import ImageButton from "./ImageBtn";
import React from "react";

export default defineContentScript({
  matches: ["<all_urls>"],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      onMount: (container) => {
        setTimeout(() => {
          let messageBox = document.querySelector(".msg-form__contenteditable");
          
          let root = ReactDOM.createRoot(messageBox!);
          root.render(React?.createElement(ImageButton as typeof ImageButton));

          return root;
        },10000);
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        // root?.unmount();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
