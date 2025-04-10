export function injectNavbarIcon() {


   function insertAdminIcon() {
  if (!parent.document.querySelector(".sc-admin-icon-wrapper")) {
    const navContainer = parent.document.querySelector('ul.css-1tn5iw9');
    if (navContainer) {
      const iconSrc = localStorage.getItem("sc_icon") || "https://i.ibb.co.com/kg9fn02s/Frame-33.png";

      const wrapper = document.createElement("div");
      wrapper.classList.add("sc-admin-icon-wrapper", "sc-relative", "sc-inline-block", "sc-z-99999");

      const icon = document.createElement("img");
      icon.src = iconSrc;
      icon.alt = "sc";
      icon.classList.add("sc-admin-icon", "sc-z-99999", "sc-w-30px", "sc-h-30px", "sc-rounded-20", "sc-mr-6", "sc-mt-8", "sc-cursor-pointer");

      wrapper.appendChild(icon);
      navContainer.parentNode.insertBefore(wrapper, navContainer);

      const message = document.createElement("div");
      message.classList.add("sc-floating-message", "sc-message");

      message.innerHTML = `
        <div class="sc-message-content">✅ SquareCraft installed!</div>
        <div class="sc-message-arrow"></div>
      `;

      wrapper.appendChild(message);

      const messageArrow = message.querySelector(".sc-message-arrow");
      messageArrow.classList.add("sc-message-arrow");

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
