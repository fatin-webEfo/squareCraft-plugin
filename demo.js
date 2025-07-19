function scaleattachAdvanceTimelineIncrementDecrement(
  updateEntry,
  updateCenter,
  updateExit
) {
  let lastFocused = null;

  function setup(idIncrease, idDecrease, getCurrent, updateFn, bulletId) {
    const btnInc = document.getElementById(idIncrease);
    const btnDec = document.getElementById(idDecrease);
    let interval;

    const startHold = (type) => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        const val = getCurrent();
        updateFn(type === "inc" ? val + 1 : val - 1);
      }, 100);
    };
    const stopHold = () => clearInterval(interval);

    if (btnInc) {
      btnInc.onmousedown = () => startHold("inc");
      btnInc.onmouseup = stopHold;
      btnInc.onmouseleave = stopHold;
      btnInc.onclick = () => updateFn(getCurrent() + 1);
    }
    if (btnDec) {
      btnDec.onmousedown = () => startHold("dec");
      btnDec.onmouseup = stopHold;
      btnDec.onmouseleave = stopHold;
      btnDec.onclick = () => updateFn(getCurrent() - 1);
    }

    const bullet = document.getElementById(bulletId);
    if (bullet) {
      bullet.setAttribute("tabindex", "0");
      bullet.addEventListener("click", () => (lastFocused = bulletId));
      bullet.addEventListener("focus", () => (lastFocused = bulletId));
    }
  }

  const getVal = (id) =>
    parseInt(document.getElementById(id)?.textContent.replace("%", "") || "0");

  setup(
    "Typo-scale-advance-entry-increase",
    "Typo-scale-advance-entry-decrease",
    () => getVal("Typo-scale-advance-entry-count"),
    updateEntry,
    "Typo-scale-advance-entry-bullet"
  );
  setup(
    "Typo-scale-advance-center-increase",
    "Typo-scale-advance-center-decrease",
    () => getVal("Typo-scale-advance-center-count"),
    updateCenter,
    "Typo-scale-advance-center-bullet"
  );
  setup(
    "Typo-scale-advance-exit-increase",
    "Typo-scale-advance-exit-decrease",
    () => getVal("Typo-scale-advance-exit-count"),
    updateExit,
    "Typo-scale-advance-exit-bullet"
  );

  // keyboard controllet arrowKeyCooldown = false;
  let keyHoldInterval = null;
  let keyHoldTimeout = null;
  let lastPressedKey = null;

  document.addEventListener("keydown", (e) => {
    if (!lastFocused) return;

    // Only run if it's a left/right key and no key is already active
    if (
      (e.key !== "ArrowRight" && e.key !== "ArrowLeft") ||
      keyHoldInterval ||
      keyHoldTimeout
    )
      return;

    lastPressedKey = e.key;

    const getVal = (id) =>
      parseInt(
        document.getElementById(id)?.textContent.replace("%", "") || "0"
      );

    const update = () => {
      const val = getVal(`${lastFocused.replace("-bullet", "-count")}`);

      if (lastFocused.includes("entry")) {
        if (e.key === "ArrowRight") updateEntry(val + 1);
        if (e.key === "ArrowLeft") updateEntry(val - 1);
      }
      if (lastFocused.includes("center")) {
        if (e.key === "ArrowRight") updateCenter(val + 1);
        if (e.key === "ArrowLeft") updateCenter(val - 1);
      }
      if (lastFocused.includes("exit")) {
        if (e.key === "ArrowRight") updateExit(val + 1);
        if (e.key === "ArrowLeft") updateExit(val - 1);
      }
    };

    update(); // Immediate single-step on key press

    // Only start interval if key is still held after 300ms
    keyHoldTimeout = setTimeout(() => {
      keyHoldInterval = setInterval(update, 100);
    }, 300);
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === lastPressedKey) {
      if (keyHoldInterval) {
        clearInterval(keyHoldInterval);
        keyHoldInterval = null;
      }
      if (keyHoldTimeout) {
        clearTimeout(keyHoldTimeout);
        keyHoldTimeout = null;
      }
      lastPressedKey = null;
    }
  });
}

function scaleattachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const btn = document.getElementById("Typo-scale-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

function scaleinitEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("Typo-scale-custom-timeline-arrow");
  const start = document.getElementById("Typo-scale-timeline-start-bullet");
  const end = document.getElementById("Typo-scale-timeline-end-bullet");

  if (!arrow || !start || !end) return;

  const parent = arrow.parentElement;
  const parentBox = parent.getBoundingClientRect();
  const arrowBox = arrow.getBoundingClientRect();
  const startBox = start.getBoundingClientRect();
  const endBox = end.getBoundingClientRect();

  const arrowCenter = arrowBox.left + arrowBox.width / 2;
  const startCenter = startBox.left + startBox.width / 2;
  const endCenter = endBox.left + endBox.width / 2;

  if (arrowCenter <= startCenter + 1) {
    gsap.to(arrow, { backgroundColor: "rgb(239, 124, 47)", duration: 0.3 });
  } else if (arrowCenter >= endCenter - 1) {
    gsap.to(arrow, { backgroundColor: "rgb(246, 182, 123)", duration: 0.3 });
  } else {
    gsap.to(arrow, { backgroundColor: "#FFFFFF", duration: 0.3 });
  }
}

export function scaleinitTypoAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById(
    "Typo-scale-timeline-start-bullet"
  );
  const endBullet = document.getElementById(
    "Typo-scale-timeline-end-bullet"
  );
  const startFill = document.getElementById(
    "Typo-scale-timeline-start-fill"
  );
  const endFill = document.getElementById("Typo-scale-timeline-end-fill");
  const startValue = document.getElementById(
    "Typo-scale-timelineStartValue"
  );
  const endValue = document.getElementById("Typo-scale-timelineEndValue");

  const entryBullet = document.getElementById(
    "Typo-scale-advance-entry-bullet"
  );
  const entryFill = document.getElementById("Typo-scale-advance-entry-fill");
  const entryCount = document.getElementById(
    "Typo-scale-advance-entry-count"
  );

  const centerBullet = document.getElementById(
    "Typo-scale-advance-center-bullet"
  );
  const centerFill = document.getElementById(
    "Typo-scale-advance-center-fill"
  );
  const centerCount = document.getElementById(
    "Typo-scale-advance-center-count"
  );

  const exitBullet = document.getElementById(
    "Typo-scale-advance-exit-bullet"
  );
  const exitFill = document.getElementById("Typo-scale-advance-exit-fill");
  const exitCount = document.getElementById("Typo-scale-advance-exit-count");

  if (
    !startBullet ||
    !endBullet ||
    !startFill ||
    !endFill ||
    !startValue ||
    !endValue ||
    !entryBullet ||
    !entryFill ||
    !entryCount ||
    !centerBullet ||
    !centerFill ||
    !centerCount ||
    !exitBullet ||
    !exitFill ||
    !exitCount
  )
    return;

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
    (val) => {
      val = Math.max(min, Math.min(max, val));
      countEl.textContent = `${val}%`;

      const el = getSelectedElement?.();
      const styleId = el?.id
        ? `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`
        : null;

      if (
        [
          "--sc-Typo-scale-scroll-entry",
          "--sc-Typo-scale-scroll-center",
          "--sc-Typo-scale-scroll-exit",
        ].includes(cssVar)
      ) {
        const percent = (val + 100) / 2;
        const bulletLeft = percent;
        const fillLeft = val < 0 ? percent : 50;
        const fillWidth = Math.abs(val / 2);
        bullet.style.left = `${bulletLeft}%`; // sync
        gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-Typo-theme-accent)",
        });

        if (cssVar === "--sc-Typo-scale-scroll-entry") {
          document.getElementById(
            "Typo-scale-custom-timeline-arrow"
          ).style.left = `${bulletLeft}%`;
        }
        scaleinitEffectAnimationDropdownToggle();
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        position === "left"
          ? gsap.set(fill, { width: `${val}%`, left: "0" })
          : gsap.set(fill, {
              left: "0",
              transform: `scaleX(${(100 - val) / 100})`,
              transformOrigin: "right",
              width: "100%",
              backgroundColor: "#F6B67B",
            });
      }

      if (el && el.id?.startsWith("block-")) {
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }
        const contentEl = el.querySelector(".sqs-block-content");
        if (contentEl) {
          styleTag.textContent = `#${el.id} .sqs-block-content {\n  ${cssVar}: ${val}%;\n}`;
        }
      }
    };

  const makeDraggable = (
    bullet,
    updateFn,
    type = "normal",
    min = -100,
    max = 100
  ) => {
    bullet.onmousedown = (e) => {
      e.preventDefault();
      const container = bullet.parentElement;
      const rect = container.getBoundingClientRect();
      const onMouseMove = (event) => {
        const clientX = Math.max(
          rect.left,
          Math.min(rect.right, event.clientX)
        );
        const percent =
          ((clientX - rect.left) / rect.width) * (max - min) + min;
        const clamped = Math.round(Math.max(min, Math.min(max, percent)));
        updateFn(clamped);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener(
        "mouseup",
        () => document.removeEventListener("mousemove", onMouseMove),
        { once: true }
      );
    };
  };

  const getCurrentPercentage = (cssVar) => {
    const el = getSelectedElement?.();
    if (!el) return 0;

    const contentEl = el.querySelector(".sqs-block-content");
    if (!contentEl) return 0;

    const val = getComputedStyle(contentEl).getPropertyValue(cssVar).trim();
    return parseFloat(val.replace("%", "")) || 0;
  };

  const updateStart = updateField(
    startBullet,
    startFill,
    startValue,
    "--sc-Typo-scale-scroll-start",
    "left",
    0,
    100
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-Typo-scale-scroll-end",
    "right",
    0,
    100
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-Typo-scale-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-Typo-scale-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-Typo-scale-scroll-exit"
  );

  updateEntry(getCurrentPercentage("--sc-Typo-scale-scroll-entry"));
  updateCenter(getCurrentPercentage("--sc-Typo-scale-scroll-center"));
  updateExit(getCurrentPercentage("--sc-Typo-scale-scroll-exit"));

  makeDraggable(startBullet, updateStart, "start", 0, 100);
  makeDraggable(endBullet, updateEnd, "end", 0, 100);
  makeDraggable(entryBullet, updateEntry, "normal");
  makeDraggable(centerBullet, updateCenter, "normal");
  makeDraggable(exitBullet, updateExit, "normal");

  [
    {
      id: "Typo-scale-advance-entry-reset",
      bullet: entryBullet,
      fill: entryFill,
      count: entryCount,
      css: "--sc-Typo-scale-scroll-entry",
    },
    {
      id: "Typo-scale-advance-center-reset",
      bullet: centerBullet,
      fill: centerFill,
      count: centerCount,
      css: "--sc-Typo-scale-scroll-center",
    },
    {
      id: "Typo-scale-advance-exit-reset",
      bullet: exitBullet,
      fill: exitFill,
      count: exitCount,
      css: "--sc-Typo-scale-scroll-exit",
    },
  ].forEach(({ id, bullet, fill, count, css }) => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = () => updateField(bullet, fill, count, css)(0);
  });

  scaleattachAdvanceTimelineIncrementDecrement(
    updateEntry,
    updateCenter,
    updateExit
  );
  scaleattachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  );
  scaleinitEffectAnimationDropdownToggle(startBullet, endBullet);
}
