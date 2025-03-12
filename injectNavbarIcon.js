export function injectNavbarIcon() {
    if (parent.document.querySelector(".squareCraft-admin-icon")) {
        console.log("ℹ️ SquareCraft icon already exists. Skipping reinjection.");
        return;
    }

    const toolbarContainer = parent.document.querySelector(".js-section-toolbar");
    if (!toolbarContainer) {
        console.warn("❌ Squarespace section toolbar not found.");
        return;
    }

    const rightFlexContainer = toolbarContainer.querySelector('[data-test="section-toolbar"]');
    if (!rightFlexContainer) {
        console.warn("❌ Right flex container for toolbar buttons not found.");
        return;
    }

    const squareCraftContainer = document.createElement("div");
    squareCraftContainer.classList.add("squareCraft-admin-container");
    squareCraftContainer.style.display = "flex";
    squareCraftContainer.style.alignItems = "center";
    squareCraftContainer.style.marginLeft = "auto"; // Push to the right
    squareCraftContainer.style.padding = "0 10px";
    squareCraftContainer.style.cursor = "pointer";

    const icon = document.createElement("img");
    icon.src = localStorage.getItem("squareCraft_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";
    icon.alt = "SquareCraft";
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.borderRadius = "50%";
    icon.style.marginRight = "6px";
    icon.classList.add("squareCraft-admin-icon");

    const text = document.createElement("span");
    text.textContent = "SquareCraft";
    text.style.color = "#fff";  // Change color if necessary
    text.style.fontSize = "14px";
    text.style.fontWeight = "bold";
    text.style.fontFamily = "Arial, sans-serif";

    squareCraftContainer.appendChild(icon);
    squareCraftContainer.appendChild(text);

    rightFlexContainer.appendChild(squareCraftContainer);

    console.log("✅ SquareCraft icon and text added to the section toolbar.");
}
