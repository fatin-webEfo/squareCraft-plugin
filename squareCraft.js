(async function squareCraft() {
  // icon set fast
  function triggerLaunchAnimation() {
    const icon = document.querySelector(".sc-toolbar-icon");
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
    const existing = Array.from(document.styleSheets).find(
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

  // Fallback if GSAP not ready yet (first click)
  if (!window.gsap) {
    el.style.visibility = "visible";
    el.style.opacity = "1";
    el.style.height = "auto";
    el.style.overflow = "visible";
    return;
  }

  const content = el.firstElementChild;
  el.style.visibility = "visible";
  el.style.overflow = "hidden";
  const fullH = content ? content.scrollHeight : 320;

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


  try {
    const { injectNavbarIcon } = await import(
      "https://fatin-webefo.github.io/squareCraft-plugin/injectNavbarIcon.js"
    );
    injectNavbarIcon();
  } catch (error) {
    console.error("🚨 Failed to load navbar icon script", error);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      requestAnimationFrame(() => injectNavbarIcon());
    });
  } else {
    requestAnimationFrame(() => injectNavbarIcon());
  }
  // icon set fast
  function attachGlobalClickListener() {
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

  const Url = isSameOrigin
    ? parent.document.location.href
    : document.location.href;
  console.log("parent", Url);

  try {
    void parent.document;
  } catch (e) {
    isSameOrigin = false;
  }

  function safeQuerySelector(selector) {
    return isSameOrigin
      ? parent.document.querySelector(selector)
      : document.querySelector(selector);
  }

  function safeQuerySelectorAll(selector) {
    try {
      if (parent && parent !== window && parent.document !== document) {
        return parent.document.querySelectorAll(selector);
      }
    } catch (err) {
      if (err.name === "SecurityError") {
        console.warn(
          `⚠️ Cross-origin restriction: falling back to current document for selectorAll: ${selector}`
        );
      } else {
        console.error(`❌ Error in safeQuerySelectorAll("${selector}"):`, err);
      }
    }
    return document.querySelectorAll(selector);
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

  //  viewport

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
  } = await import( 
    "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonAdvanceStyles/WidgetButtonAdvanceStyles.js"
  );
  const {
    initTypoAdvanceStyles,
    horizontalinitTypoAdvanceStyles,
    opacityinitTypoAdvanceStyles,
    horizontalinitEffectAnimationDropdownToggle,
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
  const { initImageMaskControls } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/initImageMaskControls.js"
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
      horizontalinitEffectAnimationDropdownToggle(() => selectedElement);
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
    addHeadingEventListeners();
    fetchModifications();
  });

  const obsTarget = isSameOrigin ? parent.document.body : document.body;
  observer.observe(obsTarget, { childList: true, subtree: true });

  addHeadingEventListeners();

async function toggleWidgetVisibility(event, clickedBlock = null) {
  event?.stopPropagation?.();

  if (!widgetLoaded) {
    await createWidget(clickedBlock); // creates regardless of block
  }

  const isHidden =
    !widgetContainer ||
    widgetContainer.style.visibility === "hidden" ||
    widgetContainer.style.opacity === "0" ||
    widgetContainer.style.height === "0px";

  if (isHidden) {
    if (window.gsap) animateWidgetOpen(widgetContainer, 0.2);
    else {
      widgetContainer.style.visibility = "visible";
      widgetContainer.style.opacity = "1";
      widgetContainer.style.height = "auto";
      widgetContainer.style.overflow = "visible";
    }
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
      await waitForElement("#typoSection, #imageSection, #buttonSection", 4000);
      handleAndDetect(clickedBlock);
    } catch (err) {
      console.error(err.message);
    }
  }
}


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

   // 1) create container (hidden to avoid FOUC)
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

   // 2) ensure stylesheet is loaded BEFORE revealing the widget
   const cssHref =
     "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
   try {
     await loadStylesheetOnce(cssHref);
   } catch (e) {
     console.warn("⚠️ parent.css failed to preload; continuing anyway.", e);
   }

   // (we do NOT append a second <link> inside the widget; it's already in <head>)

   // 3) inject content markup
   const contentWrapper = document.createElement("div");
   contentWrapper.innerHTML = htmlString;
   widgetContainer.appendChild(contentWrapper);

   // 4) mount to DOM (still hidden)
   document.body.appendChild(widgetContainer);

   // 5) post-mount init (your existing logic)
   initImageMaskControls(() => selectedElement);
   makeWidgetDraggable();

   setTimeout(() => {
     const placeholders = widgetContainer.querySelectorAll(
       ".sc-arrow-placeholder"
     );
     placeholders.forEach((span) => {
       const isRotate = span.classList.contains("sc-rotate-180");
       const cloneClassList = Array.from(span.classList);
       const originalId = span.getAttribute("id") || "";
       const id = originalId || `sc-arrow-${Math.floor(Math.random() * 10000)}`;

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

   // effect dropdowns
   initEffectAnimationDropdownToggle(() => selectedElement);
   horizontalinitEffectAnimationDropdownToggle(() => selectedElement);
   scaleinitEffectAnimationDropdownToggle(() => selectedElement);
   rotateinitEffectAnimationDropdownToggle(() => selectedElement);
   opacityinitEffectAnimationDropdownToggle(() => selectedElement);

   WidgetTypoSectionStateControls();
   initImageStateTabToggle();
   initButtonStructureGapTypeToggle();
   initTypoStructureGapTypeToggle();
   WidgetImageHoverToggleControls();

   // hover/advanced UI
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
   hoverTypoTabSelect();
   initHoverButtonEffectDropdowns();
   initImageUploadPreview(() => selectedElement);

   // 6) finally reveal with animation (height 0 → auto, opacity 0 → 1)
   requestAnimationFrame(() => animateWidgetOpen(widgetContainer, 0.2));

   // 7) if we came from a clicked block, finish detection + wire effects
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
                 // buttons
                 buttonAdvanceSyncCustomTimelineArrow(selectedElement);
                 horizontalbuttonAdvanceSyncCustomTimelineArrow(
                   selectedElement
                 );
                 opacitybuttonAdvanceSyncCustomTimelineArrow(selectedElement);
                 scalebuttonAdvanceSyncCustomTimelineArrow(selectedElement);
                 rotatebuttonAdvanceSyncCustomTimelineArrow(selectedElement);
                 blurbuttonAdvanceSyncCustomTimelineArrow(selectedElement);

                 // typo
                 TypoAdvanceSyncCustomTimelineArrow(selectedElement);
                 TypoHorizontalAdvanceSyncCustomTimelineArrow(selectedElement);
                 TypoOpacityAdvanceSyncCustomTimelineArrow(selectedElement);
                 TypoScaleAdvanceSyncCustomTimelineArrow(selectedElement);
                 TypoRotateAdvanceSyncCustomTimelineArrow(selectedElement);

                 // reset hooks
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
   try {
     const module = await import(
       "https://fatin-webefo.github.io/squareCraft-plugin/html.js"
     );
     const htmlString = module.html();

     if (typeof htmlString === "string" && htmlString.trim().length > 0) {
       await loadWidgetFromString(htmlString, clickedBlock); // ← IMPORTANT
       setTimeout(() => {
         if (typeof module.initToggleSwitch === "function") {
           module.initToggleSwitch();
         }
       }, 200);
     }
   } catch (err) {
     console.error("🚨 Error loading HTML module:", err);
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

  function makeWidgetDraggable() {
    if (!widgetContainer) return;

    widgetContainer.style.position = "absolute";
    widgetContainer.style.zIndex = "999";
    widgetContainer.style.left = "10px";
    widgetContainer.style.top = "10px";

    let offsetX = 0,
      offsetY = 0,
      isDragging = false;

    function startDrag(event) {
      const draggableElement = event.target.closest("#sc-grabbing");
      if (!draggableElement || event.target.closest(".sc-dropdown")) return;

      event.preventDefault();
      isDragging = true;

      let clientX = event.clientX || event.touches?.[0]?.clientX;
      let clientY = event.clientY || event.touches?.[0]?.clientY;

      offsetX = clientX - widgetContainer.getBoundingClientRect().left;
      offsetY = clientY - widgetContainer.getBoundingClientRect().top;

      document.addEventListener("mousemove", moveAt);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchmove", moveAt);
      document.addEventListener("touchend", stopDragging);
    }

    function moveAt(event) {
      if (!isDragging) return;

      let clientX = event.clientX || event.touches?.[0]?.clientX;
      let clientY = event.clientY || event.touches?.[0]?.clientY;

      const newX = clientX - offsetX;
      const newY = clientY - offsetY;

      widgetContainer.style.left = `${newX}px`;
      widgetContainer.style.top = `${newY}px`;
    }

    function stopDragging() {
      isDragging = false;
      document.removeEventListener("mousemove", moveAt);
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchmove", moveAt);
      document.removeEventListener("touchend", stopDragging);
    }

    widgetContainer.removeEventListener("mousedown", startDrag);
    widgetContainer.removeEventListener("touchstart", startDrag);

    widgetContainer.addEventListener("mousedown", startDrag);
    widgetContainer.addEventListener("touchstart", startDrag);
  }

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

  function adjustWidgetPosition() {
    if (!widgetContainer) return;

    if (window.innerWidth <= 768) {
      widgetContainer.style.left = "auto";
      widgetContainer.style.right = "0px";
      widgetContainer.style.top = "100px";
    }
  }

  window.addEventListener("resize", adjustWidgetPosition);
  adjustWidgetPosition();

  function injectIcon() {
    async function waitForTargets(selector, timeout = 4000, interval = 100) {
      const start = Date.now();
      return new Promise((resolve) => {
        const check = () => {
          const elements = safeQuerySelectorAll(selector);
          if (elements.length > 0 || Date.now() - start > timeout) {
            resolve(elements);
          } else {
            setTimeout(check, interval);
          }
        };
        check();
      });
    }

    async function injectIconIntoTargetElements() {
      const targets = await waitForTargets(
        ".tidILMJ7AVANuKwS:not(.sc-processed)"
      );

      targets.forEach((element) => {
        element.classList.add("sc-processed");

        const deleteButton = element.querySelector('[aria-label="Remove"]');
        if (!deleteButton) {
          console.warn("❌ Delete button not found, skipping:", element);
          return;
        }

        if (element.querySelector(".sc-toolbar-icon")) return;

        const clonedIcon = document.createElement("img");
        clonedIcon.src =
          "https://fatin-webefo.github.io/squareCraft-plugin/public/squarecraft-only-logo.svg";
        clonedIcon.alt = "sc";
        clonedIcon.classList.add("sc-toolbar-icon", "sc-z-99999");
        Object.assign(clonedIcon.style, {
          width: "35px",
          height: "35px",
          borderRadius: "20%",
          cursor: "pointer",
          backgroundColor: "white",
          marginLeft: "6px",
        });

        deleteButton.parentNode.insertBefore(
          clonedIcon,
          deleteButton.nextSibling
        );

        clonedIcon.addEventListener("click", async function (event) {
          event.stopPropagation();
          event.preventDefault();
          await toggleWidgetVisibility(event, null); // works on first click
        });

      });
    }

    injectIconIntoTargetElements();

    const observer = new MutationObserver(() => {
      injectIconIntoTargetElements();
    });
    const obsTarget = isSameOrigin ? parent.document.body : document.body;
    observer.observe(obsTarget, { childList: true, subtree: true });

    try {
      iframe?.contentWindow?.document?.addEventListener("click", (event) => {
        if (event.target.classList.contains("sc-admin-icon")) {
          event.stopPropagation();
          event.preventDefault();
          toggleWidgetVisibility(event);
        }
      });
    } catch (e) {
      console.warn("⚠️ Could not access iframe document (likely cross-origin)");
    }
  }

  function fastInjectIconWhenDOMReady() {
    const run = () => requestIdleCallback(() => injectIcon());

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      run();
    } else {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive") run();
      });
    }
  }
  fastInjectIconWhenDOMReady();

  handleSectionFind();
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

      widgetContainer.style.position = "absolute";
      widgetContainer.style.right = "11%";
      widgetContainer.style.top = "50%";
      widgetContainer.style.transform = "translateY(-50%)";

      mobileContainer.appendChild(widgetContainer);
    } else {
      console.warn(
        "❌ Mobile container not found. Widget remains in default location."
      );
    }
  }

  fetchModifications();

  function moveWidgetToDesktop() {
    if (!widgetContainer) return;

    document.body.appendChild(widgetContainer);
  }

  checkView();
  window.addEventListener("resize", checkView);
})();
