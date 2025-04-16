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
    bullet.className = "sc-w-2 sc-h-2 sc-absolute sc-top-3 sc-left-0 sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white";
    selectorField.appendChild(bullet);

    for (let i = 0; i <= 10; i++) {
      const transparency = 100 - i * 10;
      const shade = baseColor
        .replace("hsl", "hsla")
        .replace(")", `, ${transparency / 100})`);

      const bar = document.createElement("div");
      bar.style.backgroundColor = shade;
      bar.style.width = "100%";
      bar.style.height = "10px";

      bar.addEventListener("click", () => {
        bullet.style.top = `${i * 10}px`;
        colorCode.textContent = shade;
        transparencyCount.textContent = `${transparency}%`;

        const selectedBlock = document.querySelector(".sc-selected [id^='block-']");
        if (selectedBlock) {
          const image = selectedBlock.querySelector("img");
          if (image) {
            image.style.borderColor = shade;
          }
        }
      });

      selectorField.appendChild(bar);
    }

    selectorField.style.position = "relative";
  }
}
