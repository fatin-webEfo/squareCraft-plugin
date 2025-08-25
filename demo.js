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
    const arrow = document.getElementById(
      "vertical-custom-timeline-arrow"
    );
    const startBullet = document.getElementById(
      "vertical-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "vertical-timeline-end-bullet"
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

    const entryY = () => getVar("--sc-vertical-scroll-entry") / 2;
    const centerY = () => getVar("--sc-vertical-scroll-center") / 2;
    const exitY = () => getVar("--sc-vertical-scroll-exit") / 2;
    const start = () => getVar("--sc-vertical-scroll-start") / 100;
    const end = () => getVar("--sc-vertical-scroll-end") / 100;

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
