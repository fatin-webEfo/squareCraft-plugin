import { NavbarIconHtml } from "https://fatin-webefo.github.io/squareCraft-plugin/NavbarIconHtml.js";

export function injectNavbarIcon() {








  function insertAdminIcon() {
    if (!parent.document.querySelector(".sc-admin-icon-wrapper")) {
      const navContainer = parent.document.querySelector("ul.css-1tn5iw9");
      if (!navContainer) return;

      const iconSrc =
        localStorage.getItem("sc_icon") ||
        "https://i.ibb.co.com/kg9fn02s/Frame-33.png";

      const wrapper = parent.document.createElement("div");
      wrapper.classList.add("sc-admin-icon-wrapper");
      Object.assign(wrapper.style, {
        position: "relative",
        display: "inline-block",
        zIndex: "99999",
      });

      const icon = parent.document.createElement("img");
      icon.src = iconSrc;
      icon.alt = "sc";
      Object.assign(icon.style, {
        width: "30px",
        height: "30px",
        borderRadius: "20%",
        marginRight: "6px",
        marginTop: "8px",
        cursor: "pointer",
      });

      wrapper.appendChild(icon);
      navContainer.parentNode.insertBefore(wrapper, navContainer);

      let panel = null;

      icon.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close panel if already open
        if (panel) {
          panel.remove();
          panel = null;
          return;
        }

        // Create panel
        panel = parent.document.createElement("div");
        panel.id = "sc-admin-panel";
        Object.assign(panel.style, {
          position: "absolute",
          top: "45px",
          right: "-10px",
          background: "#2c2c2c",
          borderRadius: "8px",
          padding: "0",
          zIndex: "99999",
          width: "320px",
          fontFamily: "'Poppins', sans-serif",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        });

        panel.innerHTML = NavbarIconHtml();
        wrapper.appendChild(panel);

        const dragTarget = panel.querySelector("#icon-options");
        let isDragging = false;
        let offsetX = 0,
          offsetY = 0;

        dragTarget.style.cursor = "grab";

        const startDrag = (event) => {
          if (
            panel.querySelector("#viewport-sections")?.contains(event.target) ||
            event.target.closest(".sc-dropdown")
          )
            return;

          isDragging = true;
          event.preventDefault();

          const clientX = event.clientX || event.touches?.[0]?.clientX;
          const clientY = event.clientY || event.touches?.[0]?.clientY;

          const rect = panel.getBoundingClientRect();
          offsetX = clientX - rect.left;
          offsetY = clientY - rect.top;

          Object.assign(panel.style, {
            position: "fixed",
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            right: "unset",
            transform: "none",
            transition: "none",
            willChange: "left, top",
            pointerEvents: "none",
            userSelect: "none",
          });

          dragTarget.style.cursor = "grabbing";

          document.addEventListener("mousemove", dragMove);
          document.addEventListener("mouseup", stopDrag);
          document.addEventListener("touchmove", dragMove);
          document.addEventListener("touchend", stopDrag);
        };

        const dragMove = (event) => {
          if (!isDragging) return;

          const clientX = event.clientX || event.touches?.[0]?.clientX;
          const clientY = event.clientY || event.touches?.[0]?.clientY;

          const x = clientX - offsetX;
          const y = clientY - offsetY;

          panel.style.left = `${x}px`;
          panel.style.top = `${y}px`;
        };

        const stopDrag = () => {
          if (!isDragging) return;

          isDragging = false;
          dragTarget.style.cursor = "grab";

          Object.assign(panel.style, {
            transform: "none",
            willChange: "auto",
            pointerEvents: "auto",
            userSelect: "auto",
          });

          document.removeEventListener("mousemove", dragMove);
          document.removeEventListener("mouseup", stopDrag);
          document.removeEventListener("touchmove", dragMove);
          document.removeEventListener("touchend", stopDrag);
        };

        dragTarget.removeEventListener("mousedown", startDrag);
        dragTarget.removeEventListener("touchstart", startDrag);
        dragTarget.addEventListener("mousedown", startDrag);
        dragTarget.addEventListener("touchstart", startDrag);
        

        const handleOutsideClick = (e) => {
          if (!panel.contains(e.target) && !wrapper.contains(e.target)) {
            panel.remove();
            panel = null;
            document.removeEventListener("click", handleOutsideClick);
          }
        };

        setTimeout(() => {
          document.addEventListener("click", handleOutsideClick);
        }, 0);
      });

      const message = parent.document.createElement("div");
      message.innerHTML = `
        <div style="
          position: absolute;
          background-color: #2c2c2c;
          color: white;
          padding: 2rem 2rem;
          border-radius: 8px;
          z-index: 99999;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
          animation: scFadeIn 0.5s ease-in-out;
          white-space: nowrap;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
          top: 54px;
          left: 40%;
          transform: translateX(-50%);
        ">
          <div style="text-align: center;">
            <p style="font-size: 13px; font-weight: 300; color: #EF7C2F; margin: 0;">SquareCraft Edits Saved</p>
            <p style="font-weight: 300; font-size: 11px; margin: 4px 0 0;">
              Your SquareCraft Plugin has successfully injected<br> to the Current website
            </p>
          </div>
          <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/cross.png"
            width="14"
            style="position: absolute; top: 12px; right: 12px; cursor: pointer;" alt="">
          <div style="
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #2c2c2c;
          "></div>
        </div>
      `;
      wrapper.appendChild(message);
      const innerMsg = message.querySelector("div");
      setTimeout(() => {
        innerMsg.style.opacity = "0";
        setTimeout(() => message.remove(), 500);
      }, 5000);
    }
  }
  

























  function insertToolbarIcon() {
    const toolbarContainers = parent.document.querySelectorAll(
      "div.js-section-toolbar"
    );

    toolbarContainers.forEach((toolbarContainer) => {
      if (!toolbarContainer.querySelector(".sc-toolbar")) {
        const iconSrc =
          localStorage.getItem("sc_icon") ||
          "https://i.ibb.co.com/kg9fn02s/Frame-33.png";

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
