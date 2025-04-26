export function initButtonSectionToggleControls() {
    const sections = {
      fontButton: "fontSection",
      bgColorButton: "bgColorSection",
      iconButton: "iconSection",
      bordersButton: "bordersSection",
      shadowsButton: "shadowsSection"
    };
  
    Object.keys(sections).forEach((buttonId) => {
      const button = document.getElementById(buttonId);
  
      if (button) {
        button.addEventListener("click", () => {
          Object.values(sections).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
              section.classList.add("sc-hidden");
              section.classList.remove("sc-visible");
            }
          });
  
          const activeSectionId = sections[buttonId];
          const activeSection = document.getElementById(activeSectionId);
          if (activeSection) {
            activeSection.classList.remove("sc-hidden");
            activeSection.classList.add("sc-visible");
            activeSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        });
      }
    });
  }
  