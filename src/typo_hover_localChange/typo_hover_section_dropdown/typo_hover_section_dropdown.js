
export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container") || document;

  const MAP = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];

  const sectionEls = MAP.map(([, sid]) =>
    root.querySelector(`#${CSS.escape(sid)}`)
  ).filter(Boolean);

  sectionEls.forEach((sec) => {
    if (sec.id === "typo-all-hover-font-section")
      sec.classList.remove("sc-hidden");
    else sec.classList.add("sc-hidden");
  });

  if (root.__typoHoverHandler) {
    root.removeEventListener("click", root.__typoHoverHandler, true);
  }

  const handler = (e) => {
    const selector = MAP.map(([bid]) => `#${bid}`).join(",");
    const btn = e.target.closest(selector);
    if (!btn || !root.contains(btn)) return;
    e.preventDefault();
    e.stopImmediatePropagation(); 
    const pair = MAP.find(([bid]) => bid === btn.id);
    if (!pair) return;
    const targetId = pair[1];
    sectionEls.forEach((sec) => sec.classList.add("sc-hidden"));
    const target = root.querySelector(`#${CSS.escape(targetId)}`);
    if (target) target.classList.remove("sc-hidden");
  };

  root.__typoHoverHandler = handler;
  root.addEventListener("click", handler, { capture: true });
}
