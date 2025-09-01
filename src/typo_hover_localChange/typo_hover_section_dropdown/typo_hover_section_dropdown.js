// typo_hover_section_dropdown.js

export function typo_hover_section_dropdown() {
  const HoverTypoIds = [
    "typo-all-hover-font",
    "typo-all-hover-border",
    "typo-all-hover-shadow",
    "typo-all-hover-effects",
  ];

  HoverTypoIds.forEach((btnId) => {
    const btn = document.getElementById(`${btnId}-button`);
    const sectionId = `${btnId}-section`;

    if (btn && document.getElementById(sectionId)) {
      const handleInteraction = () => {
        HoverTypoIds.forEach((otherId) => {
          const otherSection = document.getElementById(`${otherId}-section`);
          if (!otherSection) return;

          if (otherId === btnId) {
            otherSection.classList.remove("sc-hidden");
            otherSection.classList.add("sc-visible");
            otherSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            otherSection.classList.remove("sc-visible");
            otherSection.classList.add("sc-hidden");
          }
        });
      };

      btn.addEventListener("click", handleInteraction);
    }
  });
}
