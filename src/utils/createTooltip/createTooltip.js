export function createTooltip(el) {
    const tooltipText = el.getAttribute('data-sc-tooltip');
    if (!tooltipText) return;
  
    const tooltip = document.createElement('div');
    tooltip.className = 'sc-tooltip';
    tooltip.innerText = tooltipText;
  
    el.style.position = 'relative';
    el.appendChild(tooltip);
  
    el.addEventListener('mouseenter', () => {
      console.log('Hovered tooltip element:', el);
      console.log('Tooltip text:', tooltipText);
    });
  }
  