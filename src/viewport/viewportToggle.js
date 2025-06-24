export function viewportToggle(attempt = 0) {
  console.log("✅ viewportToggle initialized");

  const views = {
    mobile: "mobile-viewport",
    tablet: "tab-viewport",
    laptop: "laptop-viewport",
    desktop: "dekstop-viewport",
  };

  const ready = Object.values(views).every((id) =>
    parent.document.getElementById(id)
  );

  if (!ready && attempt < 10) {
    setTimeout(() => viewportToggle(attempt + 1), 300);
    return;
  }

  Object.entries(views).forEach(([type, id]) => {
    const btn = parent.document.getElementById(id);
    if (!btn) return;

    btn.onclick = () => {
      let width;

      switch (type) {
        case "mobile":
          width = 375;
          break;
        case "tablet":
          width = 640;
          break;
        case "laptop":
          width = 1024;
          break;
        case "desktop":
        default:
          width = 1440;
      }

      // Fake the width for JS by overriding innerWidth temporarily
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: width,
      });

      const resizeEvent = new Event("resize");
      window.dispatchEvent(resizeEvent);

      console.log(`✅ Switched to ${type} view (${width}px)`);
    };
  });
}
