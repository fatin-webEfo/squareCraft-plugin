import { detectBlockElementTypePure } from "https://fatin-webefo.github.io/squareCraft-plugin/detectBlockElementTypePure.js";

export function handleSectionFind() {
  const sections = document.querySelectorAll("section[data-section-id]");
  const results = [];

  sections.forEach((section) => {
    const sectionId = section.getAttribute("data-section-id");
    const blockEls = section.querySelectorAll('[id^="block-"]');

    const blocks = Array.from(blockEls).map((el) => {
      const blockId = el.id;
      let type = detectBlockElementTypePure(el);
      const tag = el.tagName?.toLowerCase();
      const cls = el.classList;

      if (
        (type === "button" || tag === "a" || tag === "button") &&
        (!el.querySelector("img") ||
          el.querySelector("img")?.classList.contains("sqscraft-button-icon"))
      ) {
        if (cls.contains("sqs-button-element--primary"))
          type = "Primary Button";
        else if (cls.contains("sqs-button-element--secondary"))
          type = "Secondary Button";
        else if (cls.contains("sqs-button-element--tertiary"))
          type = "Tertiary Button";
        else type = "Button";

        const buttonTypeEl = document.getElementById("buttonTypeDisplay");
        if (buttonTypeEl) {
          buttonTypeEl.textContent = type;
        }
      }

      if (
        !type &&
        tag === "img" &&
        el.closest(".sqs-image-content") &&
        el.closest(".fluid-image-editor-wrapper")
      ) {
        type = "image";
      }

      return { blockId, type };
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
