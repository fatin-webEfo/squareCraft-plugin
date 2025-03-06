(async function squareCraft() {
    const widgetScript = document.getElementById("squarecraft-script");
    if (!widgetScript) {
        console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
        return;
    }

    const token = widgetScript.dataset?.token;
    const squareCraft_u_id = widgetScript.dataset?.uId;
    const squareCraft_w_id = widgetScript.dataset?.wId;

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

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
    document.head.appendChild(link);

    let widgetContainer = null;
    let widgetLoaded = false;

    async function createWidget() {
        console.log("📥 Fetching widget module...");
        try {
            const module = await import("https://fatin-webefo.github.io/squareCraft-plugin/html.js");
            if (module && module.html) {
                console.log("✅ HTML module loaded successfully!");

                if (!widgetContainer) {
                    widgetContainer = document.createElement("div");
                    widgetContainer.id = "squarecraft-widget-container";
                    widgetContainer.classList.add("squareCraft-fixed", "squareCraft-text-color-white", "squareCraft-universal", "squareCraft-z-9999");
                    widgetContainer.innerHTML = module.html();
                    widgetContainer.style.display = "none"; // Initially hidden
                    document.body.appendChild(widgetContainer);

                    console.log("✅ Widget container added:", widgetContainer);
                    makeWidgetDraggable();
                    widgetLoaded = true;
                }
            } else {
                console.error("❌ Failed to retrieve the HTML function from module!");
            }
        } catch (error) {
            console.error("🚨 Error loading HTML module:", error);
        }
    }

    function toggleWidgetVisibility() {
        if (!widgetLoaded) {
            createWidget().then(() => {
                widgetContainer = document.getElementById("squarecraft-widget-container");
                if (widgetContainer) {
                    widgetContainer.style.display = "block";
                }
            });
        } else {
            widgetContainer = document.getElementById("squarecraft-widget-container");
            if (widgetContainer) {
                widgetContainer.style.display = widgetContainer.style.display === "none" ? "block" : "none";
            }
        }
    }
    



    function makeWidgetDraggable() {
        if (!widgetContainer) return;

        widgetContainer.style.position = "fixed";
        widgetContainer.style.cursor = "grab";
        widgetContainer.style.zIndex = "999";
        widgetContainer.style.left = "calc(100% - 250px)";
        widgetContainer.style.top = "100px";

        let offsetX = 0, offsetY = 0, isDragging = false;

        widgetContainer.addEventListener("mousedown", (event) => {
            if (event.target.tagName === "INPUT" || event.target.tagName === "SELECT" || event.target.isContentEditable) return;

            event.preventDefault();
            isDragging = true;

            offsetX = event.clientX - widgetContainer.getBoundingClientRect().left;
            offsetY = event.clientY - widgetContainer.getBoundingClientRect().top;

            document.addEventListener("mousemove", moveAt);
            document.addEventListener("mouseup", stopDragging);
        });

        function moveAt(event) {
            if (!isDragging) return;
            let newX = Math.max(0, Math.min(window.innerWidth - widgetContainer.offsetWidth, event.clientX - offsetX));
            let newY = Math.max(0, Math.min(window.innerHeight - widgetContainer.offsetHeight, event.clientY - offsetY));
            widgetContainer.style.left = `${newX}px`;
            widgetContainer.style.top = `${newY}px`;
        }

        function stopDragging() {
            isDragging = false;
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", stopDragging);
        }
    }

    function injectIcon() {
        const navContainer = parent.document.querySelector('ul.css-1tn5iw9');

        if (!navContainer) {
            console.warn("❌ Squarespace admin nav container not found.");
            return;
        }

        const iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co/LXKK6swV/Group-29.jpg";

        function createIcon() {
            const icon = document.createElement("img");
            icon.src = iconSrc;
            icon.alt = "SquareCraft";
            icon.style.width = "22px";
            icon.style.height = "22px";
            icon.style.border = "1px solid #dddbdb";
            icon.style.borderRadius = "20%";
            icon.style.padding = "4px";
            icon.style.marginRight = "6px";
            icon.style.cursor = "pointer";
            icon.style.display = "inline-block";
            icon.classList.add("squareCraft-admin-icon", "squareCraft-z-99999");
            return icon;
        }

        navContainer.parentNode.insertBefore(createIcon(), navContainer);
        console.log("✅ SquareCraft icon injected into nav bar!");

        function injectIconIntoTargetElements() {
            console.log("🔄 Running injectIconIntoTargetElements...");
            const targets = parent.document.querySelectorAll(".tidILMJ7AVANuKwS:not(.squareCraft-processed)");
        
            targets.forEach((element) => {
                element.classList.add("squareCraft-processed");
        
                const parentContainer = element.closest(".css-rxv52q");
                if (!parentContainer) {
                    console.warn("❌ Parent container not found, skipping:", element);
                    return;
                }
        
                parentContainer.style.display = "flex";
                parentContainer.style.alignItems = "center";
                parentContainer.style.justifyContent = "space-between";
        
                // Ensure only one icon exists
                if (!parentContainer.querySelector(".squareCraft-admin-icon")) {
                    const clonedIcon = document.createElement("img");
                    clonedIcon.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg";
                    clonedIcon.alt = "SquareCraft";
                    clonedIcon.classList.add("squareCraft-admin-icon");
                    clonedIcon.style.width = "22px";
                    clonedIcon.style.height = "22px";
                    clonedIcon.style.border = "1px solid #dddbdb";
                    clonedIcon.style.borderRadius = "20%";
                    clonedIcon.style.padding = "4px";
                    clonedIcon.style.marginLeft = "auto";
                    clonedIcon.style.cursor = "pointer";
                    clonedIcon.style.display = "inline-block";
                    parentContainer.appendChild(clonedIcon);
                }
            });
        }
        
       
        
        
        injectIconIntoTargetElements();
        
    }
    const observer = new MutationObserver(() => {
        injectIconIntoTargetElements();
    });
    observer.observe(parent.document.body, { childList: true, subtree: true });
    document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("squareCraft-admin-icon")) {
            console.log("🖱️ Clicked on SquareCraft Icon:", event.target);
            if (!widgetLoaded) {
                await createWidget();
                widgetContainer = document.getElementById("squarecraft-widget-container");
                widgetContainer.style.display = "block";
            } else {
                toggleWidgetVisibility();
            }
        }
    });
    
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
})();
