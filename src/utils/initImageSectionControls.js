export function initImageSectionControls() {
    const bullet = document.getElementById("radiousBullet");
    const field = document.getElementById("radiousField");
    const valueDisplay = document.getElementById("radiousCount");
    const fill = document.getElementById("radiousFill");
  
    if (!bullet || !field || !valueDisplay || !fill) return;
  
    const maxValue = 100;
    const minValue = 0;
  
    const block = window.lastClickedBlock;
    if (block) {
      const firstImg = block.querySelector("img");
      if (firstImg) {
        const currentRadius = parseInt(getComputedStyle(firstImg).borderRadius) || 0;
        const max = field.offsetWidth;
        const offsetX = Math.round((currentRadius / maxValue) * max);
  
        bullet.style.left = `${offsetX}px`;
        bullet.style.transform = "translateX(-50%)";
        fill.style.width = `${offsetX}px`;
        valueDisplay.textContent = `${currentRadius}px`;
      }
    }
  
    const updateBulletPosition = (clientX) => {
      const rect = field.getBoundingClientRect();
      let offsetX = clientX - rect.left;
  
      const max = field.offsetWidth;
      const bulletRadius = bullet.offsetWidth / 2;
  
      offsetX = Math.max(bulletRadius, Math.min(offsetX, max - bulletRadius));
  
      const percent = offsetX / max;
      const value = Math.round(minValue + (maxValue - minValue) * percent);
  
      bullet.style.left = `${offsetX}px`;
      bullet.style.transform = "translateX(-50%)";
      fill.style.width = `${offsetX}px`;
      valueDisplay.textContent = `${value}px`;
  
      if (block) {
        const images = block.querySelectorAll("img");
        images.forEach(img => {
          img.style.borderRadius = `${value}px`;
        });
      }
    };
  
    const startDrag = (e) => {
      e.preventDefault();
      const moveHandler = (moveEvent) => {
        const clientX = moveEvent.clientX || moveEvent.touches?.[0]?.clientX;
        if (clientX) updateBulletPosition(clientX);
      };
  
      const stopHandler = () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", stopHandler);
        document.removeEventListener("touchmove", moveHandler);
        document.removeEventListener("touchend", stopHandler);
      };
  
      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", stopHandler);
      document.addEventListener("touchmove", moveHandler);
      document.addEventListener("touchend", stopHandler);
    };
  
    bullet.removeEventListener("mousedown", startDrag);
    bullet.removeEventListener("touchstart", startDrag);
    bullet.addEventListener("mousedown", startDrag);
    bullet.addEventListener("touchstart", startDrag);
  }
  