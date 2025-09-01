export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container");
  if (!root || root.dataset.typoHoverBound === "1") {
    console.log("[typo_dropdown] skipped bind", {
      hasRoot: !!root,
      bound: root?.dataset.typoHoverBound,
    });
    return;
  }
  root.dataset.typoHoverBound = "1";
  const log = (...a) => console.log("[typo_dropdown]", ...a);

  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];
  log("pairs", pairs);
  const secByBtn = Object.fromEntries(pairs);
  const sel = "#" + pairs.map(([b]) => b).join(",#");
  const getArrow = (btn) =>
    btn?.querySelector(
      '.sc-arrow-placeholder, img[id*="arrow"], img[src*="arrow"], svg'
    );

  function setOpen(btnId) {
    log("setOpen→", btnId);
    for (const [b, s] of pairs) {
      const btn = root.querySelector(`#${b}`);
      const sec = root.querySelector(`#${s}`);
      const on = b === btnId;
      if (!sec) {
        log("section-missing", { button: b, section: s });
        continue;
      }
      const before = {
        hidden: sec.classList.contains("sc-hidden"),
        visible: sec.classList.contains("sc-visible"),
      };
      if (on) {
        sec.classList.remove("sc-hidden");
        sec.classList.add("sc-visible");
      } else {
        sec.classList.add("sc-hidden");
        sec.classList.remove("sc-visible");
      }
      const after = {
        hidden: sec.classList.contains("sc-hidden"),
        visible: sec.classList.contains("sc-visible"),
      };
      const a = getArrow(btn);
      if (a) a.classList.toggle("sc-rotate-180", !on);
      log("toggled", { button: b, section: s, on, before, after });
    }
  }

  const preferred = "typo-all-hover-font-section";
  const initial =
    pairs.find(
      ([, s]) => root.querySelector(`#${s}`) && s === preferred
    )?.[0] || pairs.find(([, s]) => root.querySelector(`#${s}`))?.[0];
  log("initial", initial);
  if (initial) setOpen(initial);

  const onClick = (e) => {
    const btn = e.target.closest(sel);
    if (!btn || !root.contains(btn)) {
      log("click-miss", { target: e.target?.id || e.target?.className });
      return;
    }
    log("click-hit", { btn: btn.id });
    setOpen(btn.id);
    const secId = secByBtn[btn.id];
    const sec = root.querySelector(`#${secId}`);
    log("scrollTo", { secId, found: !!sec });
    sec?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  root.addEventListener("click", onClick, true);
  root.addEventListener("pointerup", onClick, true);
  log("listeners-attached", { capture: true });
  window.__sc_debug_openTypoHover = setOpen;
}
