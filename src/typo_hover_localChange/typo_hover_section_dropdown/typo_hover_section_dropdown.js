export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container");
  if (!root || root.__typoHoverBound) return;
  root.__typoHoverBound = true;

  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];

  const secByBtn = Object.fromEntries(pairs);
  const sel = pairs.map(([b]) => `#${b}`).join(",");

  // cache the intended display so we can force it when showing
  for (const [, secId] of pairs) {
    const sec = root.querySelector(`#${secId}`);
    if (!sec) continue;

    if (!sec.dataset.scDisplay) {
      // infer display from utility classes
      let disp = "block";
      if (sec.classList.contains("sc-grid")) disp = "grid";
      else if (sec.classList.contains("sc-flex")) disp = "flex";
      sec.dataset.scDisplay = disp;
    }
    // clear any leftover inline display from previous runs
    sec.style.removeProperty("display");
  }

  const getArrow = (btn) =>
    btn?.querySelector(
      '.sc-arrow-placeholder, img[id*="arrow"], img[src*="arrow"], svg'
    );

  function show(sec, on) {
    sec.classList.toggle("sc-hidden", !on);
    sec.classList.toggle("sc-visible", on);
    // beat any `.sc-hidden { display:none !important }`
    sec.style.setProperty(
      "display",
      on ? sec.dataset.scDisplay || "block" : "none",
      "important"
    );
  }

  function setOpen(btnId) {
    for (const [b, s] of pairs) {
      const btn = root.querySelector(`#${b}`);
      const sec = root.querySelector(`#${s}`);
      if (!sec) continue;

      const on = b === btnId;
      show(sec, on);

      const a = getArrow(btn);
      if (a) a.classList.toggle("sc-rotate-180", !on);
    }
  }

  // initial: open first available (Font)
  const initialBtn = pairs.find(([b, s]) => root.querySelector(`#${s}`))?.[0];
  if (initialBtn) setOpen(initialBtn);

  const onClick = (e) => {
    const btn = e.target.closest(sel);
    if (!btn || !root.contains(btn)) return;
    setOpen(btn.id);
    root
      .querySelector(`#${secByBtn[btn.id]}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  root.addEventListener("click", onClick, true);
  root.addEventListener("pointerup", onClick, true);

  // for quick console testing
  window.__sc_debug_openTypoHover = setOpen;
}
