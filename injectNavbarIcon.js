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

        if (panel) {
          panel.remove();
          panel = null;
          return;
        }
        const mainWidget =
          parent.document.querySelector("#sc-widget-container") ||
          document.querySelector("#sc-widget-container");
        if (mainWidget && mainWidget.style.display !== "none") {
          mainWidget.style.display = "none";
        }
        
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

          // Fix offset using viewport-based `fixed` positioning
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
        Object.assign(scDiv.style, {
          display: "flex",
          alignItems: "center",
          border: "1px solid #E5E4E2",
          background: "rgba(255, 127, 23, 0.06)",
          borderRadius: "6px",
          padding: "6px",
          gap: "6px",
          cursor: "pointer",
        });

        const icon = document.createElement("img");
        icon.src = iconSrc;
        icon.alt = "sc";
        Object.assign(icon.style, {
          width: "30px",
          height: "30px",
          borderRadius: "20%",
        });

        const text = document.createElement("span");
        text.innerText = "SquareCraft";
        Object.assign(text.style, {
          fontSize: "14px",
          fontWeight: "bold",
        });

        scDiv.appendChild(icon);
        scDiv.appendChild(text);
        toolbarContainer.appendChild(scDiv);

        let panel = null;

        scDiv.addEventListener("click", () => {
          if (panel) {
            panel.remove();
            panel = null;
            return;
          }

          panel = parent.document.createElement("div");
          panel.className =
            "sc-p-2 z-index-high sc-text-color-white sc-border sc-border-solid sc-border-3d3d3d sc-bg-color-2c2c2c sc-rounded-15px sc-w-300px";
          Object.assign(panel.style, {
            position: "fixed",
            top: "100px",
            left: "100px",
            zIndex: "99999",
          });

          panel.innerHTML = `
            <div id="sc-grabbing" class="sc-cursor-grabbing sc-w-full">
              <div class="sc-flex sc-roboto sc-universal sc-items-center sc-justify-between">
                <img class="sc-cursor-grabbing sc-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
              </div>
              <div class="sc-mt-4">
                <p class="sc-font-size-12 sc-universal sc-roboto sc-font-light">
                  Powerful Visual Editor for Customizing Squarespace Text Styles in Real-Time.
                </p>
              </div>
            </div>
            <div class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"></div>
            <div class="sc-mt-6 sc-h-12 sc-roboto sc-flex sc-items-center sc-universal">
              <p id="design-tab" class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Design</p>
              <p id="advanced-tab" class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Advanced</p>
              <p id="preset-tab" class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Presets</p>
            </div>
            <div class="sc-border-t sc-border-solid sc-relative sc-border-color-494949 sc-w-full">
              <div class="sc-absolute sc-top-0 sc-left-0 sc-bg-color-EF7C2F sc-w-16 sc-h-1px sc-tab-active-indicator"></div>
            </div>
            <div id="tabContentWrapper" class="sc-rounded-4px sc-h-350 sc-scrollBar sc-mt-6 sc-border sc-border-solid sc-border-EF7C2F sc-bg-color-3d3d3d">
              <p>Section widget</p>
            </div>
            <div class="sc-mt-3">
              <div class="sc-flex sc-items-center sc-justify-between sc-gap-2">
                <div id="publish" class="sc-cursor-pointer sc-roboto sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-font-size-12 sc-py-1 sc-rounded-4px sc-text-color-white sc-justify-center">
                  Publish
                </div>
                <div class="sc-cursor-pointer sc-roboto sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-font-size-12 sc-py-1 sc-rounded-4px sc-items-center sc-justify-center">
                  Reset
                </div>
              </div>
            </div>
          `;

          parent.document.body.appendChild(panel);

          const grab = panel.querySelector("#sc-grabbing");
          let isDragging = false;
          let offsetX = 0;
          let offsetY = 0;

          grab.addEventListener("mousedown", (e) => {
            isDragging = true;
            const rect = panel.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            panel.style.pointerEvents = "none";

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", stop);
          });

          function move(e) {
            if (!isDragging) return;
            panel.style.left = `${e.clientX - offsetX}px`;
            panel.style.top = `${e.clientY - offsetY}px`;
          }

          function stop() {
            isDragging = false;
            panel.style.pointerEvents = "auto";
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stop);
          }
        });
      }
    });
  }
  

  insertToolbarIcon();
  insertAdminIcon();

  if (window.__sc_navbarObserver) {
    window.__sc_navbarObserver.disconnect();
  }

  window.__sc_navbarObserver = new MutationObserver(() => {
    insertToolbarIcon();
  });

  window.__sc_navbarObserver.observe(parent.document.body, {
    childList: true,
    subtree: true,
  });
  
}
