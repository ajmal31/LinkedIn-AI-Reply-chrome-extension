// import ReactDOM from "react-dom/client";
// import ImageButton from "./ImageBtn";
// import React from "react";

// export default defineContentScript({
//   matches: ["https://www.linkedin.com/*"],

//   main(ctx) {
//     const ui = createIntegratedUi(ctx, {
//       position: "inline",
//       onMount: async(container) => {
//         setTimeout(() => {
//           // Find the parent container of the message box
//           let messageBox =document.querySelector(".msg-form__contenteditable");
//           console.log("message box");
//           console.log(messageBox)
//           if (!messageBox) return;

//           // Find the parent container that has the proper position and dimensions
//           const parentContainer = messageBox.closest(".flex-grow-1.relative");
//           if (!parentContainer) return;

//           // Create a new div for the image button
//           const imgContainer = document.createElement("div");
//           imgContainer.style.position = "absolute";
//           imgContainer.style.bottom = "0px";
//           imgContainer.style.right = "0px";
//           imgContainer.style.zIndex = "10";
//           imgContainer.style.width = "50px"; 
//           imgContainer.style.height = "50px";

//           parentContainer?.appendChild(imgContainer);

//           // Render the React component inside the container
//           const root = ReactDOM.createRoot(imgContainer);
//           root.render(React.createElement(ImageButton as typeof ImageButton));
//         }, 3000);
//       },
//       onRemove: (root) => {
//         // root?.unmount();
//       },
//     });

//     ui.mount();
//   },
// });


import ReactDOM from "react-dom/client";
import ImageButton from "./ImageBtn";
import React from "react";

export default defineContentScript({
  matches: ["https://www.linkedin.com/messaging/thread/*"],

  main(ctx) {
    let anchor:any
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor:()=>anchor,
      append:(anchor,root)=> anchor.insertAdjacentElement("afterend", root),
      onMount: async(container) => {
        // setTimeout(() => {
          // Find the parent container of the message box
          let messageBox =document.querySelector(".msg-form__contenteditable");
          console.log("message box");
          console.log(messageBox)
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
          return root
        // }, 3000);
      },
      onRemove: (root) => {
        // root?.unmount();
      },
    });
    watchDomChanges(ctx, '[class^="msg-form__contenteditable"]', {
      onAdd: (newAnchor:any) => {
        anchor = newAnchor;
        ui.mount();
      },
      onRemove: () => {
        ui.remove();
      },
    });
    // ui.mount();
  },
});


function watchDomChanges(ctx: any, selector: any, callbacks: any) {
  let prevAnchor: HTMLElement | undefined;

  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el && !prevAnchor) {
      callbacks.onAdd(el);
    } else if (!el && prevAnchor) {
      callbacks.onRemove();
    }
    prevAnchor = el;
  });
  ctx.onInvalidated(() => observer.disconnect());
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
  const initialEl = document.querySelector(selector);
  if (initialEl) {
    callbacks.onAdd(initialEl);
    prevAnchor = initialEl;
  }
}


