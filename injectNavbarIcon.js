export function injectNavbarIcon() {

    
    function insertAdminIcon() {
        if (!parent.document.querySelector(".sc-admin-icon-wrapper")) {
            const navContainer = parent.document.querySelector('ul.css-1tn5iw9');
            if (navContainer) {
                const iconSrc = localStorage.getItem("sc_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";
    
                const wrapper = document.createElement("div");
                wrapper.classList.add("sc-admin-icon-wrapper");
                wrapper.style.position = "relative";
                wrapper.style.display = "inline-block";
                wrapper.style.zIndex = "99999";
    
                const icon = document.createElement("img");
                icon.src = iconSrc;
                icon.alt = "sc";
                icon.style.width = "30px";
                icon.style.height = "30px";
                icon.style.borderRadius = "20%";
                icon.style.marginRight = "6px";
                icon.style.cursor = "pointer";
                icon.style.marginTop = "8px";
                icon.style.cursor = "pointer";
                icon.classList.add("sc-admin-icon", "sc-z-99999");
    
                wrapper.appendChild(icon);
                navContainer.parentNode.insertBefore(wrapper, navContainer);
    
                const message = document.createElement("div");
                message.classList.add("sc-floating-message");
                message.innerHTML = `
                  <div class=" sc-floating-message sc-absolute sc-bg-2c2c2c sc-text-white sc-py-8 sc-px-10 sc-rounded-[8px]  sc-z-[99999] sc-opacity-100 sc-transition-opacity sc-duration-500 sc-ease-in-out sc-animation-fade-in sc-whitespace-nowrap sc-shadow-md sc-top-[54px] sc-left-[40%] sc-translate-x-[-50%]">
                 <div class="sc-message-content sc-text-center">
                   <p class="sc-universal sc-text-sm text-EF7C2F sc-font-light sc-poppins"> SquareCraft Edits Saved</p>
                   <div class="sc-mt-4">
                     <p class=" sc-poppins sc-universal sc-font-thin sc-text-sm"> Your SquareCraft Plugin has successfully injected to <br> the Current website </p>
                   </div>
                   <div class="sc-mt-4">
                     <p class="sc-poppins sc-universal sc-font-thin sc-font-underline sc-text-xs sc-absolute sc-right-3 sc-text-gray-400 sc-cursor-pointer sc-bottom-3"> Don't Show Again</p>
                   </div>
                 </div>
                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/cross.png" width="14" class="sc-absolute sc-cursor-pointer sc-top-3 sc-right-3" alt="">
                 <div class="sc-message-arrow"></div>
                `;
    
                wrapper.appendChild(message);
    
                const messageArrow = message.querySelector(".sc-message-arrow");
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
            if (!toolbarContainer.querySelector(".sc-toolbar")) {
                const iconSrc = localStorage.getItem("sc_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";

                const scDiv = document.createElement("div");
                scDiv.classList.add("sc-toolbar");
                scDiv.style.display = "flex";
                scDiv.style.alignItems = "center";
                scDiv.style.border = "1px solid #E5E4E2";
                scDiv.style.background = "rgba(255, 127, 23, 0.06)";
                scDiv.style.borderRadius = "6px";
                scDiv.style.padding = "6px";
                scDiv.style.gap = "6px";

                scDiv.addEventListener("mouseenter", () => {
                    scDiv.style.backgroundColor = "rgba(177, 176, 176, 0.2)";
                });

                scDiv.addEventListener("mouseleave", () => {
                    scDiv.style.backgroundColor = "transparent";
                });

                const icon = document.createElement("img");
                icon.src = iconSrc;
                icon.alt = "sc";
                icon.style.width = "30px";
                icon.style.height = "30px";
                icon.style.borderRadius = "20%";
                icon.style.cursor = "pointer";

                const text = document.createElement("span");
                text.innerText = "SquareCraft";
                text.style.fontSize = "14px";
                text.style.fontWeight = "bold";
                text.style.cursor = "pointer";

                scDiv.appendChild(icon);
                scDiv.appendChild(text);

                toolbarContainer.appendChild(scDiv);
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
