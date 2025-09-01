// keep this exact name:
export function typo_hover_section_dropdown() {
  // 1) find the widget root (once)
  const root = document.getElementById("sc-widget-container");
  if (!root) return;

  // 2) guarantee sc-hidden works even if another CSS overrides it
  if (!document.getElementById("sc-hidden-style")) {
    const s = document.createElement("style");
    s.id = "sc-hidden-style";
    s.textContent = `
      .sc-hidden{display:none!important}
      .sc-visible{display:block!important}
    `;
    document.head.appendChild(s);
  }

  // 3) map buttons -> sections we want to toggle
  const MAP = {
    "typo-all-hover-font-button": "typo-all-hover-font-section",
    "typo-all-hover-border-button": "typo-all-hover-border-section",
    "typo-all-hover-shadow-button": "typo-all-hover-shadow-section",
    "typo-all-hover-effects-button": "typo-all-hover-effects-section",
  };
  const SECTION_IDS = Object.values(MAP);

  // helper: show only the target section
  const showOnly = (targetId) => {
    SECTION_IDS.forEach((id) => {
      const sec = root.querySelector(`#${CSS.escape(id)}`);
      if (!sec) return;
      const on = id === targetId;
      sec.classList.toggle("sc-hidden", !on);
      sec.classList.toggle("sc-visible", on);
      // belt & suspenders in case some other script flips classes back
      if (on) {
        sec.removeAttribute("hidden");
        sec.style.removeProperty("display");
        sec.setAttribute("aria-hidden", "false");
      } else {
        sec.setAttribute("hidden", "");
        sec.style.setProperty("display", "none", "important");
        sec.setAttribute("aria-hidden", "true");
      }
    });
  };

  // 4) (re)bind safely; works whether elements exist now or appear later
  const bind = () => {
    // ensure we actually have at least one valid pair present
    const presentPairs = Object.entries(MAP).filter(([btnId, secId]) => {
      return (
        root.querySelector(`#${CSS.escape(btnId)}`) &&
        root.querySelector(`#${CSS.escape(secId)}`)
      );
    });
    if (!presentPairs.length) return false;

    // default open = first present section
    showOnly(presentPairs[0][1]);

    // remove old handler if any (avoid duplicates)
    if (root.__typoHoverHandler) {
      root.removeEventListener("click", root.__typoHoverHandler, true);
    }

    // single delegated listener (capture to beat other listeners)
    const handler = (e) => {
      const btn = e.target.closest(
        "#typo-all-hover-font-button," +
          "#typo-all-hover-border-button," +
          "#typo-all-hover-shadow-button," +
          "#typo-all-hover-effects-button"
      );
      if (!btn || !root.contains(btn)) return;

      e.preventDefault();
      e.stopImmediatePropagation(); // stop competing inits from undoing our toggle

      const targetId = MAP[btn.id];
      if (!targetId) return;

      showOnly(targetId);

      const sec = root.querySelector(`#${CSS.escape(targetId)}`);
      try {
        sec?.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {}
    };

    root.__typoHoverHandler = handler;
    root.addEventListener("click", handler, { capture: true });
    return true;
  };

  // 5) try to bind now; if not ready, observe until it is
  if (!bind()) {
    const mo = new MutationObserver(() => {
      if (bind()) mo.disconnect();
    });
    mo.observe(root, { childList: true, subtree: true });
  }
}
