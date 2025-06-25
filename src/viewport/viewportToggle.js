export function viewportToggle(attempt = 0) {
  console.log("✅ viewportToggle initialized");

  const views = {
    mobile: {
      id: "mobile-viewport",
      frameWidth: "375px",
    },
    tablet: {
      id: "tab-viewport",
      frameWidth: "640px",
    },
    laptop: {
      id: "laptop-viewport",
      frameWidth: "1024px",
    },
    desktop: {
      id: "dekstop-viewport",
      frameWidth: "1440px",
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

  Object.entries(views).forEach(([type, { id, frameWidth }]) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.style.cursor = "pointer";

    btn.addEventListener("mousedown", (e) => e.stopPropagation());
    btn.addEventListener("touchstart", (e) => e.stopPropagation());

    btn.onclick = () => {
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      const target = iframeDoc.querySelector(
        ".RGtXGwLT8k4vtzxS.Ipc7XTyoBO0wrIPb.BjStk7rFpIUNsoCd"
      );

      if (target) {
        target.style.width = frameWidth;
        target.style.maxWidth = frameWidth;
        console.log(`✅ Viewport set to ${frameWidth}`);
      } else {
        console.warn("❌ Viewport wrapper not found in iframe");
      }

      Object.values(views).forEach(({ id }) =>
        document.getElementById(id)?.classList.remove("sc-active-viewport")
      );
      btn.classList.add("sc-active-viewport");
    };
  });
}
