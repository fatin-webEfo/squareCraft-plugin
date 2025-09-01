export function typo_hover_section_dropdown() {
  const pairs = [
    { btn: "typo-all-hover-font-button", panel: "typo-all-hover-font-section" },
    {
      btn: "typo-all-hover-border-button",
      panel: "typo-all-hover-border-section",
    },
    {
      btn: "typo-all-hover-shadow-button",
      panel: "typo-all-hover-shadow-section",
    },
    {
      btn: "typo-all-hover-effects-button",
      panel: "typo-all-hover-effects-section",
    },
  ];
  const root = document.getElementById("sc-widget-container") || document;
  if (root.dataset.typoHoverDropdownInit === "1") return;
  root.dataset.typoHoverDropdownInit = "1";

  const hideAll = () => {
    pairs.forEach(({ panel }) => {
      const el = document.getElementById(panel);
      if (el) el.classList.add("sc-hidden");
    });
  };

  const showOnly = (panelId) => {
    hideAll();
    const el = document.getElementById(panelId);
    if (el) el.classList.remove("sc-hidden");
  };

  const initial = document.getElementById("typo-all-hover-font-section");
  if (initial) showOnly("typo-all-hover-font-section");

  const onClick = (e) => {
    for (const { btn, panel } of pairs) {
      const hit = e.target.closest(`#${btn}`);
      if (hit) {
        e.preventDefault();
        e.stopPropagation();
        showOnly(panel);
        const el = document.getElementById(panel);
        try {
          el && el.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch {}
        break;
      }
    }
  };

  root.addEventListener("click", onClick);
}
