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

        if (selectedElement) selectedElement.style.outline = "";
        selectedElement = block;
        selectedElement.style.outline = "2px dashed #EF7C2F";

        console.log(`✅ Selected Element: ${selectedElement.id}`);
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

    async function fetchFonts() {
        console.log("📡 Fetching fonts from Google Fonts API...");
        
        try {
            const response = await fetch(
                "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk"
            );
    
            if (!response.ok) {
                throw new Error(`❌ HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            if (!data.items || data.items.length === 0) {
                throw new Error("❌ No fonts found in API response.");
            }
    
            const fontList = data.items.slice(0, 40);
            console.log(`✅ Loaded ${fontList.length} fonts.`);
    
            const dropdown = document.getElementById("squareCraftFontDropdown");
            if (!dropdown) {
                console.warn("⚠️ Font dropdown not found in the DOM.");
                return;
            }
    
            dropdown.innerHTML = fontList.map(font => `
                <div class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center squareCraft-text-sm" 
                     data-value="${font.family}">${font.family}</div>
            `).join("");
    
            console.log("📌 Font dropdown populated.");
    
            const fontSelected = document.getElementById("squareCraftFontSelected");
            if (!fontSelected) {
                console.warn("⚠️ Font selection display element not found.");
            }
    
            dropdown.querySelectorAll(".squareCraft-dropdown-item").forEach(item => {
                item.addEventListener("click", function () {
                    if (fontSelected) {
                        fontSelected.innerText = this.dataset.value;
                        console.log(`🎯 Font selected: ${this.dataset.value}`);
                    }
                    dropdown.classList.add("squareCraft-hidden");
                });
            });
    
        } catch (error) {
            console.error("🚨 Error fetching fonts:", error);
        }
    }
    
    // Call the function
    fetchFonts();
    
    document.addEventListener("DOMContentLoaded", function () {
        const fontDropdown = document.getElementById("squareCraftFontDropdown");
        const fontArrow = document.getElementById("font-family-arrow");
    
        if (!fontDropdown || !fontArrow) {
            console.warn("⚠️ Font dropdown or arrow element not found.");
            return;
        }
    
        console.log("✅ Font dropdown and arrow found.", fontDropdown, fontArrow);
    
        fontArrow.addEventListener("click", function (event) {
            event.stopPropagation();
            fontDropdown.classList.toggle("squareCraft-hidden");
    
            console.log(`📌 Font dropdown ${fontDropdown.classList.contains("squareCraft-hidden") ? "closed" : "opened"}.`);
        });
    
        document.addEventListener("click", function (event) {
            if (!fontArrow.contains(event.target) && !fontDropdown.contains(event.target)) {
                fontDropdown.classList.add("squareCraft-hidden");
                console.log("📌 Clicked outside, closing font dropdown.");
            }
        });
    });
    
    
    
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
