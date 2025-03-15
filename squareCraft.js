(async function squareCraft() {
    // No changes
    // parent script call
    const widgetScript = document.getElementById("squarecraft-script");

    if (!widgetScript) {
        console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
        return;
    }
    // parent script call
    // vars
    let selectedElement = null;
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


   document.body.addEventListener("click", (event) => {
    let block = event.target.closest('[id^="block-"]');
    if (!block) return;

    if (selectedElement) {
        selectedElement.style.outline = "";
        selectedElement.classList.remove("squareCraft-selected");
    }

    selectedElement = block;
    selectedElement.style.outline = "2px dashed #EF7C2F";
    selectedElement.classList.add("squareCraft-selected");

    console.log(`✅ Selected Element: ${selectedElement.id}`);
});

function getTextType(element) {
    let tagName = element.tagName.toLowerCase();
    let classList = element.classList;

    if (tagName === "h1") {
        return { type: "Heading 1 (h1)", color: "#FF0000" }; // Red
    } else if (tagName === "h2") {
        return { type: "Heading 2 (h2)", color: "#FFA500" }; // Orange
    } else if (tagName === "h3") {
        return { type: "Heading 3 (h3)", color: "#FFFF00" }; // Yellow
    } else if (tagName === "h4") {
        return { type: "Heading 4 (h4)", color: "#008000" }; // Green
    } else if (tagName === "p") {
        if (classList.contains("sqsrte-large") && classList.contains("solve")) {
            return { type: "Paragraph 3 (p3)", color: "#0000FF" }; // Blue
        } else if (classList.contains("sqsrte-large")) {
            return { type: "Paragraph 1 (p1)", color: "#4B0082" }; // Indigo
        } else {
            return { type: "Paragraph 2 (p2)", color: "#9400D3" }; // Violet
        }
    } else if (tagName === "strong") {
        return { type: "Bold (strong)", color: "#8B0000" }; // Dark Red
    } else if (tagName === "em") {
        return { type: "Italic (em)", color: "#FF69B4" }; // Pink
    } else if (tagName === "a") {
        return { type: "Link (a)", color: "#1E90FF" }; // Light Blue
    }
    return null;
}

document.body.addEventListener("mouseover", (event) => {
    let block = event.target.closest('[id^="block-"]');
    if (!block) return;

    let textElements = block.querySelectorAll("h1, h2, h3, h4, p, strong, em, a");
    let textTypes = [];

    textElements.forEach((element) => {
        let detectedType = getTextType(element);
        if (detectedType) {
            textTypes.push(detectedType.type);
            element.style.border = `2px solid ${detectedType.color}`;
        }
    });

    let textTypeOutput = textTypes.length > 0 ? textTypes.join(", ") : "No text found";

    console.log(`🟠 Hovered Block: ${block.id} | Text Types: ${textTypeOutput}`);
});

document.body.addEventListener("mouseout", (event) => {
    let block = event.target.closest('[id^="block-"]');
    if (!block) return;

    let textElements = block.querySelectorAll("h1, h2, h3, h4, p, strong, em, a");
    textElements.forEach((element) => {
        element.style.border = "";
    });
});


    // Clicked outline
    // navbar icon

    async function loadInjectNavbarIcon() {
        const scriptKey = "squareCraft_navbarIcon";
        const timestampKey = "squareCraft_navbarIcon_timestamp";
        const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        const now = Date.now();
    
        let cachedScript = localStorage.getItem(scriptKey);
        let lastFetched = localStorage.getItem(timestampKey);
    
        if (cachedScript && lastFetched && now - lastFetched < oneDay) {
            console.log("📦 Loading injectNavbarIcon from LocalStorage...");
            const module = eval(cachedScript);
            module.injectNavbarIcon();
            return;
        }
    
        console.log("🌍 Fetching injectNavbarIcon script from CDN...");
        try {
            let module = await import("https://fatin-webefo.github.io/squareCraft-plugin/injectNavbarIcon.js");
    
            if (module && module.injectNavbarIcon) {
                localStorage.setItem(scriptKey, `(${module.injectNavbarIcon.toString()})`);
                localStorage.setItem(timestampKey, now.toString());
    
                module.injectNavbarIcon(); // Execute function
            } else {
                throw new Error("injectNavbarIcon function not found in module");
            }
        } catch (error) {
            console.error("🚨 Failed to load injectNavbarIcon script", error);
        }
    }
    
    // **Call Function**
    loadInjectNavbarIcon();
    

    // navbar Icon

    // Css cdn
    async function loadCSS(url, key) {
        let cachedData = localStorage.getItem(key);
        let lastFetched = localStorage.getItem(`${key}_timestamp`);
        let oneDay = 24 * 60 * 60 * 1000; 
    
        if (cachedData && lastFetched && (Date.now() - lastFetched < oneDay)) {
            console.log(`📦 Loading ${key} from Local Storage`);
            const style = document.createElement("style");
            style.textContent = cachedData;
            document.head.appendChild(style);
        } else {
            console.log(`🌐 Fetching ${key} from CDN`);
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
    loadCSS("https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css", "squareCraft_parentCSS");
    
    // Css cdn
    // No changes


    async function createWidget() {
        try {
            let cachedWidget = localStorage.getItem("squareCraft_widget");
            let lastFetched = localStorage.getItem("squareCraft_widget_timestamp");
            let oneDay = 24 * 60 * 60 * 1000;
            let now = Date.now();
    
            if (cachedWidget && lastFetched && now - lastFetched < oneDay) {
                console.log("✅ Loading widget from localStorage...");
                loadWidgetFromString(cachedWidget);
                return;
            }
    
            console.log("🌍 Fetching new widget data...");
            const module = await import("https://fatin-webefo.github.io/squareCraft-plugin/html.js");
    
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
            widgetContainer.id = "squarecraft-widget-container";
            widgetContainer.classList.add("squareCraft-fixed", "squareCraft-text-color-white", "squareCraft-universal", "squareCraft-z-9999");
            widgetContainer.innerHTML = htmlString;
            widgetContainer.style.display = "none";
            document.body.appendChild(widgetContainer);
            makeWidgetDraggable();
            widgetLoaded = true;
    
            setTimeout(() => {
                widgetContainer = document.getElementById("squarecraft-widget-container");
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
            widgetContainer.style.display = widgetContainer.style.display === "none" ? "block" : "none";
        }
    }



    function makeWidgetDraggable() {
        if (!widgetContainer) return;
    
        const parentContainer = widgetContainer.parentElement || document.body;
    
        widgetContainer.style.position = "absolute"; // Allows movement inside the parent
        widgetContainer.style.zIndex = "999";
        widgetContainer.style.left = "10px"; // Default position
        widgetContainer.style.top = "10px";
    
        let offsetX = 0, offsetY = 0, isDragging = false;
    
        function isMobileView() {
            return window.innerWidth <= 768;
        }
    
        widgetContainer.addEventListener("mousedown", (event) => {
            if (isMobileView()) {
                console.log("📱 Mobile view detected. Dragging enabled inside parent container.");
            }
    
            const draggableElement = event.target.closest("#squareCraft-grabbing");
    
            if (
                !draggableElement || 
                event.target.tagName === "INPUT" ||
                event.target.tagName === "SELECT" ||
                event.target.isContentEditable ||
                event.target.closest("#squareCraftFontDropdown")
            ) return;
    
            event.preventDefault();
            isDragging = true;
    
            offsetX = event.clientX - widgetContainer.getBoundingClientRect().left;
            offsetY = event.clientY - widgetContainer.getBoundingClientRect().top;
    
            document.addEventListener("mousemove", moveAt);
            document.addEventListener("mouseup", stopDragging);
        });
    
        function moveAt(event) {
            if (!isDragging) return;
    
            const parentRect = parentContainer.getBoundingClientRect();
            const widgetRect = widgetContainer.getBoundingClientRect();
    
            let newX = event.clientX - offsetX - parentRect.left;
            let newY = event.clientY - offsetY - parentRect.top;
    
            newX = Math.max(0, Math.min(parentRect.width - widgetRect.width, newX));
            newY = Math.max(0, Math.min(parentRect.height - widgetRect.height, newY));
    
            widgetContainer.style.left = `${newX}px`;
            widgetContainer.style.top = `${newY}px`;
        }
    
        function stopDragging() {
            isDragging = false;
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", stopDragging);
        }
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
            const targets = parent.document.querySelectorAll(".tidILMJ7AVANuKwS:not(.squareCraft-processed)");

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
                clonedIcon.classList.add("squareCraft-toolbar-icon", "squareCraft-z-99999");
                clonedIcon.style.width = "35px";
                clonedIcon.style.height = "35px";
                clonedIcon.style.borderRadius = "20%";
                clonedIcon.style.cursor = "pointer";
                clonedIcon.style.backgroundColor = "white";
                clonedIcon.style.marginLeft = "6px";
                deleteButton.parentNode.insertBefore(clonedIcon, deleteButton.nextSibling);

                clonedIcon.addEventListener("click", function (event) {
                    event.stopPropagation();
                    event.preventDefault();

                    if (!widgetLoaded) {
                        createWidget().then(() => {
                            widgetContainer = document.getElementById("squarecraft-widget-container");
                            if (widgetContainer) {
                                widgetContainer.style.display = "block";
                            } else {
                                console.error("❌ Widget container not found after creation.");
                            }
                        });
                    } else {
                        widgetContainer.style.display = widgetContainer.style.display === "none" ? "block" : "none";
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
            console.log("📱 Mobile view detected. Moving widget outside the main window...");
            moveWidgetToMobileContainer();
        } else {
            console.log("🖥️ Desktop view detected. Keeping widget in the main window...");
            moveWidgetToDesktop();
        }
    }

    function moveWidgetToMobileContainer() {
        if (!widgetContainer) return;
    
        const mobileContainer = parent.document.querySelector(
            'div[data-test="mouse-catcher-right-of-frame"].right-scroll-and-hover-catcher.js-space-around-frame'
        );
    
        if (mobileContainer) {
            const existingLink = parent.document.querySelector('link[href="https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css"]');
            
            if (!existingLink) { 
                const link = parent.document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
                parent.document.head.appendChild(link);
            }
    
            mobileContainer.classList.add("squareCraft-relative");
    
            widgetContainer.style.position = "absolute";
            widgetContainer.style.right = "11%"; 
            widgetContainer.style.top = "50%";
            widgetContainer.style.transform = "translateY(-50%)";
    
            mobileContainer.appendChild(widgetContainer);
    
            console.log("✅ Widget successfully moved to mobile container and positioned correctly.");
        } else {
            console.warn("❌ Mobile container not found. Widget remains in default location.");
        }
    }
    
    

    function moveWidgetToDesktop() {
        if (!widgetContainer) return;

        document.body.appendChild(widgetContainer);
        console.log("✅ Widget remains in the desktop position.");
    }

    checkView();
    window.addEventListener("resize", checkView);


})();
