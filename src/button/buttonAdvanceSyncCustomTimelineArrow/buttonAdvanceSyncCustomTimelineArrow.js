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
    const read = (v, fb = 0) => {
      const raw = getComputedStyle(btn).getPropertyValue(v).trim();
      const n = parseFloat(raw.replace("%", ""));
      return Number.isFinite(n) ? n : fb;
    };

    const entry = () => read("--sc-opacity-scroll-entry", 100);
    const center = () => read("--sc-opacity-scroll-center", 100);
    const exit = () => read("--sc-opacity-scroll-exit", 100);
    const start = () => read("--sc-opacity-scroll-start", 0) / 100;
    const end = () => read("--sc-opacity-scroll-end", 100) / 100;

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
        if (gs)
          gs.to(btn, {
            opacity: op,
            ease,
            duration: ease === "none" ? 0.25 : 0.6,
            overwrite: true,
          });
        else btn.style.opacity = String(op);
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
    // allow scaled content to overflow its block container
    const makeOverflowVisible = () => {
      const set = (el) => {
        if (el) el.style.overflow = "visible";
      };
      set(selectedElement);
      set(selectedElement.parentElement);
      set(selectedElement.querySelector(".sqs-block-content"));
      btn.style.transformOrigin ||= "50% 50%";
      btn.style.willChange = "transform";
      if (
        !/relative|absolute|fixed|sticky/.test(getComputedStyle(btn).position)
      ) {
        btn.style.position = "relative";
      }
      btn.style.zIndex ||= "2";
    };
    makeOverflowVisible();

    const readRaw = (v) => getComputedStyle(btn).getPropertyValue(v).trim();
    const readPct = (v, fb = 0) => {
      const n = parseFloat(readRaw(v).replace("%", ""));
      return Number.isFinite(n) ? n : fb;
    };

    const start = () =>
      (parseFloat(readRaw("--sc-scale-scroll-start").replace("%", "")) || 0) /
      100;
    const end = () =>
      (parseFloat(readRaw("--sc-scale-scroll-end").replace("%", "")) || 100) /
      100;

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

    let activeZone = null; // "entry" | "center" | "exit" while dragging those bullets
    let lastAppliedScale = null;
    let quickToScale = null;
    let quickEase = null;
    const EPS = 0.001;

    const ensureQuick = () => {
      if (!gs) return null;
      const e = easeName();
      if (!quickToScale || quickEase !== e) {
        quickEase = e;
        quickToScale = gs.quickTo(btn, "scale", {
          duration: e === "none" ? 0.25 : 0.6,
          ease: e,
          overwrite: true,
        });
      }
      return quickToScale;
    };

    const setScale1 = () => {
      if (lastAppliedScale === null) return; // do nothing if we never applied
      if (gs) {
        const q = ensureQuick();
        q ? q(1) : gs.set(btn, { scale: 1, overwrite: true });
      } else {
        const without = (btn.style.transform || "")
          .replace(/(?:^|\s)scale\([^)]+\)/, "")
          .trim();
        btn.style.transform = (without + " scale(1)").trim();
      }
      lastAppliedScale = 1;
    };

    const applyScale = (sc) => {
      if (gs) {
        const q = ensureQuick();
        q ? q(sc) : gs.set(btn, { scale: sc, overwrite: true });
      } else {
        const cur = lastAppliedScale ?? sc;
        const target = sc;
        let s = cur;
        const step = () => {
          s += (target - s) * 0.18;
          if (Math.abs(target - s) < 0.001) s = target;
          const without = (btn.style.transform || "")
            .replace(/(?:^|\s)scale\([^)]+\)/, "")
            .trim();
          btn.style.transform = (without + ` scale(${s})`).trim();
          lastAppliedScale = s;
          if (s !== target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
      lastAppliedScale = sc;
    };

    const updateScale = () => {
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();

      const zone = t < s - EPS ? "before" : t > e + EPS ? "after" : "inside";
      const allowed =
        activeZone === "entry"
          ? "before"
          : activeZone === "center"
          ? "inside"
          : activeZone === "exit"
          ? "after"
          : null;

      if (!allowed || zone !== allowed) {
        setScale1(); // keep other transforms, just return to neutral scale smoothly
        return;
      }

      const varName =
        zone === "before"
          ? "--sc-scale-scroll-entry"
          : zone === "after"
          ? "--sc-scale-scroll-exit"
          : "--sc-scale-scroll-center";

      // map [-100..100]% → [0..2] with 1 at 0
      let pct = readPct(varName, 0);
      pct = Math.max(-100, Math.min(100, pct));
      const sc = Math.max(0, 1 + pct / 100);

      if (lastAppliedScale == null || Math.abs(lastAppliedScale - sc) > 1e-4) {
        applyScale(sc);
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

    setInterval(updateScale, 120); // poll while UI writes CSS variables

    const entryBullet =
      document.getElementById("scale-button-advance-entry-bullet") ||
      document.getElementById("scale-advance-entry-bullet");
    const centerBullet =
      document.getElementById("scale-button-advance-center-bullet") ||
      document.getElementById("scale-advance-center-bullet");
    const exitBullet =
      document.getElementById("scale-button-advance-exit-bullet") ||
      document.getElementById("scale-advance-exit-bullet");

    const onDown = (zoneKey) => {
      activeZone = zoneKey;
      updateScale();
    };
    const onUp = () => {
      activeZone = null;
      setScale1();
    };

    if (entryBullet) {
      entryBullet.addEventListener("mousedown", () => onDown("entry"));
      entryBullet.addEventListener("touchstart", () => onDown("entry"), {
        passive: true,
      });
    }
    if (centerBullet) {
      centerBullet.addEventListener("mousedown", () => onDown("center"));
      centerBullet.addEventListener("touchstart", () => onDown("center"), {
        passive: true,
      });
    }
    if (exitBullet) {
      exitBullet.addEventListener("mousedown", () => onDown("exit"));
      exitBullet.addEventListener("touchstart", () => onDown("exit"), {
        passive: true,
      });
    }

    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp, { passive: true });
    document.addEventListener("touchcancel", onUp, { passive: true });

    function loopArrow() {
      const t = getViewportProgress(selectedElement);
      arrow.style.left = `${t * 100}%`;
      arrow.style.transform = "translateX(-50%)";
      const s = start(),
        e = end();
      if (t < s - EPS) arrow.style.backgroundColor = "#EF7C2F";
      else if (t > e + EPS) arrow.style.backgroundColor = "#F6B67B";
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
