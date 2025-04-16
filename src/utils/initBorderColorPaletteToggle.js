export function initBorderColorPaletteToggle(themeColors) {
    const palette = document.getElementById("color-palette");
    const container = document.getElementById("border-colors");
  
    if (!palette || !container) return;
  
    palette.classList.toggle("sc-hidden");
  
    if (container.innerHTML.trim() === "") {
      Object.values(themeColors).forEach(color => {
        console.log("Colors are",color);
        const swatch = document.createElement("div");
        swatch.className = "sc-square-6 sc-border-colors sc-cursor-pointer";
        swatch.style.backgroundColor = color;
        container.appendChild(swatch);
      });
    }
  }
  