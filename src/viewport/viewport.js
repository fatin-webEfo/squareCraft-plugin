

export function getCurrentViewport() {
  const width = window.innerWidth;

  if (width <= 640) {
    return "mobile";
  } else if (width <= 767) {
    return "tablet";
  } else if (width <= 1024) {
    return "laptop";
  } else {
    return "desktop";
  }
}

export function logCurrentViewport() {
  const viewport = getCurrentViewport();
  console.log(`🖥️ Current Squarespace Viewport: ${viewport}`);
}