export function attachAdvanceTimelineIncrementDecrement(
  updateEntry,
  updateCenter,
  updateExit,
  updateStart,
  updateEnd
) {
  let lastFocused = null;
  let keyHoldInterval = null;
  let keyHoldTimeout = null;
  let lastPressedKey = null;

  let entryVal = 0;
  let centerVal = 0;
  let exitVal = 0;
  let startVal = 0;
  let endVal = 0;

  function setup(idIncrease, idDecrease, getCurrent, updateFn, bulletId) {
    const btnInc = document.getElementById(idIncrease);
    const btnDec = document.getElementById(idDecrease);

    const clickHandler = (type) => {
      let val = getCurrent();
      val = type === "inc" ? val + 1 : val - 1;

      const min =
        bulletId.includes("entry") ||
        bulletId.includes("center") ||
        bulletId.includes("exit")
          ? -100
          : 0;

      if (bulletId.includes("start")) {
        val = Math.max(0, Math.min(val, endVal - 4));
        startVal = val;
      } else if (bulletId.includes("end")) {
        val = Math.max(startVal + 4, Math.min(val, 100));
        endVal = val;
      } else {
        val = Math.max(min, Math.min(100, val));
      }

      updateFn(val);
      const countId = bulletId.replace(
        "bullet",
        bulletId.includes("start") || bulletId.includes("end")
          ? "Value"
          : "count"
      );
      document.getElementById(countId).textContent = val + "%";
    };

    if (btnInc) btnInc.onclick = () => clickHandler("inc");
    if (btnDec) btnDec.onclick = () => clickHandler("dec");

    const bullet = document.getElementById(bulletId);
    if (bullet) {
      bullet.setAttribute("tabindex", "0");
      bullet.addEventListener("click", () => (lastFocused = bulletId));
      bullet.addEventListener("focus", () => {
        lastFocused = bulletId;
        const val = getCurrent();
        if (bulletId.includes("entry")) entryVal = val;
        if (bulletId.includes("center")) centerVal = val;
        if (bulletId.includes("exit")) exitVal = val;
        if (bulletId.includes("start")) startVal = val;
        if (bulletId.includes("end")) endVal = val;
      });
    }
  }

  const getVal = (id) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    const raw = el.tagName === "INPUT" ? el.value : el.textContent;
    return parseInt(raw.replace("%", "")) || 0;
  };

  setup(
    "Typo-vertical-advance-entry-increase",
    "Typo-vertical-advance-entry-decrease",
    () => getVal("Typo-vertical-advance-entry-count"),
    updateEntry,
    "Typo-vertical-advance-entry-bullet"
  );
  setup(
    "Typo-vertical-advance-center-increase",
    "Typo-vertical-advance-center-decrease",
    () => getVal("Typo-vertical-advance-center-count"),
    updateCenter,
    "Typo-vertical-advance-center-bullet"
  );
  setup(
    "Typo-vertical-advance-exit-increase",
    "Typo-vertical-advance-exit-decrease",
    () => getVal("Typo-vertical-advance-exit-count"),
    updateExit,
    "Typo-vertical-advance-exit-bullet"
  );
  setup(
    "Typo-vertical-timeline-start-increase",
    "Typo-vertical-timeline-start-decrease",
    () => getVal("Typo-vertical-timelineStartValue"),
    updateStart,
    "Typo-vertical-timeline-start-bullet"
  );
  setup(
    "Typo-vertical-timeline-end-increase",
    "Typo-vertical-timeline-end-decrease",
    () => getVal("Typo-vertical-timelineEndValue"),
    updateEnd,
    "Typo-vertical-timeline-end-bullet"
  );

  document.addEventListener("keydown", (e) => { 
    if (!lastFocused || (e.key !== "ArrowRight" && e.key !== "ArrowLeft"))
      return;
    if (keyHoldInterval || keyHoldTimeout) return;

    const direction = e.key === "ArrowRight" ? 1 : -1;
    lastPressedKey = e.key;

    const update = () => {
      if (lastFocused.includes("entry")) {
        entryVal = Math.max(-100, Math.min(100, entryVal + direction));
        updateEntry(entryVal);
        document.getElementById("Typo-vertical-advance-entry-count").value =
          entryVal + "%";
      }
      if (lastFocused.includes("center")) {
        centerVal = Math.max(-100, Math.min(100, centerVal + direction));
        updateCenter(centerVal);
        document.getElementById("Typo-vertical-advance-center-count").value =
          centerVal + "%";
      }
      if (lastFocused.includes("exit")) {
        exitVal = Math.max(-100, Math.min(100, exitVal + direction));
        updateExit(exitVal);
        document.getElementById("Typo-vertical-advance-exit-count").value =
          exitVal + "%";
      }
      if (lastFocused.includes("start")) {
        startVal = getVal("Typo-vertical-timelineStartValue");
        endVal = getVal("Typo-vertical-timelineEndValue");
        startVal += direction;
        startVal = Math.max(0, Math.min(startVal, endVal - 4));

        updateStart(startVal);
        document.getElementById(
          "Typo-vertical-timelineStartValue"
        ).textContent = startVal + "%";
      }
      if (lastFocused.includes("end")) {
        startVal = getVal("Typo-vertical-timelineStartValue");
        endVal = getVal("Typo-vertical-timelineEndValue");
       endVal += direction;
       endVal = Math.max(startVal + 4, Math.min(endVal, 100));

        updateEnd(endVal);
        document.getElementById("Typo-vertical-timelineEndValue").textContent =
          endVal + "%";
      }
    };

    update();
    keyHoldTimeout = setTimeout(() => {
      keyHoldInterval = setInterval(update, 100);
    }, 300);
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === lastPressedKey) {
      clearInterval(keyHoldInterval);
      clearTimeout(keyHoldTimeout);
      keyHoldInterval = null;
      keyHoldTimeout = null;
      lastPressedKey = null;
    }
  });
}


function attachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const btn = document.getElementById("Typo-vertical-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

export function initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById(
    "Typo-vertical-effect-animation-type-arrow"
  );
  const list = document.getElementById(
    "Typo-vertical-effect-animation-type-list"
  );
  const display = document.getElementById(
    "Typo-vertical-effect-animation-value"
  );

  if (!arrow || !list || !display) return;

  arrow.onclick = () => {
    list.classList.toggle("sc-hidden");
  };

  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const selected = item.getAttribute("data-value");
      display.textContent = item.textContent;
      display.setAttribute("data-value", selected);

      // Optional: save animation effect to style property of selected element
      const el =
        typeof getSelectedElement === "function" ? getSelectedElement() : null;
      if (el && el.id?.startsWith("block-")) {
        el.querySelector(".sqs-block-content")?.style.setProperty(
          "--sc-Typo-vertical-effect-animation",
          selected
        );
      }

      list.classList.add("sc-hidden");
    };
  });

  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("sc-hidden");
    }
  });
}

export function initTypoAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById(
    "Typo-vertical-timeline-start-bullet"
  );
  const endBullet = document.getElementById(
    "Typo-vertical-timeline-end-bullet"
  );
  const startFill = document.getElementById(
    "Typo-vertical-timeline-start-fill"
  );
  const endFill = document.getElementById("Typo-vertical-timeline-end-fill");
  const startValue = document.getElementById(
    "Typo-vertical-timelineStartValue"
  );
  const endValue = document.getElementById("Typo-vertical-timelineEndValue");

  const entryBullet = document.getElementById(
    "Typo-vertical-advance-entry-bullet"
  );
  const entryFill = document.getElementById("Typo-vertical-advance-entry-fill");
  const entryCount = document.getElementById(
    "Typo-vertical-advance-entry-count"
  );

  const centerBullet = document.getElementById(
    "Typo-vertical-advance-center-bullet"
  );
  const centerFill = document.getElementById(
    "Typo-vertical-advance-center-fill"
  );
  const centerCount = document.getElementById(
    "Typo-vertical-advance-center-count"
  );

  const exitBullet = document.getElementById(
    "Typo-vertical-advance-exit-bullet"
  );
  const exitFill = document.getElementById("Typo-vertical-advance-exit-fill");
  const exitCount = document.getElementById("Typo-vertical-advance-exit-count");

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
      if (countEl.tagName === "INPUT") {
        countEl.value = `${val}%`;
      } else {
        countEl.textContent = `${val}%`;
      }

      const el = getSelectedElement?.();
      const styleId = el?.id
        ? `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`
        : null;

      if (
        [
          "--sc-Typo-vertical-scroll-entry",
          "--sc-Typo-vertical-scroll-center",
          "--sc-Typo-vertical-scroll-exit",
        ].includes(cssVar)
      ) {
        const percent = (val + 100) / 2;
        const bulletLeft = percent;
        const fillLeft = val < 0 ? percent : 50;
        const fillWidth = Math.abs(val / 2);

        bullet.style.left = `${bulletLeft}%`;
        gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-Typo-theme-accent)",
        });

        if (cssVar === "--sc-Typo-vertical-scroll-entry") {
          document.getElementById(
            "Typo-vertical-custom-timeline-arrow"
          ).style.left = `${bulletLeft}%`;
        }

        initEffectAnimationDropdownToggle(getSelectedElement);
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        position === "left"
          ? gsap.set(fill, { width: `${val}%`, left: "0" })
          : gsap.set(fill, {
              left: "auto",
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

  const getCurrentPercentage = (cssVar) => {
    const el = getSelectedElement?.();
    if (!el) return 0;
    const contentEl = el.querySelector(".sqs-block-content");
    if (!contentEl) return 0;
    const val = getComputedStyle(contentEl).getPropertyValue(cssVar).trim();
    const parsed = parseFloat(val.replace("%", ""));
    if (isNaN(parsed)) {
      return cssVar === "--sc-Typo-vertical-scroll-end" ? 100 : 0;
    }
    return parsed;

  };

  let currentStartVal = getCurrentPercentage("--sc-Typo-vertical-scroll-start");
  let currentEndVal = getCurrentPercentage("--sc-Typo-vertical-scroll-end");

  const updateStart = (val) => {
    currentStartVal = Math.max(0, Math.min(val, currentEndVal - 4));
    updateField(
      startBullet,
      startFill,
      startValue,
      "--sc-Typo-vertical-scroll-start",
      "left",
      0,
      100
    )(currentStartVal);
  };

  const updateEnd = (val) => {
    currentEndVal = Math.max(currentStartVal + 4, Math.min(val, 100));
    updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-Typo-vertical-scroll-end",
      "right",
      0,
      100
    )(currentEndVal);
  };

  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-Typo-vertical-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-Typo-vertical-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-Typo-vertical-scroll-exit"
  );

 updateEntry(getCurrentPercentage("--sc-Typo-vertical-scroll-entry"));
 updateCenter(getCurrentPercentage("--sc-Typo-vertical-scroll-center"));
 updateExit(getCurrentPercentage("--sc-Typo-vertical-scroll-exit"));

 updateStart(currentStartVal);
 gsap.set(startBullet, { left: `${currentStartVal}%`, xPercent: -50 }); // ✅ force bullet visibility
 updateEnd(currentEndVal);



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
        let clamped = Math.round(percent);

        if (bullet === startBullet) {
          clamped = Math.max(0, Math.min(clamped, currentEndVal));
          currentStartVal = clamped; // ✅ Sync here
          updateStart(clamped);
        } else if (bullet === endBullet) {
          clamped = Math.max(currentStartVal + 4, Math.min(clamped, 100));
          currentEndVal = clamped; // ✅ Sync here
          updateEnd(clamped);
        } else {
          clamped = Math.max(min, Math.min(clamped, max));
          updateFn(clamped);
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener(
        "mouseup",
        () => document.removeEventListener("mousemove", onMouseMove),
        { once: true }
      );
    };
  };

  [
    { input: entryCount, fn: updateEntry },
    { input: centerCount, fn: updateCenter },
    { input: exitCount, fn: updateExit },
  ].forEach(({ input, fn }) => {
    input.addEventListener("input", (e) => {
      let val = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(val)) val = 0;
      val = Math.max(-100, Math.min(100, val));
      e.target.value = val + "%";
      fn(val);
    });
    input.addEventListener("blur", (e) => {
      let val = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(val)) val = 0;
      val = Math.max(-100, Math.min(100, val));
      e.target.value = val + "%";
      fn(val);
    });
   input.addEventListener("keydown", (e) => {
     const value = e.target.value;

     if (
       e.key === "Backspace" &&
       value.endsWith("%") &&
       e.target.selectionStart === value.length - 1
     ) {
       e.preventDefault();
       const numeric = parseInt(value.replace("%", "").trim()) || 0;
       const newVal = numeric.toString().slice(0, -1);
       e.target.value = (newVal || "0") + "%";
       fn(parseInt(newVal) || 0);
       return;
     }

     if (
       !/[0-9\-]/.test(e.key) &&
       !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
         e.key
       )
     ) {
       e.preventDefault();
     }
   });

    input.addEventListener("focus", (e) => {
      const val = parseInt(e.target.value.replace("%", "").trim()) || 0;
      e.target.value = val;
    });
  });

  makeDraggable(startBullet, updateStart, "start", 0, 100);
  makeDraggable(endBullet, updateEnd, "end", 0, 100);
  makeDraggable(entryBullet, updateEntry, "normal");
  makeDraggable(centerBullet, updateCenter, "normal");
  makeDraggable(exitBullet, updateExit, "normal");

  [
    {
      id: "Typo-vertical-advance-entry-reset",
      bullet: entryBullet,
      fill: entryFill,
      count: entryCount,
      css: "--sc-Typo-vertical-scroll-entry",
    },
    {
      id: "Typo-vertical-advance-center-reset",
      bullet: centerBullet,
      fill: centerFill,
      count: centerCount,
      css: "--sc-Typo-vertical-scroll-center",
    },
    {
      id: "Typo-vertical-advance-exit-reset",
      bullet: exitBullet,
      fill: exitFill,
      count: exitCount,
      css: "--sc-Typo-vertical-scroll-exit",
    },
  ].forEach(({ id, bullet, fill, count, css }) => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = () => updateField(bullet, fill, count, css)(0);
  });

  attachAdvanceTimelineIncrementDecrement(
    updateEntry,
    updateCenter,
    updateExit,
    updateStart,
    updateEnd
  );
  attachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  );
  initEffectAnimationDropdownToggle(startBullet, endBullet);

 
attachFieldClickListener(
  "Typo-vertical-advance-entry-field",
  entryBullet,
  entryCount,
  updateEntry
);
attachFieldClickListener(
  "Typo-vertical-advance-center-field",
  centerBullet,
  centerCount,
  updateCenter
);
attachFieldClickListener(
  "Typo-vertical-advance-exit-field",
  exitBullet,
  exitCount,
  updateExit
);

}
 function attachFieldClickListener(
   fieldId,
   bullet,
   countEl,
   updateFn,
   min = -100,
   max = 100
 ) {
   const field = document.getElementById(fieldId);
   if (!field || !bullet || !countEl) return;

   field.addEventListener("click", (e) => {
     const rect = field.getBoundingClientRect();
     const clickX = e.clientX - rect.left;
     const percent = (clickX / rect.width) * (max - min) + min;
     const clamped = Math.round(Math.max(min, Math.min(percent, max)));

     countEl.value = clamped + "%";
     updateFn(clamped);
   });
 }
//vertical donevertical done

function horizontalattachAdvanceTimelineIncrementDecrement(
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
    "Typo-horizontal-advance-entry-increase",
    "Typo-horizontal-advance-entry-decrease",
    () => getVal("Typo-horizontal-advance-entry-count"),
    updateEntry,
    "Typo-horizontal-advance-entry-bullet"
  );
  setup(
    "Typo-horizontal-advance-center-increase",
    "Typo-horizontal-advance-center-decrease",
    () => getVal("Typo-horizontal-advance-center-count"),
    updateCenter,
    "Typo-horizontal-advance-center-bullet"
  );
  setup(
    "Typo-horizontal-advance-exit-increase",
    "Typo-horizontal-advance-exit-decrease",
    () => getVal("Typo-horizontal-advance-exit-count"),
    updateExit,
    "Typo-horizontal-advance-exit-bullet"
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

function horizontalattachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const btn = document.getElementById("Typo-horizontal-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

function horizontalinitEffectAnimationDropdownToggle() {
  const arrow = document.getElementById(
    "Typo-horizontal-custom-timeline-arrow"
  );
  const start = document.getElementById(
    "Typo-horizontal-timeline-start-bullet"
  );
  const end = document.getElementById("Typo-horizontal-timeline-end-bullet");

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

export function horizontalinitTypoAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById(
    "Typo-horizontal-timeline-start-bullet"
  );
  const endBullet = document.getElementById(
    "Typo-horizontal-timeline-end-bullet"
  );
  const startFill = document.getElementById(
    "Typo-horizontal-timeline-start-fill"
  );
  const endFill = document.getElementById("Typo-horizontal-timeline-end-fill");
  const startValue = document.getElementById(
    "Typo-horizontal-timelineStartValue"
  );
  const endValue = document.getElementById("Typo-horizontal-timelineEndValue");

  const entryBullet = document.getElementById(
    "Typo-horizontal-advance-entry-bullet"
  );
  const entryFill = document.getElementById(
    "Typo-horizontal-advance-entry-fill"
  );
  const entryCount = document.getElementById(
    "Typo-horizontal-advance-entry-count"
  );

  const centerBullet = document.getElementById(
    "Typo-horizontal-advance-center-bullet"
  );
  const centerFill = document.getElementById(
    "Typo-horizontal-advance-center-fill"
  );
  const centerCount = document.getElementById(
    "Typo-horizontal-advance-center-count"
  );

  const exitBullet = document.getElementById(
    "Typo-horizontal-advance-exit-bullet"
  );
  const exitFill = document.getElementById("Typo-horizontal-advance-exit-fill");
  const exitCount = document.getElementById(
    "Typo-horizontal-advance-exit-count"
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

      const el = getSelectedElement?.();
      const styleId = el?.id
        ? `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`
        : null;

      if (
        [
          "--sc-Typo-horizontal-scroll-entry",
          "--sc-Typo-horizontal-scroll-center",
          "--sc-Typo-horizontal-scroll-exit",
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

        if (cssVar === "--sc-Typo-horizontal-scroll-entry") {
          document.getElementById(
            "Typo-horizontal-custom-timeline-arrow"
          ).style.left = `${bulletLeft}%`;
        }
        horizontalinitEffectAnimationDropdownToggle();
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        position === "left"
          ? gsap.set(fill, { width: `${val}%`, left: "0" })
          : gsap.set(fill, {
              left: "0",
              left: "auto",
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
    "--sc-Typo-horizontal-scroll-start",
    "left",
    0,
    100
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-Typo-horizontal-scroll-end",
    "right",
    0,
    100
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-Typo-horizontal-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-Typo-horizontal-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-Typo-horizontal-scroll-exit"
  );

  updateEntry(getCurrentPercentage("--sc-Typo-horizontal-scroll-entry"));
  updateCenter(getCurrentPercentage("--sc-Typo-horizontal-scroll-center"));
  updateExit(getCurrentPercentage("--sc-Typo-horizontal-scroll-exit"));

  makeDraggable(startBullet, updateStart, "start", 0, 100);
  makeDraggable(endBullet, updateEnd, "end", 0, 100);
  makeDraggable(entryBullet, updateEntry, "normal");
  makeDraggable(centerBullet, updateCenter, "normal");
  makeDraggable(exitBullet, updateExit, "normal");

  [
    {
      id: "Typo-horizontal-advance-entry-reset",
      bullet: entryBullet,
      fill: entryFill,
      count: entryCount,
      css: "--sc-Typo-horizontal-scroll-entry",
    },
    {
      id: "Typo-horizontal-advance-center-reset",
      bullet: centerBullet,
      fill: centerFill,
      count: centerCount,
      css: "--sc-Typo-horizontal-scroll-center",
    },
    {
      id: "Typo-horizontal-advance-exit-reset",
      bullet: exitBullet,
      fill: exitFill,
      count: exitCount,
      css: "--sc-Typo-horizontal-scroll-exit",
    },
  ].forEach(({ id, bullet, fill, count, css }) => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = () => updateField(bullet, fill, count, css)(0);
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
  horizontalinitEffectAnimationDropdownToggle(startBullet, endBullet);
}

//

function opacityattachAdvanceTimelineIncrementDecrement(
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
    "Typo-opacity-advance-entry-increase",
    "Typo-opacity-advance-entry-decrease",
    () => getVal("Typo-opacity-advance-entry-count"),
    updateEntry,
    "Typo-opacity-advance-entry-bullet"
  );
  setup(
    "Typo-opacity-advance-center-increase",
    "Typo-opacity-advance-center-decrease",
    () => getVal("Typo-opacity-advance-center-count"),
    updateCenter,
    "Typo-opacity-advance-center-bullet"
  );
  setup(
    "Typo-opacity-advance-exit-increase",
    "Typo-opacity-advance-exit-decrease",
    () => getVal("Typo-opacity-advance-exit-count"),
    updateExit,
    "Typo-opacity-advance-exit-bullet"
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

function opacityattachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const btn = document.getElementById("Typo-opacity-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

function opacityinitEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("Typo-opacity-custom-timeline-arrow");
  const start = document.getElementById("Typo-opacity-timeline-start-bullet");
  const end = document.getElementById("Typo-opacity-timeline-end-bullet");

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

export function opacityinitTypoAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById(
    "Typo-opacity-timeline-start-bullet"
  );
  const endBullet = document.getElementById("Typo-opacity-timeline-end-bullet");
  const startFill = document.getElementById("Typo-opacity-timeline-start-fill");
  const endFill = document.getElementById("Typo-opacity-timeline-end-fill");
  const startValue = document.getElementById("Typo-opacity-timelineStartValue");
  const endValue = document.getElementById("Typo-opacity-timelineEndValue");

  const entryBullet = document.getElementById(
    "Typo-opacity-advance-entry-bullet"
  );
  const entryFill = document.getElementById("Typo-opacity-advance-entry-fill");
  const entryCount = document.getElementById(
    "Typo-opacity-advance-entry-count"
  );

  const centerBullet = document.getElementById(
    "Typo-opacity-advance-center-bullet"
  );
  const centerFill = document.getElementById(
    "Typo-opacity-advance-center-fill"
  );
  const centerCount = document.getElementById(
    "Typo-opacity-advance-center-count"
  );

  const exitBullet = document.getElementById(
    "Typo-opacity-advance-exit-bullet"
  );
  const exitFill = document.getElementById("Typo-opacity-advance-exit-fill");
  const exitCount = document.getElementById("Typo-opacity-advance-exit-count");

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
      val = Math.max(0, Math.min(100, val));
      countEl.textContent = `${val}%`;

      const el = getSelectedElement?.();
      const styleId = el?.id
        ? `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`
        : null;

      if (
        [
          "--sc-Typo-opacity-scroll-entry",
          "--sc-Typo-opacity-scroll-center",
          "--sc-Typo-opacity-scroll-exit",
        ].includes(cssVar)
      ) {
        const bulletLeft = val; // from 0 to 100
        const fillLeft = 0;
        const fillWidth = val;

        bullet.style.left = `${bulletLeft}%`; // sync
        gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-Typo-theme-accent)",
        });

        if (cssVar === "--sc-Typo-opacity-scroll-entry") {
          document.getElementById(
            "Typo-opacity-custom-timeline-arrow"
          ).style.left = `${bulletLeft}%`;
        }
        opacityinitEffectAnimationDropdownToggle();
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        position === "left"
          ? gsap.set(fill, { width: `${val}%`, left: "0" })
          : gsap.set(fill, {
              left: "0",
              right: "auto",
              duration: 0.3,
              ease: transition.ease,
              opacity: Math.max(0, Math.min(1, finalY)),
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
    "--sc-Typo-opacity-scroll-start",
    "left",
    0,
    100
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-Typo-opacity-scroll-end",
    "right",
    0,
    100
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-Typo-opacity-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-Typo-opacity-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-Typo-opacity-scroll-exit"
  );

  updateEntry(getCurrentPercentage("--sc-Typo-opacity-scroll-entry"));
  updateCenter(getCurrentPercentage("--sc-Typo-opacity-scroll-center"));
  updateExit(getCurrentPercentage("--sc-Typo-opacity-scroll-exit"));

  makeDraggable(startBullet, updateStart, "start", 0, 100);
  makeDraggable(endBullet, updateEnd, "end", 0, 100);
  makeDraggable(entryBullet, updateEntry, "normal");
  makeDraggable(centerBullet, updateCenter, "normal");
  makeDraggable(exitBullet, updateExit, "normal");

  [
    {
      id: "Typo-opacity-advance-entry-reset",
      bullet: entryBullet,
      fill: entryFill,
      count: entryCount,
      css: "--sc-Typo-opacity-scroll-entry",
    },
    {
      id: "Typo-opacity-advance-center-reset",
      bullet: centerBullet,
      fill: centerFill,
      count: centerCount,
      css: "--sc-Typo-opacity-scroll-center",
    },
    {
      id: "Typo-opacity-advance-exit-reset",
      bullet: exitBullet,
      fill: exitFill,
      count: exitCount,
      css: "--sc-Typo-opacity-scroll-exit",
    },
  ].forEach(({ id, bullet, fill, count, css }) => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = () => updateField(bullet, fill, count, css)(0);
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
  opacityinitEffectAnimationDropdownToggle(startBullet, endBullet);
}

//

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
  const endBullet = document.getElementById("Typo-scale-timeline-end-bullet");
  const startFill = document.getElementById("Typo-scale-timeline-start-fill");
  const endFill = document.getElementById("Typo-scale-timeline-end-fill");
  const startValue = document.getElementById("Typo-scale-timelineStartValue");
  const endValue = document.getElementById("Typo-scale-timelineEndValue");

  const entryBullet = document.getElementById(
    "Typo-scale-advance-entry-bullet"
  );
  const entryFill = document.getElementById("Typo-scale-advance-entry-fill");
  const entryCount = document.getElementById("Typo-scale-advance-entry-count");

  const centerBullet = document.getElementById(
    "Typo-scale-advance-center-bullet"
  );
  const centerFill = document.getElementById("Typo-scale-advance-center-fill");
  const centerCount = document.getElementById(
    "Typo-scale-advance-center-count"
  );

  const exitBullet = document.getElementById("Typo-scale-advance-exit-bullet");
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

//

function rotateattachAdvanceTimelineIncrementDecrement(
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
    "Typo-rotate-advance-entry-increase",
    "Typo-rotate-advance-entry-decrease",
    () => getVal("Typo-rotate-advance-entry-count"),
    updateEntry,
    "Typo-rotate-advance-entry-bullet"
  );
  setup(
    "Typo-rotate-advance-center-increase",
    "Typo-rotate-advance-center-decrease",
    () => getVal("Typo-rotate-advance-center-count"),
    updateCenter,
    "Typo-rotate-advance-center-bullet"
  );
  setup(
    "Typo-rotate-advance-exit-increase",
    "Typo-rotate-advance-exit-decrease",
    () => getVal("Typo-rotate-advance-exit-count"),
    updateExit,
    "Typo-rotate-advance-exit-bullet"
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

function rotateattachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const btn = document.getElementById("Typo-rotate-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

function rotateinitEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("Typo-rotate-custom-timeline-arrow");
  const start = document.getElementById("Typo-rotate-timeline-start-bullet");
  const end = document.getElementById("Typo-rotate-timeline-end-bullet");

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

export function rotateinitTypoAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById(
    "Typo-rotate-timeline-start-bullet"
  );
  const endBullet = document.getElementById("Typo-rotate-timeline-end-bullet");
  const startFill = document.getElementById("Typo-rotate-timeline-start-fill");
  const endFill = document.getElementById("Typo-rotate-timeline-end-fill");
  const startValue = document.getElementById("Typo-rotate-timelineStartValue");
  const endValue = document.getElementById("Typo-rotate-timelineEndValue");

  const entryBullet = document.getElementById(
    "Typo-rotate-advance-entry-bullet"
  );
  const entryFill = document.getElementById("Typo-rotate-advance-entry-fill");
  const entryCount = document.getElementById("Typo-rotate-advance-entry-count");

  const centerBullet = document.getElementById(
    "Typo-rotate-advance-center-bullet"
  );
  const centerFill = document.getElementById("Typo-rotate-advance-center-fill");
  const centerCount = document.getElementById(
    "Typo-rotate-advance-center-count"
  );

  const exitBullet = document.getElementById("Typo-rotate-advance-exit-bullet");
  const exitFill = document.getElementById("Typo-rotate-advance-exit-fill");
  const exitCount = document.getElementById("Typo-rotate-advance-exit-count");

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
          "--sc-Typo-rotate-scroll-entry",
          "--sc-Typo-rotate-scroll-center",
          "--sc-Typo-rotate-scroll-exit",
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

        if (cssVar === "--sc-Typo-rotate-scroll-entry") {
          document.getElementById(
            "Typo-rotate-custom-timeline-arrow"
          ).style.left = `${bulletLeft}%`;
        }
        rotateinitEffectAnimationDropdownToggle();
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        position === "left"
          ? gsap.set(fill, { width: `${val}%`, left: "0" })
          : gsap.set(fill, {
              left: "0",
              transform: `rotateX(${(100 - val) / 100})`,
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
    "--sc-Typo-rotate-scroll-start",
    "left",
    0,
    100
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-Typo-rotate-scroll-end",
    "right",
    0,
    100
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-Typo-rotate-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-Typo-rotate-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-Typo-rotate-scroll-exit"
  );

  updateEntry(getCurrentPercentage("--sc-Typo-rotate-scroll-entry"));
  updateCenter(getCurrentPercentage("--sc-Typo-rotate-scroll-center"));
  updateExit(getCurrentPercentage("--sc-Typo-rotate-scroll-exit"));

  makeDraggable(startBullet, updateStart, "start", 0, 100);
  makeDraggable(endBullet, updateEnd, "end", 0, 100);
  makeDraggable(entryBullet, updateEntry, "normal");
  makeDraggable(centerBullet, updateCenter, "normal");
  makeDraggable(exitBullet, updateExit, "normal");

  [
    {
      id: "Typo-rotate-advance-entry-reset",
      bullet: entryBullet,
      fill: entryFill,
      count: entryCount,
      css: "--sc-Typo-rotate-scroll-entry",
    },
    {
      id: "Typo-rotate-advance-center-reset",
      bullet: centerBullet,
      fill: centerFill,
      count: centerCount,
      css: "--sc-Typo-rotate-scroll-center",
    },
    {
      id: "Typo-rotate-advance-exit-reset",
      bullet: exitBullet,
      fill: exitFill,
      count: exitCount,
      css: "--sc-Typo-rotate-scroll-exit",
    },
  ].forEach(({ id, bullet, fill, count, css }) => {
    const btn = document.getElementById(id);
    if (btn) btn.onclick = () => updateField(bullet, fill, count, css)(0);
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
  rotateinitEffectAnimationDropdownToggle(startBullet, endBullet);
}
