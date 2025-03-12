(async function squareCraft() {
    const widgetScript = document.getElementById("squarecraft-script");
    let selectedElement = null;
    if (!widgetScript) {
        console.error("❌ Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
        return;
    }
    
    // No changes
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
        console.log("✅ Navbar icon script loaded");
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

    let widgetContainer = null;
    let widgetLoaded = false;

    async function fetchFonts() {
        const response = await fetch(
            "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk"
        );
        const data = await response.json();
        return data.items.slice(0, 40); // Get only 40 fonts
    }

    async function populateFontDropdown() {
        if (fontsLoaded) return; // Prevent duplicate fetching

        const fontList = await fetchFonts();
        console.log("Font families:", fontList);

        const fontDropdown = document.getElementById("squareCraft-font-family");
        if (!fontDropdown) {
            console.warn("❌ Font dropdown element not found!");
            return;
        }

        fontDropdown.innerHTML = `<option value="">Select Font</option>`; 
        fontList.forEach((font) => {
            const option = document.createElement("option");
            option.value = font.family;
            option.textContent = font.family;
            fontDropdown.appendChild(option);
        });

        fontsLoaded = true;
    }

    document.addEventListener("click", async (event) => {
        const fontDropdown = document.getElementById("squareCraft-font-family");
        if (event.target.id === "squareCraft-font-family") {
            if (!fontsLoaded) {
                await populateFontDropdown();
            }
            fontDropdown.size = 10; 
        } else {
            if (fontDropdown) fontDropdown.size = 1;
        }
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


    function logAllCollections() {
        const collectionElements = document.querySelectorAll('[id^="collection-"]');
        if (collectionElements.length > 0) {
            collectionElements.forEach(element => {
                console.log('Collection element found:', element.id);
            });
        } else {
            console.warn('No collection elements found.');
        }
    }

    function sectionAndId(event) {
        const block = event.target.closest('[id^="block-"]');
        if (block) {
            console.log('Block clicked:', block.id);
        } else {
            const section = event.target.closest('section[data-section-id]');
            if (section) {
                console.log('Data-section-id:', section.getAttribute('data-section-id'));
            }
        }

        const clickedElement = event.target;
        let elementType = 'unknown';

        if (clickedElement.tagName === 'IMG' || clickedElement.closest('.sqs-block-image')) {
            elementType = 'image';
        } else if (clickedElement.tagName === 'BUTTON' || clickedElement.closest('.sqs-block-button-element, .sqs-button-element--primary, .sqs-block-button')) {
            elementType = 'button';
        } else if (clickedElement.closest('.sqs-block-html, .sqs-html-content, .sqs-block-content')) {
            elementType = 'text';
        }

        console.log(`Clicked element is a: ${elementType}`);
    }


    document.addEventListener('click', sectionAndId);


    function logAllCollections() {
        document.querySelectorAll('[id^="collection-"]').forEach(element => {
            console.log('Collection element found:', element.id);
        });
    }

    function initializeLogging() {
        logAllCollections();
        document.addEventListener('click', sectionAndId);
    }

    initializeLogging();


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
