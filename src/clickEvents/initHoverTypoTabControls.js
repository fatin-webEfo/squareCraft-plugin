export function initHoverTypoTabControls() {
  const buttonToSectionMap = {
    "typo-hover-font-button": "typo-hover-font-section",
    "typo-hover-color-button": "typo-hover-color-section",
    "typo-hover-effects-button": "typo-hover-effects-section",
    "typo-hover-border-button": "typo-hover-border-section",
  };

  Object.keys(buttonToSectionMap).forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener("click", () => {
      const targetSectionId = buttonToSectionMap[buttonId];

      Object.values(buttonToSectionMap).forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        section.classList.toggle("sc-hidden", sectionId !== targetSectionId);
      });

      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
