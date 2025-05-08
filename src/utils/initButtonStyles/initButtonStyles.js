 
 
 
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

  export function initButtonIconRotationControl(getSelectedElement) {
    const bullet = document.getElementById("buttonIconRotationradiousBullet");
    const fill = document.getElementById("buttonIconRotationradiousFill");
    const field = document.getElementById("buttonIconRotationradiousField");
    const label = document.getElementById("buttoniconRotationradiousCount");
  
    let currentRotation = 0;
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
  
      bullet.style.left = `${percent}%`;
  
      const centerPercent = 50;
      const delta = percent - centerPercent;
      const fillLeft = centerPercent + Math.min(delta, 0);
      const fillWidth = Math.abs(delta);
  
      fill.style.left = `${fillLeft}%`;
      fill.style.width = `${fillWidth}%`;
  
      currentRotation = Math.round((x / rect.width) * 360 - 180);
      label.textContent = `${currentRotation}deg`;
  
      const selectedElement = getSelectedElement?.();
      const btn = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!btn) return;
  
      const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
  
      const allButtons = document.querySelectorAll(`a.${typeClass}`);
      allButtons.forEach(button => {
        const icon = button.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
        if (icon) {
          icon.style.transform = `rotate(${currentRotation}deg)`;
        }
      });
    }
  
    bullet.style.left = "50%";
    fill.style.left = "50%";
    fill.style.width = "0%";
    label.textContent = "0deg";
  
    bullet.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const move = (e) => updateUI(e.clientX);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  
    field.addEventListener("click", (e) => updateUI(e.clientX));
  }
  
  
  

  export function initButtonIconSizeControl(getSelectedElement) {
    const bullet = document.getElementById("buttonIconSizeradiousBullet");
    const fill = document.getElementById("buttonIconSizeradiousFill");
    const field = document.getElementById("buttonIconSizeradiousField");
    const label = document.getElementById("buttoniconSizeradiousCount");
  
    let iconSize = 0;
  
    function applySize() {
      const selectedElement = getSelectedElement?.();
      const btn = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!btn) return;
  
      const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
  
      const allButtons = document.querySelectorAll(`a.${typeClass}`);
      allButtons.forEach(button => {
        const icon = button.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
        if (icon) {
          icon.style.width = `${iconSize}px`;
          icon.style.height = "auto";
        }
      });
    }
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      iconSize = Math.round((x / rect.width) * 50);
  
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      label.textContent = `${iconSize}px`;
  
      applySize();
    }
  
    bullet.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const move = (e) => updateUI(e.clientX);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  
    field.addEventListener("click", (e) => updateUI(e.clientX));
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
      side: "All"
    };
  
    const sideButtons = [
      "buttonBorderAll", "buttonBorderTop", "buttonBorderBottom", "buttonBorderLeft", "buttonBorderRight"
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
  
    function applyBorder() {
      const selectedElement = getSelectedElement?.();
      if (!selectedElement) return;
    
      const sample = selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
      );
      if (!sample) return;
    
      const typeClass = [...sample.classList].find(cls =>
        cls.includes("sqs-button-element--")
      );
      if (!typeClass) return;
    
      const allSameTypeButtons = document.querySelectorAll(`a.${typeClass}`);
      const value = `${borderState.value}px`;
      const color = "black";
      const style = window.__squareCraftBorderStyle || "solid";
    
      allSameTypeButtons.forEach(btn => {
        btn.style.setProperty("border-top", "0", "important");
        btn.style.setProperty("border-right", "0", "important");
        btn.style.setProperty("border-bottom", "0", "important");
        btn.style.setProperty("border-left", "0", "important");
    
        btn.style.setProperty("border-style", style, "important");
        btn.style.setProperty("border-color", color, "important");
    
        if (borderState.side === "All") {
          btn.style.setProperty("border-width", value, "important");
        } else {
          btn.style.setProperty("border-width", "0 0 0 0", "important");
          if (borderState.side === "Top") {
            btn.style.setProperty("border-top-width", value, "important");
          } else if (borderState.side === "Right") {
            btn.style.setProperty("border-right-width", value, "important");
          } else if (borderState.side === "Bottom") {
            btn.style.setProperty("border-bottom-width", value, "important");
          } else if (borderState.side === "Left") {
            btn.style.setProperty("border-left-width", value, "important");
          }
        }
      });
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
  
    document.querySelector('.sc-bg-454545 img[alt="reset"]')?.addEventListener("click", () => {
      borderState.value = 0;
      fill.style.width = "0%";
      bullet.style.left = "0%";
      valueText.textContent = "0px";
      applyBorder();
    });
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
      
        window.__squareCraftBorderStyle = type;
      
        const selectedElement = getSelectedElement?.();
        if (!selectedElement) return;
      
        const sample = selectedElement.querySelector(
          "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
        );
        if (!sample) return;
      
        const typeClass = [...sample.classList].find(cls =>
          cls.includes("sqs-button-element--")
        );
        if (!typeClass) return;
      
        const allSameTypeButtons = document.querySelectorAll(`a.${typeClass}`);
        allSameTypeButtons.forEach(btn => {
          btn.style.setProperty("border-style", type, "important");
        });
      };
      
    });
  }



  export function initButtonBorderRadiusControl(getSelectedElement) {
    const fillField = document.getElementById("buttonBorderRadiousField");
    const bullet = document.getElementById("buttonBorderRadiousBullet");
    const fill = document.getElementById("buttonBorderRadiousFill");
    const valueText = document.getElementById("buttonBorderRadiousCount");
    const resetBtn = fillField?.previousElementSibling?.querySelector("img[alt='reset']");
  
    if (!fillField || !bullet || !fill || !valueText) return;
  
    bullet.style.transition = "left 0.15s ease";
    fill.style.transition = "width 0.15s ease";
  
    let radiusValue = 0;
  
    function getButtonTypeClass(sample) {
      if (sample.classList.contains("sqs-button-element--secondary")) return "sqs-button-element--secondary";
      if (sample.classList.contains("sqs-button-element--tertiary")) return "sqs-button-element--tertiary";
      return "sqs-button-element--primary";
    }
  
    function applyBorderRadius() {
      const selectedElement = typeof getSelectedElement === "function" ? getSelectedElement() : null;
      if (!selectedElement) return;
  
      const sampleButton = selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
      );
      if (!sampleButton) return;
  
      const typeClass = getButtonTypeClass(sampleButton);
      const allButtons = document.querySelectorAll(`a.${typeClass}`);
      allButtons.forEach(btn => {
        btn.style.setProperty("border-radius", `${radiusValue}px`, "important");
      });
    }
  
    function updateUI(clientX) {
      const rect = fillField.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      radiusValue = Math.round((x / rect.width) * 50);
  
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      valueText.textContent = `${radiusValue}px`;
  
      applyBorderRadius();
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
  
    fillField.addEventListener("click", (e) => {
      updateUI(e.clientX);
    });
  
    resetBtn?.addEventListener("click", () => {
      radiusValue = 0;
      bullet.style.left = "0%";
      fill.style.width = "0%";
      valueText.textContent = "0px";
      applyBorderRadius();
    });
  }
  

  
const shadowState = {
  Xaxis: 0,
  Yaxis: 0,
  Blur: 0,
  Spread: 0
};

export function initButtonShadowControls(getSelectedElement) {

  function applyShadow() {
    const el = getSelectedElement?.();
    if (!el) return;

    const typeSelectors = [
      "a.sqs-button-element--primary",
      "a.sqs-button-element--secondary",
      "a.sqs-button-element--tertiary"
    ];

    let selectedButton;
    for (const selector of typeSelectors) {
      const btn = el.querySelector(selector);
      if (btn) {
        selectedButton = btn;
        break;
      }
    }
    if (!selectedButton) return;

    const buttonType = [...selectedButton.classList].find(cls =>
      cls.startsWith("sqs-button-element--")
    );
    if (!buttonType) return;

    const shadowValue = `${shadowState.Xaxis}px ${shadowState.Yaxis}px ${shadowState.Blur}px ${shadowState.Spread}px rgba(0,0,0,0.3)`;
    const sameTypeButtons = document.querySelectorAll(`a.${buttonType}`);

    sameTypeButtons.forEach(btn => {
      btn.style.boxShadow = shadowValue;
    });
  }

  function setupShadowControl(type, max = 50) {
    const bullet = document.getElementById(`buttonShadow${type}Bullet`);
    const field = document.getElementById(`buttonShadow${type}Field`);
    const label = document.getElementById(`buttonShadow${type}Count`);

    if (!bullet || !field || !label) return;

    // Create and insert active fill bar if not already
    let fill = field.querySelector(".sc-shadow-fill");
    if (!fill) {
      fill = document.createElement("div");
      fill.className = "sc-shadow-fill";
      fill.style.position = "absolute";
      fill.style.top = "0";
      fill.style.left = "0";
      fill.style.height = "100%";
      fill.style.width = "0%";
      fill.style.backgroundColor = "#EF7C2F";
      fill.style.zIndex = "0";
      field.insertBefore(fill, bullet);
    }

    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      const value = Math.round((x / rect.width) * max);

      shadowState[type] = value;
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      label.textContent = `${value}px`;
      applyShadow();
    }

    bullet.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const move = (e) => updateUI(e.clientX);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    field.addEventListener("click", (e) => updateUI(e.clientX));
  }

  setupShadowControl("Xaxis", 30);
  setupShadowControl("Yaxis", 30);
  setupShadowControl("Blur", 50);
  setupShadowControl("Spread", 30);
}


  window.syncButtonStylesFromElement = function(selectedElement) {
    if (!selectedElement) return;
  
    document.getElementById("buttonBorderCount").textContent = "0px";
    document.getElementById("buttonBorderFill").style.width = "0%";
    document.getElementById("buttonBorderBullet").style.left = "0%";
  
    ["buttonBorderTypeSolid", "buttonBorderTypeDashed", "buttonBorderTypeDotted"].forEach(id => {
      document.getElementById(id)?.classList.remove("sc-bg-454545");
    });
    window.__squareCraftBorderStyle = "solid";
  
    document.getElementById("buttonBorderRadiousCount").textContent = "0px";
    document.getElementById("buttonBorderRadiousFill").style.width = "0%";
    document.getElementById("buttonBorderRadiousBullet").style.left = "0%";
  
    document.getElementById("buttonIconWidthCount").textContent = "0px";
    document.getElementById("buttonIconHeightCount").textContent = "0px";
  
    document.getElementById("buttoniconSpacingradiousCount").textContent = "0px";
    document.getElementById("buttonIconSpacingradiousFill").style.width = "0%";
    document.getElementById("buttonIconSpacingradiousBullet").style.left = "0%";
  
    const sampleButton = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
    );
    if (!sampleButton) return;
  
    const borderWidth = parseInt(sampleButton.style.borderWidth || "0");
    document.getElementById("buttonBorderCount").textContent = `${borderWidth}px`;
    document.getElementById("buttonBorderFill").style.width = `${(borderWidth / 10) * 100}%`;
    document.getElementById("buttonBorderBullet").style.left = `${(borderWidth / 10) * 100}%`;
  
    const borderStyle = sampleButton.style.borderStyle || "solid";
    window.__squareCraftBorderStyle = borderStyle;
    ["buttonBorderTypeSolid", "buttonBorderTypeDashed", "buttonBorderTypeDotted"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle("sc-bg-454545", el.id.includes(borderStyle));
    });
  
    const radius = parseInt(sampleButton.style.borderRadius || "0");
    document.getElementById("buttonBorderRadiousCount").textContent = `${radius}px`;
    document.getElementById("buttonBorderRadiousFill").style.width = `${(radius / 50) * 100}%`;
    document.getElementById("buttonBorderRadiousBullet").style.left = `${(radius / 50) * 100}%`;
  };
  
  