export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked || !clicked.id.startsWith("hover-")) return;

  const dropdown = clicked.closest("[id^='hover-'][id$='Dropdown']");
  if (!dropdown) return;

  const baseId = clicked.id.split("-")[1]; // e.g., "heading1"
  const suffix = clicked.id.split("-")[2]; // e.g., "boldSelect"
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
}
