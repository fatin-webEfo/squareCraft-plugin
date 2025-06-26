export function syncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) {
    console.warn("❌ No selected element provided for syncCustomTimelineArrow");
    return;
  };

  const arrow = document.getElementById("custom-timeline-arrow");
  const border = document.getElementById("custom-timeline-border");
  if (!arrow || !border) 
    {
    console.warn("❌ Arrow or border element not found for syncCustomTimelineArrow");
    return;
  }

  const rect = selectedElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  let align = "center";

  if (rect.bottom < 0) {
    align = "right"; 
  } else if (rect.top > viewportHeight) {
    align = "left";
  }

  arrow.style.left = "";
  arrow.style.right = "";
  arrow.style.transform = "";

  if (align === "left") {
    arrow.style.left = "5px";
  } else if (align === "right") {
    arrow.style.right = "5px";
  } else {
    const borderRect = border.getBoundingClientRect();
    const arrowCenter = borderRect.width / 2 - arrow.offsetWidth / 2;
    arrow.style.left = `${arrowCenter}px`;
  }
}
  