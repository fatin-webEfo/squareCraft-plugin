export function initButtonSectionToggleControls() {
  const sections = {
    fontButton: "fontSection",
    colorButton: "colorSection",
    iconButton: "iconSection",
    bordersButton: "bordersSection",
    shadowsButton: "shadowsSection"
  };

  function updateActiveBars() {
    Object.entries(sections).forEach(([buttonId, sectionId]) => {
      const button = document.getElementById(buttonId);
      if (!button) return;

      const styleElements = sectionId === "fontSection"
        ? [
          "scButtonFontSizeInput",
          "scButtonFontWeightSelected",
          "scButtonLetterSpacingInput",
          "scButtonAllCapital",
          "scButtonAllSmall",
          "scButtonFirstCapital"
        ]
        : sectionId === "colorSection"
          ? ["buttonFontColorCode"]
          : sectionId === "iconSection"
            ? ["buttoniconRotationradiusCount", "buttoniconSizeradiusCount", "buttoniconSpacingradiusCount"]
            : sectionId === "bordersSection"
              ? ["buttonBorderCount", "buttonBorderradiusCount"]
              : sectionId === "shadowsSection"
                ? ["buttonShadowXaxisCount", "buttonShadowYaxisCount", "buttonShadowBlurCount", "buttonShadowSpreadCount"]
                : [];

      const hasActiveStyle = styleElements.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;

        // Capitalization tab check (special case)
        if (
          id === "scButtonAllCapital" ||
          id === "scButtonAllSmall" ||
          id === "scButtonFirstCapital"
        ) {
          return el.classList.contains("sc-activeTab-border");
        }

        // All other text-based value checks
        const value = el.tagName === "INPUT"
          ? el.value?.trim()
          : el.innerText?.trim();

        return value && !["0px", "Select", "0deg", "", "0", "400", "16", "15", "Select Font"].includes(value);
      });

      const existingBar = button.querySelector(".sc-active-bar");
      if (hasActiveStyle && !existingBar) {
        const activeBar = document.createElement("div");
        activeBar.className = "sc-active-bar sc-rounded-l";
        button.insertBefore(activeBar, button.firstChild);
      } else if (!hasActiveStyle && existingBar) {
        existingBar.remove();
      }
    });
  }


  const arrowMap = {
    fontButton: "button-font-arrow",
    colorButton: "button-color-arrow",
    iconButton: "button-icon-arrow",
    bordersButton: "button-border-arrow",
    shadowsButton: "button-shadow-arrow"
  };

  Object.keys(sections).forEach((buttonId) => {
    const button = document.getElementById(buttonId);

    button.addEventListener("click", () => {
      Object.keys(sections).forEach((otherButtonId) => {
        const otherSectionId = sections[otherButtonId];
        const otherSection = document.getElementById(otherSectionId);
        const otherArrowId = arrowMap[otherButtonId];
        const otherArrow = document.getElementById(otherArrowId);

        if (otherButtonId === buttonId) {
          otherSection.classList.remove("sc-hidden");
          otherSection.classList.add("sc-visible");
          otherSection.scrollIntoView({ behavior: "smooth", block: "start" });

          if (otherArrow) {
            otherArrow.classList.remove("sc-rotate-180");
            otherArrow.style.transition = "transform 0.3s ease";
          }
        } else {
          otherSection?.classList.add("sc-hidden");
          otherSection?.classList.remove("sc-visible");

          if (otherArrow && !otherArrow.classList.contains("sc-rotate-180")) {
            otherArrow.classList.add("sc-rotate-180");
            otherArrow.style.transition = "transform 0.3s ease";
          }
        }
      });

      updateActiveBars();
    });
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

  const buttonLetterSpacingSelect = document.getElementById("scButtonLetterSpacingSelect");
  const buttonLetterSpacingOptions = document.getElementById("scButtonLetterSpacingOptions");
  const buttonLetterSpacingInput = document.getElementById("scButtonLetterSpacingInput");

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

    buttonLetterSpacingOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        const selectedSpacing = item.getAttribute("data-value");
        buttonLetterSpacingInput.value = selectedSpacing;
        buttonLetterSpacingOptions.classList.add("sc-hidden");
        buttonLetterSpacingInput.dispatchEvent(new Event("input"));
      });
    });
  }

  const buttonFontColorTrigger = document.getElementById("buttonFontColorPalate");
  const buttonFontColorPalette = document.getElementById("button-font-color-palette");

  if (buttonFontColorTrigger && buttonFontColorPalette) {
    buttonFontColorTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      buttonFontColorPalette.classList.toggle("sc-hidden");
    });

    document.addEventListener("click", (event) => {
      if (!buttonFontColorTrigger.contains(event.target) && !buttonFontColorPalette.contains(event.target)) {
        buttonFontColorPalette.classList.add("sc-hidden");
      }
    });
  }

  const buttonNormalStateClick = document.getElementById("buttonNormalStateClick");
  const buttonHoverStateClick = document.getElementById("buttonHoverStateClick");
  const buttonNormalState = document.getElementById("ButtonNormalState");
  const buttonHoverState = document.getElementById("ButtonHoverState");

  if (buttonNormalStateClick && buttonHoverStateClick && buttonNormalState && buttonHoverState) {
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

  const buttonFontFamilySelect = document.getElementById("buttonFontFamilyButton");
  const buttonFontFamilyOptions = document.getElementById("buttonFontFamilyOptions");

  if (buttonFontFamilySelect && buttonFontFamilyOptions) {
    buttonFontFamilySelect.addEventListener("click", (event) => {
      event.stopPropagation();
      buttonFontFamilyOptions.classList.toggle("sc-hidden");
    });

    document.addEventListener("click", (event) => {
      if (!buttonFontFamilySelect.contains(event.target)) {
        buttonFontFamilyOptions.classList.add("sc-hidden");
      }
    });
  }

  const solidTab = document.getElementById("buttonIconSolidClick");
  const outlineTab = document.getElementById("buttonIconOutlineClick");
  const solidOption = document.querySelector("#buttonIconLibraryOptions #buttonIconSolidoptions");
  const outlineOption = document.querySelector("#buttonIconLibraryOptions #buttonIconOutlineoptions");
  const iconLibraryButton = document.getElementById("iconLibraryButton");
  const iconLibraryDropdown = document.getElementById("buttonIconLibraryOptions");

  let isLibraryVisible = false;

  const toggleIconTabs = (activeTab, inactiveTab, showOption, hideOption) => {
    activeTab?.querySelector("div")?.classList.add("sc-text-EF7C2F");
    inactiveTab?.querySelector("div")?.classList.remove("sc-text-EF7C2F");
    showOption?.classList.remove("sc-hidden");
    hideOption?.classList.add("sc-hidden");
    iconLibraryDropdown?.classList.remove("sc-hidden");
    isLibraryVisible = true;
  };

  if (solidTab && outlineTab && solidOption && outlineOption) {
    solidTab.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleIconTabs(solidTab, outlineTab, solidOption, outlineOption);
    });

    outlineTab.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleIconTabs(outlineTab, solidTab, outlineOption, solidOption);
    });
  }

  if (iconLibraryButton && iconLibraryDropdown) {
    iconLibraryButton.addEventListener("click", (e) => {
      e.stopPropagation();
      isLibraryVisible = !isLibraryVisible;
      iconLibraryDropdown.classList.toggle("sc-hidden", !isLibraryVisible);
    });

    document.addEventListener("click", (e) => {
      if (!iconLibraryButton.contains(e.target) && !iconLibraryDropdown.contains(e.target)) {
        iconLibraryDropdown.classList.add("sc-hidden");
        isLibraryVisible = false;
      }
    });
  }
  window.updateActiveButtonBars = updateActiveBars;

}
