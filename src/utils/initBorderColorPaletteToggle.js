export function initBorderColorPaletteToggle(themeColors) {
  const palette = document.getElementById("color-palette");
  const container = document.getElementById("border-colors");
  const selectorField = document.getElementById("color-selection-field");
  const bullet = document.getElementById("color-selection-bar");
  const colorCode = document.getElementById("color-code");
  const transparencyCount = document.getElementById("color-transparency-count");

  if (!palette || !container || !selectorField || !bullet || !colorCode || !transparencyCount) return;

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
    const heights = [];
    const shades = [];

    selectorField.innerHTML = ""; // Clear previous shades (keep bullet outside for now)
    selectorField.appendChild(bullet); // Append bullet back

    for (let i = 0; i <= 10; i++) {
      const transparency = 100 - i * 10;
      const hslaColor = baseColor
        .replace("hsl", "hsla")
        .replace(")", `, ${transparency / 100})`);

      const bar = document.createElement("div");
      bar.style.backgroundColor = hslaColor;
      bar.style.width = "100%";
      bar.style.height = "10px";

      const topPosition = i * 10;
      heights.push(topPosition);
      shades.push(hslaColor);

      bar.addEventListener("click", () => {
        updateBullet(topPosition, hslaColor, transparency);
      });

      selectorField.appendChild(bar);
    }

    selectorField.style.position = "relative";

    bullet.onmousedown = function(e) {
      e.preventDefault();
      document.onmousemove = function(e) {
        const rect = selectorField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, offsetY));
        bullet.style.top = `${offsetY}px`;

        const percent = Math.round(100 - (offsetY / rect.height) * 100);
        const nearest = Math.round(offsetY / 10);
        updateBullet(nearest * 10, shades[nearest], percent);
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    updateBullet(0, shades[0], 100); // Default initial
  }

  function updateBullet(top, color, percent) {
    bullet.style.top = `${top}px`;
    colorCode.textContent = color;
    transparencyCount.textContent = `${percent}%`;

    const selectedBlock = document.querySelector(".sc-selected [id^='block-']");
    if (selectedBlock) {
      const image = selectedBlock.querySelector("img");
      if (image) {
        image.style.borderColor = color;
      }
    }
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) {
    renderVerticalColorShades(firstColor);
  }
}
