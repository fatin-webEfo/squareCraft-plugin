export function initBorderColorPaletteToggle(themeColors) {
  const palette = document.getElementById("color-palette");
  const container = document.getElementById("border-colors");
  const selectorContainer = document.getElementById("color-selection");

  if (!palette || !container || !selectorContainer) return;

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
      renderVerticalColorShades(color, selectorContainer);
    });

    container.appendChild(swatch);
  });
}

function renderVerticalColorShades(baseColor, container) {
  if (!container) return;
  container.innerHTML = ""; 

  const indicator = document.createElement("div");
  indicator.id = "color-indicator";
  indicator.className = "sc-w-2 sc-h-2 sc-absolute sc-top-3 sc-left-0 sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white";
  container.appendChild(indicator);

  for (let i = 0; i <= 10; i++) {
    const percentage = 100 - i * 10;
    const shade = baseColor.replace("hsl", "hsla").replace(")", `, ${percentage / 100})`);

    const segment = document.createElement("div");
    segment.style.backgroundColor = shade;
    segment.style.width = "100%";
    segment.style.height = "8px";

    segment.addEventListener("click", () => {
      indicator.style.top = `${i * 8}px`;
    });

    container.appendChild(segment);
  }
}
