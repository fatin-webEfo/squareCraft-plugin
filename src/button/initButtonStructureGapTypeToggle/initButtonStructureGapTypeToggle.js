
export function initButtonStructureGapTypeToggle() {
  const marginIds = [
    "button-advance-margin-gap-all",
    "button-advance-margin-gap-top",
    "button-advance-margin-gap-bottom",
    "button-advance-margin-gap-left",
    "button-advance-margin-gap-right",
  ];

  const paddingIds = [
    "button-advance-padding-gap-all",
    "button-advance-padding-gap-top",
    "button-advance-padding-gap-bottom",
    "button-advance-padding-gap-left",
    "button-advance-padding-gap-right",
  ];

  const marginFillIds = {
    "button-advance-margin-gap-all": [
      "button-structure-margin-top-fill",
      "button-structure-margin-bottom-fill",
      "button-structure-margin-left-fill",
      "button-structure-margin-right-fill",
    ],
    "button-advance-margin-gap-top": ["button-structure-margin-top-fill"],
    "button-advance-margin-gap-bottom": ["button-structure-margin-bottom-fill"],
    "button-advance-margin-gap-left": ["button-structure-margin-left-fill"],
    "button-advance-margin-gap-right": ["button-structure-margin-right-fill"],
  };

  const paddingFillIds = {
    "button-advance-padding-gap-all": [
      "button-structure-padding-top",
      "button-structure-padding-bottom",
      "button-structure-padding-left",
      "button-structure-padding-right",
    ],
    "button-advance-padding-gap-top": ["button-structure-padding-top"],
    "button-advance-padding-gap-bottom": ["button-structure-padding-bottom"],
    "button-advance-padding-gap-left": ["button-structure-padding-left"],
    "button-advance-padding-gap-right": ["button-structure-padding-right"],
  };

  function updateTabContentHeight() {
    const tabWrapper = document.getElementById("tabContentWrapper");
    if (tabWrapper && tabWrapper.classList.contains("sc-h-350")) {
      tabWrapper.classList.remove("sc-h-350");
      tabWrapper.classList.add("sc-h-375");
    }
  }

  marginIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", () => {
      marginIds.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");

      const allMarginFills = [
        "button-structure-margin-top-fill",
        "button-structure-margin-bottom-fill",
        "button-structure-margin-left-fill",
        "button-structure-margin-right-fill",
      ];
      allMarginFills.forEach((id) => {
        const fill = document.getElementById(id);
        if (fill) fill.style.display = "none";
      });

      const activeFills = marginFillIds[id] || [];
      activeFills.forEach((fillId) => {
        const fill = document.getElementById(fillId);
        if (fill) fill.style.display = "block";
      });

      updateTabContentHeight();
    });
  });

  paddingIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", () => {
      paddingIds.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");

      const allPaddingFills = [
        "button-structure-padding-top",
        "button-structure-padding-bottom",
        "button-structure-padding-left",
        "button-structure-padding-right",
      ];
      allPaddingFills.forEach((id) => {
        const fill = document.getElementById(id);
        if (fill) fill.style.display = "none";
      });

      const activeFills = paddingFillIds[id] || [];
      activeFills.forEach((fillId) => {
        const fill = document.getElementById(fillId);
        if (fill) fill.style.display = "block";
      });

      updateTabContentHeight();
    });
  });
}
