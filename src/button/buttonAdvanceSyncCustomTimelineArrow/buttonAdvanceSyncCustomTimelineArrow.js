function getViewportProgress(el) {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (vh <= 0) return 0.5;
  const toolbar = document.querySelector(
    '[data-routing="editor-toolbar"], .sqs-editor-controls, .sqs-navheader'
  );
  const th = toolbar ? toolbar.getBoundingClientRect().height : 0;
  const visibleTop = th;
  const visibleHeight = Math.max(1, vh - th);
  const r = el.getBoundingClientRect();
  const center = r.top + r.height / 2;
  let t = (center - visibleTop) / visibleHeight;
  if (Number.isNaN(t)) t = 0.5;
  return Math.max(0, Math.min(1, t));
}

export function buttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("vertical-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "vertical-timeline-start-bullet"
    );
    const endBullet = document.getElementById("vertical-timeline-end-bullet");
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
  }

  function setupScrollAnimation(btn, arrow) {
    const getVar = (v) =>
      parseFloat(
        getComputedStyle(btn).getPropertyValue(v).trim().replace("%", "")
      ) || 0;
    const entryY = () => getVar("--sc-vertical-scroll-entry") / 2;
    const centerY = () => getVar("--sc-vertical-scroll-center") / 2;
    const exitY = () => getVar("--sc-vertical-scroll-exit") / 2;
    const start = () => getVar("--sc-vertical-scroll-start") / 100;
    const end = () => getVar("--sc-vertical-scroll-end") / 100;

    const gs = window.gsap;
    const ST = window.ScrollTrigger;
    if (gs && ST) {
      gs.registerPlugin(ST);
      ST.getAll().forEach((t) => {
        if (t.trigger === selectedElement) t.kill();
      });
    }

    let currentY = null;

    const updateYTransform = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();
      const eY = entryY();
      const cY = centerY();
      const xY = exitY();
      let y;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        y = eY + (cY - eY) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        y = cY + (xY - cY) * k;
      } else {
        y = cY;
      }
      y = Math.max(-50, Math.min(50, y));
      if (y !== currentY) {
        currentY = y;
        const ease = window.__typoScrollEase || "none";
        if (gs) {
          gs.to(btn, {
            y: `${y}vh`,
            ease,
            duration: ease === "none" ? 0 : 0.6,
            overwrite: true,
          });
        } else {
          btn.style.transform = `translateY(${y}vh)`;
        }
      }
    };

    if (gs && ST) {
      ST.create({
        trigger: selectedElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: updateYTransform,
      });
      ST.refresh(true);
    } else {
      window.addEventListener("scroll", updateYTransform, { passive: true });
      window.addEventListener("resize", updateYTransform, { passive: true });
    }

    const observer = new MutationObserver(updateYTransform);
    observer.observe(btn, { attributes: true, attributeFilter: ["style"] });
    setInterval(updateYTransform, 150);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";
      const s = start();
      const e = end();
      const buffer = 0.001;
      if (t < s - buffer) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + buffer) arrow.style.backgroundColor = "#F6B67B";
      else arrow.style.backgroundColor = "#FFFFFF";
      requestAnimationFrame(loopArrow);
    }

    loopArrow();
  }

  waitForElements((arrow) => {
    const btn =
      selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      ) || selectedElement;
    if (!btn) return;
    setupScrollAnimation(btn, arrow);
  });
}

export function horizontalbuttonAdvanceSyncCustomTimelineArrow(
  selectedElement
) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("horizontal-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "horizontal-timeline-start-bullet"
    );
    const endBullet = document.getElementById("horizontal-timeline-end-bullet");
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
  }

  function setupScrollAnimation(btn, arrow) {
    const getPct = (v, fb = 0) => {
      const raw = getComputedStyle(btn).getPropertyValue(v).trim();
      const n = parseFloat(raw.replace("%", ""));
      return Number.isFinite(n) ? n : fb;
    };
    const entryX = () => getPct("--sc-horizontal-scroll-entry");
    const centerX = () => getPct("--sc-horizontal-scroll-center");
    const exitX = () => getPct("--sc-horizontal-scroll-exit");
    const start = () => getPct("--sc-horizontal-scroll-start", 0) / 100;
    const end = () => getPct("--sc-horizontal-scroll-end", 100) / 100;

    const easeName = () => {
      const el = document.getElementById("horizontal-effect-animation-value");
      const n =
        el?.getAttribute("data-value") || el?.textContent?.trim() || "none";
      const map = {
        none: "none",
        Linear: "none",
        linear: "none",
        "ease-in": "power1.in",
        "ease-out": "power1.out",
        "ease-in-out": "power1.inOut",
        "power1.out": "power1.out",
        "power2.out": "power2.out",
        "power3.out": "power3.out",
        "power4.out": "power4.out",
        "expo.out": "expo.out",
        "elastic.out": "elastic.out",
        "bounce.out": "bounce.out",
      };
      return (
        map[n] || window.__buttonScrollEase || window.__typoScrollEase || "none"
      );
    };

    const gs = window.gsap;
    const ST = window.ScrollTrigger;
    if (gs && ST) {
      gs.registerPlugin(ST);
      ST.getAll().forEach((t) => {
        if (t.trigger === selectedElement) t.kill();
      });
    }

    let lastXPct = null;

    const updateXTransform = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();
      const ex = entryX();
      const cx = centerX();
      const xx = exitX();
      let xPct;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        xPct = ex + (cx - ex) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        xPct = cx + (xx - cx) * k;
      } else {
        xPct = cx;
      }
      if (xPct !== lastXPct) {
        lastXPct = xPct;
        const ease = easeName();
        const target = (xPct / 2).toFixed(3) + "vw";
        if (gs) {
          gs.to(btn, {
            x: target,
            ease,
            duration: ease === "none" ? 0.25 : 0.6,
            overwrite: true,
          });
        } else {
          btn.style.transform = `translateX(${target})`;
        }
      }
    };

    if (gs && ST) {
      ST.create({
        trigger: selectedElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: updateXTransform,
      });
      ST.refresh(true);
    } else {
      window.addEventListener("scroll", updateXTransform, { passive: true });
      window.addEventListener("resize", updateXTransform, { passive: true });
    }

    const observer = new MutationObserver(updateXTransform);
    observer.observe(btn, { attributes: true, attributeFilter: ["style"] });
    setInterval(updateXTransform, 150);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";
      const s = start();
      const e = end();
      const buffer = 0.001;
      if (t < s - buffer) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + buffer) arrow.style.backgroundColor = "#F6B67B";
      else arrow.style.backgroundColor = "#FFFFFF";
      requestAnimationFrame(loopArrow);
    }
    loopArrow();
  }

  waitForElements((arrow) => {
    const btn =
      selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      ) || selectedElement;
    if (!btn) return;
    setupScrollAnimation(btn, arrow);
  });
}


if (typeof getViewportProgress !== "function") {
  function getViewportProgress(el) {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (vh <= 0) return 0.5;
    const toolbar = document.querySelector(
      '[data-routing="editor-toolbar"], .sqs-editor-controls, .sqs-navheader'
    );
    const th = toolbar ? toolbar.getBoundingClientRect().height : 0;
    const visibleTop = th;
    const visibleHeight = Math.max(1, vh - th);
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    let t = (center - visibleTop) / visibleHeight;
    if (Number.isNaN(t)) t = 0.5;
    return Math.max(0, Math.min(1, t));
  }
}

export function opacitybuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("opacity-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "opacity-timeline-start-bullet"
    );
    const endBullet = document.getElementById("opacity-timeline-end-bullet");
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
  }

  function setupScrollAnimation(btn, arrow) {
    const content = selectedElement.querySelector(".sqs-block-content");
    const els = [btn, content, selectedElement].filter(Boolean);

    const sticky = { entry: 0, center: 0, exit: 0, start: 0, end: 100 };

    const readPctVarSticky = (keys, k, fb) => {
      for (const el of els) {
        const cs = getComputedStyle(el);
        for (const name of keys) {
          const raw = cs.getPropertyValue(name);
          if (raw) {
            const v = parseFloat(String(raw).trim().replace("%", ""));
            if (Number.isFinite(v)) {
              sticky[k] = v;
              return v;
            }
          }
        }
      }
      return typeof sticky[k] === "number" ? sticky[k] : fb;
    };

    const entry = () =>
      readPctVarSticky(
        ["--sc-opacity-scroll-entry", "--sc-Typo-opacity-scroll-entry"],
        "entry",
        0
      );
    const center = () =>
      readPctVarSticky(
        ["--sc-opacity-scroll-center", "--sc-Typo-opacity-scroll-center"],
        "center",
        0
      );
    const exit = () =>
      readPctVarSticky(
        ["--sc-opacity-scroll-exit", "--sc-Typo-opacity-scroll-exit"],
        "exit",
        0
      );
    const start = () =>
      readPctVarSticky(
        ["--sc-opacity-scroll-start", "--sc-Typo-opacity-scroll-start"],
        "start",
        0
      ) / 100;
    const end = () =>
      readPctVarSticky(
        ["--sc-opacity-scroll-end", "--sc-Typo-opacity-scroll-end"],
        "end",
        100
      ) / 100;

    const easeName = () => {
      const el = document.getElementById("opacity-effect-animation-value");
      const n =
        el?.getAttribute("data-value") || el?.textContent?.trim() || "none";
      const map = {
        none: "none",
        Linear: "none",
        linear: "none",
        "ease-in": "power1.in",
        "ease-out": "power1.out",
        "ease-in-out": "power1.inOut",
        "power1.out": "power1.out",
        "power2.out": "power2.out",
        "power3.out": "power3.out",
        "power4.out": "power4.out",
        "expo.out": "expo.out",
        "elastic.out": "elastic.out",
        "bounce.out": "bounce.out",
      };
      return (
        map[n] || window.__buttonScrollEase || window.__typoScrollEase || "none"
      );
    };

    const gs = window.gsap;
    const ST = window.ScrollTrigger;
    if (gs && ST) {
      gs.registerPlugin(ST);
      ST.getAll().forEach((t) => {
        if (t.trigger === selectedElement) t.kill();
      });
    }

    let lastOpacity = null;

    const updateOpacity = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();
      const en = entry();
      const ce = center();
      const ex = exit();
      let v;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        v = en + (ce - en) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        v = ce + (ex - ce) * k;
      } else {
        v = ce;
      }
      v = Math.max(0, Math.min(100, v));
      const op = v / 100;
      if (op !== lastOpacity) {
        lastOpacity = op;
        const ease = easeName();
        if (gs) {
          gs.to(btn, {
            opacity: op,
            ease,
            duration: ease === "none" ? 0.25 : 0.6,
            overwrite: true,
          });
        } else {
          btn.style.opacity = String(op);
        }
      }
    };

    if (gs && ST) {
      ST.create({
        trigger: selectedElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: updateOpacity,
      });
      ST.refresh(true);
    } else {
      window.addEventListener("scroll", updateOpacity, { passive: true });
      window.addEventListener("resize", updateOpacity, { passive: true });
    }

    const observer = new MutationObserver(updateOpacity);
    observer.observe(btn, { attributes: true, attributeFilter: ["style"] });
    setInterval(updateOpacity, 150);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";
      const s = start(),
        e = end(),
        buffer = 0.001;
      if (t < s - buffer) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + buffer) arrow.style.backgroundColor = "#F6B67B";
      else arrow.style.backgroundColor = "#FFFFFF";
      requestAnimationFrame(loopArrow);
    }
    loopArrow();
  }

  waitForElements((arrow) => {
    const btn =
      selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      ) || selectedElement;
    if (!btn) return;
    setupScrollAnimation(btn, arrow);
  });
}

function __scSetOpacityVarOnButton(blockEl, cssVar, valPct) {
  const v = `${Math.max(0, Math.min(100, valPct))}%`;
  const content = blockEl?.querySelector(".sqs-block-content");
  const btn =
    blockEl?.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    ) || blockEl;
  const twin = cssVar.replace("--sc-opacity-", "--sc-Typo-opacity-");
  if (btn) {
    btn.style.setProperty(cssVar, v);
    btn.style.setProperty(twin, v);
  }
  if (content) {
    content.style.setProperty(cssVar, v);
    content.style.setProperty(twin, v);
  }
}

export function opacitybutton_initEffectAnimationDropdownToggle() {
  const arrow = document.getElementById("opacity-effect-animation-type-arrow");
  const list = document.getElementById("opacity-effect-animation-type-list");
  const display = document.getElementById("opacity-effect-animation-value");
  if (!arrow || !list || !display) return;
  arrow.onclick = () => list.classList.toggle("sc-hidden");
  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const selected = item.getAttribute("data-value");
      display.textContent = item.textContent.trim();
      display.setAttribute("data-value", selected);
      window.__typoScrollEase = selected;
      list.classList.add("sc-hidden");
    };
  });
  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target))
      list.classList.add("sc-hidden");
  });
}

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

  let entryVal = 0,
    centerVal = 0,
    exitVal = 0,
    startVal = 0,
    endVal = 100;

  function setup(idIncrease, idDecrease, getCurrent, updateFn, bulletId) {
    const btnInc = document.getElementById(idIncrease);
    const btnDec = document.getElementById(idDecrease);

    const clickHandler = (type) => {
      let val = getCurrent();
      val = type === "inc" ? val + 1 : val - 1;
      if (bulletId.includes("start")) {
        val = Math.max(0, Math.min(val, endVal - 4));
        startVal = val;
      } else if (bulletId.includes("end")) {
        val = Math.max(startVal + 4, Math.min(val, 100));
        endVal = val;
      } else {
        val = Math.max(0, Math.min(100, val));
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
    const n = parseInt(String(raw).replace(/[^\d-]/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
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
  setup(
    "opacity-timeline-start-increase",
    "opacity-timeline-start-decrease",
    () => getVal("opacity-timelineStartValue"),
    updateStart,
    "opacity-timeline-start-bullet"
  );
  setup(
    "opacity-timeline-end-increase",
    "opacity-timeline-end-decrease",
    () => getVal("opacity-timelineEndValue"),
    updateEnd,
    "opacity-timeline-end-bullet"
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

export function opacityattachCustomTimelineReset(
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
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
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
    __scSetOpacityVarOnButton(el, cssVar, val);
  }

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = 0, max = 100) =>
    (val) => {
      val = Math.max(min, Math.min(max, val));
      if (countEl.tagName === "INPUT") countEl.value = `${val}%`;
      else countEl.textContent = `${val}%`;
      window.gsap?.set(bullet, { left: `${val}%`, xPercent: -50 });
      if (position === "left") {
        window.gsap?.set(fill, { width: `${val}%`, left: "0" });
      } else {
        window.gsap?.set(fill, {
          left: "auto",
          transform: `scaleX(${(100 - val) / 100})`,
          transformOrigin: "right",
          width: "100%",
          backgroundColor: "#F6B67B",
        });
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
    "--sc-opacity-scroll-entry"
  );
  const setCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-opacity-scroll-center"
  );
  const setExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-opacity-scroll-exit"
  );

  setEntry(entryPct);
  setCenter(centerPct);
  setExit(exitPct);
  setStart(startPct);
  window.gsap?.set(startBullet, { left: `${startPct}%`, xPercent: -50 });
  setEnd(endPct);

  function bindTripletInput(input, fn) {
    input.addEventListener("input", (e) => {
      let v = parseInt(String(e.target.value).replace(/[^\d-]/g, ""), 10);
      if (!Number.isFinite(v)) v = 0;
      v = Math.max(0, Math.min(100, v));
      e.target.value = v + "%";
      fn(v);
    });
    input.addEventListener("blur", (e) => {
      let v = parseInt(String(e.target.value).replace(/[^\d-]/g, ""), 10);
      if (!Number.isFinite(v)) v = 0;
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
      const v = parseInt(String(e.target.value).replace(/[^\d-]/g, ""), 10);
      e.target.value = Number.isFinite(v) ? v : 0;
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
  makeDraggable(entryBullet, setEntry, "normal");
  makeDraggable(centerBullet, setCenter, "normal");
  makeDraggable(exitBullet, setExit, "normal");

  [
    { id: "opacity-button-advance-entry-reset", setter: () => setEntry(0) },
    { id: "opacity-button-advance-center-reset", setter: () => setCenter(0) },
    { id: "opacity-button-advance-exit-reset", setter: () => setExit(0) },
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


export function scalebuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("scale-custom-timeline-arrow");
    const startBullet = document.getElementById("scale-timeline-start-bullet");
    const endBullet = document.getElementById("scale-timeline-end-bullet");
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
  }

  function setupScrollAnimation(btn, arrow) {
    // let the scaled element spill outside its container
    const prepare = () => {
      const set = (el) => {
        if (el) el.style.overflow = "visible";
      };
      set(selectedElement);
      set(selectedElement.parentElement);
      set(selectedElement.querySelector(".sqs-block-content"));
      if (!btn.style.transformOrigin) btn.style.transformOrigin = "50% 50%";
      btn.style.willChange = "transform";
    };
    prepare();

    const getPct = (v, fb = 0) => {
      const raw = getComputedStyle(btn).getPropertyValue(v).trim();
      const n = parseFloat(raw.replace("%", ""));
      return Number.isFinite(n) ? n : fb;
    };

    const entryPct = () => getPct("--sc-scale-scroll-entry", 0);
    const centerPct = () => getPct("--sc-scale-scroll-center", 0);
    const exitPct = () => getPct("--sc-scale-scroll-exit", 0);
    const start = () => getPct("--sc-scale-scroll-start", 0) / 100;
    const end = () => getPct("--sc-scale-scroll-end", 100) / 100;

    const easeName = () => {
      const el = document.getElementById("scale-effect-animation-value");
      const n =
        el?.getAttribute("data-value") || el?.textContent?.trim() || "none";
      const map = {
        none: "none",
        Linear: "none",
        linear: "none",
        "ease-in": "power1.in",
        "ease-out": "power1.out",
        "ease-in-out": "power1.inOut",
        "power1.out": "power1.out",
        "power2.out": "power2.out",
        "power3.out": "power3.out",
        "power4.out": "power4.out",
        "expo.out": "expo.out",
        "elastic.out": "elastic.out",
        "bounce.out": "bounce.out",
      };
      return (
        map[n] || window.__buttonScrollEase || window.__typoScrollEase || "none"
      );
    };

    const gs = window.gsap;
    const ST = window.ScrollTrigger;
    if (gs && ST) {
      gs.registerPlugin(ST);
      ST.getAll().forEach((t) => {
        if (t.trigger === selectedElement) t.kill();
      });
    }

    let lastScale = null;

    const updateScale = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();
      const en = entryPct();
      const ce = centerPct();
      const ex = exitPct();

      let p; // percentage in [-100..100]
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        p = en + (ce - en) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        p = ce + (ex - ce) * k;
      } else {
        p = ce;
      }

      p = Math.max(-100, Math.min(100, p));
      const sc = Math.max(0, 1 + p / 100); // map to [0..2], neutral at 1

      if (sc !== lastScale) {
        lastScale = sc;
        const ease = easeName();
        if (gs) {
          gs.to(btn, {
            scale: sc,
            duration: ease === "none" ? 0.25 : 0.6,
            ease,
            overwrite: true,
          });
        } else {
          // fallback: minimal smoothing
          btn.style.transform =
            (btn.style.transform || "").replace(/scale\([^)]+\)/, "").trim() +
            ` scale(${sc})`;
        }
      }
    };

    if (gs && ST) {
      ST.create({
        trigger: selectedElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: updateScale,
      });
      ST.refresh(true);
    } else {
      window.addEventListener("scroll", updateScale, { passive: true });
      window.addEventListener("resize", updateScale, { passive: true });
    }

    const observer = new MutationObserver(updateScale);
    observer.observe(btn, { attributes: true, attributeFilter: ["style"] });
    setInterval(updateScale, 150);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";
      const s = start();
      const e = end();
      const buffer = 0.001;
      if (t < s - buffer) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + buffer) arrow.style.backgroundColor = "#F6B67B";
      else arrow.style.backgroundColor = "#FFFFFF";
      requestAnimationFrame(loopArrow);
    }
    loopArrow();
  }

  waitForElements((arrow) => {
    const btn =
      selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      ) || selectedElement;
    if (!btn) return;
    setupScrollAnimation(btn, arrow);
  });
}



export function rotatebuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("rotate-custom-timeline-arrow");
    const startBullet = document.getElementById("rotate-timeline-start-bullet");
    const endBullet = document.getElementById("rotate-timeline-end-bullet");
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
  }

  function setupScrollAnimation(btn, arrow) {
    const readDeg = (v, fb = 0) => {
      const raw = getComputedStyle(btn).getPropertyValue(v).trim();
      const n = parseFloat(raw);
      return Number.isFinite(n) ? n : fb;
    };
    const readPct = (v, fb = 0) => {
      const raw = getComputedStyle(btn).getPropertyValue(v).trim();
      const n = parseFloat(raw.replace("%", ""));
      return Number.isFinite(n) ? n : fb;
    };

    const entryRot = () => readDeg("--sc-rotate-scroll-entry", 0);
    const centerRot = () => readDeg("--sc-rotate-scroll-center", 0);
    const exitRot = () => readDeg("--sc-rotate-scroll-exit", 0);
    const start = () => readPct("--sc-rotate-scroll-start", 0) / 100;
    const end = () => readPct("--sc-rotate-scroll-end", 100) / 100;

    const easeName = () => {
      const el = document.getElementById("rotate-effect-animation-value");
      const n =
        el?.getAttribute("data-value") || el?.textContent?.trim() || "none";
      const map = {
        none: "none",
        Linear: "none",
        linear: "none",
        "ease-in": "power1.in",
        "ease-out": "power1.out",
        "ease-in-out": "power1.inOut",
        "power1.out": "power1.out",
        "power2.out": "power2.out",
        "power3.out": "power3.out",
        "power4.out": "power4.out",
        "expo.out": "expo.out",
        "elastic.out": "elastic.out",
        "bounce.out": "bounce.out",
      };
      return (
        map[n] || window.__buttonScrollEase || window.__typoScrollEase || "none"
      );
    };

    const gs = window.gsap;
    const ST = window.ScrollTrigger;
    if (gs && ST) {
      gs.registerPlugin(ST);
      ST.getAll().forEach((t) => {
        if (t.trigger === selectedElement) t.kill();
      });
    }

    let lastDeg = null;

    const setRotateFallback = (deg) => {
      const cur = btn.style.transform || "";
      const without = cur.replace(/(?:^|\s)rotate\([^)]+\)/, "").trim();
      btn.style.transform = (without + ` rotate(${deg}deg)`).trim();
    };

    const updateRotation = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();
      const en = entryRot();
      const ce = centerRot();
      const ex = exitRot();

      let deg;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        deg = en + (ce - en) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        deg = ce + (ex - ce) * k;
      } else {
        deg = ce;
      }

      if (deg !== lastDeg) {
        lastDeg = deg;
        const ease = easeName();
        if (gs) {
          gs.to(btn, {
            rotation: deg,
            ease,
            duration: ease === "none" ? 0.25 : 0.6,
            overwrite: true,
          });
        } else {
          setRotateFallback(deg);
        }
      }
    };

    if (gs && ST) {
      ST.create({
        trigger: selectedElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: updateRotation,
      });
      ST.refresh(true);
    } else {
      window.addEventListener("scroll", updateRotation, { passive: true });
      window.addEventListener("resize", updateRotation, { passive: true });
    }

    const observer = new MutationObserver(updateRotation);
    observer.observe(btn, { attributes: true, attributeFilter: ["style"] });
    setInterval(updateRotation, 150);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";
      const s = start();
      const e = end();
      const buffer = 0.001;
      if (t < s - buffer) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + buffer) arrow.style.backgroundColor = "#F6B67B";
      else arrow.style.backgroundColor = "#FFFFFF";
      requestAnimationFrame(loopArrow);
    }
    loopArrow();
  }

  waitForElements((arrow) => {
    const btn =
      selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      ) || selectedElement;
    if (!btn) return;
    setupScrollAnimation(btn, arrow);
  });
}


export function blurbuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("blur-custom-timeline-arrow");
    const startBullet = document.getElementById("blur-timeline-start-bullet");
    const endBullet = document.getElementById("blur-timeline-end-bullet");
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
  }

  function setupScrollAnimation(btn, arrow) {
    const content = selectedElement.querySelector(".sqs-block-content");
    const readers = [btn, content, selectedElement].filter(Boolean);

    const getPctVar = (names, fb = 0) => {
      for (const el of readers) {
        const cs = getComputedStyle(el);
        for (const n of names) {
          const raw = cs.getPropertyValue(n);
          if (raw) {
            const v = parseFloat(String(raw).trim().replace("%", ""));
            if (Number.isFinite(v)) return v;
          }
        }
      }
      return fb;
    };

    const entryVal = () =>
      getPctVar(["--sc-blur-scroll-entry", "--sc-Typo-blur-scroll-entry"], 0);
    const centerVal = () =>
      getPctVar(["--sc-blur-scroll-center", "--sc-Typo-blur-scroll-center"], 0);
    const exitVal = () =>
      getPctVar(["--sc-blur-scroll-exit", "--sc-Typo-blur-scroll-exit"], 0);
    const start = () =>
      getPctVar(["--sc-blur-scroll-start", "--sc-Typo-blur-scroll-start"], 0) /
      100;
    const end = () =>
      getPctVar(["--sc-blur-scroll-end", "--sc-Typo-blur-scroll-end"], 100) /
      100;

    const easeName = () => {
      const el = document.getElementById("blur-effect-animation-value");
      const n =
        el?.getAttribute("data-value") || el?.textContent?.trim() || "none";
      const map = {
        none: "none",
        Linear: "none",
        linear: "none",
        "ease-in": "power1.in",
        "ease-out": "power1.out",
        "ease-in-out": "power1.inOut",
        "power1.out": "power1.out",
        "power2.out": "power2.out",
        "power3.out": "power3.out",
        "power4.out": "power4.out",
        "expo.out": "expo.out",
        "elastic.out": "elastic.out",
        "bounce.out": "bounce.out",
      };
      return (
        map[n] || window.__buttonScrollEase || window.__typoScrollEase || "none"
      );
    };

    const gs = window.gsap;
    const ST = window.ScrollTrigger;
    if (gs && ST) {
      gs.registerPlugin(ST);
      ST.getAll().forEach((t) => {
        if (t.trigger === selectedElement) t.kill();
      });
    }

    const computedFilter =
      getComputedStyle(btn).getPropertyValue("filter") || "";
    const baseFilter = computedFilter.replace(/blur\([^)]+\)/, "").trim();
    btn.style.filter =
      (baseFilter ? baseFilter + " " : "") + "blur(var(--sc-blur-amt, 0px))";
    if (!btn.style.getPropertyValue("--sc-blur-amt"))
      btn.style.setProperty("--sc-blur-amt", "0px");

    let lastBlur = null;

    const updateBlur = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();
      const en = entryVal();
      const ce = centerVal();
      const ex = exitVal();

      let b;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        b = en + (ce - en) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        b = ce + (ex - ce) * k;
      } else {
        b = ce;
      }

      b = Math.max(0, Math.min(100, b));

      if (b !== lastBlur) {
        lastBlur = b;
        const ease = easeName();
        if (gs) {
          gs.to(btn, {
            "--sc-blur-amt": `${b}px`,
            duration: ease === "none" ? 0.25 : 0.6,
            ease,
            overwrite: true,
          });
        } else {
          btn.style.setProperty("--sc-blur-amt", `${b}px`);
        }
      }
    };

    if (gs && ST) {
      ST.create({
        trigger: selectedElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: updateBlur,
      });
      ST.refresh(true);
    } else {
      window.addEventListener("scroll", updateBlur, { passive: true });
      window.addEventListener("resize", updateBlur, { passive: true });
    }

    const observer = new MutationObserver(updateBlur);
    observer.observe(btn, { attributes: true, attributeFilter: ["style"] });
    setInterval(updateBlur, 150);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";
      const s = start(),
        e = end(),
        buffer = 0.001;
      if (t < s - buffer) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + buffer) arrow.style.backgroundColor = "#F6B67B";
      else arrow.style.backgroundColor = "#FFFFFF";
      requestAnimationFrame(loopArrow);
    }
    loopArrow();
  }

  waitForElements((arrow) => {
    const btn =
      selectedElement.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      ) || selectedElement;
    if (!btn) return;
    setupScrollAnimation(btn, arrow);
  });
}


export function initButtonAdvanceScrollEffectReset(getSelectedElement) {
  const resetBtn = document.getElementById("button-advance-scroll-reset");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    const block = getSelectedElement();
    if (!block) return;

    const btn = block.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    btn.removeAttribute("style");
    btn.style.transform = "";
    btn.style.opacity = "";
    btn.style.filter = "";
    btn.style.scale = "";
    btn.style.rotate = "";
    btn.style.transformOrigin = "";

    btn.style.removeProperty("transform");
    btn.style.removeProperty("opacity");
    btn.style.removeProperty("filter");
    btn.style.removeProperty("scale");
    btn.style.removeProperty("rotate");
    btn.style.removeProperty("transform-origin");

    btn.style.removeProperty("--sc-vertical-scroll-entry");
    btn.style.removeProperty("--sc-vertical-scroll-center");
    btn.style.removeProperty("--sc-vertical-scroll-exit");

    btn.style.removeProperty("--sc-horizontal-scroll-entry");
    btn.style.removeProperty("--sc-horizontal-scroll-center");
    btn.style.removeProperty("--sc-horizontal-scroll-exit");

    btn.style.removeProperty("--sc-opacity-scroll-entry");
    btn.style.removeProperty("--sc-opacity-scroll-center");
    btn.style.removeProperty("--sc-opacity-scroll-exit");

    btn.style.removeProperty("--sc-scale-scroll-entry");
    btn.style.removeProperty("--sc-scale-scroll-center");
    btn.style.removeProperty("--sc-scale-scroll-exit");

    btn.style.removeProperty("--sc-rotate-scroll-entry");
    btn.style.removeProperty("--sc-rotate-scroll-center");
    btn.style.removeProperty("--sc-rotate-scroll-exit");

    btn.style.removeProperty("--sc-blur-scroll-entry");
    btn.style.removeProperty("--sc-blur-scroll-center");
    btn.style.removeProperty("--sc-blur-scroll-exit");

    console.log("🎯 Scroll Effects Reset for", btn);
  });
}
