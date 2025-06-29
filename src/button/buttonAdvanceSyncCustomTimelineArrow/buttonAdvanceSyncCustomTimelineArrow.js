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

    const startLeft = parseFloat(startBullet.style.left || "0");
    const endLeft = parseFloat(endBullet.style.left || "100");

    const btn = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%")
        ? (parseFloat(value) / 100) * 100
        : parseFloat(value) || 0;
    };

    if (btn) {
      if (scrollBasedLeft <= startLeft + 1) {
        arrow.style.backgroundColor = "#EF7C2F";
        const y = getVHFromCSSVar("--sc-scroll-entry");
        btn.style.transform = `translateY(${y}vh)`;
        console.log("🟠 Entry Y →", y);
      } else if (scrollBasedLeft >= endLeft - 1) {
        arrow.style.backgroundColor = "#F6B67B";
        const y = getVHFromCSSVar("--sc-scroll-exit");
        btn.style.transform = `translateY(${y}vh)`;
        console.log("🟡 Exit Y →", y);
      } else {
        arrow.style.backgroundColor = "#FFFFFF";
        const y = getVHFromCSSVar("--sc-scroll-center");
        btn.style.transform = `translateY(${y}vh)`;
        console.log("⚪ Center Y →", y);
      }
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
