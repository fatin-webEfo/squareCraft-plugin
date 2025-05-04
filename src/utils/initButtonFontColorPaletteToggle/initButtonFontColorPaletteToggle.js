export function initButtonFontColorPaletteToggle(themeColors, selectedElement) {
  let dynamicHue = 0;

  const palette = document.getElementById("buttonFontColorPalate");
  const container = document.getElementById("button-border-colors");
  const selectorField = document.getElementById("button-color-selection-field");
  const bullet = document.getElementById("button-color-selection-bar");
  const colorCode = document.getElementById("button-color-code");
  const transparencyCount = document.getElementById("button-color-transparency-count");
  const allColorField = document.getElementById("button-all-color-selection-field");
  const allColorBullet = document.getElementById("button-all-color-selection-bar");
  const transparencyField = document.getElementById("button-color-transparency-field");
  const transparencyBullet = document.getElementById("button-color-transparency-bar");

  function applyButtonBackgroundColor(color) {
    if (!selectedElement) return;
    const blockId = selectedElement.id;
    const buttonTypes = [
      "sqs-button-element--primary",
      "sqs-button-element--secondary",
      "sqs-button-element--tertiary"
    ];
    let buttonType = null;
    for (let type of buttonTypes) {
      if (selectedElement.querySelector(`a.${type}`)) {
        buttonType = type;
        break;
      }
    }
    if (!buttonType) return;
    const buttonTypeShort = buttonType.split("--")[1];
    const styleId = `sc-style-${blockId}-${buttonTypeShort}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = `
      #${blockId} .${buttonType} {
        background-color: ${color} !important;
        background: ${color} !important;
        border-color: ${color} !important;
      }
      #${blockId} .${buttonType}:hover {
        background-color: ${color} !important;
        background: ${color} !important;
        border-color: ${color} !important;
        filter: brightness(0.95);
      }
    `;
    const matchingButtons = selectedElement.querySelectorAll(`a.${buttonType}`);
    matchingButtons.forEach(btn => {
      btn.dataset.scButtonBg = color;
    });
  }

  function getGradientCanvas(hue, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const gradient1 = ctx.createLinearGradient(0, 0, width, 0);
    gradient1.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
    gradient1.addColorStop(1, "white");

    const gradient2 = ctx.createLinearGradient(0, height, 0, 0);
    gradient2.addColorStop(0, "black");
    gradient2.addColorStop(1, "transparent");

    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);

    return ctx;
  }

  function updateSelectorField(hue) {
    selectorField.style.background = `
      linear-gradient(to right, hsl(${hue}, 100%, 50%), white),
      linear-gradient(to top, black, transparent)
    `;
    selectorField.style.backgroundBlendMode = "multiply";
    selectorField.style.backgroundSize = "100% 100%";
    selectorField.style.backgroundRepeat = "no-repeat";
  }

  function moveBullet(offsetX, offsetY) {
    bullet.style.left = `${offsetX}px`;
    bullet.style.top = `${offsetY}px`;
    const ctx = getGradientCanvas(dynamicHue, selectorField.offsetWidth, selectorField.offsetHeight);
    const data = ctx.getImageData(offsetX, offsetY, 1, 1).data;
    const rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    colorCode.textContent = rgb;
    applyButtonBackgroundColor(rgb);
  }

  if (!palette || !selectorField || !bullet || !colorCode || !container) return;

  if (allColorField) {
    allColorField.style.background = `linear-gradient(to bottom, 
      hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
      hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%),
      hsl(360, 100%, 50%))`;
  }

  if (transparencyField) {
    transparencyField.style.background = `linear-gradient(to bottom, 
      hsla(0, 100%, 50%, 1), hsla(0, 100%, 50%, 0))`;
  }

  allColorBullet.onmousedown = e => {
    e.preventDefault();
    document.onmousemove = e => {
      const rect = allColorField.getBoundingClientRect();
      let y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      allColorBullet.style.top = `${y}px`;
      const percentage = y / rect.height;
      dynamicHue = Math.round(360 * percentage);
      updateSelectorField(dynamicHue);
      transparencyField.style.background = `linear-gradient(to bottom, 
        hsla(${dynamicHue}, 100%, 50%, 1), hsla(${dynamicHue}, 100%, 50%, 0))`;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  bullet.onmousedown = e => {
    e.preventDefault();
    document.onmousemove = e => {
      const rect = selectorField.getBoundingClientRect();
      let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      let y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      moveBullet(x, y);
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  transparencyBullet.onmousedown = e => {
    e.preventDefault();
    document.onmousemove = e => {
      const rect = transparencyField.getBoundingClientRect();
      let y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      transparencyBullet.style.top = `${y}px`;
      transparencyCount.textContent = `${100 - Math.round((y / rect.height) * 100)}%`;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  if (container.innerHTML.trim() === "") {
    Object.values(themeColors).forEach(color => {
      const cleanColor = color.replace(/['"]+/g, "");
      const swatch = document.createElement("div");
      swatch.className = "sc-border-colors sc-cursor-pointer";
      swatch.style.backgroundColor = cleanColor;
      swatch.style.width = "18px";
      swatch.style.height = "18px";
      swatch.style.borderRadius = "6px";
      swatch.title = cleanColor;
      swatch.onclick = () => {
        updateSelectorField(cleanColor);
        applyButtonBackgroundColor(color);
      };
      container.appendChild(swatch);
    });
  }

  selectorField.innerHTML = "";
  selectorField.appendChild(bullet);
  updateSelectorField(dynamicHue);
  setTimeout(() => {
    const initX = 0;
    const initY = selectorField.offsetHeight - bullet.offsetHeight;
    moveBullet(initX, initY);
  }, 0);
}
