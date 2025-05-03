export function initButtonFontColorPaletteToggle(themeColors) {
  let finalColor = null;
  let selectedElement = null;

  const getEl = (id) => document.getElementById(id);

  const palette = getEl("buttonFontColorPalate");
  const container = getEl("button-border-colors");
  const selectorField = getEl("button-color-selection-field");
  const bullet = getEl("button-color-selection-bar");
  const colorCode = getEl("button-color-code");
  const transparencyCount = getEl("button-color-transparency-count");
  const allColorField = getEl("button-all-color-selection-field");
  const allColorBullet = getEl("button-all-color-selection-bar");
  const transparencyField = getEl("button-color-transparency-field");
  const transparencyBullet = getEl("button-color-transparency-bar");

  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const hslToRgb = (h, s, l) => {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hueToRgb(p, q, h + 1 / 3);
    const g = hueToRgb(p, q, h);
    const b = hueToRgb(p, q, h - 1 / 3);
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  };

  const applyButtonBackgroundColor = (color) => {
    if (!selectedElement) {
      console.warn("\u26A0\uFE0F No block selected.");
      return;
    }

    const blockId = selectedElement.id;
    const button = selectedElement.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!button) {
      console.warn("\u26A0\uFE0F No supported button found in block.");
      return;
    }

    const typeClass = Array.from(button.classList).find(cls => cls.startsWith("sqs-button-element--"));
    const type = typeClass?.split("--")[1];
    const styleId = `sc-style-${blockId}-${type}`;

    let styleTag = getEl(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      #${blockId} .${typeClass} {
        background-color: ${color} !important;
        border-color: ${color} !important;
      }
      #${blockId} .${typeClass}:hover {
        background-color: ${color} !important;
        border-color: ${color} !important;
        filter: brightness(0.95);
      }
    `;

    button.dataset.scButtonBg = color;
    console.log(`\u2705 Overridden .${typeClass} with:`, color);
  };

  const renderVerticalColorShades = (baseColor) => {
    if (!selectorField) return;
    selectorField.innerHTML = "";
    selectorField.appendChild(bullet);
    selectorField.style.background = `
      linear-gradient(to right, ${baseColor}, white),
      linear-gradient(to top, black, transparent)`;
    selectorField.style.backgroundBlendMode = "multiply";
    selectorField.style.backgroundSize = "100% 100%";
    selectorField.style.backgroundRepeat = "no-repeat";
  };

  const bindDragHandler = (target, container, onDrag) => {
    target.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = (e) => onDrag(e, container);
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  };

  let dynamicHue = 0;

  bindDragHandler(allColorBullet, allColorField, (e, rectContainer) => {
    const rect = rectContainer.getBoundingClientRect();
    let offsetY = Math.max(0, Math.min(rect.height - allColorBullet.offsetHeight, e.clientY - rect.top));
    allColorBullet.style.top = `${offsetY}px`;
    dynamicHue = Math.round(360 * (offsetY / rect.height));
    const rgb = hslToRgb(dynamicHue / 360, 1, 0.5);
    if (colorCode) colorCode.textContent = rgb;
    renderVerticalColorShades(rgb);
    if (transparencyField) {
      transparencyField.style.background = `linear-gradient(to bottom, hsla(${dynamicHue}, 100%, 50%, 1), hsla(${dynamicHue}, 100%, 50%, 0))`;
    }
  });

  bindDragHandler(bullet, selectorField, (e, rectContainer) => {
    const rect = rectContainer.getBoundingClientRect();
    let offsetX = Math.max(0, Math.min(rect.width - bullet.offsetWidth, e.clientX - rect.left));
    let offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, e.clientY - rect.top));
    bullet.style.left = `${offsetX}px`;
    bullet.style.top = `${offsetY}px`;

    const lightness = 50 + (offsetX / rect.width) * 50;
    const darkness = 100 - (offsetY / rect.height) * 100;
    const finalLightness = Math.max(0, Math.min(100, (lightness * darkness) / 100));

    finalColor = hslToRgb(dynamicHue / 360, 1, finalLightness / 100);
    if (colorCode) colorCode.textContent = finalColor;
    applyButtonBackgroundColor(finalColor);
  });

  bindDragHandler(transparencyBullet, transparencyField, (e, rectContainer) => {
    const rect = rectContainer.getBoundingClientRect();
    let offsetY = Math.max(0, Math.min(rect.height - transparencyBullet.offsetHeight, e.clientY - rect.top));
    transparencyBullet.style.top = `${offsetY}px`;
    const transparencyPercent = 100 - Math.round((offsetY / rect.height) * 100);
    if (transparencyCount) transparencyCount.textContent = `${transparencyPercent}%`;
  });

  if (palette) palette.classList.toggle("sc-hidden");

  if (container.innerHTML.trim() === "") {
    Object.values(themeColors).forEach((color) => {
      const cleanColor = color.replace(/['"]+/g, '');
      const swatch = document.createElement("div");
      swatch.className = "sc-border-colors sc-cursor-pointer";
      swatch.style.cssText = `background-color: ${cleanColor}; width: 18px; height: 18px; border-radius: 6px;`;
      swatch.title = cleanColor;
      swatch.onclick = () => {
        renderVerticalColorShades(cleanColor);
        applyButtonBackgroundColor(cleanColor);
      };
      container.appendChild(swatch);
    });
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) renderVerticalColorShades(firstColor);
}
