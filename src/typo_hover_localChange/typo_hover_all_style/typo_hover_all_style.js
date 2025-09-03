export function initHoverTypoAllFontControls(selectedOrGetter) {
  const section = document.getElementById("typo-all-hover-font-section");
  if (!section || section.dataset.hoverAllFontBound === "1") return;
  section.dataset.hoverAllFontBound = "1";

  const getSelectedElement = () =>
    typeof selectedOrGetter === "function"
      ? selectedOrGetter()
      : selectedOrGetter;

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
  const spacingDropdown =
    spacingToggle?.parentElement?.parentElement?.querySelector(".sc-absolute");

  const open = (el) => el && el.classList.remove("sc-hidden");
  const close = (el) => el && el.classList.add("sc-hidden");
  const toggle = (el) => el && el.classList.toggle("sc-hidden");

  function applyToSelected(styleObj) {
    const el = getSelectedElement();
    if (!el) return;
    const setAll = (node) =>
      Object.entries(styleObj).forEach(([k, v]) =>
        node.style.setProperty(k, v, "important")
      );
    setAll(el);
    el.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a").forEach(setAll);
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
      const raw = (item.dataset.value ?? item.textContent ?? "").trim();
      if (!raw) return;
      const px = /^\-?\d+(\.\d+)?$/.test(raw) ? `${raw}px` : raw;
      if (spacingInput) spacingInput.value = raw;
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
