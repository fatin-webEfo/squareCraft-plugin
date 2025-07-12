export function TypoAdvanceToggleControls() {
  const TypoIds = [
    "Typo-advance-vertical",
    "Typo-advance-horizontal",
    "Typo-advance-opacity",
    "Typo-advance-scale",
    "Typo-advance-rotate",
    "Typo-advance-blur",
  ];

  TypoIds.forEach((btnId) => {
    const Typo = document.getElementById(btnId);
    const sectionId = `${btnId}-section`;

    if (Typo && document.getElementById(sectionId)) {
      const handleInteraction = () => {
        TypoIds.forEach((otherBtnId) => {
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
          "Typo-advance-structure-section"
        );
        if (structureSection) {
          const anyVisible = TypoIds.some((id) => {
            const el = document.getElementById(`${id}-section`);
            return el && !el.classList.contains("sc-hidden");
          });
          if (anyVisible) {
            structureSection.classList.add("sc-hidden");
          }
        }
      };

      Typo.addEventListener("click", handleInteraction);
    }
  });

  const structureBtn = document.getElementById(
    "Typo-advance-structure-Typo"
  );
  const structureSection = document.getElementById(
    "Typo-advance-structure-section"
  );

  if (structureBtn && structureSection) {
    structureBtn.addEventListener("click", () => {
      TypoIds.forEach((id) => {
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
