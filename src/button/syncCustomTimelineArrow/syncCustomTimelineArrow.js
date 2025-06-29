export function buttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) {
    console.warn("⛔ selectedElement not provided yet.");
    return;
  }

  let isTracking = false;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("custom-timeline-arrow");
    const border = document.getElementById("custom-timeline-border");
    const startBullet = document.getElementById("timeline-start-bullet");
    const endBullet = document.getElementById("timeline-end-bullet");

    if (arrow && border && startBullet && endBullet) {
      callback(arrow, border, startBullet, endBullet);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    } else {
      console.warn("⚠️ Required elements not found after retries.");
    }
  }

  function updateArrowPosition(arrow, border, startBullet, endBullet) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;

    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );

    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    console.log("📍 Arrow left %:", scrollBasedLeft.toFixed(2));

    const startLeft = parseFloat(startBullet.style.left || "0");
    const endLeft = parseFloat(endBullet.style.left || "100");

    if (scrollBasedLeft <= startLeft + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      console.log("🟠 Arrow is under START fill/bullet");
    } else if (scrollBasedLeft >= endLeft - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      console.log("🟡 Arrow is under END fill/bullet");
    } else {
      arrow.style.backgroundColor = "#FFFFFF";
      console.log("⚪ Arrow is in NORMAL range");
    }
  }

  function trackLoop(arrow, border, startBullet, endBullet) {
    if (isTracking) return;
    isTracking = true;

    function loop() {
      updateArrowPosition(arrow, border, startBullet, endBullet);
      requestAnimationFrame(loop);
    }

    loop();
  }

  waitForElements((arrow, border, startBullet, endBullet) => {
    trackLoop(arrow, border, startBullet, endBullet);
  });
}