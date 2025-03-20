export function injectNavbarIcon() {
    async function fetchAndSaveIcon(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();

            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    const base64Data = reader.result;
                    localStorage.setItem("squareCraft_icon", base64Data);
                    resolve(base64Data);
                };
                reader.onerror = (error) => reject(error);

                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("🚨 Failed to fetch and save the icon:", error);
            return url; 
        }
    }

    async function getIconSrc() {
        let iconSrc = localStorage.getItem("squareCraft_icon");

        if (!iconSrc) {
            iconSrc = await fetchAndSaveIcon("https://i.ibb.co.com/kg9fn02s/Frame-33.png");
        }

        return iconSrc;
    }

    async function insertAdminIcon() {
        if (!parent.document.querySelector(".squareCraft-admin-icon")) {
            const navContainer = parent.document.querySelector('ul.css-1tn5iw9');
            if (navContainer) {
                const iconSrc = await getIconSrc();
                
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
            }
        }
    }

    async function insertToolbarIcon() {
        const toolbarContainers = parent.document.querySelectorAll('div.js-section-toolbar');
        
        toolbarContainers.forEach(async toolbarContainer => {
            if (!toolbarContainer.querySelector(".squareCraft-toolbar")) {
                const iconSrc = await getIconSrc();

                const squareCraftDiv = document.createElement("div");
                squareCraftDiv.classList.add("squareCraft-toolbar");
                squareCraftDiv.style.display = "flex";
                squareCraftDiv.style.alignItems = "center";
                squareCraftDiv.style.border = "1px solid #E5E4E2";
                squareCraftDiv.style.background = "rgba(255, 127, 23, 0.06)";
                squareCraftDiv.style.borderRadius = "6px";
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
            }
        });
    }

    insertToolbarIcon();
    insertAdminIcon();

    const observer = new MutationObserver(() => {
        insertToolbarIcon();
    });

    observer.observe(parent.document.body, { childList: true, subtree: true });
}
