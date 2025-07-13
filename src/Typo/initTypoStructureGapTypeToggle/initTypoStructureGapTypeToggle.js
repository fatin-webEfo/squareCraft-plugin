export function initTypoStructureGapTypeToggle() {
  const marginIds = [
    "Typo-advance-margin-gap-all",
    "Typo-advance-margin-gap-top",
    "Typo-advance-margin-gap-bottom",
    "Typo-advance-margin-gap-left",
    "Typo-advance-margin-gap-right",
  ];

  const paddingIds = [
    "Typo-advance-padding-gap-all",
    "Typo-advance-padding-gap-top",
    "Typo-advance-padding-gap-bottom",
    "Typo-advance-padding-gap-left",
    "Typo-advance-padding-gap-right",
  ];

  const allAllowedIds = [
    ...marginIds,
    ...paddingIds,
    "Typo-advance-margin-gap-fill",
    "Typo-advance-margin-gap-bullet",
    "Typo-advance-padding-gap-fill",
    "Typo-advance-padding-gap-bullet",
  ];

  const marginFillIds = {
    "Typo-advance-margin-gap-all": [
      "Typo-structure-margin-top-fill",
      "Typo-structure-margin-bottom-fill",
      "Typo-structure-margin-left-fill",
      "Typo-structure-margin-right-fill",
    ],
    "Typo-advance-margin-gap-top": ["Typo-structure-margin-top-fill"],
    "Typo-advance-margin-gap-bottom": ["Typo-structure-margin-bottom-fill"],
    "Typo-advance-margin-gap-left": ["Typo-structure-margin-left-fill"],
    "Typo-advance-margin-gap-right": ["Typo-structure-margin-right-fill"],
  };

  const paddingFillIds = {
    "Typo-advance-padding-gap-all": [
      "Typo-structure-padding-top",
      "Typo-structure-padding-bottom",
      "Typo-structure-padding-left",
      "Typo-structure-padding-right",
    ],
    "Typo-advance-padding-gap-top": ["Typo-structure-padding-top"],
    "Typo-advance-padding-gap-bottom": ["Typo-structure-padding-bottom"],
    "Typo-advance-padding-gap-left": ["Typo-structure-padding-left"],
    "Typo-advance-padding-gap-right": ["Typo-structure-padding-right"],
  };

  let activeMarginTab = "Typo-advance-margin-gap-all";
  let activePaddingTab = "Typo-advance-padding-gap-all";

  function setTabHeight(active = true) {
    const tabWrapper = document.getElementById("tabContentWrapper");
    if (!tabWrapper) return;
    tabWrapper.classList.add("sc-transition-all");
    tabWrapper.classList.remove("sc-h-350", "sc-h-375");
    tabWrapper.classList.add(active ? "sc-h-375" : "sc-h-350");
  }

  marginIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", () => {
      activeMarginTab = id;

      marginIds.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");

      const allMarginFills = [
        "Typo-structure-margin-top-fill",
        "Typo-structure-margin-bottom-fill",
        "Typo-structure-margin-left-fill",
        "Typo-structure-margin-right-fill",
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

      const fillBar = document.getElementById("Typo-advance-margin-gap-fill");
      const bullet = document.getElementById(
        "Typo-advance-margin-gap-bullet"
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
      activePaddingTab = id;

      paddingIds.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) btn.classList.remove("sc-bg-454545");
      });
      el.classList.add("sc-bg-454545");

      const allPaddingFills = [
        "Typo-structure-padding-top",
        "Typo-structure-padding-bottom",
        "Typo-structure-padding-left",
        "Typo-structure-padding-right",
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

  const sliders = [
    {
      bulletId: "Typo-advance-margin-gap-bullet",
      fillId: "Typo-advance-margin-gap-fill",
      tabKey: () => activeMarginTab,
      idMap: {
        "Typo-advance-margin-gap-top": ["Typo-structure-margin-top-count"],
        "Typo-advance-margin-gap-bottom": [
          "Typo-structure-margin-bottom-count",
        ],
        "Typo-advance-margin-gap-left": [
          "Typo-structure-margin-left-count",
        ],
        "Typo-advance-margin-gap-right": [
          "Typo-structure-margin-right-count",
        ],
        "Typo-advance-margin-gap-all": [
          "Typo-structure-margin-top-count",
          "Typo-structure-margin-bottom-count",
          "Typo-structure-margin-left-count",
          "Typo-structure-margin-right-count",
        ],
      },
    },
    {
      bulletId: "Typo-advance-padding-gap-bullet",
      fillId: "Typo-advance-padding-gap-fill",
      tabKey: () => activePaddingTab,
      idMap: {
        "Typo-advance-padding-gap-top": [
          "Typo-structure-padding-top-count",
        ],
        "Typo-advance-padding-gap-bottom": [
          "Typo-structure-padding-bottom-count",
        ],
        "Typo-advance-padding-gap-left": [
          "Typo-structure-padding-left-count",
        ],
        "Typo-advance-padding-gap-right": [
          "Typo-structure-padding-right-count",
        ],
        "Typo-advance-padding-gap-all": [
          "Typo-structure-padding-top-count",
          "Typo-structure-padding-bottom-count",
          "Typo-structure-padding-left-count",
          "Typo-structure-padding-right-count",
        ],
      },
    },
  ];

  sliders.forEach(({ bulletId, fillId, tabKey, idMap }) => {
    const bullet = document.getElementById(bulletId);
    const fill = document.getElementById(fillId);
    const bar = bullet?.parentElement;
    if (!bullet || !fill || !bar) return;

    let isDragging = false;

    const onMouseMove = (e) => {
      if (!isDragging) return;
      setTabHeight(true);
      const rect = bar.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;

      const value = Math.round((percent / 100) * 100);
      const activeTab = tabKey();
      const countIds = idMap[activeTab] || [];

      countIds.forEach((id) => {
        if (typeof window.initTypoAdvanceStructureStyles === "function") {
          window.initTypoAdvanceStructureStyles(() =>
            document.getElementById(selectedBlockId)
          );
        }

        const el = document.getElementById(id);
        if (el) el.innerText = `${value}px`;
      });
    };

    const stopDrag = () => {
      isDragging = false;
      setTabHeight(true);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopDrag);
    };

    bullet.addEventListener("mousedown", () => {
      isDragging = true;
      setTabHeight(true);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopDrag);
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInsideAllowed = allAllowedIds.some((id) => {
      const el = document.getElementById(id);
      return el && el.contains(e.target);
    });

    if (!clickedInsideAllowed) {
      setTabHeight(false);
    }
  });
}
