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
  
      const shadowVal = `${hoverShadowState.Xaxis}px ${hoverShadowState.Yaxis}px ${hoverShadowState.Blur}px ${hoverShadowState.Spread}px rgba(0,0,0,0.3)`;
      styleTag.innerHTML = `
        a.${buttonType}:hover {
          box-shadow: ${shadowVal} !important;
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
  