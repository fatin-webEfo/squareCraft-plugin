export async function postStyles(targetElement, css = {}, fontFamily, fontVariant, fontSize) {
  const token = localStorage.getItem("sc_auth_token");
  const userId = localStorage.getItem("sc_u_id");
  const widgetId = localStorage.getItem("sc_w_id");

  if (!token || !userId || !widgetId) return;

  let page = targetElement.closest("article[data-page-sections]");
  let block = targetElement.closest('[id^="block-"]');

  if (!page || !block) return;

  let pageId = page.getAttribute("data-page-sections");
  let elementId = block.id;

  if (fontFamily) css["font-family"] = fontFamily;
  if (fontVariant) css["font-variant"] = fontVariant;
  if (fontSize) css["font-size"] = `${fontSize}px`;

  const formattedFontName = fontFamily.replace(/\s+/g, "+");
  const fontCDN = `https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@400;700&display=swap`;
  css["font-cdn"] = fontCDN;

  const modificationData = {
    userId,
    token,
    widgetId,
    modifications: [
      {
        pageId,
        elements: [{ elementId, css }]
      }
    ]
  };

  await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(modificationData),
  });
}
