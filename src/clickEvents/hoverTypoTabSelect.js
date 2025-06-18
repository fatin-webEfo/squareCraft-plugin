export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked) return;

  const fullId = clicked.id; // e.g. "hover-heading2Dropdown-allSelect"
  const idParts = fullId.split("-");
  if (idParts.length < 3) return;

  const baseId = idParts[0] + "-" + idParts[1]; // "hover-heading2Dropdown"
  const suffix = idParts[2]; // "allSelect", "boldSelect", etc.

  const styleIds = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];
  if (!styleIds.includes(suffix)) return;

  const dropdown = clicked.closest(`#${baseId}`);
  if (!dropdown) return;

  styleIds.forEach((sfx) => {
    const tab = dropdown.querySelector(`#${baseId}-${sfx}`);
    const desc = dropdown.querySelector(`#hover-scDesc-${baseId}-${sfx}`);

    if (tab) {
      tab.classList.toggle("sc-select-activeTab-border", tab === clicked);
      tab.classList.toggle("sc-select-inActiveTab-border", tab !== clicked);
    }

    if (desc) {
      desc.classList.toggle("sc-hidden", `${baseId}-${sfx}` !== fullId);
    }
  });
}
