export function initBorderColorPaletteToggle(themeColors) {
    document.body.addEventListener("click", (e) => {
      const trigger = e.target.closest("#border-color-select");
      const palette = document.getElementById("color-palette");
      const container = document.getElementById("border-colors");
  
      if (trigger && palette) {
        palette.classList.toggle("sc-hidden");
  
        if (container && container.innerHTML.trim() === "") {
          Object.values(themeColors).forEach(color => {
            const swatch = document.createElement("div");
            swatch.className = "sc-square-6 sc-border-colors sc-cursor-pointer";
            swatch.style.backgroundColor = color;
            container.appendChild(swatch);
          });
        }
      }
    });
  }
  