export function typo_hover_section_dropdown(options = {}) {
  const { defaultOpen = "font" } = options;
  const pairs = [
    {
      btn: "typo-all-hover-font-button",
      panel: "typo-all-hover-font-section",
      key: "font",
    },
    {
      btn: "typo-all-hover-border-button",
      panel: "typo-all-hover-border-section",
      key: "border",
    },
    {
      btn: "typo-all-hover-shadow-button",
      panel: "typo-all-hover-shadow-section",
      key: "shadow",
    },
    {
      btn: "typo-all-hover-effects-button",
      panel: "typo-all-hover-effects-section",
      key: "effects",
    },
  ];
  const container = document.getElementById("sc-widget-container") || document;
  const showOnly = (panelId) => {
    pairs.forEach(({ panel }) => {
      const el = document.getElementById(panel);
      if (!el) return;
      if (panel === panelId) {
        el.classList.remove("sc-hidden");
        el.classList.add("sc-visible");
      } else {
        el.classList.remove("sc-visible");
        el.classList.add("sc-hidden");
      }
    });
  };
  const def = pairs.find((p) => p.key === defaultOpen) || pairs[0];
  if (def) showOnly(def.panel);
  const onClick = (e) => {
    const match = pairs.find(({ btn }) => e.target.closest(`#${btn}`));
    if (!match) return;
    e.preventDefault();
    e.stopPropagation();
    showOnly(match.panel);
    const panelEl = document.getElementById(match.panel);
    if (panelEl) {
      try {
        panelEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {}
    }
  };
  container.addEventListener("click", onClick);
  return () => {
    container.removeEventListener("click", onClick);
  };
}
