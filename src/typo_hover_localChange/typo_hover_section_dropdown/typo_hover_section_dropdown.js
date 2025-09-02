export function typo_hover_section_dropdown() {
  const NS = "[typo_dropdown]";
  const root = document.getElementById("sc-widget-container") || document;
  if (!root || root.dataset.typoDropdownBound === "1") return;
  root.dataset.typoDropdownBound = "1";

  const known = [
    ["typo-all-font-button", "typo-all-font-section"],
    ["typo-all-border-button", "typo-all-border-section"],
    ["typo-all-shadow-button", "typo-all-shadow-section"],
    ["typo-all-effects-button", "typo-all-effects-section"],
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];

  const attrPairs = Array.from(root.querySelectorAll("[data-sc-toggle]"))
    .map((btn) => [btn.id, btn.getAttribute("data-sc-toggle")])
    .filter(([b, s]) => b && s);

  let pairs = [...attrPairs, ...known].filter(
    ([b, s]) => root.querySelector(`#${b}`) && root.querySelector(`#${s}`)
  );
  if (!pairs.length) {
    console.log(NS, "no-pairs-found");
    return;
  }

  const secByBtn = Object.fromEntries(pairs);
  const sel = pairs.map(([b]) => `#${b}`).join(",");

  const wantDisplay = (sec) => {
    if (sec.dataset.scDisplay) return sec.dataset.scDisplay;
    const cs = getComputedStyle(sec).display;
    let d = cs && cs !== "none" ? cs : "block";
    if (sec.classList.contains("sc-grid")) d = "grid";
    else if (sec.classList.contains("sc-flex")) d = "flex";
    sec.dataset.scDisplay = d;
    return d;
  };

  const flip = (sec, on) => {
    const before = { className: sec.className, display: sec.style.display };
    sec.classList.toggle("sc-hidden", !on);
    sec.classList.toggle("sc-visible", on);
    sec.style.setProperty(
      "display",
      on ? wantDisplay(sec) : "none",
      "important"
    );
    const after = { className: sec.className, display: sec.style.display };
    console.log(NS, "flip", { id: sec.id, on, before, after });
  };

  const getArrow = (btn) =>
    btn?.querySelector('.sc-arrow-placeholder, img[src*="arrow"], svg');

  const chain = (el) => {
    const out = [];
    let n = el;
    while (n && n.nodeType === 1) {
      const cs = getComputedStyle(n);
      out.push({
        id: n.id || null,
        cls: n.className || "",
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
      });
      if (n.id === "sc-widget-container") break;
      n = n.parentElement;
    }
    return out;
  };

  const setOpen = (btnId) => {
    console.log(NS, "open", btnId);
    for (const [b, s] of pairs) {
      const btn = root.querySelector(`#${b}`);
      const sec = root.querySelector(`#${s}`);
      if (!sec) continue;
      const on = b === btnId;
      flip(sec, on);
      const arrow = getArrow(btn);
      if (arrow) arrow.classList.toggle("sc-rotate-180", !on);
      btn?.setAttribute("aria-expanded", String(on));
      if (on) console.log(NS, "chain", chain(sec));
    }
  };

  const initial = pairs[0][0];
  setOpen(initial);

  const handler = (e) => {
    const btn = e.target.closest(sel);
    if (!btn || !root.contains(btn)) return;
    console.log(NS, "click", { hit: btn.id });
    setOpen(btn.id);
  };

  root.addEventListener("click", handler, true);
  root.addEventListener("pointerup", handler, true);
  console.log(NS, "bound", { pairs, sel });
}
