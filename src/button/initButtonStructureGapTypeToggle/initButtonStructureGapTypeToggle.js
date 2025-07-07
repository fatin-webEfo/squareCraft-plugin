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

  const allAllowedIds = [...marginIds, ...paddingIds];

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

  function setTabHeight(active = true) {
    const tabWrapper = document.getElementById("tabContentWrapper");
    if (!tabWrapper) return;

    tabWrapper.classList.remove("sc-h-350", "sc-h-375");
    tabWrapper.classList.add(active ? "sc-h-375" : "sc-h-350");
  }

  marginIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", (e) => {
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

      setTabHeight(true);
    });
  });

  paddingIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", (e) => {
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

      setTabHeight(true);
    });
  });

  document.addEventListener("click", (e) => {
    const clickedId = e.target?.id;
    if (!allAllowedIds.includes(clickedId)) {
      setTabHeight(false);
    }
  });
}
