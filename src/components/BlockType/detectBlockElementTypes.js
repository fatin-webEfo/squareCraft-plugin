let currentButtonType = "Unknown Button";

export function detectBlockElementTypes(block) {
  const nestedElements = block.querySelectorAll("h1, h2, h3, h4, p, img, a, button");

  let foundType = null;

  nestedElements.forEach((el) => {
    const tagName = el.tagName.toLowerCase();
    const classList = el.classList;

    if (["h1", "h2", "h3", "h4"].includes(tagName)) foundType = "text";
    if (tagName === "p" && !classList.contains("rte-placeholder") && el.innerText.trim() !== "") foundType = "text";
    if (tagName === "img" && el.closest(".sqs-image-content")) foundType = "image";

    if ((tagName === "a" || tagName === "button") && !el.querySelector("img")) {
      foundType = "button";
      if (classList.contains("sqs-button-element--primary")) currentButtonType = "Primary Button";
      else if (classList.contains("sqs-button-element--secondary")) currentButtonType = "Secondary Button";
      else if (classList.contains("sqs-button-element--tertiary")) currentButtonType = "Tertiary Button";
      else currentButtonType = "Unknown Button";
    }
  });

  return foundType;
}

export function getCurrentButtonType() {
  return currentButtonType;
}
