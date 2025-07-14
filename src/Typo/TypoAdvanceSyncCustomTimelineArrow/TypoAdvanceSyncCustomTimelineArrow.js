export function TypoAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;
  console.log(
    "selectedElement from TypoAdvanceSyncCustomTimelineArrow",
    selectedElement
  ); // Add this for testing

  let isTracking = false;
  let lastY = null;
  const transition = { ease: "power2.out" };

  function waitForElements(callback, retries = 20) {
    const arrow = document.getElementById(
      "Typo-vertical-custom-timeline-arrow"
    );
    const border = document.getElementById(
      "Typo-vertical-custom-timeline-border"
    );
    
    const startBullet = document.getElementById(
      "Typo-vertical-timeline-start-bullet"
    );
    const endBullet = document.getElementById(
      "Typo-vertical-timeline-end-bullet"
    );
    const dropdown = document.getElementById(
      "Typo-vertical-effect-animation-type-list"
    );

    if (arrow && border && startBullet && endBullet && dropdown) {
      callback(arrow, border, startBullet, endBullet, dropdown);
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

   const getVHFromCSSVar = (cssVar) => {
     const value = getComputedStyle(btn).getPropertyValue(cssVar).trim();
     return value.endsWith("%")
       ? (parseFloat(value) / 100) * 100
       : parseFloat(value) || 0;
   };

   const entryY = getVHFromCSSVar("--sc-Typo-vertical-scroll-entry");
   const centerY = getVHFromCSSVar("--sc-Typo-vertical-scroll-center");
   const exitY = getVHFromCSSVar("--sc-Typo-vertical-scroll-exit");

   // Calculate real X positions
   const arrowBox = arrow.getBoundingClientRect();
   const startBox = startBullet.getBoundingClientRect();
   const endBox = endBullet.getBoundingClientRect();

   const arrowCenter = arrowBox.left + arrowBox.width / 2;
   const startCenter = startBox.left + startBox.width / 2;
   const endCenter = endBox.left + endBox.width / 2;
   const centerCenter = (startCenter + endCenter) / 2;

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
     } else if (arrowCenter > centerCenter + 1 && arrowCenter < endCenter - 1) {
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
       transform: `translateY(${finalY.toFixed(2)}vh)`,
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


  waitForElements((arrow, border, startBullet, endBullet, dropdown) => {
    const arrowTrigger = document.getElementById(
      "Typo-vertical-effect-animation-type-arrow"
    );

    if (arrowTrigger && dropdown) {
      arrowTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("sc-hidden");
      });

      document.addEventListener("click", (e) => {
        if (
          !arrowTrigger.contains(e.target) &&
          !dropdown.contains(e.target) &&
          !dropdown.classList.contains("sc-hidden")
        ) {
          dropdown.classList.add("sc-hidden");
        }
      });

      dropdown.querySelectorAll("[data-value]").forEach((item) => {
        item.addEventListener("click", () => {
          const selectedEffect = item.getAttribute("data-value");
          const display = dropdown.previousElementSibling;
          if (display?.querySelector("p")) {
            display.querySelector("p").textContent = selectedEffect;
          }
          transition.ease = selectedEffect || "power2.out";
          dropdown.classList.add("sc-hidden");
        });
      });
    }

    trackLoop(arrow, border, startBullet, endBullet, dropdown);
  });
}
