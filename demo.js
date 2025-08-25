export function horizontalbuttonAdvanceSyncCustomTimelineArrow(selectedElement) {
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
    const getVar = (v) =>
      parseFloat(
        getComputedStyle(btn).getPropertyValue(v).trim().replace("%", "")
      ) || 0;
    const entryY = () => getVar("--sc-horizontal-scroll-entry") / 2;
    const centerY = () => getVar("--sc-horizontal-scroll-center") / 2;
    const exitY = () => getVar("--sc-horizontal-scroll-exit") / 2;
    const start = () => getVar("--sc-horizontal-scroll-start") / 100;
    const end = () => getVar("--sc-horizontal-scroll-end") / 100;

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