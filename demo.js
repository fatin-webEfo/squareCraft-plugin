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

  const startBullet = document.getElementById(
    "scale-timeline-start-bullet"
  );
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
        const el = document.getElementById(
          "scale-button-advance-entry-count"
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
          "scale-button-advance-center-count"
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
          "scale-button-advance-exit-count"
        );
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
  const arrow = document.getElementById(
    "scale-effect-animation-type-arrow"
  );
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
        if (btn)
          btn.style.setProperty("--sc-scale-effect-animation", selected);
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
  const startBullet = document.getElementById(
    "scale-timeline-start-bullet"
  );
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
  const exitFill = document.getElementById(
    "scale-button-advance-exit-fill"
  );
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
    readPct(
      getComputedStyle(btn).getPropertyValue("--sc-scale-scroll-end")
    ) || 100;
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
