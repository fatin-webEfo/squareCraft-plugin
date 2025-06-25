export function viewportToggle(attempt = 0) {
  console.log("✅ viewportToggle initialized");

  const views = {
    mobile: {
      id: "mobile-viewport",
      frameWidth: "375px",
      vh: "7.5px",
    },
    tablet: {
      id: "tab-viewport",
      frameWidth: "640px",
      vh: "8.5px",
    },
    laptop: {
      id: "laptop-viewport",
      frameWidth: "1024px",
      vh: "9px",
    },
    desktop: {
      id: "dekstop-viewport",
      frameWidth: "1440px",
      vh: "10px",
    },
  };

  const iframe = document.getElementById("sqs-site-frame");
  if (!iframe || attempt > 10) {
    console.warn("❌ iframe#sqs-site-frame not found");
    return;
  }

  const ready = Object.values(views).every((v) =>
    document.getElementById(v.id)
  );
  if (!ready) {
    setTimeout(() => viewportToggle(attempt + 1), 300);
    return;
  }

  Object.entries(views).forEach(([type, { id, frameWidth, vh }]) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.style.cursor = "pointer";

    btn.onclick = () => {
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      const root = iframeDoc.documentElement;
      root.style.setProperty("--frame-width", frameWidth, "important");
      root.style.setProperty("--vh", vh, "important");
      root.style.setProperty("--frame-scrollbar-width", "0px", "important");

      Object.values(views).forEach(({ id }) => {
        document.getElementById(id)?.classList.remove("sc-active-viewport");
      });
      btn.classList.add("sc-active-viewport");

      console.log(`✅ Applied ${type} viewport: ${frameWidth}`);
    };
  });
}
