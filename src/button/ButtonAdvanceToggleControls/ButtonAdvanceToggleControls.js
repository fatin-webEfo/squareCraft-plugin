export function ButtonAdvanceToggleControls() {
  const sections = {
    "button-advance-vertical": "buttonVerticalEffect",
    "button-advance-horizontal": "buttonHorizontalEffect",
    "button-advance-opacity": "buttonOpacityEffect",
    "button-advance-scale": "buttonScaleEffect",
    "button-advance-rotate": "buttonRotateEffect",
    "button-advance-blur": "buttonBlurEffect",
  };

  Object.keys(sections).forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    const sectionId = sections[buttonId];

    if (button && document.getElementById(sectionId)) {
      const toggleSection = () => {
        Object.entries(sections).forEach(([btnId, secId]) => {
          const section = document.getElementById(secId);
          if (!section) return;

          if (btnId === buttonId) {
            section.classList.remove("sc-hidden");
            section.classList.add("sc-visible");
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            section.classList.remove("sc-visible");
            section.classList.add("sc-hidden");
          }
        });
      };

      button.addEventListener("click", toggleSection);
      button.addEventListener("mouseenter", toggleSection);
    }
  });
}
