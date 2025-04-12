export function detectBlockElementTypes(block) {
    if (!block) return;
  
    const nestedElements = block.querySelectorAll("h1, h2, h3, h4, p, img, a, button");
  
    nestedElements.forEach((el) => {
      const tagName = el.tagName.toLowerCase();
      const classList = el.classList;
  
      if (tagName === "h1") return console.log({ type: "text", tag: "h1", element: el }); 
      if (tagName === "h2") return console.log({ type: "text", tag: "h2", element: el });
      if (tagName === "h3") return console.log({ type: "text", tag: "h3", element: el });
      if (tagName === "h4") return console.log({ type: "text", tag: "h4", element: el });
  
      if (tagName === "p") {
        if (
          classList.contains("rte-placeholder") || 
          classList.contains("ProseMirror-widget") ||
          el.innerText.trim() === ""
        ) return;
  
        if (classList.contains("sqsrte-large"))
          return console.log({ type: "text", tag: "p", sub: "paragraph1", element: el });
        else if (classList.contains("sqsrte-small"))
          return console.log({ type: "text", tag: "p", sub: "paragraph3", element: el });
        else
          return console.log({ type: "text", tag: "p", sub: "paragraph2", element: el });
      }
  
      if (tagName === "img") {
        if (classList.contains("ProseMirror-separator")) return;
        return console.log({ type: "image", element: el });
      }
  
      if (tagName === "a" || tagName === "button") {
        if (el.querySelector("img")) return; 
        return console.log({ type: "button", element: el });
      }
    });
  }
  