(async function squareCraft() {
  // No changes
  // parent script call
  const widgetScript = document.getElementById("squareCraft-script");

  if (!widgetScript) {
    console.error(
      "❌ Widget script not found! Ensure the script tag exists with id 'squareCraft-script'."
    );
    return;
  }
  // parent script call
  // vars
  let widgetContainer = null;
  let widgetLoaded = false;
  // vars
  // Token and Ids
  let token = widgetScript.dataset?.token;
  let squareCraft_u_id = widgetScript.dataset?.uId;
  let squareCraft_w_id = widgetScript.dataset?.wId;

  if (token) {
    localStorage.setItem("squareCraft_auth_token", token);
    document.cookie = `squareCraft_auth_token=${token}; path=/; domain=${location.hostname}; Secure; SameSite=Lax`;
  }

  if (squareCraft_u_id) {
    localStorage.setItem("squareCraft_u_id", squareCraft_u_id);
    document.cookie = `squareCraft_u_id=${squareCraft_u_id}; path=.squarespace.com;`;
  }

  if (squareCraft_w_id) {
    localStorage.setItem("squareCraft_w_id", squareCraft_w_id);
    document.cookie = `squareCraft_w_id=${squareCraft_w_id}; path=.squarespace.com;`;
  }
  // Token and Ids


  document.addEventListener("DOMContentLoaded", function () {
    const selectedElement = document.querySelector(
      ".squareCraft-selected .sqs-html-content"
    );

    if (!selectedElement) {
      console.error("No selected element found.");
      return;
    }

    const fontSelector = document.getElementById("squareCraftFontSelector");

    if (!fontSelector) {
      console.error("Font selector not found.");
      return;
    }

    fontSelector.addEventListener("change", function () {
      const selectedFont = fontSelector.value;
      selectedElement.style.fontFamily = selectedFont;
    });

  });




  // Clicked outline
  // navbar icon

  try {
    const { injectNavbarIcon } = await import(
      "https://fatin-webefo.github.io/squareCraft-plugin/injectNavbarIcon.js"
    );
    injectNavbarIcon();
  } catch (error) {
    console.error("🚨 Failed to load navbar icon script", error);
  }

  // navbar Icon

  // Css cdn
  async function loadCSS(url, key) {
    let cachedData = localStorage.getItem(key);
    let lastFetched = localStorage.getItem(`${key}_timestamp`);
    let oneDay = 60 * 1000;

    if (cachedData && lastFetched && Date.now() - lastFetched < oneDay) {
      const style = document.createElement("style");
      style.textContent = cachedData;
      document.head.appendChild(style);
    } else {
      try {
        let response = await fetch(url);
        let text = await response.text();
        localStorage.setItem(key, text);
        localStorage.setItem(`${key}_timestamp`, Date.now());

        const style = document.createElement("style");
        style.textContent = text;
        document.head.appendChild(style);
      } catch (error) {
        console.error(`🚨 Failed to load ${key} from CDN`, error);
      }
    }
  }

  // Load CSS
  loadCSS(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css",
    "squareCraft_parentCSS"
  );

  // Css cdn
  // No changes

  async function createWidget() {
    try {
      let cachedWidget = localStorage.getItem("squareCraft_widget");
      let lastFetched = localStorage.getItem("squareCraft_widget_timestamp");
      let oneDay = 24 * 60 * 60 * 1000;
      let now = Date.now();

      if (cachedWidget && lastFetched && now - lastFetched < oneDay) {
        loadWidgetFromString(cachedWidget);
        return;
      }
      const module = await import(
        "https://fatin-webefo.github.io/squareCraft-plugin/html.js"
      );

      if (module && module.html) {
        const htmlString = module.html();

        if (typeof htmlString === "string" && htmlString.trim().length > 0) {
          localStorage.setItem("squareCraft_widget", htmlString);
          localStorage.setItem("squareCraft_widget_timestamp", now.toString());
          loadWidgetFromString(htmlString);
        } else {
          console.error("❌ Retrieved HTML string is invalid or empty!");
        }
      } else {
        console.error("❌ Failed to retrieve the HTML function from module!");
      }
    } catch (error) {
      console.error("🚨 Error loading HTML module:", error);
    }
  }

  function loadWidgetFromString(htmlString) {
    if (!widgetContainer) {
      widgetContainer = document.createElement("div");
      widgetContainer.id = "squareCraft-widget-container";
      widgetContainer.classList.add(
        "squareCraft-fixed",
        "squareCraft-text-color-white",
        "squareCraft-universal",
        "squareCraft-z-9999"
      );
      widgetContainer.innerHTML = htmlString;
      widgetContainer.style.display = "none";
      document.body.appendChild(widgetContainer);
      makeWidgetDraggable();
      widgetLoaded = true;

      setTimeout(() => {
        widgetContainer = document.getElementById(
          "squareCraft-widget-container"
        );
        if (!widgetContainer) {
          console.error("❌ Widget container failed to load.");
        }
      }, 500);
    }
  }

  async function toggleWidgetVisibility(event) {
    event.stopPropagation();

    if (!widgetLoaded) {
      await createWidget();
    }

    if (widgetContainer) {
      widgetContainer.style.display =
        widgetContainer.style.display === "none" ? "block" : "none";
    }
  }

  try {
    const { makeWidgetDraggable } = await import(
        "https://fatin-webefo.github.io/squareCraft-plugin/makeWidgetDraggable.js"
    );

    makeWidgetDraggable(widgetContainer);
} catch (error) {
    console.error("🚨 Failed to load makeWidgetDraggable module", error);
}


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
    function injectIconIntoTargetElements() {
      const targets = parent.document.querySelectorAll(
        ".tidILMJ7AVANuKwS:not(.squareCraft-processed)"
      );

      targets.forEach((element) => {
        element.classList.add("squareCraft-processed");

        const deleteButton = element.querySelector('[aria-label="Remove"]');
        if (!deleteButton) {
          console.warn("❌ Delete button not found, skipping:", element);
          return;
        }

        if (element.querySelector(".squareCraft-toolbar-icon")) return;
        const clonedIcon = document.createElement("img");
        clonedIcon.src = "https://i.ibb.co.com/kg9fn02s/Frame-33.png";
        clonedIcon.alt = "SquareCraft";
        clonedIcon.classList.add(
          "squareCraft-toolbar-icon",
          "squareCraft-z-99999"
        );
        clonedIcon.style.width = "35px";
        clonedIcon.style.height = "35px";
        clonedIcon.style.borderRadius = "20%";
        clonedIcon.style.cursor = "pointer";
        clonedIcon.style.backgroundColor = "white";
        clonedIcon.style.marginLeft = "6px";
        deleteButton.parentNode.insertBefore(
          clonedIcon,
          deleteButton.nextSibling
        );

        clonedIcon.addEventListener("click", function (event) {
          event.stopPropagation();
          event.preventDefault();

          if (!widgetLoaded) {
            createWidget().then(() => {
              widgetContainer = document.getElementById(
                "squareCraft-widget-container"
              );
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

    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.contentWindow.document.addEventListener("click", function (event) {
        if (event.target.classList.contains("squareCraft-admin-icon")) {
          event.stopPropagation();
          event.preventDefault();
          toggleWidgetVisibility(event);
        }
      });
    }

    setTimeout(() => {
      injectIconIntoTargetElements();
    }, 1000);
    injectIconIntoTargetElements();

    const observer = new MutationObserver(() => {
      injectIconIntoTargetElements();
    });
    observer.observe(parent.document.body, { childList: true, subtree: true });
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

      mobileContainer.classList.add("squareCraft-relative");

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



  function moveWidgetToDesktop() {
    if (!widgetContainer) return;

    document.body.appendChild(widgetContainer);
  }

  checkView();
  window.addEventListener("resize", checkView);
})();

