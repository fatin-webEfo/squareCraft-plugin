export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") return;
  document.body.dataset.scHoverTypoAllBound = "1";

  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;
  const root = document.getElementById("sc-widget-container") || document;

  const weightBtn = root.querySelector("#hover-typo-allSelect-font-weight");
  const weightList = root.querySelector(
    "#hover-typo-allSelect-font-weight-list"
  );
  const weightLabel = weightBtn?.querySelector("p");

  const spacingBtn = root.querySelector("#hover-typo-allSelect-letter-spacing");
  const spacingWrap = spacingBtn?.closest(
    ".sc-flex.sc-text-color-white.sc-justify-between.sc-col-span-4.sc-rounded-4px.sc-items-center"
  );
  const spacingList = spacingWrap?.querySelector(".sc-absolute");
  const spacingInput = root.querySelector(
    "#typo-all-hover-font-section .sc-font-size-input"
  );

  const show = (el) => el && el.classList.remove("sc-hidden");
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

  const commitSpacing = (v) => {
    if (v == null) return;
    const val = /^\-?\d+(\.\d+)?$/.test(String(v).trim())
      ? `${String(v).trim()}px`
      : String(v).trim();
    apply({ "letter-spacing": val });
  };

  weightBtn?.addEventListener(
    "mousedown",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle(weightList);
      hide(spacingList);
    },
    true
  );

  spacingBtn?.addEventListener(
    "mousedown",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle(spacingList);
      hide(weightList);
    },
    true
  );

  root.addEventListener(
    "mousedown",
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
    "mousedown",
    (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const v = (item.textContent || "").trim();
      if (weightLabel) weightLabel.textContent = ` ${v} `;
      apply({ "font-weight": v });
      hide(weightList);
      e.stopPropagation();
    },
    true
  );

  spacingList?.addEventListener(
    "mousedown",
    (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const v = (item.dataset.value ?? item.textContent ?? "").trim();
      if (spacingInput) spacingInput.value = v;
      commitSpacing(v);
      hide(spacingList);
      e.stopPropagation();
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
