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

  const fontFamilyButton = document.getElementById("buttonFontFamilyButton");
  const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");

  if (fontFamilyButton && fontFamilyOptions) {
    fontFamilyButton.addEventListener("click", (event) => {
      event.stopPropagation();
      fontFamilyOptions.classList.toggle("sc-hidden");
    });

    document.addEventListener("click", (event) => {
      if (!fontFamilyButton.contains(event.target)) {
        fontFamilyOptions.classList.add("sc-hidden");
      }
    });

    fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        const selectedFont = item.innerText;
        fontFamilyButton.querySelector("p").innerText = selectedFont;
        fontFamilyButton.querySelector("p").style.fontFamily = item.style.fontFamily;
        fontFamilyOptions.classList.add("sc-hidden");
      });
    });
  }


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


}
