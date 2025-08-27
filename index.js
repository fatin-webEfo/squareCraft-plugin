(async function squareCraft() {
  let widgetReadyPromise = null;
  let lastToggleAt = 0;
  let justOpenedUntil = 0;
  let __sc_creating = false;

  const { __sc_ai_init, __sc_ai_ui } = await import(
    "https://fatin-webefo.github.io/squareCraft-plugin/index.js"
  );
  await __sc_ai_init();
  __sc_ai_ui();

  const HOST_DOC = (() => {
    try {
      if (parent && parent !== window) {
        void parent.document.body;
        return parent.document;
      }
    } catch (_) {}
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
        await waitForElement("#typoSection, #imageSection, #buttonSection", 4000);
        handleAndDetect(clickedBlock);
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function handleUserQuery(query) {
    const selectedElement = document.querySelector('[id^="block-"]');
    if (selectedElement) {
      const response = await __sc_ai_ask(query, selectedElement);
      console.log("AI Response:", response);
      __sc_apply_json(response, selectedElement);
    }
  }

  async function createWidget(clickedBlock) {
    if (__sc_creating) return;
    __sc_creating = true;
    try {
      const module = await import(
        "https://fatin-webefo.github.io/squareCraft-plugin/html.js"
      );
      const htmlString = module.html();

      if (typeof htmlString === "string" && htmlString.trim().length > 0) {
        await loadWidgetFromString(htmlString, clickedBlock);
      } else {
        console.error("Failed to load valid HTML for widget.");
      }
    } catch (err) {
      console.error("Error creating widget:", err);
    } finally {
      __sc_creating = false;
    }
  }

  document.body.addEventListener("click", (event) => {
    const clickedBlock = event.target.closest('[id^="block-"]');
    if (clickedBlock) {
      handleUserQuery("How do I change the button border?");
    }
  });

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
    ButtonAdvanceToggleControls();
  }

  function loadStylesheetOnce(href) {
    return new Promise((resolve, reject) => {
      const existsLink = document.querySelector(`link[href="${href}"]`);
      if (existsLink) resolve();
      else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      }
    });
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

  async function createWidgetFromString(htmlString, clickedBlock) {
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
    ButtonAdvanceToggleControls();
  }

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

async  function fetchModifications() {
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
  }

  window.addEventListener("load", async () => {
    await fetchModifications();
  });
})();
