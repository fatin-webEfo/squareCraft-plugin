export function viewportToggle() {
  const iframe = document.getElementById("sqs-site-frame");
  if (!iframe) return;

  const buttons = {
    mobile: parent.document.querySelector(".mobile-viewport"),
    tablet: parent.document.querySelector(".tab-viewport"),
    laptop: parent.document.querySelector(".laptop-viewport"),
    desktop: parent.document.querySelector(".dekstop-viewport"),
  };

  Object.entries(buttons).forEach(([viewport, button]) => {
    if (!button) return;
    button.addEventListener("click", () => {
      switch (viewport) {
        case "mobile":
          iframe.style.width = "375px";
          break;
        case "tablet":
          iframe.style.width = "768px";
          break;
        case "laptop":
          iframe.style.width = "1024px";
          break;
        case "desktop":
          iframe.style.width = "100%";
          break;
      }
      console.log(`✅ Switched to ${viewport} view`);
    });
  });
}
