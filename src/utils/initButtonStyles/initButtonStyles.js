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
  
    const buttonElement = buttonContainer.querySelector('a.sqs-block-button-element');
    if (!buttonElement) return;
  
    let buttonTypeClass = "sqs-button-element--primary";
  
    if (buttonElement.classList.contains("sqs-button-element--secondary")) {
      buttonTypeClass = "sqs-button-element--secondary";
    } else if (buttonElement.classList.contains("sqs-button-element--tertiary")) {
      buttonTypeClass = "sqs-button-element--tertiary";
    }
  
    const allSameTypeButtons = Array.from(document.querySelectorAll(`.${buttonTypeClass}`))
      .map(el => el.querySelector('.sqs-html span'))
      .filter(span => span);
  
    if (fontFamilyOptions && fontFamilyButton) {
      fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontFamily = item.style.fontFamily;
          allSameTypeButtons.forEach(span => {
            span.style.setProperty('font-family', fontFamily, 'important');
          });
        });
      });
    }
  
    if (fontSizeInput) {
      fontSizeInput.addEventListener("input", (e) => {
        const fontSize = e.target.value;
        allSameTypeButtons.forEach(span => {
          span.style.setProperty('font-size', `${fontSize}px`, 'important');
        });
      });
    }
  
    if (fontWeightOptions && fontWeightButton) {
      fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          const fontWeight = item.innerText.trim();
          allSameTypeButtons.forEach(span => {
            span.style.setProperty('font-weight', fontWeight, 'important');
          });
        });
      });
    }
  
    if (letterSpacingInput) {
      letterSpacingInput.addEventListener("input", (e) => {
        const spacing = e.target.value.replace('px', '');
        allSameTypeButtons.forEach(span => {
          span.style.setProperty('letter-spacing', `${spacing}px`, 'important');
        });
      });
    }
  
    ["scTextAlignLeft", "scTextAlignCenter", "scTextAlignRight", "scTextAlignJustify"].forEach((id) => {
      const alignButton = document.getElementById(id);
      if (alignButton) {
        alignButton.addEventListener("click", () => {
          const align = alignButton.getAttribute("data-align");
          document.querySelectorAll(`.${buttonTypeClass}`).forEach(button => {
            const container = button.closest('.sqs-block-button-container');
            if (container) {
              container.style.setProperty('text-align', align, 'important');
            }
          });
        });
      }
    });
  }
  