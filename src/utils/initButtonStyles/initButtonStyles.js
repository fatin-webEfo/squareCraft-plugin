export function initButtonStyles(selectedButtonElement) {
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

  let currentButtonTypeClass = "sqs-button-element--primary";
  if (buttonElement.classList.contains("sqs-button-element--secondary")) {
    currentButtonTypeClass = "sqs-button-element--secondary";
  } else if (buttonElement.classList.contains("sqs-button-element--tertiary")) {
    currentButtonTypeClass = "sqs-button-element--tertiary";
  }

  function updateExternalStyles(property, value) {
    const styleId = `sc-button-style-${currentButtonTypeClass.replace(/--/g, "-")}`;
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const textSelectors = `
      a.${currentButtonTypeClass} .sqs-html span,
      button.${currentButtonTypeClass} .sqs-add-to-cart-button-inner,
      button.${currentButtonTypeClass} span
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
      item.onclick = null;
      item.onclick = () => {
        const fontFamily = item.style.fontFamily;
        updateExternalStyles("font-family", fontFamily);
      };
    });
  }

  if (fontSizeOptions && fontSizeInput) {
    fontSizeOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.onclick = null;
      item.onclick = () => {
        const selectedSize = item.getAttribute("data-value");
        fontSizeInput.value = selectedSize;
        fontSizeInput.dispatchEvent(new Event("input"));
      };
    });
    fontSizeInput.oninput = null;
    fontSizeInput.oninput = (e) => {
      const fontSize = e.target.value;
      updateExternalStyles("font-size", `${fontSize}px`);
    };
  }

  if (fontWeightOptions) {
    fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach((item) => {
      item.onclick = null;
      item.onclick = () => {
        const fontWeight = item.innerText.trim();
        updateExternalStyles("font-weight", fontWeight);
      };
    });
  }

  if (letterSpacingInput) {
    letterSpacingInput.oninput = null;
    letterSpacingInput.oninput = (e) => {
      const spacing = e.target.value;
      updateExternalStyles("letter-spacing", `${spacing}px`);
    };
  }

  ["scButtonAllCapital", "scButtonAllSmall", "scButtonFirstCapital"].forEach((id) => {
    const transformButton = document.getElementById(id);
    if (transformButton) {
      transformButton.onclick = null;
      transformButton.onclick = () => {
        const transformClassMap = {
          scButtonAllCapital: "sc-text-upper",
          scButtonAllSmall: "sc-text-lower",
          scButtonFirstCapital: "sc-text-capitalize",
        };
        const newClass = transformClassMap[id];

        const spans = Array.from(
          document.querySelectorAll(
            `a.${currentButtonTypeClass} .sqs-html span, 
             button.${currentButtonTypeClass} .sqs-add-to-cart-button-inner, 
             button.${currentButtonTypeClass} span`
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


export function initButtonIconPositionToggle(getSelectedElement) {
  document.getElementById("buttoniconPositionSection").onclick = () => {
    document.getElementById("iconPositionDropdown").classList.toggle("sc-hidden");
  };

  document.querySelectorAll("#iconPositionDropdown [data-value]").forEach((option) => {
    option.onclick = () => {
      const value = option.dataset.value;
      document.getElementById("iconPositionLabel").innerHTML =
        `<p class="sc-universal sc-roboto sc-text-sm">${value.charAt(0).toUpperCase() + value.slice(1)}</p>`;
      document.getElementById("iconPositionDropdown").classList.add("sc-hidden");

      const selectedElement = getSelectedElement();
      const sampleButton = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!sampleButton) return;

      let typeClass = "sqs-button-element--primary";
      if (sampleButton.classList.contains("sqs-button-element--secondary")) typeClass = "sqs-button-element--secondary";
      else if (sampleButton.classList.contains("sqs-button-element--tertiary")) typeClass = "sqs-button-element--tertiary";

      const allButtons = document.querySelectorAll(`a.${typeClass}`);
      allButtons.forEach(buttonLink => {
        const icon = buttonLink.querySelector(".sqscraft-button-icon");
        const textDiv = buttonLink.querySelector(".sqs-html");

        if (!icon || !textDiv) return;

        icon.style.marginLeft = "";
        icon.style.marginRight = "";

        if (value === "after") {
          icon.style.marginLeft = "8px";
          buttonLink.insertBefore(icon, textDiv.nextSibling);
        } else {
          icon.style.marginRight = "8px";
          buttonLink.insertBefore(icon, textDiv);
        }
      });
    };
  });
}


export function initButtonIconRotationToggle(getSelectedElement) {
  const trigger = document.getElementById("buttoniconRotationSection");
  const dropdown = document.getElementById("buttoniconRotationDropdown");
  const currentLabel = document.getElementById("buttoniconRotationCurrentValue");

  if (!trigger || !dropdown || !currentLabel) return;

  const rotationValues = ["0", "45", "90", "135", "180", "225", "270", "315"];
  dropdown.classList.add("sc-absolute", "sc-left-0", "sc-hidden", "sc-h-44", "sc-bg-colo-EF7C2F-hover", "z-99999", "sc-scrollBar");

  dropdown.innerHTML = rotationValues
    .map((deg) => `
      <div data-rotation="${deg}" class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-w-20 sc-cursor-pointer hover:sc-bg-555">
        <p class="sc-universal sc-roboto sc-text-sm">${deg} deg</p>
      </div>
    `)
    .join("");

  trigger.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("sc-hidden");
  };
  
  dropdown.onclick = (e) => e.stopPropagation();

  dropdown.querySelectorAll("[data-rotation]").forEach(item => {
    item.onclick = (e) => {
      e.stopPropagation();
      const deg = item.dataset.rotation;
      currentLabel.textContent = `${deg} deg`;
      dropdown.classList.add("sc-hidden");

      const selectedElement = getSelectedElement();
      const sampleButton = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!sampleButton) return;

      let typeClass = "sqs-button-element--primary";
      if (sampleButton.classList.contains("sqs-button-element--secondary")) typeClass = "sqs-button-element--secondary";
      else if (sampleButton.classList.contains("sqs-button-element--tertiary")) typeClass = "sqs-button-element--tertiary";

      const allButtons = document.querySelectorAll(`a.${typeClass}`);
      allButtons.forEach(button => {
        const icon = button.querySelector(".sqscraft-button-icon");
        if (icon) {
          icon.style.transform = `rotate(${deg}deg)`;
        }
      });
    };
  });

  document.addEventListener("click", () => dropdown.classList.add("sc-hidden"));
}




