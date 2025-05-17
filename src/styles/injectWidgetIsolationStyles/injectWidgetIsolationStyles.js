function injectWidgetIsolationStyles() {
    if (document.getElementById("sc-style-isolation")) return;
  
    const style = document.createElement("style");
    style.id = "sc-style-isolation";
    style.textContent = `
      #sc-widget-container, #sc-widget-container * {
        all: unset;
        box-sizing: border-box;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        text-transform: inherit;
        background: none;
        border: none;
        outline: none;
        text-align: inherit;
        text-shadow: none;
        filter: none;
        transform: none;
      }
  
      #sc-widget-container {
        all: initial;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
      }
  
      #sc-widget-container * {
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);
  }
  