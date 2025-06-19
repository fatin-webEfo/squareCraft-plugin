export function initHoverTypoTabControls(pairs = []) {
  const allSectionIds = pairs.map(({ sectionId }) => sectionId);

  pairs.forEach(({ buttonId, sectionId }) => {
    const button = document.getElementById(buttonId);
    const section = document.getElementById(sectionId);

    if (button && section) {
      button.addEventListener("click", (e) => {
        e.stopPropagation();

        allSectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el && id !== sectionId) {
            el.classList.add("sc-hidden");
            el.classList.remove("sc-visible");
          }
        });

        section.classList.remove("sc-hidden");
        section.classList.add("sc-visible");
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });
}
