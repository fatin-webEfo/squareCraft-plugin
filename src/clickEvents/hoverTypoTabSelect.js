
export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='-button']");
  if (!clicked) return;

  const sectionId = clicked.id.replace("-button", "-section");

  ["all", "bold", "italic", "link"].forEach((type) => {
    ["font", "color", "effects", "border"].forEach((target) => {
      const id = `typo-${type}-hover-${target}-section`;
      const section = document.getElementById(id);
      if (section) section.classList.toggle("sc-hidden", id !== sectionId);
    });
  });
}

