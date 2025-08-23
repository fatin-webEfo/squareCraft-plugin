function attachAdvanceTimelineIncrementDecrement(
  updateEntry,
  updateCenter,
  updateExit
) {
  let lastFocused = null;
  let keyHoldInterval = null;
  let keyHoldTimeout = null;
  let lastPressedKey = null;

  const readPct = (elId, fallback = 0) => {
    const el = document.getElementById(elId);
    if (!el) return fallback;
    const raw = (el.textContent || el.value || `${fallback}%`).replace("%", "");
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : fallback;
  };

  const writePct = (elId, val) => {
    const el = document.getElementById(elId);
    if (!el) return;
    if (el.tagName === "INPUT") el.value = `${val}%`;
    else el.textContent = `${val}%`;
  };

  const clampTriplet = (v) => Math.max(-100, Math.min(100, v));

  function setup(
    idIncrease,
    idDecrease,
    getCurrent,
    updateFn,
    bulletId,
    countId
  ) {
    const btnInc = document.getElementById(idIncrease);
    const btnDec = document.getElementById(idDecrease);

    const click = (dir) => {
      let v = getCurrent();
      v = clampTriplet(v + (dir === "inc" ? 1 : -1));
      updateFn(v);
      writePct(countId, v);
    };

    if (btnInc) btnInc.onclick = () => click("inc");
    if (btnDec) btnDec.onclick = () => click("dec");

    const bullet = document.getElementById(bulletId);
    if (bullet) {
      bullet.setAttribute("tabindex", "0");
      bullet.addEventListener("click", () => (lastFocused = bulletId));
      bullet.addEventListener("focus", () => (lastFocused = bulletId));
    }
  }

  const getEntry = () => readPct("vertical-button-advance-entry-count", 0);
  const getCenter = () => readPct("vertical-button-advance-center-count", 0);
  const getExit = () => readPct("vertical-button-advance-exit-count", 0);

  setup(
    "vertical-button-advance-entry-increase",
    "vertical-button-advance-entry-decrease",
    getEntry,
    (v) => updateEntry(clampTriplet(v)),
    "vertical-button-advance-entry-bullet",
    "vertical-button-advance-entry-count"
  );
  setup(
    "vertical-button-advance-center-increase",
    "vertical-button-advance-center-decrease",
    getCenter,
    (v) => updateCenter(clampTriplet(v)),
    "vertical-button-advance-center-bullet",
    "vertical-button-advance-center-count"
  );
  setup(
    "vertical-button-advance-exit-increase",
    "vertical-button-advance-exit-decrease",
    getExit,
    (v) => updateExit(clampTriplet(v)),
    "vertical-button-advance-exit-bullet",
    "vertical-button-advance-exit-count"
  );

  document.addEventListener("keydown", (e) => {
    if (!lastFocused || (e.key !== "ArrowRight" && e.key !== "ArrowLeft"))
      return;
    if (keyHoldInterval || keyHoldTimeout) return;

    const dir = e.key === "ArrowRight" ? 1 : -1;
    lastPressedKey = e.key;

    const step = () => {
      if (lastFocused.includes("entry")) {
        const v = clampTriplet(getEntry() + dir);
        updateEntry(v);
        writePct("vertical-button-advance-entry-count", v);
      } else if (lastFocused.includes("center")) {
        const v = clampTriplet(getCenter() + dir);
        updateCenter(v);
        writePct("vertical-button-advance-center-count", v);
      } else if (lastFocused.includes("exit")) {
        const v = clampTriplet(getExit() + dir);
        updateExit(v);
        writePct("vertical-button-advance-exit-count", v);
      }
    };

    step();
    keyHoldTimeout = setTimeout(() => {
      keyHoldInterval = setInterval(step, 100);
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
  const resetBtn =
    document.getElementById("vertical-custom-timeline-reset") ||
    document.getElementById("Typo-vertical-custom-timeline-reset");
  if (!resetBtn) return;
  resetBtn.onclick = () => {
    updateStart(0);
    updateEnd(100);
    updateEntry(0);
    updateCenter(0);
    updateExit(0);
  };
}

export function button_initEffectAnimationDropdownToggle() {
  const arrow =
    document.getElementById("vertical-effect-animation-type-arrow") ||
    document.getElementById("Typo-vertical-effect-animation-type-arrow");
  const dropdown =
    document.getElementById("vertical-effect-animation-type-list") ||
    document.getElementById("Typo-vertical-effect-animation-type-list");
  const container =
    document.getElementById("vertical-effect-animation-dropdown-container") ||
    document.getElementById(
      "Typo-vertical-effect-animation-dropdown-container"
    );
  const displayValue =
    document.getElementById("vertical-effect-animation-value") ||
    document.getElementById("Typo-vertical-effect-animation-value");
  if (!arrow || !dropdown || !container || !displayValue) return;
  if (container.dataset.scDropdownBound === "1") return;
  container.dataset.scDropdownBound = "1";

  const open = () => dropdown.classList.remove("sc-hidden");
  const close = () => dropdown.classList.add("sc-hidden");
  const toggle = () => dropdown.classList.toggle("sc-hidden");
  const isOpen = () => !dropdown.classList.contains("sc-hidden");

  arrow.addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      toggle();
    },
    { passive: true }
  );
  dropdown.addEventListener("click", (e) => e.stopPropagation());

  const onDocClick = (e) => {
    if (!container.contains(e.target)) close();
  };
  const onKey = (e) => {
    if (e.key === "Escape" && isOpen()) close();
  };
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);

  dropdown.querySelectorAll("[data-value]").forEach((item) => {
    item.addEventListener("click", () => {
      const selected =
        item.getAttribute("data-value") || item.textContent.trim();
      displayValue.textContent = selected;
      try {
        const el =
          typeof getSelectedElement === "function"
            ? getSelectedElement()
            : null;
        const btn =
          el?.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
              "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
          ) || el;
        if (btn)
          btn.style.setProperty("--sc-vertical-effect-animation", selected);
      } catch (_) {}
      close();
    });
  });

  container.__scDropdownDispose = () => {
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKey);
    delete container.dataset.scDropdownBound;
  };
}

export function initButtonAdvanceStyles(getSelectedElement) {
  const startBullet =
    document.getElementById("vertical-timeline-start-bullet") ||
    document.getElementById("Typo-vertical-timeline-start-bullet");
  const endBullet =
    document.getElementById("vertical-timeline-end-bullet") ||
    document.getElementById("Typo-vertical-timeline-end-bullet");
  const startFill =
    document.getElementById("vertical-timeline-start-fill") ||
    document.getElementById("Typo-vertical-timeline-start-fill");
  const endFill =
    document.getElementById("vertical-timeline-end-fill") ||
    document.getElementById("Typo-vertical-timeline-end-fill");
  const startValue =
    document.getElementById("vertical-timelineStartValue") ||
    document.getElementById("Typo-vertical-timelineStartValue");
  const endValue =
    document.getElementById("vertical-timelineEndValue") ||
    document.getElementById("Typo-vertical-timelineEndValue");

  const entryBullet =
    document.getElementById("vertical-button-advance-entry-bullet") ||
    document.getElementById("Typo-vertical-advance-entry-bullet");
  const entryFill =
    document.getElementById("vertical-button-advance-entry-fill") ||
    document.getElementById("Typo-vertical-advance-entry-fill");
  const entryCount =
    document.getElementById("vertical-button-advance-entry-count") ||
    document.getElementById("Typo-vertical-advance-entry-count");

  const centerBullet =
    document.getElementById("vertical-button-advance-center-bullet") ||
    document.getElementById("Typo-vertical-advance-center-bullet");
  const centerFill =
    document.getElementById("vertical-button-advance-center-fill") ||
    document.getElementById("Typo-vertical-advance-center-fill");
  const centerCount =
    document.getElementById("vertical-button-advance-center-count") ||
    document.getElementById("Typo-vertical-advance-center-count");

  const exitBullet =
    document.getElementById("vertical-button-advance-exit-bullet") ||
    document.getElementById("Typo-vertical-advance-exit-bullet");
  const exitFill =
    document.getElementById("vertical-button-advance-exit-fill") ||
    document.getElementById("Typo-vertical-advance-exit-fill");
  const exitCount =
    document.getElementById("vertical-button-advance-exit-count") ||
    document.getElementById("Typo-vertical-advance-exit-count");

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
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
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
      `#${el.id} a.sqs-block-button-element,` +
      `#${el.id} button.sqs-button-element--primary,` +
      `#${el.id} button.sqs-button-element--secondary,` +
      `#${el.id} button.sqs-button-element--tertiary { ${cssVar}: ${val}%; ${twin}: ${val}%; }`;
  }

  function paintStartEnd() {
    startValue.textContent = `${Math.round(startPct)}%`;
    endValue.textContent = `${Math.round(endPct)}%`;
    const endScale = Math.max(0, (100 - endPct) / 100);
    if (window.gsap) {
      gsap.set(startBullet, { left: `${startPct}%`, xPercent: -50 });
      gsap.set(endBullet, { left: `${endPct}%`, xPercent: -50 });
      gsap.set(startFill, {
        left: "0%",
        width: `${startPct}%`,
        backgroundColor: "var(--sc-theme-accent)",
      });
      gsap.set(endFill, {
        left: "auto",
        width: "100%",
        transform: `scaleX(${endScale})`,
        transformOrigin: "right",
        backgroundColor: "#F6B67B",
      });
    } else {
      startBullet.style.left = `${startPct}%`;
      endBullet.style.left = `${endPct}%`;
      startFill.style.left = `0%`;
      startFill.style.width = `${startPct}%`;
      startFill.style.backgroundColor = "var(--sc-theme-accent)";
      endFill.style.left = "auto";
      endFill.style.right = "0";
      endFill.style.width = "100%";
      endFill.style.transformOrigin = "right";
      endFill.style.transform = `scaleX(${endScale})`;
      endFill.style.backgroundColor = "#F6B67B";
    }
  }

  function paintTriplet() {
    entryCount.textContent = `${Math.round(entryPct)}%`;
    centerCount.textContent = `${Math.round(centerPct)}%`;
    exitCount.textContent = `${Math.round(exitPct)}%`;
    const paintOne = (bullet, fill, v) => {
      const percent = (v + 100) / 2;
      const fillLeft = v < 0 ? percent : 50;
      const fillWidth = Math.abs(v / 2);
      if (window.gsap) {
        gsap.set(bullet, { left: `${percent}%`, xPercent: -50 });
        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-theme-accent)",
        });
      } else {
        bullet.style.left = `${percent}%`;
        fill.style.left = `${fillLeft}%`;
        fill.style.width = `${fillWidth}%`;
      }
    };
    paintOne(entryBullet, entryFill, entryPct);
    paintOne(centerBullet, centerFill, centerPct);
    paintOne(exitBullet, exitFill, exitPct);
  }

  function setStart(val) {
    startPct = Math.max(0, Math.min(val, endPct - 4));
    writeVar("--sc-vertical-scroll-start", startPct);
    paintStartEnd();
  }
  function setEnd(val) {
    endPct = Math.max(startPct + 4, Math.min(val, 100));
    writeVar("--sc-vertical-scroll-end", endPct);
    paintStartEnd();
  }
  function setEntry(v) {
    entryPct = Math.max(-100, Math.min(100, v));
    writeVar("--sc-vertical-scroll-entry", entryPct);
    paintTriplet();
  }
  function setCenter(v) {
    centerPct = Math.max(-100, Math.min(100, v));
    writeVar("--sc-vertical-scroll-center", centerPct);
    paintTriplet();
  }
  function setExit(v) {
    exitPct = Math.max(-100, Math.min(100, v));
    writeVar("--sc-vertical-scroll-exit", exitPct);
    paintTriplet();
  }

  writeVar("--sc-vertical-scroll-start", startPct);
  writeVar("--sc-vertical-scroll-end", endPct);
  writeVar("--sc-vertical-scroll-entry", entryPct);
  writeVar("--sc-vertical-scroll-center", centerPct);
  writeVar("--sc-vertical-scroll-exit", exitPct);
  paintStartEnd();
  paintTriplet();

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
  makeDraggable(entryBullet, setEntry, "normal", -100, 100);
  makeDraggable(centerBullet, setCenter, "normal", -100, 100);
  makeDraggable(exitBullet, setExit, "normal", -100, 100);

  [
    { id: "vertical-button-advance-entry-reset", setter: () => setEntry(0) },
    { id: "vertical-button-advance-center-reset", setter: () => setCenter(0) },
    { id: "vertical-button-advance-exit-reset", setter: () => setExit(0) },
  ].forEach(({ id, setter }) => {
    const b =
      document.getElementById(id) ||
      document.getElementById(id.replace("vertical-", "Typo-"));
    if (b) b.onclick = setter;
  });

  attachAdvanceTimelineIncrementDecrement(setEntry, setCenter, setExit);
  attachCustomTimelineReset(setStart, setEnd, setEntry, setCenter, setExit);
  button_initEffectAnimationDropdownToggle();
  el.__scButtonAdvance = { setStart, setEnd, setEntry, setCenter, setExit };

  if (window.gsap && window.ScrollTrigger) {
if (typeof buttonAdvanceSyncCustomTimelineArrow === "function")
  buttonAdvanceSyncCustomTimelineArrow(el);
  }
}



// ──────────────────────────────────────────────────────────────

 function horizontalattachAdvanceTimelineIncrementDecrement(
  updateEntry,
  updateCenter,
  updateExit
) {
  let lastFocused = null;
  let keyHoldInterval = null;
  let keyHoldTimeout = null;
  let lastPressedKey = null;

  const readPct = (elId, fallback = 0) => {
    const el = document.getElementById(elId);
    if (!el) return fallback;
    const raw = (el.textContent || el.value || `${fallback}%`).replace("%", "");
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : fallback;
  };

  const writePct = (elId, val) => {
    const el = document.getElementById(elId);
    if (!el) return;
    if (el.tagName === "INPUT") el.value = `${val}%`;
    else el.textContent = `${val}%`;
  };

  const clampTriplet = (v) => Math.max(-100, Math.min(100, v));

  function setup(idIncrease, idDecrease, getCurrent, updateFn, bulletId, countId) {
    const btnInc = document.getElementById(idIncrease);
    const btnDec = document.getElementById(idDecrease);

    const click = (dir) => {
      let v = getCurrent();
      v = clampTriplet(v + (dir === "inc" ? 1 : -1));
      updateFn(v);
      writePct(countId, v);
    };

    if (btnInc) btnInc.onclick = () => click("inc");
    if (btnDec) btnDec.onclick = () => click("dec");

    const bullet = document.getElementById(bulletId);
    if (bullet) {
      bullet.setAttribute("tabindex", "0");
      bullet.addEventListener("click", () => (lastFocused = bulletId));
      bullet.addEventListener("focus", () => (lastFocused = bulletId));
    }
  }

  const getEntry  = () => readPct("horizontal-button-advance-entry-count", 0);
  const getCenter = () => readPct("horizontal-button-advance-center-count", 0);
  const getExit   = () => readPct("horizontal-button-advance-exit-count", 0);

  setup(
    "horizontal-button-advance-entry-increase",
    "horizontal-button-advance-entry-decrease",
    getEntry,
    (v) => updateEntry(clampTriplet(v)),
    "horizontal-button-advance-entry-bullet",
    "horizontal-button-advance-entry-count"
  );
  setup(
    "horizontal-button-advance-center-increase",
    "horizontal-button-advance-center-decrease",
    getCenter,
    (v) => updateCenter(clampTriplet(v)),
    "horizontal-button-advance-center-bullet",
    "horizontal-button-advance-center-count"
  );
  setup(
    "horizontal-button-advance-exit-increase",
    "horizontal-button-advance-exit-decrease",
    getExit,
    (v) => updateExit(clampTriplet(v)),
    "horizontal-button-advance-exit-bullet",
    "horizontal-button-advance-exit-count"
  );

  // keyboard hold on last-focused bullet (Right/Up = +1, Left/Down = -1)
  document.addEventListener("keydown", (e) => {
    if (
      !lastFocused ||
      !["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)
    ) return;
    if (keyHoldInterval || keyHoldTimeout) return;

    const dir = (e.key === "ArrowRight" || e.key === "ArrowUp") ? 1 : -1;
    lastPressedKey = e.key;

    const step = () => {
      if (lastFocused.includes("entry")) {
        const v = clampTriplet(getEntry() + dir);
        updateEntry(v);
        writePct("horizontal-button-advance-entry-count", v);
      } else if (lastFocused.includes("center")) {
        const v = clampTriplet(getCenter() + dir);
        updateCenter(v);
        writePct("horizontal-button-advance-center-count", v);
      } else if (lastFocused.includes("exit")) {
        const v = clampTriplet(getExit() + dir);
        updateExit(v);
        writePct("horizontal-button-advance-exit-count", v);
      }
    };

    step();
    keyHoldTimeout = setTimeout(() => {
      keyHoldInterval = setInterval(step, 100);
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

export function horizontalattachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const resetBtn = document.getElementById("horizontal-custom-timeline-reset");
  if (!resetBtn) return;
  resetBtn.onclick = () => {
    updateStart(0);
    updateEnd(100);
    updateEntry(0);
    updateCenter(0);
    updateExit(0);
  };
}

export function horizontal_button_initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("horizontal-effect-animation-type-arrow");
  const dropdown = document.getElementById("horizontal-effect-animation-type-list");
  const container = document.getElementById("horizontal-effect-animation-dropdown-container");
  const displayValue = document.getElementById("horizontal-effect-animation-value");
  if (!arrow || !dropdown || !container || !displayValue) return;
  if (container.dataset.scDropdownBound === "1") return;
  container.dataset.scDropdownBound = "1";

  const open = () => dropdown.classList.remove("sc-hidden");
  const close = () => dropdown.classList.add("sc-hidden");
  const toggle = () => dropdown.classList.toggle("sc-hidden");
  const isOpen = () => !dropdown.classList.contains("sc-hidden");

  arrow.addEventListener("click", (e) => { e.stopPropagation(); toggle(); }, { passive: true });
  dropdown.addEventListener("click", (e) => e.stopPropagation());

  const onDocClick = (e) => { if (!container.contains(e.target)) close(); };
  const onKey = (e) => { if (e.key === "Escape" && isOpen()) close(); };
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);

  dropdown.querySelectorAll("[data-value]").forEach((item) => {
    item.addEventListener("click", () => {
      const selected = item.getAttribute("data-value") || item.textContent.trim();
      displayValue.textContent = selected;
      try {
        const el = typeof getSelectedElement === "function" ? getSelectedElement() : null;
        const btn = el?.querySelector(
          "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
          "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
        );
        if (btn) btn.style.setProperty("--sc-horizontal-effect-animation", selected);
      } catch {}
      close();
    });
  });

  container.__scDropdownDispose = () => {
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKey);
    delete container.dataset.scDropdownBound;
  };
}

export function horizontalinitButtonAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById("horizontal-timeline-start-bullet");
  const endBullet   = document.getElementById("horizontal-timeline-end-bullet");
  const startFill   = document.getElementById("horizontal-timeline-start-fill");
  const endFill     = document.getElementById("horizontal-timeline-end-fill");
  const startValue  = document.getElementById("horizontal-timelineStartValue");
  const endValue    = document.getElementById("horizontal-timelineEndValue");

  const entryBullet = document.getElementById("horizontal-button-advance-entry-bullet");
  const entryFill   = document.getElementById("horizontal-button-advance-entry-fill");
  const entryCount  = document.getElementById("horizontal-button-advance-entry-count");

  const centerBullet = document.getElementById("horizontal-button-advance-center-bullet");
  const centerFill   = document.getElementById("horizontal-button-advance-center-fill");
  const centerCount  = document.getElementById("horizontal-button-advance-center-count");

  const exitBullet = document.getElementById("horizontal-button-advance-exit-bullet");
  const exitFill   = document.getElementById("horizontal-button-advance-exit-fill");
  const exitCount  = document.getElementById("horizontal-button-advance-exit-count");

  if (
    !startBullet || !endBullet || !startFill || !endFill ||
    !startValue  || !endValue  ||
    !entryBullet || !entryFill || !entryCount ||
    !centerBullet|| !centerFill|| !centerCount ||
    !exitBullet  || !exitFill  || !exitCount
  ) return;

  const el = getSelectedElement?.();
  if (!el) return;

  const btn = el.querySelector(
    "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
    "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
  );
  if (!btn) return;

  const readPct = (v) => {
    const n = parseFloat(String(v).replace("%", ""));
    return Number.isFinite(n) ? n : 0;
  };

  let startPct =
    readPct(getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-start")) || 0;
  let endPct =
    readPct(getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-end")) || 100;
  if (endPct < startPct + 4) endPct = startPct + 4;

  let entryPct =
    readPct(getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-entry"));
  let centerPct =
    readPct(getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-center"));
  let exitPct =
    readPct(getComputedStyle(btn).getPropertyValue("--sc-horizontal-scroll-exit"));

  function writeVar(cssVar, val) {
    const styleId = `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    styleTag.textContent =
      `#${el.id} a.sqs-block-button-element,` +
      `#${el.id} button.sqs-button-element--primary,` +
      `#${el.id} button.sqs-button-element--secondary,` +
      `#${el.id} button.sqs-button-element--tertiary { ${cssVar}: ${val}%; }`;
  }

  function paintStartEnd() {
    startValue.textContent = `${Math.round(startPct)}%`;
    endValue.textContent   = `${Math.round(endPct)}%`;

    if (window.gsap) {
      gsap.set(startBullet, { top: `${startPct}%`, yPercent: -50 });
      gsap.set(endBullet,   { top: `${endPct}%`,   yPercent: -50 });
      gsap.set(startFill,   { top: "0%", height: `${startPct}%`, backgroundColor: "var(--sc-theme-accent)" });
      const rem = Math.max(0, 100 - endPct);
      gsap.set(endFill,     { top: `${endPct}%`, height: `${rem}%`, backgroundColor: "#F6B67B" });
    } else {
      startBullet.style.top = `${startPct}%`; startBullet.style.transform = "translateY(-50%)";
      endBullet.style.top   = `${endPct}%`;   endBullet.style.transform   = "translateY(-50%)";
      startFill.style.top   = "0%";           startFill.style.height      = `${startPct}%`;
      endFill.style.top     = `${endPct}%`;   endFill.style.height        = `${Math.max(0, 100 - endPct)}%`;
    }
  }

  function paintTriplet() {
    entryCount.textContent  = `${Math.round(entryPct)}%`;
    centerCount.textContent = `${Math.round(centerPct)}%`;
    exitCount.textContent   = `${Math.round(exitPct)}%`;

    const paintOne = (bullet, fill, v) => {
      const percent    = (v + 100) / 2; // -100..100 → 0..100
      const fillTop    = v < 0 ? percent : 50;
      const fillHeight = Math.abs(v / 2);

      if (window.gsap) {
        gsap.set(bullet, { top: `${percent}%`, yPercent: -50 });
        gsap.set(fill,   { top: `${fillTop}%`, height: `${fillHeight}%`, backgroundColor: "var(--sc-theme-accent)" });
      } else {
        bullet.style.top = `${percent}%`; bullet.style.transform = "translateY(-50%)";
        fill.style.top   = `${fillTop}%`; fill.style.height      = `${fillHeight}%`;
        fill.style.backgroundColor = "var(--sc-theme-accent)";
      }
    };

    paintOne(entryBullet,  entryFill,  entryPct);
    paintOne(centerBullet, centerFill, centerPct);
    paintOne(exitBullet,   exitFill,   exitPct);
  }

  function setStart(val) {
    startPct = Math.max(0, Math.min(val, endPct - 4));
    writeVar("--sc-horizontal-scroll-start", startPct);
    paintStartEnd();
  }
  function setEnd(val) {
    endPct = Math.max(startPct + 4, Math.min(val, 100));
    writeVar("--sc-horizontal-scroll-end", endPct);
    paintStartEnd();
  }
  function setEntry(v) {
    entryPct = Math.max(-100, Math.min(100, v));
    writeVar("--sc-horizontal-scroll-entry", entryPct);
    paintTriplet();
  }
  function setCenter(v) {
    centerPct = Math.max(-100, Math.min(100, v));
    writeVar("--sc-horizontal-scroll-center", centerPct);
    paintTriplet();
  }
  function setExit(v) {
    exitPct = Math.max(-100, Math.min(100, v));
    writeVar("--sc-horizontal-scroll-exit", exitPct);
    paintTriplet();
  }

  // initialize
  writeVar("--sc-horizontal-scroll-start", startPct);
  writeVar("--sc-horizontal-scroll-end", endPct);
  writeVar("--sc-horizontal-scroll-entry", entryPct);
  writeVar("--sc-horizontal-scroll-center", centerPct);
  writeVar("--sc-horizontal-scroll-exit", exitPct);
  paintStartEnd();
  paintTriplet();

  function makeDraggable(bullet, setter, type, min = -100, max = 100) {
    if (!bullet) return;
    bullet.onmousedown = (e) => {
      e.preventDefault();
      const container = bullet.parentElement;
      const rect = container.getBoundingClientRect();

      const onMove = (ev) => {
        const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
        const clientY = Math.max(rect.top, Math.min(rect.bottom, y));
        const percent = ((clientY - rect.top) / rect.height) * (max - min) + min;
        let v = Math.round(percent);

        if (type === "start") v = Math.max(0, Math.min(v, endPct - 4));
        if (type === "end")   v = Math.max(startPct + 4, Math.min(v, 100));
        if (type === "normal")v = Math.max(min, Math.min(v, max));

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

  makeDraggable(startBullet,  setStart,  "start",  0,   100);
  makeDraggable(endBullet,    setEnd,    "end",    0,   100);
  makeDraggable(entryBullet,  setEntry,  "normal", -100, 100);
  makeDraggable(centerBullet, setCenter, "normal", -100, 100);
  makeDraggable(exitBullet,   setExit,   "normal", -100, 100);

  [
    { id: "horizontal-button-advance-entry-reset",  setter: () => setEntry(0) },
    { id: "horizontal-button-advance-center-reset", setter: () => setCenter(0) },
    { id: "horizontal-button-advance-exit-reset",   setter: () => setExit(0) },
  ].forEach(({ id, setter }) => {
    const b = document.getElementById(id);
    if (b) b.onclick = setter;
  });

  horizontalattachAdvanceTimelineIncrementDecrement(setEntry, setCenter, setExit);
  horizontalattachCustomTimelineReset(setStart, setEnd, setEntry, setCenter, setExit);
  horizontal_button_initEffectAnimationDropdownToggle();

  el.__scHorizontalButtonAdvance = { setStart, setEnd, setEntry, setCenter, setExit };
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
      updateEntry(100);
      updateCenter(100);
      updateExit(100);
    };
  }
}

function opacityinitEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("opacity-effect-animation-type-arrow");
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

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
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

  updateEntry(getCurrentPercentage("--sc-opacity-scroll-entry") || 100);
  updateCenter(getCurrentPercentage("--sc-opacity-scroll-center") || 100);
  updateExit(getCurrentPercentage("--sc-opacity-scroll-exit") || 100);

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
      document.getElementById("scale-button-advance-exit-count")?.textContent ||
      "0%";
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
  const dropdown = document.getElementById("scale-effect-animation-type-list");
  const container = document.getElementById(
    "scale-effect-animation-dropdown-container"
  );
  const displayValue = document.getElementById("scale-effect-animation-value");

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

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
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
