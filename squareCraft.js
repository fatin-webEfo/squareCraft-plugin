(async function squareCraft() {
  const Url = parent.document.location.href
  console.log("parent", Url)
  const widgetScript = document.getElementById("sc-script");

  if (!widgetScript) {
    console.error(
      "❌ Widget script not found! Ensure the script tag exists with id 'sc-script'."
    );
    return;
  }
  let selectedElement = null;
  let widgetContainer = null;

  let widgetLoaded = false;
  let token = widgetScript.dataset?.token;
  let userId = widgetScript.dataset?.uId;
  let widgetId = widgetScript.dataset?.wId;

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


  let lastClickedBlockId = null;
  let lastClickedElement = null;
  let lastAppliedAlignment = null;
  let lastActiveAlignmentElement = null;

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

  const { getTextType } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/utils/getTextType.js");
  const { handleFontWeightDropdownClick } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleFontWeightDropdownClick.js");
  const { handleBlockClick } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleBlockClick.js");
  const { handleAlignmentClick } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleAlignmentClick.js");
  const { handleTextColorClick } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/handleTextColorClick.js");
  const { typoTabSelect } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/typoTabSelect.js");
  const { detectBlockElementTypes } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/components/BlockType/detectBlockElementTypes.js");
  const { initImageSectionControls } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initImageSectionControls.js");
  const { initImageSectionToggleControls } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initImageSectionToggleControls.js");
  const { initButtonSectionToggleControls } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initButtonSectionToggleControls/initButtonSectionToggleControls.js");
  const { initHoverButtonSectionToggleControls } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initHoverButtonSectionToggleControls/initHoverButtonSectionToggleControls.js");
  const { initImageUploadPreview } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initButtonSectionToggleControls/initImageUploadPreview.js");
  const { initImageMaskControls } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/clickEvents/initImageMaskControls.js");
  const { getSquarespaceThemeStyles } = await import('https://fatin-webefo.github.io/squareCraft-plugin/src/utils/getSquarespaceThemeStyles.js');
  const { initBorderColorPaletteToggle } = await import('https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initBorderColorPaletteToggle.js');
  const { initButtonFontColorPaletteToggle } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initButtonFontColorPaletteToggle/initButtonFontColorPaletteToggle.js"
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
         initButtonShadowControls } = await import('https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initButtonStyles/initButtonStyles.js');
         const {initHoverButtonShadowControls} = await import('https://fatin-webefo.github.io/squareCraft-plugin/src/utils/initButtonStyles/initButtonHoverStyles.js');
  const themeColors = await getSquarespaceThemeStyles();


  document.body.addEventListener("click", (event) => {


    if (selectedElement) {
      initButtonStyles(selectedElement);
    }
    if (selectedElement) {
      initHoverButtonShadowControls(() => selectedElement);

    }
    const trigger = event.target.closest("#border-color-select");


    if (trigger) {
      console.log("✅ border-color-select clicked");
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
        .catch(error => {
          console.error(error.message);
        });
    }
    setTimeout(() => {
      handleBlockClick(event, {
        getTextType,
        selectedElement,
        setSelectedElement: (val) => selectedElement = val,
        setLastClickedBlockId: (val) => lastClickedBlockId = val,
        setLastClickedElement: (val) => lastClickedElement = val,
        setLastAppliedAlignment: (val) => lastAppliedAlignment = val,
        setLastActiveAlignmentElement: (val) => lastActiveAlignmentElement = val
      });

      initButtonFontColorPaletteToggle(themeColors, () => selectedElement);
      initButtonIconPositionToggle(() => selectedElement);
      initButtonIconRotationControl(() => selectedElement);
      initButtonIconSizeControl(() => selectedElement);
      initButtonIconSpacingControl(() => selectedElement);
      initButtonBorderControl(() => selectedElement);
      initButtonShadowControls(() => selectedElement);
      initButtonBorderTypeToggle(() => selectedElement, ( selected) => {
        if (selected) {
          const event = new Event("reapplyBorder");
          selected.dispatchEvent(event);
        }
      });
           initButtonBorderRadiusControl(() => selectedElement);
    }, 50);



    handleAlignmentClick(event, {
      lastClickedElement,
      getTextType,
      applyStylesToElement,
      lastAppliedAlignment,
      setLastAppliedAlignment: (val) => lastAppliedAlignment = val,
      lastActiveAlignmentElement,
      setLastActiveAlignmentElement: (val) => lastActiveAlignmentElement = val,
      lastClickedBlockId,
      userId,
      token,
      widgetId
    });

    handleTextColorClick(event, lastClickedElement, applyStylesToElement);
    handleFontWeightDropdownClick(event);
    typoTabSelect(event);

  });





  document.body.addEventListener("click", (event) => {
    const dropdownTrigger = event.target.closest("#font-weight-dropdown");
    const dropdownList = document.getElementById("font-weight-dropdown-list");


    if (dropdownTrigger) {
      if (dropdownList.classList.contains("sc-hidden")) {
        dropdownList.classList.remove("sc-hidden");
        console.log("✅ sc-hidden removed: dropdown shown");
      } else {
        dropdownList.classList.add("sc-hidden");
        console.log("✅ sc-hidden added: dropdown hidden");
      }
    }
  });


  async function fetchModifications(retries = 3) {
    const module = await import("https://fatin-webefo.github.io/squareCraft-plugin/html.js");
    const htmlString = module.html();

    if (typeof htmlString === "string" && widgetContainer && widgetContainer.innerHTML.trim() === "") {
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

    const pageId = document.querySelector("article[data-page-sections]")?.getAttribute("data-page-sections");
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
            "Authorization": `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      if (!data.modifications || !Array.isArray(data.modifications)) {
        console.warn("⚠️ No modifications found or invalid format");
        return;
      }

      const modificationMap = new Map();

      data.modifications.forEach(mod => {
        if (mod.pageId === pageId) {
          mod.elements.forEach(elem => {
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

            const nestedElements = element.querySelectorAll("h1, h2, h3, h4, p");
            nestedElements.forEach(nestedElem => {
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

      observer.observe(document.body, { childList: true, subtree: true });

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
      if (tabElement.classList.contains('sc-inActiveTab-border') || tabElement.classList.contains('sc-activeTab-border')) {
        toggleTabClass(tabElement);
      }
    });
  }

  const observer = new MutationObserver(() => {
    addHeadingEventListeners();
    fetchModifications();
  });

  observer.observe(parent.document.body, { childList: true, subtree: true });

  addHeadingEventListeners();



  try {
    const { injectNavbarIcon } = await import(
      "https://fatin-webefo.github.io/squareCraft-plugin/injectNavbarIcon.js"
    );
    injectNavbarIcon();
  } catch (error) {
    console.error("🚨 Failed to load navbar icon script", error);
  }


  async function toggleWidgetVisibility(event) {
    event.stopPropagation();
    const clickedBlock = event?.target?.closest('[id^="block-"]');
    if (!clickedBlock) {
      return;
    }


    if (!widgetLoaded) {
      await createWidget(clickedBlock);
      waitForElement("#typoSection, #imageSection, #buttonSection", 4000).then(() => {
        handleAndDetect(clickedBlock);
      }).catch(error => {
        console.error(error.message);
      });
    } else {
      widgetContainer.style.display = widgetContainer.style.display === "none" ? "block" : "none";
      waitForElement("#typoSection, #imageSection, #buttonSection", 4000).then(() => {
        handleAndDetect(clickedBlock);
      }).catch(error => {
        console.error(error.message);
      });
    }
  }

  function handleAndDetect(clickedBlock) {
    handleBlockClick({ target: clickedBlock }, {
      getTextType,
      selectedElement,
      setSelectedElement: val => selectedElement = val,
      setLastClickedBlockId: val => lastClickedBlockId = val,
      setLastClickedElement: val => lastClickedElement = val,
      setLastAppliedAlignment: val => lastAppliedAlignment = val,
      setLastActiveAlignmentElement: val => lastActiveAlignmentElement = val
    });
  
    detectBlockElementTypes(clickedBlock);
  }
  



  async function createWidget(clickedBlock) {
    try {
      const module = await import("https://fatin-webefo.github.io/squareCraft-plugin/html.js");
      const htmlString = module.html();

      if (typeof htmlString === "string" && htmlString.trim().length > 0) {
        loadWidgetFromString(htmlString, clickedBlock);
        setTimeout(() => {
          if (typeof module.initToggleSwitch === "function") {
            module.initToggleSwitch();
          }
        }, 200);
      }
    } catch (err) {
      console.error("🚨 Error loading HTML module:", err);
    }
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

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout: Element ${selector} not found`));
      }, timeout);
    });
  }


  function loadWidgetFromString(htmlString, clickedBlock) {
    if (!widgetContainer) {
      widgetContainer = document.createElement("div");
      widgetContainer.id = "sc-widget-container";
      widgetContainer.classList.add(
        "sc-fixed", "sc-text-color-white", "sc-universal", "sc-z-9999"
      );

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.type = "text/css";
      styleLink.href = "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
      widgetContainer.appendChild(styleLink);

      const contentWrapper = document.createElement("div");
      contentWrapper.innerHTML = htmlString;
      widgetContainer.appendChild(contentWrapper);

      widgetContainer.style.display = "block";
      document.body.appendChild(widgetContainer);

      initImageMaskControls(() => selectedElement);
      makeWidgetDraggable();
      widgetLoaded = true;
      initImageSectionToggleControls();
      initButtonSectionToggleControls();
      initHoverButtonSectionToggleControls();
      initImageUploadPreview(() => selectedElement);

      if (clickedBlock) {
        waitForElement("#typoSection, #imageSection, #buttonSection")
          .then(() => {
            handleBlockClick({ target: clickedBlock }, {
              getTextType,
              selectedElement,
              setSelectedElement: (val) => selectedElement = val,
              setLastClickedBlockId: (val) => lastClickedBlockId = val,
              setLastClickedElement: (val) => lastClickedElement = val,
              setLastAppliedAlignment: (val) => lastAppliedAlignment = val,
              setLastActiveAlignmentElement: (val) => lastActiveAlignmentElement = val
            });
            detectBlockElementTypes(clickedBlock);
          })
          .catch(error => {
            console.error(error.message);
          });
      }
    }
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

      if (!draggableElement || event.target.closest(".sc-dropdown")) {
        return;
      }

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

      let newX = clientX - offsetX;
      let newY = clientY - offsetY;

      let maxX = window.innerWidth - widgetContainer.offsetWidth;
      let maxY = window.innerHeight - widgetContainer.offsetHeight;

      newX = Math.max(0, Math.min(maxX, newX));
      newY = Math.max(0, Math.min(maxY, newY));

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
    const isHiddenInput = e.target.tagName === "INPUT" && e.target.type === "file";

    if (!isInsideWidget && !isToolbarIcon && !isHiddenInput && widgetContainer?.style.display === "block") {
      widgetContainer.style.display = "none";
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
    async function waitForTargets(selector, maxRetries = 10, delay = 500) {
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        const elements = parent.document.querySelectorAll(selector);
        if (elements.length > 0) return elements;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      console.warn("⏱️ Timeout: Target elements not found:", selector);
      return [];
    }

    async function injectIconIntoTargetElements() {
      const targets = await waitForTargets(".tidILMJ7AVANuKwS:not(.sc-processed)");

      targets.forEach((element) => {
        element.classList.add("sc-processed");

        const deleteButton = element.querySelector('[aria-label="Remove"]');
        if (!deleteButton) {
          console.warn("❌ Delete button not found, skipping:", element);
          return;
        }

        if (element.querySelector(".sc-toolbar-icon")) return;

        const clonedIcon = document.createElement("img");
        clonedIcon.src = "https://i.ibb.co.com/kg9fn02s/Frame-33.png";
        clonedIcon.alt = "sc";
        clonedIcon.classList.add("sc-toolbar-icon", "sc-z-99999");
        Object.assign(clonedIcon.style, {
          width: "35px",
          height: "35px",
          borderRadius: "20%",
          cursor: "pointer",
          backgroundColor: "white",
          marginLeft: "6px"
        });

        deleteButton.parentNode.insertBefore(clonedIcon, deleteButton.nextSibling);

        clonedIcon.addEventListener("click", function (event) {
          event.stopPropagation();
          event.preventDefault();
          toggleWidgetVisibility(event);
          if (!widgetLoaded) {
            createWidget().then(() => {
              widgetContainer = document.getElementById("sc-widget-container");
              if (widgetContainer) {
                widgetContainer.style.display = "block";
              } else {
                console.error("❌ Widget container not found after creation.");
              }
            });
          } else {
            widgetContainer.style.display =
              widgetContainer.style.display === "none" ? "block" : "none";
          }
        });
      });
    }

    injectIconIntoTargetElements(); // run once at startup

    const observer = new MutationObserver(() => {
      injectIconIntoTargetElements();
    });
    observer.observe(parent.document.body, { childList: true, subtree: true });

    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.contentWindow.document.addEventListener("click", function (event) {
        if (event.target.classList.contains("sc-admin-icon")) {
          event.stopPropagation();
          event.preventDefault();
          toggleWidgetVisibility(event);
        }
      });
    }
  }


  function waitForNavBar(attempts = 0) {
    if (attempts > 10) {
      console.error("❌ Failed to find Squarespace nav bar.");
      return;
    }
    const nav = parent.document.querySelector("ul.css-1tn5iw9");
    if (!nav) {
      setTimeout(() => waitForNavBar(attempts + 1), 500);
    } else {
      injectIcon();
    }
  }

  waitForNavBar();
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

    const mobileContainer = parent.document.querySelector(
      'div[data-test="mouse-catcher-right-of-frame"].right-scroll-and-hover-catcher.js-space-around-frame'
    );

    if (mobileContainer) {
      const existingLink = parent.document.querySelector(
        'link[href="https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css"]'
      );

      if (!existingLink) {
        const link = parent.document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href =
          "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
        parent.document.head.appendChild(link);
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
