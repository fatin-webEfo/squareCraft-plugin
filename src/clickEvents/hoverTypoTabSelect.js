export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked) return;

  const fullId = clicked.id; // e.g. "hover-heading2Dropdown-boldSelect"
  const idParts = fullId.split("-");
  if (idParts.length < 3) return;

  const baseId = `${idParts[0]}-${idParts[1]}`; // hover-heading2Dropdown
  const suffix = idParts.slice(2).join("-"); // boldSelect

  const styleIds = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];
  if (!styleIds.includes(suffix)) return;

  const dropdown = clicked.closest(`#${baseId}`);
  if (!dropdown) return;

  styleIds.forEach((sfx) => {
    const tab = dropdown.querySelector(`#${baseId}-${sfx}`);
    const desc = document.getElementById(`hover-scDesc-${baseId}-${sfx}`);

    if (tab) {
      tab.classList.toggle("sc-select-activeTab-border", tab === clicked);
      tab.classList.toggle("sc-select-inActiveTab-border", tab !== clicked);
    }

    if (desc) {
      desc.classList.toggle("sc-hidden", `${baseId}-${sfx}` !== fullId);
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
  const partId = `${targetBase}Part`;

  hoverTypoIds.forEach((id) => {
    const part = document.getElementById(`${id}Part`);
    if (part) part.classList.add("sc-hidden");
  });

  const currentPart = document.getElementById(partId);
  if (currentPart) currentPart.classList.remove("sc-hidden");
}
