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
  
  
  