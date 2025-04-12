export function initImageSectionControls() {
    const bullet = document.getElementById("radiousBullet");
    const field = document.getElementById("radiousField");
    const valueDisplay = document.getElementById("radiousCount");
  
    if (!bullet || !field || !valueDisplay) return;
  
    const maxValue = 100;
    const minValue = 0;
    const fieldWidth = field.offsetWidth;
  
    const updateBulletPosition = (clientX) => {
      const rect = field.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, field.offsetWidth));
  
      const percent = offsetX / field.offsetWidth;
      const value = Math.round(minValue + (maxValue - minValue) * percent);
  
      bullet.style.left = `${offsetX}px`;
      valueDisplay.textContent = `${value}px`;
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
  
    bullet.addEventListener("mousedown", startDrag);
    bullet.addEventListener("touchstart", startDrag);
  }
  