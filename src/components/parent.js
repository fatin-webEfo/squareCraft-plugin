(async function parent() {
    function injectStylesheet() {
        if (document.getElementById("sc-styles")) {
            console.warn("⚠️ sc styles already exist.");
            return;
        }

        const link = document.createElement("link");
        link.id = "sc-styles";
        link.rel = "stylesheet";
        link.href = "https://fatin-webefo.github.io/squareCraft-plugin/src/styles/parent.css"; // Change to your actual CDN or file path
        link.type = "text/css";
        link.onerror = () => console.error("❌ Failed to load sc styles.");

        document.head.appendChild(link);
    }
    injectStylesheet();


    function parentTabFunction() {
        if (document.getElementById("sc-script-tab")) {
            console.warn("⚠️ sc script already exists.");
            return;
        }

        const script = document.createElement("script");
        script.id = "sc-script-tab";
        script.src = "https://fatin-webefo.github.io/squareCraft-plugin/src/html/parentHtml/parentHtmlTab.js";
        script.defer = true;

        script.onerror = (e) => console.error("❌ Failed to load parentHtmlTab.js", e);

        document.body.appendChild(script);
    }


    function fontFamilyDropdown() {
        if (document.getElementById("sc-script-fontFamily")) {
            console.warn("⚠️ sc script already exists.");
            return;
        }

        const script = document.createElement("script");
        script.id = "sc-script-fontFamily";
        script.src = "https://fatin-webefo.github.io/squareCraft-plugin/src/html/parentHtml/fontfamilyDropdown/fontFamilyDropdowninteract.js";
        script.defer = true;

        script.onload = () => console.log("✅ parentHtmlTab.js loaded successfully!");
        script.onerror = (e) => console.error("❌ Failed to load parentHtmlTab.js", e);
        document.body.appendChild(script);
    }





    function initializesc() {
        console.log("⚡ Initializing sc...");
        fontFamilyDropdowninteract();
        // getStyles();
        observeDOMChanges();
        parentTabFunction();
        fontFamilyDropdown();
    }

    let parentHtml, observeDOMChanges
        //  getStyles
        ;

    async function loadModule(url) {
        try {
            const module = await import(url);
            return module;
        } catch (err) {
            console.error(`❌ Failed to load module: ${url}`, err);
            return null;
        }
    }

    parentHtml = (await loadModule("https://fatin-webefo.github.io/squareCraft-plugin/src/html/parentHtml/parentHtml.js"))?.parentHtml;
    observeDOMChanges = (await loadModule("https://fatin-webefo.github.io/squareCraft-plugin/src/DOM/observeDOMChanges.js"))?.observeDOMChanges;
    // getStyles = (await loadModule("https://fatin-webefo.github.io/squareCraft-plugin/src/utils/getStyles.js"))?.getStyles;
    try {
        const { setToken } = await import("https://fatin-webefo.github.io/squareCraft-plugin/src/credentials/setToken.js");
        setToken();
    } catch (error) {
        console.error("❌ Failed to import setToken:", error);
    }


    if (!observeDOMChanges) {
        console.error("�� observeDOMChanges function not found! Check if the script loaded properly.");

    }

    else if (!parentHtml) {
        console.error("❌ parentHtml function not found! Check if the script loaded properly.");
    }
    // else if (!getStyles) {
    //     console.error("�� getStyles function not found! Check if the script loaded properly.");
    // }



    function fontFamilyDropdowninteract() {

        if (!parentHtml) {
            console.error("❌ parentHtml is not defined. Check imports.");
            return;
        }

        if (document.getElementById("sc-widget-container")) {
            console.warn("⚠️ Widget already exists, skipping creation.");
            return;
        }

        const widgetContainer = document.createElement("div");
        widgetContainer.id = "sc-widget-container";
        widgetContainer.style.position = "fixed";
        widgetContainer.style.top = "100px";
        widgetContainer.style.left = "100px";
        widgetContainer.style.cursor = "grab";
        widgetContainer.style.zIndex = "9999";

        const style = document.createElement("style");
        style.innerHTML = `
                #sc-widget-container {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `;
        document.head.appendChild(style);

        widgetContainer.innerHTML = parentHtml();

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                document.body.appendChild(widgetContainer);

                fontFamilyDropdowninteract();
            });
        } else {
            document.body.appendChild(widgetContainer);

            fontFamilyDropdowninteract();
        }

        setTimeout(() => {
            if (!document.getElementById("sc-widget-container")) {
                console.warn("⚠️ Widget was removed! Re-adding...");
                document.body.appendChild(widgetContainer);
            }
        }, 3000);
    }




    setInterval(() => {
        if (!document.getElementById("sc-widget-container")) {
            console.warn("⚠️ Widget removed by Squarespace! Re-adding...");
            fontFamilyDropdowninteract();
            parentTabFunction();
            fontFamilyDropdown();
            // getStyles();
        }
    }, 1000);

    setTimeout(() => {
        initializesc();
        fontFamilyDropdown();
        parentTabFunction();
        // getStyles();
    }, 1000);
})();