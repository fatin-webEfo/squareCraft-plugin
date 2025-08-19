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

  const marginCountIds = {
    top: "button-structure-margin-top-count",
    bottom: "button-structure-margin-bottom-count",
    left: "button-structure-margin-left-count",
    right: "button-structure-margin-right-count",
  };
  const paddingCountIds = {
    top: "button-structure-padding-top-count",
    bottom: "button-structure-padding-bottom-count",
    left: "button-structure-padding-left-count",
    right: "button-structure-padding-right-count",
  };

  const MAX_PX = 999;
  const $ = (id) => document.getElementById(id);
  const clamp = (n) => Math.max(0, Math.min(MAX_PX, Math.round(n || 0)));
  const parsePx = (el) => {
    if (!el) return 0;
    const raw = el.tagName === "INPUT" ? el.value : el.textContent;
    const n = parseInt(String(raw).replace(/[^\-0-9]/g, ""), 10);
    return clamp(Number.isFinite(n) ? n : 0);
  };
  const writePx = (el, v, fire = false) => {
    if (!el) return;
    const s = String(clamp(v));
    if (el.tagName === "INPUT") el.value = s;
    else el.textContent = s;
    if (fire) el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  let activeMarginTab = "button-advance-margin-gap-all";
  let activePaddingTab = "button-advance-padding-gap-all";

  function setTabHeight(active = true) {
    const tabWrapper = $("tabContentWrapper");
    if (!tabWrapper) return;
    tabWrapper.classList.add("sc-transition-all");
    tabWrapper.classList.remove("sc-h-350", "sc-h-375");
    tabWrapper.classList.add(active ? "sc-h-375" : "sc-h-350");
  }

  // Toggle tab states — margin
  marginIds.forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("click", () => {
      activeMarginTab = id;
      marginIds.forEach((i) => $(i)?.classList.remove("sc-bg-454545"));
      el.classList.add("sc-bg-454545");

      [
        "button-structure-margin-top-fill",
        "button-structure-margin-bottom-fill",
        "button-structure-margin-left-fill",
        "button-structure-margin-right-fill",
      ].forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "none";
      });
      (marginFillIds[id] || []).forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "block";
      });

      $("button-advance-margin-gap-fill")?.style &&
        ($("button-advance-margin-gap-fill").style.display = "block");
      $("button-advance-margin-gap-bullet")?.style &&
        ($("button-advance-margin-gap-bullet").style.display = "block");

      setTabHeight(true);
      refreshMarginSliderFromInputs();
    });
  });

  // Toggle tab states — padding
  paddingIds.forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("click", () => {
      activePaddingTab = id;
      paddingIds.forEach((i) => $(i)?.classList.remove("sc-bg-454545"));
      el.classList.add("sc-bg-454545");

      [
        "button-structure-padding-top",
        "button-structure-padding-bottom",
        "button-structure-padding-left",
        "button-structure-padding-right",
      ].forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "none";
      });
      (paddingFillIds[id] || []).forEach((fid) => {
        const f = $(fid);
        if (f) f.style.display = "block";
      });

      setTabHeight(true);
      refreshPaddingSliderFromInputs();
    });
  });

  // Sliders
  const sliders = [
    {
      bulletId: "button-advance-margin-gap-bullet",
      fillId: "button-advance-margin-gap-fill",
      tabKey: () => activeMarginTab,
      idMap: {
        "button-advance-margin-gap-top": [marginCountIds.top],
        "button-advance-margin-gap-bottom": [marginCountIds.bottom],
        "button-advance-margin-gap-left": [marginCountIds.left],
        "button-advance-margin-gap-right": [marginCountIds.right],
        "button-advance-margin-gap-all": [
          marginCountIds.top,
          marginCountIds.bottom,
          marginCountIds.left,
          marginCountIds.right,
        ],
      },
    },
    {
      bulletId: "button-advance-padding-gap-bullet",
      fillId: "button-advance-padding-gap-fill",
      tabKey: () => activePaddingTab,
      idMap: {
        "button-advance-padding-gap-top": [paddingCountIds.top],
        "button-advance-padding-gap-bottom": [paddingCountIds.bottom],
        "button-advance-padding-gap-left": [paddingCountIds.left],
        "button-advance-padding-gap-right": [paddingCountIds.right],
        "button-advance-padding-gap-all": [
          paddingCountIds.top,
          paddingCountIds.bottom,
          paddingCountIds.left,
          paddingCountIds.right,
        ],
      },
    },
  ];

  const getClientX = (evt) =>
    evt.touches && evt.touches[0] ? evt.touches[0].clientX : evt.clientX;

  sliders.forEach(({ bulletId, fillId, tabKey, idMap }) => {
    const bullet = $(bulletId);
    const fill = $(fillId);
    const bar = bullet?.parentElement;
    if (!bullet || !fill || !bar) return;

    const applyFromX = (clientX) => {
      const rect = bar.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;

      const value = Math.round((percent / 100) * MAX_PX);
      const activeTab = tabKey();
      const ids = idMap[activeTab] || [];
      ids.forEach((id) => writePx($(id), value, true)); // update input + fire 'input' (triggers styles)
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

    bullet.addEventListener("mousedown", start);
    bullet.addEventListener("touchstart", start, { passive: false });
    bar.addEventListener("mousedown", (e) => start(e));
    bar.addEventListener("touchstart", (e) => start(e), { passive: false });
  });

  // Inputs → slider (when typing)
  const setSlider = (bullet, fill, pxVal) => {
    if (!bullet || !fill) return;
    const percent = (clamp(pxVal) / MAX_PX) * 100;
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

  const marginBullet = $("button-advance-margin-gap-bullet");
  const marginFill = $("button-advance-margin-gap-fill");
  const paddingBullet = $("button-advance-padding-gap-bullet");
  const paddingFill = $("button-advance-padding-gap-fill");

  const bindMarginInput = (side) => {
    const el = $(marginCountIds[side]);
    if (!el) return;
    el.addEventListener("input", () => {
      const v = parsePx(el);
      const activeSide = sideFromTab(activeMarginTab);
      if (activeSide === "all" || activeSide === side)
        setSlider(marginBullet, marginFill, v);
      el.tagName === "INPUT"
        ? (el.value = String(v))
        : (el.textContent = String(v));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    });
    el.addEventListener("blur", () => {
      const v = parsePx(el);
      el.tagName === "INPUT"
        ? (el.value = String(v))
        : (el.textContent = String(v));
    });
  };
  const bindPaddingInput = (side) => {
    const el = $(paddingCountIds[side]);
    if (!el) return;
    el.addEventListener("input", () => {
      const v = parsePx(el);
      const activeSide = sideFromTab(activePaddingTab);
      if (activeSide === "all" || activeSide === side)
        setSlider(paddingBullet, paddingFill, v);
      el.tagName === "INPUT"
        ? (el.value = String(v))
        : (el.textContent = String(v));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    });
    el.addEventListener("blur", () => {
      const v = parsePx(el);
      el.tagName === "INPUT"
        ? (el.value = String(v))
        : (el.textContent = String(v));
    });
  };

  ["top", "bottom", "left", "right"].forEach(bindMarginInput);
  ["top", "bottom", "left", "right"].forEach(bindPaddingInput);

  function refreshMarginSliderFromInputs() {
    const side = sideFromTab(activeMarginTab);
    let v = 0;
    if (side === "all") {
      const vals = Object.values(marginCountIds).map((id) => parsePx($(id)));
      v = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    } else {
      v = parsePx($(marginCountIds[side]));
    }
    setSlider(marginBullet, marginFill, v);
  }
  function refreshPaddingSliderFromInputs() {
    const side = sideFromTab(activePaddingTab);
    let v = 0;
    if (side === "all") {
      const vals = Object.values(paddingCountIds).map((id) => parsePx($(id)));
      v = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    } else {
      v = parsePx($(paddingCountIds[side]));
    }
    setSlider(paddingBullet, paddingFill, v);
  }
  refreshMarginSliderFromInputs();
  refreshPaddingSliderFromInputs();

  document.addEventListener("click", (e) => {
    const inside = allAllowedIds.some((id) => {
      const el = $(id);
      return el && el.contains(e.target);
    });
    if (!inside) setTabHeight(false);
  });
}
