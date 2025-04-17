export function initBorderColorPaletteToggle(themeColors) {
  const palette = document.getElementById("color-palette");
  const container = document.getElementById("border-colors");
  const selectorField = document.getElementById("color-selection-field");
  const colorCode = document.getElementById("color-code");
  const transparencyCount = document.getElementById("color-transparency-count");

  if (!palette || !container || !selectorField || !colorCode || !transparencyCount) return;

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

    const bullet = document.createElement("div");
    bullet.id = "color-selection-bar";
    bullet.className = "sc-w-2 sc-h-2 sc-absolute sc-left-0 sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white";
    selectorField.appendChild(bullet);

    const heights = [];
    const shades = [];

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

    selectorField.addEventListener("mousedown", (e) => {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onDrag);
      });
    });

    function onDrag(e) {
      const rect = selectorField.getBoundingClientRect();
      let offsetY = e.clientY - rect.top;
      offsetY = Math.max(0, Math.min(rect.height - 10, offsetY));
      const nearest = Math.round(offsetY / 10);
      updateBullet(nearest * 10, shades[nearest], 100 - nearest * 10);
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

    updateBullet(0, shades[0], 100); // default position at top
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) {
    renderVerticalColorShades(firstColor);
  }
}
