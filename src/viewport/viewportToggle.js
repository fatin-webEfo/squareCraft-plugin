export function viewportToggle(attempt = 0) {
  console.log("✅ viewportToggle initialized");

  const views = {
    mobile: { id: "mobile-viewport", frameWidth: "375px" },
    tablet: { id: "tab-viewport", frameWidth: "640px" },
    laptop: { id: "laptop-viewport", frameWidth: "1024px" },
    desktop: { id: "dekstop-viewport", frameWidth: "1440px" },
  };

  const ready = Object.values(views).every((v) =>
    document.getElementById(v.id)
  );
  if (!ready && attempt < 10) {
    setTimeout(() => viewportToggle(attempt + 1), 300);
    return;
  }

  Object.entries(views).forEach(([type, { id, frameWidth }]) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.style.cursor = "pointer";
    btn.addEventListener("mousedown", (e) => e.stopPropagation());
    btn.addEventListener("touchstart", (e) => e.stopPropagation());

    btn.onclick = () => {
      const target = document.querySelector(
        ".RGtXGwLT8k4vtzxS.Ipc7XTyoBO0wrIPb.BjStk7rFpIUNsoCd"
      );

      if (target) {
        target.style.setProperty("width", frameWidth, "important");
        target.style.setProperty("max-width", frameWidth, "important");
        target.style.setProperty("min-width", frameWidth, "important");

        console.log(`✅ Viewport set to ${frameWidth}`);
      } else {
        console.warn("❌ Viewport wrapper not found");
      }

      Object.values(views).forEach(({ id }) =>
        document.getElementById(id)?.classList.remove("sc-active-viewport")
      );
      btn.classList.add("sc-active-viewport");
    };
  });
}
