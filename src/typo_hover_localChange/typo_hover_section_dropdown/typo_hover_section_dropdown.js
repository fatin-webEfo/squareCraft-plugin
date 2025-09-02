export function typo_hover_section_dropdown() {
  const NS = "[typo_hover_dropdown]";
  if (window.__sc_typoHoverBound) {
    console.log(NS, "skip: already bound");
    return;
  }
  window.__sc_typoHoverBound = 1;

  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];
  const secByBtn = Object.fromEntries(pairs);
  const sel = pairs.map(([b]) => `#${b}`).join(",");
  console.log(NS, "init", { pairs, sel });
  console.log(
    NS,
    "sections-present",
    pairs.map(([, s]) => ({ id: s, present: !!document.getElementById(s) }))
  );

  const ensureDisplayToken = (sec) => {
    if (sec.dataset.scDisplay) return sec.dataset.scDisplay;
    let d = "block";
    const cs = getComputedStyle(sec).display;
    if (cs && cs !== "none") d = cs;
    else if (sec.classList.contains("sc-grid")) d = "grid";
    else if (sec.classList.contains("sc-flex")) d = "flex";
    sec.dataset.scDisplay = d;
    return d;
  };

  const show = (sec, on) => {
    const before = {
      className: sec.className,
      inlineDisplay: sec.style.display,
    };
    sec.classList.toggle("sc-hidden", !on);
    sec.classList.toggle("sc-visible", on);
    sec.style.setProperty(
      on ? "display" : "display",
      on ? ensureDisplayToken(sec) : "none",
      "important"
    );
    const after = {
      className: sec.className,
      inlineDisplay: sec.style.display,
    };
    console.log(NS, "show", { id: sec.id, on, before, after });
  };

  const getArrow = (btn) =>
    btn?.querySelector(
      '.sc-arrow-placeholder, img[id*="arrow"], img[src*="arrow"], svg'
    );

  const setOpen = (btnId) => {
    console.log(NS, "setOpen", btnId);
    for (const [b, s] of pairs) {
      const btn = document.getElementById(b);
      const sec = document.getElementById(s);
      const on = b === btnId;
      if (!sec) {
        console.log(NS, "missing-section", { button: b, section: s });
        continue;
      }
      show(sec, on);
      const a = getArrow(btn);
      if (a) a.classList.toggle("sc-rotate-180", !on);
      console.log(NS, "arrow-sync", {
        button: b,
        section: s,
        arrowFound: !!a,
        rotate180: a ? a.classList.contains("sc-rotate-180") : null,
      });
    }
  };

  const initial =
    pairs.find(([, s]) => document.getElementById(s))?.[0] || pairs[0][0];
  console.log(NS, "initial", initial);
  setOpen(initial);

  const handler = (e) => {
    const btn = e.target.closest(sel);
    if (!btn) return;
    console.log(NS, "click", {
      target: e.target.id || e.target.tagName,
      hit: btn.id,
    });
    setOpen(btn.id);
    const secId = secByBtn[btn.id];
    const sec = document.getElementById(secId);
    console.log(NS, "post-click-section-state", {
      secId,
      exists: !!sec,
      className: sec?.className || null,
      inlineDisplay: sec?.style.display || null,
      hasHidden: sec ? sec.classList.contains("sc-hidden") : null,
      hasVisible: sec ? sec.classList.contains("sc-visible") : null,
    });
    sec?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.addEventListener("click", handler, true);
  document.addEventListener("pointerup", handler, true);
  console.log(NS, "listeners-attached", { capture: true });
}
