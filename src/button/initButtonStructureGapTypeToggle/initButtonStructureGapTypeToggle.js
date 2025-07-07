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

  const allAllowedIds = [
    ...marginIds,
    ...paddingIds,
    "button-advance-margin-gap-fill",
    "button-advance-margin-gap-bullet",
    "button-advance-padding-gap-fill",
    "button-advance-padding-gap-bullet",
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

  let activeMarginTab = "button-advance-margin-gap-all";
  let activePaddingTab = "button-advance-padding-gap-all";

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
      activePaddingTab = id;

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


  const sliders = [
    {
      bulletId: "button-advance-margin-gap-bullet",
      fillId: "button-advance-margin-gap-fill",
      tabKey: () => activeMarginTab,
      idMap: {
        "button-advance-margin-gap-top": ["button-structure-margin-top-count"],
        "button-advance-margin-gap-bottom": [
          "button-structure-margin-bottom-count",
        ],
        "button-advance-margin-gap-left": [
          "button-structure-margin-left-count",
        ],
        "button-advance-margin-gap-right": [
          "button-structure-margin-right-count",
        ],
        "button-advance-margin-gap-all": [
          "button-structure-margin-top-count",
          "button-structure-margin-bottom-count",
          "button-structure-margin-left-count",
          "button-structure-margin-right-count",
        ],
      },
    },
    {
      bulletId: "button-advance-padding-gap-bullet",
      fillId: "button-advance-padding-gap-fill",
      tabKey: () => activePaddingTab,
      idMap: {
        "button-advance-padding-gap-top": [
          "button-structure-padding-top-count",
        ],
        "button-advance-padding-gap-bottom": [
          "button-structure-padding-bottom-count",
        ],
        "button-advance-padding-gap-left": [
          "button-structure-padding-left-count",
        ],
        "button-advance-padding-gap-right": [
          "button-structure-padding-right-count",
        ],
        "button-advance-padding-gap-all": [
          "button-structure-padding-top-count",
          "button-structure-padding-bottom-count",
          "button-structure-padding-left-count",
          "button-structure-padding-right-count",
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
