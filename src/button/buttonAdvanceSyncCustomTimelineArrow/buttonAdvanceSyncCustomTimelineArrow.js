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

  // --------------------------
  // helpers (scoped to function)
  // --------------------------
  const gsapOK = !!window.gsap && !!window.ScrollTrigger;

  function ensureArrowBaseCSS() {
    if (document.getElementById("sc-btn-arrow-css")) return;
    const style = document.createElement("style");
    style.id = "sc-btn-arrow-css";
    style.textContent = `
      #vertical-custom-timeline-border,
      #Typo-vertical-custom-timeline-border {
        position: relative;
      }
      #vertical-custom-timeline-arrow,
      #Typo-vertical-custom-timeline-arrow {
        position: absolute;
        width: 2px;
        height: 12px;
        top: 6px;
        left: 0%;
        transform: translateX(-50%);
        background: #fff;
        z-index: 3;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureArrowEl() {
    ensureArrowBaseCSS();
    const container =
      document.getElementById("vertical-custom-timeline-border") ||
      document.getElementById("Typo-vertical-custom-timeline-border") ||
      selectedElement; // last resort
    if (!container) return null;

    let arrow =
      document.getElementById("vertical-custom-timeline-arrow") ||
      document.getElementById("Typo-vertical-custom-timeline-arrow");

    if (!arrow) {
      arrow = document.createElement("div");
      arrow.id = "vertical-custom-timeline-arrow"; // normalize to "vertical-*"
      container.appendChild(arrow);
    }
    arrow.classList.remove("sc-hidden");
    arrow.style.display = "block";
    return arrow;
  }

  const getButton = () =>
    selectedElement.querySelector(
      [
        "a.sqs-button-element--primary",
        "a.sqs-button-element--secondary",
        "a.sqs-button-element--tertiary",
        "a.sqs-block-button-element",
        "button.sqs-button-element--primary",
        "button.sqs-button-element--secondary",
        "button.sqs-button-element--tertiary",
      ].join(", ")
    );

  const readPct = (btn, cssVar, fallback = 0) => {
    if (!btn) return fallback;
    const v = getComputedStyle(btn).getPropertyValue(cssVar).trim();
    const n = parseFloat(v.replace("%", ""));
    return Number.isFinite(n) ? n : fallback;
  };

  const currentEase = () => {
    const disp = document.getElementById("vertical-effect-animation-value");
    const name =
      disp?.getAttribute("data-value") || disp?.textContent?.trim() || "none";
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
    return map[name] || "none";
  };

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // --------------------------------
  // cancel any previous running loop
  // --------------------------------
  if (
    window.__scBtnLastEl &&
    typeof window.__scBtnLastEl.__scBtnCancel === "function"
  ) {
    window.__scBtnLastEl.__scBtnCancel();
  }
  window.__scBtnLastEl = selectedElement;

  // make sure required DOM exists
  const arrow = ensureArrowEl();
  const startBul = document.getElementById("vertical-timeline-start-bullet");
  const endBul = document.getElementById("vertical-timeline-end-bullet");
  const startFill = document.getElementById("vertical-timeline-start-fill");
  const endFill = document.getElementById("vertical-timeline-end-fill");
  if (!arrow || !startBul || !endBul || !startFill || !endFill) return;

  // light transitions when GSAP not available
  if (!gsapOK) {
    arrow.style.transition ||=
      "left 140ms ease-out, background-color 140ms ease-out";
    startBul.style.transition ||= "left 140ms ease-out";
    endBul.style.transition ||= "left 140ms ease-out";
    startFill.style.transition ||=
      "width 140ms ease-out, left 140ms ease-out, background-color 140ms ease-out";
    endFill.style.transition ||=
      "width 140ms ease-out, left 140ms ease-out, background-color 140ms ease-out";
  } else {
    gsap.registerPlugin(ScrollTrigger);
    gsap.killTweensOf(arrow, "backgroundColor");
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === selectedElement) t.kill();
    });
  }

  // quick setters for perf
  const qArrowLeft =
    (gsapOK && gsap.quickSetter(arrow, "left", "%")) ||
    ((v) => (arrow.style.left = v + "%"));

  const qBtnTransform = (v) => {
    const b = getButton();
    if (!b) return;
    if (gsapOK) gsap.set(b, { transform: v, overwrite: true });
    else {
      b.style.transition ||= "transform 180ms ease-out";
      b.style.transform = v;
    }
  };

  // ----------------------
  // main animation routine
  // ----------------------
  let running = true;
  let smoothedLeft = null; // arrow %
  let smoothedYvh = null; // translateY in vh
  const SMOOTH_ARROW = 0.18;
  const SMOOTH_Y = 0.15;
  const EDGE_EPS = 0.015; // 1.5% for color edge

  function applyBtnTransform() {
    const btn = getButton();
    if (!btn) return;

    let s = readPct(btn, "--sc-vertical-scroll-start", 0);
    let e = readPct(btn, "--sc-vertical-scroll-end", 100);
    if (!(e > s)) e = s + 4;

    const t01 = getViewportProgress(selectedElement); // 0..1
    // compute y% from entry/center/exit
    const entry = readPct(btn, "--sc-vertical-scroll-entry", 0);
    const center = readPct(btn, "--sc-vertical-scroll-center", 0);
    const exit = readPct(btn, "--sc-vertical-scroll-exit", 0);

    let yPct;
    if (t01 < s / 100) {
      const k = s <= 0 ? 1 : Math.min(t01 / (s / 100), 1);
      yPct = entry + (center - entry) * k;
    } else if (t01 > e / 100) {
      const k =
        1 - e / 100 <= 0 ? 1 : Math.min((t01 - e / 100) / (1 - e / 100), 1);
      yPct = center + (exit - center) * k;
    } else {
      yPct = center;
    }

    yPct = clamp(yPct, -50, 50);
    const targetYvh = yPct / 2; // keep parity with Typo (value/2 → vh)

    // smooth + apply
    if (smoothedYvh == null) smoothedYvh = targetYvh;
    smoothedYvh = lerp(smoothedYvh, targetYvh, SMOOTH_Y);

    const easeName = currentEase();
    if (gsapOK && easeName !== "none") {
      const proxy = { y: smoothedYvh };
      gsap.killTweensOf(proxy);
      gsap.to(proxy, {
        y: targetYvh,
        ease: easeName,
        duration: 0.6,
        overwrite: true,
        onUpdate: () => qBtnTransform(`translateY(${proxy.y.toFixed(2)}vh)`),
      });
    } else {
      qBtnTransform(`translateY(${smoothedYvh.toFixed(2)}vh)`);
    }
  }

  function frame() {
    if (!running || !document.body.contains(selectedElement)) return;

    const btn = getButton();
    if (!btn) return;

    let s = readPct(btn, "--sc-vertical-scroll-start", 0);
    let e = readPct(btn, "--sc-vertical-scroll-end", 100);
    if (e < s + 4) e = s + 4;

    const t01 = getViewportProgress(selectedElement);
    const span = Math.max(1, e - s);
    let p01 = (t01 * 100 - s) / span;
    p01 = clamp(p01, 0, 1);

    const targetLeft = s + p01 * span;

    if (smoothedLeft == null) smoothedLeft = targetLeft;
    smoothedLeft = lerp(smoothedLeft, targetLeft, SMOOTH_ARROW);
    qArrowLeft(smoothedLeft);

    // color by region (before/inside/after)
    const c =
      p01 <= EDGE_EPS ? "#EF7C2F" : p01 >= 1 - EDGE_EPS ? "#F6B67B" : "#FFFFFF";
    if (gsapOK) gsap.set(arrow, { backgroundColor: c, overwrite: true });
    else arrow.style.backgroundColor = c;

    applyBtnTransform();
    requestAnimationFrame(frame);
  }

  // -------------
  // ScrollTrigger
  // -------------
  if (gsapOK) {
    ScrollTrigger.create({
      trigger: selectedElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: applyBtnTransform,
      onRefresh: applyBtnTransform,
    });
    ScrollTrigger.refresh(true);
  } else {
    // fallback listeners if GSAP not present
    const onScrollResize = () => applyBtnTransform();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize, { passive: true });
  }

  // -------------------
  // cancel/cleanup hook
  // -------------------
  selectedElement.__scBtnCancel = () => {
    running = false;
    if (gsapOK) {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === selectedElement) t.kill();
      });
      const b = getButton();
      if (b) gsap.killTweensOf(b);
      gsap.killTweensOf(arrow);
    } else {
      window.removeEventListener("scroll", applyBtnTransform);
      window.removeEventListener("resize", applyBtnTransform);
    }
  };

  // kick off RAF loop (arrow & transform smoothing)
  requestAnimationFrame(frame);
}

export function horizontalbuttonAdvanceSyncCustomTimelineArrow(
  selectedElement
) {
  if (!selectedElement) return;
  if (
    window.__scHorBtnLastEl &&
    typeof window.__scHorBtnLastEl.__scBtnCancel === "function"
  ) {
    window.__scHorBtnLastEl.__scBtnCancel();
  }
  window.__scHorBtnLastEl = selectedElement;

  const SMOOTH_ARROW = 0.18;
  const SMOOTH_X = 0.15;
  const EDGE_EPS = 0.015;

  const arrow = document.getElementById("horizontal-custom-timeline-arrow");
  const startBul = document.getElementById("horizontal-timeline-start-bullet");
  const endBul = document.getElementById("horizontal-timeline-end-bullet");
  const startFill = document.getElementById("horizontal-timeline-start-fill");
  const endFill = document.getElementById("horizontal-timeline-end-fill");
  if (!arrow || !startBul || !endBul || !startFill || !endFill) return;

  const lerp = (a, b, t) => a + (b - a) * t;

  if (!window.gsap) {
    arrow.style.transition ||=
      "left 140ms ease-out, background-color 140ms ease-out";
    startBul.style.transition ||= "left 140ms ease-out";
    endBul.style.transition ||= "left 140ms ease-out";
    startFill.style.transition ||=
      "width 140ms ease-out, left 140ms ease-out, background-color 140ms ease-out";
    endFill.style.transition ||=
      "width 140ms ease-out, left 140ms ease-out, background-color 140ms ease-out";
  } else {
    gsap.killTweensOf(arrow, "backgroundColor");
  }

  const qArrowLeft =
    (window.gsap && gsap.quickSetter(arrow, "left", "%")) ||
    ((v) => (arrow.style.left = v + "%"));

  const getTarget = () =>
    selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    ) || selectedElement;

  let qBtnXvw = null;
  const setBtnXvw = (btn, xvw) => {
    if (!btn) return;
    if (window.gsap) {
      qBtnXvw ||= gsap.quickSetter(btn, "x", "vw");
      qBtnXvw(xvw);
    } else {
      const t = btn.style.transform || "";
      const clean = t.replace(/translateX\([^)]+\)/, "").trim();
      btn.style.transform = (clean + ` translateX(${xvw}vw)`).trim();
      btn.style.transition ||= "transform 180ms ease-out";
    }
  };

  const getPctVar = (el, cssVar, fallback = 0) => {
    let v = getComputedStyle(el).getPropertyValue(cssVar).trim();
    let n = parseFloat(v.replace("%", ""));
    if (!Number.isFinite(n)) {
      v = getComputedStyle(selectedElement).getPropertyValue(cssVar).trim();
      n = parseFloat(v.replace("%", ""));
    }
    return Number.isFinite(n) ? n : fallback;
  };

  const t0 = getTarget();
  if (!t0) return;

  let startPct = getPctVar(t0, "--sc-horizontal-scroll-start", 0);
  let endPct = getPctVar(t0, "--sc-horizontal-scroll-end", 100);
  if (endPct < startPct + 4) endPct = startPct + 4;

  const readTriplet = (el) => ({
    entry: getPctVar(el, "--sc-horizontal-scroll-entry", 0),
    center: getPctVar(el, "--sc-horizontal-scroll-center", 0),
    exit: getPctVar(el, "--sc-horizontal-scroll-exit", 0),
  });

  const dropdown = document.getElementById(
    "horizontal-effect-animation-type-list"
  );
  const currentEase = () => {
    const display = dropdown?.previousElementSibling?.querySelector(
      "#horizontal-effect-animation-value"
    );
    const name = display?.textContent?.trim() || "none";
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
    return map[name] || "none";
  };

  const ease01 = (t, easeName) => {
    if (!window.gsap || easeName === "none") return t;
    try {
      return gsap.parseEase(easeName)(t);
    } catch {
      return t;
    }
  };

  let running = true;
  selectedElement.__scBtnRafActive = true;
  selectedElement.__scBtnCancel = () => {
    running = false;
    selectedElement.__scBtnRafActive = false;
    if (window.gsap) gsap.killTweensOf(arrow, "backgroundColor");
  };

  let smoothedLeft = null;
  let smoothedXvw = null;

  const applyArrowColor = (p01) => {
    const c =
      p01 <= EDGE_EPS ? "#EF7C2F" : p01 >= 1 - EDGE_EPS ? "#F6B67B" : "#FFFFFF";
    if (window.gsap) gsap.set(arrow, { backgroundColor: c, overwrite: true });
    else arrow.style.backgroundColor = c;
  };

  function frame() {
    if (!running || !document.body.contains(selectedElement)) {
      selectedElement.__scBtnRafActive = false;
      return;
    }
    const elNow = getTarget();
    if (!elNow) {
      selectedElement.__scBtnRafActive = false;
      return;
    }

    startPct = getPctVar(elNow, "--sc-horizontal-scroll-start", startPct);
    endPct = getPctVar(elNow, "--sc-horizontal-scroll-end", endPct);
    if (endPct < startPct + 4) endPct = startPct + 4;

    const t = getViewportProgress(selectedElement) * 100;
    const span = Math.max(1, endPct - startPct);
    let p01 = (t - startPct) / span;
    if (p01 < 0) p01 = 0;
    else if (p01 > 1) p01 = 1;

    const targetLeft = startPct + p01 * span;

    const trip = readTriplet(elNow);
    const eased = ease01(p01, currentEase());
    const xPct =
      eased <= 0
        ? trip.entry
        : eased >= 1
        ? trip.exit
        : eased <= 0.5
        ? lerp(trip.entry, trip.center, eased / 0.5)
        : lerp(trip.center, trip.exit, (eased - 0.5) / 0.5);
    const targetXvw = xPct / 2;

    if (smoothedLeft == null) smoothedLeft = targetLeft;
    if (smoothedXvw == null) smoothedXvw = targetXvw;

    smoothedLeft = lerp(smoothedLeft, targetLeft, SMOOTH_ARROW);
    smoothedXvw = lerp(smoothedXvw, targetXvw, SMOOTH_X);

    qArrowLeft(smoothedLeft);
    applyArrowColor(p01);
    setBtnXvw(elNow, +smoothedXvw.toFixed(2));

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export function opacitybuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("opacity-custom-timeline-arrow");
    const border = document.getElementById("opacity-custom-timeline-border");
    const startBullet = document.getElementById(
      "opacity-timeline-start-bullet"
    );
    const endBullet = document.getElementById("opacity-timeline-end-bullet");
    const dropdown = document.getElementById(
      "opacity-effect-animation-type-list"
    );

    if (arrow && border && startBullet && endBullet && dropdown) {
      callback(arrow, border, startBullet, endBullet, dropdown);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(
    arrow,
    border,
    startBullet,
    endBullet,
    dropdown
  ) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;
    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );
    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    const startLeft = parseFloat(startBullet.style.left || "0");
    const endLeft = parseFloat(endBullet.style.left || "100");
    const centerLeft = (startLeft + endLeft) / 2;

    const btn = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%")
        ? (parseFloat(value) / 100) * 100
        : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-opacity-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-opacity-scroll-center");
    const exitY = getVHFromCSSVar("--sc-opacity-scroll-exit");

    let y = 0;
    let apply = false;

    if (scrollBasedLeft <= startLeft + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = scrollBasedLeft / (startLeft + 1);
        y = entryY * progress;
        apply = true;
      }
    } else if (scrollBasedLeft >= endLeft - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = 1 - (100 - scrollBasedLeft) / (100 - endLeft + 1);
        y = exitY * progress;
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (scrollBasedLeft > startLeft + 1 && scrollBasedLeft < centerLeft - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (scrollBasedLeft - startLeft) / (centerLeft - startLeft);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        scrollBasedLeft > centerLeft + 1 &&
        scrollBasedLeft < endLeft - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (scrollBasedLeft - centerLeft) / (endLeft - centerLeft);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      btn.removeAttribute("style");
      gsap.to(btn, {
        duration: 0.3,
        ease: transition.ease,
        opacity: Math.max(0, Math.min(1, finalY)),
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, border, startBullet, endBullet, dropdown) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, border, startBullet, endBullet, dropdown);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, border, startBullet, endBullet, dropdown) => {
    const arrowTrigger = document.getElementById(
      "opacity-effect-animation-type-arrow"
    );

    if (arrowTrigger && dropdown) {
      arrowTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("sc-hidden");
      });

      document.addEventListener("click", (e) => {
        if (
          !arrowTrigger.contains(e.target) &&
          !dropdown.contains(e.target) &&
          !dropdown.classList.contains("sc-hidden")
        ) {
          dropdown.classList.add("sc-hidden");
        }
      });

      dropdown.querySelectorAll("[data-value]").forEach((item) => {
        item.addEventListener("click", () => {
          const selectedEffect = item.getAttribute("data-value");
          const display = dropdown.previousElementSibling;
          if (display?.querySelector("p")) {
            display.querySelector("p").textContent = selectedEffect;
          }
          transition.ease = selectedEffect || "power2.out";
          dropdown.classList.add("sc-hidden");
        });
      });
    }

    trackLoop(arrow, border, startBullet, endBullet, dropdown);
  });
}

export function scalebuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("scale-custom-timeline-arrow");
    const border = document.getElementById("scale-custom-timeline-border");
    const startBullet = document.getElementById("scale-timeline-start-bullet");
    const endBullet = document.getElementById("scale-timeline-end-bullet");
    const dropdown = document.getElementById(
      "scale-effect-animation-type-list"
    );

    if (arrow && border && startBullet && endBullet && dropdown) {
      callback(arrow, border, startBullet, endBullet, dropdown);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(
    arrow,
    border,
    startBullet,
    endBullet,
    dropdown
  ) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;
    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );
    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    const startLeft = parseFloat(startBullet.style.left || "0");
    const endLeft = parseFloat(endBullet.style.left || "100");
    const centerLeft = (startLeft + endLeft) / 2;

    const btn = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%")
        ? (parseFloat(value) / 100) * 100
        : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-scale-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-scale-scroll-center");
    const exitY = getVHFromCSSVar("--sc-scale-scroll-exit");

    let y = 0;
    let apply = false;

    if (scrollBasedLeft <= startLeft + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = scrollBasedLeft / (startLeft + 1);
        y = entryY * progress;
        apply = true;
      }
    } else if (scrollBasedLeft >= endLeft - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = 1 - (100 - scrollBasedLeft) / (100 - endLeft + 1);
        y = exitY * progress;
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (scrollBasedLeft > startLeft + 1 && scrollBasedLeft < centerLeft - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (scrollBasedLeft - startLeft) / (centerLeft - startLeft);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        scrollBasedLeft > centerLeft + 1 &&
        scrollBasedLeft < endLeft - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (scrollBasedLeft - centerLeft) / (endLeft - centerLeft);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      btn.removeAttribute("style");
      gsap.to(btn, {
        duration: 0.3,
        ease: transition.ease,
        scale: Math.max(0.01, 1 + finalY / 100),
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, border, startBullet, endBullet, dropdown) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, border, startBullet, endBullet, dropdown);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, border, startBullet, endBullet, dropdown) => {
    const arrowTrigger = document.getElementById(
      "scale-effect-animation-type-arrow"
    );

    if (arrowTrigger && dropdown) {
      arrowTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("sc-hidden");
      });

      document.addEventListener("click", (e) => {
        if (
          !arrowTrigger.contains(e.target) &&
          !dropdown.contains(e.target) &&
          !dropdown.classList.contains("sc-hidden")
        ) {
          dropdown.classList.add("sc-hidden");
        }
      });

      dropdown.querySelectorAll("[data-value]").forEach((item) => {
        item.addEventListener("click", () => {
          const selectedEffect = item.getAttribute("data-value");
          const display = dropdown.previousElementSibling;
          if (display?.querySelector("p")) {
            display.querySelector("p").textContent = selectedEffect;
          }
          transition.ease = selectedEffect || "power2.out";
          dropdown.classList.add("sc-hidden");
        });
      });
    }

    trackLoop(arrow, border, startBullet, endBullet, dropdown);
  });
}

export function rotatebuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("rotate-custom-timeline-arrow");
    const border = document.getElementById("rotate-custom-timeline-border");
    const startBullet = document.getElementById("rotate-timeline-start-bullet");
    const endBullet = document.getElementById("rotate-timeline-end-bullet");
    const dropdown = document.getElementById(
      "rotate-effect-animation-type-list"
    );

    if (arrow && border && startBullet && endBullet && dropdown) {
      callback(arrow, border, startBullet, endBullet, dropdown);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(
    arrow,
    border,
    startBullet,
    endBullet,
    dropdown
  ) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;
    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );
    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    const startLeft = parseFloat(startBullet.style.left || "0");
    const endLeft = parseFloat(endBullet.style.left || "100");
    const centerLeft = (startLeft + endLeft) / 2;

    const btn = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%")
        ? (parseFloat(value) / 100) * 100
        : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-rotate-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-rotate-scroll-center");
    const exitY = getVHFromCSSVar("--sc-rotate-scroll-exit");

    let y = 0;
    let apply = false;

    if (scrollBasedLeft <= startLeft + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = scrollBasedLeft / (startLeft + 1);
        y = entryY * progress;
        apply = true;
      }
    } else if (scrollBasedLeft >= endLeft - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = 1 - (100 - scrollBasedLeft) / (100 - endLeft + 1);
        y = exitY * progress;
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (scrollBasedLeft > startLeft + 1 && scrollBasedLeft < centerLeft - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (scrollBasedLeft - startLeft) / (centerLeft - startLeft);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        scrollBasedLeft > centerLeft + 1 &&
        scrollBasedLeft < endLeft - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (scrollBasedLeft - centerLeft) / (endLeft - centerLeft);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      gsap.to(btn, {
        duration: 0.3,
        ease: transition.ease,
        transform: `translateY(${finalY.toFixed(2)}vh)`,
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, border, startBullet, endBullet, dropdown) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, border, startBullet, endBullet, dropdown);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, border, startBullet, endBullet, dropdown) => {
    const arrowTrigger = document.getElementById(
      "rotate-effect-animation-type-arrow"
    );

    if (arrowTrigger && dropdown) {
      arrowTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("sc-hidden");
      });

      document.addEventListener("click", (e) => {
        if (
          !arrowTrigger.contains(e.target) &&
          !dropdown.contains(e.target) &&
          !dropdown.classList.contains("sc-hidden")
        ) {
          dropdown.classList.add("sc-hidden");
        }
      });

      dropdown.querySelectorAll("[data-value]").forEach((item) => {
        item.addEventListener("click", () => {
          const selectedEffect = item.getAttribute("data-value");
          const display = dropdown.previousElementSibling;
          if (display?.querySelector("p")) {
            display.querySelector("p").textContent = selectedEffect;
          }
          transition.ease = selectedEffect || "power2.out";
          dropdown.classList.add("sc-hidden");
        });
      });
    }

    trackLoop(arrow, border, startBullet, endBullet, dropdown);
  });
}

export function blurbuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("blur-custom-timeline-arrow");
    const border = document.getElementById("blur-custom-timeline-border");
    const startBullet = document.getElementById("blur-timeline-start-bullet");
    const endBullet = document.getElementById("blur-timeline-end-bullet");
    const dropdown = document.getElementById("blur-effect-animation-type-list");

    if (arrow && border && startBullet && endBullet && dropdown) {
      callback(arrow, border, startBullet, endBullet, dropdown);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(
    arrow,
    border,
    startBullet,
    endBullet,
    dropdown
  ) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;
    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );
    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    const startLeft = parseFloat(startBullet.style.left || "0");
    const endLeft = parseFloat(endBullet.style.left || "100");
    const centerLeft = (startLeft + endLeft) / 2;

    const btn = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%")
        ? (parseFloat(value) / 100) * 100
        : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-blur-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-blur-scroll-center");
    const exitY = getVHFromCSSVar("--sc-blur-scroll-exit");

    let y = 0;
    let apply = false;

    if (scrollBasedLeft <= startLeft + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = scrollBasedLeft / (startLeft + 1);
        y = entryY * progress;
        apply = true;
      }
    } else if (scrollBasedLeft >= endLeft - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = 1 - (100 - scrollBasedLeft) / (100 - endLeft + 1);
        y = exitY * progress;
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (scrollBasedLeft > startLeft + 1 && scrollBasedLeft < centerLeft - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (scrollBasedLeft - startLeft) / (centerLeft - startLeft);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        scrollBasedLeft > centerLeft + 1 &&
        scrollBasedLeft < endLeft - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (scrollBasedLeft - centerLeft) / (endLeft - centerLeft);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      btn.removeAttribute("style");
      gsap.to(btn, {
        duration: 0.3,
        ease: transition.ease,
        filter: `blur(${Math.abs(finalY / 10)}px)`,
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, border, startBullet, endBullet, dropdown) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, border, startBullet, endBullet, dropdown);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, border, startBullet, endBullet, dropdown) => {
    const arrowTrigger = document.getElementById(
      "blur-effect-animation-type-arrow"
    );

    if (arrowTrigger && dropdown) {
      arrowTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("sc-hidden");
      });

      document.addEventListener("click", (e) => {
        if (
          !arrowTrigger.contains(e.target) &&
          !dropdown.contains(e.target) &&
          !dropdown.classList.contains("sc-hidden")
        ) {
          dropdown.classList.add("sc-hidden");
        }
      });

      dropdown.querySelectorAll("[data-value]").forEach((item) => {
        item.addEventListener("click", () => {
          const selectedEffect = item.getAttribute("data-value");
          const display = dropdown.previousElementSibling;
          if (display?.querySelector("p")) {
            display.querySelector("p").textContent = selectedEffect;
          }
          transition.ease = selectedEffect || "power2.out";
          dropdown.classList.add("sc-hidden");
        });
      });
    }

    trackLoop(arrow, border, startBullet, endBullet, dropdown);
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
