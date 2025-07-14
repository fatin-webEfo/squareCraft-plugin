function attachAdvanceTimelineIncrementDecrement(
  updateEntry,
  updateCenter,
  updateExit
) {
  function setup(idIncrease, idDecrease, getCurrent, updateFn) {
    const btnInc = document.getElementById(idIncrease);
    const btnDec = document.getElementById(idDecrease);

    if (btnInc) {
      btnInc.onclick = () => {
        const val = getCurrent();
        updateFn(val + 1);
      };
    }

    if (btnDec) {
      btnDec.onclick = () => {
        const val = getCurrent();
        updateFn(val - 1);
      };
    }
  }

  const getEntry = () => {
    const text =
      document.getElementById("Typo-vertical-advance-entry-count")
        ?.textContent || "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getCenter = () => {
    const text =
      document.getElementById("Typo-vertical-advance-center-count")
        ?.textContent || "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  const getExit = () => {
    const text =
      document.getElementById("Typo-vertical-advance-exit-count")
        ?.textContent || "0%";
    return parseInt(text.replace("%", "")) || 0;
  };

  setup(
    "Typo-vertical-advance-entry-increase",
    "Typo-vertical-advance-entry-decrease",
    getEntry,
    updateEntry
  );
  setup(
    "Typo-vertical-advance-center-increase",
    "Typo-vertical-advance-center-decrease",
    getCenter,
    updateCenter
  );
  setup(
    "Typo-vertical-advance-exit-increase",
    "Typo-vertical-advance-exit-decrease",
    getExit,
    updateExit
  );
}

function attachCustomTimelineReset(
  updateStart,
  updateEnd,
  updateEntry,
  updateCenter,
  updateExit
) {
  const resetBtn = document.getElementById("Typo-vertical-custom-timeline-reset");
  if (resetBtn) {
    resetBtn.onclick = () => {
      updateStart(0);
      updateEnd(100);
      updateEntry(0);
      updateCenter(0);
      updateExit(0);
    };
  }
}

function initEffectAnimationDropdownToggle() {
 const arrow = document.getElementById("vertical-custom-timeline-arrow");
 if (arrow && startBullet && endBullet) {
   const arrowBox = arrow.getBoundingClientRect();
   const startBox = startBullet.getBoundingClientRect();
   const endBox = endBullet.getBoundingClientRect();

   const arrowCenter = arrowBox.left + arrowBox.width / 2;
   const startCenter = startBox.left + startBox.width / 2;
   const endCenter = endBox.left + endBox.width / 2;

   const distFromStart = Math.abs(arrowCenter - startCenter);
   const distFromEnd = Math.abs(arrowCenter - endCenter);

   if (distFromStart <= 4) {
     gsap.to(arrow, { backgroundColor: "rgb(239, 124, 47)", duration: 0.3 });
   } else if (distFromEnd <= 4) {
     gsap.to(arrow, { backgroundColor: "rgb(246, 182, 123)", duration: 0.3 });
   } else {
     gsap.to(arrow, { backgroundColor: "#FFFFFF", duration: 0.3 });
   }
 }

}


export function initTypoAdvanceStyles(getSelectedElement) {
  const startBullet = document.getElementById("Typo-vertical-timeline-start-bullet");
  const endBullet = document.getElementById("Typo-vertical-timeline-end-bullet");
  const startFill = document.getElementById("Typo-vertical-timeline-start-fill");
  const endFill = document.getElementById("Typo-vertical-timeline-end-fill");
  const startValue = document.getElementById("Typo-vertical-timelineStartValue");
  const endValue = document.getElementById("Typo-vertical-timelineEndValue");

  const entryBullet = document.getElementById(
    "Typo-vertical-advance-entry-bullet"
  );
  const entryFill = document.getElementById(
    "Typo-vertical-advance-entry-fill"
  );
  const entryCount = document.getElementById(
    "Typo-vertical-advance-entry-count"
  );

  const centerBullet = document.getElementById(
    "Typo-vertical-advance-center-bullet"
  );
  const centerFill = document.getElementById(
    "Typo-vertical-advance-center-fill"
  );
  const centerCount = document.getElementById(
    "Typo-vertical-advance-center-count"
  );

  const exitBullet = document.getElementById(
    "Typo-vertical-advance-exit-bullet"
  );
  const exitFill = document.getElementById("Typo-vertical-advance-exit-fill");
  const exitCount = document.getElementById(
    "Typo-vertical-advance-exit-count"
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
    !exitCount
  )
    return;

  const updateField =
    (bullet, fill, countEl, cssVar, position = "left", min = -100, max = 100) =>
    (val) => {
      val = Math.max(min, Math.min(max, val));
      countEl.textContent = `${val}%`;

      const el = getSelectedElement?.();
      const styleId = el?.id
        ? `sc-style-${el.id}-${cssVar.replace(/[^a-z0-9]/gi, "")}`
        : null;

      if (
        [
          "--sc-Typo-vertical-scroll-entry",
          "--sc-Typo-vertical-scroll-center",
          "--sc-Typo-vertical-scroll-exit",
        ].includes(cssVar)
      ) {
        const percent = (val + 100) / 2;
        const bulletLeft = percent;
        const fillLeft = val < 0 ? percent : 50;
        const fillWidth = Math.abs(val / 2);

        gsap.set(bullet, { left: `${bulletLeft}%`, xPercent: -50 });
        if (cssVar === "--sc-Typo-vertical-scroll-entry") {
          document.getElementById(
            "Typo-vertical-custom-timeline-arrow"
          ).style.left = `${bulletLeft}%`;
        }

        gsap.set(fill, {
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          backgroundColor: "var(--sc-Typo-theme-accent)",
        });

        // ✅ Fixed Arrow Color Syncing
      const arrow = document.getElementById("vertical-custom-timeline-arrow");
      if (arrow && startBullet && endBullet) {
        const arrowPercent = parseFloat(arrow.style.left || "0");
        const startPercent = parseFloat(startBullet.style.left || "0");
        const endPercent = parseFloat(endBullet.style.left || "100");

        if (arrowPercent <= startPercent + 0.5) {
          gsap.to(arrow, {
            backgroundColor: "rgb(239, 124, 47)",
            duration: 0.3,
          });
        } else if (arrowPercent >= endPercent - 0.5) {
          gsap.to(arrow, {
            backgroundColor: "rgb(246, 182, 123)",
            duration: 0.3,
          });
        } else {
          gsap.to(arrow, {
            backgroundColor: "#FFFFFF",
            duration: 0.3,
          });
        }
      }

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

      if (el && el.id?.startsWith("block-")) {
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }

        const nextEl = el.nextElementSibling;
        if (nextEl && nextEl.tagName === "DIV") {
          const cssRule = `#${el.id} + div {\n  ${cssVar}: ${val}%;\n}`;
          styleTag.textContent = cssRule;
        }
      }
    };



 const makeDraggable = (
   bullet,
   updateFn,
   type = "normal",
   min = -100,
   max = 100
 ) => {
  bullet.onmousedown = (e) => {
    e.preventDefault();
    const container = bullet.parentElement;
    const rect = container.getBoundingClientRect();

    const bulletRect = bullet.getBoundingClientRect();
    const initialOffset = bulletRect.left + bulletRect.width / 2;

    const onMouseMove = (event) => {
      const clientX = Math.max(rect.left, Math.min(rect.right, event.clientX));
      const percent = ((clientX - rect.left) / rect.width) * (max - min) + min;
      const clamped = Math.round(Math.max(min, Math.min(max, percent)));
      updateFn(clamped); // live update
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  };

 };


  const updateStart = updateField(
    startBullet,
    startFill,
    startValue,
    "--sc-Typo-vertical-scroll-start",
    "left",
    0,
    100
  );
  const updateEnd = updateField(
    endBullet,
    endFill,
    endValue,
    "--sc-Typo-vertical-scroll-end",
    "right",
    0,
    100
  );
  const updateEntry = updateField(
    entryBullet,
    entryFill,
    entryCount,
    "--sc-Typo-vertical-scroll-entry"
  );
  const updateCenter = updateField(
    centerBullet,
    centerFill,
    centerCount,
    "--sc-Typo-vertical-scroll-center"
  );
  const updateExit = updateField(
    exitBullet,
    exitFill,
    exitCount,
    "--sc-Typo-vertical-scroll-exit"
  );

  const getCurrentPercentage = (cssVar) => {
    const el = getSelectedElement?.();
    if (!el) return 0;
 const btn = getSelectedElement()?.querySelector(".sqs-block-content");


    if (!btn) return 0;
    const val = getComputedStyle(btn).getPropertyValue(cssVar).trim();
    return parseFloat(val.replace("%", "")) || 0;
  };

  updateEntry(getCurrentPercentage("--sc-Typo-vertical-scroll-entry"));
  updateCenter(getCurrentPercentage("--sc-Typo-vertical-scroll-center"));
  updateExit(getCurrentPercentage("--sc-Typo-vertical-scroll-exit"));

  makeDraggable(startBullet, updateStart, "start", 0, 100);
  makeDraggable(endBullet, updateEnd, "end", 0, 100);
  makeDraggable(entryBullet, updateEntry, "normal");
  makeDraggable(centerBullet, updateCenter, "normal");
  makeDraggable(exitBullet, updateExit, "normal");

  [
    {
      id: "Typo-vertical-advance-entry-reset",
      bullet: entryBullet,
      fill: entryFill,
      count: entryCount,
      css: "--sc-Typo-vertical-scroll-entry",
    },
    {
      id: "Typo-vertical-advance-center-reset",
      bullet: centerBullet,
      fill: centerFill,
      count: centerCount,
      css: "--sc-Typo-vertical-scroll-center",
    },
    {
      id: "Typo-vertical-advance-exit-reset",
      bullet: exitBullet,
      fill: exitFill,
      count: exitCount,
      css: "--sc-Typo-vertical-scroll-exit",
    },
  ].forEach(({ id, bullet, fill, count, css }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        updateField(bullet, fill, count, css)(0);
      };
    }
  });
  attachAdvanceTimelineIncrementDecrement(
    updateEntry,
    updateCenter,
    updateExit
  );
  attachCustomTimelineReset(
    updateStart,
    updateEnd,
    updateEntry,
    updateCenter,
    updateExit
  );
  initEffectAnimationDropdownToggle();
}
