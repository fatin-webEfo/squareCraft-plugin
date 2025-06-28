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

    const updateField =
      (bullet, fill, countEl, cssVar, position = "left") =>
      (val) => {
        val = Math.min(100, Math.max(0, val));
        countEl.textContent = `${val}%`;

        if (position === "left") {
          gsap.set(bullet, { left: `${val}%` });
          gsap.set(fill, { width: `${val}%`, left: "0" });
        } else {
          gsap.set(bullet, { left: `${val}%` }); // For bullet positioning from left side
          gsap.set(fill, {
            left: "0",
            right: "auto",
            transform: `scaleX(${(100 - val) / 100})`,
            transformOrigin: "right",
            width: "100%",
            backgroundColor: "#F6B67B",
          });
        }

        const el = getSelectedElement?.();
        if (el) {
          const button = el.querySelector(
            "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
              "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
          );
          if (button) {
            gsap.set(button, { [cssVar]: `${val}%` });
          }
        }
      };

    const makeDraggable = (bullet, updateFn, type = "normal") => {
      bullet.onmousedown = (e) => {
        e.preventDefault();

        document.onmousemove = (event) => {
          const rect = bullet.parentElement.getBoundingClientRect();
          let percent = ((event.clientX - rect.left) / rect.width) * 100;
          percent = Math.min(100, Math.max(0, percent));

          const startPos = parseFloat(startBullet.style.left || "0");
          const endPos = parseFloat(endBullet.style.left || "100");

          if (type === "start" && percent >= endPos - 4) {
            percent = endPos - 4;
          }
          if (type === "end" && percent <= startPos + 4) {
            percent = startPos + 4;
          }

          updateFn(Math.round(percent));
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    };
  
      

  const updateStart = updateField(
    startBullet,
    startFill,
    startValue,
    "--sc-scroll-start",
    "left"
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-scroll-end",
    "right"
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-scroll-entry",
    "left"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-scroll-center",
    "left"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-scroll-exit",
    "left"
  );
  const updateSpeed = updateField(
    speedBullet,
    speedFill,
    speedCount,
    "--sc-scroll-speed",
    "left"
  );

  makeDraggable(startBullet, updateStart, "start");
  makeDraggable(endBullet, updateEnd, "end");
  makeDraggable(entryBullet, updateEntry);
  makeDraggable(centerBullet, updateCenter);
  makeDraggable(exitBullet, updateExit);
  makeDraggable(speedBullet, updateSpeed);
  

  const resetBtn = document.getElementById("icon-size-reset");
  if (resetBtn) {
    resetBtn.onclick = () => {
      [
        ["--sc-scroll-start", startBullet, startFill, startValue, 10, "left"],
        ["--sc-scroll-end", endBullet, endFill, endValue, 30, "right"],
        ["--sc-scroll-entry", entryBullet, entryFill, entryCount, 0, "left"],
        [
          "--sc-scroll-center",
          centerBullet,
          centerFill,
          centerCount,
          0,
          "left",
        ],
        ["--sc-scroll-exit", exitBullet, exitFill, exitCount, 0, "left"],
        ["--sc-scroll-speed", speedBullet, speedFill, speedCount, 0, "left"],
      ].forEach(([cssVar, bullet, fill, countEl, val, position]) => {
        const updater = updateField(bullet, fill, countEl, cssVar, position);
        updater(val);
      });
    };
  }
}
