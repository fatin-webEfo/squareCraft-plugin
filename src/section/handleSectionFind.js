export function handleSectionFind() {
  const sections = document.querySelectorAll("section[data-section-id]");
  const sectionIds = Array.from(sections).map((sec) =>
    sec.getAttribute("data-section-id")
  );

  console.log(`📦 Total Squarespace Sections: ${sections.length}`);
  console.log("🧩 Section IDs:", sectionIds);
}
