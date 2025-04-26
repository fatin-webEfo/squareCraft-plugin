export function detectBlockElementTypes(block) {
  let foundType = null;
  let currentButtonType = "Unknown Button";

  block.querySelectorAll("h1, h2, h3, h4, p, img, a, button").forEach(el => {
    const tag = el.tagName.toLowerCase();
    const cls = el.classList;

    if (["h1", "h2", "h3", "h4"].includes(tag) || (tag === "p" && !cls.contains("rte-placeholder") && el.innerText.trim())) {
      foundType = "text";
    }

    if (tag === "img" && el.closest(".sqs-image-content") && el.closest(".fluid-image-editor-wrapper")) {
      foundType = "image";
    }

    if ((tag === "a" || tag === "button") && !el.querySelector("img")) {
      foundType = "button";

      if (cls.contains("sqs-button-element--primary")) currentButtonType = "Primary Button";
      else if (cls.contains("sqs-button-element--secondary")) currentButtonType = "Secondary Button";
      else if (cls.contains("sqs-button-element--tertiary")) currentButtonType = "Tertiary Button";
      else currentButtonType = "Button";

      const buttonTypeEl = document.getElementById("buttonTypeDisplay");
      if (buttonTypeEl) {
        buttonTypeEl.textContent = currentButtonType;
      }
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
