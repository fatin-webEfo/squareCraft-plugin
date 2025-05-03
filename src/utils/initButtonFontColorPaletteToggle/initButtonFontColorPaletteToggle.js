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

  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hueToRgb(p, q, h + 1 / 3);
    const g = hueToRgb(p, q, h);
    const b = hueToRgb(p, q, h - 1 / 3);
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  }

  function getButtonTypeClass(el) {
    const classes = el.classList;
    if (classes.contains("sqs-button-element--primary")) return "primary";
    if (classes.contains("sqs-button-element--secondary")) return "secondary";
    if (classes.contains("sqs-button-element--tertiary")) return "tertiary";
    return null;
  }

  function applyButtonBackgroundColor(color) {
    if (!selectedElement) return;
    const blockId = selectedElement.id;
    const button = selectedElement.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!button) return;

    const type = getButtonTypeClass(button);
    if (!type) return;

    const styleId = `sc-style-${blockId}-${type}`;
    let styleTag = document.getElementById(styleId);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      #${blockId} a.sqs-button-element--${type} {
        background-color: ${color} !important;
        border-color: ${color} !important;
      }
      #${blockId} a.sqs-button-element--${type}:hover {
        background-color: ${color} !important;
        border-color: ${color} !important;
        filter: brightness(0.95);
      }
    `;

    button.dataset.scButtonBg = color;
    console.log(`✅ Applied ${type} button color in block ${blockId}:`, color);
  }

  function renderVerticalColorShades(baseColor) {
    selectorField.innerHTML = "";
    selectorField.appendChild(bullet);
    selectorField.style.background = `
      linear-gradient(to right, ${baseColor}, white),
      linear-gradient(to top, black, transparent)
    `;
    selectorField.style.backgroundBlendMode = "multiply";
    selectorField.style.backgroundSize = "100% 100%";
    selectorField.style.backgroundRepeat = "no-repeat";
  }

  function updateBulletColor(e) {
    const rect = selectorField.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;
    offsetX = Math.max(0, Math.min(rect.width - bullet.offsetWidth, offsetX));
    offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, offsetY));
    bullet.style.left = `${offsetX}px`;
    bullet.style.top = `${offsetY}px`;

    const percentX = offsetX / rect.width;
    const percentY = offsetY / rect.height;
    const lightness = 50 + percentX * 50;
    const darkness = 100 - percentY * 100;
    const finalLightness = Math.max(0, Math.min(100, (lightness * darkness) / 100));

    const rgb = hslToRgb(dynamicHue / 360, 1, finalLightness / 100);
    colorCode.textContent = rgb;
    applyButtonBackgroundColor(rgb);
  }

  function bindMouseMoveForBullet(el, moveFn) {
    el.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = moveFn;
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  function setupPalette() {
    allColorField.style.background = `linear-gradient(to bottom,
      hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
      hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%)
    )`;
    transparencyField.style.background = `linear-gradient(to bottom,
      hsla(0, 100%, 50%, 1), hsla(0, 100%, 50%, 0)
    )`;

    bindMouseMoveForBullet(allColorBullet, (e) => {
      const rect = allColorField.getBoundingClientRect();
      let offsetY = e.clientY - rect.top;
      offsetY = Math.max(0, Math.min(rect.height - allColorBullet.offsetHeight, offsetY));
      allColorBullet.style.top = `${offsetY}px`;

      const percentage = offsetY / rect.height;
      dynamicHue = Math.round(360 * percentage);
      const rgb = hslToRgb(dynamicHue / 360, 1, 0.5);

      colorCode.textContent = rgb;
      renderVerticalColorShades(rgb);
      transparencyField.style.background = `linear-gradient(to bottom,
        hsla(${dynamicHue}, 100%, 50%, 1), hsla(${dynamicHue}, 100%, 50%, 0)
      )`;
    });

    bindMouseMoveForBullet(bullet, updateBulletColor);
    bindMouseMoveForBullet(transparencyBullet, (e) => {
      const rect = transparencyField.getBoundingClientRect();
      let offsetY = e.clientY - rect.top;
      offsetY = Math.max(0, Math.min(rect.height - transparencyBullet.offsetHeight, offsetY));
      transparencyBullet.style.top = `${offsetY}px`;

      const transparencyPercent = 100 - Math.round((offsetY / rect.height) * 100);
      transparencyCount.textContent = `${transparencyPercent}%`;
    });
  }

  palette.classList.remove("sc-hidden");
  if (container.innerHTML.trim() === "") {
    Object.values(themeColors).forEach((color) => {
      const cleanColor = color.replace(/['"]+/g, "");
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
  }

  setupPalette();
  const firstColor = Object.values(themeColors)[0];
  if (firstColor) renderVerticalColorShades(firstColor);
}
