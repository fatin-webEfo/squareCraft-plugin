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

  if (!palette || !container || !selectorField || !bullet || !colorCode || !transparencyCount) return;

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

  const bindDrag = (el, container, onDrag) => {
    if (!el || !container || typeof onDrag !== 'function') return;
    el.onmousedown = (e) => {
      e.preventDefault();
      document.onmousemove = (ev) => onDrag(ev, container);
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  };

  const applyButtonBackgroundColor = (color) => {
    if (!selectedElement) {
      console.warn("\u26A0\uFE0F No block selected.");
      return;
    }
    const blockId = selectedElement.id;
    const button = selectedElement.querySelector("a.sqs-button-element--tertiary");
    if (!button) {
      console.warn("\u26A0\uFE0F No .sqs-button-element--tertiary found in block.");
      return;
    }
    const styleId = `sc-style-${blockId}-tertiary`;
    let styleTag = get(styleId);
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
    console.log("\u2705 Overridden .sqs-button-element--tertiary with:", color);
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

  let dynamicHue = 0;

  bindDrag(allColorBullet, allColorField, (e, box) => {
    const r = box.getBoundingClientRect();
    const offsetY = Math.min(r.height - allColorBullet.offsetHeight, Math.max(0, e.clientY - r.top));
    allColorBullet.style.top = `${offsetY}px`;
    dynamicHue = Math.round(360 * (offsetY / r.height));
    const rgb = hslToRgb(dynamicHue / 360, 1, 0.5);
    colorCode.textContent = rgb;
    renderVerticalColorShades(rgb);
    transparencyField.style.background = `linear-gradient(to bottom, hsla(${dynamicHue}, 100%, 50%, 1), hsla(${dynamicHue}, 100%, 50%, 0))`;
  });

  bindDrag(bullet, selectorField, (e, box) => {
    const r = box.getBoundingClientRect();
    const offsetX = Math.min(r.width - bullet.offsetWidth, Math.max(0, e.clientX - r.left));
    const offsetY = Math.min(r.height - bullet.offsetHeight, Math.max(0, e.clientY - r.top));
    bullet.style.left = `${offsetX}px`;
    bullet.style.top = `${offsetY}px`;
    const light = 50 + (offsetX / r.width) * 50;
    const dark = 100 - (offsetY / r.height) * 100;
    const l = Math.max(0, Math.min(100, (light * dark) / 100)) / 100;
    finalColor = hslToRgb(dynamicHue / 360, 1, l);
    colorCode.textContent = finalColor;
    applyButtonBackgroundColor(finalColor);
  });

  bindDrag(transparencyBullet, transparencyField, (e, box) => {
    const r = box.getBoundingClientRect();
    const offsetY = Math.min(r.height - transparencyBullet.offsetHeight, Math.max(0, e.clientY - r.top));
    transparencyBullet.style.top = `${offsetY}px`;
    const t = 100 - Math.round((offsetY / r.height) * 100);
    transparencyCount.textContent = `${t}%`;
  });

  palette.classList.toggle("sc-hidden");

  if (container.innerHTML.trim() === "") {
    Object.values(themeColors).forEach((color) => {
      const cleanColor = color.replace(/['"]+/g, "");
      const swatch = document.createElement("div");
      swatch.className = "sc-border-colors sc-cursor-pointer";
      swatch.style.cssText = `background-color: ${cleanColor}; width: 18px; height: 18px; border-radius: 6px;`;
      swatch.title = cleanColor;
      swatch.addEventListener("click", () => {
        renderVerticalColorShades(cleanColor);
        applyButtonBackgroundColor(color);
      });
      container.appendChild(swatch);
    });
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) renderVerticalColorShades(firstColor);
}
