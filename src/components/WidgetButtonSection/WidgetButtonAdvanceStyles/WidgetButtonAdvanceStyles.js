// initButtonAdvanceStyles.js with GSAP integration

export function initButtonAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById("timeline-start-bullet");
  const endBullet = document.getElementById("timeline-end-bullet");
  const startFill = document.getElementById("timeline-start-fill");
  const endFill = document.getElementById("timeline-end-fill");
  const startValue = document.getElementById("timelineStartValue");
  const endValue = document.getElementById("timelineEndValue");

  const entryBullet = document.getElementById("button-advance-entry-Bullet");
  const entryFill = document.getElementById("button-advance-entry-Fill");
  const entryCount = document.getElementById("button-advance-entry-count");

  const centerBullet = document.getElementById(
    "button-advance-center-radiusBullet"
  );
  const centerFill = document.getElementById(
    "button-advance-center-radiusFill"
  );
  const centerCount = document.getElementById(
    "button-advance-center-radiusCount"
  );

  const exitBullet = document.getElementById(
    "button-advance-exit-radiusBullet"
  );
  const exitFill = document.getElementById("button-advance-exit-radiusFill");
  const exitCount = document.getElementById("button-advance-exit-radiusCount");

  const speedBullet = document.getElementById(
    "button-advance-effectSpeed-radiusBullet"
  );
  const speedFill = document.getElementById(
    "button-advance-effectSpeed-radiusFill"
  );
  const speedCount = document.getElementById(
    "button-advance-effectSpeed-radiusCount"
  );

  if (
    !startBullet ||
    !endBullet ||
    !startFill ||
    !endFill ||
    !startValue ||
    !endValue ||
    !entryBullet ||
    !entryFill ||
    !entryCount ||
    !centerBullet ||
    !centerFill ||
    !centerCount ||
    !exitBullet ||
    !exitFill ||
    !exitCount ||
    !speedBullet ||
    !speedFill ||
    !speedCount
  )
    return;

  const styleState = {
    start: 10,
    end: 30,
    entry: 0,
    center: 0,
    exit: 0,
    speed: 0,
  };

  const updateField =
    (bullet, fill, countEl, cssVar, key, position = "left") =>
    (val) => {
      styleState[key] = val;
      const isLeft = position === "left";
      if (isLeft) {
        gsap.set(bullet, { left: `${val}%` });
        gsap.set(fill, { width: `${val}%` });
      } else {
        gsap.set(bullet, { right: `${100 - val}%` });
        gsap.set(fill, { width: `${val}%` });
      }
      countEl.textContent = `${val}${
        countEl.id.includes("Value") ? "%" : "px"
      }`;
      const el = getSelectedElement?.();
      if (el) {
        const button = el.querySelector(
          "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, " +
            "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
        );
        if (button) {
          button.style.setProperty(
            cssVar,
            `${val}${cssVar.includes("scroll") ? "%" : "px"}`,
            "important"
          );
        }
      }
    };

  const updateStart = updateField(
    startBullet,
    startFill,
    startValue,
    "--sc-scroll-start",
    "start",
    "left"
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-scroll-end",
    "end",
    "right"
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-scroll-entry",
    "entry",
    "left"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-scroll-center",
    "center",
    "left"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-scroll-exit",
    "exit",
    "left"
  );
  const updateSpeed = updateField(
    speedBullet,
    speedFill,
    speedCount,
    "--sc-scroll-speed",
    "speed",
    "left"
  );

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
  makeDraggable(entryBullet, updateEntry);
  makeDraggable(centerBullet, updateCenter);
  makeDraggable(exitBullet, updateExit);
  makeDraggable(speedBullet, updateSpeed);

  const resetBtn = document.getElementById("icon-size-reset");
  if (resetBtn) {
    resetBtn.onclick = () => {
      updateStart(10);
      updateEnd(30);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
      updateSpeed(0);
    };
  }

  updateStart(styleState.start);
  updateEnd(styleState.end);
  updateEntry(styleState.entry);
  updateCenter(styleState.center);
  updateExit(styleState.exit);
  updateSpeed(styleState.speed);
}
