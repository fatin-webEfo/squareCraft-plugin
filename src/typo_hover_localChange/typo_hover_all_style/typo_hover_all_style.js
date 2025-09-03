export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") return;
  document.body.dataset.scHoverTypoAllBound = "1";

  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;
  const root = document.getElementById("sc-widget-container") || document;

  const q = (s) => root.querySelector(s);
  const weightBtn = q("#hover-typo-allSelect-font-weight");
  const weightList = q("#hover-typo-allSelect-font-weight-list");
  const weightLabel = weightBtn?.querySelector("p");
  const spacingBtn = q("#hover-typo-allSelect-letter-spacing");
  const spacingInput = q("#typo-all-hover-font-section .sc-font-size-input");

  const findSpacingList = () => {
    let n = spacingBtn;
    while (n && n !== root) {
      const abs =
        n.querySelector?.(".sc-absolute") ||
        n.parentElement?.querySelector?.(".sc-absolute");
      if (abs) return abs;
      n = n.parentElement;
    }
    return null;
  };

  const show = (el) => el && el.classList.remove("sc-hidden");
  const hide = (el) => el && el.classList.add("sc-hidden");
  const toggle = (el) => el && el.classList.toggle("sc-hidden");
  const spacingList = findSpacingList();

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

  const commitSpacing = (v) => {
    if (v == null) return;
    const s = String(v).trim();
    apply({ "letter-spacing": /^\-?\d+(\.\d+)?$/.test(s) ? `${s}px` : s });
  };

  weightBtn?.addEventListener(
    "click",
    (e) => {
      e.stopImmediatePropagation();
      toggle(weightList);
      hide(spacingList);
    },
    true
  );

  spacingBtn?.addEventListener(
    "click",
    (e) => {
      e.stopImmediatePropagation();
      toggle(spacingList);
      hide(weightList);
    },
    true
  );

  root.addEventListener(
    "click",
    (e) => {
      if (
        weightList &&
        !weightBtn.contains(e.target) &&
        !weightList.contains(e.target)
      )
        hide(weightList);
      if (
        spacingList &&
        !spacingBtn.contains(e.target) &&
        !spacingList.contains(e.target)
      )
        hide(spacingList);
    },
    true
  );

  weightList?.addEventListener(
    "click",
    (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const v = (item.textContent || "").trim();
      if (weightLabel) weightLabel.textContent = ` ${v} `;
      apply({ "font-weight": v });
      hide(weightList);
      e.stopImmediatePropagation();
    },
    true
  );

  spacingList?.addEventListener(
    "click",
    (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const v = (item.dataset.value ?? item.textContent ?? "").trim();
      if (spacingInput) spacingInput.value = v;
      commitSpacing(v);
      hide(spacingList);
      e.stopImmediatePropagation();
    },
    true
  );

  if (spacingInput && !spacingInput.dataset.bound) {
    spacingInput.dataset.bound = "1";
    let t;
    const go = () => commitSpacing(spacingInput.value);
    spacingInput.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(go, 100);
    });
    spacingInput.addEventListener("change", go);
    spacingInput.addEventListener("blur", go);
    spacingInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        go();
        spacingInput.blur();
      }
    });
  }

  show(weightBtn);
  hide(weightList);
  hide(spacingList);
}
