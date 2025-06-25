export function viewportToggle(attempt = 0) {
  console.log("✅ viewportToggle initialized");

  const views = {
    mobile: { id: "mobile-viewport", frameWidth: "375px" },
    tablet: { id: "tab-viewport", frameWidth: "640px" },
    laptop: { id: "laptop-viewport", frameWidth: "1024px" },
    desktop: { id: "dekstop-viewport", frameWidth: "1440px" },
  };

  const parentViewportWrapper = parent.document.querySelector(
    ".RGtXGwLT8k4vtzxS.BjStk7rFpIUNsoCd.FTIKN_0WXpoHyCfE.nGThBduWyUUM6RxV"
  );

  if (!parentViewportWrapper || attempt > 10) {
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
      parentViewportWrapper.style.setProperty("width", frameWidth, "important");
      parentViewportWrapper.style.setProperty(
        "max-width",
        frameWidth,
        "important"
      );
      parentViewportWrapper.style.setProperty(
        "min-width",
        frameWidth,
        "important"
      );

      console.log(`✅ Viewport forced to ${frameWidth}`);

      Object.values(views).forEach(({ id }) =>
        parent.document
          .getElementById(id)
          ?.classList.remove("sc-active-viewport")
      );
      btn.classList.add("sc-active-viewport");
    };
  });
}
