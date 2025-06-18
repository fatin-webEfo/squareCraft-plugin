export function initHoverTypoTabControls() {
  const buttonIds = [
    "typo-all-hover-font-button",
    "typo-all-hover-color-button",
    "typo-all-hover-effects-button",
    "typo-all-hover-border-button",
  ];

  buttonIds.forEach((btnId) => {
    const button = document.getElementById(btnId);
    const sectionId = `${btnId.replace("-button", "-section")}`;

    if (button && document.getElementById(sectionId)) {
      const handleInteraction = () => {
        buttonIds.forEach((otherBtnId) => {
          const otherSectionId = `${otherBtnId.replace("-button", "-section")}`;
          const otherSection = document.getElementById(otherSectionId);
          if (!otherSection) return;

          if (otherBtnId === btnId) {
            otherSection.classList.remove("sc-hidden");
            otherSection.classList.add("sc-visible");
            otherSection.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            otherSection.classList.remove("sc-visible");
            otherSection.classList.add("sc-hidden");
          }
        });
      };

      button.addEventListener("click", handleInteraction);
    }
  });
}
