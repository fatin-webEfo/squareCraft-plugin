(async function squareCraft() {
  const Url = parent.document.location.href
console.log("parent" , Url)
  const widgetScript = document.getElementById("squareCraft-script");

  if (!widgetScript) {
    console.error(
      "❌ Widget script not found! Ensure the script tag exists with id 'squareCraft-script'."
    );
    return;
  }
  let selectedElement = null;
  let widgetContainer = null;
  let widgetLoaded = false;
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

  function getTextType(tagName, element) {
    let classList = element?.classList || [];

    if (tagName === "h1") return { type: "heading1", borderColor: "#FF0000" };
    if (tagName === "h2") return { type: "heading2", borderColor: "#FFA500" };
    if (tagName === "h3") return { type: "heading3", borderColor: "#FFFF00" };
    if (tagName === "h4") return { type: "heading4", borderColor: "#008000" };

    if (tagName === "p") {
      if (classList.contains("sqsrte-large")) {
        return { type: "paragraph1", borderColor: "#4B0082" };
      } else if (classList.contains("sqsrte-small")) {
        return { type: "paragraph3", borderColor: "#0000FF" };
      } else {
        return { type: "paragraph2", borderColor: "#9400D3" };
      }
    }
    return null;
  }

   
    
  document.body.addEventListener("click", (event) => {
    let block = event.target.closest('[id^="block-"]');
    if (!block) return;

    if (selectedElement) selectedElement.style.outline = "";
    selectedElement = block;
    selectedElement.style.outline = "2px dashed #EF7C2F";

    console.log(`✅ Selected Block: ${selectedElement.id}`);

    const textElements = block.querySelectorAll("h1, h2, h3, h4, p");

    textElements.forEach(textElement => {
        let tagName = textElement.tagName.toLowerCase();
        let textTypeInfo = getTextType(tagName, textElement);

        if (textTypeInfo) {
            console.log(`✅ Found Text Element: ${tagName}`);
            console.log(`✅ Text Type: ${textTypeInfo.type}`);
            console.log(`✅ Text Type Border Color: ${textTypeInfo.borderColor}`);
            
            textElement.style.outline = `2px solid ${textTypeInfo.borderColor}`;
        }
    });
});







  async function addHeadingEventListeners() {
    const widgetContainer = document.getElementById("squareCraft-widget-container");
    if (!widgetContainer) return;

    if (widgetContainer.dataset.listenerAttached === "true") return;

    widgetContainer.dataset.listenerAttached = "true"; 

    function toggleTabClass(targetElement) {
        console.log("🚀 Toggle function called for:", targetElement);
        if (targetElement.classList.contains("squareCraft-activeTab-border")) {
            targetElement.classList.remove("squareCraft-activeTab-border");
            targetElement.classList.add("squareCraft-inActiveTab-border");
            console.log("✅ Now Inactive:", targetElement);
        } else {
            targetElement.classList.remove("squareCraft-inActiveTab-border");
            targetElement.classList.add("squareCraft-activeTab-border");
            console.log("✅ Now Active:", targetElement);
        }
    }

    widgetContainer.addEventListener("click", (event) => {
        const tabElement = event.target;
        if (tabElement.classList.contains('squareCraft-inActiveTab-border') || tabElement.classList.contains('squareCraft-activeTab-border')) {
            console.log("📌 Tab Element Clicked:", tabElement);
            toggleTabClass(tabElement);
        }
    });
}

const observer = new MutationObserver(() => {
    addHeadingEventListeners();
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

  loadCSS(
    "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css",
    "squareCraft_parentCSS"
  );


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
      const draggableElement = event.target.closest("#squareCraft-grabbing");

      if (!draggableElement || event.target.closest(".squareCraft-dropdown")) {
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
