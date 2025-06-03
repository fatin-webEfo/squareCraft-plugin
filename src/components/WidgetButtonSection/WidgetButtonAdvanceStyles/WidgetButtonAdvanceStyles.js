export function initButtonAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById("timeline-start-bullet");
  const endBullet = document.getElementById("timeline-end-bullet");
  const startFill = document.getElementById("timeline-start-fill");
  const endFill = document.getElementById("timeline-end-fill");
  const startValue = document.getElementById("timelineStartValue");
  const endValue = document.getElementById("timelineEndValue");

  if (
    !startBullet ||
    !endBullet ||
    !startFill ||
    !endFill ||
    !startValue ||
    !endValue
  )
    return;

  let startPercent = 0;
  let endPercent = 100;

  function applyScrollClass(button, type, val) {
    const classPrefix = `sc-scroll-${type}-`;
    const currentClasses = Array.from(button.classList).filter((c) =>
      c.startsWith(classPrefix)
    );
    currentClasses.forEach((cls) => button.classList.remove(cls));
    button.classList.add(`${classPrefix}${val}`);
  }

  function applyStyle(type, val) {
    const el = getSelectedElement?.();
    if (el) {
      const button = el.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, " +
          "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      );
      if (button) {
        applyScrollClass(button, type, val);
      }
    }
  }

  const updateStart = (val) => {
    startPercent = Math.min(val, endPercent - 1);
    gsap.set(startBullet, { left: `${startPercent}%` });
    gsap.set(startFill, { left: "0%", width: `${startPercent}%` });
    startValue.textContent = `${startPercent}%`;
    applyStyle("start", startPercent);
    updateEnd(endPercent); // refresh fill
  };

  const updateEnd = (val) => {
    endPercent = Math.max(val, startPercent + 1);
    gsap.set(endBullet, { left: `${endPercent}%` });
    gsap.set(endFill, {
      left: `${startPercent}%`,
      width: `${endPercent - startPercent}%`,
    });
    endValue.textContent = `${endPercent}%`;
    applyStyle("end", endPercent);
  };

  const makeDraggable = (bullet, updateFn) => {
    bullet.onmousedown = (e) => {
      e.preventDefault();
      document.onmousemove = (event) => {
        const rect = bullet.parentElement.getBoundingClientRect();
        const percent = Math.min(
          100,
          Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)
        );
        updateFn(Math.round(percent));
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  };

  makeDraggable(startBullet, updateStart);
  makeDraggable(endBullet, updateEnd);

  const resetBtn = document.getElementById("icon-size-reset");
  if (resetBtn) {
    resetBtn.onclick = () => {
      updateStart(10);
      updateEnd(30);
    };
  }

  updateStart(10);
  updateEnd(30);
}
