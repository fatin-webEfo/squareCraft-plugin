export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") return;
  document.body.dataset.scHoverTypoAllBound = "1";

  const root = document.getElementById("sc-widget-container") || document;
  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;

  function ensureId(el) {
    if (!el.id) el.id = "sc-el-" + Math.random().toString(36).slice(2, 9);
    return el.id;
  }

  function targetsForAll(id) {
    const list = [
      `#${id} h1`,
      `#${id} h2`,
      `#${id} h3`,
      `#${id} h4`,
      `#${id} p.sqsrte-large`,
      `#${id} p:not(.sqsrte-large):not(.sqsrte-small)`,
      `#${id} p.sqsrte-small`,
    ];
    return list.flatMap((t) => [t, `${t} span`, `${t} a`]).concat([`#${id}`]);
  }

  function applyExternalAll(styles) {
    const el = sel?.();
    if (!el) return;
    const id = ensureId(el);
    const tagId = `style-${id}`;
    let tag = document.getElementById(tagId);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = tagId;
      document.head.appendChild(tag);
    }
    const bag = (window.__sc_extcss ||= {});
    bag[id] = Object.assign({}, bag[id] || {}, styles);
    const cssBody = Object.entries(bag[id])
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join(" ");
    tag.textContent = `${targetsForAll(id).join(", ")} { ${cssBody} }`;
  }

  function commitWeight(val) {
    const v = String(val || "").trim();
    if (!v) return;
    applyExternalAll({ "font-weight": v });
  }

  function commitSpacing(raw) {
    if (raw == null) return;
    const s = String(raw).trim();
    if (!s) return;
    const v = /^\-?\d+(\.\d+)?$/.test(s) ? `${s}px` : s;
    applyExternalAll({ "letter-spacing": v });
  }

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

  function hide(el) {
    if (el && !el.classList.contains("sc-hidden"))
      el.classList.add("sc-hidden");
  }
  function toggle(el) {
    if (el) el.classList.toggle("sc-hidden");
  }
  function rotateDown(el, on) {
    if (!el) return;
    el.classList[on ? "add" : "remove"]("sc-rotate-180");
  }

  root.addEventListener(
    "pointerdown",
    (e) => {
      const btnW = e.target.closest("#hover-typo-allSelect-font-weight");
      const btnS = e.target.closest("#hover-typo-allSelect-letter-spacing");
      const itemW = e.target.closest(
        "#hover-typo-allSelect-font-weight-list .sc-dropdown-item"
      );
      const itemS =
        spacingList &&
        e.target.closest(`#${spacingList.id || ""} .sc-dropdown-item`);

      if (btnW) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggle(weightList);
        hide(spacingList);
        rotateDown(
          btnW.querySelector("img,svg"),
          !weightList?.classList.contains("sc-hidden")
        );
        return;
      }

      if (btnS) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggle(spacingList);
        hide(weightList);
        return;
      }

      if (itemW) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const v = (itemW.textContent || "").trim();
        if (weightLabel) weightLabel.textContent = ` ${v} `;
        commitWeight(v);
        hide(weightList);
        rotateDown(
          root.querySelector(
            "#hover-typo-allSelect-font-weight img, #hover-typo-allSelect-font-weight svg"
          ),
          true
        );
        return;
      }

      if (itemS) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const v = (itemS.dataset.value ?? itemS.textContent ?? "").trim();
        if (spacingInput) spacingInput.value = v;
        commitSpacing(v);
        hide(spacingList);
        return;
      }

      if (
        (weightList &&
          !weightList.contains(e.target) &&
          !weightBtn?.contains(e.target)) ||
        (spacingList &&
          !spacingList.contains(e.target) &&
          !spacingBtn?.contains(e.target))
      ) {
        hide(weightList);
        rotateDown(
          root.querySelector(
            "#hover-typo-allSelect-font-weight img, #hover-typo-allSelect-font-weight svg"
          ),
          true
        );
        hide(spacingList);
      }
    },
    true
  );

  if (spacingInput && !spacingInput.dataset.bound) {
    spacingInput.dataset.bound = "1";
    let t;
    const go = () => commitSpacing(spacingInput.value);
    spacingInput.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(go, 120);
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

  hide(weightList);
  hide(spacingList);

  try {
    const el = sel?.();
    const primary = el?.querySelector?.("h1,h2,h3,h4,p");
    if (primary && typeof getHoverTextType === "function")
      getHoverTextType(primary.tagName.toLowerCase(), primary);
  } catch {}
}
