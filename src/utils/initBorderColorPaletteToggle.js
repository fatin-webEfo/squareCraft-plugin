export function initBorderColorPaletteToggle() {
    document.body.addEventListener("click", (e) => {
      const trigger = e.target.closest("#border-color-select");
      const palette = document.getElementById("color-palette");
  
      if (trigger && palette) {
        palette.classList.toggle("sc-hidden");
      }
    });
  }
  