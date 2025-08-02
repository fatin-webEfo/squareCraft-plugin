export function opacityattachAdvanceTimelineIncrementDecrement(
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

      const min = 0;



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
  setup(
    "Typo-opacity-timeline-start-increase",
    "Typo-opacity-timeline-start-decrease",
    () => getVal("Typo-opacity-timelineStartValue"),
    updateStart,
    "Typo-opacity-timeline-start-bullet"
  );
  setup(
    "Typo-opacity-timeline-end-increase",
    "Typo-opacity-timeline-end-decrease",
    () => getVal("Typo-opacity-timelineEndValue"),
    updateEnd,
    "Typo-opacity-timeline-end-bullet"
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
        document.getElementById("Typo-opacity-advance-entry-count").value =
          entryVal + "%";
      }
      if (lastFocused.includes("center")) {
        centerVal = Math.max(-100, Math.min(100, centerVal + direction));
        updateCenter(centerVal);
        document.getElementById("Typo-opacity-advance-center-count").value =
          centerVal + "%";
      }
      if (lastFocused.includes("exit")) {
        exitVal = Math.max(-100, Math.min(100, exitVal + direction));
        updateExit(exitVal);
        document.getElementById("Typo-opacity-advance-exit-count").value =
          exitVal + "%";
      }
      if (lastFocused.includes("start")) {
        startVal = getVal("Typo-opacity-timelineStartValue");
        endVal = getVal("Typo-opacity-timelineEndValue");
        startVal += direction;
        startVal = Math.max(0, Math.min(startVal, endVal - 4));

        updateStart(startVal);
        document.getElementById(
          "Typo-opacity-timelineStartValue"
        ).textContent = startVal + "%";
      }
      if (lastFocused.includes("end")) {
        startVal = getVal("Typo-opacity-timelineStartValue");
        endVal = getVal("Typo-opacity-timelineEndValue");
        endVal += direction;
        endVal = Math.max(startVal + 4, Math.min(endVal, 100));

        updateEnd(endVal);
        document.getElementById("Typo-opacity-timelineEndValue").textContent =
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

export function opacityinitEffectAnimationDropdownToggle(getSelectedElement) {
  const arrow = document.getElementById(
    "Typo-opacity-effect-animation-type-arrow"
  );
  const list = document.getElementById(
    "Typo-opacity-effect-animation-type-list"
  );
  const display = document.getElementById(
    "Typo-opacity-effect-animation-value"
  );

  if (!arrow || !list || !display) return;

  const setEasePreview = (easeValue, el) => {
    const content = el?.querySelector(".sqs-block-content");
    if (!content) return;

    gsap.killTweensOf(content);

    if (easeValue === "none") {
      gsap.set(content, { y: "0vh" });
      return;
    }

    const gsapEase =
      easeValue === "linear" ? "none" : easeValue.replace("-", ".");
    window.__typoScrollEase = gsapEase;

    gsap.fromTo(
      content,
      { y: "10vh" },
      {
        y: "0vh",
        duration: 1,
        ease: gsapEase,
      }
    );
  };

  arrow.onclick = () => {
    list.classList.toggle("sc-hidden");
  };

  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const easeValue = item.getAttribute("data-value");
      const label = item.textContent;

      display.textContent = label;
      display.setAttribute("data-value", easeValue);
      list.classList.add("sc-hidden");

      const el = getSelectedElement?.();
      if (!el) return;

      setEasePreview(easeValue, el);
    };
  });

  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("sc-hidden");
    }
  });

  const el = getSelectedElement?.();
  const currentEase = display.getAttribute("data-value");
  if (currentEase && el) {
    setEasePreview(currentEase, el);
  }
}

export function opacityinitTypoAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById(
    "Typo-opacity-timeline-start-bullet"
  );
  const endBullet = document.getElementById(
    "Typo-opacity-timeline-end-bullet"
  );
  const startFill = document.getElementById(
    "Typo-opacity-timeline-start-fill"
  );
  const endFill = document.getElementById("Typo-opacity-timeline-end-fill");
  const startValue = document.getElementById(
    "Typo-opacity-timelineStartValue"
  );
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
          "--sc-Typo-opacity-scroll-entry",
          "--sc-Typo-opacity-scroll-center",
          "--sc-Typo-opacity-scroll-exit",
        ].includes(cssVar)
      ) {
       const bulletLeft = val;
       const fillLeft = 0;
       const fillWidth = val;


        bullet.style.left = `${bulletLeft}%`;
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

        opacityinitEffectAnimationDropdownToggle(getSelectedElement);
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        if (position === "left") {
          gsap.set(fill, { width: `${val}%`, left: "0" });
        } else if (position === "right") {
          const width = 100 - val;
          gsap.set(fill, {
            width: `${width}%`,
            left: `${val}%`,
            backgroundColor: "#F6B67B",
          });
        }
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
      return 100;
    }

    return parsed;
  };

  let currentStartVal = getCurrentPercentage("--sc-Typo-opacity-scroll-start");
  let currentEndVal = getCurrentPercentage("--sc-Typo-opacity-scroll-end");

  const updateStart = (val) => {
    currentStartVal = Math.max(0, Math.min(val, currentEndVal - 4));
    updateField(
      startBullet,
      startFill,
      startValue,
      "--sc-Typo-opacity-scroll-start",
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
      "--sc-Typo-opacity-scroll-end",
      "right",
      0,
      100
    )(currentEndVal);
  };

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
    updateExit,
    updateStart,
    updateEnd
  );
  opacityattachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  );
  opacityinitEffectAnimationDropdownToggle(getSelectedElement);

  opacityattachFieldClickListener(
    "Typo-opacity-advance-entry-field",
    entryBullet,
    entryCount,
    updateEntry
  );
  opacityattachFieldClickListener(
    "Typo-opacity-advance-center-field",
    centerBullet,
    centerCount,
    updateCenter
  );
  opacityattachFieldClickListener(
    "Typo-opacity-advance-exit-field",
    exitBullet,
    exitCount,
    updateExit
  );
}

function opacityattachFieldClickListener(
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
