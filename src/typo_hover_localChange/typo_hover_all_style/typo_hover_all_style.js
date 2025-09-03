export function initHoverTypoAllFontControls(selectedOrGetter) {
  const section = document.getElementById("typo-all-hover-font-section");
  if (!section || section.dataset.hoverAllFontBound === "1") return;
  section.dataset.hoverAllFontBound = "1";

  const getSelectedElement = () =>
    typeof selectedOrGetter === "function"
      ? selectedOrGetter()
      : selectedOrGetter;

  const weightButton = section.querySelector(
    "#hover-typo-allSelect-font-weight"
  );
  const weightList = section.querySelector(
    "#hover-typo-allSelect-font-weight-list"
  );
  const weightLabel = weightButton?.querySelector("p");

  const spacingToggle = section.querySelector(
    "#hover-typo-allSelect-letter-spacing"
  );
  const spacingGroup = spacingToggle?.closest(
    ".sc-flex.sc-text-color-white.sc-justify-between.sc-col-span-4.sc-rounded-4px.sc-items-center"
  );
  const spacingInput = spacingGroup?.querySelector(".sc-font-size-input");
  const spacingDropdown = spacingGroup?.querySelector(".sc-absolute");

  const open = (el) => el && el.classList.remove("sc-hidden");
  const close = (el) => el && el.classList.add("sc-hidden");
  const toggle = (el) => el && el.classList.toggle("sc-hidden");
  const closeAll = () => {
    close(weightList);
    close(spacingDropdown);
  };

  function applyToSelected(styleObj) {
    const el = getSelectedElement();
    if (!el) return;
    Object.entries(styleObj).forEach(([k, v]) =>
      el.style.setProperty(k, v, "important")
    );
    if (el.id) {
      const id = el.id;
      const styleId = `sc-hover-typo-scope-${id}`;
      let tag = document.getElementById(styleId);
      if (!tag) {
        tag = document.createElement("style");
        tag.id = styleId;
        document.head.appendChild(tag);
      }
      const rules = Object.entries(styleObj)
        .map(([k, v]) => `${k}: ${v} !important;`)
        .join(" ");
      const esc = CSS.escape(id);
      tag.textContent = `
        #${esc},
        #${esc} h1, #${esc} h2, #${esc} h3, #${esc} h4, #${esc} h5, #${esc} h6,
        #${esc} p, #${esc} span, #${esc} a { ${rules} }
      `;
    }
  }

  if (weightButton && weightList) {
    weightButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle(weightList);
      if (!weightList.classList.contains("sc-hidden")) close(spacingDropdown);
    });
    weightList.addEventListener("click", (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const val = (item.textContent || "").trim();
      if (!val) return;
      if (weightLabel) weightLabel.textContent = ` ${val} `;
      applyToSelected({ "font-weight": val });
      close(weightList);
    });
  }

  if (spacingToggle && spacingDropdown) {
    spacingToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle(spacingDropdown);
      if (!spacingDropdown.classList.contains("sc-hidden")) close(weightList);
    });
    spacingDropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const val = (item.dataset.value ?? item.textContent ?? "").trim();
      if (!val) return;
      const px = /^\-?\d+(\.\d+)?$/.test(val) ? `${val}px` : val;
      if (spacingInput) spacingInput.value = val;
      applyToSelected({ "letter-spacing": px });
      close(spacingDropdown);
    });
  }

  if (spacingInput) {
    const toPx = (v) => {
      const s = String(v ?? "").trim();
      if (s === "") return "";
      if (/^-?\d+(\.\d+)?(px)?$/i.test(s))
        return s.endsWith("px") ? s : `${s}px`;
      return s;
    };
    let t;
    const commit = () => {
      const raw = spacingInput.value.trim();
      if (!raw) return;
      const px = /^\-?\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
      applyToSelected({ "letter-spacing": toPx(px) });
    };
    spacingInput.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(commit, 120);
    });
    spacingInput.addEventListener("change", commit);
    spacingInput.addEventListener("blur", commit);
    spacingInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        commit();
        spacingInput.blur();
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (!section.contains(e.target)) closeAll();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}
