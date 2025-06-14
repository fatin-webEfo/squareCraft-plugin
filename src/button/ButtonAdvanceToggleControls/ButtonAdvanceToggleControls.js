export function ButtonAdvanceToggleControls() {
  const buttonIdsToSectionIds = {
    button_advance_vertical: "button-advance-vertical",
    button_advance_horizontal: "button-advance-horizontal",
    button_advance_opacity: "button-advance-opacity",
    button_advance_scale: "button-advance-scale",
    button_advance_rotate: "button-advance-rotate",
    button_advance_blur: "button-advance-blur"
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
