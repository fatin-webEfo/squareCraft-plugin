export function getTextType(tagName, element) {
    const classList = element?.classList || [];
  
    if (tagName === "h1") return { type: "heading1", borderColor: "#FF0000" };
    if (tagName === "h2") return { type: "heading2", borderColor: "#FFA500" };
    if (tagName === "h3") return { type: "heading3", borderColor: "#FFFF00" };
    if (tagName === "h4") return { type: "heading4", borderColor: "#008000" };
  
    if (tagName === "p") {
      if (classList.contains("sqsrte-large")) {
        return { type: "paragraph1", borderColor: "#4B0082" };
      } else if (classList.contains("sqsrte-small")) {
        return { type: "paragraph3", borderColor: "#0000FF" };
      } else {
        return { type: "paragraph2", borderColor: "#9400D3" };
      }
    }
  
    return null;
  }
  