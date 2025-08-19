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

  const allIds = [...Object.values(marginMap), ...Object.values(paddingMap)];
  const $ = (id) => document.getElementById(id);

  const clamp = (n) => Math.max(0, Math.min(999, Math.round(n || 0)));
  const readPx = (el) => {
    if (!el) return 0;
    const raw = el.tagName === "INPUT" ? el.value : el.textContent;
    const n = parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10);
    return clamp(Number.isFinite(n) ? n : 0);
  };
  const writePx = (el, v) => {
    if (!el) return;
    const s = String(clamp(v));
    if (el.tagName === "INPUT") el.value = s;
    else el.textContent = s;
  };

  const updateStyles = () => {
    const block =
      typeof getSelectedElement === "function" ? getSelectedElement() : null;
    if (!block) return;

    const blockId = block.id;
    // Target both anchor-buttons and button elements inside the block
    const buttonSelector = `#${blockId} a, #${blockId} button`;

    const styleId = `sc-button-structure-style-${blockId}`; // unique from Typo
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const cssParts = [];
    Object.entries(marginMap).forEach(([side, id]) => {
      cssParts.push(`margin-${side}:${readPx($(id))}px !important`);
    });
    Object.entries(paddingMap).forEach(([side, id]) => {
      cssParts.push(`padding-${side}:${readPx($(id))}px !important`);
    });

    styleTag.textContent = `${buttonSelector} { ${cssParts.join("; ")} }`;
  };

  // Bind inputs
  const bind = (id) => {
    const el = $(id);
    if (!el) return;
    const onAny = () => updateStyles();
    const normalize = () => writePx(el, readPx(el));
    el.addEventListener("input", onAny);
    el.addEventListener("change", onAny);
    el.addEventListener("blur", normalize);
  };
  allIds.forEach(bind);

  // Initialize values and styles once
  allIds.forEach((id) => writePx($(id), readPx($(id))));
  updateStyles();

  // Reset handler (kept consistent with your UI)
  function resetStructureStyles() {
    allIds.forEach((id) => writePx($(id), 0));

    const marginFill = document.getElementById(
      "button-advance-margin-gap-fill"
    );
    const marginBullet = document.getElementById(
      "button-advance-margin-gap-bullet"
    );
    const paddingFill = document.getElementById(
      "button-advance-padding-gap-fill"
    );
    const paddingBullet = document.getElementById(
      "button-advance-padding-gap-bullet"
    );
    if (marginFill) marginFill.style.width = "0%";
    if (marginBullet) marginBullet.style.left = "0%";
    if (paddingFill) paddingFill.style.width = "0%";
    if (paddingBullet) paddingBullet.style.left = "0%";

    [
      "button-advance-margin-gap-all",
      "button-advance-margin-gap-top",
      "button-advance-margin-gap-bottom",
      "button-advance-margin-gap-left",
      "button-advance-margin-gap-right",
      "button-advance-padding-gap-all",
      "button-advance-padding-gap-top",
      "button-advance-padding-gap-bottom",
      "button-advance-padding-gap-left",
      "button-advance-padding-gap-right",
    ].forEach((id) =>
      document.getElementById(id)?.classList.remove("sc-bg-454545")
    );

    document
      .getElementById("button-advance-margin-gap-all")
      ?.classList.add("sc-bg-454545");
    document
      .getElementById("button-advance-padding-gap-all")
      ?.classList.add("sc-bg-454545");

    [
      "button-structure-margin-top-fill",
      "button-structure-margin-bottom-fill",
      "button-structure-margin-left-fill",
      "button-structure-margin-right-fill",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "block";
    });

    [
      "button-structure-padding-top",
      "button-structure-padding-bottom",
      "button-structure-padding-left",
      "button-structure-padding-right",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "block";
    });

    updateStyles();
  }

  document
    .getElementById("button-advance-margin-reset")
    ?.addEventListener("click", resetStructureStyles);
  document
    .getElementById("button-advance-padding-reset")
    ?.addEventListener("click", resetStructureStyles);
  document
    .getElementById("button-advance-structure-reset-all")
    ?.addEventListener("click", resetStructureStyles);
}
