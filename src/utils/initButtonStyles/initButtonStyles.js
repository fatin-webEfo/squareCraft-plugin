export function initButtonStyles(selectedButtonElement) {
    if (!selectedButtonElement) return;
  
    const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
    const fontFamilyButton = document.getElementById("buttonFontFamilyButton");
    const fontSizeInput = document.getElementById("scFontSizeInput");
    const fontWeightOptions = document.getElementById("scButtonFontWeightOptions");
    const fontWeightButton = document.getElementById("scButtonFontWeightSelect");
    const letterSpacingInput = document.getElementById("scLetterSpacingInput");
  
    const textSpan = selectedButtonElement.querySelector('span'); 
  
    if (!textSpan) {
      console.error("❌ Text span not found inside button element.");
      return;
    }
  
    
    if (fontFamilyOptions && fontFamilyButton) {
      fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontFamily = item.style.fontFamily;
          textSpan.classList.remove(
            ...Array.from(textSpan.classList).filter(c => c.startsWith('sc-font-family-'))
          );
          const safeFont = fontFamily.split(',')[0].replace(/\s+/g, '-').toLowerCase();
          textSpan.classList.add(`sc-font-family-${safeFont}`);
        });
      });
    }
  
    if (fontSizeInput) {
      fontSizeInput.addEventListener("input", (e) => {
        const fontSize = e.target.value;
        textSpan.classList.remove(
          ...Array.from(textSpan.classList).filter(c => c.startsWith('sc-font-size-'))
        );
        textSpan.classList.add(`sc-font-size-${fontSize}`);
      });
    }
  
    if (fontWeightOptions && fontWeightButton) {
      fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontWeight = item.innerText.trim();
          textSpan.classList.remove(
            ...Array.from(textSpan.classList).filter(c => c.startsWith('sc-font-weight-'))
          );
          textSpan.classList.add(`sc-font-weight-${fontWeight}`);
        });
      });
    }
  
    if (letterSpacingInput) {
      letterSpacingInput.addEventListener("input", (e) => {
        const spacing = e.target.value.replace('px', '');
        textSpan.classList.remove(
          ...Array.from(textSpan.classList).filter(c => c.startsWith('sc-letter-spacing-'))
        );
        textSpan.classList.add(`sc-letter-spacing-${spacing}`);
      });
    }
  
    ["scTextAlignLeft", "scTextAlignCenter", "scTextAlignRight", "scTextAlignJustify"].forEach((id) => {
      const alignButton = document.getElementById(id);
      if (alignButton) {
        alignButton.addEventListener("click", () => {
          const align = alignButton.getAttribute("data-align");
          selectedButtonElement.classList.remove(
            ...Array.from(selectedButtonElement.classList).filter(c => c.startsWith('sc-text-align-'))
          );
          selectedButtonElement.classList.add(`sc-text-align-${align}`);
        });
      }
    });
  }
  