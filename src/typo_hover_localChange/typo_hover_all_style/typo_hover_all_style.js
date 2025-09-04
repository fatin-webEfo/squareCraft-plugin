export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") return;
  document.body.dataset.scHoverTypoAllBound = "1";
  const root = document.getElementById("sc-widget-container") || document;
  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;
  const TYPE_TO_SELECTOR = {
    heading1: "h1",
    heading2: "h2",
    heading3: "h3",
    heading4: "h4",
    paragraph1: "p.sqsrte-large",
    paragraph2: "p:not(.sqsrte-large):not(.sqsrte-small)",
    paragraph3: "p.sqsrte-small",
  };
  function ensureId(el) {
    if (!el.id) el.id = "sc-el-" + Math.random().toString(36).slice(2, 9);
    return el.id;
  }
  function allTypeSelectors(scopeId) {
    const base = Object.values(TYPE_TO_SELECTOR).map((s) => `#${scopeId} ${s}`);
    const withDesc = base.flatMap((s) => [s, `${s} span`, `${s} a`]);
    return [`#${scopeId}`, ...withDesc];
  }
  function writeExternal(styles) {
    const host = sel?.();
    if (!host) return;
    const id = ensureId(host);
    const tagId = `style-${id}`;
    let tag = document.getElementById(tagId);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = tagId;
      document.head.appendChild(tag);
    }
    const bag = (window.__sc_extcss ||= {});
    bag[id] = Object.assign({}, bag[id] || {}, styles);
    const body = Object.entries(bag[id])
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join(" ");
    tag.textContent = `${allTypeSelectors(id).join(", ")} { ${body} }`;
  }
  function commitWeight(v) {
    const val = String(v || "").trim();
    if (!val) return;
    writeExternal({ "font-weight": val });
  }
  function commitLetterSpacing(raw) {
    if (raw == null) return;
    const s = String(raw).trim();
    if (!s) return;
    const val = /^\-?\d+(\.\d+)?$/.test(s) ? `${s}px` : s;
    writeExternal({ "letter-spacing": val });
  }
  const weightBtnSel = "#hover-typo-allSelect-font-weight";
  const weightListSel = "#hover-typo-allSelect-font-weight-list";
  const spacingBtnSel = "#hover-typo-allSelect-letter-spacing";
  const spacingInputSel = "#typo-all-hover-font-section .sc-font-size-input";
  function el(s) {
    return root.querySelector(s);
  }
  function show(elm) {
    if (elm && elm.classList.contains("sc-hidden"))
      elm.classList.remove("sc-hidden");
  }
  function hide(elm) {
    if (elm && !elm.classList.contains("sc-hidden"))
      elm.classList.add("sc-hidden");
  }
  function toggle(elm) {
    if (!elm) return;
    elm.classList.toggle("sc-hidden");
  }
  function currentWeightList() {
    return el(weightListSel);
  }
  function currentWeightBtn() {
    return el(weightBtnSel);
  }
  function currentSpacingBtn() {
    return el(spacingBtnSel);
  }
  function currentSpacingWrap() {
    const b = currentSpacingBtn();
    return b?.closest(
      ".sc-flex.sc-text-color-white.sc-justify-between.sc-col-span-4.sc-rounded-4px.sc-items-center"
    );
  }
  function currentSpacingList() {
    return currentSpacingWrap()?.querySelector(".sc-absolute");
  }
  function currentSpacingInput() {
    return el(spacingInputSel);
  }
  root.addEventListener(
    "pointerdown",
    (e) => {
      const wb = e.target.closest(weightBtnSel);
      if (wb) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggle(currentWeightList());
        const arrow = wb.querySelector("img,svg");
        if (arrow)
          arrow.classList.toggle(
            "sc-rotate-180",
            !currentWeightList()?.classList.contains("sc-hidden")
          );
        hide(currentSpacingList());
        return;
      }
      const wi = e.target.closest(`${weightListSel} .sc-dropdown-item`);
      if (wi) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const v = (wi.textContent || "").trim();
        const lbl = currentWeightBtn()?.querySelector("p");
        if (lbl) lbl.textContent = ` ${v} `;
        commitWeight(v);
        hide(currentWeightList());
        const arrow = currentWeightBtn()?.querySelector("img,svg");
        if (arrow) arrow.classList.add("sc-rotate-180");
        return;
      }
      const sb = e.target.closest(spacingBtnSel);
      if (sb) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggle(currentSpacingList());
        hide(currentWeightList());
        return;
      }
      const sl = currentSpacingList();
      const si =
        (sl &&
          e.target.closest(
            `.${sl.classList[0]}.sc-dropdown-item, #${
              sl.id || ""
            } .sc-dropdown-item`
          )) ||
        e.target.closest(".sc-dropdown-item");
      if (sl && si && sl.contains(si)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const v = (si.dataset.value ?? si.textContent ?? "").trim();
        const inp = currentSpacingInput();
        if (inp) inp.value = v;
        commitLetterSpacing(v);
        hide(sl);
        return;
      }
      if (
        currentWeightList() &&
        !currentWeightList().contains(e.target) &&
        !currentWeightBtn()?.contains(e.target)
      )
        hide(currentWeightList());
      if (
        currentSpacingList() &&
        !currentSpacingList().contains(e.target) &&
        !currentSpacingBtn()?.contains(e.target)
      )
        hide(currentSpacingList());
    },
    true
  );
  const inp = currentSpacingInput();
  if (inp && !inp.dataset.bound) {
    inp.dataset.bound = "1";
    let t;
    const go = () => commitLetterSpacing(inp.value);
    inp.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(go, 120);
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
  hide(currentWeightList());
  hide(currentSpacingList());
}
