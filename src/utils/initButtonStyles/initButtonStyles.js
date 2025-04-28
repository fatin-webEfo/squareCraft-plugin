export function initButtonStyles(selectedButtonElement) {
    if (!selectedButtonElement) return;
  
    const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
    const fontFamilyButton = document.getElementById("buttonFontFamilyButton");
    const fontSizeInput = document.getElementById("scFontSizeInput");
    const fontWeightOptions = document.getElementById("scButtonFontWeightOptions");
    const fontWeightButton = document.getElementById("scButtonFontWeightSelect");
    const letterSpacingInput = document.getElementById("scLetterSpacingInput");
  
    const buttonContainer = selectedButtonElement.querySelector('.sqs-block-button-container');
    if (!buttonContainer) return;
  
    const textSpan = buttonContainer.querySelector('.sqs-html span');
    if (!textSpan) return;
  
    if (fontFamilyOptions && fontFamilyButton) {
      fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontFamily = item.style.fontFamily;
          textSpan.style.setProperty('font-family', fontFamily, 'important');
        });
      });
    }
  
    if (fontSizeInput) {
      fontSizeInput.addEventListener("input", (e) => {
        const fontSize = e.target.value;
        textSpan.style.setProperty('font-size', `${fontSize}px`, 'important');
      });
    }
  
    if (fontWeightOptions && fontWeightButton) {
      fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontWeight = item.innerText.trim();
          textSpan.style.setProperty('font-weight', fontWeight, 'important');
        });
      });
    }
  
    if (letterSpacingInput) {
      letterSpacingInput.addEventListener("input", (e) => {
        const spacing = e.target.value.replace('px', '');
        textSpan.style.setProperty('letter-spacing', `${spacing}px`, 'important');
      });
    }
  
    ["scTextAlignLeft", "scTextAlignCenter", "scTextAlignRight", "scTextAlignJustify"].forEach((id) => {
      const alignButton = document.getElementById(id);
      if (alignButton) {
        alignButton.addEventListener("click", () => {
          const align = alignButton.getAttribute("data-align");
          buttonContainer.style.setProperty('text-align', align, 'important');
        });
      }
    });
  }
  