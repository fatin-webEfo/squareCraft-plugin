

export function initButtonFontFamilyControls(getSelectedElement) {
  const selectedElement = getSelectedElement?.();
  if (!selectedElement) return;

  const GOOGLE_FONTS_API =
    "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk";
  let fontsList = [];
  let fontIndex = 0;
  const fontsPerPage = 20;

  const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
  if (!fontFamilyOptions) return;

  const loader = document.createElement("div");
  loader.id = "sc-font-loader";
  loader.innerHTML = `
  <div style="
    width: 24px;
    height: 24px;
    margin: 12px auto;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #EF7C2F;
    border-radius: 50%;
    animation: scSpin 0.8s linear infinite;
  "></div>
`;
  document.head.insertAdjacentHTML("beforeend", `
  <style>
    @keyframes scSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`);
  fontFamilyOptions.appendChild(loader);

  fetchGoogleFonts();
  setupFontScrollLoader();

  async function fetchGoogleFonts() {
    try {
      const res = await fetch(GOOGLE_FONTS_API);
      const data = await res.json();
      fontsList = data.items;
      loader.remove();
      renderFontBatch();
    } catch (err) {
      loader.remove();
      console.error("❌ Failed to fetch Google Fonts:", err);
    }
  }



  function setupFontScrollLoader() {
    fontFamilyOptions.addEventListener("scroll", () => {
      if (
        fontFamilyOptions.scrollTop + fontFamilyOptions.clientHeight >=
        fontFamilyOptions.scrollHeight - 5
      ) {
        renderFontBatch();
      }
    });
  }

  function renderFontBatch() {
    const slice = fontsList.slice(fontIndex, fontIndex + fontsPerPage);

    slice.forEach((fontItem) => {
      const family = fontItem.family;
      const fontId = `font-${family.replace(/\s+/g, "-")}`;
      const fontUrl = fontItem.files?.regular;

      if (fontUrl && !document.getElementById(fontId)) {
        const link = document.createElement("link");
        link.id = fontId;
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${family.replace(
          /\s+/g,
          "+"
        )}&display=swap`;
        document.head.appendChild(link);
      }

      const div = document.createElement("div");
      div.className = "sc-dropdown-item sc-py-1px sc-text-center sc-cursor-pointer";
      div.textContent = family;
      div.style.fontFamily = `"${family}", sans-serif`;

      div.addEventListener("click", async () => {
        const label = document.getElementById("font-name");
        const fontFace = `"${family}", sans-serif`;

        try {
          await document.fonts.load(`1em ${fontFace}`);
          await new Promise((resolve) => setTimeout(resolve, 50));
        } catch (e) {
          console.warn("Font preload failed:", family);
        }

        if (label) {
          label.innerText = family;
          label.classList.remove("sc-roboto");
          label.style.setProperty("font-family", fontFace, "important");
        }

        const btn = selectedElement.querySelector(
          "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
          "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
        );
        if (!btn) return;

        const typeClass = [...btn.classList].find((cls) =>
          cls.startsWith("sqs-button-element--")
        );
        if (!typeClass) return;

        let cssVar = "";
        if (typeClass.includes("primary"))
          cssVar = "--primary-button-font-font-family";
        if (typeClass.includes("secondary"))
          cssVar = "--secondary-button-font-font-family";
        if (typeClass.includes("tertiary"))
          cssVar = "--tertiary-button-font-font-family";

        if (cssVar) {
          document.documentElement.style.setProperty(cssVar, fontFace);

          const styleId = `sc-font-style-${typeClass}`;
          let style = document.getElementById(styleId);
          if (!style) {
            style = document.createElement("style");
            style.id = styleId;
            document.head.appendChild(style);
          }

          style.innerHTML = `
            .${typeClass} {
              font-family: ${fontFace} !important;
            }
            .${typeClass} span,
            .${typeClass} .sqs-add-to-cart-button-inner {
              font-family: ${fontFace} !important;
            }
          `;
        }

        const fontWeightOptions = document.getElementById("scButtonFontWeightOptions");
        const fontWeightSelectedLabel = document.getElementById("scButtonFontWeightSelected");

        if (fontWeightOptions && fontItem.variants) {
          fontWeightOptions.innerHTML = "";

          const variants = fontItem.variants
            .filter((v) => v !== "italic")
            .map((v) => (v === "regular" ? "400" : v));

          variants.forEach((weight) => {
            const item = document.createElement("div");
            item.className =
              "sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer";
            item.innerText = weight;
            item.onclick = () => {
              fontWeightSelectedLabel.innerText = weight;
              fontWeightOptions.classList.add("sc-hidden");

              const buttons = document.querySelectorAll(`a.${typeClass}, button.${typeClass}`);
              buttons.forEach((btn) => {
                const spans = btn.querySelectorAll("span, .sqs-add-to-cart-button-inner");
                spans.forEach((span) => {
                  span.style.fontWeight = weight;
                });
              });
            };
            fontWeightOptions.appendChild(item);
          });

          fontWeightSelectedLabel.innerText = variants.includes("400") ? "400" : variants[0] || "";
        }
      });

      fontFamilyOptions.appendChild(div);
    });

    fontIndex += fontsPerPage;
  }
}




export function initButtonStyles(selectedButtonElement) {
  if (!selectedButtonElement) return;

  const fontSizeInput = document.getElementById("scButtonFontSizeInput");
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
      transformButton.onclick = () => {
        const transformClassMap = {
          scButtonAllCapital: "sc-text-upper",
          scButtonAllSmall: "sc-text-lower",
          scButtonFirstCapital: "sc-text-capitalize",
        };

        const newClass = transformClassMap[id];

        const isAlreadyActive = transformButton.classList.contains("sc-activeTab-border");
        ["scButtonAllCapital", "scButtonAllSmall", "scButtonFirstCapital"].forEach((btnId) => {
          const btn = document.getElementById(btnId);
          if (btn) {
            btn.classList.remove("sc-activeTab-border");
            btn.classList.add("sc-inActiveTab-border");
          }
        });

        const spans = Array.from(
          document.querySelectorAll(
            `a.${currentButtonTypeClass} .sqs-html span, 
             button.${currentButtonTypeClass} .sqs-add-to-cart-button-inner, 
             button.${currentButtonTypeClass} span`
          )
        );

        if (isAlreadyActive) {
          transformButton.classList.remove("sc-activeTab-border");
          transformButton.classList.add("sc-inActiveTab-border");

          spans.forEach(span => {
            span.classList.remove("sc-text-upper", "sc-text-lower", "sc-text-capitalize");
          });

        } else {
          transformButton.classList.remove("sc-inActiveTab-border");
          transformButton.classList.add("sc-activeTab-border");

          spans.forEach(span => {
            span.classList.remove("sc-text-upper", "sc-text-lower", "sc-text-capitalize");
            span.classList.add(newClass);
          });
        }
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
        `<p class="sc-universal sc-roboto sc-font-size-12">${value.charAt(0).toUpperCase() + value.slice(1)}</p>`;
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

let normalRotationInitialized = false;

export function initButtonIconRotationControl(getSelectedElement) {
  if (normalRotationInitialized) return;
  normalRotationInitialized = true;

  const bullet = document.getElementById("buttonIconRotationradiusBullet");
  const fill = document.getElementById("buttonIconRotationradiusFill");
  const field = document.getElementById("buttonIconRotationradiusField");
  const label = document.getElementById("buttoniconRotationradiusCount");

  const incBtn = document.getElementById("buttoniconRotationIncrease");
  const decBtn = document.getElementById("buttoniconRotationDecrease");

  let currentRotation = 0;
  let userInteracted = false;

  function applyRotation() {
    const selectedElement = getSelectedElement?.();
    const btn = selectedElement?.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const typeClass = [...btn.classList].find(cls =>
      cls.startsWith("sqs-button-element--")
    );
    if (!typeClass) return;

    const buttons = document.querySelectorAll(`a.${typeClass}`);
    buttons.forEach(button => {
      const icon = button.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
      if (icon) {
        icon.style.transform = `rotate(${currentRotation}deg)`;
      }
    });
  }

  function updateFromRotationValue(value) {
    userInteracted = true;
    currentRotation = Math.max(-180, Math.min(180, value));
    const percent = ((currentRotation + 180) / 360) * 100;

    bullet.style.left = `${percent}%`;
    fill.style.left = `${Math.min(percent, 50)}%`;
    fill.style.width = `${Math.abs(percent - 50)}%`;
    label.textContent = `${currentRotation}deg`;

    applyRotation();
  }

  function updateUI(clientX) {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const centerX = rect.width / 2;
    const deltaX = x - centerX;
    const newRotation = Math.round((deltaX / centerX) * 180);
    updateFromRotationValue(newRotation);
  }

  function syncFromIconRotation() {
    if (userInteracted) return;

    const selectedElement = getSelectedElement?.();
    const btn = selectedElement?.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const icon = btn.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
    if (!icon) {
      updateFromRotationValue(0); // fallback default
      return;
    }

    const match = icon.style.transform?.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
    if (match) {
      const rotation = parseFloat(match[1]);
      if (!isNaN(rotation)) {
        updateFromRotationValue(rotation);
        return;
      }
    }

    updateFromRotationValue(0); // fallback default
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    userInteracted = true;
    const move = (e) => updateUI(e.clientX);
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  field.addEventListener("click", (e) => {
    userInteracted = true;
    updateUI(e.clientX);
  });

  if (incBtn) {
    incBtn.addEventListener("click", () => {
      userInteracted = true;
      updateFromRotationValue(currentRotation + 1);
    });
  }

  if (decBtn) {
    decBtn.addEventListener("click", () => {
      userInteracted = true;
      updateFromRotationValue(currentRotation - 1);
    });
  }

  setTimeout(syncFromIconRotation, 50);
}



export function initButtonIconSizeControl(getSelectedElement) {
  const bullet = document.getElementById("buttonIconSizeradiusBullet");
  const fill = document.getElementById("buttonIconSizeradiusFill");
  const field = document.getElementById("buttonIconSizeradiusField");
  const label = document.getElementById("buttoniconSizeradiusCount");

  const incBtn = document.getElementById("buttoniconSizeIncrease");
  const decBtn = document.getElementById("buttoniconSizeDecrease");

  const maxSize = 50;
  let currentSize = 0;

  function applySize() {
    const selectedElement = getSelectedElement?.();
    if (!selectedElement) return;

    const btn = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, " +
      "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const typeClass = [...btn.classList].find(cls =>
      cls.startsWith("sqs-button-element--")
    );
    if (!typeClass) return;

    const allButtons = document.querySelectorAll(`a.${typeClass}, button.${typeClass}`);
    allButtons.forEach(button => {
      const icons = button.querySelectorAll(".sqscraft-button-icon, .sqscraft-image-icon");
      icons.forEach(icon => {
        icon.style.width = `${currentSize}px`;
        icon.style.height = "auto";
      });
    });

  }

  function updateFromSizeValue(value) {
    currentSize = Math.max(0, Math.min(maxSize, value));
    const percent = (currentSize / maxSize) * 100;

    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
    label.textContent = `${currentSize}px`;

    applySize();
  }

  function updateUI(clientX) {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const newSize = Math.round((x / rect.width) * maxSize);
    updateFromSizeValue(newSize);
  }

  function syncFromIcon() {
    const selectedElement = getSelectedElement?.();
    const btn = selectedElement?.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, " +
      "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const icon = btn.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
    if (!icon || !icon.style.width) return;

    const size = parseInt(icon.style.width, 10);
    if (!isNaN(size)) {
      updateFromSizeValue(size);
    }
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

  if (incBtn) {
    incBtn.addEventListener("click", () => {
      updateFromSizeValue(currentSize + 1);
    });
  }

  if (decBtn) {
    decBtn.addEventListener("click", () => {
      updateFromSizeValue(currentSize - 1);
    });
  }

  setTimeout(syncFromIcon, 50);
}


export function initButtonIconSpacingControl(getSelectedElement) {
  const fill = document.getElementById("buttonIconSpacingradiusFill");
  const bullet = document.getElementById("buttonIconSpacingradiusBullet");
  const field = document.getElementById("buttonIconSpacingradiusField");
  const valueText = document.getElementById("buttoniconSpacingCount");
  const incBtn = document.getElementById("buttoniconSpacingIncrease");
  const decBtn = document.getElementById("buttoniconSpacingDecrease");
  const resetBtn = field?.previousElementSibling?.querySelector('img[alt="reset"]');

  if (!fill || !bullet || !field || !valueText) return;

  const maxGap = 30;
  let gapValue = 0;

  function applyGap() {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;

    const btnClass = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    if (!btnClass) return;

    document.querySelectorAll(`a.${btnClass}`).forEach(el => {
      const hasIcon = el.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
      if (hasIcon) {
        el.classList.add("sc-flex", "sc-items-center");
        el.style.gap = `${gapValue}px`;
      } else {
        el.classList.remove("sc-flex", "sc-items-center");
        el.style.gap = "";
      }
    });
  }

  function updateUI(val) {
    gapValue = Math.max(0, Math.min(maxGap, val));
    const percent = (gapValue / maxGap) * 100;
    fill.style.width = `${percent}%`;
    bullet.style.left = `${percent}%`;
    valueText.textContent = `${gapValue}px`;
    applyGap();
  }

  bullet.addEventListener("mousedown", e => {
    e.preventDefault();
    const move = eMove => {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      const val = Math.round((x / rect.width) * maxGap);
      updateUI(val);
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  field.addEventListener("click", e => {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const val = Math.round((x / rect.width) * maxGap);
    updateUI(val);
  });

  incBtn?.addEventListener("click", () => updateUI(gapValue + 1));
  decBtn?.addEventListener("click", () => updateUI(gapValue - 1));
  resetBtn?.addEventListener("click", () => updateUI(8));

  setTimeout(() => {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (btn) {
      const computedGap = parseInt(window.getComputedStyle(btn).gap);
      if (!isNaN(computedGap)) updateUI(computedGap);
    }
  }, 50);
}



export function initButtonBorderControl(getSelectedElement) {
  const fill = document.getElementById("buttonBorderFill");
  const bullet = document.getElementById("buttonBorderBullet");
  const field = document.getElementById("buttonBorderField");
  const valueText = document.getElementById("buttonBorderCount");
  const incBtn = document.getElementById("buttonBorderIncrease");
  const decBtn = document.getElementById("buttonBorderDecrease");
  const resetBtn = valueText?.closest(".sc-flex")?.querySelector('img[alt="reset"]');

  if (!fill || !bullet || !field || !valueText) return;

  const max = 10;
  let currentValue = 0;

  if (!window.__squareCraftBorderStateMap) window.__squareCraftBorderStateMap = new Map();
  const sides = ["Top", "Right", "Bottom", "Left"];

  ["All", ...sides].forEach((side) => {
    const el = document.getElementById(`buttonBorder${side}`);
    if (!el) return;

    el.addEventListener("click", () => {
      ["All", ...sides].forEach((s) => {
        const btn = document.getElementById(`buttonBorder${s}`);
        btn?.classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");

      const selectedElement = getSelectedElement?.();
      if (!selectedElement) return;

      const btn = selectedElement.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary");
      if (!btn) return;

      const typeClass = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
      const blockId = selectedElement.id || "block-id";
      const key = `${blockId}--${typeClass}`;

      const state = window.__squareCraftBorderStateMap.get(key) || { values: {}, side: "All" };
      state.side = side;
      state.values[side] = state.values[side] || 0;

      window.__squareCraftBorderStateMap.set(key, state);
      currentValue = state.values[side];
      updateUIFromValue(currentValue);
    });
  });

  function applyBorder() {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary");
    if (!btn) return;

    const typeClass = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    const blockId = selected.id || "block-id";
    const key = `${blockId}--${typeClass}`;
    const state = window.__squareCraftBorderStateMap.get(key) || { values: {}, side: "All" };
    const val = `${currentValue}px`;

    if (state.side === "All") {
      ["Top", "Right", "Bottom", "Left"].forEach(side => state.values[side] = currentValue);
    } else {
      state.values[state.side] = currentValue;
    }

    window.__squareCraftBorderStateMap.set(key, state);

    const selector = `#siteWrapper #${blockId} .sqs-block-button-container a.${typeClass}, #siteWrapper #${blockId} .sqs-block-button-container button.${typeClass}`;
    const styleTagId = `sc-button-border-${blockId}-${typeClass}`;
    let styleTag = document.getElementById(styleTagId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleTagId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      ${selector}, .${typeClass} {
        box-sizing: border-box !important;
        border-style: ${window.__squareCraftBorderStyle || "solid"} !important;
        border-color: black !important;
        border-top-width: ${state.values.Top || 0}px !important;
        border-right-width: ${state.values.Right || 0}px !important;
        border-bottom-width: ${state.values.Bottom || 0}px !important;
        border-left-width: ${state.values.Left || 0}px !important;
      }
    `;

    document.querySelectorAll(`.${typeClass}`).forEach(el => {
      el.style.borderTopWidth = `${state.values.Top || 0}px`;
      el.style.borderRightWidth = `${state.values.Right || 0}px`;
      el.style.borderBottomWidth = `${state.values.Bottom || 0}px`;
      el.style.borderLeftWidth = `${state.values.Left || 0}px`;
    });
  }

  function updateUIFromValue(value) {
    currentValue = Math.max(0, Math.min(max, value));
    const percent = (currentValue / max) * 100;
    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
    valueText.textContent = `${currentValue}px`;
    applyBorder();
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const move = (eMove) => {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      const value = Math.round((x / rect.width) * max);
      updateUIFromValue(value);
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  field.addEventListener("click", (e) => {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const value = Math.round((x / rect.width) * max);
    updateUIFromValue(value);
  });

  incBtn?.addEventListener("click", () => updateUIFromValue(currentValue + 1));
  decBtn?.addEventListener("click", () => updateUIFromValue(currentValue - 1));
  resetBtn?.addEventListener("click", () => updateUIFromValue(0));

  setTimeout(() => {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary");
    if (!btn) return;

    const typeClass = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    const blockId = selected.id || "block-id";
    const key = `${blockId}--${typeClass}`;
    const stored = window.__squareCraftBorderStateMap.get(key);
    if (stored?.side) {
      currentValue = stored.values[stored.side] || 0;
      updateUIFromValue(currentValue);
    }
  }, 50);
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
  const fillField = document.getElementById("buttonBorderradiusField");
  const bullet = document.getElementById("buttonBorderradiusBullet");
  const fill = document.getElementById("buttonBorderradiusFill");
  const valueText = document.getElementById("buttonBorderradiusCount");
  const incBtn = document.getElementById("buttonBorderradiusIncrease");
  const decBtn = document.getElementById("buttonBorderradiusDecrease");
  const resetBtn = valueText?.closest(".sc-flex")?.querySelector('img[alt="reset"]');

  if (!fillField || !bullet || !fill || !valueText) return;

  const max = 50;
  let radiusValue = 0;

  function getButtonTypeClass(btn) {
    if (btn.classList.contains("sqs-button-element--secondary")) return "sqs-button-element--secondary";
    if (btn.classList.contains("sqs-button-element--tertiary")) return "sqs-button-element--tertiary";
    return "sqs-button-element--primary";
  }

  function applyBorderRadius() {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;

    const typeClass = getButtonTypeClass(btn);
    const styleId = `sc-normal-radius-${typeClass.replace(/--/g, "-")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      a.${typeClass} {
        border-radius: ${radiusValue}px !important;
        overflow: hidden !important;
      }
      a.${typeClass} span,
      a.${typeClass} .sqs-add-to-cart-button-inner {
        border-radius: ${radiusValue}px !important;
      }
      a.${typeClass}:hover {
        border-radius: ${radiusValue}px !important;
        overflow: hidden !important;
      }
      a.${typeClass}:hover span,
      a.${typeClass}:hover .sqs-add-to-cart-button-inner {
        border-radius: ${radiusValue}px !important;
      }
    `;
  }

  function updateUIFromValue(value) {
    radiusValue = Math.max(0, Math.min(max, value));
    const percent = (radiusValue / max) * 100;

    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
    valueText.textContent = `${radiusValue}px`;

    applyBorderRadius();
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const move = (eMove) => {
      const rect = fillField.getBoundingClientRect();
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      const value = Math.round((x / rect.width) * max);
      updateUIFromValue(value);
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  fillField.addEventListener("click", (e) => {
    const rect = fillField.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const value = Math.round((x / rect.width) * max);
    updateUIFromValue(value);
  });

  incBtn?.addEventListener("click", () => updateUIFromValue(radiusValue + 1));
  decBtn?.addEventListener("click", () => updateUIFromValue(radiusValue - 1));
  resetBtn?.addEventListener("click", () => updateUIFromValue(0));

  // ✅ Sync radius from DOM on load (like icon does)
  setTimeout(() => {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;

    const computed = parseInt(window.getComputedStyle(btn).borderRadius || "0");
    if (!isNaN(computed)) updateUIFromValue(computed);
  }, 50);
}


const shadowState = {
  Xaxis: 0,
  Yaxis: 0,
  Blur: 0,
  Spread: 0
};



export function initButtonShadowControls(getSelectedElement) {
  if (!window.shadowState) {
    window.shadowState = {
      Xaxis: 0,
      Yaxis: 0,
      Blur: 0,
      Spread: 0
    };
  }

  function applyShadow() {
    const el = getSelectedElement?.();
    if (!el) return;

    const btn = el.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
    if (!typeClass) return;

    const value = `${window.shadowState.Xaxis}px ${window.shadowState.Yaxis}px ${window.shadowState.Blur}px ${window.shadowState.Spread}px rgba(0,0,0,0.3)`;

    document.querySelectorAll(`a.${typeClass}, button.${typeClass}`).forEach(b => {
      b.style.boxShadow = value;
    });
  }

  function setupShadowControl(type, range = 50) {
    const bullet = document.getElementById(`buttonShadow${type}Bullet`);
    const field = document.getElementById(`buttonShadow${type}Field`);
    const label = document.getElementById(`buttonShadow${type}Count`);
    const idPrefix = type.replace("axis", "");
    const incBtn = document.getElementById(`buttonshadow${type}Increase`) || document.getElementById(`buttonshadow${idPrefix}Increase`);
    const decBtn = document.getElementById(`buttonshadow${type}Decrease`) || document.getElementById(`buttonshadow${idPrefix}Decrease`);

    if (!bullet || !field || !label) return;

    field.style.position = "relative";

    let minValue = 0;
    if (type === "Xaxis" || type === "Yaxis") minValue = -range;
    const maxValue = range;

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
      field.appendChild(fill);
    }

    bullet.style.position = "absolute";
    bullet.style.transform = "translateX(-50%)";
    bullet.style.zIndex = "1";

    function updateUI(value) {
      const val = Math.max(minValue, Math.min(maxValue, value));
      window.shadowState[type] = val;

      const percent = ((val - minValue) / (maxValue - minValue)) * 100;
      const centerPercent = ((0 - minValue) / (maxValue - minValue)) * 100;

      bullet.style.left = `${percent}%`;
      fill.style.left = `${Math.min(percent, centerPercent)}%`;
      fill.style.width = `${Math.abs(percent - centerPercent)}%`;

      label.textContent = `${val}px`;
      applyShadow();
    }


    bullet.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const rect = field.getBoundingClientRect();
      const move = (eMove) => {
        const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
        const percent = x / rect.width;
        const val = Math.round(percent * (maxValue - minValue) + minValue);
        updateUI(val);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    field.addEventListener("click", (e) => {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const percent = x / rect.width;
      const val = Math.round(percent * (maxValue - minValue) + minValue);
      updateUI(val);
    });

    if (incBtn) {
      incBtn.onclick = () => {
        const current = window.shadowState[type] || 0;
        updateUI(current + 1);
      };
    }

    if (decBtn) {
      decBtn.onclick = () => {
        const current = window.shadowState[type] || 0;
        updateUI(current - 1);
      };
    }

    updateUI(window.shadowState[type] || 0);
  }

  setupShadowControl("Xaxis", 30);
  setupShadowControl("Yaxis", 30);
  setupShadowControl("Blur", 50);
  setupShadowControl("Spread", 30);
}



window.syncButtonStylesFromElement = function (selectedElement) {
  if (!selectedElement) return;

  const sampleButton = selectedElement.querySelector(
    "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
  );
  if (!sampleButton) return;

  const icon = sampleButton.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");

  const getPercent = (val, max) => `${(val / max) * 100}%`;
  const set = (id, value, max) => {
    const count = document.getElementById(id + "Count");
    const fill = document.getElementById(id + "Fill");
    const bullet = document.getElementById(id + "Bullet");
    if (!count || !fill || !bullet) return;
    count.textContent = `${value}px`;
    fill.style.width = getPercent(value, max);
    bullet.style.left = getPercent(value, max);
  };

  set("buttonBorder", parseInt(sampleButton.style.borderWidth || "0"), 10);

  window.__squareCraftBorderStyle = sampleButton.style.borderStyle || "solid";
  ["buttonBorderTypeSolid", "buttonBorderTypeDashed", "buttonBorderTypeDotted"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.toggle("sc-bg-454545", id.includes(window.__squareCraftBorderStyle));
  });

  set("buttonBorderradius", parseInt(sampleButton.style.borderRadius || "0"), 50);

  const size = parseInt(icon?.style.width || "0");
  set("buttonIconSizeradius", size, 50);

  const transformMatch = icon?.style.transform?.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
  if (transformMatch) {
    const rotation = parseFloat(transformMatch[1]);
    const percent = ((rotation + 180) / 360) * 100;
    document.getElementById("buttoniconRotationradiusCount").textContent = `${rotation}deg`;
    document.getElementById("buttonIconRotationradiusBullet").style.left = `${percent}%`;
    document.getElementById("buttonIconRotationradiusFill").style.left = `${Math.min(percent, 50)}%`;
    document.getElementById("buttonIconRotationradiusFill").style.width = `${Math.abs(percent - 50)}%`;
  }

  const spacing = {
    top: parseInt(icon?.style.marginTop || "0"),
    bottom: parseInt(icon?.style.marginBottom || "0"),
    left: parseInt(icon?.style.marginLeft || "0"),
    right: parseInt(icon?.style.marginRight || "0")
  };
  const spacingValue = Math.max(...Object.values(spacing));
  const spacingPercent = getPercent(spacingValue, 30);
  document.getElementById("buttoniconSpacingradiusCount").textContent = `${spacingValue}px`;
  document.getElementById("buttonIconSpacingradiusFill").style.width = spacingPercent;
  document.getElementById("buttonIconSpacingradiusBullet").style.left = spacingPercent;
  ["Top", "Bottom", "Left", "Right"].forEach(dir => {
    const el = document.getElementById(`buttonIconSpacing${dir}`);
    if (el) el.classList.toggle("sc-bg-454545", spacing[dir.toLowerCase()] > 0);
  });

  const shadow = sampleButton.style.boxShadow || "";
  const match = shadow.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(\d+)px/);
  if (match) {
    const [x, y, blur, spread] = match.slice(1).map(Number);
    const props = { Xaxis: [x, 30], Yaxis: [y, 30], Blur: [blur, 50], Spread: [spread, 30] };
    Object.entries(props).forEach(([type, [val, max]]) => {
      const count = document.getElementById(`buttonShadow${type}Count`);
      const bullet = document.getElementById(`buttonShadow${type}Bullet`);
      const fill = document.querySelector(`#buttonShadow${type}Field .sc-shadow-fill`);
      if (count) count.textContent = `${val}px`;
      if (bullet) bullet.style.left = getPercent(val, max);
      if (fill) fill.style.width = getPercent(val, max);
    });
  }

  window.updateActiveButtonBars?.();
};

// initButtonStyles.js component 