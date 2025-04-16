export function initBorderColorPaletteToggle(themeColors) {
    const palette = document.getElementById("color-palette");
    const container = document.getElementById("border-colors");
  
    if (!palette || !container) return;
  
    if (palette.classList.contains("sc-hidden")) {
      palette.classList.remove("sc-hidden");
    } else {
      palette.classList.add("sc-hidden");
    }
  
    if (container.innerHTML.trim() === "") {
      Object.values(themeColors).forEach(color => {
        const swatch = document.createElement("div");
        swatch.className = "sc-border-colors sc-cursor-pointer";
        swatch.style.backgroundColor = color;
        swatch.style.width = "16px";
        swatch.style.height = "16px";
        swatch.style.borderRadius = "6px";
        swatch.title = color;
        container.appendChild(swatch);
      });
    }
  }
  