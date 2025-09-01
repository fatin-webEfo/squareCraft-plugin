export function typo_hover_section_dropdown() {
  const sections = {
    "typo-all-hover-font-button": "typo-all-hover-font-section",
    "typo-all-hover-border-button": "typo-all-hover-border-section",
    "typo-all-hover-shadow-button": "typo-all-hover-shadow-section",
    "typo-all-hover-effects-button": "typo-all-hover-effects-section",
  };

  function setArrowState(btn, open) {
    const arrow = btn.querySelector("img, .sc-arrow-placeholder");
    if (!arrow) return;
    if (open) arrow.classList.remove("sc-rotate-180");
    else if (!arrow.classList.contains("sc-rotate-180"))
      arrow.classList.add("sc-rotate-180");
  }

  Object.entries(sections).forEach(([btnId, secId]) => {
    const btn = document.getElementById(btnId);
    const sec = document.getElementById(secId);
    if (!sec) return;
    if (secId === "typo-all-hover-font-section") {
      sec.classList.remove("sc-hidden");
      sec.classList.add("sc-visible");
      if (btn) setArrowState(btn, true);
    } else {
      sec.classList.add("sc-hidden");
      sec.classList.remove("sc-visible");
      if (btn) setArrowState(btn, false);
    }
  });

  Object.keys(sections).forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (!btn || btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      Object.entries(sections).forEach(([otherBtnId, otherSecId]) => {
        const otherBtn = document.getElementById(otherBtnId);
        const otherSec = document.getElementById(otherSecId);
        if (!otherSec) return;
        if (otherBtnId === btnId) {
          otherSec.classList.remove("sc-hidden");
          otherSec.classList.add("sc-visible");
          setArrowState(otherBtn, true);
          try {
            otherSec.scrollIntoView({ behavior: "smooth", block: "start" });
          } catch {}
        } else {
          otherSec.classList.add("sc-hidden");
          otherSec.classList.remove("sc-visible");
          setArrowState(otherBtn, false);
        }
      });
    });
  });
}
