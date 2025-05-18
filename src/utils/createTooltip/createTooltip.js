export function createTooltip(targetEl) {
    if (!targetEl) return;
  
    const tooltipText = targetEl.getAttribute('data-sc-tooltip');
    if (!tooltipText) return;
  
    const tooltip = document.createElement("div");
    tooltip.className = "sc-tooltip";
    tooltip.innerText = tooltipText;
  
    targetEl.appendChild(tooltip);
  
    targetEl.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
    });
  
    targetEl.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  }
  