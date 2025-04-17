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
      renderVerticalColorPalette(color);
    });

    container.appendChild(swatch);
  });

  function renderVerticalColorPalette(baseColor) {
    selectorField.style.background = `linear-gradient(to bottom, white, ${baseColor}, black)`;
    selectorField.appendChild(bullet);
    updateColorByPosition(0);

    function updateColorByPosition(offsetY) {
      const rect = selectorField.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, offsetY / rect.height));
      const lightness = 100 - (percent * 100);
      const hsl = baseColor.match(/\d+/g);
      const h = hsl ? hsl[0] : 0;
      const s = hsl ? hsl[1] : 100;

      const finalColor = `hsl(${h}, ${s}%, ${lightness}%)`;
      bullet.style.top = `${offsetY}px`;
      colorCode.textContent = finalColor;
      transparencyCount.textContent = `${Math.round(lightness)}%`;

      const selectedBlock = document.querySelector(".sc-selected [id^='block-']");
      if (selectedBlock) {
        const image = selectedBlock.querySelector("img");
        if (image) {
          image.style.borderColor = finalColor;
        }
      }
    }

    function startDragging(e) {
      e.preventDefault();
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('touchmove', onDrag);
      document.addEventListener('touchend', stopDragging);
    }

    function onDrag(e) {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = selectorField.getBoundingClientRect();
      let offsetY = clientY - rect.top;
      offsetY = Math.max(0, Math.min(rect.height, offsetY));
      updateColorByPosition(offsetY);
    }

    function stopDragging() {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDragging);
    }

    bullet.onmousedown = startDragging;
    bullet.ontouchstart = startDragging;
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) {
    renderVerticalColorPalette(firstColor);
  }
}
