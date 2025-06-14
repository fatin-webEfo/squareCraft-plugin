export function injectNavbarIcon() {

    
  function insertAdminIcon() {
    if (!parent.document.querySelector(".sc-admin-icon-wrapper")) {
      const navContainer = parent.document.querySelector("ul.css-1tn5iw9");
      if (navContainer) {
        const iconSrc =
          localStorage.getItem("sc_icon") ||
          "https://i.ibb.co.com/kg9fn02s/Frame-33.png";

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
        icon.style.marginTop = "8px";
        icon.style.cursor = "pointer";

        wrapper.appendChild(icon);
        navContainer.parentNode.insertBefore(wrapper, navContainer);

        icon.addEventListener("click", (e) => {
          e.stopPropagation();
          if (document.getElementById("sc-admin-panel")) return;

          const panel = document.createElement("div");
          panel.id = "sc-admin-panel";
          panel.style.position = "absolute";
          panel.style.top = "45px";
          panel.style.right = "-10px";
          panel.style.background = "#2c2c2c";
          panel.style.borderRadius = "8px";
          panel.style.padding = "0";
          panel.style.zIndex = "99999";
          panel.style.width = "320px";
          panel.style.fontFamily = "'Poppins', sans-serif";
          panel.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)";
          const items = [
            {
              label: "Global",
              icon: "https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/global.svg",
            },
            {
              label: "Page",
              icon: "https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/page.svg",
            },
            {
              label: "Template",
              icon: "https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/template.svg",
            },
            {
              label: "Settings",
              icon: "https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/settings.svg",
            },
            {
              label: "Subscription",
              icon: "https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/subscription.svg",
            },
            {
              label: "Support",
              icon: "https://fatin-webefo.github.io/squareCraft-plugin/public/icon-click-items/support.svg",
            },
          ];
          const gridHTML = items
            .map(
              (item) => `
                 <div  style="background:#1f1f1f; color:white; font-size:12px; text-align:center; padding: 16px 0; cursor:pointer; transition:background 0.2s;
                  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;" 
                           onmouseenter="this.style.background='#3a3a3a'" 
                           onmouseleave="this.style.background='#1f1f1f'">
                   <img src="${item.icon}" style="width: 18px; height: 18px;" />
                  <span style="font-weight: 300; color:rgb(194, 197, 204);">${item.label}</span>

                 </div>
               `
            )
            .join("");

          panel.innerHTML = `
              <div id="icon-options"><div  style="padding: 12px 16px;  color: white; font-size: 14px; display:flex; align-items:center; justify-content:space-between;">
                <span style="font-size:18px; font-weight: 400;">SquareCraft</span>
                  <div id="viewport-sections" style="cursor: pointer; display: flex; align-items: center; gap:8px; justify-content: center;">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/mobile.svg" style="width: 18px;">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/tab.svg" style="width: 18px;">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/laptop.svg" style="width: 18px;">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/viewport/monitor.svg" style="width: 18px;">
                  </div>
              </div>
              <div style="background:#EF7C2F; color:white; font-size:12px; padding:6px 12px; text-align:center;">
                Your free trial expires in 0 days. <span style="text-decoration: underline; cursor:pointer;">Click here to upgrade.</span>
              </div>  
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background:#2c2c2c; padding: 1px;">
                  ${gridHTML}
              </div></div>
          `;

          wrapper.appendChild(panel);
          



          const dragTarget = panel.querySelector("#icon-options");
          let offsetX = 0,
            offsetY = 0;
          let isDragging = false;

          dragTarget.style.cursor = "grab";

          function startDrag(e) {
            const viewport = panel.querySelector("#viewport-sections");
            if (
              viewport &&
              (viewport === e.target || viewport.contains(e.target))
            )
              return;

            if (e.button !== 0) return; // Only left mouse button

            isDragging = true;
            const rect = panel.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            panel.style.position = "fixed";
            panel.style.left = `${rect.left}px`;
            panel.style.top = `${rect.top}px`;
            panel.style.right = "unset";
            panel.style.transform = "none";
            dragTarget.style.cursor = "grabbing";

            document.addEventListener("mousemove", dragMove);
            document.addEventListener("mouseup", stopDrag);
          }

          function dragMove(e) {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            panel.style.left = `${x}px`;
            panel.style.top = `${y}px`;
          }

          function stopDrag(e) {
            isDragging = false;
            dragTarget.style.cursor = "grab";

            document.removeEventListener("mousemove", dragMove);
            document.removeEventListener("mouseup", stopDrag);
          }

          dragTarget.removeEventListener("mousedown", startDrag);
          dragTarget.addEventListener("mousedown", startDrag);
          
          
          
          
          
          const hide = () => {
            panel.remove();
            document.removeEventListener("click", handleOutsideClick);
          };

          const handleOutsideClick = (e) => {
            if (!panel.contains(e.target) && !wrapper.contains(e.target))
              hide();
          };

          setTimeout(() => {
            document.addEventListener("click", handleOutsideClick);
          }, 0);
        });

        const message = document.createElement("div");
        message.innerHTML = `
          <div style="
            position: absolute;
            background-color: #2c2c2c;
            color: white;
            padding: 2rem 2rem;
            border-radius: 8px;
            z-index: 99999;
            opacity: 1;
            transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
            animation: scFadeIn 0.5s ease-in-out;
            white-space: nowrap;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
            top: 54px;
            left: 40%;
            transform: translateX(-50%);
          ">
            <div style="text-align: center;">
              <p style="font-size: 13px; font-weight: 300; font-family: 'Poppins', sans-serif; color: #EF7C2F; margin: 0;">SquareCraft Edits Saved</p>
              <p style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 11px; margin: 4px 0 0;">
                Your SquareCraft Plugin has successfully injected to <br> the Current website
              </p>
            </div>   
            <p style="
                  font-family: 'Poppins', sans-serif;
                  font-weight: 300;
                  font-size: 8px;
                  text-decoration: underline;
                  position: absolute;
                  right: 12px;
                  bottom: 4px;
                  color: #9ca3af;
                  cursor: pointer;
                ">Don't Show Again</p>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/cross.png"
                width="14"
                style="position: absolute; top: 12px; right: 12px; cursor: pointer;"
                alt="">
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
