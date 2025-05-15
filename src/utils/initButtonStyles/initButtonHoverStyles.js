const hoverShadowState = {
    Xaxis: 0,
    Yaxis: 0,
    Blur: 0,
    Spread: 0
  };
  
  export function initHoverButtonShadowControls(getSelectedElement) {
    function applyHoverShadow() {
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
  
      const styleId = `sc-hover-shadow-${buttonType.replace(/--/g, "-")}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
  
      const shadowValue = `${hoverShadowState.Xaxis}px ${hoverShadowState.Yaxis}px ${hoverShadowState.Blur}px ${hoverShadowState.Spread}px rgba(0,0,0,0.3)`;
      styleTag.innerHTML = `
        a.${buttonType}:hover {
          box-shadow: ${shadowValue} !important;
        }
      `;
    }
  
    function setupHoverShadowControl(type, max = 50) {
      const bullet = document.getElementById(`hover-buttonShadow${type}Bullet`);
      const field = document.getElementById(`hover-buttonShadow${type}Field`);
      const label = document.getElementById(`hover-buttonShadow${type}Count`);
  
      if (!bullet || !field || !label) return;
  
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
  
        hoverShadowState[type] = value;
        bullet.style.left = `${percent}%`;
        fill.style.width = `${percent}%`;
        label.textContent = `${value}px`;
  
        applyHoverShadow();
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
  
    setupHoverShadowControl("Xaxis", 30);
    setupHoverShadowControl("Yaxis", 30);
    setupHoverShadowControl("Blur", 50);
    setupHoverShadowControl("Spread", 30);
  }


  export function initHoverButtonIconRotationControl(getSelectedElement) {
    const bullet = document.getElementById("hover-buttonIconRotationradiousBullet");
    const fill = document.getElementById("hover-buttonIconRotationradiousFill");
    const field = document.getElementById("hover-buttonIconRotationradiousField");
    const label = document.getElementById("hover-buttoniconRotationradiousCount");
  
    if (!bullet || !fill || !field || !label) return;
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const centerX = rect.width / 2;
      const deltaX = x - centerX;
      const percentFromCenter = (deltaX / centerX) * 50;
      const bulletPercent = (x / rect.width) * 100;
  
      bullet.style.left = `${bulletPercent}%`;
      fill.style.left = `${50 + Math.min(percentFromCenter, 0)}%`;
      fill.style.width = `${Math.abs(percentFromCenter)}%`;
  
      const value = Math.round((deltaX / centerX) * 180);
      label.textContent = `${value}deg`;
  
      const selectedElement = getSelectedElement?.();
      const btn = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!btn) return;
  
      const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
  
      const styleId = `sc-hover-style-transform-${typeClass.replace(/--/g, '-')}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
  
      styleTag.innerHTML = `a.${typeClass}:hover .sqscraft-button-icon { transform: rotate(${value}deg) !important; }`;
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
  
  
  export function initHoverButtonIconSizeControl(getSelectedElement) {
    const bullet = document.getElementById("hover-buttonIconSizeradiousBullet");
    const fill = document.getElementById("hover-buttonIconSizeradiousFill");
    const field = document.getElementById("hover-buttonIconSizeradiousField");
    const label = document.getElementById("hover-buttoniconSizeradiousCount");
  
    if (!bullet || !fill || !field || !label) return;
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      const size = Math.round((x / rect.width) * 50);
  
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      label.textContent = `${size}px`;
  
      const selectedElement = getSelectedElement?.();
      const btn = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!btn) return;
  
      const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
  
      const styleId = `sc-hover-style-size-${typeClass.replace(/--/g, '-')}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
  
      styleTag.innerHTML = `a.${typeClass}:hover .sqscraft-button-icon { width: ${size}px !important; height: auto !important; }`;
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
  
  
  export function initHoverButtonIconSpacingControl(getSelectedElement) {
    const bullet = document.getElementById("hover-buttonIconSpacingradiousBullet");
    const fill = document.getElementById("hover-buttonIconSpacingradiousFill");
    const field = document.getElementById("hover-buttonIconSpacingradiousField");
    const label = document.getElementById("hover-buttoniconSpacingradiousCount");
  
    if (!bullet || !fill || !field || !label) return;
  
    const maxGap = 30;
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      const value = Math.round((x / rect.width) * maxGap);
  
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      label.textContent = `${value}px`;
  
      const selectedElement = getSelectedElement?.();
      const btn = selectedElement?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!btn) return;
  
      const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
  
      const styleId = `sc-hover-style-gap-${typeClass.replace(/--/g, '-')}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
  
      styleTag.innerHTML = `a.${typeClass}:hover { gap: ${value}px !important; }`;
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
  
  export function initHoverButtonBorderRadiusControl(getSelectedElement) {
      const fillField = document.getElementById("hover-buttonBorderRadiousField");
      const bullet = document.getElementById("hover-buttonBorderRadiousBullet");
      const fill = document.getElementById("hover-buttonBorderRadiousFill");
      const valueText = document.getElementById("hover-buttonBorderRadiousCount");
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
        const styleId = `sc-hover-radius-${typeClass.replace(/--/g, "-")}`;
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }
    
        styleTag.innerHTML = `
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

  export function initHoverButtonBorderTypeToggle(getSelectedElement) {
    const typeButtons = [
      { id: "hover-buttonBorderTypeSolid", type: "solid" },
      { id: "hover-buttonBorderTypeDashed", type: "dashed" },
      { id: "hover-buttonBorderTypeDotted", type: "dotted" }
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
  
        const selectedElement = getSelectedElement?.();
        if (!selectedElement) return;
  
        const sample = selectedElement.querySelector(
          "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
        );
        if (!sample) return;
  
        const typeClass = [...sample.classList].find(cls =>
          cls.startsWith("sqs-button-element--")
        );
        if (!typeClass) return;
  
        const styleId = `sc-hover-border-style-${typeClass.replace(/--/g, "-")}`;
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }
  
        styleTag.innerHTML = `a.${typeClass}:hover { border-style: ${type} !important; }`;
      };
    });
  }
  

  export function initHoverButtonBorderControl(getSelectedElement) {
    const fill = document.getElementById("hover-buttonBorderFill");
    const bullet = document.getElementById("hover-buttonBorderBullet");
    const field = document.getElementById("hover-buttonBorderField");
    const valueText = document.getElementById("hover-buttonBorderCount");
  
    if (!fill || !bullet || !field || !valueText) return;
  
    const sides = ["All", "Top", "Right", "Bottom", "Left"];
    let borderState = { value: 0, side: "All" };
  
    sides.forEach(side => {
      const el = document.getElementById(`hover-buttonBorder${side}`);
      if (!el) return;
      el.addEventListener("click", () => {
        sides.forEach(s => {
          const btn = document.getElementById(`hover-buttonBorder${s}`);
          btn?.classList.remove("sc-bg-454545");
        });
        el.classList.add("sc-bg-454545");
        borderState.side = side;
        applyHoverBorder();
      });
    });
  
    function applyHoverBorder() {
      const selectedElement = getSelectedElement?.();
      if (!selectedElement) return;
    
      const btn = selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
      );
      if (!btn) return;
    
      const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
    
      const cssId = `hover-border-style-${typeClass.replace(/--/g, "-")}`;
      let styleTag = document.getElementById(cssId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = cssId;
        document.head.appendChild(styleTag);
      }
    
      const v = `${borderState.value}px`;
      let rules = "";
    
      if (borderState.side === "All") {
        rules = `
          border-top-width: ${v} !important;
          border-right-width: ${v} !important;
          border-bottom-width: ${v} !important;
          border-left-width: ${v} !important;
        `;
      } else {
        rules = `
          border-top-width: ${borderState.side === "Top" ? v : "0px"} !important;
          border-right-width: ${borderState.side === "Right" ? v : "0px"} !important;
          border-bottom-width: ${borderState.side === "Bottom" ? v : "0px"} !important;
          border-left-width: ${borderState.side === "Left" ? v : "0px"} !important;
        `;
      }
    
      styleTag.innerHTML = `
        a.${typeClass}:hover {
          ${rules}
          border-style: ${window.__squareCraftBorderStyle || "solid"} !important;
          border-color: ${window.__squareCraftHoverBorderColor || "black"} !important;
          border-radius: ${window.__squareCraftHoverRadius || 0}px !important;
        }
      `;
    }
    
    
    
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      borderState.value = Math.round((x / rect.width) * 10);
  
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      valueText.textContent = `${borderState.value}px`;
  
      applyHoverBorder();
      window.__squareCraftHoverBorderWidth = borderState.value;
    }
  
    bullet.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const move = (eMove) => updateUI(eMove.clientX);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  
    field.addEventListener("click", (e) => updateUI(e.clientX));
  
    const resetBtn = document.querySelector('#hover-buttonBorderCount')?.closest('.sc-flex')?.querySelector('img[alt="reset"]');
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        borderState.value = 0;
        bullet.style.left = "0%";
        fill.style.width = "0%";
        valueText.textContent = "0px";
        applyHoverBorder();
      });
    }
  }
  

  export function applyHoverButtonEffects(getSelectedElement) {
    const transition = document.getElementById("hover-buttonTransitionTypeLabel")?.textContent?.trim() || "none";
    const duration = document.getElementById("hover-buttonDurationLabel")?.textContent?.trim() || "0";
    const delay = document.getElementById("hover-buttonDelayLabel")?.textContent?.trim() || "0";
    const transformType = document.getElementById("hover-buttonTransformTypeLabel")?.textContent?.trim() || "none";
  
    const bullet = document.getElementById("hover-buttonIconTransformPositionBullet");
    const fill = document.getElementById("hover-buttonIconTransformPositionFill");
    const field = document.getElementById("hover-buttonIconTransformPositionField");
    const label = document.getElementById("hover-buttoniconTransformPositionCount");
  
    if (!bullet || !fill || !field || !label) return;
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      const value = Math.round((x / rect.width) * 50);
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      label.textContent = `${value}px`;
      window.__squareCraftTransformDistance = value;
      applyHoverStyles();
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
  
    function applyHoverStyles() {
      const distance = window.__squareCraftTransformDistance || 10;
      const selected = getSelectedElement?.();
      if (!selected) return;
  
      const button = selected.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!button) return;
  
      const typeClass = [...button.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
  
      const styleId = `sc-hover-effects-${typeClass.replace(/--/g, "-")}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
  
      let transformRule = "";
      if (transformType === "TranslateX") transformRule = `translateX(${distance}px)`;
      else if (transformType === "TranslateY") transformRule = `translateY(${distance}px)`;
      else if (transformType === "RotateX") transformRule = `rotateX(${distance}deg)`;
      else if (transformType === "RotateY") transformRule = `rotateY(${distance}deg)`;
      else if (transformType === "Scale") transformRule = `scale(${1 + distance / 100})`;
      else transformRule = "none";
  
      styleTag.innerHTML = `
        a.${typeClass}:hover {
          transition: all ${duration}ms ${transition} ${delay}ms !important;
          transform: ${transformRule} !important;
        }
      `;
    }
  
    applyHoverStyles();
  }
  
  