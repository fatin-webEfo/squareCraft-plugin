export function injectNavbarIcon() {
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
}
