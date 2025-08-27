

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
      if (gs && ST) gs.registerPlugin(ST);
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
              overwrite: "auto",
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
      if (gs && ST) gs.registerPlugin(ST);
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
              overwrite: "auto",
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
      const content = selectedElement.querySelector(".sqs-block-content");
      const els = [btn, content, selectedElement].filter(Boolean);
      const mem = { entry: 0, center: 0, exit: 0, start: 0, end: 100 };
      const readPctVarSticky = (keys, k, fb) => {
        for (const el of els) {
          const cs = getComputedStyle(el);
          for (const name of keys) {
            const raw = cs.getPropertyValue(name);
            if (raw) {
              const v = parseFloat(String(raw).trim().replace("%", ""));
              if (Number.isFinite(v)) {
                mem[k] = v;
                return v;
              }
            }
          }
        }
        return typeof mem[k] === "number" ? mem[k] : fb;
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
      if (gs && ST) gs.registerPlugin(ST);
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
              overwrite: "auto",
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
      const setOverflow = (el) => {
        if (el) el.style.overflow = "visible";
      };
      setOverflow(selectedElement);
      setOverflow(selectedElement.parentElement);
      setOverflow(selectedElement.querySelector(".sqs-block-content"));
      if (!btn.style.transformOrigin) btn.style.transformOrigin = "50% 50%";
      btn.style.willChange = "transform";
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
      if (gs && ST) gs.registerPlugin(ST);
      let lastScale = null;
      const updateScale = () => {
        const t = getViewportProgress(selectedElement);
        const s = start();
        const e = end();
        const en = entryPct();
        const ce = centerPct();
        const ex = exitPct();
        let p;
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
        const sc = Math.max(0, 1 + p / 100);
        if (sc !== lastScale) {
          lastScale = sc;
          const ease = easeName();
          if (gs) {
            gs.to(btn, {
              scale: sc,
              duration: ease === "none" ? 0.25 : 0.6,
              ease,
              overwrite: "auto",
            });
          } else {
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
      if (gs && ST) gs.registerPlugin(ST);
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
          if (gs)
            gs.to(btn, {
              rotation: deg,
              ease,
              duration: ease === "none" ? 0.25 : 0.6,
              overwrite: "auto",
            });
          else setRotateFallback(deg);
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
    const readPctOr = (names, fb = 0) => {
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
      readPctOr(["--sc-blur-scroll-entry", "--sc-Typo-blur-scroll-entry"], 0);
    const centerVal = () =>
      readPctOr(["--sc-blur-scroll-center", "--sc-Typo-blur-scroll-center"], 0);
    const exitVal = () =>
      readPctOr(["--sc-blur-scroll-exit", "--sc-Typo-blur-scroll-exit"], 0);
    const start = () =>
      readPctOr(["--sc-blur-scroll-start", "--sc-Typo-blur-scroll-start"], 0) /
      100;
    const end = () =>
      readPctOr(["--sc-blur-scroll-end", "--sc-Typo-blur-scroll-end"], 100) /
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
    if (gs && ST) gs.registerPlugin(ST);
    const computedFilter =
      getComputedStyle(btn).getPropertyValue("filter") || "";
    let baseFilter = computedFilter.replace(/blur\([^)]+\)/, "").trim();
    if (baseFilter === "none") baseFilter = "";
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
            overwrite: "auto",
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
    updateBlur();
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


  // export function logButtonAdvanceScrollEffectStyle(target) {
  //   const el = typeof target === "function" ? target() : target;
  //   const s = getButtonAdvanceScrollEffectStyle(el);
  //   if (!s) {
  //     console.log("button advance scroll effect style = null");
  //     return;
  //   }
  //   console.log(
  //     "button advance scroll effect style =\n" + JSON.stringify(s, null, 2)
  //   );
  // }

  // logButtonAdvanceScrollEffectStyle(selectedElement);
