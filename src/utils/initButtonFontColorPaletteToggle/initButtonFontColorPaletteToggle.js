export function initButtonFontColorPaletteToggle(themeColors, selectedElement) {
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

  if (!palette || !container || !selectorField || !bullet || !colorCode || !transparencyCount) return;

  let dynamicHue = 0;

  function hslToRgb(h, s, l) {
    function hueToRgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hueToRgb(p, q, h + 1 / 3);
    const g = hueToRgb(p, q, h);
    const b = hueToRgb(p, q, h - 1 / 3);
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  }

  function applyButtonBackgroundColor(color) {
    if (!selectedElement) return;
    const blockId = selectedElement.id;
    const button = selectedElement.querySelector("a.sqs-button-element--tertiary");
    if (!button) return;

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
    console.log("✅ Applied button tertiary color:", color);
  }

  function renderVerticalColorShades(baseColor) {
    selectorField.innerHTML = "";
    selectorField.appendChild(bullet);
    selectorField.style.background = `
      linear-gradient(to right, ${baseColor}, white),
      linear-gradient(to top, black, transparent)`;
    selectorField.style.backgroundBlendMode = "multiply";
    selectorField.style.backgroundSize = "100% 100%";
    selectorField.style.backgroundRepeat = "no-repeat";

    bullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = selectorField.getBoundingClientRect();
        let offsetX = Math.max(0, Math.min(rect.width - bullet.offsetWidth, e.clientX - rect.left));
        let offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, e.clientY - rect.top));
        bullet.style.left = `${offsetX}px`;
        bullet.style.top = `${offsetY}px`;

        const lightness = Math.max(0, Math.min(100, (50 + offsetX / rect.width * 50) * (1 - offsetY / rect.height)));
        const finalColor = hslToRgb(dynamicHue / 360, 1, lightness / 100);
        colorCode.textContent = finalColor;
        applyButtonBackgroundColor(finalColor);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  allColorBullet.onmousedown = function (e) {
    e.preventDefault();
    document.onmousemove = function (e) {
      const rect = allColorField.getBoundingClientRect();
      let offsetY = Math.max(0, Math.min(rect.height - allColorBullet.offsetHeight, e.clientY - rect.top));
      allColorBullet.style.top = `${offsetY}px`;
      dynamicHue = Math.round((offsetY / rect.height) * 360);
      renderVerticalColorShades(`hsl(${dynamicHue}, 100%, 50%)`);
      transparencyField.style.background = `linear-gradient(to bottom, hsla(${dynamicHue}, 100%, 50%, 1), hsla(${dynamicHue}, 100%, 50%, 0))`;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  transparencyBullet.onmousedown = function (e) {
    e.preventDefault();
    document.onmousemove = function (e) {
      const rect = transparencyField.getBoundingClientRect();
      let offsetY = Math.max(0, Math.min(rect.height - transparencyBullet.offsetHeight, e.clientY - rect.top));
      transparencyBullet.style.top = `${offsetY}px`;
      transparencyCount.textContent = `${100 - Math.round((offsetY / rect.height) * 100)}%`;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  Object.values(themeColors).forEach((color) => {
    const cleanColor = color.replace(/['"]+/g, '');
    const swatch = document.createElement("div");
    swatch.className = "sc-border-colors sc-cursor-pointer";
    swatch.style.backgroundColor = cleanColor;
    swatch.style.width = "18px";
    swatch.style.height = "18px";
    swatch.style.borderRadius = "6px";
    swatch.title = cleanColor;

    swatch.addEventListener("click", () => {
      renderVerticalColorShades(cleanColor);
      applyButtonBackgroundColor(cleanColor);
    });

    container.appendChild(swatch);
  });

  palette.classList.toggle("sc-hidden");

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) renderVerticalColorShades(firstColor);
}
