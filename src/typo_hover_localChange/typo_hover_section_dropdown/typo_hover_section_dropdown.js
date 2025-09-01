// typo_hover_section_dropdown.js

export function typo_hover_section_dropdown() {
  const pairs = [
    {
      buttonId: "typo-all-hover-font-button",
      sectionId: "typo-all-hover-font-section",
    },
    {
      buttonId: "typo-all-hover-border-button",
      sectionId: "typo-all-hover-border-section",
    },
    {
      buttonId: "typo-all-hover-shadow-button",
      sectionId: "typo-all-hover-shadow-section",
    },
    {
      buttonId: "typo-all-hover-effects-button",
      sectionId: "typo-all-hover-effects-section",
    },
  ];

  const byId = (id) => document.getElementById(id);
  const sectionIds = pairs.map((p) => p.sectionId);

  function showSection(sectionId) {
    sectionIds.forEach((id) => {
      const sec = byId(id);
      if (!sec) return;
      if (id === sectionId) {
        sec.classList.remove("sc-hidden");
      } else {
        sec.classList.add("sc-hidden");
      }
    });
  }

  document.addEventListener("click", (e) => {
    const clickedPair = pairs.find((p) => e.target.closest(`#${p.buttonId}`));
    if (!clickedPair) return;
    showSection(clickedPair.sectionId);
  });
}
