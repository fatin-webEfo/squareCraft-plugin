import { detectBlockElementTypePure } from "https://fatin-webefo.github.io/squareCraft-plugin/detectBlockElementTypePure.js";

export function handleSectionFind() {
  const sections = document.querySelectorAll("section[data-section-id]");
  const results = [];

  sections.forEach((section) => {
    const sectionId = section.getAttribute("data-section-id");
    const blockEls = section.querySelectorAll('[id^="block-"]');

    const blocks = Array.from(blockEls).map((el) => {
      const blockId = el.id;
      let foundType = detectBlockElementTypePure(el);
      const tag = el.tagName?.toLowerCase();
      const cls = el.classList;

      if (!foundType && (tag === "a" || tag === "button")) {
        const iconImg = el.querySelector("img");
        if (
          !iconImg ||
          (iconImg && iconImg.classList.contains("sqscraft-button-icon"))
        ) {
          let currentButtonType;
          if (cls.contains("sqs-button-element--primary"))
            currentButtonType = "Primary Button";
          else if (cls.contains("sqs-button-element--secondary"))
            currentButtonType = "Secondary Button";
          else if (cls.contains("sqs-button-element--tertiary"))
            currentButtonType = "Tertiary Button";
          else currentButtonType = "Button";

          foundType = currentButtonType;

          const buttonTypeEl = document.getElementById("buttonTypeDisplay");
          if (buttonTypeEl) {
            buttonTypeEl.textContent = currentButtonType;
          }
        }
      }

      if (
        !foundType &&
        tag === "img" &&
        el.closest(".sqs-image-content") &&
        el.closest(".fluid-image-editor-wrapper")
      ) {
        foundType = "image";
      }

      return { blockId, type: foundType };
    });

    let sectionType = "block";
    const className = section.className.toLowerCase();

    if (className.includes("footer")) sectionType = "footer";
    else if (className.includes("header")) sectionType = "header";
    else if (section.querySelector("form")) sectionType = "form";
    else if (
      section.querySelector(".gallery-grid") ||
      section.querySelector(".gallery")
    )
      sectionType = "gallery";
    else if (
      section.querySelector(".sqs-block-image") &&
      className.includes("auto")
    )
      sectionType = "auto-layout";
    else if (section.closest("article[data-page-sections]"))
      sectionType = "collection";

    results.push({
      sectionId,
      sectionType,
      blocks,
    });
  });

  console.log("🧩 handleSectionFind() Output:", results);
  return results;
}
