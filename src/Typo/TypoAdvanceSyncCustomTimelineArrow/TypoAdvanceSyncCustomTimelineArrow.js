export function TypoAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById(
      "Typo-vertical-custom-timeline-arrow"
    );
    const startBullet = document.getElementById(
      "Typo-vertical-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "Typo-vertical-timeline-end-bullet"
    );

    if (arrow && startBullet && endBullet) {
      callback(arrow);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function setupScrollAnimation(content, arrow) {
    const getVar = (v) =>
      parseFloat(
        getComputedStyle(content).getPropertyValue(v).trim().replace("%", "")
      ) || 0;

    const entryY = () => getVar("--sc-Typo-vertical-scroll-entry") / 2;
    const centerY = () => getVar("--sc-Typo-vertical-scroll-center") / 2;
    const exitY = () => getVar("--sc-Typo-vertical-scroll-exit") / 2;
    const start = () => getVar("--sc-Typo-vertical-scroll-start") / 100;
    const end = () => getVar("--sc-Typo-vertical-scroll-end") / 100;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === selectedElement) t.kill();
    });

    let currentY = null;

    const updateYTransform = () => {
      const scrollRatio =
        1 - selectedElement.getBoundingClientRect().top / window.innerHeight;
      const s = start();
      const e = end();

      const eY = entryY();
      const cY = centerY();
      const xY = exitY();

      let y;

      if (scrollRatio < s) {
        const t = Math.min(scrollRatio / s, 1);
        y = eY + (cY - eY) * t;
      } else if (scrollRatio > e) {
        const t = Math.min((scrollRatio - e) / (1 - e), 1);
        y = cY + (xY - cY) * t;
      } else {
        y = cY;
      }

      y = Math.max(-50, Math.min(50, y));

      if (y !== currentY) {
        currentY = y;

        const ease = window.__typoScrollEase || "none";
        gsap.to(content, {
          y: `${y}vh`,
          ease,
          duration: ease === "none" ? 0 : 0.6,
          overwrite: true,
        });
      }
    };

    ScrollTrigger.create({
      trigger: selectedElement,
      start: `top+=0px bottom`,
      end: `bottom+=0px top`,
      scrub: 1,
      onUpdate: () => {
        updateYTransform();
      },
    });

    const observer = new MutationObserver(updateYTransform);
    observer.observe(content, { attributes: true, attributeFilter: ["style"] });

    setInterval(updateYTransform, 150);

    ScrollTrigger.refresh(true);
    ScrollTrigger.update(true);

    function loopArrow() {
      const rect = selectedElement.getBoundingClientRect();
      const scrollRatio =
        1 - Math.min(Math.max(rect.top / window.innerHeight, 0), 1);
      arrow.style.left = `${scrollRatio * 100}%`;
      arrow.style.transform = "translateX(-50%)";

      const s = start();
      const e = end();
      const buffer = 0.001;

      if (scrollRatio < s - buffer) {
        arrow.style.backgroundColor = "#EF7C2F";
      } else if (scrollRatio > e + buffer) {
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

export function TypoHorizontalAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById(
      "Typo-horizontal-custom-timeline-arrow"
    );
    const startBullet = document.getElementById(
      "Typo-horizontal-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "Typo-horizontal-timeline-end-bullet"
    );
    if (arrow && startBullet && endBullet) {
      callback(arrow);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function setupScrollAnimation(content, arrow) {
    const getVar = (v) =>
      parseFloat(
        getComputedStyle(content).getPropertyValue(v).trim().replace("%", "")
      ) || 0;

    const entryX = () => getVar("--sc-Typo-horizontal-scroll-entry") / 2;
    const centerX = () => getVar("--sc-Typo-horizontal-scroll-center") / 2;
    const exitX = () => getVar("--sc-Typo-horizontal-scroll-exit") / 2;
    const start = () => getVar("--sc-Typo-horizontal-scroll-start") / 100;
    const end = () => getVar("--sc-Typo-horizontal-scroll-end") / 100;

    if (!document.documentElement.classList.contains("sc-no-x-scroll")) {
      document.documentElement.classList.add("sc-no-x-scroll");
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === selectedElement) t.kill();
    });

    gsap.set(content, { willChange: "transform" });

    let currentPx = null;

    const updateXTransform = () => {
      const rect = selectedElement.getBoundingClientRect();
      const viewportH = Math.max(window.innerHeight, 1);
      const viewportW = Math.max(window.innerWidth, 1);

      const raw = 1 - rect.top / viewportH;
      const scrollRatio = Math.min(Math.max(raw, 0), 1);

      const s = start();
      const e = end();

      const eX = entryX();
      const cX = centerX();
      const xX = exitX();

      let vwVal;
      if (scrollRatio < s) {
        const t = Math.min(scrollRatio / (s || 1e-6), 1);
        vwVal = eX + (cX - eX) * t;
      } else if (scrollRatio > e) {
        const t = Math.min((scrollRatio - e) / Math.max(1 - e, 1e-6), 1);
        vwVal = cX + (xX - cX) * t;
      } else {
        vwVal = cX;
      }

      vwVal = Math.max(-50, Math.min(50, vwVal));

      const desiredPx = (vwVal / 100) * viewportW;

      const maxLeftShift = -rect.left; // don’t go past left edge
      const maxRightShift = viewportW - rect.right; // don’t go past right edge
      const clampedPx = Math.max(
        maxLeftShift,
        Math.min(desiredPx, maxRightShift)
      );

      if (clampedPx !== currentPx) {
        currentPx = clampedPx;
        const customEase = window.__typoScrollEase || "none";
        const ease = customEase === "none" ? "power1.out" : customEase;
        const duration = customEase === "none" ? 0.16 : 0.36;
        gsap.to(content, { x: clampedPx, ease, duration, overwrite: true });
      }
    };

    ScrollTrigger.create({
      trigger: selectedElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: updateXTransform,
    });

    const observer = new MutationObserver(updateXTransform);
    observer.observe(content, { attributes: true, attributeFilter: ["style"] });

    setInterval(updateXTransform, 150);
    ScrollTrigger.refresh(true);
    ScrollTrigger.update(true);

    function loopArrow() {
      const rect = selectedElement.getBoundingClientRect();
      const viewportH = Math.max(window.innerHeight, 1);
      const ratio = 1 - Math.min(Math.max(rect.top / viewportH, 0), 1);

      arrow.style.left = `${ratio * 100}%`;
      arrow.style.transform = "translateX(-50%)";

      const s = start();
      const e = end();
      const buffer = 0.001;

      if (ratio < s - buffer) {
        arrow.style.backgroundColor = "#EF7C2F";
      } else if (ratio > e + buffer) {
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

export function TypoOpacityAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("Typo-opacity-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "Typo-opacity-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "Typo-opacity-timeline-end-bullet"
    );

    if (arrow && startBullet && endBullet) {
      arrow.style.left = "0%";
      arrow.style.transform = "translateX(-50%)";
      callback(arrow, startBullet, endBullet);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(arrow, startBullet, endBullet) {
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

    const startBox = startBullet.getBoundingClientRect();
    const endBox = endBullet.getBoundingClientRect();
    const arrowBox = arrow.getBoundingClientRect();

    const arrowCenter = arrowBox.left + arrowBox.width / 2;
    const startCenter = startBox.left + startBox.width / 2;
    const endCenter = endBox.left + endBox.width / 2;
    const centerCenter = (startCenter + endCenter) / 2;

    const btn = selectedElement.querySelector(".sqs-block-content");
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%") ? parseFloat(value) : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-Typo-opacity-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-Typo-opacity-scroll-center");
    const exitY = getVHFromCSSVar("--sc-Typo-opacity-scroll-exit");

    let y = 0;
    let apply = false;

    if (arrowCenter <= startCenter + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (arrowCenter - startCenter + 1) / 2)
        );
        y = entryY * progress;
        apply = true;
      }
    } else if (arrowCenter >= endCenter - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (endCenter - arrowCenter + 1) / 2)
        );
        y = exitY * (1 - progress);
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (arrowCenter > startCenter + 1 && arrowCenter < centerCenter - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (arrowCenter - startCenter) / (centerCenter - startCenter);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        arrowCenter > centerCenter + 1 &&
        arrowCenter < endCenter - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (arrowCenter - centerCenter) / (endCenter - centerCenter);
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
        opacity: Math.max(0, Math.min(1, finalY / 100)),
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, startBullet, endBullet) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, startBullet, endBullet);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, startBullet, endBullet) => {
    trackLoop(arrow, startBullet, endBullet);
  });
}

export function TypoScaleAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("Typo-scale-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "Typo-scale-timeline-start-bullet"
    );
    const endBullet = document.getElementById("Typo-scale-timeline-end-bullet");
    if (arrow && startBullet && endBullet) {
      callback(arrow);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function setupScrollAnimation(content, arrow) {
    const getVar = (v) =>
      parseFloat(
        getComputedStyle(content).getPropertyValue(v).trim().replace("%", "")
      ) || 0;

    const entry = () => getVar("--sc-Typo-scale-scroll-entry") / 2;
    const center = () => getVar("--sc-Typo-scale-scroll-center") / 2;
    const exit = () => getVar("--sc-Typo-scale-scroll-exit") / 2;
    const start = () => getVar("--sc-Typo-scale-scroll-start") / 100;
    const end = () => getVar("--sc-Typo-scale-scroll-end") / 100;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === selectedElement) t.kill();
    });

    const target = selectedElement.querySelector(".sqs-block-content");
    if (!target) return;

    gsap.set(target, { willChange: "transform", transformOrigin: "50% 50%" });

    let currentScale = null;

    const updateScale = () => {
      const rect = selectedElement.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const raw = 1 - rect.top / vh;
      const ratio = Math.min(Math.max(raw, 0), 1);

      const s = start();
      const e = end();

      const eV = entry();
      const cV = center();
      const xV = exit();

      let y;
      if (ratio < s) {
        const t = Math.min(ratio / (s || 1e-6), 1);
        y = eV + (cV - eV) * t;
      } else if (ratio > e) {
        const t = Math.min((ratio - e) / Math.max(1 - e, 1e-6), 1);
        y = cV + (xV - cV) * t;
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

    setInterval(updateScale, 150);
    ScrollTrigger.refresh(true);
    ScrollTrigger.update(true);

    function loopArrow() {
      const rect = selectedElement.getBoundingClientRect();
      const vh = Math.max(window.innerHeight, 1);
      const ratio = 1 - Math.min(Math.max(rect.top / vh, 0), 1);

      arrow.style.left = `${ratio * 100}%`;
      arrow.style.transform = "translateX(-50%)";

      const s = start();
      const e = end();
      const buffer = 0.001;

      if (ratio < s - buffer) {
        arrow.style.backgroundColor = "#EF7C2F";
      } else if (ratio > e + buffer) {
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


export function TypoRotateAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;
  if (selectedElement.dataset.scRotateLoop === "1") return;
  selectedElement.dataset.scRotateLoop = "1";

  function clamp01(x) {
    return Math.max(0, Math.min(1, x));
  }
  function viewportProgress(el) {
    const r = el.getBoundingClientRect();
    const vh = Math.max(1, window.innerHeight);
    return clamp01((vh - r.top) / (vh + r.height));
  }
  function numVar(el, name, as01) {
    const raw = getComputedStyle(el).getPropertyValue(name).trim();
    if (!raw) return 0;
    const v = parseFloat(raw);
    if (!isFinite(v)) return 0;
    return as01 ? (raw.includes("%") ? v / 100 : v) : v;
  }
  function waitForEls(cb, retries = 20) {
    const arrow = document.getElementById("Typo-rotate-custom-timeline-arrow");
    const sBul = document.getElementById("Typo-rotate-timeline-start-bullet");
    const eBul = document.getElementById("Typo-rotate-timeline-end-bullet");
    if (arrow && sBul && eBul) cb(arrow, sBul, eBul);
    else if (retries > 0) setTimeout(() => waitForEls(cb, retries - 1), 100);
  }

  function setup(arrow) {
    const content = selectedElement.querySelector(".sqs-block-content");
    if (!content) return;

    if (!document.documentElement.classList.contains("sc-no-x-scroll")) {
      document.documentElement.classList.add("sc-no-x-scroll");
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
    }

    let lastDeg = null;

    const tick = () => {
      const p = viewportProgress(selectedElement);
      const pct = p * 100;

      arrow.style.left = pct + "%";
      arrow.style.transform = "translateX(-50%)";

      const s = clamp01(numVar(content, "--sc-Typo-rotate-scroll-start", true));
      const e = clamp01(numVar(content, "--sc-Typo-rotate-scroll-end", true));
      const a = numVar(content, "--sc-Typo-rotate-scroll-entry");
      const b = numVar(content, "--sc-Typo-rotate-scroll-center");
      const c = numVar(content, "--sc-Typo-rotate-scroll-exit");

      const buf = 0.001;
      arrow.style.backgroundColor =
        p < s - buf ? "#EF7C2F" : p > e + buf ? "#F6B67B" : "#FFFFFF";

      let deg = a;
      if (e > s) {
        const mid = (s + e) / 2;
        if (p <= s) {
          deg = a;
        } else if (p < mid) {
          const t = (p - s) / Math.max(mid - s, 1e-6);
          deg = a + (b - a) * t;
        } else if (p < e) {
          const t = (p - mid) / Math.max(e - mid, 1e-6);
          deg = b + (c - b) * t;
        } else {
          deg = c;
        }
      }

      if (deg !== lastDeg) {
        if (window.gsap) {
          gsap.to(content, {
            rotate: deg,
            duration: lastDeg == null ? 0 : 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        } else {
          content.style.transition =
            lastDeg == null ? "none" : "transform 0.3s ease-out";
          content.style.transform = `rotate(${deg}deg)`;
        }
        lastDeg = deg;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  waitForEls(setup);
}


