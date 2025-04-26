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
      const sectionId = sections[buttonId];
  
      if (button && document.getElementById(sectionId)) {
        button.addEventListener("click", () => {
          
          Object.values(sections).forEach((secId) => {
            const section = document.getElementById(secId);
            if (section) {
              section.classList.add("sc-hidden");
              section.classList.remove("sc-visible");
            }
          });
  
          const clickedSection = document.getElementById(sectionId);
          if (clickedSection) {
            clickedSection.classList.remove("sc-hidden");
            clickedSection.classList.add("sc-visible");
            clickedSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
          
        });
      }
    });
  }
  