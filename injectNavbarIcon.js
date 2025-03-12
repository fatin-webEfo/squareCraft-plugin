export function injectNavbarIcon() {
    if (parent.document.querySelector(".squareCraft-admin-icon-container")) {
        console.log("ℹ️ SquareCraft icon already exists. Skipping reinjection.");
        return;
    }

    const sectionToolbar = parent.document.querySelector(".js-section-toolbar");
    if (!sectionToolbar) {
        console.warn("❌ Squarespace section toolbar not found.");
        return;
    }

    const iconSrc = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";

    function createSquareCraftContainer() {
        const container = document.createElement("div");
        container.classList.add("squareCraft-admin-icon-container");
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = "space-between";
        container.style.width = "100%";
        container.style.padding = "6px 12px";
        container.style.borderTop = "1px solid rgba(255, 255, 255, 0.1)";
        container.style.marginTop = "5px";

        const icon = document.createElement("img");
        icon.src = iconSrc;
        icon.alt = "SquareCraft";
        icon.style.width = "24px";
        icon.style.height = "24px";
        icon.style.borderRadius = "50%";
        icon.style.cursor = "pointer";

        const text = document.createElement("span");
        text.innerText = "SquareCraft";
        text.style.color = "white";
        text.style.fontSize = "14px";
        text.style.fontWeight = "500";
        text.style.marginLeft = "10px";

        container.appendChild(icon);
        container.appendChild(text);

        return container;
    }

    sectionToolbar.appendChild(createSquareCraftContainer());
}
