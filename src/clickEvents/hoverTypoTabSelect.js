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

  const hoverSections = {
    "typo-hover-font-button": "typo-hover-font-section",
    "typo-hover-border-button": "typo-hover-border-section",
    "typo-hover-shadow-button": "typo-hover-shadow-section",
    "typo-hover-effects-button": "typo-hover-effects-section",
  };

  const hoverArrows = {
    "typo-hover-font-button": "typo-hover-font-arrow",
    "typo-hover-border-button": "typo-hover-border-arrow",
    "typo-hover-shadow-button": "typo-hover-shadow-arrow",
    "typo-hover-effects-button": "typo-hover-effects-arrow",
  };

  Object.keys(hoverSections).forEach((btnId) => {
    const btn = document.getElementById(btnId);
    const section = document.getElementById(hoverSections[btnId]);
    const arrow = document.getElementById(hoverArrows[btnId]);

    if (btn && section) {
      if (btn.contains(event.target) || btn === event.target) {
        section.classList.remove("sc-hidden");
        section.classList.add("sc-visible");
        arrow?.classList.remove("sc-rotate-180");
        arrow?.style && (arrow.style.transition = "transform 0.3s ease");
      } else {
        section.classList.add("sc-hidden");
        section.classList.remove("sc-visible");
        if (arrow && !arrow.classList.contains("sc-rotate-180")) {
          arrow.classList.add("sc-rotate-180");
          arrow.style.transition = "transform 0.3s ease";
        }
      }
    }
  });
}
