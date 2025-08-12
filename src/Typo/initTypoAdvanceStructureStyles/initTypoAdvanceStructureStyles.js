export function initTypoAdvanceStructureStyles(getSelectedElement) {
  // IDs of the 8 input fields
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

  const allIds = [...Object.values(marginMap), ...Object.values(paddingMap)];
  const getEl = (id) => document.getElementById(id);

 const readPx = (el) => {
   if (!el) return 0;
   const raw = el.tagName === "INPUT" ? el.value : el.textContent;
   const n = parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10);
   return Number.isFinite(n) ? Math.max(0, Math.min(999, n)) : 0;
 };


 const writePx = (el, v) => {
   if (!el) return;
   const s = `${Math.max(0, Math.min(999, Math.round(v)))}px`;
   if (el.tagName === "INPUT") el.value = s;
   else el.textContent = s;
 };


  const updateStyles = () => {
    const block =
      typeof getSelectedElement === "function" ? getSelectedElement() : null;
    if (!block) return;

    const blockId = block.id;
    const TypoSelector = `#${blockId} .sqs-block-content`;

    const styleId = `sc-structure-style-${blockId}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const cssParts = [];

    Object.entries(marginMap).forEach(([side, id]) => {
      const v = readPx(getEl(id));
      cssParts.push(`margin-${side}:${v}px !important`);
    });
    Object.entries(paddingMap).forEach(([side, id]) => {
      const v = readPx(getEl(id));
      cssParts.push(`padding-${side}:${v}px !important`);
    });

    styleTag.textContent = `${TypoSelector} { ${cssParts.join("; ")} }`;
  };

  // bind to each input so typing and slider-driven updates both apply styles
  const bindInputHandlers = (id) => {
    const el = getEl(id);
    if (!el) return;

    const normalize = () => writePx(el, readPx(el)); // enforce "Npx" on blur
    const onAny = () => updateStyles();

    el.addEventListener("input", onAny);
    el.addEventListener("change", onAny);
    el.addEventListener("blur", normalize);
  };

  allIds.forEach(bindInputHandlers);

  // initial normalization (ensures all start with "0px") then paint
  allIds.forEach((id) => writePx(getEl(id), readPx(getEl(id))));
  updateStyles();

  function resetStructureStyles() {
    // reset counts to 0px
    allIds.forEach((id) => writePx(getEl(id), 0));

    // reset sliders if present
    const marginFill = document.getElementById("Typo-advance-margin-gap-fill");
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

    // reset active tab highlights
    [
      "Typo-advance-margin-gap-all",
      "Typo-advance-margin-gap-top",
      "Typo-advance-margin-gap-bottom",
      "Typo-advance-margin-gap-left",
      "Typo-advance-margin-gap-right",
      "Typo-advance-padding-gap-all",
      "Typo-advance-padding-gap-top",
      "Typo-advance-padding-gap-bottom",
      "Typo-advance-padding-gap-left",
      "Typo-advance-padding-gap-right",
    ].forEach((id) =>
      document.getElementById(id)?.classList.remove("sc-bg-454545")
    );

    document
      .getElementById("Typo-advance-margin-gap-all")
      ?.classList.add("sc-bg-454545");
    document
      .getElementById("Typo-advance-padding-gap-all")
      ?.classList.add("sc-bg-454545");

    // show all visualization fills again
    [
      "Typo-structure-margin-top-fill",
      "Typo-structure-margin-bottom-fill",
      "Typo-structure-margin-left-fill",
      "Typo-structure-margin-right-fill",
    ].forEach((id) => {
      const fill = document.getElementById(id);
      if (fill) fill.style.display = "block";
    });
    [
      "Typo-structure-padding-top",
      "Typo-structure-padding-bottom",
      "Typo-structure-padding-left",
      "Typo-structure-padding-right",
    ].forEach((id) => {
      const fill = document.getElementById(id);
      if (fill) fill.style.display = "block";
    });

    updateStyles();
  }

  // hook reset buttons
  document
    .getElementById("Typo-advance-margin-reset")
    ?.addEventListener("click", resetStructureStyles);
  document
    .getElementById("Typo-advance-padding-reset")
    ?.addEventListener("click", resetStructureStyles);
  document
    .getElementById("Typo-advance-structure-reset-all")
    ?.addEventListener("click", resetStructureStyles);
}
