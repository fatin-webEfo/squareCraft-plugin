
export function initHoverTypoAllFontControls(getSelectedElement) {
  const section = document.getElementById("typo-all-hover-font-section");
  if (!section || section.dataset.hoverAllFontBound === "1") return;
  section.dataset.hoverAllFontBound = "1";

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

  const applyToSelected = (styleObj) => {
    const el = getSelectedElement?.();
    if (!el) return;

    Object.entries(styleObj).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      el.style.setProperty(k, v, "important");
    });

    try {
      document.dispatchEvent(
        new CustomEvent("typo:hover-all:update", {
          detail: { target: el, style: styleObj },
        })
      );
    } catch (err) {console.error(err);}
  };

  const toggleHidden = (el, show) => {
    if (!el) return;
    if (show === undefined) {
      el.classList.toggle("sc-hidden");
    } else {
      el.classList.toggle("sc-hidden", !show);
    }
  };

  const closeAllDropdowns = (exceptEl) => {
    [weightList, spacingDropdown].forEach((el) => {
      if (el && el !== exceptEl) el.classList.add("sc-hidden");
    });
  };

  if (weightButton && weightList && weightLabel) {
    weightButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const willShow = weightList.classList.contains("sc-hidden");
      closeAllDropdowns(willShow ? weightList : null);
      toggleHidden(weightList, willShow);
    });

    weightList.addEventListener("click", (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const val = (item.textContent || "").trim();
      if (!val) return;

      weightLabel.textContent = ` ${val} `;
      applyToSelected({ "font-weight": val });
      toggleHidden(weightList, false);
    });
  }


  if (spacingInput) {
    const toPx = (v) => {
      if (v == null) return "";
      const s = String(v).trim();
      if (s === "") return "";
      if (/^-?\d+(\.\d+)?px$/i.test(s)) return s;
      if (/^-?\d+(\.\d+)?$/.test(s)) return `${s}px`;
      return s;
    };

    let typingTimer;
    const COMMIT_DELAY = 120;

    const commit = () => {
      const px = toPx(spacingInput.value);
      if (/^-?\d+(\.\d+)?(px)?$/i.test(spacingInput.value.trim())) {
        applyToSelected({ "letter-spacing": px });
      }
    };

    spacingInput.addEventListener("input", () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(commit, COMMIT_DELAY);
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

  if (spacingToggle && spacingDropdown) {
    spacingToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const willShow = spacingDropdown.classList.contains("sc-hidden");
      closeAllDropdowns(willShow ? spacingDropdown : null);
      toggleHidden(spacingDropdown, willShow);
    });

    spacingDropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".sc-dropdown-item");
      if (!item) return;
      const val = (item.dataset.value ?? item.textContent ?? "").trim();
      if (!val) return;
      if (spacingInput) spacingInput.value = val;
      const px = /^\-?\d+(\.\d+)?$/.test(val) ? `${val}px` : val;
      applyToSelected({ "letter-spacing": px });

      toggleHidden(spacingDropdown, false);
    });
  }

  document.addEventListener("click", (e) => {
    if (!section.contains(e.target)) {
      closeAllDropdowns(null);
    }
  });
}
