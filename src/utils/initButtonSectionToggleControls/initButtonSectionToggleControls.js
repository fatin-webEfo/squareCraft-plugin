export function initButtonSectionToggleControls() {
    const sections = {
      fontButton: "fontSection",
      ColorButton: "ColorSection",
      iconButton: "iconSection",
      bordersButton: "bordersSection",
      shadowsButton: "shadowsSection"
    };
  
    Object.keys(sections).forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      const sectionId = sections[buttonId];
  
      if (button && document.getElementById(sectionId)) {
        button.addEventListener("click", () => {
  
          Object.keys(sections).forEach((otherButtonId) => {
            const otherSectionId = sections[otherButtonId];
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
  }
  