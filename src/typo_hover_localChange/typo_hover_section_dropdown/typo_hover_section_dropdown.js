export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container") || document;
  if (root.dataset.typoHoverBound === "1") return;
  root.dataset.typoHoverBound = "1";

  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];

  const secByBtn = Object.fromEntries(pairs);
  const sel = "#" + pairs.map(([b]) => b).join(",#");

  const getArrow = (btn) =>
    btn?.querySelector(
      'img[id*="arrow"], img[src*="arrow"], .sc-arrow-placeholder, svg'
    );

  function open(btnId) {
    pairs.forEach(([b, s]) => {
      const btn = document.getElementById(b);
      const sec = document.getElementById(s);
      if (!sec) return;
      const on = b === btnId;
      sec.classList.toggle("sc-hidden", !on);
      sec.classList.toggle("sc-visible", on);
      const a = getArrow(btn);
      if (a) a.classList.toggle("sc-rotate-180", !on);
    });
  }

  const preferred = "typo-all-hover-font-section";
  const initial =
    pairs.find(([, s]) => document.getElementById(s) && s === preferred)?.[0] ||
    pairs.find(([, s]) => document.getElementById(s))?.[0];

  if (initial) open(initial);

  root.addEventListener("click", (e) => {
    const btn = e.target.closest(sel);
    if (!btn) return;
    open(btn.id);
    const secId = secByBtn[btn.id];
    document
      .getElementById(secId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
