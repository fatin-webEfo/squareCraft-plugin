export function syncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) {
    console.warn("⛔ selectedElement not provided yet.");
    return;
  }

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

    const startBullet = document.getElementById("timeline-start-bullet");
    const endBullet = document.getElementById("timeline-end-bullet");

    if (!startBullet || !endBullet) return;

    const startLeft = parseFloat(startBullet.style.left || "0");
    const endLeft = parseFloat(endBullet.style.left || "100");

    if (clampedX <= startLeft + 1) {
      if (arrow.style.backgroundColor !== "var(--sc-bg-color-EF7C2F)") {
        console.log("🟠 Arrow is under START fill/bullet");
      }
      arrow.style.backgroundColor = "var(--sc-bg-color-EF7C2F)";
    } else if (clampedX >= endLeft - 1) {
      if (arrow.style.backgroundColor !== "#F6B67B") {
        console.log("🟡 Arrow is under END fill/bullet");
      }
      arrow.style.backgroundColor = "#F6B67B";
    } else {
      if (arrow.style.backgroundColor !== "#FFFFFF") {
        console.log("⚪ Arrow is in between start and end (normal region)");
      }
      arrow.style.backgroundColor = "#FFFFFF";
    }
  }
  
  
  
  

  function trackLoop(arrow, border) {
    function loop() {
      updateArrowPosition(arrow, border);
      requestAnimationFrame(loop);
    }
    loop();
  }
  

  waitForElements((arrow, border) => {
    trackLoop(arrow, border);
  });
}
