export function initButtonAdvanceStyles(getSelectedElement) {
  const entryBullet = document.getElementById("button-advance-entry-bullet");
  const entryFill = document.getElementById("button-advance-entry-Fill");
  const entryCount = document.getElementById("button-advance-entry-count");

  const centerBullet = document.getElementById("button-advance-center-bullet");
  const centerFill = document.getElementById("button-advance-center-Fill");
  const centerCount = document.getElementById("button-advance-center-Count");

  const exitBullet = document.getElementById("button-advance-exit-bullet");
  const exitFill = document.getElementById("button-advance-exit-Fill");
  const exitCount = document.getElementById("button-advance-exit-Count");

  if (
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

  const updateField = (bullet, fill, countEl, cssVar) => (val) => {
    val = Math.max(-100, Math.min(100, val));
    countEl.textContent = `${val}%`;

    const percent = (val + 100) / 2;
    const bulletLeft = percent;
    const fillLeft = val < 0 ? percent : 50;
    const fillWidth = Math.abs(val / 2);

    gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
    gsap.set(fill, {
      left: `${fillLeft}%`,
      width: `${fillWidth}%`,
      backgroundColor: "var(--sc-theme-accent)",
    });

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

  const makeDraggable = (bullet, updateFn) => {
    bullet.onmousedown = (e) => {
      e.preventDefault();
      const container = bullet.parentElement;
      const rect = container.getBoundingClientRect();

      const onMove = (event) => {
        const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
        const percent = (x / rect.width) * 200 - 100; // Map 0..width → -100..100
        updateFn(Math.round(percent));
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", onMove);
        },
        { once: true }
      );
    };
  };

  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-scroll-exit"
  );

  makeDraggable(entryBullet, updateEntry);
  makeDraggable(centerBullet, updateCenter);
  makeDraggable(exitBullet, updateExit);

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
        updateField(bullet, fill, count, css)(0);
      };
    }
  });
}
