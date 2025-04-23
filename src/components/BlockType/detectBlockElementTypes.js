
export function detectBlockElementTypes(block) {
   let currentButtonType = "Unknown Button";
  const nestedElements = block.querySelectorAll("h1, h2, h3, h4, p, img, a, button");

  let foundType = null;

  nestedElements.forEach((el) => {
    const tagName = el.tagName.toLowerCase();
    const classList = el.classList;

    if (tagName === "h1" || tagName === "h2" || tagName === "h3" || tagName === "h4") {
      foundType = "text";
    }

    if (tagName === "p" && !classList.contains("rte-placeholder") && el.innerText.trim() !== "") {
      foundType = "text";
    }

    if (
      tagName === "img" && 
      !classList.contains("ProseMirror-separator") &&
      el.closest('.sqs-image-content')
    ) {
      foundType = "image";
    }

    if ((tagName === "a" || tagName === "button") && !el.querySelector("img")) {
      foundType = "button";

      if (classList.contains("sqs-button-element--primary")) {
        currentButtonType = "Primary Button";
        console.log("🟧 Button Type:", currentButtonType);
      } else if (classList.contains("sqs-button-element--secondary")) {
        currentButtonType = "Secondary Button";
        console.log("🟦 Button Type:", currentButtonType);
      } else if (classList.contains("sqs-button-element--tertiary")) {
        currentButtonType = "Tertiary Button";
        console.log("🟩 Button Type:", currentButtonType);
      } else {
        currentButtonType = "Unknown Button";
        console.log("⚪ Button Type:", currentButtonType);
      }
    }
  });

  const typoSection = document.getElementById("typoSection");
  const imageSection = document.getElementById("imageSection");
  const buttonSection = document.getElementById("buttonSection");

  if (!typoSection || !imageSection || !buttonSection) return;

  typoSection.classList.add("sc-hidden");
  imageSection.classList.add("sc-hidden");
  buttonSection.classList.add("sc-hidden");

  if (foundType === "text") {
    typoSection.classList.remove("sc-hidden");
  } else if (foundType === "image") {
    imageSection.classList.remove("sc-hidden");
  } else if (foundType === "button") {
    buttonSection.classList.remove("sc-hidden");
  }

}
