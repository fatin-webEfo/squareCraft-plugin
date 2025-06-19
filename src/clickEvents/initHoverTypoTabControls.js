export function initHoverTypoTabControls(pairs = []) {
  pairs.forEach(({ buttonId, sectionId }) => {
    const button = document.getElementById(buttonId);
    const section = document.getElementById(sectionId);

    if (button && section) {
      button.addEventListener("click", (e) => {
        e.stopPropagation();

        const isHidden = section.classList.contains("sc-hidden");

        document.querySelectorAll("[id$='-section']").forEach((el) => {
          el.classList.add("sc-hidden");
          el.classList.remove("sc-visible");
        });

        if (isHidden) {
          section.classList.remove("sc-hidden");
          section.classList.add("sc-visible");
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });
}
