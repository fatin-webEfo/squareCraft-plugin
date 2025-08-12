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

  // input IDs (your new inputs)
  const marginCountIds = {
    top: "Typo-structure-margin-top-count",
    bottom: "Typo-structure-margin-bottom-count",
    left: "Typo-structure-margin-left-count",
    right: "Typo-structure-margin-right-count",
  };
  const paddingCountIds = {
    top: "Typo-structure-padding-top-count",
    bottom: "Typo-structure-padding-bottom-count",
    left: "Typo-structure-padding-left-count",
    right: "Typo-structure-padding-right-count",
  };

  // helpers
  const $ = (id) => document.getElementById(id);
  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  const clampPx = (n) => Math.max(0, Math.min(100, Math.round(n || 0)));
  const parsePx = (el) => {
    if (!el) return 0;
    const raw = el.tagName === "INPUT" ? el.value : el.textContent;
    const n = parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10);
    return clampPx(Number.isFinite(n) ? n : 0);
  };
  const writePx = (el, v, fire = true) => {
    if (!el) return;
    const s = `${clampPx(v)}px`;
    if (el.tagName === "INPUT") el.value = s;
    else el.textContent = s;
    if (fire) el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  let activeMarginTab = "Typo-advance-margin-gap-all";
  let activePaddingTab = "Typo-advance-padding-gap-all";

  function setTabHeight(active = true) {
    const tabWrapper = $("tabContentWrapper");
    if (!tabWrapper) return;
    tabWrapper.classList.add("sc-transition-all");
    tabWrapper.classList.remove("sc-h-350", "sc-h-375");
    tabWrapper.classList.add(active ? "sc-h-375" : "sc-h-350");
  }

  // UI tab switching — MARGIN
  marginIds.forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("click", () => {
      activeMarginTab = id;

      marginIds.forEach((btnId) => $(btnId)?.classList.remove("sc-bg-454545"));
      el.classList.add("sc-bg-454545");

      [
        "Typo-structure-margin-top-fill",
        "Typo-structure-margin-bottom-fill",
        "Typo-structure-margin-left-fill",
        "Typo-structure-margin-right-fill",
      ].forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "none";
      });

      (marginFillIds[id] || []).forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "block";
      });

      $("Typo-advance-margin-gap-fill")?.style &&
        ($("Typo-advance-margin-gap-fill").style.display = "block");
      $("Typo-advance-margin-gap-bullet")?.style &&
        ($("Typo-advance-margin-gap-bullet").style.display = "block");

      setTabHeight(true);
      // snap slider to the newly-focused input(s)
      refreshMarginSliderFromInputs();
    });
  });

  // UI tab switching — PADDING
  paddingIds.forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("click", () => {
      activePaddingTab = id;

      paddingIds.forEach((btnId) => $(btnId)?.classList.remove("sc-bg-454545"));
      el.classList.add("sc-bg-454545");

      [
        "Typo-structure-padding-top",
        "Typo-structure-padding-bottom",
        "Typo-structure-padding-left",
        "Typo-structure-padding-right",
      ].forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "none";
      });

      (paddingFillIds[id] || []).forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "block";
      });

      setTabHeight(true);
      // snap slider to the newly-focused input(s)
      refreshPaddingSliderFromInputs();
    });
  });

  // ===== SLIDERS (drag updates inputs) =====
  const sliders = [
    {
      bulletId: "Typo-advance-margin-gap-bullet",
      fillId: "Typo-advance-margin-gap-fill",
      tabKey: () => activeMarginTab,
      idMap: {
        "Typo-advance-margin-gap-top": [marginCountIds.top],
        "Typo-advance-margin-gap-bottom": [marginCountIds.bottom],
        "Typo-advance-margin-gap-left": [marginCountIds.left],
        "Typo-advance-margin-gap-right": [marginCountIds.right],
        "Typo-advance-margin-gap-all": [
          marginCountIds.top,
          marginCountIds.bottom,
          marginCountIds.left,
          marginCountIds.right,
        ],
      },
    },
    {
      bulletId: "Typo-advance-padding-gap-bullet",
      fillId: "Typo-advance-padding-gap-fill",
      tabKey: () => activePaddingTab,
      idMap: {
        "Typo-advance-padding-gap-top": [paddingCountIds.top],
        "Typo-advance-padding-gap-bottom": [paddingCountIds.bottom],
        "Typo-advance-padding-gap-left": [paddingCountIds.left],
        "Typo-advance-padding-gap-right": [paddingCountIds.right],
        "Typo-advance-padding-gap-all": [
          paddingCountIds.top,
          paddingCountIds.bottom,
          paddingCountIds.left,
          paddingCountIds.right,
        ],
      },
    },
  ];

  sliders.forEach(({ bulletId, fillId, tabKey, idMap }) => {
    const bullet = $(bulletId);
    const fill = $(fillId);
    const bar = bullet?.parentElement;
    if (!bullet || !fill || !bar) return;

    const getClientX = (evt) =>
      evt.touches && evt.touches[0] ? evt.touches[0].clientX : evt.clientX;

    const applyFromX = (clientX) => {
      const rect = bar.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));

      const percent = (x / rect.width) * 100; // 0..100
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;

      const value = Math.round(percent); // px value 0..100
      const activeTab = tabKey();
      const countIds = idMap[activeTab] || [];

      countIds.forEach((id) => {
        const el = $(id);
        if (!el) return;
        writePx(el, value, true); // update input + fire input event
      });
    };

    const onMove = (evt) => {
      setTabHeight(true);
      applyFromX(getClientX(evt));
      if (evt.cancelable) evt.preventDefault();
    };

    const stop = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", stop);
    };

    const start = (evt) => {
      setTabHeight(true);
      onMove(evt);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", stop);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", stop);
      if (evt.cancelable) evt.preventDefault();
    };

    // drag bullet
    bullet.addEventListener("mousedown", start);
    bullet.addEventListener("touchstart", start, { passive: false });

    // click/drag anywhere on the bar to jump
    bar.addEventListener("mousedown", (e) => start(e));
    bar.addEventListener("touchstart", (e) => start(e), { passive: false });
  });

  // ===== INPUTS (typing updates sliders) =====
  const marginBullet = $("Typo-advance-margin-gap-bullet");
  const marginFill = $("Typo-advance-margin-gap-fill");
  const paddingBullet = $("Typo-advance-padding-gap-bullet");
  const paddingFill = $("Typo-advance-padding-gap-fill");

  const setSlider = (bullet, fill, pxVal) => {
    if (!bullet || !fill) return;
    const percent = clampPx(pxVal); // same mapping: 1px == 1%
    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
  };

  const sideFromTab = (tabId) => {
    if (tabId.includes("top")) return "top";
    if (tabId.includes("bottom")) return "bottom";
    if (tabId.includes("left")) return "left";
    if (tabId.includes("right")) return "right";
    return "all";
  };

 const bindMarginInput = (side) => {
   const el = document.getElementById(marginCountIds[side]);
   if (!el) return;
   el.addEventListener("input", () => {
     const raw = el.tagName === "INPUT" ? el.value : el.textContent;
     const v = Math.max(
       0,
       Math.min(100, parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10) || 0)
     );
     const activeSide = sideFromTab(activeMarginTab);
     if (activeSide === "all" || activeSide === side) {
       setSlider(
         document.getElementById("Typo-advance-margin-gap-bullet"),
         document.getElementById("Typo-advance-margin-gap-fill"),
         v
       );
     }
     el.dispatchEvent(new Event("change", { bubbles: true }));
   });
   el.addEventListener("blur", () => {
     const raw = el.tagName === "INPUT" ? el.value : el.textContent;
     const v = Math.max(
       0,
       Math.min(100, parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10) || 0)
     );
     if (el.tagName === "INPUT") el.value = `${v}px`;
     else el.textContent = `${v}px`;
   });
 };

 const bindPaddingInput = (side) => {
   const el = document.getElementById(paddingCountIds[side]);
   if (!el) return;
   el.addEventListener("input", () => {
     const raw = el.tagName === "INPUT" ? el.value : el.textContent;
     const v = Math.max(
       0,
       Math.min(100, parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10) || 0)
     );
     const activeSide = sideFromTab(activePaddingTab);
     if (activeSide === "all" || activeSide === side) {
       setSlider(
         document.getElementById("Typo-advance-padding-gap-bullet"),
         document.getElementById("Typo-advance-padding-gap-fill"),
         v
       );
     }
     el.dispatchEvent(new Event("change", { bubbles: true }));
   });
   el.addEventListener("blur", () => {
     const raw = el.tagName === "INPUT" ? el.value : el.textContent;
     const v = Math.max(
       0,
       Math.min(100, parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10) || 0)
     );
     if (el.tagName === "INPUT") el.value = `${v}px`;
     else el.textContent = `${v}px`;
   });
 };


  ["top", "bottom", "left", "right"].forEach(bindMarginInput);
  ["top", "bottom", "left", "right"].forEach(bindPaddingInput);

  // Initial slider position = current inputs (avg when "All" is active)
  function refreshMarginSliderFromInputs() {
    const activeSide = sideFromTab(activeMarginTab);
    let v = 0;
    if (activeSide === "all") {
      const vals = Object.values(marginCountIds).map((id) => parsePx($(id)));
      v = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    } else {
      v = parsePx($(marginCountIds[activeSide]));
    }
    setSlider(marginBullet, marginFill, v);
  }
  function refreshPaddingSliderFromInputs() {
    const activeSide = sideFromTab(activePaddingTab);
    let v = 0;
    if (activeSide === "all") {
      const vals = Object.values(paddingCountIds).map((id) => parsePx($(id)));
      v = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    } else {
      v = parsePx($(paddingCountIds[activeSide]));
    }
    setSlider(paddingBullet, paddingFill, v);
  }

  refreshMarginSliderFromInputs();
  refreshPaddingSliderFromInputs();

  document.addEventListener("click", (e) => {
    const clickedInsideAllowed = allAllowedIds.some((id) => {
      const el = $(id);
      return el && el.contains(e.target);
    });
    if (!clickedInsideAllowed) setTabHeight(false);
  });
}
