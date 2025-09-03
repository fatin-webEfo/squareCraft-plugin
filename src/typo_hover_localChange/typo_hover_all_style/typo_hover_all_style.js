export function initHoverTypoAllFontControls(getSelectedElement) {
  const section = document.getElementById("typo-all-hover-font-section");
  if (!section || section.dataset.hoverAllFontBound === "1") return;
  section.dataset.hoverAllFontBound = "1";

  // ---------- selectors (keep your original var names) ----------
  const weightButton = section.querySelector(
    "#hover-typo-allSelect-font-weight"
  );
  const weightList = section.querySelector(
    "#hover-typo-allSelect-font-weight-list"
  );
  const weightLabel = weightButton?.querySelector("p");

  const spacingWrapper = section.querySelector(
    ".sc-flex.sc-text-color-white.sc-justify-between.sc-col-span-4.sc-rounded-4px.sc-items-center"
  );
  const spacingInput = spacingWrapper?.querySelector(".sc-font-size-input");
  const spacingToggle = spacingWrapper?.querySelector(
    "#hover-typo-allSelect-letter-spacing"
  );
  const spacingDropdown =
    spacingWrapper?.querySelector(":scope > .sc-absolute") ||
    spacingWrapper?.querySelector(".sc-absolute");

  // ---------- helpers ----------
  const open = (el) => el && el.classList.remove("sc-hidden");
  const close = (el) => el && el.classList.add("sc-hidden");
  const toggle = (el) => el && el.classList.toggle("sc-hidden");
  const closeAll = () => {
    close(weightList);
    close(spacingDropdown);
  };

  function applyToSelected(styleObj, alsoScope = false) {
    const el = getSelectedElement?.();
    if (!el) return;

    // inline quick apply
    Object.entries(styleObj).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        el.style.setProperty(k, v, "important");
      }
    });

    // scoped style (affects text inside)
    if (alsoScope && el.id) {
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

    // event hook (optional)
    try {
      document.dispatchEvent(
        new CustomEvent("typo:hover-all:update", {
          detail: { target: el, style: styleObj },
        })
      );
    } catch {}
  }

  // ---------- Font weight dropdown ----------
  if (weightButton && weightList) {
    weightButton.addEventListener("click", (e) => {
      e.stopPropagation();
      // simple toggle
      toggle(weightList);
      // close the other dropdown if opened
      if (!weightList.classList.contains("sc-hidden")) close(spacingDropdown);
    });

    weightList.addEventListener("click", (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const val = (item.textContent || "").trim(); // e.g. "400"
      if (!val) return;

      if (weightLabel) weightLabel.textContent = ` ${val} `;
      // realtime apply + scoped so it affects nested text
      applyToSelected({ "font-weight": val }, true);
      close(weightList);
    });
  }

  // ---------- Letter spacing input ----------
  if (spacingInput) {
    const toPx = (v) => {
      const s = String(v ?? "").trim();
      if (s === "") return "";
      if (/^-?\d+(\.\d+)?(px)?$/i.test(s))
        return s.endsWith("px") ? s : `${s}px`;
      return s; // allow custom units like em, rem, etc.
    };

    let timer;
    const commit = () => {
      const raw = spacingInput.value.trim();
      if (!raw) return;
      const px = /^\-?\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
      // realtime apply + scoped
      applyToSelected({ "letter-spacing": toPx(px) }, true);
    };

    spacingInput.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(commit, 120);
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

  // ---------- Letter spacing preset dropdown ----------
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

      if (spacingInput) spacingInput.value = val;
      const px = /^\-?\d+(\.\d+)?$/.test(val) ? `${val}px` : val;
      // realtime apply + scoped
      applyToSelected({ "letter-spacing": px }, true);
      close(spacingDropdown);
    });
  }

  // ---------- Global close handlers ----------
  document.addEventListener("click", (e) => {
    if (!section.contains(e.target)) closeAll();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}
