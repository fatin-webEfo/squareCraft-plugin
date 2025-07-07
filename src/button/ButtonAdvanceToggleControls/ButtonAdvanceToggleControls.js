export function ButtonAdvanceToggleControls() {
  const buttonIds = [
    "button-advance-vertical",
    "button-advance-horizontal",
    "button-advance-opacity",
    "button-advance-scale",
    "button-advance-rotate",
    "button-advance-blur",
  ];

  buttonIds.forEach((btnId) => {
    const button = document.getElementById(btnId);
    const sectionId = `${btnId}-section`;

    if (button && document.getElementById(sectionId)) {
      const handleInteraction = () => {
        buttonIds.forEach((otherBtnId) => {
          const otherSection = document.getElementById(`${otherBtnId}-section`);
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

        const structureSection = document.getElementById(
          "button-advance-structure-section"
        );
        if (structureSection) {
          const anyVisible = buttonIds.some((id) => {
            const el = document.getElementById(`${id}-section`);
            return el && !el.classList.contains("sc-hidden");
          });
          if (anyVisible) {
            structureSection.classList.add("sc-hidden");
          }
        }
      };

      button.addEventListener("click", handleInteraction);
    }
  });

  const structureBtn = document.getElementById(
    "button-advance-structure-button"
  );
  const structureSection = document.getElementById(
    "button-advance-structure-section"
  );

  if (structureBtn && structureSection) {
    structureBtn.addEventListener("click", () => {
      buttonIds.forEach((id) => {
        const el = document.getElementById(`${id}-section`);
        if (el && !el.classList.contains("sc-hidden")) {
          el.classList.remove("sc-visible");
          el.classList.add("sc-hidden");
        }
      });
      structureSection.classList.remove("sc-hidden");
      structureSection.classList.add("sc-visible");
      structureSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }


  
  
}

