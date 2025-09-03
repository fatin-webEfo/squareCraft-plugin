export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") return;
  document.body.dataset.scHoverTypoAllBound = "1";

  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;

  const q = (s, r = document) => r.querySelector(s);
  const weightBtn = () => q("#hover-typo-allSelect-font-weight");
  const weightList = () => q("#hover-typo-allSelect-font-weight-list");
  const weightLabel = () => weightBtn()?.querySelector("p");
  const spacingBtn = () => q("#hover-typo-allSelect-letter-spacing");
  const spacingInput = () =>
    q("#typo-all-hover-font-section .sc-font-size-input");
  const spacingList = () => {
    const wrap = spacingBtn()?.closest(
      ".sc-flex.sc-text-color-white.sc-justify-between.sc-col-span-4.sc-rounded-4px.sc-items-center"
    );
    return wrap?.querySelector(".sc-absolute");
  };

  const hide = (el) => el && el.classList.add("sc-hidden");
  const toggle = (el) => el && el.classList.toggle("sc-hidden");
  const apply = (styles) => {
    const el = sel?.();
    if (!el) return;
    const put = (n) =>
      Object.entries(styles).forEach(([k, v]) =>
        n.style.setProperty(k, v, "important")
      );
    put(el);
    el.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a").forEach(put);
  };

  const commitSpacing = (raw) => {
    if (!raw) return;
    const val = /^\-?\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
    apply({ "letter-spacing": val });
  };

  document.addEventListener(
    "click",
    (e) => {
      const t = e.target;

      if (t.closest("#hover-typo-allSelect-font-weight")) {
        toggle(weightList());
        hide(spacingList());
        return;
      }

      if (t.closest("#hover-typo-allSelect-letter-spacing")) {
        toggle(spacingList());
        hide(weightList());
        return;
      }

      const wItem = t.closest(
        "#hover-typo-allSelect-font-weight-list .sc-dropdown-item"
      );
      if (wItem) {
        const v = (wItem.textContent || "").trim();
        if (weightLabel()) weightLabel().textContent = ` ${v} `;
        apply({ "font-weight": v });
        hide(weightList());
        return;
      }

      const sItem =
        (spacingList() &&
          t.closest(
            `#${spacingList().id ? spacingList().id : ""} .sc-dropdown-item`
          )) ||
        (spacingList() &&
          spacingList().contains(t) &&
          t.closest(".sc-dropdown-item"));
      if (sItem) {
        const v = (sItem.dataset.value ?? sItem.textContent ?? "").trim();
        if (spacingInput()) spacingInput().value = v;
        commitSpacing(v);
        hide(spacingList());
        return;
      }

      if (!t.closest("#typo-all-hover-font-section")) {
        hide(weightList());
        hide(spacingList());
      }
    },
    true
  );

  const inp = spacingInput();
  if (inp && !inp.dataset.bound) {
    inp.dataset.bound = "1";
    let timer;
    const go = () => commitSpacing(inp.value.trim());
    inp.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(go, 120);
    });
    inp.addEventListener("change", go);
    inp.addEventListener("blur", go);
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        go();
        inp.blur();
      }
    });
  }
}
