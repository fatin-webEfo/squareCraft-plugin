

export function initHoverButtonSectionToggleControls() {
    const hoverSections = {
      "hover-colorButton": "hover-colorSection",
      "hover-iconButton": "hover-iconSection",
      "hover-bordersButton": "hover-bordersSection",
      "hover-shadowsButton": "hover-shadowsSection"
    };
  
    Object.keys(hoverSections).forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      const sectionId = hoverSections[buttonId];
  
      if (button && document.getElementById(sectionId)) {
        button.addEventListener("click", () => {
          Object.keys(hoverSections).forEach((otherButtonId) => {
            const otherSectionId = hoverSections[otherButtonId];
            const otherSection = document.getElementById(otherSectionId);
  
            if (otherSection) {
              if (otherButtonId === buttonId) {
                otherSection.classList.remove("sc-hidden");
                otherSection.classList.add("sc-visible");
                otherSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              } else {
                otherSection.classList.add("sc-hidden");
                otherSection.classList.remove("sc-visible");
              }
            }
          });
        });
      }
    });
  
    const hoverButtonFontColorTrigger = document.getElementById("hover-buttonFontColorPalate");
    const hoverButtonFontColorPalette = document.getElementById("hover-button-font-color-palette");
  
    if (hoverButtonFontColorTrigger && hoverButtonFontColorPalette) {
      hoverButtonFontColorTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        hoverButtonFontColorPalette.classList.toggle("sc-hidden");
      });
  
      document.addEventListener("click", (event) => {
        if (!hoverButtonFontColorTrigger.contains(event.target) && !hoverButtonFontColorPalette.contains(event.target)) {
          hoverButtonFontColorPalette.classList.add("sc-hidden");
        }
      });
    }
  } 
  