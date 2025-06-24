export function viewportToggle(attempt = 0) {
  const iframe = document.getElementById("sqs-site-frame");
  if (!iframe || attempt > 5) {
    console.warn("❌ iframe not found or max attempts reached");
    return;
  }

  const views = {
    mobile: "mobile-viewport",
    tablet: "tab-viewport",
    laptop: "laptop-viewport",
    desktop: "dekstop-viewport",
  };

  const ready = Object.values(views).every((id) =>
    parent.document.getElementById(id)
  );

  if (!ready) {
    console.log("🔁 Waiting for viewport buttons to be available...");
    setTimeout(() => viewportToggle(attempt + 1), 300);
    return;
  }

  Object.entries(views).forEach(([type, id]) => {
    const button = parent.document.getElementById(id);
    if (!button) return;

    button.onclick = () => {
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
    };
  });

  console.log("✅ viewportToggle initialized");
}
