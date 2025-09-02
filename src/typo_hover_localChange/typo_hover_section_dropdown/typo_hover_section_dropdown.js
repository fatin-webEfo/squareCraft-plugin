export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container");
  if (!root || root.dataset.typoHoverBound === "1") return;
  root.dataset.typoHoverBound = "1";

  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ].filter(
    ([b, s]) => root.querySelector(`#${b}`) && root.querySelector(`#${s}`)
  );

  const sel = pairs.map(([b]) => `#${b}`).join(",");
  const secByBtn = Object.fromEntries(pairs);

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

  const syncArrow = (btnId, open) => {
    const btn = root.querySelector(`#${btnId}`);
    const arrow = btn?.querySelector(
      '.sc-arrow-placeholder, img[src*="arrow"]'
    );
    if (!arrow) return;
    arrow.classList.toggle("sc-rotate-180", !open);
  };

  const forceShow = (sec, on) => {
    const before = {
      className: sec.className,
      inlineDisplay: sec.style.display,
      hasHidden: sec.classList.contains("sc-hidden"),
    };
    sec.classList.toggle("sc-hidden", !on);
    sec.classList.toggle("sc-visible", on);
    sec.style.setProperty(
      "display",
      on ? wantDisplay(sec) : "none",
      "important"
    );
    const after = {
      className: sec.className,
      inlineDisplay: sec.style.display,
      hasHidden: sec.classList.contains("sc-hidden"),
    };
    console.log("[typo_hover_dropdown] show", {
      id: sec.id,
      on,
      before,
      after,
    });
  };

  const setOpen = (btnId) => {
    console.log("[typo_hover_dropdown] setOpen", btnId);
    for (const [b, s] of pairs) {
      const sec = root.querySelector(`#${s}`);
      if (!sec) continue;
      const on = b === btnId;
      forceShow(sec, on);
      syncArrow(b, on);
    }
  };

  console.log("[typo_hover_dropdown] init", { pairs, sel });
  console.log(
    "[typo_hover_dropdown] sections-present",
    pairs.map(([, s]) => ({ id: s, el: !!root.querySelector(`#${s}`) }))
  );

  if (pairs[0]) {
    console.log("[typo_hover_dropdown] initial", pairs[0][0]);
    setOpen(pairs[0][0]);
  }

  root.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(sel);
      if (!btn) return;
      console.log("[typo_hover_dropdown] click", {
        target: e.target.tagName,
        hit: btn.id,
      });
      setOpen(btn.id);
      const secId = secByBtn[btn.id];
      const sec = root.querySelector(`#${secId}`);
      if (sec) {
        console.log("[typo_hover_dropdown] post-click-section-state", {
          secId,
          exists: !!sec,
          className: sec.className,
          inlineDisplay: sec.style.display,
          hasHidden: sec.classList.contains("sc-hidden"),
          rect:
            sec.getBoundingClientRect().toJSON?.() ||
            sec.getBoundingClientRect(),
        });
      }
    },
    true
  );
}
