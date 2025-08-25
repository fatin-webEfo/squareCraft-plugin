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

  if (
    window.__scBtnLastEl &&
    typeof window.__scBtnLastEl.__scBtnCancel === "function"
  ) {
    window.__scBtnLastEl.__scBtnCancel();
  }
  window.__scBtnLastEl = selectedElement;

  const track =
    document.getElementById("vertical-custom-timeline-border") ||
    selectedElement.querySelector("#vertical-custom-timeline-border") ||
    document.querySelector("#vertical-custom-timeline-border");
  if (!track) return;

  let arrow = document.getElementById("vertical-custom-timeline-arrow");
  if (!arrow) {
    arrow = document.createElement("div");
    arrow.id = "vertical-custom-timeline-arrow";
    track.appendChild(arrow);
  }
  arrow.classList.remove("sc-hidden");
  arrow.style.display = "block";
  arrow.style.background = arrow.style.background || "#FFFFFF";
  arrow.style.pointerEvents = "none";
  arrow.style.zIndex = "3";

  const btn = selectedElement.querySelector(
    "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
  );
  if (!btn) return;

  const gsapOK = !!window.gsap;
  if (gsapOK) gsap.set(btn, { willChange: "transform" });
  const qArrowLeft = gsapOK
    ? gsap.quickSetter(arrow, "left", "%")
    : (v) => {
        arrow.style.left = v + "%";
      };
  const qBtnY = gsapOK
    ? gsap.quickSetter(btn, "y", "vh")
    : (v) => {
        btn.style.transform = `translate3d(0, ${v}vh, 0)`;
      };

  const mapEase = (n) =>
    ({
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
    }[n] || "none");
  const currentEase = () => {
    const d = document.getElementById("vertical-effect-animation-value");
    return mapEase(
      d?.getAttribute("data-value") || d?.textContent?.trim() || "none"
    );
  };
  const ease01 = (t) => {
    const e = currentEase();
    if (!gsapOK || e === "none") return t;
    try {
      return gsap.parseEase(e)(t);
    } catch {
      return t;
    }
  };

  const readPct = (name, fb = 0) => {
    const v = getComputedStyle(btn).getPropertyValue(name).trim();
    const n = parseFloat(v.replace("%", ""));
    return Number.isFinite(n) ? n : fb;
  };

  let running = true;
  selectedElement.__scBtnCancel = () => {
    running = false;
  };

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

  let smLeft = null,
    smY = null;

  function frame() {
    if (!running || !document.body.contains(selectedElement)) return;

    let s = readPct("--sc-vertical-scroll-start", 0);
    let e = readPct("--sc-vertical-scroll-end", 100);
    if (e < s + 4) e = s + 4;

    const entry = readPct("--sc-vertical-scroll-entry", 0);
    const center = readPct("--sc-vertical-scroll-center", 0);
    const exit = readPct("--sc-vertical-scroll-exit", 0);

    const t01 = getViewportProgress(selectedElement);
    const span = Math.max(1, e - s);
    const p01 = clamp01((t01 * 100 - s) / span);

    const targetLeft = s + p01 * span;

    const EDGE = 0.015;
    arrow.style.backgroundColor =
      p01 <= EDGE ? "#EF7C2F" : p01 >= 1 - EDGE ? "#F6B67B" : "#FFFFFF";

    const ez = ease01(p01);
    let yPct;
    if (p01 <= 0) yPct = entry;
    else if (p01 >= 1) yPct = exit;
    else if (ez <= 0.5) yPct = lerp(entry, center, ez / 0.5);
    else yPct = lerp(center, exit, (ez - 0.5) / 0.5);

    const targetYvh = Math.max(-50, Math.min(50, yPct)) / 2;

    if (smLeft == null) smLeft = targetLeft;
    if (smY == null) smY = targetYvh;

    smLeft = smLeft + (targetLeft - smLeft) * 0.25;
    smY = smY + (targetYvh - smY) * 0.2;

    qArrowLeft(smLeft);
    qBtnY(smY);

    requestAnimationFrame(frame);
  }

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
