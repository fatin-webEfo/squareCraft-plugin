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
        swatch.className = "sc-border-colors sc-hidden sc-cursor-pointer";
        swatch.style.backgroundColor = color;
        swatch.style.width = "15px";
        swatch.style.height = "15px";
        swatch.style.borderRadius = "6px";
        swatch.style.border = "1px solid white";
        swatch.title = color;
        container.appendChild(swatch);
      });
    }
  }
  