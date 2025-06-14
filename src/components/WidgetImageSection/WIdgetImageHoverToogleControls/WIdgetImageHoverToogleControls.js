export function WidgetImageHoverToggleControls() {
  const sections = {
    "image-hover-border": "image-hover-border-section",
    "image-hover-filter": "image-hover-filter-section",
    "image-hover-overLayButton": "Image-hover-overLaySection",
    "image-hover-shadowsButton": "image-hover-shadowsSection",
    "hover-image-effects-Effect": "hover-image-effects-section",
  };

  Object.keys(sections).forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    const sectionId = sections[buttonId];

    if (button && document.getElementById(sectionId)) {
      button.addEventListener("click", () => {
        Object.entries(sections).forEach(([btnId, secId]) => {
          const section = document.getElementById(secId);
          const arrow =
            document.querySelector(`#${btnId}-arrow`) ||
            button.querySelector(".sc-arrow-placeholder");

          if (!section) return;

          if (btnId === buttonId) {
            section.classList.remove("sc-hidden");
            section.classList.add("sc-visible");

            if (arrow) arrow.classList.add("sc-rotate-180");

            section.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            section.classList.remove("sc-visible");
            section.classList.add("sc-hidden");

            const otherArrow =
              document.querySelector(`#${btnId}-arrow`) ||
              document.querySelector(`#${btnId} .sc-arrow-placeholder`);
            if (otherArrow) otherArrow.classList.remove("sc-rotate-180");
          }
        });
      });
    }
  });
}
