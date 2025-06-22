import { detectBlockElementTypePure } from "https://fatin-webefo.github.io/squareCraft-plugin/detectBlockElementTypePure.js";

export function handleSectionFind() {
  const sections = document.querySelectorAll("section[data-section-id]");
  const results = [];

  sections.forEach((section) => {
    const sectionId = section.getAttribute("data-section-id");
    const blockEls = section.querySelectorAll('[id^="block-"]');
    const blockIds = Array.from(blockEls).map((el) => el.id);

    const blocks = blockIds.map((blockId) => {
      const blockEl = document.getElementById(blockId);
      const type = detectBlockElementTypePure(blockEl);
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
      blockIds,
      blocks,
    });
  });
  console.log("🧩 handleSectionFind() Output:", results); 

  return results;
}
