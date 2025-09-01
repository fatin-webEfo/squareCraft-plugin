export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container");
  if (!root || root.dataset.typoHoverBound === "1") return;
  root.dataset.typoHoverBound = "1";

  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];
  const secByBtn = Object.fromEntries(pairs);
  const sel = pairs.map(([b]) => `#${b}`).join(",");

  const forceShow = (sec, on) => {
    // flip utility classes
    sec.classList.toggle("sc-hidden", !on);
    sec.classList.toggle("sc-visible", on);

    // force the correct display so CSS collisions can't break it
    if (on) {
      const desired = sec.dataset.scDisplay || "block";
      sec.style.display = desired; // grid for the font section, block for others
    } else {
      sec.style.display = "none";
    }
  };

  const setOpen = (btnId) => {
    for (const [b, s] of pairs) {
      const sec = root.querySelector(`#${s}`);
      if (!sec) continue;
      forceShow(sec, b === btnId);
    }
  };

  // initial state
  setOpen(pairs[0][0]); // open "Font" by default

  root.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(sel);
      if (!btn || !root.contains(btn)) return;
      setOpen(btn.id);
      root
        .querySelector(`#${secByBtn[btn.id]}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    true
  );
}
