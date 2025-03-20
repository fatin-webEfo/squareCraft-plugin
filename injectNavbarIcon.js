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

                const message = document.createElement("div");
                message.classList.add("squareCraft-floating-message");
                message.innerHTML = `
                    <div class="squareCraft-message-content">
                        ✅ SquareCraft installed!
                    </div>
                    <div class="squareCraft-message-arrow"></div>
                `;

                message.style.position = "absolute";
                message.style.backgroundColor = "#2c2c2c";
                message.style.color = "white";
                message.style.padding = "10px 14px";
                message.style.borderRadius = "8px";
                message.style.fontSize = "12px";
                message.style.fontWeight = "400";
                message.style.zIndex = "99999";
                message.style.opacity = "1";
                message.style.transition = "opacity 0.5s ease-in-out, transform 0.3s ease-in-out";
                message.style.animation = "squareCraftFadeIn 0.5s ease-in-out";
                message.style.whiteSpace = "nowrap";
                message.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
                message.style.top = "60px";
                message.style.right = "10%";
                message.style.transform = "translateX(-16%)";

                navContainer.parentNode.insertBefore(message, navContainer);

                const messageArrow = message.querySelector(".squareCraft-message-arrow");
                messageArrow.style.position = "absolute";
                messageArrow.style.top = "-8px";
                messageArrow.style.left = "50%";
                messageArrow.style.transform = "translateX(-50%)";
                messageArrow.style.width = "0";
                messageArrow.style.height = "0";
                messageArrow.style.borderLeft = "8px solid transparent";
                messageArrow.style.borderRight = "8px solid transparent";
                messageArrow.style.borderBottom = "8px solid #2c2c2c";

                setTimeout(() => {
                    message.style.opacity = "0";
                    setTimeout(() => message.remove(), 500);
                }, 5000);
            }
        }
    }

    function insertToolbarIcon() {
        const toolbarContainers = parent.document.querySelectorAll('div.js-section-toolbar');

        toolbarContainers.forEach(toolbarContainer => {
            if (!toolbarContainer.querySelector(".squareCraft-toolbar")) {
                const iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";

                const squareCraftDiv = document.createElement("div");
                squareCraftDiv.classList.add("squareCraft-toolbar");
                squareCraftDiv.style.display = "flex";
                squareCraftDiv.style.alignItems = "center";
                squareCraftDiv.style.border = "1px solid #E5E4E2";
                squareCraftDiv.style.background = "rgba(255, 127, 23, 0.06)";
                squareCraftDiv.style.borderRadius = "6px";
                squareCraftDiv.style.padding = "6px";
                squareCraftDiv.style.gap = "6px";

                squareCraftDiv.addEventListener("mouseenter", () => {
                    squareCraftDiv.style.backgroundColor = "rgba(177, 176, 176, 0.2)";
                });

                squareCraftDiv.addEventListener("mouseleave", () => {
                    squareCraftDiv.style.backgroundColor = "transparent";
                });

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
