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


  export function initHoverButtonIconControls(getSelectedElement) {
    const controls = [
      { type: "Rotation", property: "transform", id: "hover-buttonIconRotationradious" },
      { type: "Size", property: ["width", "height"], id: "hover-buttonIconSizeradious" },
      { type: "Spacing", property: "margin-right", id: "hover-buttonIconSpacingradious" }
    ];
  
    controls.forEach(ctrl => {
      const bullet = document.getElementById(`${ctrl.id}Bullet`);
      const fill = document.getElementById(`${ctrl.id}Fill`);
      const field = document.getElementById(`${ctrl.id}Field`);
      const label = document.getElementById(`hover-buttonicon${ctrl.type}Count`);
  
      if (!bullet || !fill || !field || !label) return;
  
      bullet.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const move = (e) => {
          const rect = field.getBoundingClientRect();
          const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
          const percent = (x / rect.width) * 100;
          bullet.style.left = `${percent}%`;
  
          const centerX = rect.width / 2;
          const deltaX = x - centerX;
  
          let value;
          let cssValue;
  
          if (ctrl.property === "transform") {
            value = Math.round((deltaX / centerX) * 180);
            cssValue = `rotate(${value}deg)`;
            label.textContent = `${value}deg`;
          } else if (Array.isArray(ctrl.property)) {
            value = Math.floor((x / rect.width) * 100);
            cssValue = `${value}px`;
            label.textContent = `${value}px`;
          } else {
            value = Math.round((deltaX / centerX) * 50);
            cssValue = `${value}px`;
            label.textContent = `${value}px`;
          }
  
          fill.style.left = `${Math.min(percent, 50)}%`;
          fill.style.width = `${Math.abs(percent - 50)}%`;
  
          const selectedElement = getSelectedElement?.();
          const btn = selectedElement?.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
          );
          if (!btn) return;
  
          const typeClass = [...btn.classList].find(cls => cls.startsWith("sqs-button-element--"));
          if (!typeClass) return;
  
          const styleId = `sc-hover-style-${ctrl.property.toString().replace(/,/g, '-')}-${typeClass.replace(/--/g, '-')}`;
          let styleTag = document.getElementById(styleId);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
          }
  
          const selector = `a.${typeClass}:hover .sqscraft-button-icon`;
  
          if (Array.isArray(ctrl.property)) {
            styleTag.innerHTML = `${selector} { ${ctrl.property.map(p => `${p}: ${cssValue} !important`).join('; ')}; }`;
          } else {
            styleTag.innerHTML = `${selector} { ${ctrl.property}: ${cssValue} !important; }`;
          }
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
        const clientX = e.clientX;
        const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
        bullet.dispatchEvent(new MouseEvent("mousedown", { clientX: clientX, bubbles: true }));
      });
    });
  }
  
  