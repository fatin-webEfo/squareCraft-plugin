(async function squareCraft() {
    const widgetScript = document.getElementById("squarecraft-script");
    if (!widgetScript) {
        console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
        return;
    }
    const tokenScript = document.createElement("script");
    tokenScript.src = "https://fatin-webefo.github.io/squareCraft-plugin/src/credentials/setToken.js";
    tokenScript.type = "text/javascript";
    tokenScript.async = true;
    
    tokenScript.onload = async function () {
        console.log("✅ setToken.js loaded");
    
        if (typeof window.setToken === "function") {
            try {
                console.log("🔍 Searching for Tokens & IDs...");
                
                let attempts = 0;
                const maxAttempts = 10; 
                const delay = 500; 
    
                const checkToken = async () => {
                    const { token, squareCraft_u_id, squareCraft_w_id } = await window.setToken();
    
                    if (token || squareCraft_u_id || squareCraft_w_id) {
                        console.log("🔑 Retrieved Tokens & IDs:", { token, squareCraft_u_id, squareCraft_w_id });
                        return; 
                    }
    
                    attempts++;
                    if (attempts < maxAttempts) {
                        setTimeout(checkToken, delay); 
                    } else {
                        console.warn("🚨 Max attempts reached! Tokens & IDs not found.");
                    }
                };
    
                checkToken(); 
            } catch (error) {
                console.error("🚨 Error retrieving tokens:", error);
            }
        } else {
            console.error("❌ setToken function not found! Ensure it's properly assigned in setToken.js.");
        }
    };
    
    
    tokenScript.onerror = function () {
        console.error("❌ Failed to load setToken.js");
    };
    
    document.head.appendChild(tokenScript);
    
    

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
                    widgetContainer.style.display = "none";
                    document.body.appendChild(widgetContainer);

                    console.log("✅ Widget container added:", widgetContainer);
                    makeWidgetDraggable();
                    widgetLoaded = true;

                    setTimeout(() => {
                        widgetContainer = document.getElementById("squarecraft-widget-container");
                        if (!widgetContainer) {
                            console.error("❌ Widget container failed to load.");
                        }
                    }, 500);
                }
            } else {
                console.error("❌ Failed to retrieve the HTML function from module!");
            }
        } catch (error) {
            console.error("🚨 Error loading HTML module:", error);
        }
    }


    async function toggleWidgetVisibility(event) {
        event.stopPropagation();

        if (!widgetLoaded) {
            console.log("📥 Creating and displaying widget...");
            await createWidget();
        }

        if (widgetContainer) {
            widgetContainer.style.display = widgetContainer.style.display === "none" ? "block" : "none";
        }
    }

    document.addEventListener("click", (event) => {
        if (widgetContainer && widgetContainer.style.display === "block" && !widgetContainer.contains(event.target)) {
            widgetContainer.style.display = "none";
        }
    });



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
        if (parent.document.querySelector(".squareCraft-admin-icon")) {
            console.log("ℹ️ SquareCraft icon already exists. Skipping reinjection.");
            return; 
        }
    
        const navContainer = parent.document.querySelector('ul.css-1tn5iw9');
        if (!navContainer) {
            console.warn("❌ Squarespace admin nav container not found.");
            return;
        }
    
        const iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";
    
        function createIcon() {
            const icon = document.createElement("img");
            icon.src = iconSrc;
            icon.alt = "SquareCraft";
            icon.style.width = "30px";
            icon.style.height = "30px";
            icon.style.borderRadius = "20%";
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
                    console.log("🖱️ Cloned icon clicked - Attempting to open widget...");
        
                    if (!widgetLoaded) {
                        console.log("📥 Widget not loaded - Creating now...");
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
            console.log("📌 Toolbar is inside an iframe!");
            iframe.contentWindow.document.addEventListener("click", function (event) {
                console.log("🖱️ Click detected inside iframe.");
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
})();
