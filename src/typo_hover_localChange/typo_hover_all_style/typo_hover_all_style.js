export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") return;
  document.body.dataset.scHoverTypoAllBound = "1";

  const root = document.getElementById("sc-widget-container") || document;
  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;

  const ensureId = (el) => {
    if (!el.id) el.id = "sc-" + Math.random().toString(36).slice(2, 8);
    return el.id;
  };

  const applyExternal = (styles) => {
    const el = sel?.();
    if (!el) return;
    const id = ensureId(el);
    const bag = (window.__sc_extcss ||= {});
    const merged = Object.assign(bag[id] || {}, styles);
    bag[id] = merged;
    let tag = document.getElementById(`style-${id}`);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = `style-${id}`;
      document.head.appendChild(tag);
    }
    const body = Object.entries(merged)
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join(" ");
    tag.textContent = `#${id}, #${id} h1, #${id} h2, #${id} h3, #${id} h4, #${id} h5, #${id} h6, #${id} p, #${id} span, #${id} a { ${body} }`;
  };

  root.addEventListener(
    "click",
    (e) => {
      const btn = e.target.closest("#hover-typo-allSelect-font-weight");
      if (btn) {
        const list = root.querySelector(
          "#hover-typo-allSelect-font-weight-list"
        );
        if (list) list.classList.toggle("sc-hidden");
        e.stopImmediatePropagation();
        return;
      }

      const item = e.target.closest(
        "#hover-typo-allSelect-font-weight-list .sc-dropdown-item"
      );
      if (item) {
        const v = (item.textContent || "").trim();
        const label = root.querySelector("#hover-typo-allSelect-font-weight p");
        if (label) label.textContent = ` ${v} `;
        applyExternal({ "font-weight": v });
        const list = root.querySelector(
          "#hover-typo-allSelect-font-weight-list"
        );
        if (list) list.classList.add("sc-hidden");
        e.stopImmediatePropagation();
      }
    },
    true
  );
}
