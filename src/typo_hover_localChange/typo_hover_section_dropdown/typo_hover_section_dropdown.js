export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container");
  if (!root) return;

  if (root.dataset.typoHoverTabsBound === "1") return;
  root.dataset.typoHoverTabsBound = "1";

  const MAP = {
    "typo-all-hover-font-button": "typo-all-hover-font-section",
    "typo-all-hover-border-button": "typo-all-hover-border-section",
    "typo-all-hover-shadow-button": "typo-all-hover-shadow-section",
    "typo-all-hover-effects-button": "typo-all-hover-effects-section",
  };
  const SECTION_IDS = Object.values(MAP);

  const showOnly = (targetId) => {
    SECTION_IDS.forEach((id) => {
      const sec = root.querySelector(`#${CSS.escape(id)}`);
      if (!sec) return;
      if (id === targetId) {
        sec.classList.remove("sc-hidden");
        sec.style.removeProperty("display");
      } else {
        sec.classList.add("sc-hidden");
        sec.style.setProperty("display", "none", "important");
      }
    });
  };

  showOnly("typo-all-hover-font-section");

  root.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest(
        "#typo-all-hover-font-button, " +
          "#typo-all-hover-border-button, " +
          "#typo-all-hover-shadow-button, " +
          "#typo-all-hover-effects-button"
      );
      if (!btn || !root.contains(btn)) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      const targetId = MAP[btn.id];
      if (!targetId) return;

      showOnly(targetId);

      const sec = root.querySelector(`#${CSS.escape(targetId)}`);
      try {
        sec?.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {}
    },
    { capture: true }
  );
}
