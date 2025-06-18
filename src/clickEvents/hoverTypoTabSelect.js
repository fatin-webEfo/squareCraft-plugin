export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select'], div[id$='button']");
  if (
    !clicked ||
    (!clicked.id.startsWith("typo-") && !clicked.id.startsWith("hover-"))
  )
    return;

  // Handle tab selection logic
  if (clicked.id.includes("Dropdown")) {
    const [prefix, rawId, tabType] = clicked.id.split("-");
    const baseId = rawId.replace("Dropdown", "");
    const styleIds = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];

    if (!styleIds.includes(tabType)) return;

    styleIds.forEach((type) => {
      const tabId = `hover-${rawId}-${type}`;
      const descId = `hover-scDesc-${rawId}-${type}`;

      const tab = document.getElementById(tabId);
      const desc = document.getElementById(descId);

      if (tab) {
        tab.classList.toggle(
          "sc-select-activeTab-border",
          tabId === clicked.id
        );
        tab.classList.toggle(
          "sc-select-inActiveTab-border",
          tabId !== clicked.id
        );
      }

      if (desc) {
        desc.classList.toggle("sc-hidden", tabId !== clicked.id);
      }
    });

    const hoverParts = [
      "hover-heading1Part",
      "hover-heading2Part",
      "hover-heading3Part",
      "hover-heading4Part",
      "hover-paragraph1Part",
      "hover-paragraph2Part",
      "hover-paragraph3Part",
    ];

    hoverParts.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add("sc-hidden");
    });

    const currentPart = document.getElementById(`hover-${baseId}Part`);
    if (currentPart) currentPart.classList.remove("sc-hidden");
  }

  if (clicked.id.endsWith("-button")) {
    const sectionId = clicked.id.replace("-button", "-section");

    const sectionTypes = ["all", "bold", "italic", "link"];
    const sectionTargets = ["font", "color", "effects", "border"];

    sectionTypes.forEach((type) => {
      sectionTargets.forEach((target) => {
        const id = `typo-${type}-hover-${target}-section`;
        const section = document.getElementById(id);
        if (section) {
          if (id === sectionId) {
            section.classList.remove("sc-hidden");
          } else {
            section.classList.add("sc-hidden");
          }
        }
      });
    });
  }
}
