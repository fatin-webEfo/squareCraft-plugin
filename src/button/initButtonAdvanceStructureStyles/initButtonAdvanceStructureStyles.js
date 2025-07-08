  export function initButtonAdvanceStructureStyles(getSelectedElement) {
    const marginMap = {
      top: "button-structure-margin-top-count",
      bottom: "button-structure-margin-bottom-count",
      left: "button-structure-margin-left-count",
      right: "button-structure-margin-right-count",
    };

    const paddingMap = {
      top: "button-structure-padding-top-count",
      bottom: "button-structure-padding-bottom-count",
      left: "button-structure-padding-left-count",
      right: "button-structure-padding-right-count",
    };

    const updateStyles = () => {
      const block = getSelectedElement();
      if (!block) return;

      const blockId = block.id;
      const buttonSelector = `#${blockId} a`;

      const styleId = `sc-structure-style-${blockId}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }

      const cssParts = [];

      Object.entries(marginMap).forEach(([side, id]) => {
        const el = document.getElementById(id);
        if (el) {
          const value = parseInt(el.textContent.replace("px", "").trim()) || 0;
          cssParts.push(`margin-${side}:${value}px !important`);
        }
      });

      Object.entries(paddingMap).forEach(([side, id]) => {
        const el = document.getElementById(id);
        if (el) {
          const value = parseInt(el.textContent.replace("px", "").trim()) || 0;
          cssParts.push(`padding-${side}:${value}px !important`);
        }
      });

      const cssString = `${buttonSelector} { ${cssParts.join("; ")} }`;
      styleTag.innerHTML = cssString;

      console.log("🔄 Real-time Button Styles Applied:\n", cssString);
    };

    const observer = new MutationObserver(updateStyles);

    Object.values({ ...marginMap, ...paddingMap }).forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el, {
          characterData: true,
          subtree: true,
          childList: true,
        });
      }
    });

    updateStyles();

    function resetMarginStyles() {
      Object.values(marginMap).forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.innerText = "0px";
      });

      const marginFill = document.getElementById(
        "button-advance-margin-gap-fill"
      );
      const marginBullet = document.getElementById(
        "button-advance-margin-gap-bullet"
      );
      if (marginFill) marginFill.style.width = "0%";
      if (marginBullet) marginBullet.style.left = "0%";

      const marginIds = [
        "button-advance-margin-gap-all",
        "button-advance-margin-gap-top",
        "button-advance-margin-gap-bottom",
        "button-advance-margin-gap-left",
        "button-advance-margin-gap-right",
      ];
      marginIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("sc-bg-454545");
      });
      const marginAll = document.getElementById(
        "button-advance-margin-gap-all"
      );
      if (marginAll) marginAll.classList.add("sc-bg-454545");

      const allMarginFills = [
        "button-structure-margin-top-fill",
        "button-structure-margin-bottom-fill",
        "button-structure-margin-left-fill",
        "button-structure-margin-right-fill",
      ];
      allMarginFills.forEach((id) => {
        const fill = document.getElementById(id);
        if (fill) fill.style.display = "block";
      });

      const currentBlockId = getSelectedElement()?.id;
      if (currentBlockId && window.savedCountsPerBlock) {
        Object.keys(window.savedCountsPerBlock[currentBlockId] || {}).forEach(
          (key) => {
            if (key.includes("margin")) {
              window.savedCountsPerBlock[currentBlockId][key] = 0;
            }
          }
        );
      }

      const styleTag = document.getElementById(
        `sc-structure-style-${getSelectedElement()?.id}`
      );
      if (styleTag) styleTag.remove();
    }
    
    function resetPaddingStyles() {
      Object.values(paddingMap).forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.innerText = "0px";
      });

      const paddingFill = document.getElementById(
        "button-advance-padding-gap-fill"
      );
      const paddingBullet = document.getElementById(
        "button-advance-padding-gap-bullet"
      );
      if (paddingFill) paddingFill.style.width = "0%";
      if (paddingBullet) paddingBullet.style.left = "0%";

      const paddingIds = [
        "button-advance-padding-gap-all",
        "button-advance-padding-gap-top",
        "button-advance-padding-gap-bottom",
        "button-advance-padding-gap-left",
        "button-advance-padding-gap-right",
      ];
      paddingIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("sc-bg-454545");
      });
      const paddingAll = document.getElementById(
        "button-advance-padding-gap-all"
      );
      if (paddingAll) paddingAll.classList.add("sc-bg-454545");

      const allPaddingFills = [
        "button-structure-padding-top",
        "button-structure-padding-bottom",
        "button-structure-padding-left",
        "button-structure-padding-right",
      ];
      allPaddingFills.forEach((id) => {
        const fill = document.getElementById(id);
        if (fill) fill.style.display = "block";
      });

      const currentBlockId = getSelectedElement()?.id;
      if (currentBlockId && window.savedCountsPerBlock) {
        Object.keys(window.savedCountsPerBlock[currentBlockId] || {}).forEach(
          (key) => {
            if (key.includes("padding")) {
              window.savedCountsPerBlock[currentBlockId][key] = 0;
            }
          }
        );
      }

      const styleTag = document.getElementById(
        `sc-structure-style-${getSelectedElement()?.id}`
      );
      if (styleTag) styleTag.remove();
    }
    function resetStructureStyles() {
      resetMarginStyles();
      resetPaddingStyles();
    }
    
    const marginResetBtn = document.getElementById("button-advance-margin-reset");
    const paddingResetBtn = document.getElementById(
      "button-advance-padding-reset"
    );
    const allResetBtn = document.getElementById(
      "button-advance-structure-reset-all"
    );

    if (marginResetBtn)
      marginResetBtn.addEventListener("click", resetMarginStyles);
    if (paddingResetBtn)
      paddingResetBtn.addEventListener("click", resetPaddingStyles);
    if (allResetBtn)
      allResetBtn.addEventListener("click", resetStructureStyles);
    
  }
