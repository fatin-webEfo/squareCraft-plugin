export function buttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) {
    console.warn("⛔ selectedElement not provided yet.");
    return;
  }

  let isTracking = false;
  let lastY = null;

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
    const centerLeft = (startLeft + endLeft) / 2;

    const btn = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );

    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%")
        ? (parseFloat(value) / 100) * 100
        : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-scroll-center");
    const exitY = getVHFromCSSVar("--sc-scroll-exit");

    let y = 0;
    let apply = false;

    // Entry zone
    if (scrollBasedLeft <= startLeft + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        y = entryY;
        apply = true;
      }
    }
    // Exit zone
    else if (scrollBasedLeft >= endLeft - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        y = exitY;
        apply = true;
      }
    }
    // Interpolated zone
    else {
      arrow.style.backgroundColor = "#FFFFFF";

      // Between Entry and Center
      if (scrollBasedLeft > startLeft + 1 && scrollBasedLeft < centerLeft - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (scrollBasedLeft - startLeft) / (centerLeft - startLeft);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      }

      // Between Center and Exit
      else if (
        scrollBasedLeft > centerLeft + 1 &&
        scrollBasedLeft < endLeft - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (scrollBasedLeft - centerLeft) / (endLeft - centerLeft);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    // Animate smoothly to final Y
    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      gsap.to(btn, {
        duration: 0.3,
        ease: "power2.out",
        transform: `translateY(${finalY.toFixed(2)}vh)`,
      });
      lastY = finalY;
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
