export function typo_hover_section_dropdown() {
  const root = document.getElementById("sc-widget-container");
  if (!root || root.dataset.typoHoverBound === "1") return;
  root.dataset.typoHoverBound = "1";
  const log = (...a) => console.log("[hover_dropdown]", ...a);

  const buttons = [
    "typo-all-hover-font-button",
    "typo-all-hover-border-button",
    "typo-all-hover-shadow-button",
    "typo-all-hover-effects-button",
  ];
  const sections = {
    "typo-all-hover-font-button": "typo-all-hover-font-section",
    "typo-all-hover-border-button": "typo-all-hover-border-section",
    "typo-all-hover-shadow-button": "typo-all-hover-shadow-section",
    "typo-all-hover-effects-button": "typo-all-hover-effects-section",
  };

  const open = (btnId) => {
    buttons.forEach((b) => {
      const sec = root.querySelector("#" + sections[b]);
      const btn = root.querySelector("#" + b);
      if (!sec) return;
      const on = b === btnId;
      const before = { hidden: sec.classList.contains("sc-hidden") };
      if (on) {
        sec.classList.remove("sc-hidden");
        sec.classList.add("sc-visible");
      } else {
        sec.classList.add("sc-hidden");
        sec.classList.remove("sc-visible");
      }
      btn
        ?.querySelector(
          '.sc-arrow-placeholder, img[id*="arrow"], img[src*="arrow"], svg'
        )
        ?.classList.toggle("sc-rotate-180", !on);
      const after = { hidden: sec.classList.contains("sc-hidden") };
      log("toggle", { b, on, before, after });
    });
  };

  buttons.forEach((b) => {
    const btn = root.querySelector("#" + b);
    if (!btn) {
      log("missing-btn", b);
      return;
    }
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener(
      "click",
      () => {
        log("click", b);
        open(b);
        const secId = sections[b];
        root
          .querySelector("#" + secId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      { capture: true }
    );
  });

  const first =
    buttons.find((b) => root.querySelector("#" + sections[b])) || buttons[0];
  log("initial-open", first);
  open(first);
}
