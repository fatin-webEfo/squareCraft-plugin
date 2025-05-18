export function createTooltip(targetEl, text) {
    if (!targetEl) return;
  
    const tooltip = document.createElement("div");
    tooltip.className = "sc-tooltip";
    tooltip.innerText = text;
  
    targetEl.appendChild(tooltip);
  
    targetEl.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
    });
  
    targetEl.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  }
  