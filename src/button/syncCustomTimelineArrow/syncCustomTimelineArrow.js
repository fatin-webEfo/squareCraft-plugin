export function syncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) {
    console.warn("❌ No selected element provided for syncCustomTimelineArrow");
    return;
  }

  const arrow = document.getElementById("custom-timeline-arrow");
  const border = document.getElementById("custom-timeline-border");
  if (!arrow || !border) {
    console.warn(
      "❌ Arrow or border element not found for syncCustomTimelineArrow"
    );
    return;
  }

  const rect = selectedElement.getBoundingClientRect();
  const borderRect = border.getBoundingClientRect();

  const elementCenterX = rect.left + rect.width / 2;
  const borderLeft = borderRect.left;
  const borderWidth = borderRect.width;

  const relativeX = ((elementCenterX - borderLeft) / borderWidth) * 100;

  // Clamp the value to [0%, 100%]
  const clampedX = Math.max(0, Math.min(100, relativeX));

  arrow.style.left = `${clampedX}%`;
  arrow.style.right = "";
  arrow.style.transform = "translateX(-50%)"; // center align
}
