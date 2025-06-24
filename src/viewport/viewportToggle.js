export function viewportToggle() {
  const iframe = document.getElementById("sqs-site-frame");
  if (!iframe) return;

  const views = {
    mobile: "mobile-viewport",
    tablet: "tab-viewport",
    laptop: "laptop-viewport",
    desktop: "dekstop-viewport",
  };

  Object.entries(views).forEach(([type, id]) => {
    const button = parent.document.getElementById(id);
    if (!button) return;

    button.addEventListener("click", () => {
      switch (type) {
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
      console.log(`✅ Switched to ${type} view`);
    });
  });
}
