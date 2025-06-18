export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked || !clicked.id.startsWith("hover-")) return;

  const dropdown = clicked.closest("div");
  if (!dropdown) return;

  const idParts = clicked.id.split("-");
  const baseId = idParts[1]; // e.g., "heading2Dropdown"
  const suffix = idParts[2]; // e.g., "allSelect"

  const styleIds = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];
  if (!styleIds.includes(suffix)) return;

  styleIds.forEach((sfx) => {
    const tab = dropdown.querySelector(`#hover-${baseId}-${sfx}`);
    const desc = dropdown.querySelector(`#hover-scDesc-${baseId}-${sfx}`);

    if (tab) {
      if (tab === clicked) {
        tab.classList.add("sc-select-activeTab-border");
        tab.classList.remove("sc-select-inActiveTab-border");
      } else {
        tab.classList.remove("sc-select-activeTab-border");
        tab.classList.add("sc-select-inActiveTab-border");
      }
    }

    if (desc) {
      if (`hover-${baseId}-${sfx}` === clicked.id) {
        desc.classList.remove("sc-hidden");
      } else {
        desc.classList.add("sc-hidden");
      }
    }
  });

  // Convert from baseId like "heading2Dropdown" → "heading2"
  const base = baseId.replace("Dropdown", "");
  const currentPartId = `hover-${base}Part`;

  const hoverTypoParts = [
    "hover-heading1Part",
    "hover-heading2Part",
    "hover-heading3Part",
    "hover-heading4Part",
    "hover-paragraph1Part",
    "hover-paragraph2Part",
    "hover-paragraph3Part",
  ];

  hoverTypoParts.forEach((id) => {
    const part = document.getElementById(id);
    if (part) part.classList.add("sc-hidden");
  });

  const currentPart = document.getElementById(currentPartId);
  if (currentPart) currentPart.classList.remove("sc-hidden");
}
