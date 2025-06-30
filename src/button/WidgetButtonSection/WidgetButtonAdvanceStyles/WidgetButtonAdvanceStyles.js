function attachAdvanceTimelineIncrementDecrement(
  effect,
  updateEntry,
  updateCenter,
  updateExit
) {
  function setup(idIncrease, idDecrease, getCurrent, updateFn) {
    const btnInc = document.getElementById(idIncrease);
    const btnDec = document.getElementById(idDecrease);

    if (btnInc) {
      btnInc.onclick = () => {
        const val = getCurrent();
        updateFn(val + 1);
      };
    }

    if (btnDec) {
      btnDec.onclick = () => {
        const val = getCurrent();
        updateFn(val - 1);
      };
    }
  }

  const getEntry = () => {
    const text =
      document.getElementById(`${effect}-button-advance-entry-count`)
        ?.textContent || "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getCenter = () => {
    const text =
      document.getElementById(`${effect}-button-advance-center-count`)
        ?.textContent || "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getExit = () => {
    const text =
      document.getElementById(`${effect}-button-advance-exit-count`)
        ?.textContent || "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  setup(
    `${effect}-button-advance-entry-increase`,
    `${effect}-button-advance-entry-decrease`,
    getEntry,
    updateEntry
  );
  setup(
    `${effect}-button-advance-center-increase`,
    `${effect}-button-advance-center-decrease`,
    getCenter,
    updateCenter
  );
  setup(
    `${effect}-button-advance-exit-increase`,
    `${effect}-button-advance-exit-decrease`,
    getExit,
    updateExit
  );
}

function attachCustomTimelineReset(
  effect,
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const resetBtn = document.getElementById(`${effect}-custom-timeline-reset`);
  if (resetBtn) {
    resetBtn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
  }
}

function initEffectAnimationDropdownToggle(effect) {
  const arrow = document.getElementById(
    `${effect}-effect-animation-type-arrow`
  );
  const dropdown = document.getElementById(
    `${effect}-effect-animation-type-list`
  );
  const container = document.getElementById(
    `${effect}-effect-animation-dropdown-container`
  );
  const displayValue = document.getElementById(
    `${effect}-effect-animation-value`
  );

  if (!arrow || !dropdown || !container || !displayValue) return;

  arrow.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("sc-hidden");
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      dropdown.classList.add("sc-hidden");
    }
  });

  dropdown.querySelectorAll("[data-value]").forEach((item) => {
    item.addEventListener("click", () => {
      const selected = item.getAttribute("data-value");
      displayValue.textContent = selected;
      dropdown.classList.add("sc-hidden");
    });
  });
}

export function initButtonAdvanceStyles(effect, getSelectedElement) {
  const startBullet = document.getElementById(
    `${effect}-timeline-start-bullet`
  );
  const endBullet = document.getElementById(`${effect}-timeline-end-bullet`);
  const startFill = document.getElementById(`${effect}-timeline-start-fill`);
  const endFill = document.getElementById(`${effect}-timeline-end-fill`);
  const startValue = document.getElementById(`${effect}-timelineStartValue`);
  const endValue = document.getElementById(`${effect}-timelineEndValue`);

  const entryBullet = document.getElementById(
    `${effect}-button-advance-entry-bullet`
  );
  const entryFill = document.getElementById(
    `${effect}-button-advance-entry-fill`
  );
  const entryCount = document.getElementById(
    `${effect}-button-advance-entry-count`
  );

  const centerBullet = document.getElementById(
    `${effect}-button-advance-center-bullet`
  );
  const centerFill = document.getElementById(
    `${effect}-button-advance-center-fill`
  );
  const centerCount = document.getElementById(
    `${effect}-button-advance-center-count`
  );

  const exitBullet = document.getElementById(
    `${effect}-button-advance-exit-bullet`
  );
  const exitFill = document.getElementById(
    `${effect}-button-advance-exit-fill`
  );
  const exitCount = document.getElementById(
    `${effect}-button-advance-exit-count`
  );

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

      if (
        [
          "--sc-scroll-entry",
          "--sc-scroll-center",
          "--sc-scroll-exit",
        ].includes(cssVar)
      ) {
        const percent = (val + 100) / 2;
        const bulletLeft = percent;
        const fillLeft = val < 0 ? percent : 50;
        const fillWidth = Math.abs(val / 2);
        gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-theme-accent)",
        });
      } else if (position === "left") {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        gsap.set(fill, { width: `${val}%`, left: "0" });
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        gsap.set(fill, {
          left: "0",
          right: "auto",
          transform: `scaleX(${(100 - val) / 100})`,
          transformOrigin: "right",
          width: "100%",
          backgroundColor: "#F6B67B",
        });
      }

      const el = getSelectedElement?.();
      const button = el?.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      );
      if (button) gsap.set(button, { [cssVar]: `${val}%` });
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
        const startPos = parseFloat(startBullet.style.left || "0");
        const endPos = parseFloat(endBullet.style.left || "100");

        if (type === "start" && clamped >= endPos - 4) updateFn(endPos - 4);
        else if (type === "end" && clamped <= startPos + 4)
          updateFn(startPos + 4);
        else updateFn(clamped);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", onMouseMove);
        },
        { once: true }
      );
    };
  };

  const updateStart = updateField(
    startBullet,
    startFill,
    startValue,
    "--sc-scroll-start",
    "left",
    0,
    100
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-scroll-end",
    "right",
    0,
    100
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-scroll-exit"
  );

  const getCurrentPercentage = (cssVar) => {
    const el = getSelectedElement?.();
    const btn = el?.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return 0;
    const val = getComputedStyle(btn).getPropertyValue(cssVar).trim();
    return parseFloat(val.replace("%", "")) || 0;
  };

  updateEntry(getCurrentPercentage("--sc-scroll-entry"));
  updateCenter(getCurrentPercentage("--sc-scroll-center"));
  updateExit(getCurrentPercentage("--sc-scroll-exit"));

  makeDraggable(startBullet, updateStart, "start", 0, 100);
  makeDraggable(endBullet, updateEnd, "end", 0, 100);
  makeDraggable(entryBullet, updateEntry, "normal");
  makeDraggable(centerBullet, updateCenter, "normal");
  makeDraggable(exitBullet, updateExit, "normal");

  ["entry", "center", "exit"].forEach((type) => {
    const btn = document.getElementById(
      `${effect}-button-advance-${type}-reset`
    );
    if (btn) {
      const fieldMap = {
        entry: updateEntry,
        center: updateCenter,
        exit: updateExit,
      };
      btn.onclick = () => fieldMap;
    }
  });

  attachAdvanceTimelineIncrementDecrement(
    effect,
    updateEntry,
    updateCenter,
    updateExit
  );
  attachCustomTimelineReset(
    effect,
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  );
  initEffectAnimationDropdownToggle(effect);
}
