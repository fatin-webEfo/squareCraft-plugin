export function initButtonStyles(selectedButtonElement) {
  if (!selectedButtonElement) return;

  const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
  const fontSizeInput = document.getElementById("scButtonFontSizeInput");
  const fontWeightOptions = document.getElementById(
    "scButtonFontWeightOptions"
  );
  const letterSpacingInput = document.getElementById("scButtonLetterSpacingInput");
  const fontSizeOptions = document.getElementById("scButtonFontSizeOptions");

  const buttonContainer = selectedButtonElement.querySelector(
    ".sqs-block-button-container"
  );
  if (!buttonContainer) return;

  let buttonElement = buttonContainer.querySelector(
    "a.sqs-block-button-element"
  );
  if (!buttonElement) {
    buttonElement = buttonContainer.querySelector(
      "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
  }
  if (!buttonElement) return;

  let buttonTypeClass = "sqs-button-element--primary";
  if (buttonElement.classList.contains("sqs-button-element--secondary")) {
    buttonTypeClass = "sqs-button-element--secondary";
  } else if (buttonElement.classList.contains("sqs-button-element--tertiary")) {
    buttonTypeClass = "sqs-button-element--tertiary";
  }

  function updateExternalStyles(property, value) {
    const styleId = `sc-button-style-${buttonElement.dataset.blockId}`;
    if (!buttonElement.dataset.blockId) {
      const parentBlock = buttonElement.closest('[id^="block-"]');
      buttonElement.dataset.blockId = parentBlock ? parentBlock.id : Date.now();
    }
  
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
  
    const uniqueSelector = `#${buttonElement.dataset.blockId} .sqs-block-button-element, 
                            #${buttonElement.dataset.blockId} .sqs-add-to-cart-button-inner, 
                            #${buttonElement.dataset.blockId} button span, 
                            #${buttonElement.dataset.blockId} a span`;
  
    let rules = styleTag.innerHTML
      .split("}")
      .filter(Boolean)
      .map((rule) => rule + "}");
  
    let existingRule = rules.find((r) => r.includes(uniqueSelector));
  
    if (existingRule) {
      let updatedRule = existingRule
        .replace(new RegExp(`${property}:.*?;`, "g"), "")
        .replace("}", ` ${property}: ${value} !important; }`);
      rules = rules.map((r) => (r.includes(uniqueSelector) ? updatedRule : r));
    } else {
      rules.push(`${uniqueSelector} { ${property}: ${value} !important; }`);
    }
  
    styleTag.innerHTML = rules.join("\n");
  }
  
  

  if (fontFamilyOptions) {
    fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        const fontFamily = item.style.fontFamily;
        updateExternalStyles("font-family", fontFamily);
      });
    });
  }

  if (fontSizeOptions && fontSizeInput) {
    fontSizeOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        const selectedSize = item.getAttribute("data-value");
        fontSizeInput.value = selectedSize;
        fontSizeInput.dispatchEvent(new Event("input"));
      });
    });
    fontSizeInput.addEventListener("input", (e) => {
      const fontSize = e.target.value;
      updateExternalStyles("font-size", `${fontSize}px`);
    });
  }

  if (fontWeightOptions) {
    fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        const fontWeight = item.innerText.trim();
        updateExternalStyles("font-weight", fontWeight);
      });
    });
  }

  if (letterSpacingInput) {
    letterSpacingInput.addEventListener("input", (e) => {
      const spacing = e.target.value.replace("px", "px");
      updateExternalStyles("letter-spacing", `${spacing}px`);
    });
  }

["scButtonAllCapital", "scButtonAllSmall", "scButtonFirstCapital"].forEach(
  (id) => {
    const transformButton = document.getElementById(id);
    if (transformButton) {
      transformButton.addEventListener("click", () => {
        const transformClassMap = {
          scButtonAllCapital: "sc-text-upper",
          scButtonAllSmall: "sc-text-lower",
          scButtonFirstCapital: "sc-text-capitalize",
        };
        const newClass = transformClassMap[id];

        const spans = Array.from(
          document.querySelectorAll(
            `a.${buttonTypeClass} .sqs-html span, 
         button.${buttonTypeClass} .sqs-add-to-cart-button-inner, 
         button.${buttonTypeClass} span`
          )
        );

        spans.forEach((span) => {
          span.classList.remove(
            "sc-text-upper",
            "sc-text-lower",
            "sc-text-capitalize"
          );
          span.classList.add(newClass);
        });
      });
    }
  }
);

}
