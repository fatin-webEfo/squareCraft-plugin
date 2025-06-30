function attachAdvanceTimelineIncrementDecrement(
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
      document.getElementById("button-advance-entry-count")?.textContent ||
      "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getCenter = () => {
    const text =
      document.getElementById("button-advance-center-Count")?.textContent ||
      "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getExit = () => {
    const text =
      document.getElementById("button-advance-exit-Count")?.textContent || "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  setup(
    "vertical-button-advance-entry-increase",
    "vertical-button-advance-entry-decrease",
    getEntry,
    updateEntry
  );
  setup(
    "vertical-button-advance-center-increase",
    "vertical-button-advance-center-decrease",
    getCenter,
    updateCenter
  );
  setup(
    "vertical-button-advance-exit-increase",
    "vertical-button-advance-exit-decrease",
    getExit,
    updateExit
  );
}
function attachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const resetBtn = document.getElementById("vertical-custom-timeline-reset");
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


function initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("vertical-effect-animation-type-arrow");
  const dropdown = document.getElementById("vertical-effect-animation-type-list");
  const container = document.getElementById(
    "vertical-effect-animation-dropdown-container"
  );
  const displayValue = document.getElementById("effect-animation-value");

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

  

  
  export function initButtonAdvanceStyles(getSelectedElement) {
    const startBullet = document.getElementById("vertical-timeline-start-bullet");
    const endBullet = document.getElementById("vertical-timeline-end-bullet");
    const startFill = document.getElementById("vertical-timeline-start-fill");
    const endFill = document.getElementById("vertical-timeline-end-fill");
    const startValue = document.getElementById("vertical-timelineStartValue");
    const endValue = document.getElementById("vertical-timelineEndValue");

    const entryBullet = document.getElementById("vertical-button-advance-entry-bullet");
    const entryFill = document.getElementById("vertical-button-advance-entry-Fill");
    const entryCount = document.getElementById("vertical-button-advance-entry-count");

    const centerBullet = document.getElementById(
      "vertical-button-advance-center-bullet"
    );
    const centerFill = document.getElementById("vertical-button-advance-center-Fill");
    const centerCount = document.getElementById("vertical-button-advance-center-Count");

    const exitBullet = document.getElementById("vertical-button-advance-exit-bullet");
    const exitFill = document.getElementById("vertical-button-advance-exit-Fill");
    const exitCount = document.getElementById("vertical-button-advance-exit-Count");

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
      (
        bullet,
        fill,
        countEl,
        cssVar,
        position = "left",
        min = -100,
        max = 100
      ) =>
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
        if (el) {
          const button = el.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
              "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
          );
          if (button) {
            gsap.set(button, { [cssVar]: `${val}%` });
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

          const startPos = parseFloat(startBullet.style.left || "0");
          const endPos = parseFloat(endBullet.style.left || "100");

          if (type === "start" && clamped >= endPos - 4) {
            updateFn(endPos - 4);
          } else if (type === "end" && clamped <= startPos + 4) {
            updateFn(startPos + 4);
          } else {
            updateFn(clamped);
          }
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
      if (!el) return 0;
      const btn = el.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
          "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
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

    [
      {
        id: "vertical-button-advance-entry-reset",
        bullet: entryBullet,
        fill: entryFill,
        count: entryCount,
        css: "--sc-scroll-entry",
      },
      {
        id: "vertical-button-advance-center-reset",
        bullet: centerBullet,
        fill: centerFill,
        count: centerCount,
        css: "--sc-scroll-center",
      },
      {
        id: "vertical-button-advance-exit-reset",
        bullet: exitBullet,
        fill: exitFill,
        count: exitCount,
        css: "--sc-scroll-exit",
      },
    ].forEach(({ id, bullet, fill, count, css }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          updateField(bullet, fill, count, css)(0);
        };
      }
    });
    attachAdvanceTimelineIncrementDecrement(
      updateEntry,
      updateCenter,
      updateExit
    );
    attachCustomTimelineReset(
      updateStart,
      updateEnd,
      updateEntry,
      updateCenter,
      updateExit
    );
    initEffectAnimationDropdownToggle();
  }
