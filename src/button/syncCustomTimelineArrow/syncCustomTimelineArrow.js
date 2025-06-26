export function syncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  const arrow = document.getElementById("custom-timeline-arrow");
  const border = document.getElementById("custom-timeline-border");
  if (!arrow || !border) return;

  function updatePosition() {
    const rect = selectedElement.getBoundingClientRect();
    const borderRect = border.getBoundingClientRect();

    const elementCenterX = rect.left + rect.width / 2;
    const borderLeft = borderRect.left;
    const borderWidth = borderRect.width;

    const relativeX = ((elementCenterX - borderLeft) / borderWidth) * 100;
    const clampedX = Math.max(0, Math.min(100, relativeX));

    arrow.style.left = `${clampedX}%`;
    arrow.style.transform = "translateX(-50%)";

    requestAnimationFrame(updatePosition);
  }

  requestAnimationFrame(updatePosition);
}
