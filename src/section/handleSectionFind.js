import { detectBlockElementTypePure } from "https://fatin-webefo.github.io/squareCraft-plugin/html.js/detectBlockElementTypePure.js";

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

    let sectionType = "normal";
    const classes = section.className.toLowerCase();

    if (classes.includes("header")) sectionType = "header";
    else if (classes.includes("footer")) sectionType = "footer";
    else if (section.querySelector("form")) sectionType = "form";

    results.push({
      sectionId,
      blockIds,
      sectionType,
      blocks,
    });
  });

  return results;
}
