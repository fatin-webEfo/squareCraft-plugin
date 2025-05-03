export function initButtonFontColorPaletteToggle(themeColors) {
  let finalColor = null;
  let selectedElement = null;

  const get = (id) => document.getElementById(id);

  const palette = get("buttonFontColorPalate");
  const container = get("button-border-colors");
  const selectorField = get("button-color-selection-field");
  const bullet = get("button-color-selection-bar");
  const colorCode = get("button-color-code");
  const transparencyCount = get("button-color-transparency-count");
  const allColorField = get("button-all-color-selection-field");
  const allColorBullet = get("button-all-color-selection-bar");
  const transparencyField = get("button-color-transparency-field");
  const transparencyBullet = get("button-color-transparency-bar");

  if (
    !palette || !container || !selectorField || !bullet ||
    !colorCode || !transparencyCount || !allColorField ||
    !allColorBullet || !transparencyField || !transparencyBullet
  ) return;

  let dynamicHue = 0;

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
      console.warn("⚠️ No block selected.");
      return;
    }

    const blockId = selectedElement.id;
    const button = selectedElement.querySelector("a.sqs-button-element--tertiary");
    if (!button) {
      console.warn("⚠️ No .sqs-button-element--tertiary found in block.");
      return;
    }

    const styleId = `sc-style-${blockId}-tertiary`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      #${blockId} a.sqs-button-element--tertiary {
        background-color: ${color} !important;
        border-color: ${color} !important;
      }
      #${blockId} a.sqs-button-element--tertiary:hover {
        background-color: ${color} !important;
        border-color: ${color} !important;
        filter: brightness(0.95);
      }
    `;

    button.dataset.scButtonBg = color;
    console.log("✅ Overridden .sqs-button-element--tertiary with:", color);
  };

  const bindDrag = (target, container, moveFn) => {
    target.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = (evt) => moveFn(evt, container);
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  };

  const renderVerticalColorShades = (baseColor) => {
    selectorField.innerHTML = "";
    selectorField.appendChild(bullet);
    selectorField.style.background = `
      linear-gradient(to right, ${baseColor}, white),
      linear-gradient(to top, black, transparent)`;
    selectorField.style.backgroundBlendMode = "multiply";
    selectorField.style.backgroundSize = "100% 100%";
    selectorField.style.backgroundRepeat = "no-repeat";
  };

  allColorField.style.background = `linear-gradient(to bottom, 
    hsl(0, 100%, 50%), 
    hsl(60, 100%, 50%), 
    hsl(120, 100%, 50%), 
    hsl(180, 100%, 50%), 
    hsl(240, 100%, 50%), 
    hsl(300, 100%, 50%), 
    hsl(360, 100%, 50%)
  )`;

  transparencyField.style.background = `linear-gradient(to bottom, 
    hsla(0, 100%, 50%, 1), 
    hsla(0, 100%, 50%, 0)
  )`;

  bindDrag(allColorBullet, allColorField, (e, field) => {
    const rect = field.getBoundingClientRect();
    const offsetY = Math.max(0, Math.min(rect.height - allColorBullet.offsetHeight, e.clientY - rect.top));
    allColorBullet.style.top = `${offsetY}px`;
    dynamicHue = Math.round(360 * (offsetY / rect.height));
    const rgb = hslToRgb(dynamicHue / 360, 1, 0.5);
    colorCode.textContent = rgb;
    renderVerticalColorShades(rgb);
    transparencyField.style.background = `linear-gradient(to bottom, hsla(${dynamicHue}, 100%, 50%, 1), hsla(${dynamicHue}, 100%, 50%, 0))`;
  });

  bindDrag(bullet, selectorField, (e, field) => {
    const rect = field.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(rect.width - bullet.offsetWidth, e.clientX - rect.left));
    const offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, e.clientY - rect.top));
    bullet.style.left = `${offsetX}px`;
    bullet.style.top = `${offsetY}px`;
    const lightness = 50 + (offsetX / rect.width) * 50;
    const darkness = 100 - (offsetY / rect.height) * 100;
    const finalLightness = Math.max(0, Math.min(100, (lightness * darkness) / 100));
    finalColor = hslToRgb(dynamicHue / 360, 1, finalLightness / 100);
    colorCode.textContent = finalColor;
    applyButtonBackgroundColor(finalColor);
  });

  bindDrag(transparencyBullet, transparencyField, (e, field) => {
    const rect = field.getBoundingClientRect();
    const offsetY = Math.max(0, Math.min(rect.height - transparencyBullet.offsetHeight, e.clientY - rect.top));
    transparencyBullet.style.top = `${offsetY}px`;
    const transparencyPercent = 100 - Math.round((offsetY / rect.height) * 100);
    transparencyCount.textContent = `${transparencyPercent}%`;
  });

  palette.classList.toggle("sc-hidden");

  if (container.innerHTML.trim() === "") {
    Object.values(themeColors).forEach((color) => {
      const clean = color.replace(/['"]+/g, "");
      const swatch = document.createElement("div");
      swatch.className = "sc-border-colors sc-cursor-pointer";
      swatch.style.cssText = `background-color: ${clean}; width: 18px; height: 18px; border-radius: 6px;`;
      swatch.title = clean;
      swatch.onclick = () => {
        renderVerticalColorShades(clean);
        applyButtonBackgroundColor(clean);
      };
      container.appendChild(swatch);
    });
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) renderVerticalColorShades(firstColor);
}
