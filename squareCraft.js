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
                        widgetContainer.style.display = "fixed"; 
                    }
                });
            } else {
                widgetContainer = document.getElementById("squarecraft-widget-container"); 
                if (widgetContainer) {
                    if (widgetContainer.style.display === "none") {
                        widgetContainer.style.display = "fixed"; 
                    } else {
                        widgetContainer.style.display = "none"; 
                    }
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
        
            let iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co/LXKK6swV/Group-29.jpg";
        
            localStorage.setItem("squareCraft_icon", iconSrc);
            let icon = document.createElement("img");
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
            
        
            icon.addEventListener("click", function(){
                toggleWidgetVisibility();
            })
        
            navContainer.parentNode.insertBefore(icon.cloneNode(true), navContainer);
            console.log("✅ SquareCraft icon injected into nav bar!");
            
            function injectIconIntoTargetElements() {
                const targetElements = parent.document.querySelectorAll(".tidILMJ7AVANuKwS");
            
                if (targetElements.length === 0) {
                    console.warn("❌ Target elements not found. Retrying in 1 second...");
                    setTimeout(injectIconIntoTargetElements, 1000);
                    return;
                }
            
                targetElements.forEach((element) => {
                    if (!element.parentNode || element.parentNode.querySelector(".squareCraft-injected-wrapper")) return;
            
                    let wrapper = document.createElement("div");
                    wrapper.classList.add("squareCraft-injected-wrapper");
                    wrapper.style.display = "flex";
                    wrapper.style.alignItems = "center";
            
                    let clonedIcon = icon.cloneNode(true);
                    clonedIcon.classList.add("squareCraft-injected-icon");
            
                    if (!element.parentNode.classList.contains("squareCraft-injected-wrapper")) {
                        element.parentNode.insertBefore(wrapper, element);
                        wrapper.appendChild(element);
                        wrapper.appendChild(clonedIcon); 
                    }
            
                    console.log("✅ SquareCraft icon injected at the last inside wrapper:", element);
                });
            
                setTimeout(injectIconIntoTargetElements, 500); 
            }
            
            
            injectIconIntoTargetElements();
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
