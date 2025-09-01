export function typo_hover_section_dropdown() {
  const pairs = [
    ["typo-all-hover-font-button", "typo-all-hover-font-section"],
    ["typo-all-hover-border-button", "typo-all-hover-border-section"],
    ["typo-all-hover-shadow-button", "typo-all-hover-shadow-section"],
    ["typo-all-hover-effects-button", "typo-all-hover-effects-section"],
  ];

  const showOnly = (target) => {
    pairs.forEach(([, secId]) => {
      const sec = document.getElementById(secId);
      if (!sec) return;
      const on = secId === target;
      sec.classList.toggle("sc-hidden", !on);
      sec.classList.toggle("sc-visible", on);
    });
  };

  const first = pairs[0]?.[1];
  if (first && document.getElementById(first)) showOnly(first);

  pairs.forEach(([btnId, secId]) => {
    const btn = document.getElementById(btnId);
    const sec = document.getElementById(secId);
    if (!btn || !sec) return;
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showOnly(secId);
      try {
        sec.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {}
    });
  });
}
