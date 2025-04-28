export function initButtonStyles(selectedButtonElement) {
    if (!selectedButtonElement) return;
  
    const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
    const fontFamilyButton = document.getElementById("buttonFontFamilyButton");
    const fontSizeInput = document.getElementById("scFontSizeInput");
    const fontWeightOptions = document.getElementById("scButtonFontWeightOptions");
    const fontWeightButton = document.getElementById("scButtonFontWeightSelect");
    const letterSpacingInput = document.getElementById("scLetterSpacingInput");
  
    if (fontFamilyOptions && fontFamilyButton) {
      fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontFamily = item.style.fontFamily;
          selectedButtonElement.classList.remove(
            ...Array.from(selectedButtonElement.classList).filter(c => c.startsWith('font-family-'))
          );
          const safeFont = fontFamily.split(',')[0].replace(/\s+/g, '-').toLowerCase();
          selectedButtonElement.classList.add(`font-family-${safeFont}`);
        });
      });
    }
  
    if (fontSizeInput) {
      fontSizeInput.addEventListener("input", (e) => {
        const fontSize = e.target.value;
        selectedButtonElement.classList.remove(
          ...Array.from(selectedButtonElement.classList).filter(c => c.startsWith('font-size-'))
        );
        selectedButtonElement.classList.add(`font-size-${fontSize}`);
      });
    }
  
    if (fontWeightOptions && fontWeightButton) {
      fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontWeight = item.innerText.trim();
          selectedButtonElement.classList.remove(
            ...Array.from(selectedButtonElement.classList).filter(c => c.startsWith('font-weight-'))
          );
          selectedButtonElement.classList.add(`font-weight-${fontWeight}`);
        });
      });
    }
  
    if (letterSpacingInput) {
      letterSpacingInput.addEventListener("input", (e) => {
        const spacing = e.target.value.replace('px', '');
        selectedButtonElement.classList.remove(
          ...Array.from(selectedButtonElement.classList).filter(c => c.startsWith('letter-spacing-'))
        );
        selectedButtonElement.classList.add(`letter-spacing-${spacing}`);
      });
    }
  
    ["scTextAlignLeft", "scTextAlignCenter", "scTextAlignRight", "scTextAlignJustify"].forEach((id) => {
      const alignButton = document.getElementById(id);
      if (alignButton) {
        alignButton.addEventListener("click", () => {
          const align = alignButton.getAttribute("data-align");
          selectedButtonElement.classList.remove(
            ...Array.from(selectedButtonElement.classList).filter(c => c.startsWith('text-align-'))
          );
          selectedButtonElement.classList.add(`text-align-${align}`);
        });
      }
    });
  }
  