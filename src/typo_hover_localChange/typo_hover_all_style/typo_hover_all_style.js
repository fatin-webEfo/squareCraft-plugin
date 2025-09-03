export function initHoverTypoAllFontControls(selectedOrGetter) {
  const section = document.getElementById("typo-all-hover-font-section");
  if (!section) return;

  const getSelectedElement =
    typeof selectedOrGetter === "function"
      ? selectedOrGetter
      : () => selectedOrGetter;

  const weightButton = document.getElementById(
    "hover-typo-allSelect-font-weight"
  );
  const weightList = document.getElementById(
    "hover-typo-allSelect-font-weight-list"
  );
  const weightLabel = weightButton?.querySelector("p");

  const spacingToggle = document.getElementById(
    "hover-typo-allSelect-letter-spacing"
  );
  const spacingInput = section.querySelector(".sc-font-size-input");
  const spacingWrapper = spacingToggle?.closest(
    ".sc-flex.sc-text-color-white.sc-justify-between.sc-col-span-4.sc-rounded-4px.sc-items-center"
  );
  const spacingDropdown = spacingWrapper?.querySelector(
    ":scope > .sc-absolute"
  );

  if (section.dataset.scBound === "1") return;
  section.dataset.scBound = "1";

  const applyToSelected = (styleObj) => {
    const el = getSelectedElement?.();
    if (!el) return;
    const setAll = (node) => {
      Object.entries(styleObj).forEach(([k, v]) =>
        node.style.setProperty(k, v, "important")
      );
    };
    setAll(el);
    el.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a").forEach(setAll);
  };

  const toggle = (el) => el && el.classList.toggle("sc-hidden");
  const close = (el) => el && el.classList.add("sc-hidden");

  if (weightButton && weightList) {
    if (!weightButton.dataset.bound) {
      weightButton.dataset.bound = "1";
      weightButton.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          toggle(weightList);
          close(spacingDropdown);
        },
        true
      );
    }

    if (!weightList.dataset.bound) {
      weightList.dataset.bound = "1";
      weightList.addEventListener(
        "click",
        (e) => {
          const item = e.target.closest(".sc-dropdown-item");
          if (!item) return;
          const val = (item.textContent || "").trim();
          if (!val) return;
          if (weightLabel) weightLabel.textContent = ` ${val} `;
          applyToSelected({ "font-weight": val });
          close(weightList);
        },
        true
      );
    }
  }

  if (spacingToggle && spacingDropdown) {
    if (!spacingToggle.dataset.bound) {
      spacingToggle.dataset.bound = "1";
      spacingToggle.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          toggle(spacingDropdown);
          close(weightList);
        },
        true
      );
    }

    if (!spacingDropdown.dataset.bound) {
      spacingDropdown.dataset.bound = "1";
      spacingDropdown.addEventListener(
        "click",
        (e) => {
          const item = e.target.closest(".sc-dropdown-item");
          if (!item) return;
          const raw = (item.dataset.value ?? item.textContent ?? "").trim();
          if (!raw) return;
          const px = /^\-?\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
          if (spacingInput) spacingInput.value = raw;
          applyToSelected({ "letter-spacing": px });
          close(spacingDropdown);
        },
        true
      );
    }
  }

  if (spacingInput && !spacingInput.dataset.bound) {
    spacingInput.dataset.bound = "1";
    let t;
    const commit = () => {
      const raw = spacingInput.value.trim();
      if (!raw) return;
      const px = /^\-?\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
      applyToSelected({ "letter-spacing": px });
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

  if (!section.dataset.closeBound) {
    section.dataset.closeBound = "1";
    document.addEventListener("click", (e) => {
      if (!section.contains(e.target)) {
        close(weightList);
        close(spacingDropdown);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        close(weightList);
        close(spacingDropdown);
      }
    });
  }
}
