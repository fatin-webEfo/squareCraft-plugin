export function ButtonAdvanceToggleControls() {
  const buttonIdsToSectionIds = {
    fontAdvanceButton: "fontAdvanceSection",
    iconAdvanceButton: "iconAdvanceSection",
    borderAdvanceButton: "borderAdvanceSection",
    shadowAdvanceButton: "shadowAdvanceSection",
    spacingAdvanceButton: "spacingAdvanceSection",
  };

  Object.keys(buttonIdsToSectionIds).forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    const targetSectionId = buttonIdsToSectionIds[buttonId];

    if (button && document.getElementById(targetSectionId)) {
      button.addEventListener("click", () => {
        Object.entries(buttonIdsToSectionIds).forEach(([id, sectionId]) => {
          const section = document.getElementById(sectionId);
          if (!section) return;

          if (id === buttonId) {
            section.classList.remove("sc-hidden");
            section.classList.add("sc-visible");
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            section.classList.remove("sc-visible");
            section.classList.add("sc-hidden");
          }
        });
      });
    }
  });
}
