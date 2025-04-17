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
    selectorField.innerHTML = "";
    selectorField.appendChild(bullet);

    const gradient = document.createElement("div");
    gradient.style.width = "100%";
    gradient.style.height = "100%";
    gradient.style.background = `linear-gradient(to bottom, hsla(0, 0%, 100%, 1), ${baseColor}, hsla(0, 0%, 0%, 1))`;
    gradient.style.borderRadius = "6px";
    gradient.style.position = "absolute";
    gradient.style.top = "0";
    gradient.style.left = "0";
    selectorField.appendChild(gradient);

    selectorField.style.position = "relative";

    bullet.onmousedown = function (e) {
      e.preventDefault();

      document.onmousemove = function (e) {
        const rect = selectorField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, offsetY));

        bullet.style.top = `${offsetY}px`;

        const percent = Math.round(100 - (offsetY / rect.height) * 100);
        updateBullet(offsetY, baseColor, percent);
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    updateBullet(0, baseColor, 100);
  }

  function updateBullet(top, baseColor, percent) {
    bullet.style.top = `${top}px`;

    const finalColor = baseColor
      .replace("hsl", "hsla")
      .replace(")", `, ${percent / 100})`);

    colorCode.textContent = finalColor;
    transparencyCount.textContent = `${percent}%`;

    const selectedBlock = document.querySelector(".sc-selected [id^='block-']");
    if (selectedBlock) {
      const image = selectedBlock.querySelector("img");
      if (image) {
        image.style.borderColor = finalColor;
      }
    }
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) {
    renderVerticalColorShades(firstColor);
  }
}
