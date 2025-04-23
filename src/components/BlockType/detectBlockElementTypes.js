let currentButtonType = "Unknown Button";

export function detectBlockElementTypes(block) {
  let foundType = null;
  block.querySelectorAll("h1, h2, h3, h4, p, img, a, button").forEach(el => {
    const tag = el.tagName.toLowerCase();
    const cls = el.classList;

    if (["h1", "h2", "h3", "h4"].includes(tag) || (tag === "p" && !cls.contains("rte-placeholder") && el.innerText.trim())) {
      foundType = "text";
    }

    if (tag === "img" && !cls.contains("ProseMirror-separator") && el.closest(".sqs-image-content")) {
      foundType = "image";
    }

    if ((tag === "a" || tag === "button") && !el.querySelector("img")) {
      foundType = "button";
      if (cls.contains("sqs-button-element--primary")) currentButtonType = "Primary Button";
      else if (cls.contains("sqs-button-element--secondary")) currentButtonType = "Secondary Button";
      else if (cls.contains("sqs-button-element--tertiary")) currentButtonType = "Tertiary Button";
      else currentButtonType = "Unknown Button";
      console.log("🔘 Detected Button Type:", currentButtonType);
    }
  });

  const hide = id => document.getElementById(id)?.classList.add("sc-hidden");
  const show = id => document.getElementById(id)?.classList.remove("sc-hidden");

  ["typoSection", "imageSection", "buttonSection"].forEach(hide);
  if (foundType === "text") show("typoSection");
  else if (foundType === "image") show("imageSection");
  else if (foundType === "button") show("buttonSection");

  return currentButtonType;
}

export const getCurrentButtonType = async () => currentButtonType;
