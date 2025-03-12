export function injectNavbarIcon() {
    function insertAdminIcon() {
        if (!parent.document.querySelector(".squareCraft-admin-icon")) {
            const navContainer = parent.document.querySelector('ul.css-1tn5iw9');
            if (navContainer) {
                const iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";
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

                navContainer.parentNode.insertBefore(icon, navContainer);
                console.log("✅ SquareCraft admin icon inserted.");
            } else {
                console.warn("⚠️ Squarespace admin nav container not found.");
            }
        }
    }

    function insertToolbarIcon() {
        if (!parent.document.querySelector(".squareCraft-toolbar")) {
            const toolbarContainer = parent.document.querySelector('div.css-1utwuyz');
            
            if (!toolbarContainer) {
                console.warn("⚠️ Squarespace toolbar container not found.");
                return;
            }

            const iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";
            
            const squareCraftDiv = document.createElement("div");
            squareCraftDiv.classList.add("squareCraft-toolbar");
            squareCraftDiv.style.display = "flex";
            squareCraftDiv.style.alignItems = "center";
            squareCraftDiv.style.border = "1px solid #E5E4E2";
            squareCraftDiv.style.padding = "6px";
            squareCraftDiv.style.gap = "6px";

            const icon = document.createElement("img");
            icon.src = iconSrc;
            icon.alt = "SquareCraft";
            icon.style.width = "30px";
            icon.style.height = "30px";
            icon.style.borderRadius = "20%";
            icon.style.cursor = "pointer";

            const text = document.createElement("span");
            text.innerText = "SquareCraft";
            text.style.fontSize = "14px";
            text.style.fontWeight = "bold";
            text.style.cursor = "pointer";

            squareCraftDiv.appendChild(icon);
            squareCraftDiv.appendChild(text);

            toolbarContainer.appendChild(squareCraftDiv);
            console.log("✅ SquareCraft toolbar inserted.");
        }
    }

    insertAdminIcon();
    insertToolbarIcon();

    const observer = new MutationObserver(() => {
        insertAdminIcon();
        insertToolbarIcon();
    });

    observer.observe(parent.document.body, { childList: true, subtree: true });

    console.log("📡 Watching for DOM changes...");
}
