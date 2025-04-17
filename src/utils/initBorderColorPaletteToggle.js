export function initBorderColorPaletteToggle(themeColors) {
  const palette = document.getElementById("color-palette");
  const container = document.getElementById("border-colors");
  const selectorField = document.getElementById("color-selection-field");
  const bullet = document.getElementById("color-selection-bar");
  const colorCode = document.getElementById("color-code");
  const transparencyCount = document.getElementById("color-transparency-count");
  const allColorField = document.getElementById("all-color-selction-field");
  const allColorBullet = document.getElementById("all-color-selction-bar");

  if (!palette || !container || !selectorField || !bullet || !colorCode || !transparencyCount) return;

  if (allColorField) {
    allColorField.style.background = `linear-gradient(to bottom, 
      hsl(0, 100%, 50%), 
      hsl(60, 100%, 50%), 
      hsl(120, 100%, 50%), 
      hsl(180, 100%, 50%), 
      hsl(240, 100%, 50%), 
      hsl(300, 100%, 50%), 
      hsl(360, 100%, 50%)
    )`;
  }

  if (allColorField && allColorBullet) {
    allColorBullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = allColorField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(0, Math.min(rect.height - allColorBullet.offsetHeight, offsetY));
        allColorBullet.style.top = `${offsetY}px`;
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

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

    bullet.onmousedown = function (e) {
      e.preventDefault();
      document.onmousemove = function (e) {
        const rect = selectorField.getBoundingClientRect();
        let offsetY = e.clientY - rect.top;
        offsetY = Math.max(0, Math.min(rect.height - bullet.offsetHeight, offsetY));
        const nearest = Math.round(offsetY / 10);
        updateBullet(nearest * 10, shades[nearest], 100 - nearest * 10);
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

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

    updateBullet(0, shades[0], 100);
  }

  const firstColor = Object.values(themeColors)[0];
  if (firstColor) {
    renderVerticalColorShades(firstColor);
  }
}
