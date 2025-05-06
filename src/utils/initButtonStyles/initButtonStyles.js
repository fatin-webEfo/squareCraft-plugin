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




export function initButtonIconDimensionToggle(getSelectedElement) {
  const widthTrigger = document.getElementById("buttoniconWidthSelect");
  const widthLabel = document.getElementById("buttonIconWidthCount");
  const widthDropdown = document.createElement("div");
  widthDropdown.id = "buttoniconWidthDropdown";

  const heightTrigger = document.getElementById("buttoniconHeightSelect");
  const heightLabel = document.getElementById("buttonIconHeightCount");
  const heightDropdown = document.createElement("div");
  heightDropdown.id = "buttoniconHeightDropdown";

  if (!widthTrigger || !widthLabel || !heightTrigger || !heightLabel) return;

  const sizeValues = Array.from({ length: 51 }, (_, i) => i + 10); 

  const dropdownClassList = ["sc-absolute", "sc-left-0", "sc-hidden", "sc-h-44", "sc-bg-colo-EF7C2F-hover", "sc-top-12", "sc-z-99999", "sc-scrollBar"];

  function generateDropdownHTML(values, type) {
    return values.map(
      (val) => `
      <div data-${type}="${val}" class="sc-bg-3f3f3f sc-py-1 sc-bg-colo-EF7C2F-hover sc-border sc-border-solid sc-border-EF7C2F sc-px-2 sc-w-20 sc-cursor-pointer hover:sc-bg-555">
        <p class="sc-universal sc-roboto  sc-text-sm">${val}px</p>
      </div>`
    ).join("");
  }

  widthDropdown.classList.add(...dropdownClassList);
  widthDropdown.innerHTML = generateDropdownHTML(sizeValues, "width");
  widthTrigger.parentNode.appendChild(widthDropdown);

  heightDropdown.classList.add(...dropdownClassList);
  heightDropdown.innerHTML = generateDropdownHTML(sizeValues, "height");
  heightTrigger.parentNode.appendChild(heightDropdown);

  widthTrigger.onclick = (e) => {
    e.stopPropagation();
    widthDropdown.classList.toggle("sc-hidden");
    heightDropdown.classList.add("sc-hidden");
  };

  heightTrigger.onclick = (e) => {
    e.stopPropagation();
    heightDropdown.classList.toggle("sc-hidden");
    widthDropdown.classList.add("sc-hidden");
  };

  widthDropdown.onclick = (e) => e.stopPropagation();
  heightDropdown.onclick = (e) => e.stopPropagation();

  widthDropdown.querySelectorAll("[data-width]").forEach(item => {
    item.onclick = () => {
      const px = item.dataset.width;
      widthLabel.textContent = `${px}px`;
      widthDropdown.classList.add("sc-hidden");
      applyIconStyle("width", px);
    };
  });

  heightDropdown.querySelectorAll("[data-height]").forEach(item => {
    item.onclick = () => {
      const px = item.dataset.height;
      heightLabel.textContent = `${px}px`;
      heightDropdown.classList.add("sc-hidden");
      applyIconStyle("height", px);
    };
  });

  function applyIconStyle(type, value) {
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
        if (type === "width") icon.style.width = `${value}px`;
        else icon.style.height = `${value}px`;
      }
    });
  }

  document.addEventListener("click", () => {
    widthDropdown.classList.add("sc-hidden");
    heightDropdown.classList.add("sc-hidden");
  });
}




export function initButtonIconSpacingControl(getSelectedElement) {
  let spacingValue = 0;
  const fill = document.getElementById("buttonIconSpacingradiousFill");
  const bullet = document.getElementById("buttonIconSpacingradiousBullet");
  const field = document.getElementById("buttonIconSpacingradiousField");
  const valueText = document.getElementById("buttoniconSpacingradiousCount");

  let activeDirection = "Left";

  const directionButtons = [
    "buttonIconSpacingTop",
    "buttonIconSpacingBottom",
    "buttonIconSpacingLeft",
    "buttonIconSpacingRight",
  ];

  directionButtons.forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("click", () => {
      directionButtons.forEach((otherId) => {
        document.getElementById(otherId).classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");
      const dir = el.dataset.value;
      activeDirection = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
    
      applySpacing();
    });
    
  });

  function getIconElement() {
    const selectedElement = typeof getSelectedElement === "function" ? getSelectedElement() : null;
    const icon = selectedElement?.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
    return icon || window.selectedIconElement || null;
  }


  
  function applySpacing() {
    const icon = getIconElement();
    if (!icon) return;
  
    icon.style.marginTop = "0px";
    icon.style.marginBottom = "0px";
    icon.style.marginLeft = "0px";
    icon.style.marginRight = "0px";
  
    if (activeDirection === "Top") icon.style.marginTop = `${spacingValue}px`;
    if (activeDirection === "Bottom") icon.style.marginBottom = `${spacingValue}px`;
    if (activeDirection === "Left") icon.style.marginLeft = `${spacingValue}px`;
    if (activeDirection === "Right") icon.style.marginRight = `${spacingValue}px`;
  }
  
  

  function updateUI(clientX) {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = (x / rect.width) * 100;
    spacingValue = Math.round((x / rect.width) * 30);
    fill.style.width = `${percent}%`;
    bullet.style.left = `${percent}%`;
    valueText.textContent = `${spacingValue}px`;
    applySpacing();
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const onMouseMove = (eMove) => updateUI(eMove.clientX);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  document
    .querySelector('.sc-bg-454545 img[alt="reset"]')
    .addEventListener("click", () => {
      spacingValue = 0;
      fill.style.width = "0%";
      bullet.style.left = "0%";
      valueText.textContent = "0px";
      applySpacing();
    });
}


export function initButtonBorderControl(getSelectedElement) {
  const fill = document.getElementById("buttonBorderFill");
  const bullet = document.getElementById("buttonBorderBullet");
  const field = document.getElementById("buttonBorderField");
  const valueText = document.getElementById("buttonBorderCount");

  let borderState = {
    value: 0,
    side: "All",
    type: "solid"
  };

  const sideButtons = [
    "buttonBorderAll",
    "buttonBorderTop",
    "buttonBorderBottom",
    "buttonBorderLeft",
    "buttonBorderRight"
  ];

  sideButtons.forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("click", () => {
      sideButtons.forEach((otherId) => {
        document.getElementById(otherId).classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");
      borderState.side = id.replace("buttonBorder", "");
      applyBorder();
    });
  });

  function getButtonTypeClass(sample) {
    if (sample.classList.contains("sqs-button-element--secondary")) return "sqs-button-element--secondary";
    if (sample.classList.contains("sqs-button-element--tertiary")) return "sqs-button-element--tertiary";
    return "sqs-button-element--primary";
  }

  function applyBorder() {
    const selectedElement = getSelectedElement?.();
    if (!selectedElement) return;
  
    const sampleButton = selectedElement.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!sampleButton) return;
  
    const typeClass = getButtonTypeClass(sampleButton);
    const styleId = `sc-button-border-style-${typeClass.replace(/--/g, "-")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
  
    const borderStyle = `${borderState.value}px ${borderState.type} black`;
  
    let rules = "";
    const sides = {
      Top: "border-top",
      Bottom: "border-bottom",
      Left: "border-left",
      Right: "border-right"
    };
  
    if (borderState.side === "All") {
      rules = `
        a.${typeClass} {
          border-top: ${borderStyle} !important;
          border-bottom: ${borderStyle} !important;
          border-left: ${borderStyle} !important;
          border-right: ${borderStyle} !important;
        }
      `;
    } else {
      const zeroAll = `
        border-top: 0px !important;
        border-bottom: 0px !important;
        border-left: 0px !important;
        border-right: 0px !important;
      `;
      rules = `
        a.${typeClass} {
          ${zeroAll}
          ${sides[borderState.side]}: ${borderStyle} !important;
        }
      `;
    }
  
    styleTag.innerHTML = rules.trim();
  }
  

  function updateUI(clientX) {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = (x / rect.width) * 100;
    borderState.value = Math.round((x / rect.width) * 10);
    fill.style.width = `${percent}%`;
    bullet.style.left = `${percent}%`;
    valueText.textContent = `${borderState.value}px`;
    applyBorder();
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const onMouseMove = (eMove) => updateUI(eMove.clientX);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  document.querySelector('.sc-bg-454545 img[alt="reset"]')?.addEventListener("click", () => {
    borderState.value = 0;
    fill.style.width = "0%";
    bullet.style.left = "0%";
    valueText.textContent = "0px";
    applyBorder();
  });

  window.setButtonBorderStyleType = function (type) {
    borderState.type = type;
    applyBorder();
  };
}




export function initButtonBorderTypeToggle(getSelectedElement) {
  const typeButtons = [
    { id: "buttonBorderTypeSolid", type: "solid" },
    { id: "buttonBorderTypeDashed", type: "dashed" },
    { id: "buttonBorderTypeDotted", type: "dotted" }
  ];
  typeButtons.forEach(({ id, type }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.onclick = () => {
      typeButtons.forEach(({ id }) => {
        const btn = document.getElementById(id);
        btn?.classList.remove("sc-bg-454545");
      });

      el.classList.add("sc-bg-454545");

      window.setButtonBorderStyleType?.(type);
      const selectedElement = getSelectedElement?.();
      const sampleButton = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!sampleButton) return;

      const event = new Event("reapplyBorder");
      sampleButton.dispatchEvent(event);
    };
  });
}







export function initButtonBorderRadiusControl(getSelectedElement) {
  const fillField = document.getElementById("buttonBorderRadiousField");
  const bullet = document.getElementById("buttonBorderRadiousBullet");
  const valueText = document.getElementById("buttonBorderRadiousCount");
  const resetBtn = fillField?.previousElementSibling?.querySelector("img[alt='reset']");

  let radiusValue = 0;

  function getButtonTypeClass(sample) {
    if (sample.classList.contains("sqs-button-element--secondary")) return "sqs-button-element--secondary";
    if (sample.classList.contains("sqs-button-element--tertiary")) return "sqs-button-element--tertiary";
    return "sqs-button-element--primary";
  }

  function applyBorderRadius() {
    const selectedElement = typeof getSelectedElement === "function" ? getSelectedElement() : null;
    if (!selectedElement) return;

    const sampleButton = selectedElement.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!sampleButton) return;

    const typeClass = getButtonTypeClass(sampleButton);
    const styleId = `sc-button-radius-style-${typeClass.replace(/--/g, "-")}`;

    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const rule = `
      a.${typeClass} {
        border-radius: ${radiusValue}px !important;
      }
    `;
    styleTag.innerHTML = rule.trim();
  }

  function updateUI(clientX) {
    const rect = fillField.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percent = (x / rect.width) * 100;
    radiusValue = Math.round((x / rect.width) * 50); // max 50px radius
    bullet.style.left = `${percent}%`;
    valueText.textContent = `${radiusValue}px`;
    applyBorderRadius();
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const move = (ev) => updateUI(ev.clientX);
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  resetBtn?.addEventListener("click", () => {
    radiusValue = 0;
    bullet.style.left = "0%";
    valueText.textContent = "0px";
    applyBorderRadius();
  });
}
