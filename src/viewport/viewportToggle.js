export function viewportToggle(attempt = 0) {
  console.log("✅ viewportToggle initialized");

  const views = {
    mobile: { id: "mobile-viewport", frameWidth: "428px" },
    tablet: { id: "tab-viewport", frameWidth: "720px" },
    laptop: { id: "laptop-viewport", frameWidth: "1280px" },
    desktop: { id: "dekstop-viewport", frameWidth: "1440px" }, 
  };

  const wrapper = parent.document.querySelector(
    ".RGtXGwLT8k4vtzxS.BjStk7rFpIUNsoCd.FTIKN_0WXpoHyCfE.nGThBduWyUUM6RxV"
  );

  if (!wrapper || attempt > 10) {
    console.warn("❌ Parent viewport wrapper not found");
    return;
  }

  const ready = Object.values(views).every((v) =>
    parent.document.getElementById(v.id)
  );
  if (!ready) {
    setTimeout(() => viewportToggle(attempt + 1), 300);
    return;
  }

  Object.entries(views).forEach(([type, { id, frameWidth }]) => {
    const btn = parent.document.getElementById(id);
    if (!btn) return;

    btn.style.cursor = "pointer";
    btn.addEventListener("mousedown", (e) => e.stopPropagation());
    btn.addEventListener("touchstart", (e) => e.stopPropagation());

    btn.onclick = () => {
      if (type === "desktop") {
        wrapper.style.removeProperty("width");
        wrapper.style.removeProperty("max-width");
        wrapper.style.removeProperty("min-width");

        wrapper.style.setProperty("width", "100%", "important");
        wrapper.style.setProperty("height", "100%", "important");

        console.log("🖥️ Reset to desktop: 100% width/height");
      } else {
        wrapper.style.setProperty("width", frameWidth, "important");
        wrapper.style.setProperty("max-width", frameWidth, "important");
        wrapper.style.setProperty("min-width", frameWidth, "important");

        console.log(`✅ Viewport set to ${frameWidth}`);
      }

      Object.values(views).forEach(({ id }) =>
        parent.document
          .getElementById(id)
          ?.classList.remove("sc-active-viewport")
      );
      btn.classList.add("sc-active-viewport");
    };
  });
}
