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

    // Clicked outline
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

    document.body.addEventListener("mouseover", (event) => {
        let block = event.target.closest('[id^="block-"]');
        if (!block || block.classList.contains("squareCraft-selected")) return;

        block.style.outline = "4px solid #EF7C2F";
    });

    document.body.addEventListener("mouseout", (event) => {
        let block = event.target.closest('[id^="block-"]');
        if (!block || block.classList.contains("squareCraft-selected")) return;

        block.style.outline = "";
    });

    // Clicked outline
    // navbar icon

    try {
        const { injectNavbarIcon } = await import("https://fatin-webefo.github.io/squareCraft-plugin/injectNavbarIcon.js");
        injectNavbarIcon();
    } catch (error) {
        console.error("🚨 Failed to load navbar icon script", error);
    }
    // navbar Icon

    // Css cdn
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css";
    document.head.appendChild(link);
    // Css cdn
    // No changes


    async function createWidget() {
        try {
            const module = await import("https://fatin-webefo.github.io/squareCraft-plugin/html.js");

            if (module && module.html) {

                const htmlString = module.html();

                if (!widgetContainer) {
                    widgetContainer = document.createElement("div");
                    widgetContainer.id = "squarecraft-widget-container";
                    widgetContainer.classList.add("squareCraft-fixed", "squareCraft-text-color-white", "squareCraft-universal", "squareCraft-z-9999");

                    if (typeof htmlString === "string" && htmlString.trim().length > 0) {
                        widgetContainer.innerHTML = htmlString;
                    } else {
                        console.error("❌ Retrieved HTML string is invalid or empty!");
                    }

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
            await createWidget();
        }

        if (widgetContainer) {
            widgetContainer.style.display = widgetContainer.style.display === "none" ? "block" : "none";
        }
    }





    function makeWidgetDraggable() {
        if (!widgetContainer) return;

        widgetContainer.style.position = "fixed";
        widgetContainer.style.zIndex = "999";
        widgetContainer.style.left = "calc(100% - 250px)";
        widgetContainer.style.top = "100px";

        let offsetX = 0, offsetY = 0, isDragging = false;

        widgetContainer.addEventListener("mousedown", (event) => {
            const draggableElement = event.target.closest("#squareCraft-grabbing");
            const isOverFontFamily = event.target.closest("#squareCraft-font-family");

            if (
                !draggableElement || // Drag only works if clicked on `#squareCraft-grabbing`
                event.target.tagName === "INPUT" ||
                event.target.tagName === "SELECT" ||
                event.target.isContentEditable ||
                event.target.closest("#squareCraftFontDropdown") ||
                isOverFontFamily
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
    
            widgetContainer.style.position = "fixed";
            widgetContainer.style.left = "50%";
            widgetContainer.style.top = "50%";
            widgetContainer.style.transform = "translate(-50%, -50%)";
            widgetContainer.style.zIndex = "9999";
    
            mobileContainer.appendChild(widgetContainer);
            console.log("✅ Widget successfully moved to mobile container with proper styles.");
        } else {
            console.warn("❌ Mobile container not found. Widget remains in default location.");
        }
    }
    
    function moveWidgetToDesktop() {
        if (!widgetContainer) return;
        
        widgetContainer.style.position = "fixed";
        widgetContainer.style.left = "50%";
        widgetContainer.style.top = "50%";
        widgetContainer.style.transform = "translate(-50%, -50%)";
        widgetContainer.style.zIndex = "9999";
    
        document.body.appendChild(widgetContainer);
        console.log("✅ Widget remains in the desktop position.");
    }
    
    function disableDragging() {
        if (!widgetContainer) return;
    
        widgetContainer.onmousedown = (event) => {
            event.preventDefault(); 
        };
    
        widgetContainer.ontouchstart = (event) => {
            event.preventDefault(); 
        };
    }
    
    checkView();
    disableDragging(); 
    window.addEventListener("resize", checkView);
    
    


})();
