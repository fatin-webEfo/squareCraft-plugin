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
            icon.style.marginTop = "8px";
            icon.style.cursor = "pointer";
      
            wrapper.appendChild(icon);
            navContainer.parentNode.insertBefore(wrapper, navContainer);
      
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
                 <div> <p style="font-size: 13px; font-weight: 300; font-family: 'Poppins', sans-serif; color: #EF7C2F; padding: 0 !important;
                      margin: 0 !important;">SquareCraft Edits Saved</p></div>
                  <div style="marginTop: 8px;">
                    <p style="font-family: 'Poppins', sans-serif; font-weight: 300; font-size: 11px; 
                      padding: 0 !important;
                      margin: 0 !important;">
                      Your SquareCraft Plugin has successfully injected to <br> the Current website
                    </p>
                  </div>
                </div>   
                 <p style="
                      font-family: 'Poppins', sans-serif;
                      font-weight: 300;
                      font-size: 8px;
                      text-decoration: underline;
                      position: absolute;
                      right: 12px;
                      padding: 0 !important;
                      margin: 0 !important;
                      marginTop: 28px;
                      bottom: 4px;
                      color: #9ca3af;
                      cursor: pointer;
                    ">Don't Show Again
                    </p>
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
      
      function adminIconOptions(wrapper) {
        if (document.getElementById("sc-admin-panel")) return;

        const panel = document.createElement("div");
        panel.id = "sc-admin-panel";
        panel.style.position = "absolute";
        panel.style.top = "48px";
        panel.style.right = "0";
        panel.style.background = "#1e1e1e";
        panel.style.borderRadius = "8px";
        panel.style.padding = "10px 0";
        panel.style.zIndex = "99999";
        panel.style.width = "300px";
        panel.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
        panel.style.fontFamily = "'Poppins', sans-serif";

        panel.innerHTML = `
          <div style="text-align:center; color:white; font-weight:bold; margin-bottom:6px;">SquareCraft</div>
          <div style="background:#1db954; color:white; font-size:12px; padding:6px 12px; text-align:center;">
            Your free trial expires in 0 days. <span style="text-decoration: underline; cursor:pointer;">Click here to upgrade.</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 12px;">
            ${[
              "Site",
              "Page",
              "Template",
              "Settings",
              "Subscription",
              "Support",
            ]
              .map(
                (name) => `
              <div style="background:#2c2c2c; color:white; font-size:12px; text-align:center; padding: 14px 0; border-radius: 6px; cursor:pointer;">
                ${name}
              </div>
            `
              )
              .join("")}
          </div>
        `;

        wrapper.appendChild(panel);

        const hide = () => {
          panel.remove();
          document.removeEventListener("click", handleOutsideClick);
        };

        const handleOutsideClick = (e) => {
          if (!panel.contains(e.target) && !wrapper.contains(e.target)) hide();
        };

        setTimeout(() => {
          document.addEventListener("click", handleOutsideClick);
        }, 0);
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
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      adminIconOptions(wrapper);
    });
    

    const observer = new MutationObserver(() => {
        insertToolbarIcon();
    });

    observer.observe(parent.document.body, { childList: true, subtree: true });
}
