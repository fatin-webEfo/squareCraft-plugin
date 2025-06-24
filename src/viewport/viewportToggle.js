export function viewportToggle() {
  const viewportContainer = document.getElementById("viewport-sections");
  const iframe = document.getElementById("sqs-site-frame");

  if (!viewportContainer || !iframe) return;

  const simulateViewport = (viewport) => {
    const styles = {
      mobile: { width: "375px", height: "667px" },
      tablet: { width: "768px", height: "1024px" },
      laptop: { width: "1024px", height: "768px" },
      desktop: { width: "1440px", height: "900px" },
    };

    const style = styles[viewport];
    if (!style) return;

    iframe.style.width = style.width;
    iframe.style.height = style.height;

    console.log(
      `📱 Switched to ${viewport} view (${style.width} × ${style.height})`
    );
  };

  viewportContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("mobile-viewport")) {
      simulateViewport("mobile");
    } else if (e.target.classList.contains("tab-viewport")) {
      simulateViewport("tablet");
    } else if (e.target.classList.contains("laptop-viewport")) {
      simulateViewport("laptop");
    } else if (e.target.classList.contains("dekstop-viewport")) {
      simulateViewport("desktop");
    }
  });
}
