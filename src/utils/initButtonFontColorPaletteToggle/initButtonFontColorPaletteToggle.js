export function initButtonFontColorPaletteToggle(themeColors,selectedElement) {
  const palette = document.getElementById("buttonFontColorPalate");
  const container = document.getElementById("button-border-colors");
  const selectorField = document.getElementById("button-color-selection-field");
  const bullet = document.getElementById("button-color-selection-bar");
  const colorCode = document.getElementById("button-color-code");
  const transparencyCount = document.getElementById(
    "button-color-transparency-count"
  );
  const allColorField = document.getElementById(
    "button-all-color-selection-field"
  );
  const allColorBullet = document.getElementById(
    "button-all-color-selection-bar"
  );
  const transparencyField = document.getElementById(
    "button-color-transparency-field"
  );
  const transparencyBullet = document.getElementById(
    "button-color-transparency-bar"
  );
console.log("Selected Element:", selectedElement);
  function applyButtonBackgroundColor(color) {
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
  }
  
  
  
  
  

  if (
    !palette ||
    !container ||
    !selectorField ||
    !bullet ||
    !colorCode ||
    !transparencyCount
  )
    return;

  let dynamicHue = 0;

  if (allColorField) {
    allColorField.style.background = `linear-gradient(to bottom, 
      hsl(0, 100%, 50%), 
      hsl(60, 100%, 50%), 
      hsl(120, 100%, 50%), 
      hsl(180, 100%, 50%), 
      hsl(240, 100%, 50%), 
      hsl(300, 100%, 50%), 
      hsl(360, 100%, 50%)
    )`;
  }

  if (transparencyField) {
    transparencyField.style.background = `linear-gradient(to bottom, 
      hsla(0, 100%, 50%, 1), 
      hsla(0, 100%, 50%, 0)
    )`;
  }

  if (
    allColorField &&
    allColorBullet &&
    transparencyField &&
    selectorField &&
    bullet
  ) {
    allColorBullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = allColorField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(
          0,
          Math.min(rect.height - allColorBullet.offsetHeight, offsetY)
        );
        allColorBullet.style.top = `${offsetY}px`;

        const percentage = offsetY / rect.height;
        dynamicHue = Math.round(360 * percentage);

        const h = dynamicHue / 360;
        const l = 0.5;
        const s = 1;

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
        const finalColor = `rgb(${Math.round(r * 255)}, ${Math.round(
          g * 255
        )}, ${Math.round(b * 255)})`;

        if (colorCode) {
          colorCode.textContent = finalColor;
        }

        if (transparencyField) {
          transparencyField.style.background = `linear-gradient(to bottom, 
            hsla(${dynamicHue}, 100%, 50%, 1), 
            hsla(${dynamicHue}, 100%, 50%, 0)
          )`;
        }

        if (selectorField) {
          selectorField.innerHTML = "";
          selectorField.appendChild(bullet);
          selectorField.style.background = `
            linear-gradient(to right, hsl(${dynamicHue}, 100%, 50%), white),
            linear-gradient(to top, black, transparent)
          `;
          selectorField.style.backgroundBlendMode = "multiply";
          selectorField.style.backgroundSize = "100% 100%";
          selectorField.style.backgroundRepeat = "no-repeat";
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  if (selectorField && bullet) {
    bullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = selectorField.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let offsetY = e.clientY - rect.top;
        offsetX = Math.max(
          0,
          Math.min(rect.width - bullet.offsetWidth, offsetX)
        );
        offsetY = Math.max(
          0,
          Math.min(rect.height - bullet.offsetHeight, offsetY)
        );
        bullet.style.left = `${offsetX}px`;
        bullet.style.top = `${offsetY}px`;

        const percentX = offsetX / rect.width;
        const percentY = offsetY / rect.height;
        const lightness = 50 + percentX * 50;
        const darkness = 100 - percentY * 100;
        const finalLightness = Math.max(
          0,
          Math.min(100, (lightness * darkness) / 100)
        );

        const h = dynamicHue / 360;
        const s = 1;
        const l = finalLightness / 100;

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
        const finalColor = `rgb(${Math.round(r * 255)}, ${Math.round(
          g * 255
        )}, ${Math.round(b * 255)})`;

        if (colorCode) {
          colorCode.textContent = finalColor;
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      applyButtonBackgroundColor(finalColor);

    };
  }

  if (transparencyField && transparencyBullet) {
    transparencyBullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = transparencyField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(
          0,
          Math.min(rect.height - transparencyBullet.offsetHeight, offsetY)
        );
        transparencyBullet.style.top = `${offsetY}px`;

        const transparencyPercent =
          100 - Math.round((offsetY / rect.height) * 100);
        if (transparencyCount) {
          transparencyCount.textContent = `${transparencyPercent}%`;
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  palette.classList.toggle("sc-hidden");

  if (container.innerHTML.trim() !== "") return;

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
      applyButtonBackgroundColor(color);

    });
  
    container.appendChild(swatch);
  });
  

  function renderVerticalColorShades(baseColor) {
    if (!selectorField) return;
  
    selectorField.innerHTML = "";
    selectorField.appendChild(bullet);
    selectorField.style.background = `
      linear-gradient(to right, ${baseColor}, white),
      linear-gradient(to top, black, transparent)
    `;
    selectorField.style.backgroundBlendMode = "multiply";
    selectorField.style.backgroundSize = "100% 100%";
    selectorField.style.backgroundRepeat = "no-repeat";
  
    bullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
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
  
        const h = dynamicHue / 360;
        const s = 1;
        const l = finalLightness / 100;
  
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
        const finalColor = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  
        if (colorCode) {
          colorCode.textContent = finalColor;
        }
  
        applyButtonBackgroundColor(finalColor);
      };
  
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
  

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) {
    renderVerticalColorShades(firstColor);
  }
}
