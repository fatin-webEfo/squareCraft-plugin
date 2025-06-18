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

  const dropdown = clicked.closest(`#${baseId}`); // this is still safe
  if (!dropdown) return;

  styleIds.forEach((sfx) => {
    const tab = dropdown.querySelector(`#${baseId}-${sfx}`);
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
      if (`${baseId}-${sfx}` === fullId) {
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

  const targetBase = baseId.replace("Dropdown", "");
  const partId = `${targetBase}Part`; // example: hover-heading2Part

  hoverTypoIds.forEach((id) => {
    const part = document.getElementById(`${id}Part`);
    if (part) part.classList.add("sc-hidden");
  });

  const currentPart = document.getElementById(partId);
  if (currentPart) currentPart.classList.remove("sc-hidden");
}
