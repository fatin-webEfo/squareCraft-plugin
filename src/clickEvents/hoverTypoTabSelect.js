export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked || !clicked.id.startsWith("hover-")) return;

  const dropdown = clicked.closest("[id^='hover-'][id$='Dropdown']");
  if (!dropdown) return;

  const idParts = clicked.id.split("-");
  const baseId = idParts[1];
  const suffix = idParts[2];
  const styleIds = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];
  if (!styleIds.includes(suffix)) return;

  styleIds.forEach((sfx) => {
    const fullId = `hover-${baseId}-${sfx}`;
    const tab = dropdown.querySelector(`#${fullId}`);
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
      if (clicked.id === fullId) {
        desc.classList.remove("sc-hidden");
      } else {
        desc.classList.add("sc-hidden");
      }
    }
  });

  const hoverTypoIds = [
    "hover-heading1",
    "hover-heading2",
    "hover-heading3",
    "hover-heading4",
    "hover-paragraph1",
    "hover-paragraph2",
    "hover-paragraph3",
  ];

  const partId = `hover-${baseId}Part`;
  hoverTypoIds.forEach((id) => {
    const part = document.getElementById(id + "Part");
    if (part) part.classList.add("sc-hidden");
  });

  const currentPart = document.getElementById(partId);
  if (currentPart) currentPart.classList.remove("sc-hidden");
}
