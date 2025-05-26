export function initImageSectionControls() {
  const bullet = document.getElementById("radiusBullet");
  const field = document.getElementById("radiusField");
  const valueDisplay = document.getElementById("radiusCount");
  const fill = document.getElementById("radiusFill");

  if (!bullet || !field || !valueDisplay || !fill) return;

  const maxValue = 100;
  const minValue = 0;

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

    const block = window.lastClickedBlock;
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

  bullet.addEventListener("mousedown", startDrag);
  bullet.addEventListener("touchstart", startDrag);
}
