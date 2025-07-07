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

  const marginCountIds = {
    "button-advance-margin-gap-all": [
      "button-structure-margin-top-count",
      "button-structure-margin-bottom-count",
      "button-structure-margin-left-count",
      "button-structure-margin-right-count",
    ],
    "button-advance-margin-gap-top": ["button-structure-margin-top-count"],
    "button-advance-margin-gap-bottom": [
      "button-structure-margin-bottom-count",
    ],
    "button-advance-margin-gap-left": ["button-structure-margin-left-count"],
    "button-advance-margin-gap-right": ["button-structure-margin-right-count"],
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

  const paddingCountIds = {
    "button-advance-padding-gap-all": [
      "button-structure-padding-top-count",
      "button-structure-padding-bottom-count",
      "button-structure-padding-left-count",
      "button-structure-padding-right-count",
    ],
    "button-advance-padding-gap-top": ["button-structure-padding-top-count"],
    "button-advance-padding-gap-bottom": [
      "button-structure-padding-bottom-count",
    ],
    "button-advance-padding-gap-left": ["button-structure-padding-left-count"],
    "button-advance-padding-gap-right": [
      "button-structure-padding-right-count",
    ],
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

    el.addEventListener("click", () => {
      marginIds.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");

      const allFills = [
        "button-structure-margin-top-fill",
        "button-structure-margin-bottom-fill",
        "button-structure-margin-left-fill",
        "button-structure-margin-right-fill",
      ];
      const allCounts = [
        "button-structure-margin-top-count",
        "button-structure-margin-bottom-count",
        "button-structure-margin-left-count",
        "button-structure-margin-right-count",
      ];
      allFills.forEach((id) => {
        const fill = document.getElementById(id);
        if (fill) fill.style.display = "none";
      });
      allCounts.forEach((id) => {
        const count = document.getElementById(id);
        if (count) count.style.display = "none";
      });

      const activeFills = marginFillIds[id] || [];
      const activeCounts = marginCountIds[id] || [];
      activeFills.forEach((fillId) => {
        const fill = document.getElementById(fillId);
        if (fill) fill.style.display = "block";
      });
      activeCounts.forEach((countId) => {
        const count = document.getElementById(countId);
        if (count) count.style.display = "block";
      });

      const fillBar = document.getElementById("button-advance-margin-gap-fill");
      const bullet = document.getElementById(
        "button-advance-margin-gap-bullet"
      );
      if (fillBar) fillBar.style.display = "block";
      if (bullet) bullet.style.display = "block";

      setTabHeight(true);
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

      const allFills = [
        "button-structure-padding-top",
        "button-structure-padding-bottom",
        "button-structure-padding-left",
        "button-structure-padding-right",
      ];
      const allCounts = [
        "button-structure-padding-top-count",
        "button-structure-padding-bottom-count",
        "button-structure-padding-left-count",
        "button-structure-padding-right-count",
      ];
      allFills.forEach((id) => {
        const fill = document.getElementById(id);
        if (fill) fill.style.display = "none";
      });
      allCounts.forEach((id) => {
        const count = document.getElementById(id);
        if (count) count.style.display = "none";
      });

      const activeFills = paddingFillIds[id] || [];
      const activeCounts = paddingCountIds[id] || [];
      activeFills.forEach((fillId) => {
        const fill = document.getElementById(fillId);
        if (fill) fill.style.display = "block";
      });
      activeCounts.forEach((countId) => {
        const count = document.getElementById(countId);
        if (count) count.style.display = "block";
      });

      setTabHeight(true);
    });
  });

  document.addEventListener("click", (e) => {
    const clickedButton = e.target.closest("div[id]");
    const clickedId = clickedButton?.id;
    if (!allAllowedIds.includes(clickedId)) {
      setTabHeight(false);
    }
  });
}
