export function handleSectionFind() {
  const sections = document.querySelectorAll("section[data-section-id]");
  console.log(`📦 Total Squarespace Sections: ${sections.length}`);

  sections.forEach((section, index) => {
    const sectionId = section.getAttribute("data-section-id");
    const blockEls = section.querySelectorAll('[id^="block-"]');
    const blockIds = Array.from(blockEls).map((el) => el.id);

    console.log(`\n📦 Section ${index + 1} (data-section-id="${sectionId}"):`);
    if (blockIds.length === 0) {
      console.log("   - No blocks found in this section.");
    } else {
      blockIds.forEach((blockId) => {
        console.log(`   - Block ID: ${blockId}`);
      });
    }
  });
}
