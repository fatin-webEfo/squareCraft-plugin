export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked) return;

  const fullId = clicked.id;
  const idParts = fullId.split("-");
  if (idParts.length < 3) return;

  const baseId = idParts[0] + "-" + idParts[1];
  const suffix = idParts[2];

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

  const buttons = ["font", "border", "shadow", "effects"];

  buttons.forEach((key) => {
    const buttonId = `typo-hover-${key}-button`;
    const sectionId = `typo-hover-${key}-section`;
    const button = document.getElementById(buttonId);
    const section = document.getElementById(sectionId);
    const icon = button?.querySelector("img") || button?.querySelector("span");

    if (button && section) {
      if (button.contains(event.target) || button === event.target) {
        section.classList.remove("sc-hidden");
        icon?.classList.remove("sc-rotate-180");
      } else {
        section.classList.add("sc-hidden");
        icon?.classList.add("sc-rotate-180");
      }
    }
  });
}
