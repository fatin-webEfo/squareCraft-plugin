export function typo_hover_section_dropdown() {
  // bind ONLY after the widget exists
  const root = document.getElementById("sc-widget-container");
  if (!root) return; // ← critical
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
      '.sc-arrow-placeholder, img[id*="arrow"], img[src*="arrow"], svg'
    );

  function open(btnId) {
    pairs.forEach(([b, s]) => {
      const btn = root.querySelector(`#${b}`);
      const sec = root.querySelector(`#${s}`);
      if (!sec) return;
      const on = b === btnId;
      sec.classList.toggle("sc-hidden", !on);
      sec.classList.toggle("sc-visible", on);
      const a = getArrow(btn);
      if (a) a.classList.toggle("sc-rotate-180", !on);
    });
  }

  // Prefer opening the Font section first, else the first existing section
  const preferred = "typo-all-hover-font-section";
  const initial =
    pairs.find(
      ([, s]) => root.querySelector(`#${s}`) && s === preferred
    )?.[0] || pairs.find(([, s]) => root.querySelector(`#${s}`))?.[0];
  if (initial) open(initial);

  // Delegate clicks inside the widget only
  root.addEventListener("click", (e) => {
    const btn = e.target.closest(sel);
    if (!btn || !root.contains(btn)) return;
    open(btn.id);
    const secId = secByBtn[btn.id];
    root
      .querySelector(`#${secId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
