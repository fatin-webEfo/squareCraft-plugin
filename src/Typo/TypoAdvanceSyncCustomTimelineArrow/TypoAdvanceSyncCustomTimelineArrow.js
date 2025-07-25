 export function TypoAdvanceSyncCustomTimelineArrow(selectedElement) {
    if (!selectedElement) return;

    let isTracking = false;
    let lastY = null;
    const transition = { ease: "power2.out" };

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
        callback(arrow, startBullet, endBullet);
      } else if (retries > 0) {
        setTimeout(() => waitForElements(callback, retries - 1), 100);
      }
    }

   function updateArrowPosition(arrow, startBullet, endBullet) {
     const rect = selectedElement.getBoundingClientRect();
     const viewportHeight = window.innerHeight;
     const top = rect.top;
     const percentFromTop = top / viewportHeight;
     const scrollBasedLeft = Math.max(
       0,
       Math.min(100, 100 - 100 * percentFromTop)
     );

     arrow.style.left = `${scrollBasedLeft}%`;
     arrow.style.transform = "translateX(-50%)";

     const btn = selectedElement.querySelector(".sqs-block-content");
     if (!btn) return;

     const getVarPercent = (v) => {
       const val = getComputedStyle(btn).getPropertyValue(v).trim();
       return val.endsWith("%") ? parseFloat(val) : parseFloat(val) || 0;
     };

     const getVarVH = (v) => {
       const val = getComputedStyle(btn).getPropertyValue(v).trim();
       return val.endsWith("%") ? parseFloat(val) : parseFloat(val) || 0;
     };

     const entryY = getVarVH("--sc-Typo-vertical-scroll-entry") / 2;
     const centerY = getVarVH("--sc-Typo-vertical-scroll-center") / 2;
     const exitY = getVarVH("--sc-Typo-vertical-scroll-exit") / 2;

     const startPercent = getVarPercent("--sc-Typo-vertical-scroll-start");
     const endPercent = getVarPercent("--sc-Typo-vertical-scroll-end");

     const arrowCenter =
       arrow.getBoundingClientRect().left + arrow.offsetWidth / 2;
     const startCenter =
       startBullet.getBoundingClientRect().left + startBullet.offsetWidth / 2;
     const endCenter =
       endBullet.getBoundingClientRect().left + endBullet.offsetWidth / 2;

     let activeY;
     let arrowColor;

    window.__typoActiveZone = "entry"; // fallback if undefined

    if (arrowCenter <= startCenter + 1) {
      arrowColor = "#EF7C2F";
      arrow.style.backgroundColor = arrowColor;
      activeY = entryY;
      window.__typoActiveZone = "entry";
    } else if (arrowCenter >= endCenter - 1) {
      arrowColor = "#F6B67B";
      arrow.style.backgroundColor = arrowColor;
      activeY = exitY;
      window.__typoActiveZone = "exit";
    } else {
      arrowColor = "#FFFFFF";
      arrow.style.backgroundColor = arrowColor;
      activeY = centerY;
      window.__typoActiveZone = "center";
    }


    if (lastY !== activeY) {
      gsap.to(btn, {
        duration: 0.3,
        ease: transition.ease,
        transform: `translateY(${activeY.toFixed(2)}vh)`,
      });
      lastY = activeY;
    }

   }


    function trackLoop(arrow, startBullet, endBullet) {
      if (isTracking) return;
      isTracking = true;
      function loop() {
        updateArrowPosition(arrow, startBullet, endBullet);
        requestAnimationFrame(loop);
      }
      loop();
    }

    waitForElements((arrow, startBullet, endBullet) => {
      arrow.style.backgroundColor = "#FFFFFF";
      trackLoop(arrow, startBullet, endBullet);
    });
 }

export function TypoHorizontalAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

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
      callback(arrow, startBullet, endBullet);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

 function updateArrowPosition(arrow, startBullet, endBullet) {
   const rect = selectedElement.getBoundingClientRect();
   const viewportHeight = window.innerHeight;
   const top = rect.top;
   const percentFromTop = top / viewportHeight;
   const scrollBasedLeft = Math.max(
     0,
     Math.min(100, 100 - 100 * percentFromTop)
   );

   arrow.style.left = `${scrollBasedLeft}%`;
   arrow.style.transform = "translateX(-50%)";

   const btn = selectedElement.querySelector(".sqs-block-content");
   if (!btn) return;

   const getVarPercent = (v) => {
     const val = getComputedStyle(btn).getPropertyValue(v).trim();
     return val.endsWith("%") ? parseFloat(val) : parseFloat(val) || 0;
   };

   const getVarVH = (v) => {
     const val = getComputedStyle(btn).getPropertyValue(v).trim();
     return val.endsWith("%") ? parseFloat(val) : parseFloat(val) || 0;
   };

   const entryY = getVarVH("--sc-Typo-vertical-scroll-entry") / 2;
   const centerY = getVarVH("--sc-Typo-vertical-scroll-center") / 2;
   const exitY = getVarVH("--sc-Typo-vertical-scroll-exit") / 2;

   const startPercent = getVarPercent("--sc-Typo-vertical-scroll-start");
   const endPercent = getVarPercent("--sc-Typo-vertical-scroll-end");

   const arrowCenter =
     arrow.getBoundingClientRect().left + arrow.offsetWidth / 2;
   const startCenter =
     startBullet.getBoundingClientRect().left + startBullet.offsetWidth / 2;
   const endCenter =
     endBullet.getBoundingClientRect().left + endBullet.offsetWidth / 2;

    let activeY;
    let arrowColor;

    if (arrowCenter <= startCenter + 1) {
      arrowColor = "#EF7C2F";
      arrow.style.backgroundColor = arrowColor;
      activeY = entryY;
    } else if (arrowCenter >= endCenter - 1) {
      arrowColor = "#F6B67B";
      arrow.style.backgroundColor = arrowColor;
      activeY = exitY;
    } else {
      arrowColor = "#FFFFFF";
      arrow.style.backgroundColor = arrowColor;
      activeY = centerY;
    }

   if (lastY !== activeY) {
     gsap.to(btn, {
       duration: 0.3,
       ease: transition.ease,
       transform: `translateY(${activeY.toFixed(2)}vh)`,
     });
     lastY = activeY;
   }
 }


  function trackLoop(arrow, startBullet, endBullet) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, startBullet, endBullet);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, startBullet, endBullet) => {
    trackLoop(arrow, startBullet, endBullet);
  });
}

export function TypoOpacityAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("Typo-opacity-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "Typo-opacity-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "Typo-opacity-timeline-end-bullet"
    );

    if (arrow && startBullet && endBullet) {
      arrow.style.left = "0%";
      arrow.style.transform = "translateX(-50%)";
      callback(arrow, startBullet, endBullet);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(arrow, startBullet, endBullet) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;
    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );

    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    const startBox = startBullet.getBoundingClientRect();
    const endBox = endBullet.getBoundingClientRect();
    const arrowBox = arrow.getBoundingClientRect();

    const arrowCenter = arrowBox.left + arrowBox.width / 2;
    const startCenter = startBox.left + startBox.width / 2;
    const endCenter = endBox.left + endBox.width / 2;
    const centerCenter = (startCenter + endCenter) / 2;

    const btn = selectedElement.querySelector(".sqs-block-content");
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%") ? parseFloat(value) : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-Typo-opacity-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-Typo-opacity-scroll-center");
    const exitY = getVHFromCSSVar("--sc-Typo-opacity-scroll-exit");

    let y = 0;
    let apply = false;

    if (arrowCenter <= startCenter + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (arrowCenter - startCenter + 1) / 2)
        );
        y = entryY * progress;
        apply = true;
      }
    } else if (arrowCenter >= endCenter - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (endCenter - arrowCenter + 1) / 2)
        );
        y = exitY * (1 - progress);
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (arrowCenter > startCenter + 1 && arrowCenter < centerCenter - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (arrowCenter - startCenter) / (centerCenter - startCenter);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        arrowCenter > centerCenter + 1 &&
        arrowCenter < endCenter - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (arrowCenter - centerCenter) / (endCenter - centerCenter);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      gsap.to(btn, {
        duration: 0.3,
        ease: transition.ease,
        opacity: Math.max(0, Math.min(1, finalY / 100)),
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, startBullet, endBullet) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, startBullet, endBullet);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, startBullet, endBullet) => {
    trackLoop(arrow, startBullet, endBullet);
  });
}

export function TypoScaleAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("Typo-scale-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "Typo-scale-timeline-start-bullet"
    );
    const endBullet = document.getElementById("Typo-scale-timeline-end-bullet");

    if (arrow && startBullet && endBullet) {
      callback(arrow, startBullet, endBullet);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(arrow, startBullet, endBullet) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;
    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );

    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    const startBox = startBullet.getBoundingClientRect();
    const endBox = endBullet.getBoundingClientRect();
    const arrowBox = arrow.getBoundingClientRect();

    const arrowCenter = arrowBox.left + arrowBox.width / 2;
    const startCenter = startBox.left + startBox.width / 2;
    const endCenter = endBox.left + endBox.width / 2;
    const centerCenter = (startCenter + endCenter) / 2;

    const btn = selectedElement.querySelector(".sqs-block-content");
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%") ? parseFloat(value) : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-Typo-scale-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-Typo-scale-scroll-center");
    const exitY = getVHFromCSSVar("--sc-Typo-scale-scroll-exit");

    let y = 0;
    let apply = false;

    if (arrowCenter <= startCenter + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (arrowCenter - startCenter + 1) / 2)
        );
        y = entryY * progress;
        apply = true;
      }
    } else if (arrowCenter >= endCenter - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (endCenter - arrowCenter + 1) / 2)
        );
        y = exitY * (1 - progress);
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (arrowCenter > startCenter + 1 && arrowCenter < centerCenter - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (arrowCenter - startCenter) / (centerCenter - startCenter);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        arrowCenter > centerCenter + 1 &&
        arrowCenter < endCenter - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (arrowCenter - centerCenter) / (endCenter - centerCenter);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      gsap.to(btn, {
        duration: 0.3,
        ease: transition.ease,
        scale: Math.max(0.01, 1 + finalY / 100),
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, startBullet, endBullet) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, startBullet, endBullet);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, startBullet, endBullet) => {
    trackLoop(arrow, startBullet, endBullet);
  });
}

export function TypoRotateAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById("Typo-rotate-custom-timeline-arrow");
    const startBullet = document.getElementById(
      "Typo-rotate-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "Typo-rotate-timeline-end-bullet"
    );

    if (arrow && startBullet && endBullet) {
      callback(arrow, startBullet, endBullet);
    } else if (retries > 0) {
      setTimeout(() => waitForElements(callback, retries - 1), 100);
    }
  }

  function updateArrowPosition(arrow, startBullet, endBullet) {
    const rect = selectedElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const top = rect.top;
    const percentFromTop = top / viewportHeight;
    const scrollBasedLeft = Math.max(
      0,
      Math.min(100, 100 - 100 * percentFromTop)
    );

    arrow.style.left = `${scrollBasedLeft}%`;
    arrow.style.transform = "translateX(-50%)";

    const startBox = startBullet.getBoundingClientRect();
    const endBox = endBullet.getBoundingClientRect();
    const arrowBox = arrow.getBoundingClientRect();

    const arrowCenter = arrowBox.left + arrowBox.width / 2;
    const startCenter = startBox.left + startBox.width / 2;
    const endCenter = endBox.left + endBox.width / 2;
    const centerCenter = (startCenter + endCenter) / 2;

    const btn = selectedElement.querySelector(".sqs-block-content");
    if (!btn) return;

    const getVHFromCSSVar = (cssVar) => {
      const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
      return value.endsWith("%") ? parseFloat(value) : parseFloat(value) || 0;
    };

    const entryY = getVHFromCSSVar("--sc-Typo-rotate-scroll-entry");
    const centerY = getVHFromCSSVar("--sc-Typo-rotate-scroll-center");
    const exitY = getVHFromCSSVar("--sc-Typo-rotate-scroll-exit");

    let y = 0;
    let apply = false;

    if (arrowCenter <= startCenter + 1) {
      arrow.style.backgroundColor = "#EF7C2F";
      if (entryY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (arrowCenter - startCenter + 1) / 2)
        );
        y = entryY * progress;
        apply = true;
      }
    } else if (arrowCenter >= endCenter - 1) {
      arrow.style.backgroundColor = "#F6B67B";
      if (exitY !== 0) {
        const progress = Math.max(
          0,
          Math.min(1, (endCenter - arrowCenter + 1) / 2)
        );
        y = exitY * (1 - progress);
        apply = true;
      }
    } else {
      arrow.style.backgroundColor = "#FFFFFF";

      if (arrowCenter > startCenter + 1 && arrowCenter < centerCenter - 1) {
        if (entryY !== 0 && centerY !== 0) {
          const progress =
            (arrowCenter - startCenter) / (centerCenter - startCenter);
          y = entryY + (centerY - entryY) * progress;
          apply = true;
        }
      } else if (
        arrowCenter > centerCenter + 1 &&
        arrowCenter < endCenter - 1
      ) {
        if (centerY !== 0 && exitY !== 0) {
          const progress =
            (arrowCenter - centerCenter) / (endCenter - centerCenter);
          y = centerY + (exitY - centerY) * progress;
          apply = true;
        }
      }
    }

    const finalY = apply ? y : 0;

    if (lastY !== finalY) {
      gsap.to(btn, {
        duration: lastY === null ? 0 : 0.3,
        ease: transition.ease,
        rotate: finalY,
      });
      lastY = finalY;
    }
  }

  function trackLoop(arrow, startBullet, endBullet) {
    if (isTracking) return;
    isTracking = true;
    function loop() {
      updateArrowPosition(arrow, startBullet, endBullet);
      requestAnimationFrame(loop);
    }
    loop();
  }

  waitForElements((arrow, startBullet, endBullet) => {
    trackLoop(arrow, startBullet, endBullet);
  });
}
