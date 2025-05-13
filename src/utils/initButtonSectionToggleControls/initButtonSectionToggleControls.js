export function initButtonSectionToggleControls() {
  const sections = {
    fontButton: "fontSection",
    colorButton: "colorSection",
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




  const buttonFontSizeSelect = document.getElementById("scButtonFontSizeSelect");
  const buttonFontSizeOptions = document.getElementById("scButtonFontSizeOptions");

  if (buttonFontSizeSelect && buttonFontSizeOptions) {
    buttonFontSizeSelect.addEventListener("click", () => {
      buttonFontSizeOptions.classList.toggle("sc-hidden");
    });
  }


  const buttonFontWeightSelect = document.getElementById("scButtonFontWeightSelect");
const buttonFontWeightOptions = document.getElementById("scButtonFontWeightOptions");
const buttonFontWeightSelected = document.getElementById("scButtonFontWeightSelected");

if (buttonFontWeightSelect && buttonFontWeightOptions) {
  buttonFontWeightSelect.addEventListener("click", (event) => {
    event.stopPropagation();
    buttonFontWeightOptions.classList.toggle("sc-hidden");
  });

  document.addEventListener("click", (event) => {
    if (!buttonFontWeightSelect.contains(event.target)) {
      buttonFontWeightOptions.classList.add("sc-hidden");
    }
  });

  buttonFontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      const selectedWeight = item.innerText;
      buttonFontWeightSelected.innerText = selectedWeight;
      buttonFontWeightOptions.classList.add("sc-hidden");
    });
  });
}

  const buttonLetterSpacingSelect = document.getElementById(
    "scButtonLetterSpacingSelect"
  );
  const buttonLetterSpacingOptions = document.getElementById(
    "scButtonLetterSpacingOptions"
  );
  const buttonLetterSpacingInput = document.getElementById(
    "scButtonLetterSpacingInput"
  );

  if (buttonLetterSpacingSelect && buttonLetterSpacingOptions) {
    buttonLetterSpacingSelect.addEventListener("click", (event) => {
      event.stopPropagation();
      buttonLetterSpacingOptions.classList.toggle("sc-hidden");
    });

    document.addEventListener("click", (event) => {
      if (!buttonLetterSpacingSelect.contains(event.target)) {
        buttonLetterSpacingOptions.classList.add("sc-hidden");
      }
    });

    buttonLetterSpacingOptions
      .querySelectorAll(".sc-dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          const selectedSpacing = item.getAttribute("data-value");
          buttonLetterSpacingInput.value = selectedSpacing;
          buttonLetterSpacingOptions.classList.add("sc-hidden");
          buttonLetterSpacingInput.dispatchEvent(new Event("input"));
        });
      });
  }

    const buttonFontColorTrigger = document.getElementById(
      "buttonFontColorPalate"
    );
    const buttonFontColorPalette = document.getElementById(
      "button-font-color-palette"
    );

    if (buttonFontColorTrigger && buttonFontColorPalette) {
      buttonFontColorTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        buttonFontColorPalette.classList.toggle("sc-hidden");
      });

      document.addEventListener("click", (event) => {
        if (
          !buttonFontColorTrigger.contains(event.target) &&
          !buttonFontColorPalette.contains(event.target)
        ) {
          buttonFontColorPalette.classList.add("sc-hidden");
        }
      });
    }

    const buttonNormalStateClick = document.getElementById("buttonNormalStateClick");
    const buttonHoverStateClick = document.getElementById("buttonHoverStateClick");
    const buttonNormalState = document.getElementById("ButtonNormalState");
    const buttonHoverState = document.getElementById("ButtonHoverState");
    
    if (
      buttonNormalStateClick &&
      buttonHoverStateClick &&
      buttonNormalState &&
      buttonHoverState
    ) {
      buttonHoverStateClick.addEventListener("click", () => {
        buttonNormalState.classList.add("sc-hidden");
        buttonHoverState.classList.remove("sc-hidden");
    
        buttonNormalStateClick.classList.remove("sc-bg-color-EF7C2F", "sc-text-color-white");
        buttonNormalStateClick.classList.add("sc-bg-3f3f3f");
    
        buttonHoverStateClick.classList.add("sc-bg-color-EF7C2F", "sc-text-color-white");
        buttonHoverStateClick.classList.remove("sc-bg-3f3f3f");
      });
    
      buttonNormalStateClick.addEventListener("click", () => {
        buttonHoverState.classList.add("sc-hidden");
        buttonNormalState.classList.remove("sc-hidden");
    
        buttonHoverStateClick.classList.remove("sc-bg-color-EF7C2F", "sc-text-color-white");
        buttonHoverStateClick.classList.add("sc-bg-3f3f3f");
    
        buttonNormalStateClick.classList.add("sc-bg-color-EF7C2F", "sc-text-color-white");
        buttonNormalStateClick.classList.remove("sc-bg-3f3f3f");
      });
    }
    
    const iconLibraryButton = document.getElementById("iconLibraryButton");
    const buttonIconOutlineoptions = document.getElementById("buttonIconOutlineoptions");
    
    if (iconLibraryButton && buttonIconOutlineoptions) {
      let isVisible = false;
    
      iconLibraryButton.addEventListener("click", () => {
        if (!isVisible) {
          buttonIconOutlineoptions.classList.remove("sc-hidden");
          isVisible = true;
        } else {
          buttonIconOutlineoptions.classList.add("sc-hidden");
          isVisible = false;
        }
      });
    }
    

    const GOOGLE_FONTS_API = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
    let fontsList = [];
    let fontIndex = 0;
    const fontsPerPage = 20;
    
    async function fetchGoogleFonts() {
      try {
        const res = await fetch(GOOGLE_FONTS_API);
        const data = await res.json();
        fontsList = data.items.map(item => item.family);
        renderFontBatch();
      } catch (err) {
        console.error("❌ Failed to fetch Google Fonts:", err);
      }
    }
    
    function renderFontBatch() {
      const container = document.getElementById("buttonFontFamilyOptions");
      if (!container) return;
    
      const slice = fontsList.slice(fontIndex, fontIndex + fontsPerPage);
      slice.forEach(family => {
        const div = document.createElement("div");
        div.className = "sc-dropdown-item sc-py-1px sc-text-center sc-cursor-pointer";
        div.style.fontFamily = family;
        div.textContent = family;
    
        div.addEventListener("click", () => {
          const label = document.querySelector("#buttonFontFamilyButton p");
          if (label) {
            label.innerText = family;
            label.style.fontFamily = family;
          }
    
          const selectedElement = document.querySelector("[id^='block-'].selected");
          if (!selectedElement) return;
    
          const btn = selectedElement.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary");
          if (!btn) return;
    
          const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
          if (!typeClass) return;
    
          const allButtons = document.querySelectorAll(`a.${typeClass}, button.${typeClass}`);
          allButtons.forEach(button => {
            const spans = button.querySelectorAll("span, .sqs-add-to-cart-button-inner");
            spans.forEach(span => {
              span.style.fontFamily = family;
            });
          });
    
          container.classList.add("sc-hidden");
        });
    
        container.appendChild(div);
      });
    
      fontIndex += fontsPerPage;
    }
    
    function setupFontScrollLoader() {
      const container = document.getElementById("buttonFontFamilyOptions");
      if (!container) return;
    
      container.addEventListener("scroll", () => {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
          renderFontBatch();
        }
      });
    }
    
    const fontFamilyButton = document.getElementById("buttonFontFamilyButton");
    const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
    
    if (fontFamilyButton && fontFamilyOptions) {
      fontFamilyButton.addEventListener("click", (event) => {
        event.stopPropagation();
        fontFamilyOptions.classList.toggle("sc-hidden");
    
        if (fontsList.length === 0) {
          fetchGoogleFonts();
          setupFontScrollLoader();
        }
      });
    
      document.addEventListener("click", (event) => {
        if (!fontFamilyButton.contains(event.target)) {
          fontFamilyOptions.classList.add("sc-hidden");
        }
      });
    }
    

}
