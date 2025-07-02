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
      document.getElementById("vertical-button-advance-entry-count")?.textContent ||
      "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getCenter = () => {
    const text =
      document.getElementById("vertical-button-advance-center-count")?.textContent ||
      "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getExit = () => {
    const text =
      document.getElementById("vertical-button-advance-exit-count")?.textContent || "0%";
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
  const displayValue = document.getElementById(
    "vertical-effect-animation-value"
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


export function initButtonAdvanceStyles(getSelectedElement) {
    const startBullet = document.getElementById("vertical-timeline-start-bullet");
    const endBullet = document.getElementById("vertical-timeline-end-bullet");
    const startFill = document.getElementById("vertical-timeline-start-fill");
    const endFill = document.getElementById("vertical-timeline-end-fill");
    const startValue = document.getElementById("vertical-timelineStartValue");
    const endValue = document.getElementById("vertical-timelineEndValue");

    const entryBullet = document.getElementById("vertical-button-advance-entry-bullet");
    const entryFill = document.getElementById("vertical-button-advance-entry-fill");
    const entryCount = document.getElementById("vertical-button-advance-entry-count");

    const centerBullet = document.getElementById(
      "vertical-button-advance-center-bullet"
    );
    const centerFill = document.getElementById("vertical-button-advance-center-fill");
    const centerCount = document.getElementById("vertical-button-advance-center-count");

    const exitBullet = document.getElementById("vertical-button-advance-exit-bullet");
    const exitFill = document.getElementById("vertical-button-advance-exit-fill");
    const exitCount = document.getElementById("vertical-button-advance-exit-count");

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
            "--sc-vertical-scroll-entry",
            "--sc-vertical-scroll-center",
            "--sc-vertical-scroll-exit",
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
      "--sc-vertical-scroll-start",
      "left",
      0,
      100
    );
    const updateEnd = updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-vertical-scroll-end",
      "right",
      0,
      100
    );
    const updateEntry = updateField(
      entryBullet,
      entryFill,
      entryCount,
      "--sc-vertical-scroll-entry"
    );
    const updateCenter = updateField(
      centerBullet,
      centerFill,
      centerCount,
      "--sc-vertical-scroll-center"
    );
    const updateExit = updateField(
      exitBullet,
      exitFill,
      exitCount,
      "--sc-vertical-scroll-exit"
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

    updateEntry(getCurrentPercentage("--sc-vertical-scroll-entry"));
    updateCenter(getCurrentPercentage("--sc-vertical-scroll-center"));
    updateExit(getCurrentPercentage("--sc-vertical-scroll-exit"));

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
        css: "--sc-vertical-scroll-entry",
      },
      {
        id: "vertical-button-advance-center-reset",
        bullet: centerBullet,
        fill: centerFill,
        count: centerCount,
        css: "--sc-vertical-scroll-center",
      },
      {
        id: "vertical-button-advance-exit-reset",
        bullet: exitBullet,
        fill: exitFill,
        count: exitCount,
        css: "--sc-vertical-scroll-exit",
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





  // horizontal
  function horizontalattachAdvanceTimelineIncrementDecrement(
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
        document.getElementById("horizontal-button-advance-entry-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getCenter = () => {
      const text =
        document.getElementById("horizontal-button-advance-center-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getExit = () => {
      const text =
        document.getElementById("horizontal-button-advance-exit-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    setup(
      "horizontal-button-advance-entry-increase",
      "horizontal-button-advance-entry-decrease",
      getEntry,
      updateEntry
    );
    setup(
      "horizontal-button-advance-center-increase",
      "horizontal-button-advance-center-decrease",
      getCenter,
      updateCenter
    );
    setup(
      "horizontal-button-advance-exit-increase",
      "horizontal-button-advance-exit-decrease",
      getExit,
      updateExit
    );
  }
  function horizontalattachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  ) {
    const resetBtn = document.getElementById("horizontal-custom-timeline-reset");
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

  function horizontalinitEffectAnimationDropdownToggle() {
    const arrow = document.getElementById(
      "horizontal-effect-animation-type-arrow"
    );
    const dropdown = document.getElementById(
      "horizontal-effect-animation-type-list"
    );
    const container = document.getElementById(
      "horizontal-effect-animation-dropdown-container"
    );
    const displayValue = document.getElementById(
      "horizontal-effect-animation-value"
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

  export function horizontalinitButtonAdvanceStyles(getSelectedElement) {
    const startBullet = document.getElementById(
      "horizontal-timeline-start-bullet"
    );
    const endBullet = document.getElementById("horizontal-timeline-end-bullet");
    const startFill = document.getElementById("horizontal-timeline-start-fill");
    const endFill = document.getElementById("horizontal-timeline-end-fill");
    const startValue = document.getElementById("horizontal-timelineStartValue");
    const endValue = document.getElementById("horizontal-timelineEndValue");

    const entryBullet = document.getElementById(
      "horizontal-button-advance-entry-bullet"
    );
    const entryFill = document.getElementById(
      "horizontal-button-advance-entry-fill"
    );
    const entryCount = document.getElementById(
      "horizontal-button-advance-entry-count"
    );

    const centerBullet = document.getElementById(
      "horizontal-button-advance-center-bullet"
    );
    const centerFill = document.getElementById(
      "horizontal-button-advance-center-fill"
    );
    const centerCount = document.getElementById(
      "horizontal-button-advance-center-count"
    );

    const exitBullet = document.getElementById(
      "horizontal-button-advance-exit-bullet"
    );
    const exitFill = document.getElementById(
      "horizontal-button-advance-exit-fill"
    );
    const exitCount = document.getElementById(
      "horizontal-button-advance-exit-count"
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
            "--sc-horizontal-scroll-entry",
            "--sc-horizontal-scroll-center",
            "--sc-horizontal-scroll-exit",
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
      "--sc-horizontal-scroll-start",
      "left",
      0,
      100
    );
    const updateEnd = updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-horizontal-scroll-end",
      "right",
      0,
      100
    );
    const updateEntry = updateField(
      entryBullet,
      entryFill,
      entryCount,
      "--sc-horizontal-scroll-entry"
    );
    const updateCenter = updateField(
      centerBullet,
      centerFill,
      centerCount,
      "--sc-horizontal-scroll-center"
    );
    const updateExit = updateField(
      exitBullet,
      exitFill,
      exitCount,
      "--sc-horizontal-scroll-exit"
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

    updateEntry(getCurrentPercentage("--sc-horizontal-scroll-entry"));
    updateCenter(getCurrentPercentage("--sc-horizontal-scroll-center"));
    updateExit(getCurrentPercentage("--sc-horizontal-scroll-exit"));

    makeDraggable(startBullet, updateStart, "start", 0, 100);
    makeDraggable(endBullet, updateEnd, "end", 0, 100);
    makeDraggable(entryBullet, updateEntry, "normal");
    makeDraggable(centerBullet, updateCenter, "normal");
    makeDraggable(exitBullet, updateExit, "normal");

    [
      {
        id: "horizontal-button-advance-entry-reset",
        bullet: entryBullet,
        fill: entryFill,
        count: entryCount,
        css: "--sc-horizontal-scroll-entry",
      },
      {
        id: "horizontal-button-advance-center-reset",
        bullet: centerBullet,
        fill: centerFill,
        count: centerCount,
        css: "--sc-horizontal-scroll-center",
      },
      {
        id: "horizontal-button-advance-exit-reset",
        bullet: exitBullet,
        fill: exitFill,
        count: exitCount,
        css: "--sc-horizontal-scroll-exit",
      },
    ].forEach(({ id, bullet, fill, count, css }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          updateField(bullet, fill, count, css)(0);
        };
      }
    });
    horizontalattachAdvanceTimelineIncrementDecrement(
      updateEntry,
      updateCenter,
      updateExit
    );
    horizontalattachCustomTimelineReset(
      updateStart,
      updateEnd,
      updateEntry,
      updateCenter,
      updateExit
    );
    horizontalinitEffectAnimationDropdownToggle();
  }
  // horizontal



  
    // Opacity
  function opacityattachAdvanceTimelineIncrementDecrement(
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
        document.getElementById("opacity-button-advance-entry-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getCenter = () => {
      const text =
        document.getElementById("opacity-button-advance-center-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getExit = () => {
      const text =
        document.getElementById("opacity-button-advance-exit-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    setup(
      "opacity-button-advance-entry-increase",
      "opacity-button-advance-entry-decrease",
      getEntry,
      updateEntry
    );
    setup(
      "opacity-button-advance-center-increase",
      "opacity-button-advance-center-decrease",
      getCenter,
      updateCenter
    );
    setup(
      "opacity-button-advance-exit-increase",
      "opacity-button-advance-exit-decrease",
      getExit,
      updateExit
    );
  }
  function opacityattachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  ) {
    const resetBtn = document.getElementById("opacity-custom-timeline-reset");
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

  function opacityinitEffectAnimationDropdownToggle() {
    const arrow = document.getElementById(
      "opacity-effect-animation-type-arrow"
    );
    const dropdown = document.getElementById(
      "opacity-effect-animation-type-list"
    );
    const container = document.getElementById(
      "opacity-effect-animation-dropdown-container"
    );
    const displayValue = document.getElementById(
      "opacity-effect-animation-value"
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

  export function opacityinitButtonAdvanceStyles(getSelectedElement) {
    const startBullet = document.getElementById(
      "opacity-timeline-start-bullet"
    );
    const endBullet = document.getElementById("opacity-timeline-end-bullet");
    const startFill = document.getElementById("opacity-timeline-start-fill");
    const endFill = document.getElementById("opacity-timeline-end-fill");
    const startValue = document.getElementById("opacity-timelineStartValue");
    const endValue = document.getElementById("opacity-timelineEndValue");

    const entryBullet = document.getElementById(
      "opacity-button-advance-entry-bullet"
    );
    const entryFill = document.getElementById(
      "opacity-button-advance-entry-fill"
    );
    const entryCount = document.getElementById(
      "opacity-button-advance-entry-count"
    );

    const centerBullet = document.getElementById(
      "opacity-button-advance-center-bullet"
    );
    const centerFill = document.getElementById(
      "opacity-button-advance-center-fill"
    );
    const centerCount = document.getElementById(
      "opacity-button-advance-center-count"
    );

    const exitBullet = document.getElementById(
      "opacity-button-advance-exit-bullet"
    );
    const exitFill = document.getElementById(
      "opacity-button-advance-exit-fill"
    );
    const exitCount = document.getElementById(
      "opacity-button-advance-exit-count"
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
            "--sc-opacity-scroll-entry",
            "--sc-opacity-scroll-center",
            "--sc-opacity-scroll-exit",
          ].includes(cssVar)
        ) {
          const percent = val;
          const bulletLeft = percent;
          const fillWidth = percent;

          gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
          gsap.set(fill, {
            left: "0%",
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
          const percent = ((clientX - rect.left) / rect.width) * 100;
          const clamped = Math.round(Math.max(0, Math.min(100, percent)));

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
      "--sc-opacity-scroll-start",
      "left",
      0,
      100
    );
    const updateEnd = updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-opacity-scroll-end",
      "right",
      0,
      100
    );
    const updateEntry = updateField(
      entryBullet,
      entryFill,
      entryCount,
      "--sc-opacity-scroll-entry"
    );
    const updateCenter = updateField(
      centerBullet,
      centerFill,
      centerCount,
      "--sc-opacity-scroll-center"
    );
    const updateExit = updateField(
      exitBullet,
      exitFill,
      exitCount,
      "--sc-opacity-scroll-exit"
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

    updateEntry(getCurrentPercentage("--sc-opacity-scroll-entry"));
    updateCenter(getCurrentPercentage("--sc-opacity-scroll-center"));
    updateExit(getCurrentPercentage("--sc-opacity-scroll-exit"));

    makeDraggable(startBullet, updateStart, "start", 0, 100);
    makeDraggable(endBullet, updateEnd, "end", 0, 100);
    makeDraggable(entryBullet, updateEntry, "normal");
    makeDraggable(centerBullet, updateCenter, "normal");
    makeDraggable(exitBullet, updateExit, "normal");

    [
      {
        id: "opacity-button-advance-entry-reset",
        bullet: entryBullet,
        fill: entryFill,
        count: entryCount,
        css: "--sc-opacity-scroll-entry",
      },
      {
        id: "opacity-button-advance-center-reset",
        bullet: centerBullet,
        fill: centerFill,
        count: centerCount,
        css: "--sc-opacity-scroll-center",
      },
      {
        id: "opacity-button-advance-exit-reset",
        bullet: exitBullet,
        fill: exitFill,
        count: exitCount,
        css: "--sc-opacity-scroll-exit",
      },
    ].forEach(({ id, bullet, fill, count, css }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          updateField(bullet, fill, count, css)(0);
        };
      }
    });
    opacityattachAdvanceTimelineIncrementDecrement(
      updateEntry,
      updateCenter,
      updateExit
    );
    opacityattachCustomTimelineReset(
      updateStart,
      updateEnd,
      updateEntry,
      updateCenter,
      updateExit
    );
    opacityinitEffectAnimationDropdownToggle();
  }
  
  // Opacity



  // scale
  function scaleattachAdvanceTimelineIncrementDecrement(
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
        document.getElementById("scale-button-advance-entry-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getCenter = () => {
      const text =
        document.getElementById("scale-button-advance-center-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getExit = () => {
      const text =
        document.getElementById("scale-button-advance-exit-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    setup(
      "scale-button-advance-entry-increase",
      "scale-button-advance-entry-decrease",
      getEntry,
      updateEntry
    );
    setup(
      "scale-button-advance-center-increase",
      "scale-button-advance-center-decrease",
      getCenter,
      updateCenter
    );
    setup(
      "scale-button-advance-exit-increase",
      "scale-button-advance-exit-decrease",
      getExit,
      updateExit
    );
  }
  function scaleattachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  ) {
    const resetBtn = document.getElementById("scale-custom-timeline-reset");
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

  function scaleinitEffectAnimationDropdownToggle() {
    const arrow = document.getElementById("scale-effect-animation-type-arrow");
    const dropdown = document.getElementById(
      "scale-effect-animation-type-list"
    );
    const container = document.getElementById(
      "scale-effect-animation-dropdown-container"
    );
    const displayValue = document.getElementById(
      "scale-effect-animation-value"
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

  export function scaleinitButtonAdvanceStyles(getSelectedElement) {
    const startBullet = document.getElementById("scale-timeline-start-bullet");
    const endBullet = document.getElementById("scale-timeline-end-bullet");
    const startFill = document.getElementById("scale-timeline-start-fill");
    const endFill = document.getElementById("scale-timeline-end-fill");
    const startValue = document.getElementById("scale-timelineStartValue");
    const endValue = document.getElementById("scale-timelineEndValue");

    const entryBullet = document.getElementById(
      "scale-button-advance-entry-bullet"
    );
    const entryFill = document.getElementById(
      "scale-button-advance-entry-fill"
    );
    const entryCount = document.getElementById(
      "scale-button-advance-entry-count"
    );

    const centerBullet = document.getElementById(
      "scale-button-advance-center-bullet"
    );
    const centerFill = document.getElementById(
      "scale-button-advance-center-fill"
    );
    const centerCount = document.getElementById(
      "scale-button-advance-center-count"
    );

    const exitBullet = document.getElementById(
      "scale-button-advance-exit-bullet"
    );
    const exitFill = document.getElementById("scale-button-advance-exit-fill");
    const exitCount = document.getElementById(
      "scale-button-advance-exit-count"
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
            "--sc-scale-scroll-entry",
            "--sc-scale-scroll-center",
            "--sc-scale-scroll-exit",
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
      "--sc-scale-scroll-start",
      "left",
      0,
      100
    );
    const updateEnd = updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-scale-scroll-end",
      "right",
      0,
      100
    );
    const updateEntry = updateField(
      entryBullet,
      entryFill,
      entryCount,
      "--sc-scale-scroll-entry"
    );
    const updateCenter = updateField(
      centerBullet,
      centerFill,
      centerCount,
      "--sc-scale-scroll-center"
    );
    const updateExit = updateField(
      exitBullet,
      exitFill,
      exitCount,
      "--sc-scale-scroll-exit"
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

    updateEntry(getCurrentPercentage("--sc-scale-scroll-entry"));
    updateCenter(getCurrentPercentage("--sc-scale-scroll-center"));
    updateExit(getCurrentPercentage("--sc-scale-scroll-exit"));

    makeDraggable(startBullet, updateStart, "start", 0, 100);
    makeDraggable(endBullet, updateEnd, "end", 0, 100);
    makeDraggable(entryBullet, updateEntry, "normal");
    makeDraggable(centerBullet, updateCenter, "normal");
    makeDraggable(exitBullet, updateExit, "normal");

    [
      {
        id: "scale-button-advance-entry-reset",
        bullet: entryBullet,
        fill: entryFill,
        count: entryCount,
        css: "--sc-scale-scroll-entry",
      },
      {
        id: "scale-button-advance-center-reset",
        bullet: centerBullet,
        fill: centerFill,
        count: centerCount,
        css: "--sc-scale-scroll-center",
      },
      {
        id: "scale-button-advance-exit-reset",
        bullet: exitBullet,
        fill: exitFill,
        count: exitCount,
        css: "--sc-scale-scroll-exit",
      },
    ].forEach(({ id, bullet, fill, count, css }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          updateField(bullet, fill, count, css)(0);
        };
      }
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
    scaleinitEffectAnimationDropdownToggle();
  }
  
  // scale



  // rotate
  function rotateattachAdvanceTimelineIncrementDecrement(
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
        document.getElementById("rotate-button-advance-entry-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getCenter = () => {
      const text =
        document.getElementById("rotate-button-advance-center-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getExit = () => {
      const text =
        document.getElementById("rotate-button-advance-exit-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    setup(
      "rotate-button-advance-entry-increase",
      "rotate-button-advance-entry-decrease",
      getEntry,
      updateEntry
    );
    setup(
      "rotate-button-advance-center-increase",
      "rotate-button-advance-center-decrease",
      getCenter,
      updateCenter
    );
    setup(
      "rotate-button-advance-exit-increase",
      "rotate-button-advance-exit-decrease",
      getExit,
      updateExit
    );
  }
  function rotateattachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  ) {
    const resetBtn = document.getElementById("rotate-custom-timeline-reset");
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

  function rotateinitEffectAnimationDropdownToggle() {
    const arrow = document.getElementById("rotate-effect-animation-type-arrow");
    const dropdown = document.getElementById(
      "rotate-effect-animation-type-list"
    );
    const container = document.getElementById(
      "rotate-effect-animation-dropdown-container"
    );
    const displayValue = document.getElementById(
      "rotate-effect-animation-value"
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

  export function rotateinitButtonAdvanceStyles(getSelectedElement) {
    const startBullet = document.getElementById("rotate-timeline-start-bullet");
    const endBullet = document.getElementById("rotate-timeline-end-bullet");
    const startFill = document.getElementById("rotate-timeline-start-fill");
    const endFill = document.getElementById("rotate-timeline-end-fill");
    const startValue = document.getElementById("rotate-timelineStartValue");
    const endValue = document.getElementById("rotate-timelineEndValue");

    const entryBullet = document.getElementById(
      "rotate-button-advance-entry-bullet"
    );
    const entryFill = document.getElementById(
      "rotate-button-advance-entry-fill"
    );
    const entryCount = document.getElementById(
      "rotate-button-advance-entry-count"
    );

    const centerBullet = document.getElementById(
      "rotate-button-advance-center-bullet"
    );
    const centerFill = document.getElementById(
      "rotate-button-advance-center-fill"
    );
    const centerCount = document.getElementById(
      "rotate-button-advance-center-count"
    );

    const exitBullet = document.getElementById(
      "rotate-button-advance-exit-bullet"
    );
    const exitFill = document.getElementById("rotate-button-advance-exit-fill");
    const exitCount = document.getElementById(
      "rotate-button-advance-exit-count"
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
            "--sc-rotate-scroll-entry",
            "--sc-rotate-scroll-center",
            "--sc-rotate-scroll-exit",
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
            transform: `rotateX(${(100 - val) / 100})`,
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
      "--sc-rotate-scroll-start",
      "left",
      0,
      100
    );
    const updateEnd = updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-rotate-scroll-end",
      "right",
      0,
      100
    );
    const updateEntry = updateField(
      entryBullet,
      entryFill,
      entryCount,
      "--sc-rotate-scroll-entry"
    );
    const updateCenter = updateField(
      centerBullet,
      centerFill,
      centerCount,
      "--sc-rotate-scroll-center"
    );
    const updateExit = updateField(
      exitBullet,
      exitFill,
      exitCount,
      "--sc-rotate-scroll-exit"
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

    updateEntry(getCurrentPercentage("--sc-rotate-scroll-entry"));
    updateCenter(getCurrentPercentage("--sc-rotate-scroll-center"));
    updateExit(getCurrentPercentage("--sc-rotate-scroll-exit"));

    makeDraggable(startBullet, updateStart, "start", 0, 100);
    makeDraggable(endBullet, updateEnd, "end", 0, 100);
    makeDraggable(entryBullet, updateEntry, "normal");
    makeDraggable(centerBullet, updateCenter, "normal");
    makeDraggable(exitBullet, updateExit, "normal");

    [
      {
        id: "rotate-button-advance-entry-reset",
        bullet: entryBullet,
        fill: entryFill,
        count: entryCount,
        css: "--sc-rotate-scroll-entry",
      },
      {
        id: "rotate-button-advance-center-reset",
        bullet: centerBullet,
        fill: centerFill,
        count: centerCount,
        css: "--sc-rotate-scroll-center",
      },
      {
        id: "rotate-button-advance-exit-reset",
        bullet: exitBullet,
        fill: exitFill,
        count: exitCount,
        css: "--sc-rotate-scroll-exit",
      },
    ].forEach(({ id, bullet, fill, count, css }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          updateField(bullet, fill, count, css)(0);
        };
      }
    });
    rotateattachAdvanceTimelineIncrementDecrement(
      updateEntry,
      updateCenter,
      updateExit
    );
    rotateattachCustomTimelineReset(
      updateStart,
      updateEnd,
      updateEntry,
      updateCenter,
      updateExit
    );
    rotateinitEffectAnimationDropdownToggle();
  }
  
  // rotate


  // blur
  function blurattachAdvanceTimelineIncrementDecrement(
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
        document.getElementById("blur-button-advance-entry-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getCenter = () => {
      const text =
        document.getElementById("blur-button-advance-center-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    const getExit = () => {
      const text =
        document.getElementById("blur-button-advance-exit-count")
          ?.textContent || "0%";
      return parseInt(text.replace("%", "")) || 0;
    };

    setup(
      "blur-button-advance-entry-increase",
      "blur-button-advance-entry-decrease",
      getEntry,
      updateEntry
    );
    setup(
      "blur-button-advance-center-increase",
      "blur-button-advance-center-decrease",
      getCenter,
      updateCenter
    );
    setup(
      "blur-button-advance-exit-increase",
      "blur-button-advance-exit-decrease",
      getExit,
      updateExit
    );
  }
  function blurattachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  ) {
    const resetBtn = document.getElementById("blur-custom-timeline-reset");
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

  function blurinitEffectAnimationDropdownToggle() {
    const arrow = document.getElementById("blur-effect-animation-type-arrow");
    const dropdown = document.getElementById("blur-effect-animation-type-list");
    const container = document.getElementById(
      "blur-effect-animation-dropdown-container"
    );
    const displayValue = document.getElementById("blur-effect-animation-value");

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

  export function blurinitButtonAdvanceStyles(getSelectedElement) {
    const startBullet = document.getElementById("blur-timeline-start-bullet");
    const endBullet = document.getElementById("blur-timeline-end-bullet");
    const startFill = document.getElementById("blur-timeline-start-fill");
    const endFill = document.getElementById("blur-timeline-end-fill");
    const startValue = document.getElementById("blur-timelineStartValue");
    const endValue = document.getElementById("blur-timelineEndValue");

    const entryBullet = document.getElementById(
      "blur-button-advance-entry-bullet"
    );
    const entryFill = document.getElementById("blur-button-advance-entry-fill");
    const entryCount = document.getElementById(
      "blur-button-advance-entry-count"
    );

    const centerBullet = document.getElementById(
      "blur-button-advance-center-bullet"
    );
    const centerFill = document.getElementById(
      "blur-button-advance-center-fill"
    );
    const centerCount = document.getElementById(
      "blur-button-advance-center-count"
    );

    const exitBullet = document.getElementById(
      "blur-button-advance-exit-bullet"
    );
    const exitFill = document.getElementById("blur-button-advance-exit-fill");
    const exitCount = document.getElementById("blur-button-advance-exit-count");

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
            "--sc-blur-scroll-entry",
            "--sc-blur-scroll-center",
            "--sc-blur-scroll-exit",
          ].includes(cssVar)
        ) {
          const percent = val;
          const bulletLeft = percent;
          const fillWidth = percent;

          gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
          gsap.set(fill, {
            left: "0%",
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
      min = 0,
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
      "--sc-blur-scroll-start",
      "left",
      0,
      100
    );
    const updateEnd = updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-blur-scroll-end",
      "right",
      0,
      100
    );
    const updateEntry = updateField(
      entryBullet,
      entryFill,
      entryCount,
      "--sc-blur-scroll-entry"
    );
    const updateCenter = updateField(
      centerBullet,
      centerFill,
      centerCount,
      "--sc-blur-scroll-center"
    );
    const updateExit = updateField(
      exitBullet,
      exitFill,
      exitCount,
      "--sc-blur-scroll-exit"
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

    updateEntry(getCurrentPercentage("--sc-blur-scroll-entry"));
    updateCenter(getCurrentPercentage("--sc-blur-scroll-center"));
    updateExit(getCurrentPercentage("--sc-blur-scroll-exit"));

    makeDraggable(startBullet, updateStart, "start", 0, 100);
    makeDraggable(endBullet, updateEnd, "end", 0, 100);
    makeDraggable(entryBullet, updateEntry, "normal");
    makeDraggable(centerBullet, updateCenter, "normal");
    makeDraggable(exitBullet, updateExit, "normal");

    [
      {
        id: "blur-button-advance-entry-reset",
        bullet: entryBullet,
        fill: entryFill,
        count: entryCount,
        css: "--sc-blur-scroll-entry",
      },
      {
        id: "blur-button-advance-center-reset",
        bullet: centerBullet,
        fill: centerFill,
        count: centerCount,
        css: "--sc-blur-scroll-center",
      },
      {
        id: "blur-button-advance-exit-reset",
        bullet: exitBullet,
        fill: exitFill,
        count: exitCount,
        css: "--sc-blur-scroll-exit",
      },
    ].forEach(({ id, bullet, fill, count, css }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          updateField(bullet, fill, count, css)(0);
        };
      }
    });
    blurattachAdvanceTimelineIncrementDecrement(
      updateEntry,
      updateCenter,
      updateExit
    );
    blurattachCustomTimelineReset(
      updateStart,
      updateEnd,
      updateEntry,
      updateCenter,
      updateExit
    );
    blurinitEffectAnimationDropdownToggle();
  }
  
  // blur