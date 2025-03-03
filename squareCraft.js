(async function squareCraft() {
  const widgetScript = document.getElementById("squarecraft-script");
  if (!widgetScript) {
      console.error(":x: Widget script not found! Ensure the script tag exists with id 'squarecraft-script'.");
      return;
  }

  const token = widgetScript.dataset?.token;
  const squareCraft_u_id = widgetScript.dataset?.uId;
  const squareCraft_w_id = widgetScript.dataset?.wId;

  if (token) {
      localStorage.setItem("squareCraft_auth_token", token);
      document.cookie = `squareCraft_auth_token=${token}; path=/; domain=${location.hostname}; Secure; SameSite=Lax`;
  }

  if (squareCraft_u_id) {
      localStorage.setItem("squareCraft_u_id", squareCraft_u_id);
      document.cookie = `squareCraft_u_id=${squareCraft_u_id}; path=.squarespace.com;`;
  }

  if (squareCraft_w_id) {
      localStorage.setItem("squareCraft_w_id", squareCraft_w_id);
      document.cookie = `squareCraft_w_id=${squareCraft_w_id}; path=.squarespace.com;`;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://fatin-webefo.github.io/squareCraft-Plugin/src/styles/parent.css";
  document.head.appendChild(link);

  let selectedElement = null;
  let widgetIcon = null;
  let widgetContainer = null;

  // Function to create Widget UI
  async function createWidget() {
      console.log("📥 Fetching widget module...");
      try {
          const module = await import("https://fatin-webefo.github.io/squareCraft-Plugin/html.js");
          if (module && module.html) {
              console.log("✅ HTML module loaded successfully!");

              if (!widgetContainer) {
                  widgetContainer = document.createElement("div");
                  widgetContainer.id = "squarecraft-widget-container";
                  widgetContainer.classList.add("squareCraft-fixed", "squareCraft-text-color-white", "squareCraft-universal", "squareCraft-z-9999");
                  widgetContainer.innerHTML = module.html();
                  document.body.appendChild(widgetContainer);
              } else {
                  widgetContainer.classList.remove("squareCraft-hidden");
              }
          } else {
              console.error("❌ Failed to retrieve the HTML function from module!");
          }
      } catch (error) {
          console.error("🚨 Error loading HTML module:", error);
      }
  }

  // Function to create the widget icon
  function createWidgetIcon() {
      if (!widgetIcon) {
          widgetIcon = document.createElement("img");
          widgetIcon.id = "squarecraft-widget-icon";
          widgetIcon.src = "https://i.ibb.co/RGcBx7SF/Logo-Blue.png";
          widgetIcon.classList.add(
              "squareCraft-absolute",
              "squareCraft-hidden",
              "squareCraft-rounded-md",
              "squareCraft-w-20",
              "squareCraft-rounded-lg",
              "squareCraft-bg-color-2c2c2c",
              "squareCraft-cursor-pointer",
              "squareCraft-z-9999",
              "squareCraft-widget-icon",
              "squareCraft-animate-border",
              "squareCraft-animate-border"
          );
          document.body.appendChild(widgetIcon);
      }
      return widgetIcon;
  }

  document.body.addEventListener("click", (event) => {
      const targetBlock = event.target.closest('[id^="block-"]');

      // Case 1: Clicked on widget icon → Hide it & Show Widget UI
      if (widgetIcon && event.target === widgetIcon) {
          widgetIcon.classList.add("squareCraft-hidden");
          createWidget();
          return;
      }

      // Case 2: Clicked outside both widgetIcon & Widget UI → Hide all
      if (
          widgetContainer &&
          !widgetContainer.contains(event.target) &&
          !widgetIcon?.contains(event.target) &&
          !targetBlock
      ) {
          console.log("🛑 Clicked outside. Hiding all elements.");
          widgetIcon?.classList.add("squareCraft-hidden");
          widgetContainer?.classList.add("squareCraft-hidden");
          document.querySelectorAll(".squareCraft-outline").forEach(el => {
              el.classList.remove("squareCraft-outline");
              el.style.outline = "";
          });
          return;
      }

      // Case 3: Clicked on a valid block → Show Widget Icon
      if (targetBlock) {
          console.log("Target Block:", targetBlock);
          console.log("Target Block ID:", targetBlock?.id);

          document.querySelectorAll(".squareCraft-outline").forEach(el => {
              el.classList.remove("squareCraft-outline");
              el.style.outline = "";
          });

          targetBlock.classList.add("squareCraft-outline");
          targetBlock.style.outline = "2px dashed #EF7C2F";

          selectedElement = targetBlock;
          widgetIcon = createWidgetIcon();
          widgetIcon.classList.remove("squareCraft-hidden");

          const rect = targetBlock.getBoundingClientRect();
          widgetIcon.style.position = "absolute";
          widgetIcon.style.top = `${window.scrollY + rect.top}px`;
          widgetIcon.style.left = `${window.scrollX + rect.right - widgetIcon.offsetWidth}px`;
      }
  });
})();
