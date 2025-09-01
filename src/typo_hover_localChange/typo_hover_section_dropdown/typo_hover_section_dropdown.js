export function typo_hover_section_dropdown() {
  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];

  const getArrow = (btn) =>
    btn?.querySelector('img[src*="arrow"], .sc-arrow-placeholder, svg');

  const showOnly = (targetId) => {
    pairs.forEach(([btnId, secId]) => {
      const btn = document.getElementById(btnId);
      const sec = document.getElementById(secId);
      if (!sec) return;
      const open = secId === targetId;
      sec.classList.toggle("sc-hidden", !open);
      sec.classList.toggle("sc-visible", open);
      const arrow = getArrow(btn);
      if (arrow) {
        arrow.classList.toggle("sc-rotate-180", !open);
        arrow.style.transition = "transform 0.3s ease";
      }
    });
  };

  const initial =
    pairs.find(([, id]) => {
      const el = document.getElementById(id);
      return el && !el.classList.contains("sc-hidden");
    })?.[1] || pairs[0]?.[1];

  if (initial) showOnly(initial);

  pairs.forEach(([btnId, secId]) => {
    const btn = document.getElementById(btnId);
    if (!btn || btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation?.();
      showOnly(secId);
      const sec = document.getElementById(secId);
      try {
        sec?.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {}
    });
  });
}
