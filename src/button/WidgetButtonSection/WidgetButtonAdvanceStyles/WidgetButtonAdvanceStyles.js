export function initButtonAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById("timeline-start-bullet");
  const endBullet = document.getElementById("timeline-end-bullet");
  const startFill = document.getElementById("timeline-start-fill");
  const endFill = document.getElementById("timeline-end-fill");
  const startValue = document.getElementById("timelineStartValue");
  const endValue = document.getElementById("timelineEndValue");

  const entryBullet = document.getElementById("button-advance-entry-bullet");
  const entryFill = document.getElementById("button-advance-entry-Fill");
  const entryCount = document.getElementById("button-advance-entry-count");

  const centerBullet = document.getElementById(
    "button-advance-center-bullet"
  );
  const centerFill = document.getElementById(
    "button-advance-center-Fill"
  );
  const centerCount = document.getElementById(
    "button-advance-center-Count"
  );

  const exitBullet = document.getElementById(
    "button-advance-exit-bullet"
  );
  const exitFill = document.getElementById("button-advance-exit-Fill");
  const exitCount = document.getElementById("button-advance-exit-Count");



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
    !exitCount 
  )
    return;

    const updateField =
      (bullet, fill, countEl, cssVar, position = "left", min = 0, max = 100) =>
      (val) => {
        val = Math.min(max, Math.max(min, val));
        countEl.textContent = `${val}%`;

        if (
          [
            "--sc-scroll-entry",
            "--sc-scroll-center",
            "--sc-scroll-exit",
          ].includes(cssVar)
        ) {
          const center = 50;
          const clamped = Math.max(-100, Math.min(100, val));
          const fillWidth = Math.abs(clamped);
          const fillLeft = 50 + Math.min(0, clamped); 
          const bulletLeft = 50 + clamped;


          gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
          gsap.set(fill, {
            left: `${fillLeft}%`,
            width: `${fillWidth}%`,
            backgroundColor: "var(--sc-theme-accent)", // or any theme color
          });
        } else if (position === "left") {
          gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
          gsap.set(fill, { width: `${val}%`, left: "0" });
        } else {
          gsap.set(bullet, { left: `${val}%`, xPercent: -50 });
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

      const makeDraggable = (
        bullet,
        updateFn,
        type = "normal",
        min = 0,
        max = 100
      ) => {
        bullet.onmousedown = (e) => {
          e.preventDefault();

          const fieldId = bullet.id.replace("-bullet", "-Field"); // smart way
          const container = document.getElementById(fieldId);

          document.onmousemove = (event) => {
            const rect = container.getBoundingClientRect();
            let clientX = event.clientX;

            if (clientX < rect.left) clientX = rect.left;
            if (clientX > rect.right) clientX = rect.right;

            const rawPercent = (clientX - rect.left) / rect.width;
            const actualVal = Math.round(min + rawPercent * (max - min));

            const startPos = parseFloat(startBullet.style.left || "0");
            const endPos = parseFloat(endBullet.style.left || "100");

            if (type === "start" && actualVal >= endPos - 4) {
              updateFn(endPos - 4);
            } else if (type === "end" && actualVal <= startPos + 4) {
              updateFn(startPos + 4);
            } else {
              updateFn(actualVal);
            }
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
    "left",
    -100,
    100
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-scroll-center",
    "left",
    -100,
    100
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-scroll-exit",
    "left",
    -100,
    100
  );
  


  makeDraggable(startBullet, updateStart, "start");
  makeDraggable(endBullet, updateEnd, "end");
  makeDraggable(entryBullet, updateEntry, "normal", -100, 100);
  makeDraggable(centerBullet, updateCenter, "normal", -100, 100);
  makeDraggable(exitBullet, updateExit, "normal", -100, 100);
  
  

  [
    {
      id: "button-advance-entry-reset",
      bullet: entryBullet,
      fill: entryFill,
      count: entryCount,
      css: "--sc-scroll-entry",
    },
    {
      id: "button-advance-center-reset",
      bullet: centerBullet,
      fill: centerFill,
      count: centerCount,
      css: "--sc-scroll-center",
    },
    {
      id: "button-advance-exit-reset",
      bullet: exitBullet,
      fill: exitFill,
      count: exitCount,
      css: "--sc-scroll-exit",
    },
  ].forEach(({ id, bullet, fill, count, css }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        updateField(bullet, fill, count, css, "left", -100, 100)(0);
      };
    }
  });
}
