export function initTypoAdvanceStructureStyles(getSelectedElement) {
  const marginMap = {
    top: "Typo-structure-margin-top-count",
    bottom: "Typo-structure-margin-bottom-count",
    left: "Typo-structure-margin-left-count",
    right: "Typo-structure-margin-right-count",
  };

  
  const paddingMap = {
    top: "Typo-structure-padding-top-count",
    bottom: "Typo-structure-padding-bottom-count",
    left: "Typo-structure-padding-left-count",
    right: "Typo-structure-padding-right-count",
  };

  const updateStyles = () => {
    const block = getSelectedElement();
    if (!block) return;

    const blockId = block.id;
   const TypoSelector = `#${blockId} .sqs-block-content`;
;

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

    const cssString = `${TypoSelector} { ${cssParts.join("; ")} }`;
    styleTag.innerHTML = cssString;

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

  function resetStructureStyles() {
    Object.values(marginMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.innerText = "0px";
    });

    Object.values(paddingMap).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.innerText = "0px";
    });

    const marginFill = document.getElementById(
      "Typo-advance-margin-gap-fill"
    );
    const marginBullet = document.getElementById(
      "Typo-advance-margin-gap-bullet"
    );
    const paddingFill = document.getElementById(
      "Typo-advance-padding-gap-fill"
    );
    const paddingBullet = document.getElementById(
      "Typo-advance-padding-gap-bullet"
    );

    if (marginFill) marginFill.style.width = "0%";
    if (marginBullet) marginBullet.style.left = "0%";
    if (paddingFill) paddingFill.style.width = "0%";
    if (paddingBullet) paddingBullet.style.left = "0%";

    const marginIds = [
      "Typo-advance-margin-gap-all",
      "Typo-advance-margin-gap-top",
      "Typo-advance-margin-gap-bottom",
      "Typo-advance-margin-gap-left",
      "Typo-advance-margin-gap-right",
    ];
    const paddingIds = [
      "Typo-advance-padding-gap-all",
      "Typo-advance-padding-gap-top",
      "Typo-advance-padding-gap-bottom",
      "Typo-advance-padding-gap-left",
      "Typo-advance-padding-gap-right",
    ];

    marginIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("sc-bg-454545");
    });

    paddingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("sc-bg-454545");
    });

    const marginAll = document.getElementById("Typo-advance-margin-gap-all");
    const paddingAll = document.getElementById(
      "Typo-advance-padding-gap-all"
    );

    if (marginAll) marginAll.classList.add("sc-bg-454545");
    if (paddingAll) paddingAll.classList.add("sc-bg-454545");

    const allMarginFills = [
      "Typo-structure-margin-top-fill",
      "Typo-structure-margin-bottom-fill",
      "Typo-structure-margin-left-fill",
      "Typo-structure-margin-right-fill",
    ];
    allMarginFills.forEach((id) => {
      const fill = document.getElementById(id);
      if (fill) fill.style.display = "block";
    });

    const allPaddingFills = [
      "Typo-structure-padding-top",
      "Typo-structure-padding-bottom",
      "Typo-structure-padding-left",
      "Typo-structure-padding-right",
    ];
    allPaddingFills.forEach((id) => {
      const fill = document.getElementById(id);
      if (fill) fill.style.display = "block";
    });

    updateStyles();
  }

  const marginResetBtn = document.getElementById("Typo-advance-margin-reset");
  const paddingResetBtn = document.getElementById(
    "Typo-advance-padding-reset"
  );
  const allResetBtn = document.getElementById(
    "Typo-advance-structure-reset-all"
  );

  if (marginResetBtn)
    marginResetBtn.addEventListener("click", resetStructureStyles);
  if (paddingResetBtn)
    paddingResetBtn.addEventListener("click", resetStructureStyles);
  if (allResetBtn) allResetBtn.addEventListener("click", resetStructureStyles);
}
