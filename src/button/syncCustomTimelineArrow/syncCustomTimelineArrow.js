export function syncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) {
    console.warn("⛔ selectedElement not provided yet.");
    return;
  }

  // Waits until DOM elements are available
  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("custom-timeline-arrow");
    const border = document.getElementById("custom-timeline-border");

    if (arrow && border) {
      callback(arrow, border);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    } else {
      console.warn("⚠️ Arrow or border element not found after retries.");
    }
  }

  function updateArrowPosition(arrow, border) {
    const rect = selectedElement.getBoundingClientRect();
    const borderRect = border.getBoundingClientRect();

    const elementCenterX = rect.left + rect.width / 2;
    const borderLeft = borderRect.left;
    const borderWidth = borderRect.width;

    const relativeX = ((elementCenterX - borderLeft) / borderWidth) * 100;
    const clampedX = Math.max(0, Math.min(100, relativeX));

    arrow.style.left = `${clampedX}%`;
    arrow.style.transform = "translateX(-50%)";

    console.log("📌 Arrow position updated:", clampedX.toFixed(2) + "%");
  }

  function trackLoop(arrow, border) {
    updateArrowPosition(arrow, border);
    requestAnimationFrame(() => trackLoop(arrow, border));
  }

  waitForElements((arrow, border) => {
    trackLoop(arrow, border);
  });
}
