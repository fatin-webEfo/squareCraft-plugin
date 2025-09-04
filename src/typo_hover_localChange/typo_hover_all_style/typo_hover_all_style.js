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
  function scopeOf(base) {
    return base?.closest?.("[data-hover-typo-all]") || root;
  }
  function currentWeightList(base) {
    return scopeOf(base).querySelector(weightListSel);
  }
  function currentWeightBtn(base) {
    return scopeOf(base).querySelector(weightBtnSel);
  }
  function currentSpacingBtn(base) {
    return scopeOf(base).querySelector(spacingBtnSel);
  }
  function currentSpacingWrap(base) {
    const b = currentSpacingBtn(base);
    return b?.closest(
      ".sc-flex.sc-text-color-white.sc-justify-between.sc-col-span-4.sc-rounded-4px.sc-items-center"
    );
  }
  function currentSpacingList(base) {
    return currentSpacingWrap(base)?.querySelector(".sc-absolute");
  }
  function currentSpacingInput(base) {
    return scopeOf(base).querySelector(spacingInputSel);
  }
  root.addEventListener(
    "pointerdown",
    (e) => {
      const wb = e.target.closest(weightBtnSel);
      if (wb) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const list = currentWeightList(wb);
        toggle(list);
        const arrow = wb.querySelector("img,svg");
        if (arrow)
          arrow.classList.toggle(
            "sc-rotate-180",
            !list?.classList.contains("sc-hidden")
          );
        hide(currentSpacingList(wb));
        return;
      }
      const wi = e.target.closest(`${weightListSel} .sc-dropdown-item`);
      if (wi) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const btn = currentWeightBtn(wi);
        const v = (wi.textContent || "").trim();
        const lbl = btn?.querySelector("p");
        if (lbl) lbl.textContent = ` ${v} `;
        commitWeight(v);
        hide(currentWeightList(wi));
        const arrow = btn?.querySelector("img,svg");
        if (arrow) arrow.classList.add("sc-rotate-180");
        return;
      }
      const sb = e.target.closest(spacingBtnSel);
      if (sb) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggle(currentSpacingList(sb));
        hide(currentWeightList(sb));
        return;
      }
      const sl = currentSpacingList(e.target);
      const si = sl
        ? e.target.closest(
            `#${sl.id || ""} .sc-dropdown-item, .sc-dropdown-item`
          )
        : null;
      if (sl && si && sl.contains(si)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const v = (si.dataset.value ?? si.textContent ?? "").trim();
        const inp = currentSpacingInput(si);
        if (inp) inp.value = v;
        commitLetterSpacing(v);
        hide(sl);
        return;
      }
      const wl = currentWeightList(e.target);
      const wb2 = currentWeightBtn(e.target);
      if (wl && !wl.contains(e.target) && !wb2?.contains(e.target)) hide(wl);
      const sl2 = currentSpacingList(e.target);
      const sb2 = currentSpacingBtn(e.target);
      if (sl2 && !sl2.contains(e.target) && !sb2?.contains(e.target)) hide(sl2);
    },
    true
  );
  const inp = currentSpacingInput(root);
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
  hide(currentWeightList(root));
  hide(currentSpacingList(root));
}
