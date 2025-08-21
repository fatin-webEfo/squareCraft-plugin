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

  const SMOOTH_ARROW = 0.18;
  const SMOOTH_Y = 0.15;
  const EDGE_EPS = 0.015;

  const arrow = document.getElementById("vertical-custom-timeline-arrow");
  const startBul = document.getElementById("vertical-timeline-start-bullet");
  const endBul = document.getElementById("vertical-timeline-end-bullet");
  const startFill = document.getElementById("vertical-timeline-start-fill");
  const endFill = document.getElementById("vertical-timeline-end-fill");
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

  const getButton = () =>
    selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    );

  const qBtnTrans = (v) => {
    const b = getButton() || selectedElement;
    if (!b) return;
    if (window.gsap) gsap.set(b, { transform: v, overwrite: true });
    else {
      b.style.transition ||= "transform 180ms ease-out";
      b.style.transform = v;
    }
  };

  const getPctVar = (el, cssVar, fallback = 0) => {
    const v = getComputedStyle(el).getPropertyValue(cssVar).trim();
    const n = parseFloat(v.replace("%", ""));
    return Number.isFinite(n) ? n : fallback;
  };

  const btn0 = getButton() || selectedElement;
  if (!btn0) return;

  let startPct = getPctVar(btn0, "--sc-vertical-scroll-start", 0);
  let endPct = getPctVar(btn0, "--sc-vertical-scroll-end", 100);
  if (endPct < startPct + 4) endPct = startPct + 4;

  const readTriplet = (btn) => ({
    entry: getPctVar(btn, "--sc-vertical-scroll-entry", 0),
    center: getPctVar(btn, "--sc-vertical-scroll-center", 0),
    exit: getPctVar(btn, "--sc-vertical-scroll-exit", 0),
  });

  const dropdown = document.getElementById(
    "vertical-effect-animation-type-list"
  );
  const currentEase = () => {
    const display = dropdown?.previousElementSibling?.querySelector(
      "#vertical-effect-animation-value"
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
  let smoothedYvh = null;

  function applyArrowColor(p01) {
    const c =
      p01 <= EDGE_EPS ? "#EF7C2F" : p01 >= 1 - EDGE_EPS ? "#F6B67B" : "#FFFFFF";
    if (window.gsap) gsap.set(arrow, { backgroundColor: c, overwrite: true });
    else arrow.style.backgroundColor = c;
  }

  function frame() {
    if (!running || !document.body.contains(selectedElement)) {
      selectedElement.__scBtnRafActive = false;
      return;
    }
    const btnNow = getButton() || selectedElement;
    if (!btnNow) {
      selectedElement.__scBtnRafActive = false;
      return;
    }

    startPct = getPctVar(btnNow, "--sc-vertical-scroll-start", startPct);
    endPct = getPctVar(btnNow, "--sc-vertical-scroll-end", endPct);
    if (endPct < startPct + 4) endPct = startPct + 4;

    const t = getViewportProgress(selectedElement) * 100;
    const span = Math.max(1, endPct - startPct);
    let p01 = (t - startPct) / span;
    if (p01 < 0) p01 = 0;
    else if (p01 > 1) p01 = 1;

    const targetLeft = startPct + p01 * span;

    const trip = readTriplet(btnNow);
    const eased = ease01(p01, currentEase());
    const yPct =
      eased <= 0
        ? trip.entry
        : eased >= 1
        ? trip.exit
        : eased <= 0.5
        ? lerp(trip.entry, trip.center, eased / 0.5)
        : lerp(trip.center, trip.exit, (eased - 0.5) / 0.5);
    const targetYvh = yPct / 2;

    if (smoothedLeft == null) smoothedLeft = targetLeft;
    if (smoothedYvh == null) smoothedYvh = targetYvh;

    smoothedLeft = lerp(smoothedLeft, targetLeft, SMOOTH_ARROW);
    smoothedYvh = lerp(smoothedYvh, targetYvh, SMOOTH_Y);

    qArrowLeft(smoothedLeft);
    applyArrowColor(p01);
    qBtnTrans(`translateY(${smoothedYvh.toFixed(2)}vh)`);

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
      "top 140ms ease-out, background-color 140ms ease-out";
    startBul.style.transition ||= "top 140ms ease-out";
    endBul.style.transition ||= "top 140ms ease-out";
    startFill.style.transition ||=
      "height 140ms ease-out, top 140ms ease-out, background-color 140ms ease-out";
    endFill.style.transition ||=
      "height 140ms ease-out, top 140ms ease-out, background-color 140ms ease-out";
  } else {
    gsap.killTweensOf(arrow, "backgroundColor");
  }

  const qArrowTop =
    (window.gsap && gsap.quickSetter(arrow, "top", "%")) ||
    ((v) => (arrow.style.top = v + "%"));

  const getButtonOrSelf = () =>
    selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
        "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
    ) || selectedElement;

  const setBtnXvw = (el, xvw) => {
    const t = el.style.transform || "";
    const clean = t.replace(/translateX\([^)]+\)/, "").trim();
    el.style.transition ||= "transform 180ms ease-out";
    el.style.transform = (clean + ` translateX(${xvw}vw)`).trim();
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

  const targetEl0 = getButtonOrSelf();
  if (!targetEl0) return;

  let startPct = getPctVar(targetEl0, "--sc-horizontal-scroll-start", 0);
  let endPct = getPctVar(targetEl0, "--sc-horizontal-scroll-end", 100);
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

  let smoothedTop = null;
  let smoothedXvw = null;

  function applyArrowColor(p01) {
    const c =
      p01 <= EDGE_EPS ? "#EF7C2F" : p01 >= 1 - EDGE_EPS ? "#F6B67B" : "#FFFFFF";
    if (window.gsap) gsap.set(arrow, { backgroundColor: c, overwrite: true });
    else arrow.style.backgroundColor = c;
  }

  function frame() {
    if (!running || !document.body.contains(selectedElement)) {
      selectedElement.__scBtnRafActive = false;
      return;
    }
    const elNow = getButtonOrSelf();
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

    const targetTop = startPct + p01 * span;

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

    if (smoothedTop == null) smoothedTop = targetTop;
    if (smoothedXvw == null) smoothedXvw = targetXvw;

    smoothedTop = lerp(smoothedTop, targetTop, SMOOTH_ARROW);
    smoothedXvw = lerp(smoothedXvw, targetXvw, SMOOTH_X);

    qArrowTop(smoothedTop);
    applyArrowColor(p01);
    setBtnXvw(elNow, +smoothedXvw.toFixed(2));

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export function TypoOpacityAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;
  const content = selectedElement.querySelector(".sqs-block-content");
  if (!content) return;

  const REG = (window.__scOpacityReg ||= new WeakMap());
  REG.get(selectedElement)?.kill?.();

  const hasGsap = !!window.gsap && !!window.ScrollTrigger;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  const readPct = (v, d) => {
    const raw = getComputedStyle(content).getPropertyValue(v);
    const n = parseFloat(String(raw).replace("%", "").trim());
    return Number.isFinite(n) ? n : d;
  };

  const start = () => readPct("--sc-Typo-opacity-scroll-start", 0) / 100;
  const end = () => readPct("--sc-Typo-opacity-scroll-end", 100) / 100;
  const entry = () => readPct("--sc-Typo-opacity-scroll-entry", 100) / 100;
  const center = () => readPct("--sc-Typo-opacity-scroll-center", 100) / 100;
  const exit = () => readPct("--sc-Typo-opacity-scroll-exit", 100) / 100;

  const state = {
    st: null,
    raf: 0,
    tick: 0,
    killed: false,
    lastTarget: NaN,
    lastVars: "",
    proxy: { o: +getComputedStyle(content).opacity || 1 },
    kill() {
      this.killed = true;
      if (this.st) this.st.kill();
      cancelAnimationFrame(this.raf);
      clearTimeout(this.tick);
      REG.delete(selectedElement);
    },
  };

  const drive = (val) => {
    const ease = window.__typoScrollEase || "none";
    if (!hasGsap) {
      content.style.setProperty("opacity", String(val), "important");
      state.lastTarget = val;
      return;
    }
    if (val !== state.lastTarget) {
      state.lastTarget = val;
      gsap.killTweensOf(state.proxy);
      gsap.to(state.proxy, {
        o: val,
        ease: ease === "none" ? "none" : ease,
        duration: ease === "none" ? 0 : 0.6,
        overwrite: true,
        onUpdate: () =>
          content.style.setProperty(
            "opacity",
            String(state.proxy.o),
            "important"
          ),
      });
    } else {
      content.style.setProperty("opacity", String(val), "important");
    }
  };

  const arrow = document.getElementById("Typo-opacity-custom-timeline-arrow");
  const updateArrow = (t, s, e) => {
    if (!arrow) return;
    arrow.style.left = `${t * 100}%`;
    arrow.style.transform = "translateX(-50%)";
    arrow.style.backgroundColor =
      t < s - 0.001 ? "#EF7C2F" : t > e + 0.001 ? "#F6B67B" : "#FFFFFF";
  };

  const apply = () => {
    const t = getViewportProgress(selectedElement);
    const s = start(),
      e = end();
    const ent = entry(),
      cen = center(),
      exi = exit();

    let o;
    if (t < s) {
      const k = s <= 0 ? 1 : Math.min(t / s, 1);
      o = ent + (cen - ent) * k;
    } else if (t > e) {
      const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
      o = cen + (exi - cen) * k;
    } else {
      o = cen;
    }

    drive(Math.max(0, Math.min(1, o)));
    updateArrow(t, s, e);
  };

  if (hasGsap) {
    ScrollTrigger.getById?.(`typo-opacity:${selectedElement.id}`)?.kill();
    state.st = ScrollTrigger.create({
      id: `typo-opacity:${selectedElement.id}`,
      trigger: selectedElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: apply,
      onRefresh: apply,
    });
    ScrollTrigger.refresh(true);
  } else {
    window.addEventListener("scroll", apply, { passive: true });
  }

  const headObserver = new MutationObserver(apply);
  headObserver.observe(document.head, { childList: true, subtree: true });
  const contentObserver = new MutationObserver(apply);
  contentObserver.observe(content, {
    attributes: true,
    attributeFilter: ["style"],
  });
  window.addEventListener("resize", apply, { passive: true });

  state.raf = requestAnimationFrame(function loop() {
    if (!state.killed) {
      apply();
      state.raf = requestAnimationFrame(loop);
    }
  });

  state.tick = setTimeout(function pollVars() {
    if (state.killed) return;
    const key = [start(), end(), entry(), center(), exit()].join("|");
    if (key !== state.lastVars) {
      state.lastVars = key;
      apply();
    }
    state.tick = setTimeout(pollVars, 120);
  }, 120);

  REG.set(selectedElement, state);
}

export function TypoScaleAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("Typo-scale-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "Typo-scale-timeline-start-bullet"
    );
    const endBullet = document.getElementById("Typo-scale-timeline-end-bullet");
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
  }

  function setupScrollAnimation(content, arrow) {
    const getVar = (v, def) => {
      const raw = getComputedStyle(content)
        .getPropertyValue(v)
        .trim()
        .replace("%", "");
      const n = parseFloat(raw);
      return Number.isFinite(n) ? n : def;
    };

    const start = () => getVar("--sc-Typo-scale-scroll-start", 0) / 100;
    const end = () => getVar("--sc-Typo-scale-scroll-end", 100) / 100;

    const entry = () => getVar("--sc-Typo-scale-scroll-entry") / 2;
    const center = () => getVar("--sc-Typo-scale-scroll-center") / 2;
    const exit = () => getVar("--sc-Typo-scale-scroll-exit") / 2;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === selectedElement) t.kill();
    });

    const target = selectedElement.querySelector(".sqs-block-content");
    if (!target) return;

    gsap.set(target, { willChange: "transform", transformOrigin: "50% 50%" });

    let currentScale = null;

    const updateScale = () => {
      const t = getViewportProgress(selectedElement); // 0..1 based on element center vs visible viewport
      const s = start();
      const e = end();

      const eV = entry();
      const cV = center();
      const xV = exit();

      let y;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        y = eV + (cV - eV) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        y = cV + (xV - cV) * k;
      } else {
        y = cV;
      }

      y = Math.max(-50, Math.min(50, y));
      const scaleVal = Math.max(0.01, 1 + y / 100);

      if (scaleVal !== currentScale) {
        currentScale = scaleVal;
        const customEase = window.__typoScrollEase || "none";
        const ease = customEase === "none" ? "power1.out" : customEase;
        const duration = customEase === "none" ? 0.16 : 0.36;
        gsap.to(target, { scale: scaleVal, ease, duration, overwrite: true });
      }
    };

    ScrollTrigger.create({
      trigger: selectedElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: updateScale,
    });

    const observer = new MutationObserver(updateScale);
    observer.observe(target, { attributes: true, attributeFilter: ["style"] });

    ScrollTrigger.refresh(true);
    ScrollTrigger.update(true);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";

      const s = start();
      const e = end();
      const buffer = 0.001;
      if (!(e > s)) {
        e = s + 1;
      }
      if (t < s - buffer) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + buffer) arrow.style.backgroundColor = "#F6B67B";
      else arrow.style.backgroundColor = "#FFFFFF";

      requestAnimationFrame(loopArrow);
    }

    loopArrow();
  }

  waitForElements((arrow) => {
    const content = selectedElement.querySelector(".sqs-block-content");
    if (!content) return;
    setupScrollAnimation(content, arrow);
  });
}

export function TypoRotateAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("Typo-rotate-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "Typo-rotate-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "Typo-rotate-timeline-end-bullet"
    );
    if (arrow && startBullet && endBullet) {
      callback(arrow);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function setupScrollAnimation(content, arrow) {
    const getVar = (v, def) => {
      const raw = getComputedStyle(content)
        .getPropertyValue(v)
        .trim()
        .replace("%", "");
      const n = parseFloat(raw);
      return Number.isFinite(n) ? n : def;
    };

    const start = () => getVar("--sc-Typo-rotate-scroll-start", 0) / 100;
    const end = () => getVar("--sc-Typo-rotate-scroll-end", 100) / 100;

    const entryDeg = () =>
      parseFloat(
        getComputedStyle(content).getPropertyValue(
          "--sc-Typo-rotate-scroll-entry"
        )
      ) || 0;
    const centerDeg = () =>
      parseFloat(
        getComputedStyle(content).getPropertyValue(
          "--sc-Typo-rotate-scroll-center"
        )
      ) || 0;
    const exitDeg = () =>
      parseFloat(
        getComputedStyle(content).getPropertyValue(
          "--sc-Typo-rotate-scroll-exit"
        )
      ) || 0;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === selectedElement) t.kill();
    });

    let lastDeg = null;

    const updateRotation = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();

      let deg;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        deg = entryDeg() + (centerDeg() - entryDeg()) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        deg = centerDeg() + (exitDeg() - centerDeg()) * k;
      } else {
        deg = centerDeg();
      }

      if (deg !== lastDeg) {
        lastDeg = deg;
        const ease = window.__typoScrollEase || "none";
        gsap.to(content, {
          rotate: deg,
          ease: ease === "none" ? "power1.out" : ease, // smoother easing
          duration: ease === "none" ? 0.2 : 0.6, // minimal smoothness
          overwrite: true,
        });
      }
    };

    ScrollTrigger.create({
      trigger: selectedElement,
      start: `top+=0px bottom`,
      end: `bottom+=0px top`,
      scrub: 1,
      onUpdate: updateRotation,
    });

    const observer = new MutationObserver(updateRotation);
    observer.observe(content, { attributes: true, attributeFilter: ["style"] });

    setInterval(updateRotation, 150);

    ScrollTrigger.refresh(true);
    ScrollTrigger.update(true);

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";

      const s = start();
      const e = end();
      const buffer = 0.001;
      if (!(e > s)) {
        e = s + 1;
      }
      if (t < s - buffer) {
        arrow.style.backgroundColor = "#EF7C2F";
      } else if (t > e + buffer) {
        arrow.style.backgroundColor = "#F6B67B";
      } else {
        arrow.style.backgroundColor = "#FFFFFF";
      }

      requestAnimationFrame(loopArrow);
    }

    loopArrow();
  }

  waitForElements((arrow) => {
    const content = selectedElement.querySelector(".sqs-block-content");
    if (!content) return;
    setupScrollAnimation(content, arrow);
  });
}

export function TypoBlurAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;
  const content = selectedElement.querySelector(".sqs-block-content");
  if (!content) return;

  const REG = (window.__scBlurReg ||= new WeakMap());
  REG.get(selectedElement)?.kill?.();

  const hasGsap = !!window.gsap && !!window.ScrollTrigger;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  const readPct = (v, d) => {
    const raw = getComputedStyle(content).getPropertyValue(v);
    const n = parseFloat(String(raw).replace("%", "").trim());
    return Number.isFinite(n) ? n : d;
  };

  const start = () => readPct("--sc-Typo-blur-scroll-start", 0) / 100;
  const end = () => readPct("--sc-Typo-blur-scroll-end", 100) / 100;
  const entry = () => readPct("--sc-Typo-blur-scroll-entry", 0) / 100;
  const center = () => readPct("--sc-Typo-blur-scroll-center", 0) / 100;
  const exit = () => readPct("--sc-Typo-blur-scroll-exit", 0) / 100;

  const state = {
    st: null,
    raf: 0,
    tick: 0,
    killed: false,
    lastTarget: NaN,
    lastVars: "",
    proxy: {
      o:
        parseFloat(
          (getComputedStyle(content).filter.match(/blur\(([^)]+)\)/) || [
            ,
            "0",
          ])[1]
        ) || 0,
    },

    kill() {
      this.killed = true;
      if (this.st) this.st.kill();
      cancelAnimationFrame(this.raf);
      clearTimeout(this.tick);
      REG.delete(selectedElement);
    },
  };

  const drive = (val) => {
    const maxPx =
      parseFloat(
        getComputedStyle(content).getPropertyValue("--sc-Typo-blur-max")
      ) || 16;
    const px = val * maxPx;

    const ease = window.__typoScrollEase || "none";

    if (!hasGsap) {
      content.style.setProperty("filter", `blur(${px}px)`, "important");
      state.lastTarget = val;
      return;
    }

    // GSAP tween toward target blur(px)
    if (val !== state.lastTarget) {
      state.lastTarget = val;
      gsap.killTweensOf(state.proxy);
      gsap.to(state.proxy, {
        o: px,
        ease: ease === "none" ? "none" : ease,
        duration: ease === "none" ? 0 : 0.6,
        overwrite: true,
        onUpdate: () => {
          content.style.setProperty(
            "filter",
            `blur(${state.proxy.o}px)`,
            "important"
          );
        },
      });
    } else {
      content.style.setProperty("filter", `blur(${px}px)`, "important");
    }
  };

  const arrow = document.getElementById("Typo-blur-custom-timeline-arrow");
  const updateArrow = (t, s, e) => {
    if (!arrow) return;
    arrow.style.left = `${t * 100}%`;
    arrow.style.transform = "translateX(-50%)";
    arrow.style.backgroundColor =
      t < s - 0.001 ? "#EF7C2F" : t > e + 0.001 ? "#F6B67B" : "#FFFFFF";
  };

  const apply = () => {
    const t = getViewportProgress(selectedElement);
    const s = start(),
      e = end();
    const ent = entry(),
      cen = center(),
      exi = exit();

    let o;
    if (t <= s) {
      o = ent; // hold entry value before start (no ramp)
    } else if (t >= e) {
      o = exi; // hold exit value after end (no ramp)
    } else {
      o = cen; // inside the window
    }

    drive(Math.max(0, Math.min(1, o)));
    updateArrow(t, s, e);
  };

  if (hasGsap) {
    ScrollTrigger.getById?.(`typo-blur:${selectedElement.id}`)?.kill();
    state.st = ScrollTrigger.create({
      id: `typo-blur:${selectedElement.id}`,
      trigger: selectedElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: apply,
      onRefresh: apply,
    });
    ScrollTrigger.refresh(true);
  } else {
    window.addEventListener("scroll", apply, { passive: true });
  }

  const headObserver = new MutationObserver(apply);
  headObserver.observe(document.head, { childList: true, subtree: true });
  const contentObserver = new MutationObserver(apply);
  contentObserver.observe(content, {
    attributes: true,
    attributeFilter: ["style"],
  });
  window.addEventListener("resize", apply, { passive: true });

  state.raf = requestAnimationFrame(function loop() {
    if (!state.killed) {
      apply();
      state.raf = requestAnimationFrame(loop);
    }
  });

  state.tick = setTimeout(function pollVars() {
    if (state.killed) return;
    const key = [start(), end(), entry(), center(), exit()].join("|");
    if (key !== state.lastVars) {
      state.lastVars = key;
      apply();
    }
    state.tick = setTimeout(pollVars, 120);
  }, 120);

  REG.set(selectedElement, state);
}
