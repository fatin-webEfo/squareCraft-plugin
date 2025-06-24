export function viewportToggle(attempt = 0) {
  console.log("✅ viewportToggle initialized");

  const views = {
    mobile: { id: "mobile-viewport", width: "428px", vh: "7.5px" },
    tablet: { id: "tab-viewport", width: "768px", vh: "8.5px" },
    laptop: { id: "laptop-viewport", width: "1024px", vh: "9px" },
    desktop: { id: "dekstop-viewport", width: "100%", vh: "10px" },
  };

  const ready = Object.values(views).every((v) =>
    document.getElementById(v.id)
  );

  if (!ready && attempt < 10) {
    setTimeout(() => viewportToggle(attempt + 1), 300);
    return;
  }

  Object.entries(views).forEach(([type, { id, width, vh }]) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.onclick = () => {
      const root = document.documentElement;
      root.classList.remove(
        "sc-mobile-view",
        "sc-tablet-view",
        "sc-laptop-view",
        "sc-desktop-view"
      );
      root.classList.add(`sc-${type}-view`);

      root.style.setProperty("--frame-width", width);
      root.style.setProperty("--vh", vh);
      root.style.setProperty("--frame-scrollbar-width", "0px");

      console.log(`✅ Switched to ${type} with --frame-width: ${width}`);
    };
  });
}
