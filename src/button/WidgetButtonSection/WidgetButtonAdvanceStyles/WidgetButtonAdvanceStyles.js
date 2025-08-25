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
      const el = document.getElementById(countId);
      if (!el) return;
      if (el.tagName === "INPUT") el.value = val + "%";
      else el.textContent = val + "%";
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
    return parseInt(String(raw).replace("%", "")) || 0;
  };

  setup(
    "vertical-button-advance-entry-increase",
    "vertical-button-advance-entry-decrease",
    () => getVal("vertical-button-advance-entry-count"),
    updateEntry,
    "vertical-button-advance-entry-bullet"
  );
  setup(
    "vertical-button-advance-center-increase",
    "vertical-button-advance-center-decrease",
    () => getVal("vertical-button-advance-center-count"),
    updateCenter,
    "vertical-button-advance-center-bullet"
  );
  setup(
    "vertical-button-advance-exit-increase",
    "vertical-button-advance-exit-decrease",
    () => getVal("vertical-button-advance-exit-count"),
    updateExit,
    "vertical-button-advance-exit-bullet"
  );

  const startBullet = document.getElementById("vertical-timeline-start-bullet");
  const endBullet = document.getElementById("vertical-timeline-end-bullet");
  if (startBullet)
    startBullet.addEventListener(
      "focus",
      () => (lastFocused = "vertical-timeline-start-bullet")
    );
  if (endBullet)
    endBullet.addEventListener(
      "focus",
      () => (lastFocused = "vertical-timeline-end-bullet")
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
        const el = document.getElementById(
          "vertical-button-advance-entry-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = entryVal + "%")
            : (el.textContent = entryVal + "%");
      }
      if (lastFocused.includes("center")) {
        centerVal = Math.max(-100, Math.min(100, centerVal + direction));
        updateCenter(centerVal);
        const el = document.getElementById(
          "vertical-button-advance-center-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = centerVal + "%")
            : (el.textContent = centerVal + "%");
      }
      if (lastFocused.includes("exit")) {
        exitVal = Math.max(-100, Math.min(100, exitVal + direction));
        updateExit(exitVal);
        const el = document.getElementById(
          "vertical-button-advance-exit-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = exitVal + "%")
            : (el.textContent = exitVal + "%");
      }
      if (lastFocused.includes("start")) {
        startVal = getVal("vertical-timelineStartValue");
        endVal = getVal("vertical-timelineEndValue");
        startVal = Math.max(0, Math.min(startVal + direction, endVal - 4));
        updateStart(startVal);
        const el = document.getElementById("vertical-timelineStartValue");
        if (el) el.textContent = startVal + "%";
      }
      if (lastFocused.includes("end")) {
        startVal = getVal("vertical-timelineStartValue");
        endVal = getVal("vertical-timelineEndValue");
        endVal = Math.max(startVal + 4, Math.min(endVal + direction, 100));
        updateEnd(endVal);
        const el = document.getElementById("vertical-timelineEndValue");
        if (el) el.textContent = endVal + "%";
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
  const btn = document.getElementById("vertical-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

export function button_initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("vertical-effect-animation-type-arrow");
  const list = document.getElementById("vertical-effect-animation-type-list");
  const display = document.getElementById("vertical-effect-animation-value");
  if (!arrow || !list || !display) return;

  arrow.onclick = () => {
    list.classList.toggle("sc-hidden");
  };

  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const selected = item.getAttribute("data-value");
      display.textContent = item.textContent.trim();
      display.setAttribute("data-value", selected);
      try {
        const el =
          typeof getSelectedElement === "function"
            ? getSelectedElement()
            : null;
        const btn =
          el?.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
          ) || el;
        if (btn)
          btn.style.setProperty("--sc-vertical-effect-animation", selected);
        window.__typoScrollEase = selected;
      } catch {}
      list.classList.add("sc-hidden");
    };
  });

  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("sc-hidden");
    }
  });
}

export function initButtonAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById("vertical-timeline-start-bullet");
  const endBullet = document.getElementById("vertical-timeline-end-bullet");
  const startFill = document.getElementById("vertical-timeline-start-fill");
  const endFill = document.getElementById("vertical-timeline-end-fill");
  const startValue = document.getElementById("vertical-timelineStartValue");
  const endValue = document.getElementById("vertical-timelineEndValue");

  const entryBullet = document.getElementById(
    "vertical-button-advance-entry-bullet"
  );
  const entryFill = document.getElementById(
    "vertical-button-advance-entry-fill"
  );
  const entryCount = document.getElementById(
    "vertical-button-advance-entry-count"
  );

  const centerBullet = document.getElementById(
    "vertical-button-advance-center-bullet"
  );
  const centerFill = document.getElementById(
    "vertical-button-advance-center-fill"
  );
  const centerCount = document.getElementById(
    "vertical-button-advance-center-count"
  );

  const exitBullet = document.getElementById(
    "vertical-button-advance-exit-bullet"
  );
  const exitFill = document.getElementById("vertical-button-advance-exit-fill");
  const exitCount = document.getElementById(
    "vertical-button-advance-exit-count"
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

  const el = getSelectedElement?.();
  if (!el) return;

  const btn =
    el.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, " +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    ) || el;

  const readPct = (v) => {
    const n = parseFloat(String(v).replace("%", ""));
    return Number.isFinite(n) ? n : 0;
  };

  let startPct =
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-vertical-scroll-start")
    ) || 0;
  let endPct =
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-vertical-scroll-end")
    ) || 100;
  if (endPct < startPct + 4) endPct = startPct + 4;

  let entryPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-vertical-scroll-entry")
  );
  let centerPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-vertical-scroll-center")
  );
  let exitPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-vertical-scroll-exit")
  );

  function writeVar(cssVar, val) {
    const styleId = `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    const twin = cssVar.replace("--sc-vertical-", "--sc-Typo-vertical-");
    styleTag.textContent =
      `#${el.id} a.sqs-button-element--primary,` +
      `#${el.id} a.sqs-button-element--secondary,` +
      `#${el.id} a.sqs-button-element--tertiary,` +
      `#${el.id} a.sqs-block-button-element,` +
      `#${el.id} button.sqs-button-element--primary,` +
      `#${el.id} button.sqs-button-element--secondary,` +
      `#${el.id} button.sqs-button-element--tertiary { ${cssVar}: ${val}%; ${twin}: ${val}%; }`;
  }

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
    (val) => {
      val = Math.max(min, Math.min(max, val));

      if (countEl.tagName === "INPUT") countEl.value = `${val}%`;
      else countEl.textContent = `${val}%`;

      if (
        cssVar === "--sc-vertical-scroll-entry" ||
        cssVar === "--sc-vertical-scroll-center" ||
        cssVar === "--sc-vertical-scroll-exit"
      ) {
        const percent = (val + 100) / 2;
        const fillLeft = val < 0 ? percent : 50;
        const fillWidth = Math.abs(val / 2);

        gsap.set(bullet, { left: `${percent}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-theme-accent)",
        });

        const a = document.getElementById("vertical-custom-timeline-arrow");
        if (cssVar === "--sc-vertical-scroll-entry" && a)
          a.style.left = `${percent}%`;
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        if (position === "left") {
          gsap.set(fill, { width: `${val}%`, left: "0" });
        } else {
          gsap.set(fill, {
            left: "auto",
            transform: `scaleX(${(100 - val) / 100})`,
            transformOrigin: "right",
            width: "100%",
            backgroundColor: "#F6B67B",
          });
        }
      }

      writeVar(cssVar, val);
    };

  const setStart = (v) => {
    startPct = Math.max(0, Math.min(v, endPct - 4));
    updateField(
      startBullet,
      startFill,
      startValue,
      "--sc-vertical-scroll-start",
      "left",
      0,
      100
    )(startPct);
  };
  const setEnd = (v) => {
    endPct = Math.max(startPct + 4, Math.min(v, 100));
    updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-vertical-scroll-end",
      "right",
      0,
      100
    )(endPct);
  };
  const setEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-vertical-scroll-entry"
  );
  const setCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-vertical-scroll-center"
  );
  const setExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-vertical-scroll-exit"
  );

  setEntry(entryPct);
  setCenter(centerPct);
  setExit(exitPct);
  setStart(startPct);
  gsap.set(startBullet, { left: `${startPct}%`, xPercent: -50 });
  setEnd(endPct);

  function bindTripletInput(input, fn) {
    input.addEventListener("input", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(-100, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("blur", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(-100, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("keydown", (e) => {
      if (
        !/[0-9\-]/.test(e.key) &&
        !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
          e.key
        )
      )
        e.preventDefault();
    });
    input.addEventListener("focus", (e) => {
      const v = parseInt(e.target.value.replace("%", "").trim()) || 0;
      e.target.value = v;
    });
  }
  bindTripletInput(entryCount, setEntry);
  bindTripletInput(centerCount, setCenter);
  bindTripletInput(exitCount, setExit);

  function makeDraggable(bullet, setter, type, min = -100, max = 100) {
    if (!bullet) return;
    bullet.onmousedown = (e) => {
      e.preventDefault();
      const container = bullet.parentElement;
      const rect = container.getBoundingClientRect();
      const onMove = (ev) => {
        const clientX = Math.max(
          rect.left,
          Math.min(rect.right, ev.touches ? ev.touches[0].clientX : ev.clientX)
        );
        const percent =
          ((clientX - rect.left) / rect.width) * (max - min) + min;
        let v = Math.round(percent);
        if (type === "start") v = Math.max(0, Math.min(v, endPct - 4));
        if (type === "end") v = Math.max(startPct + 4, Math.min(v, 100));
        if (type === "normal") v = Math.max(min, Math.min(v, max));
        setter(v);
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp, { once: true });
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp, { once: true });
    };
  }
  makeDraggable(startBullet, setStart, "start", 0, 100);
  makeDraggable(endBullet, setEnd, "end", 0, 100);
  makeDraggable(entryBullet, setEntry, "normal");
  makeDraggable(centerBullet, setCenter, "normal");
  makeDraggable(exitBullet, setExit, "normal");

  [
    { id: "vertical-button-advance-entry-reset", setter: () => setEntry(0) },
    { id: "vertical-button-advance-center-reset", setter: () => setCenter(0) },
    { id: "vertical-button-advance-exit-reset", setter: () => setExit(0) },
  ].forEach(({ id, setter }) => {
    const b = document.getElementById(id);
    if (b) b.onclick = setter;
  });

  attachAdvanceTimelineIncrementDecrement(
    setEntry,
    setCenter,
    setExit,
    setStart,
    setEnd
  );
  attachCustomTimelineReset(setStart, setEnd, setEntry, setCenter, setExit);
  button_initEffectAnimationDropdownToggle();

  if (
    window.gsap &&
    window.ScrollTrigger &&
    typeof buttonAdvanceSyncCustomTimelineArrow === "function"
  ) {
    buttonAdvanceSyncCustomTimelineArrow(el);
  }
}

// ──────────────────────────────────────────────────────────────

export function horizontalattachAdvanceTimelineIncrementDecrement(
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
      const el = document.getElementById(countId);
      if (!el) return;
      if (el.tagName === "INPUT") el.value = val + "%";
      else el.textContent = val + "%";
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
    return parseInt(String(raw).replace("%", "")) || 0;
  };

  setup(
    "horizontal-button-advance-entry-increase",
    "horizontal-button-advance-entry-decrease",
    () => getVal("horizontal-button-advance-entry-count"),
    updateEntry,
    "horizontal-button-advance-entry-bullet"
  );
  setup(
    "horizontal-button-advance-center-increase",
    "horizontal-button-advance-center-decrease",
    () => getVal("horizontal-button-advance-center-count"),
    updateCenter,
    "horizontal-button-advance-center-bullet"
  );
  setup(
    "horizontal-button-advance-exit-increase",
    "horizontal-button-advance-exit-decrease",
    () => getVal("horizontal-button-advance-exit-count"),
    updateExit,
    "horizontal-button-advance-exit-bullet"
  );

  const startBullet = document.getElementById(
    "horizontal-timeline-start-bullet"
  );
  const endBullet = document.getElementById("horizontal-timeline-end-bullet");
  if (startBullet)
    startBullet.addEventListener(
      "focus",
      () => (lastFocused = "horizontal-timeline-start-bullet")
    );
  if (endBullet)
    endBullet.addEventListener(
      "focus",
      () => (lastFocused = "horizontal-timeline-end-bullet")
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
        const el = document.getElementById(
          "horizontal-button-advance-entry-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = entryVal + "%")
            : (el.textContent = entryVal + "%");
      }
      if (lastFocused.includes("center")) {
        centerVal = Math.max(-100, Math.min(100, centerVal + direction));
        updateCenter(centerVal);
        const el = document.getElementById(
          "horizontal-button-advance-center-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = centerVal + "%")
            : (el.textContent = centerVal + "%");
      }
      if (lastFocused.includes("exit")) {
        exitVal = Math.max(-100, Math.min(100, exitVal + direction));
        updateExit(exitVal);
        const el = document.getElementById(
          "horizontal-button-advance-exit-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = exitVal + "%")
            : (el.textContent = exitVal + "%");
      }
      if (lastFocused.includes("start")) {
        startVal = getVal("horizontal-timelineStartValue");
        endVal = getVal("horizontal-timelineEndValue");
        startVal = Math.max(0, Math.min(startVal + direction, endVal - 4));
        updateStart(startVal);
        const el = document.getElementById("horizontal-timelineStartValue");
        if (el) el.textContent = startVal + "%";
      }
      if (lastFocused.includes("end")) {
        startVal = getVal("horizontal-timelineStartValue");
        endVal = getVal("horizontal-timelineEndValue");
        endVal = Math.max(startVal + 4, Math.min(endVal + direction, 100));
        updateEnd(endVal);
        const el = document.getElementById("horizontal-timelineEndValue");
        if (el) el.textContent = endVal + "%";
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

function horizontalattachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const btn = document.getElementById("horizontal-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

export function horizontal_button_initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById(
    "horizontal-effect-animation-type-arrow"
  );
  const list = document.getElementById("horizontal-effect-animation-type-list");
  const display = document.getElementById("horizontal-effect-animation-value");
  if (!arrow || !list || !display) return;

  arrow.onclick = () => {
    list.classList.toggle("sc-hidden");
  };

  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const selected = item.getAttribute("data-value");
      display.textContent = item.textContent.trim();
      display.setAttribute("data-value", selected);
      try {
        const el =
          typeof getSelectedElement === "function"
            ? getSelectedElement()
            : null;
        const btn =
          el?.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
          ) || el;
        if (btn)
          btn.style.setProperty("--sc-horizontal-effect-animation", selected);
        window.__typoScrollEase = selected;
      } catch {}
      list.classList.add("sc-hidden");
    };
  });

  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("sc-hidden");
    }
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

  const el = getSelectedElement?.();
  if (!el) return;

  const btn =
    el.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, " +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    ) || el;

  const readPct = (v) => {
    const n = parseFloat(String(v).replace("%", ""));
    return Number.isFinite(n) ? n : 0;
  };

  let startPct =
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-start")
    ) || 0;
  let endPct =
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-end")
    ) || 100;
  if (endPct < startPct + 4) endPct = startPct + 4;

  let entryPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-entry")
  );
  let centerPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-center")
  );
  let exitPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-exit")
  );

  function writeVar(cssVar, val) {
    const styleId = `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    const twin = cssVar.replace("--sc-horizontal-", "--sc-Typo-horizontal-");
    styleTag.textContent =
      `#${el.id} a.sqs-button-element--primary,` +
      `#${el.id} a.sqs-button-element--secondary,` +
      `#${el.id} a.sqs-button-element--tertiary,` +
      `#${el.id} a.sqs-block-button-element,` +
      `#${el.id} button.sqs-button-element--primary,` +
      `#${el.id} button.sqs-button-element--secondary,` +
      `#${el.id} button.sqs-button-element--tertiary { ${cssVar}: ${val}%; ${twin}: ${val}%; }`;
  }

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
    (val) => {
      val = Math.max(min, Math.min(max, val));

      if (countEl.tagName === "INPUT") countEl.value = `${val}%`;
      else countEl.textContent = `${val}%`;

      if (
        cssVar === "--sc-horizontal-scroll-entry" ||
        cssVar === "--sc-horizontal-scroll-center" ||
        cssVar === "--sc-horizontal-scroll-exit"
      ) {
        const percent = (val + 100) / 2;
        const fillLeft = val < 0 ? percent : 50;
        const fillWidth = Math.abs(val / 2);

        gsap.set(bullet, { left: `${percent}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-theme-accent)",
        });

        const a = document.getElementById("horizontal-custom-timeline-arrow");
        if (cssVar === "--sc-horizontal-scroll-entry" && a)
          a.style.left = `${percent}%`;
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        if (position === "left") {
          gsap.set(fill, { width: `${val}%`, left: "0" });
        } else {
          gsap.set(fill, {
            left: "auto",
            transform: `scaleX(${(100 - val) / 100})`,
            transformOrigin: "right",
            width: "100%",
            backgroundColor: "#F6B67B",
          });
        }
      }

      writeVar(cssVar, val);
    };

  const setStart = (v) => {
    startPct = Math.max(0, Math.min(v, endPct - 4));
    updateField(
      startBullet,
      startFill,
      startValue,
      "--sc-horizontal-scroll-start",
      "left",
      0,
      100
    )(startPct);
  };
  const setEnd = (v) => {
    endPct = Math.max(startPct + 4, Math.min(v, 100));
    updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-horizontal-scroll-end",
      "right",
      0,
      100
    )(endPct);
  };
  const setEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-horizontal-scroll-entry"
  );
  const setCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-horizontal-scroll-center"
  );
  const setExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-horizontal-scroll-exit"
  );

  setEntry(entryPct);
  setCenter(centerPct);
  setExit(exitPct);
  setStart(startPct);
  gsap.set(startBullet, { left: `${startPct}%`, xPercent: -50 });
  setEnd(endPct);

  function bindTripletInput(input, fn) {
    input.addEventListener("input", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(-100, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("blur", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(-100, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("keydown", (e) => {
      if (
        !/[0-9\-]/.test(e.key) &&
        !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
          e.key
        )
      )
        e.preventDefault();
    });
    input.addEventListener("focus", (e) => {
      const v = parseInt(e.target.value.replace("%", "").trim()) || 0;
      e.target.value = v;
    });
  }
  bindTripletInput(entryCount, setEntry);
  bindTripletInput(centerCount, setCenter);
  bindTripletInput(exitCount, setExit);

  function makeDraggable(bullet, setter, type, min = -100, max = 100) {
    if (!bullet) return;
    bullet.onmousedown = (e) => {
      e.preventDefault();
      const container = bullet.parentElement;
      const rect = container.getBoundingClientRect();
      const onMove = (ev) => {
        const clientX = Math.max(
          rect.left,
          Math.min(rect.right, ev.touches ? ev.touches[0].clientX : ev.clientX)
        );
        const percent =
          ((clientX - rect.left) / rect.width) * (max - min) + min;
        let v = Math.round(percent);
        if (type === "start") v = Math.max(0, Math.min(v, endPct - 4));
        if (type === "end") v = Math.max(startPct + 4, Math.min(v, 100));
        if (type === "normal") v = Math.max(min, Math.min(v, max));
        setter(v);
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp, { once: true });
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp, { once: true });
    };
  }
  makeDraggable(startBullet, setStart, "start", 0, 100);
  makeDraggable(endBullet, setEnd, "end", 0, 100);
  makeDraggable(entryBullet, setEntry, "normal");
  makeDraggable(centerBullet, setCenter, "normal");
  makeDraggable(exitBullet, setExit, "normal");

  [
    { id: "horizontal-button-advance-entry-reset", setter: () => setEntry(0) },
    {
      id: "horizontal-button-advance-center-reset",
      setter: () => setCenter(0),
    },
    { id: "horizontal-button-advance-exit-reset", setter: () => setExit(0) },
  ].forEach(({ id, setter }) => {
    const b = document.getElementById(id);
    if (b) b.onclick = setter;
  });

  horizontalattachAdvanceTimelineIncrementDecrement(
    setEntry,
    setCenter,
    setExit,
    setStart,
    setEnd
  );
  horizontalattachCustomTimelineReset(
    setStart,
    setEnd,
    setEntry,
    setCenter,
    setExit
  );
  horizontal_button_initEffectAnimationDropdownToggle();

  if (
    window.gsap &&
    window.ScrollTrigger &&
    typeof buttonAdvanceSyncCustomTimelineArrow === "function"
  ) {
    buttonAdvanceSyncCustomTimelineArrow(el);
  }
}

// horizontal

// Opacity
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
      const el = document.getElementById(countId);
      if (!el) return;
      if (el.tagName === "INPUT") el.value = val + "%";
      else el.textContent = val + "%";
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
    return parseInt(String(raw).replace("%", "")) || 0;
  };

  setup(
    "opacity-button-advance-entry-increase",
    "opacity-button-advance-entry-decrease",
    () => getVal("opacity-button-advance-entry-count"),
    updateEntry,
    "opacity-button-advance-entry-bullet"
  );
  setup(
    "opacity-button-advance-center-increase",
    "opacity-button-advance-center-decrease",
    () => getVal("opacity-button-advance-center-count"),
    updateCenter,
    "opacity-button-advance-center-bullet"
  );
  setup(
    "opacity-button-advance-exit-increase",
    "opacity-button-advance-exit-decrease",
    () => getVal("opacity-button-advance-exit-count"),
    updateExit,
    "opacity-button-advance-exit-bullet"
  );

  const startBullet = document.getElementById("opacity-timeline-start-bullet");
  const endBullet = document.getElementById("opacity-timeline-end-bullet");
  if (startBullet)
    startBullet.addEventListener(
      "focus",
      () => (lastFocused = "opacity-timeline-start-bullet")
    );
  if (endBullet)
    endBullet.addEventListener(
      "focus",
      () => (lastFocused = "opacity-timeline-end-bullet")
    );

  document.addEventListener("keydown", (e) => {
    if (!lastFocused || (e.key !== "ArrowRight" && e.key !== "ArrowLeft"))
      return;
    if (keyHoldInterval || keyHoldTimeout) return;

    const direction = e.key === "ArrowRight" ? 1 : -1;
    lastPressedKey = e.key;

    const update = () => {
      if (lastFocused.includes("entry")) {
        entryVal = Math.max(0, Math.min(100, entryVal + direction));
        updateEntry(entryVal);
        const el = document.getElementById(
          "opacity-button-advance-entry-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = entryVal + "%")
            : (el.textContent = entryVal + "%");
      }
      if (lastFocused.includes("center")) {
        centerVal = Math.max(0, Math.min(100, centerVal + direction));
        updateCenter(centerVal);
        const el = document.getElementById(
          "opacity-button-advance-center-count"
        );
        if (el)
          el.tagName === "INPUT"
            ? (el.value = centerVal + "%")
            : (el.textContent = centerVal + "%");
      }
      if (lastFocused.includes("exit")) {
        exitVal = Math.max(0, Math.min(100, exitVal + direction));
        updateExit(exitVal);
        const el = document.getElementById("opacity-button-advance-exit-count");
        if (el)
          el.tagName === "INPUT"
            ? (el.value = exitVal + "%")
            : (el.textContent = exitVal + "%");
      }
      if (lastFocused.includes("start")) {
        startVal = getVal("opacity-timelineStartValue");
        endVal = getVal("opacity-timelineEndValue");
        startVal = Math.max(0, Math.min(startVal + direction, endVal - 4));
        updateStart(startVal);
        const el = document.getElementById("opacity-timelineStartValue");
        if (el) el.textContent = startVal + "%";
      }
      if (lastFocused.includes("end")) {
        startVal = getVal("opacity-timelineStartValue");
        endVal = getVal("opacity-timelineEndValue");
        endVal = Math.max(startVal + 4, Math.min(endVal + direction, 100));
        updateEnd(endVal);
        const el = document.getElementById("opacity-timelineEndValue");
        if (el) el.textContent = endVal + "%";
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
  const btn = document.getElementById("opacity-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(100);
      updateCenter(100);
      updateExit(100);
    };
}

export function opacitybutton_initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("opacity-effect-animation-type-arrow");
  const list = document.getElementById("opacity-effect-animation-type-list");
  const display = document.getElementById("opacity-effect-animation-value");
  if (!arrow || !list || !display) return;

  arrow.onclick = () => {
    list.classList.toggle("sc-hidden");
  };

  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const selected = item.getAttribute("data-value");
      display.textContent = item.textContent.trim();
      display.setAttribute("data-value", selected);
      try {
        const el =
          typeof getSelectedElement === "function"
            ? getSelectedElement()
            : null;
        const btn =
          el?.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
          ) || el;
        if (btn)
          btn.style.setProperty("--sc-opacity-effect-animation", selected);
        window.__typoScrollEase = selected;
      } catch {}
      list.classList.add("sc-hidden");
    };
  });

  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("sc-hidden");
    }
  });
}

export function opacityinitButtonAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById("opacity-timeline-start-bullet");
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
  const exitFill = document.getElementById("opacity-button-advance-exit-fill");
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

  const el = getSelectedElement?.();
  if (!el) return;

  const btn =
    el.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, " +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    ) || el;

  const readPct = (v) => {
    const n = parseFloat(String(v).replace("%", ""));
    return Number.isFinite(n) ? n : 0;
  };

  let startPct =
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-opacity-scroll-start")
    ) || 0;
  let endPct =
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-opacity-scroll-end")
    ) || 100;
  if (endPct < startPct + 4) endPct = startPct + 4;

  let entryPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-opacity-scroll-entry")
  );
  let centerPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-opacity-scroll-center")
  );
  let exitPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-opacity-scroll-exit")
  );

  function writeVar(cssVar, val) {
    const styleId = `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    const twin = cssVar.replace("--sc-opacity-", "--sc-Typo-opacity-");
    styleTag.textContent =
      `#${el.id} a.sqs-button-element--primary,` +
      `#${el.id} a.sqs-button-element--secondary,` +
      `#${el.id} a.sqs-button-element--tertiary,` +
      `#${el.id} a.sqs-block-button-element,` +
      `#${el.id} button.sqs-button-element--primary,` +
      `#${el.id} button.sqs-button-element--secondary,` +
      `#${el.id} button.sqs-button-element--tertiary { ${cssVar}: ${val}%; ${twin}: ${val}%; }`;
  }

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = 0, max = 100) =>
    (val) => {
      val = Math.max(min, Math.min(max, val));

      if (countEl.tagName === "INPUT") countEl.value = `${val}%`;
      else countEl.textContent = `${val}%`;

      if (
        cssVar === "--sc-opacity-scroll-entry" ||
        cssVar === "--sc-opacity-scroll-center" ||
        cssVar === "--sc-opacity-scroll-exit"
      ) {
        const percent = val;
        gsap.set(bullet, { left: `${percent}%`, xPercent: -50 });
        gsap.set(fill, {
          left: "0%",
          width: `${percent}%`,
          backgroundColor: "var(--sc-theme-accent)",
        });

        const a = document.getElementById("opacity-custom-timeline-arrow");
        if (cssVar === "--sc-opacity-scroll-entry" && a)
          a.style.left = `${percent}%`;
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        if (position === "left") {
          gsap.set(fill, { width: `${val}%`, left: "0" });
        } else {
          gsap.set(endFill, {
            left: "auto",
            transform: `scaleX(${(100 - val) / 100})`,
            transformOrigin: "right",
            width: "100%",
            backgroundColor: "#F6B67B",
          });
        }
      }

      writeVar(cssVar, val);
    };

  const setStart = (v) => {
    startPct = Math.max(0, Math.min(v, endPct - 4));
    updateField(
      startBullet,
      startFill,
      startValue,
      "--sc-opacity-scroll-start",
      "left",
      0,
      100
    )(startPct);
  };
  const setEnd = (v) => {
    endPct = Math.max(startPct + 4, Math.min(v, 100));
    updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-opacity-scroll-end",
      "right",
      0,
      100
    )(endPct);
  };
  const setEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-opacity-scroll-entry",
    "left",
    0,
    100
  );
  const setCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-opacity-scroll-center",
    "left",
    0,
    100
  );
  const setExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-opacity-scroll-exit",
    "left",
    0,
    100
  );

  setEntry(entryPct || 100);
  setCenter(centerPct || 100);
  setExit(exitPct || 100);
  setStart(startPct);
  gsap.set(startBullet, { left: `${startPct}%`, xPercent: -50 });
  setEnd(endPct);

  function bindTripletInput(input, fn) {
    input.addEventListener("input", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(0, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("blur", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(0, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("keydown", (e) => {
      if (
        !/[0-9]/.test(e.key) &&
        !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
          e.key
        )
      )
        e.preventDefault();
    });
    input.addEventListener("focus", (e) => {
      const v = parseInt(e.target.value.replace("%", "").trim()) || 0;
      e.target.value = v;
    });
  }
  bindTripletInput(entryCount, setEntry);
  bindTripletInput(centerCount, setCenter);
  bindTripletInput(exitCount, setExit);

  function makeDraggable(bullet, setter, type, min = 0, max = 100) {
    if (!bullet) return;
    bullet.onmousedown = (e) => {
      e.preventDefault();
      const container = bullet.parentElement;
      const rect = container.getBoundingClientRect();
      const onMove = (ev) => {
        const clientX = Math.max(
          rect.left,
          Math.min(rect.right, ev.touches ? ev.touches[0].clientX : ev.clientX)
        );
        const percent =
          ((clientX - rect.left) / rect.width) * (max - min) + min;
        let v = Math.round(percent);
        if (type === "start") v = Math.max(0, Math.min(v, endPct - 4));
        if (type === "end") v = Math.max(startPct + 4, Math.min(v, 100));
        if (type === "normal") v = Math.max(min, Math.min(v, max));
        setter(v);
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp, { once: true });
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp, { once: true });
    };
  }
  makeDraggable(startBullet, setStart, "start", 0, 100);
  makeDraggable(endBullet, setEnd, "end", 0, 100);
  makeDraggable(entryBullet, setEntry, "normal", 0, 100);
  makeDraggable(centerBullet, setCenter, "normal", 0, 100);
  makeDraggable(exitBullet, setExit, "normal", 0, 100);

  [
    { id: "opacity-button-advance-entry-reset", setter: () => setEntry(100) },
    { id: "opacity-button-advance-center-reset", setter: () => setCenter(100) },
    { id: "opacity-button-advance-exit-reset", setter: () => setExit(100) },
  ].forEach(({ id, setter }) => {
    const b = document.getElementById(id);
    if (b) b.onclick = setter;
  });

  opacityattachAdvanceTimelineIncrementDecrement(
    setEntry,
    setCenter,
    setExit,
    setStart,
    setEnd
  );
  opacityattachCustomTimelineReset(
    setStart,
    setEnd,
    setEntry,
    setCenter,
    setExit
  );
  opacitybutton_initEffectAnimationDropdownToggle();

  if (
    window.gsap &&
    window.ScrollTrigger &&
    typeof opacitybuttonAdvanceSyncCustomTimelineArrow === "function"
  ) {
    opacitybuttonAdvanceSyncCustomTimelineArrow(el);
  }
}


// Opacity

// scale
export function scaleattachAdvanceTimelineIncrementDecrement(
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
      const el = document.getElementById(countId);
      if (!el) return;
      if (el.tagName === "INPUT") el.value = val + "%";
      else el.textContent = val + "%";
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
    return parseInt(String(raw).replace("%", "")) || 0;
  };

  setup(
    "scale-button-advance-entry-increase",
    "scale-button-advance-entry-decrease",
    () => getVal("scale-button-advance-entry-count"),
    updateEntry,
    "scale-button-advance-entry-bullet"
  );
  setup(
    "scale-button-advance-center-increase",
    "scale-button-advance-center-decrease",
    () => getVal("scale-button-advance-center-count"),
    updateCenter,
    "scale-button-advance-center-bullet"
  );
  setup(
    "scale-button-advance-exit-increase",
    "scale-button-advance-exit-decrease",
    () => getVal("scale-button-advance-exit-count"),
    updateExit,
    "scale-button-advance-exit-bullet"
  );

  const startBullet = document.getElementById("scale-timeline-start-bullet");
  const endBullet = document.getElementById("scale-timeline-end-bullet");
  if (startBullet)
    startBullet.addEventListener(
      "focus",
      () => (lastFocused = "scale-timeline-start-bullet")
    );
  if (endBullet)
    endBullet.addEventListener(
      "focus",
      () => (lastFocused = "scale-timeline-end-bullet")
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
        const el = document.getElementById("scale-button-advance-entry-count");
        if (el)
          el.tagName === "INPUT"
            ? (el.value = entryVal + "%")
            : (el.textContent = entryVal + "%");
      }
      if (lastFocused.includes("center")) {
        centerVal = Math.max(-100, Math.min(100, centerVal + direction));
        updateCenter(centerVal);
        const el = document.getElementById("scale-button-advance-center-count");
        if (el)
          el.tagName === "INPUT"
            ? (el.value = centerVal + "%")
            : (el.textContent = centerVal + "%");
      }
      if (lastFocused.includes("exit")) {
        exitVal = Math.max(-100, Math.min(100, exitVal + direction));
        updateExit(exitVal);
        const el = document.getElementById("scale-button-advance-exit-count");
        if (el)
          el.tagName === "INPUT"
            ? (el.value = exitVal + "%")
            : (el.textContent = exitVal + "%");
      }
      if (lastFocused.includes("start")) {
        startVal = getVal("scale-timelineStartValue");
        endVal = getVal("scale-timelineEndValue");
        startVal = Math.max(0, Math.min(startVal + direction, endVal - 4));
        updateStart(startVal);
        const el = document.getElementById("scale-timelineStartValue");
        if (el) el.textContent = startVal + "%";
      }
      if (lastFocused.includes("end")) {
        startVal = getVal("scale-timelineStartValue");
        endVal = getVal("scale-timelineEndValue");
        endVal = Math.max(startVal + 4, Math.min(endVal + direction, 100));
        updateEnd(endVal);
        const el = document.getElementById("scale-timelineEndValue");
        if (el) el.textContent = endVal + "%";
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

function scaleattachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const btn = document.getElementById("scale-custom-timeline-reset");
  if (btn)
    btn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
}

export function scale_button_initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("scale-effect-animation-type-arrow");
  const list = document.getElementById("scale-effect-animation-type-list");
  const display = document.getElementById("scale-effect-animation-value");
  if (!arrow || !list || !display) return;

  arrow.onclick = () => {
    list.classList.toggle("sc-hidden");
  };

  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const selected = item.getAttribute("data-value");
      display.textContent = item.textContent.trim();
      display.setAttribute("data-value", selected);
      try {
        const el =
          typeof getSelectedElement === "function"
            ? getSelectedElement()
            : null;
        const btn =
          el?.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
          ) || el;
        if (btn) btn.style.setProperty("--sc-scale-effect-animation", selected);
        window.__typoScrollEase = selected;
      } catch {}
      list.classList.add("sc-hidden");
    };
  });

  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("sc-hidden");
    }
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
  const entryFill = document.getElementById("scale-button-advance-entry-fill");
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
  const exitCount = document.getElementById("scale-button-advance-exit-count");

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

  const el = getSelectedElement?.();
  if (!el) return;

  const btn =
    el.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, " +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    ) || el;

  const readPct = (v) => {
    const n = parseFloat(String(v).replace("%", ""));
    return Number.isFinite(n) ? n : 0;
  };

  let startPct =
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-scale-scroll-start")
    ) || 0;
  let endPct =
    readPct(getComputedStyle(btn).getPropertyValue("--sc-scale-scroll-end")) ||
    100;
  if (endPct < startPct + 4) endPct = startPct + 4;

  let entryPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-scale-scroll-entry")
  );
  let centerPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-scale-scroll-center")
  );
  let exitPct = readPct(
    getComputedStyle(btn).getPropertyValue("--sc-scale-scroll-exit")
  );

  function writeVar(cssVar, val) {
    const styleId = `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    const twin = cssVar.replace("--sc-scale-", "--sc-Typo-scale-");
    styleTag.textContent =
      `#${el.id} a.sqs-button-element--primary,` +
      `#${el.id} a.sqs-button-element--secondary,` +
      `#${el.id} a.sqs-button-element--tertiary,` +
      `#${el.id} a.sqs-block-button-element,` +
      `#${el.id} button.sqs-button-element--primary,` +
      `#${el.id} button.sqs-button-element--secondary,` +
      `#${el.id} button.sqs-button-element--tertiary { ${cssVar}: ${val}%; ${twin}: ${val}%; }`;
  }

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
    (val) => {
      val = Math.max(min, Math.min(max, val));

      if (countEl.tagName === "INPUT") countEl.value = `${val}%`;
      else countEl.textContent = `${val}%`;

      if (
        cssVar === "--sc-scale-scroll-entry" ||
        cssVar === "--sc-scale-scroll-center" ||
        cssVar === "--sc-scale-scroll-exit"
      ) {
        const percent = (val + 100) / 2;
        const fillLeft = val < 0 ? percent : 50;
        const fillWidth = Math.abs(val / 2);

        gsap.set(bullet, { left: `${percent}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-theme-accent)",
        });

        const a = document.getElementById("scale-custom-timeline-arrow");
        if (cssVar === "--sc-scale-scroll-entry" && a)
          a.style.left = `${percent}%`;
      } else {
        gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
        if (position === "left") {
          gsap.set(fill, { width: `${val}%`, left: "0" });
        } else {
          gsap.set(fill, {
            left: "auto",
            transform: `scaleX(${(100 - val) / 100})`,
            transformOrigin: "right",
            width: "100%",
            backgroundColor: "#F6B67B",
          });
        }
      }

      writeVar(cssVar, val);
    };

  const setStart = (v) => {
    startPct = Math.max(0, Math.min(v, endPct - 4));
    updateField(
      startBullet,
      startFill,
      startValue,
      "--sc-scale-scroll-start",
      "left",
      0,
      100
    )(startPct);
  };
  const setEnd = (v) => {
    endPct = Math.max(startPct + 4, Math.min(v, 100));
    updateField(
      endBullet,
      endFill,
      endValue,
      "--sc-scale-scroll-end",
      "right",
      0,
      100
    )(endPct);
  };
  const setEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-scale-scroll-entry"
  );
  const setCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-scale-scroll-center"
  );
  const setExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-scale-scroll-exit"
  );

  setEntry(entryPct);
  setCenter(centerPct);
  setExit(exitPct);
  setStart(startPct);
  gsap.set(startBullet, { left: `${startPct}%`, xPercent: -50 });
  setEnd(endPct);

  function bindTripletInput(input, fn) {
    input.addEventListener("input", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(-100, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("blur", (e) => {
      let v = parseInt(e.target.value.replace("%", "").trim());
      if (isNaN(v)) v = 0;
      v = Math.max(-100, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("keydown", (e) => {
      if (
        !/[0-9\-]/.test(e.key) &&
        !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
          e.key
        )
      )
        e.preventDefault();
    });
    input.addEventListener("focus", (e) => {
      const v = parseInt(e.target.value.replace("%", "").trim()) || 0;
      e.target.value = v;
    });
  }
  bindTripletInput(entryCount, setEntry);
  bindTripletInput(centerCount, setCenter);
  bindTripletInput(exitCount, setExit);

  function makeDraggable(bullet, setter, type, min = -100, max = 100) {
    if (!bullet) return;
    bullet.onmousedown = (e) => {
      e.preventDefault();
      const container = bullet.parentElement;
      const rect = container.getBoundingClientRect();
      const onMove = (ev) => {
        const clientX = Math.max(
          rect.left,
          Math.min(rect.right, ev.touches ? ev.touches[0].clientX : ev.clientX)
        );
        const percent =
          ((clientX - rect.left) / rect.width) * (max - min) + min;
        let v = Math.round(percent);
        if (type === "start") v = Math.max(0, Math.min(v, endPct - 4));
        if (type === "end") v = Math.max(startPct + 4, Math.min(v, 100));
        if (type === "normal") v = Math.max(min, Math.min(v, max));
        setter(v);
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp, { once: true });
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp, { once: true });
    };
  }
  makeDraggable(startBullet, setStart, "start", 0, 100);
  makeDraggable(endBullet, setEnd, "end", 0, 100);
  makeDraggable(entryBullet, setEntry, "normal");
  makeDraggable(centerBullet, setCenter, "normal");
  makeDraggable(exitBullet, setExit, "normal");

  [
    { id: "scale-button-advance-entry-reset", setter: () => setEntry(0) },
    {
      id: "scale-button-advance-center-reset",
      setter: () => setCenter(0),
    },
    { id: "scale-button-advance-exit-reset", setter: () => setExit(0) },
  ].forEach(({ id, setter }) => {
    const b = document.getElementById(id);
    if (b) b.onclick = setter;
  });

  scaleattachAdvanceTimelineIncrementDecrement(
    setEntry,
    setCenter,
    setExit,
    setStart,
    setEnd
  );
  scaleattachCustomTimelineReset(
    setStart,
    setEnd,
    setEntry,
    setCenter,
    setExit
  );
  scale_button_initEffectAnimationDropdownToggle();

  if (
    window.gsap &&
    window.ScrollTrigger &&
    typeof buttonAdvanceSyncCustomTimelineArrow === "function"
  ) {
    buttonAdvanceSyncCustomTimelineArrow(el);
  }
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
  const dropdown = document.getElementById("rotate-effect-animation-type-list");
  const container = document.getElementById(
    "rotate-effect-animation-dropdown-container"
  );
  const displayValue = document.getElementById("rotate-effect-animation-value");

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
  const entryFill = document.getElementById("rotate-button-advance-entry-fill");
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
  const exitCount = document.getElementById("rotate-button-advance-exit-count");

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
      if (el && el.id?.startsWith("block-")) {
        const styleId = `sc-style-${el.id}-${cssVar.replace(
          /[^a-z0-9]/gi,
          ""
        )}`;
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }

        const cssRule = `#${el.id} a.sqs-block-button-element {\n  ${cssVar}: ${val}%;\n}`;
        styleTag.textContent = cssRule;
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
      document.getElementById("blur-button-advance-entry-count")?.textContent ||
      "0%";
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
      document.getElementById("blur-button-advance-exit-count")?.textContent ||
      "0%";
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
  const entryCount = document.getElementById("blur-button-advance-entry-count");

  const centerBullet = document.getElementById(
    "blur-button-advance-center-bullet"
  );
  const centerFill = document.getElementById("blur-button-advance-center-fill");
  const centerCount = document.getElementById(
    "blur-button-advance-center-count"
  );

  const exitBullet = document.getElementById("blur-button-advance-exit-bullet");
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
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
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
      if (el && el.id?.startsWith("block-")) {
        const styleId = `sc-style-${el.id}-${cssVar.replace(
          /[^a-z0-9]/gi,
          ""
        )}`;
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }

        const cssRule = `#${el.id} a.sqs-block-button-element {\n  ${cssVar}: ${val}%;\n}`;
        styleTag.textContent = cssRule;
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
