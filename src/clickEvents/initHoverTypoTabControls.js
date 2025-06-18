export function initHoverTypoTabControls() {
  const tabTypes = ["all", "bold", "italic", "link"];
  const sectionTypes = ["font", "color", "effects", "border"];

  tabTypes.forEach((tabType) => {
    sectionTypes.forEach((sectionType) => {
      const buttonId = `typo-${tabType}-hover-${sectionType}-button`;
      const sectionId = `typo-${tabType}-hover-${sectionType}-section`;

      const button = document.getElementById(buttonId);
      if (!button) return;

      button.addEventListener("click", () => {
        sectionTypes.forEach((otherType) => {
          const otherSectionId = `typo-${tabType}-hover-${otherType}-section`;
          const otherSection = document.getElementById(otherSectionId);
          if (!otherSection) return;

          if (otherType === sectionType) {
            otherSection.classList.remove("sc-hidden");
            otherSection.classList.add("sc-visible");
            otherSection.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            otherSection.classList.remove("sc-visible");
            otherSection.classList.add("sc-hidden");
          }
        });
      });
    });
  });
}
