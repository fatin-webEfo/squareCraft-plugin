export function initBorderColorPaletteToggle(themeColors) {
  const palette = document.getElementById("color-palette");
  const container = document.getElementById("border-colors");
  const selectorField = document.getElementById("color-selection-field");
  const colorCode = document.getElementById("color-code");
  const transparencyField = document.getElementById("color-transparency-field");
  const transparencyBar = document.getElementById("color-transparency-bar");
  const transparencyCount = document.getElementById("color-transparency-count");

  if (!palette || !container || !selectorField || !colorCode || !transparencyField || !transparencyBar || !transparencyCount) return;

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
      renderColorPalette(color);
    });

    container.appendChild(swatch);
  });

  function renderColorPalette(baseColor) {
    selectorField.innerHTML = "";

    const gradient = document.createElement("div");
    gradient.style.width = "100%";
    gradient.style.height = "100%";
    gradient.style.background = `linear-gradient(to bottom, ${baseColor} 0%, rgba(255,255,255,0) 100%)`;
    gradient.style.borderRadius = "6px";
    gradient.style.position = "absolute";
    gradient.style.top = "0";
    gradient.style.left = "0";
    selectorField.appendChild(gradient);

    const bullet = document.createElement("div");
    bullet.id = "color-selection-bar";
    bullet.className = "sc-w-2 sc-h-2 sc-absolute sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white";
    bullet.style.top = "0px";
    bullet.style.left = "0px";
    selectorField.appendChild(bullet);

    initColorDrag(selectorField, bullet, baseColor);
  }

  function initColorDrag(field, bullet, baseColor) {
    bullet.onmousedown = function(e) {
      e.preventDefault();
      document.onmousemove = function(e) {
        const rect = field.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        x = Math.max(0, Math.min(rect.width - bullet.offsetWidth, x));
        y = Math.max(0, Math.min(rect.height - bullet.offsetHeight, y));

        bullet.style.left = `${x}px`;
        bullet.style.top = `${y}px`;

        const percent = Math.round((1 - (y / rect.height)) * 100);
        const hslaColor = baseColor.replace('hsl', 'hsla').replace(')', `, ${percent / 100})`);
        
        colorCode.textContent = hslaColor;
        transparencyCount.textContent = `${percent}%`;
      };

      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  initTransparencyDrag();
  
  function initTransparencyDrag() {
    transparencyBar.onmousedown = function(e) {
      e.preventDefault();
      document.onmousemove = function(e) {
        const rect = transparencyField.getBoundingClientRect();
        let y = e.clientY - rect.top;

        y = Math.max(0, Math.min(rect.height - transparencyBar.offsetHeight, y));
        transparencyBar.style.top = `${y}px`;

        const percent = Math.round((1 - (y / rect.height)) * 100);
        transparencyCount.textContent = `${percent}%`;
      };

      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
}
