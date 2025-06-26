export function syncCustomTimelineArrow(selectedElement) {
  function logSelectedElementPosition() {
    if (!selectedElement) return;

    const rect = selectedElement.getBoundingClientRect();
    console.log("📌 selectedElement position:");
    console.log("Top:", rect.top);
    console.log("Left:", rect.left);
    console.log("Right:", rect.right);
    console.log("Bottom:", rect.bottom);
    console.log("Width:", rect.width);
    console.log("Height:", rect.height);

    const isVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    console.log("👁️ Is fully visible in viewport?", isVisible);
  }
  window.addEventListener("scroll", () => {
    logSelectedElementPosition();
  });
  
  if (!selectedElement) return;

  const arrow = document.getElementById("custom-timeline-arrow");
  const border = document.getElementById("custom-timeline-border");
  if (!arrow || !border) return;

  const rect = selectedElement.getBoundingClientRect();
  const borderRect = border.getBoundingClientRect();

  const elementCenterX = rect.left + rect.width / 2;
  const borderLeft = borderRect.left;
  const borderWidth = borderRect.width;

  const relativeX = ((elementCenterX - borderLeft) / borderWidth) * 100;
  const clampedX = Math.max(0, Math.min(100, relativeX));

  arrow.style.left = `${clampedX}%`;
  arrow.style.transform = "translateX(-50%)";
}
