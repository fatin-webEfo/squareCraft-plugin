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

  if (allColorField && allColorBullet && transparencyField && selectorField && bullet) {
    allColorBullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = allColorField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(0, Math.min(rect.height - allColorBullet.offsetHeight, offsetY));
        allColorBullet.style.top = `${offsetY}px`;
  
        const percentage = offsetY / rect.height;
        dynamicHue = Math.round(360 * percentage);
  
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
            linear-gradient(
              to right,
              hsl(${dynamicHue}, 100%, 50%),
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
        }
        
                    
        
      };
      document.onmouseup = function () {
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
  
        offsetX = Math.max(0, Math.min(rect.width - bullet.offsetWidth, offsetX));
        offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, offsetY));
  
        bullet.style.left = `${offsetX}px`;
        bullet.style.top = `${offsetY}px`;
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
