function initButtonStyles(selectedButtonElement) {
  if (!selectedButtonElement) return;

  const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
  const fontSizeInput = document.getElementById("scButtonFontSizeInput");
  const fontWeightOptions = document.getElementById("scButtonFontWeightOptions");
  const letterSpacingInput = document.getElementById("scButtonLetterSpacingInput");
  const fontSizeOptions = document.getElementById("scButtonFontSizeOptions");

  const buttonContainer = selectedButtonElement.querySelector(".sqs-block-button-container");
  if (!buttonContainer) return;

  let buttonElement = buttonContainer.querySelector("a.sqs-block-button-element") ||
    buttonContainer.querySelector("button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary");
  if (!buttonElement) return;

  let buttonTypeClass = "sqs-button-element--primary";
  if (buttonElement.classList.contains("sqs-button-element--secondary")) {
    buttonTypeClass = "sqs-button-element--secondary";
  } else if (buttonElement.classList.contains("sqs-button-element--tertiary")) {
    buttonTypeClass = "sqs-button-element--tertiary";
  }

  function updateExternalStyles(property, value, buttonTypeClass) {
    const styleId = `sc-button-style-${buttonTypeClass.replace(/--/g, "-")}`;
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const textSelectors = `
      a.${buttonTypeClass} .sqs-html span,
      button.${buttonTypeClass} .sqs-add-to-cart-button-inner,
      button.${buttonTypeClass} span
    `.trim();

    let rules = styleTag.innerHTML.split("}").filter(Boolean).map(rule => rule + "}");
    let existingRuleIndex = rules.findIndex(r => r.includes(textSelectors));
    const newRule = `${textSelectors} { ${property}: ${value} !important; }`;

    if (existingRuleIndex !== -1) {
      rules[existingRuleIndex] = rules[existingRuleIndex]
        .replace(new RegExp(`${property}:.*?;`, "g"), "")
        .replace("}", ` ${property}: ${value} !important; }`);
    } else {
      rules.push(newRule);
    }

    styleTag.innerHTML = rules.join("\n");
  }

  if (fontFamilyOptions) {
    fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.onclick = () => {
        const fontFamily = item.style.fontFamily;
        updateExternalStyles("font-family", fontFamily, buttonTypeClass);
      };
    });
  }

  if (fontSizeOptions && fontSizeInput) {
    fontSizeOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.onclick = () => {
        const selectedSize = item.getAttribute("data-value");
        fontSizeInput.value = selectedSize;
        fontSizeInput.dispatchEvent(new Event("input"));
      };
    });
    fontSizeInput.oninput = (e) => {
      const fontSize = e.target.value;
      updateExternalStyles("font-size", `${fontSize}px`, buttonTypeClass);
    };
  }

  if (fontWeightOptions) {
    fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.onclick = () => {
        const fontWeight = item.innerText.trim();
        updateExternalStyles("font-weight", fontWeight, buttonTypeClass);
      };
    });
  }

  if (letterSpacingInput) {
    letterSpacingInput.oninput = (e) => {
      const spacing = e.target.value;
      updateExternalStyles("letter-spacing", `${spacing}px`, buttonTypeClass);
    };
  }

  ["scButtonAllCapital", "scButtonAllSmall", "scButtonFirstCapital"].forEach((id) => {
    const transformButton = document.getElementById(id);
    if (transformButton) {
      transformButton.onclick = () => {
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
          span.classList.remove("sc-text-upper", "sc-text-lower", "sc-text-capitalize");
          span.classList.add(newClass);
        });
      };
    }
  });
}
