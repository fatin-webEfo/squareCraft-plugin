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

    const entryY = () => getVar("--sc-Typo-horizontal-scroll-entry") / 2;
    const centerY = () => getVar("--sc-Typo-horizontal-scroll-center") / 2;
    const exitY = () => getVar("--sc-Typo-horizontal-scroll-exit") / 2;
    const start = () => getVar("--sc-Typo-horizontal-scroll-start") / 100;
    const end = () => getVar("--sc-Typo-horizontal-scroll-end") / 100;

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
