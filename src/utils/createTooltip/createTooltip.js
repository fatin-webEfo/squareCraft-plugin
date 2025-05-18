export function createTooltip(el) {
    const tooltipText = el.getAttribute('data-sc-tooltip');
    if (!tooltipText) return;
  
    const tooltip = document.createElement('div');
    tooltip.className = 'sc-tooltip';
    tooltip.innerText = tooltipText;
  
    tooltip.style.cssText = `
      position: absolute !important;
      top: -30px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background-color: #000 !important;
      color: white !important;
      font-size: 10px !important;
      padding: 4px 8px !important;
      border-radius: 6px !important;
      white-space: nowrap !important;
      z-index: 999999 !important;
      transition: opacity 0.2s ease !important;
      pointer-events: none !important;
      border: 0.5px solid #f0640834 !important;
      opacity: 0 !important;
      display: none !important;
    `;
  
    el.style.position = 'relative';
    el.appendChild(tooltip);
  
    el.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      tooltip.style.display = 'block';
    });
  
    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.display = 'none';
    });
  }
  