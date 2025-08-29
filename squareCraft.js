(async function squareCraft() {
  let widgetReadyPromise = null;
  let lastToggleAt = 0;
  let justOpenedUntil = 0; 
  let __sc_creating = false;
  
  const HOST_DOC = (() => {
    try {
      if (parent && parent !== window) {
        void parent.document.body;
        return parent.document;
      }
    } catch (_) {
      
    }
    return document;
  })();
  const HOST_WIN = HOST_DOC.defaultView || window;
  async function toggleWidgetVisibility(event, clickedBlock = null) {
    event?.stopPropagation?.();

    const now = performance.now();
    if (now - lastToggleAt < 200) return;
    lastToggleAt = now;

    if (!widgetContainer) {
      widgetReadyPromise ||= (async () => {
        await createWidget(clickedBlock);
        return widgetContainer;
      })();
      await widgetReadyPromise;
    }

    const isHidden =
      !widgetContainer ||
      widgetContainer.style.visibility === "hidden" ||
      widgetContainer.style.opacity === "0" ||
      widgetContainer.style.height === "0px";

    if (isHidden) {
      widgetContainer.style.setProperty("position", "fixed", "important");
      widgetContainer.style.setProperty("right", "100px", "important");
      widgetContainer.style.setProperty("top", "100px", "important");
      widgetContainer.style.removeProperty("left");
      widgetContainer.style.removeProperty("transform");

      if (window.gsap) animateWidgetOpen(widgetContainer, 0.2);
      else {
        widgetContainer.style.visibility = "visible";
        widgetContainer.style.opacity = "1";
        widgetContainer.style.height = "auto";
        widgetContainer.style.overflow = "visible";
      }
      justOpenedUntil = performance.now() + 300;
    } else {
      if (window.gsap) animateWidgetClose(widgetContainer, 0.2);
      else {
        widgetContainer.style.visibility = "hidden";
        widgetContainer.style.opacity = "0";
        widgetContainer.style.height = "0";
        widgetContainer.style.overflow = "hidden";
      }
    }

    if (clickedBlock) {
      try {
        await waitForElement(
          "#typoSection, #imageSection, #buttonSection",
          4000
        );
        handleAndDetect(clickedBlock);
      } catch (err) {
        console.error(err.message);
      }
    }
  }
  document.body.addEventListener("click", (e) => {
    if (performance.now() < justOpenedUntil) return; // short grace period

    const isInsideWidget = widgetContainer?.contains(e.target);
    const isToolbarIcon = e.target.closest(".sc-toolbar-icon");
    const isHiddenInput =
      e.target.tagName === "INPUT" && e.target.type === "file";

    if (
      !isInsideWidget &&
      !isToolbarIcon &&
      !isHiddenInput &&
      widgetContainer &&
      widgetContainer.style.visibility !== "hidden" &&
      widgetContainer.style.opacity !== "0"
    ) {
      animateWidgetClose(widgetContainer, 0.2);
    }
  });

  (() => {
    let d = document;
    try {
      if (parent && parent !== window) {
        void parent.document.body;
        d = parent.document;
      }
    } catch (_) {}
    const SRC =
      "https://fatin-webefo.github.io/squareCraft-plugin/public/squarecraft-only-logo.svg";
    const preconnect = d.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = new URL(SRC).origin;
    preconnect.crossOrigin = "anonymous";
    d.head.appendChild(preconnect);
    const preload = d.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = SRC;
    d.head.appendChild(preload);

    function makeIcon() {
      const img = HOST_DOC.createElement("img");
      img.src =
        "https://fatin-webefo.github.io/squareCraft-plugin/public/squarecraft-only-logo.svg";
      img.alt = "sc";
      img.decoding = "async";
      img.fetchPriority = "high";
      img.loading = "eager";
      img.style.cssText = "width:30px;height:30px;display:block;";
      img.style.setProperty("border-radius", "20%", "important");

      const wrap = HOST_DOC.createElement("span");
      wrap.className = "sc-toolbar-icon sc-z-99999";
      wrap.style.cssText =
        "display:inline-flex;align-items:center;justify-content:center;cursor:pointer;";
      wrap.appendChild(img);

      wrap.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        (HOST_WIN.__sc_toggleQueue ||= []).push([null, null]);

        const fn =
          HOST_WIN.toggleWidgetVisibility || window.toggleWidgetVisibility;
        if (typeof fn === "function") {
          HOST_WIN.__sc_toggleQueue.splice(0).forEach((args) => fn(...args));
        }

        try {
          wrap.animate(
            [
              { transform: "scale(.92)", opacity: 0.7 },
              { transform: "scale(1)", opacity: 1 },
            ],
            { duration: 180, easing: "cubic-bezier(.22,.61,.36,1)" }
          );
        } catch {}
      });

      return wrap;
    }

    const MATCH = ".tidILMJ7AVANuKwS";

    function insertIcon(t) {
      if (!t || t.dataset.scIconInjected === "1") return;
      if (t.querySelector(".sc-toolbar-icon")) {
        t.dataset.scIconInjected = "1";
        return;
      }

      const del = t.querySelector('[aria-label="Remove"]');
      if (!del) {
        const once = new MutationObserver(() => {
          const x = t.querySelector('[aria-label="Remove"]');
          if (x) {
            once.disconnect();
            insertIcon(t);
          }
        });
        once.observe(t, { childList: true, subtree: true });
        return;
      }
      del.parentNode.insertBefore(makeIcon(), del.nextSibling);
      t.dataset.scIconInjected = "1";
    }

    HOST_DOC.querySelectorAll(MATCH).forEach(insertIcon);
    new MutationObserver((recs) => {
      for (const r of recs)
        for (const n of r.addedNodes) {
          if (n.nodeType !== 1) continue;
          if (n.matches?.(MATCH)) insertIcon(n);
          n.querySelectorAll?.(MATCH).forEach(insertIcon);
        }
    }).observe(HOST_DOC.body, { childList: true, subtree: true });

    HOST_WIN.__sc_forceIconScan = () =>
      HOST_DOC.querySelectorAll(MATCH).forEach(insertIcon);
  })();

  HOST_WIN.toggleWidgetVisibility = toggleWidgetVisibility;
  window.toggleWidgetVisibility = toggleWidgetVisibility; // extra safety

  const q = HOST_WIN.__sc_toggleQueue;
  if (Array.isArray(q) && q.length) {
    const fn = toggleWidgetVisibility;
    q.splice(0).forEach((args) =>
      fn(...(Array.isArray(args) ? args : [null, null]))
    );
  }

  function triggerLaunchAnimation() {
    const icon = HOST_DOC.querySelector(".sc-toolbar-icon");
    if (window.gsap && icon) {
      gsap.fromTo(
        icon,
        { scale: 0.9, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        }
      );
    }
  }

  function loadStylesheetOnce(href) {
    return new Promise((resolve, reject) => {
      const existsLink = document.querySelector(`link[href="${href}"]`);
      const existing =
        existsLink ||
        Array.from(document.styleSheets).find(
          (ss) => ss.href && ss.href.includes(href)
        );
      if (existing) {
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = href;
      link.onload = () => {
        link.rel = "stylesheet";
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  function animateWidgetOpen(el, duration = 0.2) {
    if (!el) return;
    const content = el.firstElementChild;

    el.style.visibility = "visible";
    el.style.opacity = "1";
    el.style.overflow = "hidden";

    const fullH = content ? content.scrollHeight : 320;

    if (!window.gsap) {
      el.style.height = fullH + "px";
      requestAnimationFrame(() => {
        el.style.height = "auto";
        el.style.overflow = "visible";
      });
      return;
    }

    gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height: fullH,
        opacity: 1,
        duration,
        ease: "power2.out",
        onComplete: () => {
          el.style.height = "auto";
          el.style.overflow = "visible";
        },
        overwrite: true,
      }
    );
  }

  function animateWidgetClose(el, duration = 0.2) {
    if (!el) return;
    if (!window.gsap) {
      el.style.visibility = "hidden";
      el.style.opacity = "0";
      el.style.height = "0px";
      el.style.overflow = "hidden";
      return;
    }
    const curH = el.getBoundingClientRect().height || 0;
    el.style.overflow = "hidden";
    gsap.fromTo(
      el,
      { height: curH, opacity: 1 },
      {
        height: 0,
        opacity: 0,
        duration,
        ease: "power2.in",
        onComplete: () => {
          el.style.visibility = "hidden";
          el.style.overflow = "hidden";
        },
        overwrite: true,
      }
    );
  }

  // navbar icon import — ensure we only inject once
  let injectNavbarIconFn;
  try {
    const { injectNavbarIcon } = await import(
      "https://fatin-webefo.github.io/squareCraft-plugin/injectNavbarIcon.js"
    );
    injectNavbarIconFn = injectNavbarIcon;
    if (!window.__squareCraftResetFlags) {
      window.__squareCraftResetFlags = new Map();
    }
    if (!window.__squareCraftResetFlags.get("navIcon")) {
      if (typeof injectNavbarIconFn === "function") injectNavbarIconFn();
      window.__squareCraftResetFlags.set("navIcon", 1);
    }
  } catch (error) {
    console.error("🚨 Failed to load navbar icon script", error);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      requestAnimationFrame(() => {
        if (
          typeof injectNavbarIconFn === "function" &&
          !window.__squareCraftResetFlags.get("navIconDOM")
        ) {
          injectNavbarIconFn();
          window.__squareCraftResetFlags.set("navIconDOM", 1);
        }
      });
    });
  } else {
    requestAnimationFrame(() => {
      if (
        typeof injectNavbarIconFn === "function" &&
        !window.__squareCraftResetFlags.get("navIconRAF")
      ) {
        injectNavbarIconFn();
        window.__squareCraftResetFlags.set("navIconRAF", 1);
      }
    });
  }

  // global click closer — add only once
  function attachGlobalClickListener() {
    if (document.body.dataset.scGlobalClick === "1") return;
    document.body.dataset.scGlobalClick = "1";
    document.body.addEventListener("click", (e) => {
      const isInsideWidget = widgetContainer?.contains(e.target);
      const isToolbarIcon = e.target.closest(".sc-toolbar-icon");
      const isHiddenInput =
        e.target.tagName === "INPUT" && e.target.type === "file";
      if (
        !isInsideWidget &&
        !isToolbarIcon &&
        !isHiddenInput &&
        widgetContainer &&
        widgetContainer.style.visibility !== "hidden" &&
        widgetContainer.style.opacity !== "0"
      ) {
        animateWidgetClose(widgetContainer, 0.2);
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      requestAnimationFrame(() => attachGlobalClickListener());
    });
  } else {
    requestAnimationFrame(() => attachGlobalClickListener());
  }

  // toolbar icon set fast
  let isSameOrigin = true;
  if (!window.__squareCraftResetFlags) {
    window.__squareCraftResetFlags = new Map();
  }

  // ✅ determine same-origin BEFORE touching parent.document
  try {
    if (parent && parent !== window) {
      void parent.document.body;
      isSameOrigin = true;
    } else {
      isSameOrigin = false;
    }
  } catch (e) {
    isSameOrigin = false;
  }
  const Url = isSameOrigin
    ? parent.document.location.href
    : document.location.href;
  console.log("parent", Url);

  function safeQuerySelector(selector) {
    return isSameOrigin
      ? parent.document.querySelector(selector)
      : document.querySelector(selector);
  }

  let selectedElement = null;
  let widgetContainer = null;

  let widgetLoaded = false;
  const widgetScript = document.getElementById("sc-script");

  let token = null;
  let userId = null;
  let widgetId = null;

  if (widgetScript) {
    token = widgetScript.dataset?.token;
    userId = widgetScript.dataset?.uId;
    widgetId = widgetScript.dataset?.wId;

    if (token) {
      localStorage.setItem("sc_auth_token", token);
      document.cookie = `sc_auth_token=${token}; path=/; domain=${location.hostname}; Secure; SameSite=Lax`;
    }

    if (userId) {
      localStorage.setItem("sc_u_id", userId);
      document.cookie = `sc_u_id=${userId}; path=.squarespace.com;`;
    }

    if (widgetId) {
      localStorage.setItem("sc_w_id", widgetId);
      document.cookie = `sc_w_id=${widgetId}; path=.squarespace.com;`;
    }
  }
  function loadGSAPCDN() {
    const scripts = [
      "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
      "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js",
      "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js",
    ];
    scripts.forEach((src) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (!existing) {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
      }
    });
  }
  loadGSAPCDN();

  let lastClickedBlockId = null;
  let lastClickedElement = null;
  let lastAppliedAlignment = null;
  let lastActiveAlignmentElement = null;

  // viewport
  function applyStylesToElement(element, css) {
    if (!element || !css) return;

    const elementId = element.id;
    let styleTag = document.getElementById(`style-${elementId}`);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = `style-${elementId}`;
      document.head.appendChild(styleTag);
    }

    let cssText = `#${elementId}, #${elementId} h1, #${elementId} h2, #${elementId} h3, #${elementId} h4, #${elementId} p { `;
    Object.keys(css).forEach((prop) => {
      cssText += `${prop}: ${css[prop]} !important; `;
    });
    cssText += "}";

    styleTag.innerHTML = cssText;
  }

  const {
    initButtonAdvanceStyles,
    horizontalinitButtonAdvanceStyles,
    opacityinitButtonAdvanceStyles,
    scaleinitButtonAdvanceStyles,
    rotateinitButtonAdvanceStyles,
    blurinitButtonAdvanceStyles,
    button_initEffectAnimationDropdownToggle,
    opacitybutton_initEffectAnimationDropdownToggle,
    horizontal_button_initEffectAnimationDropdownToggle,
  } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonAdvanceStyles/WidgetButtonAdvanceStyles.js"
  );
  const {
    initTypoAdvanceStyles,
    horizontalinitTypoAdvanceStyles,
    blurinitTypoAdvanceStyles,
    opacityinitTypoAdvanceStyles,
    horizontalinitEffectAnimationDropdownToggle,
    blurinitEffectAnimationDropdownToggle,
    scaleinitEffectAnimationDropdownToggle,
    rotateinitEffectAnimationDropdownToggle,
    opacityinitEffectAnimationDropdownToggle,
    initEffectAnimationDropdownToggle,
    scaleinitTypoAdvanceStyles,
    rotateinitTypoAdvanceStyles,
  } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/WidgetTypoAdvanceStyles/WidgetTypoAdvanceStyles.js"
  );

  const {
    buttonAdvanceSyncCustomTimelineArrow,
    horizontalbuttonAdvanceSyncCustomTimelineArrow,
    opacitybuttonAdvanceSyncCustomTimelineArrow,
    scalebuttonAdvanceSyncCustomTimelineArrow,
    rotatebuttonAdvanceSyncCustomTimelineArrow,
    blurbuttonAdvanceSyncCustomTimelineArrow,
    initButtonAdvanceScrollEffectReset,
  } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/buttonAdvanceSyncCustomTimelineArrow/buttonAdvanceSyncCustomTimelineArrow.js"
  );
  const {
    TypoAdvanceSyncCustomTimelineArrow,
    TypoHorizontalAdvanceSyncCustomTimelineArrow,
    TypoOpacityAdvanceSyncCustomTimelineArrow,
    TypoScaleAdvanceSyncCustomTimelineArrow,
    TypoRotateAdvanceSyncCustomTimelineArrow,
    TypoBlurAdvanceSyncCustomTimelineArrow,
  } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceSyncCustomTimelineArrow/TypoAdvanceSyncCustomTimelineArrow.js"
  );
  const { logCurrentViewport } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/viewport/viewport.js"
  );
  logCurrentViewport();
  window.addEventListener("resize", logCurrentViewport);
  const { handleSectionFind } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/section/handleSectionFind.js"
  );
  const { ButtonAdvanceToggleControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/ButtonAdvanceToggleControls/ButtonAdvanceToggleControls.js"
  );
  const { TypoAdvanceToggleControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceToggleControls/TypoAdvanceToggleControls.js"
  );

  const { WidgetButtonPresetTabControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonPresetTabControls/WidgetButtonPresetTabControls.js"
  );
  const { initButtonStructureGapTypeToggle } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initButtonStructureGapTypeToggle/initButtonStructureGapTypeToggle.js"
  );
  const { initTypoStructureGapTypeToggle } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/initTypoStructureGapTypeToggle/initTypoStructureGapTypeToggle.js"
  );
  const { initButtonAdvanceStructureStyles } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initButtonAdvanceStructureStyles/initButtonAdvanceStructureStyles.js"
  );
  const { initTypoAdvanceStructureStyles } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/initTypoAdvanceStructureStyles/initTypoAdvanceStructureStyles.js"
  );
  const { getTextType } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/getTextType.js"
  );
  const { getHoverTextType } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/getHoverTextType.js"
  );

  const { handleFontWeightDropdownClick } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleFontWeightDropdownClick.js"
  );
  const { initHoverTypoTabControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/initHoverTypoTabControls.js"
  );
  const { handleBlockClick } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleBlockClick.js"
  );
  const { initImageStateTabToggle } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/initImageStateTabToggle/initImageStateTabToggle.js"
  );

  const { WidgetImageHoverToggleControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/WidgetImageHoverToggleControls/WidgetImageHoverToggleControls.js"
  );

  const { handleAlignmentClick } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleAlignmentClick.js"
  );
  const { handleTextColorClick } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleTextColorClick.js"
  );
  const { typoTabSelect } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/typoTabSelect.js"
  );
  const { hoverTypoTabSelect } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/hoverTypoTabSelect.js"
  );
  const { detectBlockElementTypes } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/components/BlockType/detectBlockElementTypes.js"
  );
  const { initImageSectionControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initImageSectionControls.js"
  );
  const { WidgetTypoSectionStateControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/WidgetTypoSectionStateControls/WidgetTypoSectionStateControls.js"
  );

  const { initImageSectionToggleControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initImageSectionToggleControls.js"
  );
  const {
    initHoverButtonSectionToggleControls,
    initHoverButtonEffectDropdowns,
  } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initHoverButtonSectionToggleControls/initHoverButtonSectionToggleControls.js"
  );
  const { initButtonSectionToggleControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initButtonSectionToggleControls/initButtonSectionToggleControls.js"
  );
  const { initImageUploadPreview } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initButtonSectionToggleControls/initImageUploadPreview.js"
  );
  const { getSquarespaceThemeStyles } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/getSquarespaceThemeStyles.js"
  );
  const { tooltipControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/tooltipControls/tooltipControls.js"
  );
  const { initBorderColorPaletteToggle } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initBorderColorPaletteToggle.js"
  );
  const { createHoverableArrowSVG } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/createHoverableArrowSVG/createHoverableArrowSVG.js"
  );
  const { initButtonFontColorPaletteToggle } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initButtonFontColorPaletteToggle/initButtonFontColorPaletteToggle.js"
  );
  const {
    initButtonStyles,
    initButtonIconPositionToggle,
    initButtonIconRotationControl,
    initButtonIconSizeControl,
    initButtonIconSpacingControl,
    initButtonBorderControl,
    initButtonBorderTypeToggle,
    initButtonBorderRadiusControl,
    initButtonShadowControls,
    initButtonFontFamilyControls,
    resetAllButtonStyles,
    initButtonBorderResetHandlers,
  } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initButtonStyles/initButtonStyles.js"
  );
  const {
    initHoverButtonShadowControls,
    initHoverButtonIconRotationControl,
    initHoverButtonIconSizeControl,
    initHoverButtonIconSpacingControl,
    initHoverButtonBorderRadiusControl,
    initHoverButtonBorderTypeToggle,
    initHoverButtonBorderControl,
    applyHoverButtonEffects,
  } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/initButtonStyles/initButtonHoverStyles.js"
  );
  const themeColors = await getSquarespaceThemeStyles();

  let isTrackingArrow = false;

  window.addEventListener("scroll", () => {
    const selected = document.querySelector('[id^="block-"].sc-font-modified');
    if (selected && !isTrackingArrow) {
      TypoAdvanceSyncCustomTimelineArrow(selected);
      isTrackingArrow = true;
    }
  });

  document.body.addEventListener("click", (event) => {
    ButtonAdvanceToggleControls();
    TypoAdvanceToggleControls();
    WidgetButtonPresetTabControls();
    if (selectedElement) {
      initButtonStyles(selectedElement);
    }
    if (selectedElement) {
      initButtonAdvanceStyles(() => selectedElement);
      horizontalinitButtonAdvanceStyles(() => selectedElement);
      initTypoAdvanceStyles(() => selectedElement);
      horizontalinitTypoAdvanceStyles(() => selectedElement);
      blurinitTypoAdvanceStyles(() => selectedElement);
      opacityinitTypoAdvanceStyles(() => selectedElement);
      scaleinitTypoAdvanceStyles(() => selectedElement);
      rotateinitTypoAdvanceStyles(() => selectedElement);
      opacityinitButtonAdvanceStyles(() => selectedElement);
      scaleinitButtonAdvanceStyles(() => selectedElement);
      rotateinitButtonAdvanceStyles(() => selectedElement);
      initHoverButtonIconRotationControl(() => selectedElement);
      initHoverButtonIconSizeControl(() => selectedElement);
      initHoverButtonIconSpacingControl(() => selectedElement);
      initHoverButtonBorderRadiusControl(() => selectedElement);
      initHoverButtonBorderTypeToggle(() => selectedElement);
      initHoverButtonBorderControl(() => selectedElement);
      applyHoverButtonEffects(() => selectedElement);
      initButtonAdvanceStructureStyles(() => selectedElement);
      initTypoAdvanceStructureStyles(() => selectedElement);
      blurinitButtonAdvanceStyles(() => selectedElement);
      initButtonAdvanceScrollEffectReset(() =>
        document.getElementById(window.selectedBlockId)
      );
    }

    initImageUploadPreview(() => selectedElement);
    const trigger = event.target.closest("#border-color-select");

    if (trigger) {
      setTimeout(() => {
        initBorderColorPaletteToggle(themeColors);
      }, 100);
      return;
    }

    setTimeout(initImageSectionControls, 100);
    const clickedBlock = event.target.closest('[id^="block-"]');
    if (clickedBlock) {
      waitForElement("#typoSection, #imageSection, #buttonSection")
        .then(() => {
          detectBlockElementTypes(clickedBlock);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }

    setTimeout(() => {
      ButtonAdvanceToggleControls();
      handleBlockClick(event, {
        getTextType,
        getHoverTextType,
        selectedElement,

        setSelectedElement: (val) => {
          selectedElement = val;

          setTimeout(() => {
            buttonAdvanceSyncCustomTimelineArrow(selectedElement);
            horizontalbuttonAdvanceSyncCustomTimelineArrow(selectedElement);
            TypoAdvanceSyncCustomTimelineArrow(selectedElement);
            TypoHorizontalAdvanceSyncCustomTimelineArrow(selectedElement);
            TypoOpacityAdvanceSyncCustomTimelineArrow(selectedElement);
            TypoScaleAdvanceSyncCustomTimelineArrow(selectedElement);
            TypoRotateAdvanceSyncCustomTimelineArrow(selectedElement);
            TypoBlurAdvanceSyncCustomTimelineArrow(selectedElement);
            opacitybuttonAdvanceSyncCustomTimelineArrow(selectedElement);
            TypoAdvanceSyncCustomTimelineArrow(selectedElement);
            scalebuttonAdvanceSyncCustomTimelineArrow(selectedElement);
            rotatebuttonAdvanceSyncCustomTimelineArrow(selectedElement);
            blurbuttonAdvanceSyncCustomTimelineArrow(selectedElement);
            initButtonAdvanceScrollEffectReset(selectedElement);
          }, 300);
        },
        setLastClickedBlockId: (val) => (lastClickedBlockId = val),
        setLastClickedElement: (val) => (lastClickedElement = val),
        setLastAppliedAlignment: (val) => (lastAppliedAlignment = val),
        setLastActiveAlignmentElement: (val) =>
          (lastActiveAlignmentElement = val),
      });

      initButtonFontColorPaletteToggle(themeColors, () => selectedElement);
      initButtonIconPositionToggle(() => selectedElement);
      initEffectAnimationDropdownToggle(() => selectedElement);
      button_initEffectAnimationDropdownToggle(() => selectedElement);
      opacitybutton_initEffectAnimationDropdownToggle(() => selectedElement);
      horizontal_button_initEffectAnimationDropdownToggle(
        () => selectedElement
      );
      horizontalinitEffectAnimationDropdownToggle(() => selectedElement);
      blurinitEffectAnimationDropdownToggle(() => selectedElement);
      scaleinitEffectAnimationDropdownToggle(() => selectedElement);
      rotateinitEffectAnimationDropdownToggle(() => selectedElement);
      opacityinitEffectAnimationDropdownToggle(() => selectedElement);

      initHoverButtonShadowControls(() => selectedElement);
      initButtonIconRotationControl(() => selectedElement);
      initButtonIconSizeControl(() => selectedElement);
      initButtonIconSpacingControl(() => selectedElement);
      initButtonBorderControl(() => selectedElement);
      initButtonShadowControls(() => selectedElement);
      resetAllButtonStyles(() => selectedElement);
      initButtonBorderResetHandlers(() => selectedElement);
      initButtonFontFamilyControls(() => selectedElement);

      initButtonBorderTypeToggle(
        () => selectedElement,
        (selected) => {
          if (selected) {
            const event = new Event("reapplyBorder");
            selected.dispatchEvent(event);
          }
        }
      );
      initButtonBorderRadiusControl(() => selectedElement);
    }, 50);

    handleAlignmentClick(event, {
      lastClickedElement,
      getTextType,
      getHoverTextType,
      applyStylesToElement,
      lastAppliedAlignment,
      setLastAppliedAlignment: (val) => (lastAppliedAlignment = val),
      lastActiveAlignmentElement,
      setLastActiveAlignmentElement: (val) =>
        (lastActiveAlignmentElement = val),
      lastClickedBlockId,
      userId,
      token,
      widgetId,
    });

    handleTextColorClick(event, lastClickedElement, applyStylesToElement);
    handleFontWeightDropdownClick(event);
    typoTabSelect(event);
    hoverTypoTabSelect(event);
  });

  // dropdown toggler
  document.body.addEventListener("click", (event) => {
    const dropdownTrigger = event.target.closest("#font-weight-dropdown");
    const dropdownList = document.getElementById("font-weight-dropdown-list");

    if (dropdownTrigger) {
      if (dropdownList.classList.contains("sc-hidden")) {
        dropdownList.classList.remove("sc-hidden");
      } else {
        dropdownList.classList.add("sc-hidden");
      }
    }
  });

  async function fetchModifications(retries = 3) {
    const module = await import(
      "https://fatin-webefo.github.io/squareCraft-plugin/html.js"
    );
    const htmlString = module.html();

    if (
      typeof htmlString === "string" &&
      widgetContainer &&
      widgetContainer.innerHTML.trim() === ""
    ) {
      widgetContainer.innerHTML = htmlString;
    }

    setTimeout(() => {
      if (typeof module.initToggleSwitch === "function") {
        module.initToggleSwitch();
      }
    }, 200);

    const isEnabled = localStorage.getItem("sc_enabled") !== "false";
    if (!isEnabled) {
      return;
    }

    const pageId = document
      .querySelector("article[data-page-sections]")
      ?.getAttribute("data-page-sections");
    if (!pageId) return;

    if (!token || !userId) {
      console.warn("Missing authentication data");
      return;
    }

    try {
      const response = await fetch(
        `https://admin.squareplugin.com/api/v1/get-modifications?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (!data.modifications || !Array.isArray(data.modifications)) {
        console.warn("⚠️ No modifications found or invalid format");
        return;
      }

      const modificationMap = new Map();

      data.modifications.forEach((mod) => {
        if (mod.pageId === pageId) {
          mod.elements.forEach((elem) => {
            if (elem.css) {
              modificationMap.set(elem.elementId, elem.css);
            }
          });
        }
      });

      const observer = new MutationObserver(() => {
        modificationMap.forEach((css, elementId) => {
          const element = document.getElementById(elementId);
          if (element) {
            Object.entries(css).forEach(([prop, value]) => {
              element.style.setProperty(prop, value, "important");
            });

            const nestedElements =
              element.querySelectorAll("h1, h2, h3, h4, p");
            nestedElements.forEach((nestedElem) => {
              Object.entries(css).forEach(([prop, value]) => {
                nestedElem.style.setProperty(prop, value, "important");
              });
            });

            if (!element.classList.contains("sc-font-modified")) {
              element.classList.add("sc-font-modified");
            }

            modificationMap.delete(elementId);
          }
        });

        // stop observing once work is done to avoid constant churn
        if (modificationMap.size === 0) observer.disconnect();
      });

      const targetBody = isSameOrigin ? parent.document.body : document.body;
      observer.observe(targetBody, {
        childList: true,
        subtree: true,
      });
    } catch (error) {
      console.error("❌ Error Fetching Modifications:", error);
      if (retries > 0) {
        setTimeout(() => fetchModifications(retries - 1), 2000);
      }
    }
  }

  window.addEventListener("load", async () => {
    await fetchModifications();
  });

  async function addHeadingEventListeners() {
    const widgetContainer = document.getElementById("sc-widget-container");
    if (!widgetContainer) return;

    if (widgetContainer.dataset.listenerAttached === "true") return;

    widgetContainer.dataset.listenerAttached = "true";

    function toggleTabClass(targetElement) {
      if (targetElement.classList.contains("sc-activeTab-border")) {
        targetElement.classList.remove("sc-activeTab-border");
        targetElement.classList.add("sc-inActiveTab-border");
      } else {
        targetElement.classList.remove("sc-inActiveTab-border");
        targetElement.classList.add("sc-activeTab-border");
      }
    }

    widgetContainer.addEventListener("click", (event) => {
      const tabElement = event.target;
      if (
        tabElement.classList.contains("sc-inActiveTab-border") ||
        tabElement.classList.contains("sc-activeTab-border")
      ) {
        toggleTabClass(tabElement);
      }
    });
  }

  const observer = new MutationObserver(() => {
    observer.disconnect();
    addHeadingEventListeners();
    fetchModifications();
    setTimeout(() => {
      const obsTarget = isSameOrigin ? parent.document.body : document.body;
      observer.observe(obsTarget, { childList: true, subtree: true });
    }, 120);
  });
  const obsTarget = isSameOrigin ? parent.document.body : document.body;
  observer.observe(obsTarget, { childList: true, subtree: true });

  addHeadingEventListeners();

  function handleAndDetect(clickedBlock) {
    handleBlockClick(
      { target: clickedBlock },
      {
        getTextType,
        getHoverTextType,
        selectedElement,
        setSelectedElement: (val) => (selectedElement = val),
        setLastClickedBlockId: (val) => (lastClickedBlockId = val),
        setLastClickedElement: (val) => (lastClickedElement = val),
        setLastAppliedAlignment: (val) => (lastAppliedAlignment = val),
        setLastActiveAlignmentElement: (val) =>
          (lastActiveAlignmentElement = val),
      }
    );

    detectBlockElementTypes(clickedBlock);
  }

  async function loadWidgetFromString(htmlString, clickedBlock) {
    if (widgetContainer) return;

    widgetContainer = document.createElement("div");
    widgetContainer.id = "sc-widget-container";
    widgetContainer.classList.add(
      "sc-fixed",
      "sc-text-color-white",
      "sc-universal",
      "sc-z-999999"
    );
    Object.assign(widgetContainer.style, {
      visibility: "hidden",
      opacity: "0",
      height: "0px",
      overflow: "hidden",
      willChange: "height, opacity, transform",
    });

    const cssHref =
      "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
    try {
      await loadStylesheetOnce(cssHref);
    } catch (e) {
      console.warn("⚠️ parent.css failed to preload; continuing anyway.", e);
    }

    const contentWrapper = document.createElement("div");
    contentWrapper.innerHTML = htmlString;
    widgetContainer.appendChild(contentWrapper);

    document.body.appendChild(widgetContainer);

    try {
      const { initImageMaskControls } = await import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/initImageMaskControls.js"
      );
      initImageMaskControls(() => selectedElement);
    } catch (e) {
      console.warn("initImageMaskControls load failed:", e);
    }

    function makeWidgetDraggable() {
      if (!widgetContainer) return;

      // Default pin position every time this runs
      widgetContainer.style.setProperty("position", "fixed", "important");
      widgetContainer.style.setProperty("z-index", "999999", "important");
      widgetContainer.style.setProperty("top", "100px", "important");
      widgetContainer.style.setProperty("right", "100px", "important");
      widgetContainer.style.removeProperty("left");
      widgetContainer.style.removeProperty("transform"); // ensure no prior transforms fight us

      let offsetX = 0,
        offsetY = 0,
        isDragging = false;

      function startDrag(event) {
        const draggableElement = event.target.closest("#sc-grabbing");
        if (!draggableElement || event.target.closest(".sc-dropdown")) return;

        event.preventDefault();
        isDragging = true;

        const rect = widgetContainer.getBoundingClientRect();
        const clientX = event.touches
          ? event.touches[0].clientX
          : event.clientX;
        const clientY = event.touches
          ? event.touches[0].clientY
          : event.clientY;

        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;

        // When dragging starts, switch to left/top coords for smooth movement
        widgetContainer.style.removeProperty("right");
        widgetContainer.style.left = rect.left + "px";

        document.addEventListener("mousemove", moveAt);
        document.addEventListener("mouseup", stopDragging);
        document.addEventListener("touchmove", moveAt, { passive: false });
        document.addEventListener("touchend", stopDragging);
      }

      function moveAt(event) {
        if (!isDragging) return;

        const clientX = event.touches
          ? event.touches[0].clientX
          : event.clientX;
        const clientY = event.touches
          ? event.touches[0].clientY
          : event.clientY;

        const maxX = window.innerWidth - widgetContainer.offsetWidth;
        const maxY = window.innerHeight - widgetContainer.offsetHeight;

        const newX = Math.max(0, Math.min(maxX, clientX - offsetX));
        const newY = Math.max(0, Math.min(maxY, clientY - offsetY));

        widgetContainer.style.left = newX + "px";
        widgetContainer.style.top = newY + "px";

        if (event.cancelable) event.preventDefault();
      }

      function stopDragging() {
        isDragging = false;
        document.removeEventListener("mousemove", moveAt);
        document.removeEventListener("mouseup", stopDragging);
        document.removeEventListener("touchmove", moveAt);
        document.removeEventListener("touchend", stopDragging);
      }

      // Clean old listeners before binding
      widgetContainer.removeEventListener("mousedown", startDrag);
      widgetContainer.removeEventListener("touchstart", startDrag);

      widgetContainer.addEventListener("mousedown", startDrag);
      widgetContainer.addEventListener("touchstart", startDrag, {
        passive: false,
      });
    }

    makeWidgetDraggable();
    setTimeout(() => {
      const placeholders = widgetContainer.querySelectorAll(
        ".sc-arrow-placeholder"
      );
      placeholders.forEach((span) => {
        const isRotate = span.classList.contains("sc-rotate-180");
        const cloneClassList = Array.from(span.classList);
        const originalId = span.getAttribute("id") || "";
        const id =
          originalId || `sc-arrow-${Math.floor(Math.random() * 10000)}`;
        const svg = createHoverableArrowSVG(id, isRotate);
        cloneClassList.forEach((cls) => svg.classList.add(cls));
        span.replaceWith(svg);
      });
      ButtonAdvanceToggleControls();
    }, 100);

    widgetLoaded = true;

    initImageSectionToggleControls();
    tooltipControls();
    ButtonAdvanceToggleControls();
    initButtonSectionToggleControls();
    initEffectAnimationDropdownToggle(() => selectedElement);
    button_initEffectAnimationDropdownToggle(() => selectedElement);
    opacitybutton_initEffectAnimationDropdownToggle(() => selectedElement);
    horizontal_button_initEffectAnimationDropdownToggle(() => selectedElement);
    initEffectAnimationDropdownToggle(() => selectedElement);
    horizontalinitEffectAnimationDropdownToggle(() => selectedElement);
    blurinitEffectAnimationDropdownToggle(() => selectedElement);
    scaleinitEffectAnimationDropdownToggle(() => selectedElement);
    rotateinitEffectAnimationDropdownToggle(() => selectedElement);
    opacityinitEffectAnimationDropdownToggle(() => selectedElement);
    WidgetTypoSectionStateControls();
    initImageStateTabToggle();
    initButtonStructureGapTypeToggle();
    initTypoStructureGapTypeToggle();
    WidgetImageHoverToggleControls();

    initHoverTypoTabControls([
      {
        buttonId: "typo-all-hover-font-button",
        sectionId: "typo-all-hover-font-section",
      },
      {
        buttonId: "typo-all-hover-border-button",
        sectionId: "typo-all-hover-border-section",
      },
      {
        buttonId: "typo-all-hover-shadow-button",
        sectionId: "typo-all-hover-shadow-section",
      },
      {
        buttonId: "typo-all-hover-effects-button",
        sectionId: "typo-all-hover-effects-section",
      },
      {
        buttonId: "typo-bold-hover-font-button",
        sectionId: "typo-bold-hover-font-section",
      },
      {
        buttonId: "typo-italic-hover-font-button",
        sectionId: "typo-italic-hover-font-section",
      },
      {
        buttonId: "typo-link-hover-font-button",
        sectionId: "typo-link-hover-font-section",
      },
    ]);
    initHoverButtonSectionToggleControls();
    if (typeof hoverTypoTabSelect === "function") {
      hoverTypoTabSelect({ target: widgetContainer });
    }
    initHoverButtonEffectDropdowns();
    initImageUploadPreview(() => selectedElement);

    if (clickedBlock) {
      waitForElement("#typoSection, #imageSection, #buttonSection")
        .then(() => {
          handleBlockClick(
            { target: clickedBlock },
            {
              getTextType,
              getHoverTextType,
              selectedElement,
              setSelectedElement: (val) => {
                selectedElement = val;

                setTimeout(() => {
                  buttonAdvanceSyncCustomTimelineArrow(selectedElement);
                  horizontalbuttonAdvanceSyncCustomTimelineArrow(
                    selectedElement
                  );
                  opacitybuttonAdvanceSyncCustomTimelineArrow(selectedElement);
                  scalebuttonAdvanceSyncCustomTimelineArrow(selectedElement);
                  rotatebuttonAdvanceSyncCustomTimelineArrow(selectedElement);
                  blurbuttonAdvanceSyncCustomTimelineArrow(selectedElement);

                  TypoAdvanceSyncCustomTimelineArrow(selectedElement);
                  TypoHorizontalAdvanceSyncCustomTimelineArrow(selectedElement);
                  TypoOpacityAdvanceSyncCustomTimelineArrow(selectedElement);
                  TypoScaleAdvanceSyncCustomTimelineArrow(selectedElement);
                  TypoRotateAdvanceSyncCustomTimelineArrow(selectedElement);
                  TypoBlurAdvanceSyncCustomTimelineArrow(selectedElement);

                  initButtonAdvanceScrollEffectReset(selectedElement);
                }, 300);
              },
              setLastClickedBlockId: (val) => (lastClickedBlockId = val),
              setLastClickedElement: (val) => (lastClickedElement = val),
              setLastAppliedAlignment: (val) => (lastAppliedAlignment = val),
              setLastActiveAlignmentElement: (val) =>
                (lastActiveAlignmentElement = val),
            }
          );
          detectBlockElementTypes(clickedBlock);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }

  async function createWidget(clickedBlock) {
    if (__sc_creating || widgetLoaded) return;
    __sc_creating = true;
    try {
      const module = await import(
        "https://fatin-webefo.github.io/squareCraft-plugin/html.js"
      );
      const htmlString = module.html();

      if (typeof htmlString === "string" && htmlString.trim().length > 0) {
        await loadWidgetFromString(htmlString, clickedBlock);
        setTimeout(() => {
          if (typeof module.initToggleSwitch === "function") {
            module.initToggleSwitch();
          }
        }, 200);
      } else {
        console.error("🚨 html() returned empty/invalid");
      }
    } catch (err) {
      console.error("🚨 Error loading HTML module:", err);
    } finally {
      __sc_creating = false;
    }
    triggerLaunchAnimation();
  }

  function waitForElement(selector, timeout = 3000) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) {
        resolve(el);
        return;
      }

      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          resolve(el);
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout: Element ${selector} not found`));
      }, timeout);
    });
  }

  // (removed the second, duplicate body click closer here — attachGlobalClickListener handles it)

  function adjustWidgetPosition() {
    if (!widgetContainer) return;
    widgetContainer.style.setProperty("position", "fixed", "important");
    widgetContainer.style.setProperty("right", "100px", "important");
    widgetContainer.style.setProperty("top", "100px", "important");
    widgetContainer.style.removeProperty("left");
    widgetContainer.style.removeProperty("transform");
  }

  window.addEventListener("resize", adjustWidgetPosition);
  adjustWidgetPosition();

  function checkView() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      moveWidgetToMobileContainer();
    } else {
      moveWidgetToDesktop();
    }
  }

  function moveWidgetToMobileContainer() {
    if (!widgetContainer) return;

    const mobileContainer = safeQuerySelector(
      'div[data-test="mouse-catcher-right-of-frame"].right-scroll-and-hover-catcher.js-space-around-frame'
    );

    if (mobileContainer) {
      const existingLink = safeQuerySelector(
        'link[href="https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css"]'
      );

      if (!existingLink) {
        function createAndAppendToHead(tag) {
          const el = isSameOrigin
            ? parent.document.createElement(tag)
            : document.createElement(tag);
          const head = isSameOrigin ? parent.document.head : document.head;
          head.appendChild(el);
          return el;
        }

        const link = createAndAppendToHead("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href =
          "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
      }

      mobileContainer.classList.add("sc-relative");

      widgetContainer.style.setProperty("position", "absolute", "important");
      widgetContainer.style.right = "11%";
      widgetContainer.style.top = "50%";
      widgetContainer.style.transform = "translateY(-50%)";

      mobileContainer.appendChild(widgetContainer);
    } else {
      console.warn(
        "❌ Mobile container not found. Widget remains in default location."
      );
    }

    if (!document.body.contains(widgetContainer))
      document.body.appendChild(widgetContainer);
    adjustWidgetPosition();
  }

  fetchModifications();

  function moveWidgetToDesktop() {
    if (!widgetContainer) return;
    document.body.appendChild(widgetContainer);
    if (!document.body.contains(widgetContainer))
      document.body.appendChild(widgetContainer);
    adjustWidgetPosition();
  }

  checkView();
  window.addEventListener("resize", checkView);
})();
