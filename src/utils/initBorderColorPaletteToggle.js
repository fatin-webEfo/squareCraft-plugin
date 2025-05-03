export function initBorderColorPaletteToggle(themeColors) {
  const palette = document.getElementById("color-palette");
  const container = document.getElementById("border-colors");
  const selectorField = document.getElementById("color-selection-field");
  const bullet = document.getElementById("color-selection-bar");
  const colorCode = document.getElementById("color-code");
  const transparencyCount = document.getElementById("color-transparency-count");
  const allColorField = document.getElementById("all-color-selction-field");
  const allColorBullet = document.getElementById("all-color-selction-bar");
  const transparencyField = document.getElementById("color-transparency-field");
  const transparencyBullet = document.getElementById("color-transparency-bar");

  if (!palette || !container || !selectorField || !bullet || !colorCode || !transparencyCount) return;

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

  let currentButtonTypeClass = null;

document.body.addEventListener("click", (e) => {
  const btn = e.target.closest(
    "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
  );
  if (btn) {
    if (btn.classList.contains("sqs-button-element--primary")) {
      currentButtonTypeClass = "sqs-button-element--primary";
    } else if (btn.classList.contains("sqs-button-element--secondary")) {
      currentButtonTypeClass = "sqs-button-element--secondary";
    } else if (btn.classList.contains("sqs-button-element--tertiary")) {
      currentButtonTypeClass = "sqs-button-element--tertiary";
    }
  }
});

  function updateButtonStyleByType(buttonTypeClass, color) {
    if (!buttonTypeClass || !color) return;
  
    const styleId = `sc-style-${buttonTypeClass}`;
    let styleTag = document.getElementById(styleId);
  
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
  
    let selector = "";
    if (buttonTypeClass === "sqs-button-element--primary") {
      selector = `
        .primary-button-style-solid .sqs-button-element--primary,
        .primary-button-style-solid .tock-block div#Tock_widget_container > div.TockWidgetWrapper .TockButton-blue.sqs-button-element--primary`;
    } else if (buttonTypeClass === "sqs-button-element--secondary") {
      selector = `
        .secondary-button-style-solid .sqs-button-element--secondary,
        .secondary-button-style-solid .tock-block div#Tock_widget_container > div.TockWidgetWrapper .TockButton-blue.sqs-button-element--secondary`;
    } else if (buttonTypeClass === "sqs-button-element--tertiary") {
      selector = `
        .tertiary-button-style-solid .sqs-button-element--tertiary,
        .tertiary-button-style-solid .tock-block div#Tock_widget_container > div.TockWidgetWrapper .TockButton-blue.sqs-button-element--tertiary`;
    }
  
    styleTag.innerHTML = `
      ${selector} {
        background: ${color} !important;
        border-color: ${color} !important;
        color: white !important;
        z-index: 9999 !important;
        position: relative !important;
      }
    `;
  }
  
  if (allColorField && allColorBullet && transparencyField && selectorField && bullet) {
    bullet.onmousedown = function (e) {
      e.preventDefault();
      let finalColor = null;
    
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
    
        let r, g, b;
        if (s === 0) {
          r = g = b = l;
        } else {
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hueToRgb(p, q, h + 1 / 3);
          g = hueToRgb(p, q, h);
          b = hueToRgb(p, q, h - 1 / 3);
        }
    
        finalColor = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
        console.log("Final color is", finalColor);
    
        if (colorCode) {
          colorCode.textContent = finalColor;
          if (currentButtonTypeClass) {
            updateButtonStyleByType(currentButtonTypeClass, finalColor);
          }
        }
        
      };
    
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
    
  }


  if (transparencyField && transparencyBullet) {
    transparencyBullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = transparencyField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(0, Math.min(rect.height - transparencyBullet.offsetHeight, offsetY));
        transparencyBullet.style.top = `${offsetY}px`;

        const transparencyPercent = 100 - Math.round((offsetY / rect.height) * 100);

        if (transparencyCount) {
          transparencyCount.textContent = `${transparencyPercent}%`;
        }
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  palette.classList.toggle("sc-hidden");

  if (container.innerHTML.trim() !== "") return;

  Object.values(themeColors).forEach(color => {
    const swatch = document.createElement("div");
    swatch.className = "sc-border-colors sc-cursor-pointer";
    swatch.style.backgroundColor = color;
    swatch.style.width = "18px";
    swatch.style.height = "18px";
    swatch.style.borderRadius = "6px";
    swatch.title = color;

    swatch.addEventListener("click", () => {
      renderVerticalColorShades(color);
    });

    container.appendChild(swatch);
  });

  function renderVerticalColorShades(baseColor) {
    if (!selectorField) return;

    selectorField.innerHTML = "";
    selectorField.appendChild(bullet);

    selectorField.style.background = `
      linear-gradient(
        to right,
        ${baseColor},
        white
      ),
      linear-gradient(
        to top,
        black,
        transparent
      )
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
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        }
        
        let r, g, b;
        if (s === 0) {
          r = g = b = l;
        } else {
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hueToRgb(p, q, h + 1/3);
          g = hueToRgb(p, q, h);
          b = hueToRgb(p, q, h - 1/3);
        }
        
        const finalColor = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
        console.log("Final color is",finalColor);
        

        if (colorCode) {
          colorCode.textContent = finalColor;
          if (currentButtonTypeClass) {
            updateButtonStyleByType(currentButtonTypeClass, finalColor);
          }
        }
        
      };
      document.onmouseup = function () {
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
