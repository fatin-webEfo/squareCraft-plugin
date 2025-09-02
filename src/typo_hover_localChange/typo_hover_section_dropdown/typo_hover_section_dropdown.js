export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container");
  if (!root || root.dataset.typoHoverBound === "1") return;
  root.dataset.typoHoverBound = "1";

  // ADDED the bold/italic hover IDs (left everything else intact)
  const BTN_SEL = [
    // existing “all”
    "#typo-all-hover-font-button",
    "#typo-all-hover-border-button",
    "#typo-all-hover-shadow-button",
    "#typo-all-hover-effects-button",

    // NEW: bold
    "#typo-bold-hover-font-button",
    "#typo-bold-hover-border-button",
    "#typo-bold-hover-shadow-button",
    "#typo-bold-hover-effects-button",

    // NEW: italic
    "#typo-italic-hover-font-button",
    "#typo-italic-hover-border-button",
    "#typo-italic-hover-shadow-button",
    "#typo-italic-hover-effects-button",
  ].join(",");

  const SEC_SEL = [
    // existing “all”
    "#typo-all-hover-font-section",
    "#typo-all-hover-border-section",
    "#typo-all-hover-shadow-section",
    "#typo-all-hover-effects-section",

    // NEW: bold
    "#typo-bold-hover-font-section",
    "#typo-bold-hover-border-section",
    "#typo-bold-hover-shadow-section",
    "#typo-bold-hover-effects-section",

    // NEW: italic
    "#typo-italic-hover-font-section",
    "#typo-italic-hover-border-section",
    "#typo-italic-hover-shadow-section",
    "#typo-italic-hover-effects-section",
  ].join(",");

  const wantDisplay = (sec) => {
    if (sec.dataset.scDisplay) return sec.dataset.scDisplay;
    const d = sec.classList.contains("sc-grid")
      ? "grid"
      : sec.classList.contains("sc-flex")
      ? "flex"
      : "block";
    sec.dataset.scDisplay = d;
    return d;
  };

  const forceShow = (sec, on) => {
    if (!sec) return;
    const before = {
      id: sec.id,
      className: sec.className,
      display: sec.style.display,
    };
    sec.classList.toggle("sc-hidden", !on);
    sec.classList.toggle("sc-visible", on);
    sec.style.setProperty(
      "display",
      on ? wantDisplay(sec) : "none",
      "important"
    );
    const after = {
      id: sec.id,
      className: sec.className,
      display: sec.style.display,
    };
    console.log("[typo_hover_dropdown] show", {
      id: sec.id,
      on,
      before,
      after,
    });
  };

  const arrowSync = (btn, open) => {
    const arrow = btn.querySelector('.sc-arrow-placeholder, img[src*="arrow"]');
    if (arrow) arrow.classList.toggle("sc-rotate-180", !open);
  };

  const findScope = (btn) =>
    btn.closest("[data-hover-typo-all]") ||
    btn.closest(".sc-mt-2.sc-text-color-white") ||
    root;

  const openInScope = (scope, btn) => {
    const guessed =
      btn.nextElementSibling && btn.nextElementSibling.id?.endsWith("-section")
        ? btn.nextElementSibling
        : scope.querySelector(`#${btn.id.replace("-button", "-section")}`);

    const sections = Array.from(scope.querySelectorAll(SEC_SEL));
    sections.forEach((s) => forceShow(s, s === guessed));

    const buttons = Array.from(scope.querySelectorAll(BTN_SEL));
    buttons.forEach((b) => arrowSync(b, b === btn));

    console.log("[typo_hover_dropdown] scope-click", {
      scopeHint: scope.id || "(anon-scope)",
      clicked: btn.id,
      open: guessed?.id,
      secCount: sections.length,
    });

    queueMicrotask(() => sections.forEach((s) => forceShow(s, s === guessed)));
  };

  root.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(BTN_SEL);
      if (!btn) return;
      const scope = findScope(btn);
      openInScope(scope, btn);
    },
    true
  );

  Array.from(root.querySelectorAll(BTN_SEL)).forEach((btn) => {
    const scope = findScope(btn);
    const firstBtn = scope.querySelector("#typo-all-hover-font-button") || btn;
    if (btn === firstBtn) openInScope(scope, firstBtn);
  });

  console.log("[typo_hover_dropdown] listeners-attached");
}
