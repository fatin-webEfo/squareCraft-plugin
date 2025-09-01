export function typo_hover_section_dropdown() {
  const map = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];

  const showOnly = (panelId) => {
    map.forEach(([, sec]) => {
      const el = document.getElementById(sec);
      if (!el) return;
      if (sec === panelId) el.classList.remove("sc-hidden");
      else el.classList.add("sc-hidden");
    });
  };

  const first = map[0]?.[1];
  if (first && document.getElementById(first)) showOnly(first);

  map.forEach(([btnId, secId]) => {
    const btn = document.getElementById(btnId);
    const sec = document.getElementById(secId);
    if (!btn || !sec) return;
    if (btn.dataset.thBound === "1") return;
    btn.dataset.thBound = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showOnly(secId);
      try {
        sec.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {}
    });
  });
}
