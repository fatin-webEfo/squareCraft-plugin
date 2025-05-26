export function injectWidgetIsolationStyles() {
  if (document.getElementById("sc-style-isolation")) return;

  const style = document.createElement("style");
  style.id = "sc-style-isolation";
  style.textContent = `
    #sc-widget-container, #sc-widget-container * {
      all: unset !important;
      box-sizing: border-box !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      color: inherit !important;
      line-height: inherit !important;
      letter-spacing: inherit !important;
      text-transform: inherit !important;
      background: none !important;
      border: none !important;
      outline: none !important;
      text-align: inherit !important;
      text-shadow: none !important;
      filter: none !important;
      transform: none !important;
    }

    #sc-widget-container {
      all: initial !important;
      font-family: 'Roboto', sans-serif !important;
      box-sizing: border-box !important;
    }

    #sc-widget-container * {
      box-sizing: border-box !important;
    }
  `;
  document.head.appendChild(style);
}
