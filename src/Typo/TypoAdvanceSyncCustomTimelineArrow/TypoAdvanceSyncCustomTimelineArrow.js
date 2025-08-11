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
     const t = getViewportProgress(selectedElement);
     arrow.style.left = `${t * 100}%`;
     arrow.style.transform = "translateX(-50%)";

     const s = start();
     const e = end();
     const buffer = 0.001;

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
    if (arrow && startBullet && endBullet) callback(arrow);
    else if (retries > 0)
      setTimeout(() => waitForElements(callback, retries - 1), 100);
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
      const t = getViewportProgress(selectedElement);
      const s = start();
      const e = end();

      const eX = entryX();
      const cX = centerX();
      const xX = exitX();

      let vwVal;
      if (t < s) {
        const k = s <= 0 ? 1 : Math.min(t / s, 1);
        vwVal = eX + (cX - eX) * k;
      } else if (t > e) {
        const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
        vwVal = cX + (xX - cX) * k;
      } else {
        vwVal = cX;
      }

      vwVal = Math.max(-50, Math.min(50, vwVal));

      const viewportW = Math.max(window.innerWidth, 1);
      const desiredPx = (vwVal / 100) * viewportW;

      const rect = selectedElement.getBoundingClientRect();
      const maxLeftShift = -rect.left;
      const maxRightShift = viewportW - rect.right;
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

    ScrollTrigger.refresh(true);
    ScrollTrigger.update(true);

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
    const content = selectedElement.querySelector(".sqs-block-content");
    if (!content) return;
    setupScrollAnimation(content, arrow);
  });
}

export function TypoOpacityAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;
  const content = selectedElement.querySelector(".sqs-block-content");
  if (!content) return;

  const readPct = (v, d = 0) => {
    const raw = getComputedStyle(content).getPropertyValue(v);
    const n = parseFloat(String(raw).replace("%", ""));
    return Number.isFinite(n) ? n : d;
  };

  const start = () => readPct("--sc-Typo-opacity-scroll-start", 0) / 100;
  const end = () => readPct("--sc-Typo-opacity-scroll-end", 100) / 100;
  const entry = () => readPct("--sc-Typo-opacity-scroll-entry", 0) / 100;
  const center = () => readPct("--sc-Typo-opacity-scroll-center", 0) / 100;
  const exit = () => readPct("--sc-Typo-opacity-scroll-exit", 0) / 100;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => {
      if (
        t.trigger === selectedElement &&
        t.vars?.id?.startsWith("typo-opacity:")
      )
        t.kill();
    });
  }

  let last = -1;
  const apply = () => {
    const t = getViewportProgress(selectedElement);
    const s = start(),
      e = end(),
      ent = entry(),
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
    o = Math.max(0, Math.min(1, o));
    if (o !== last) {
      last = o;
      const ease = window.__typoScrollEase || "none";
      gsap.to(content, {
        opacity: o,
        ease: ease === "none" ? "none" : ease,
        duration: ease === "none" ? 0 : 0.6,
        overwrite: true,
      });
    }
  };

  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.create({
      id: `typo-opacity:${selectedElement.id}`,
      trigger: selectedElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: apply,
    });
    ScrollTrigger.refresh(true);
  } else {
    window.addEventListener("scroll", apply, { passive: true });
  }

  const arrow = document.getElementById("Typo-opacity-custom-timeline-arrow");
  const loopArrow = () => {
    if (!arrow) return;
    const t = getViewportProgress(selectedElement);
    arrow.style.left = `${t * 100}%`;
    arrow.style.transform = "translateX(-50%)";
    const s = start(),
      e = end();
    const buffer = 0.001;
    arrow.style.backgroundColor =
      t < s - buffer ? "#EF7C2F" : t > e + buffer ? "#F6B67B" : "#FFFFFF";
    requestAnimationFrame(loopArrow);
  };

  apply();
  loopArrow();
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
    const getVar = (v) =>
      parseFloat(
        getComputedStyle(content).getPropertyValue(v).trim().replace("%", "")
      ) || 0;

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

    const start = () => getVar("--sc-Typo-rotate-scroll-start") / 100;
    const end = () => getVar("--sc-Typo-rotate-scroll-end") / 100;

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