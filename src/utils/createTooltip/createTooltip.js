export function createTooltip(el) {
    const tooltipText = el.getAttribute('data-sc-tooltip');
    if (!tooltipText) return;
  
    const tooltip = document.createElement('div');
    tooltip.className = 'sc-tooltip';
    tooltip.innerText = tooltipText;
  
    tooltip.style.opacity = '0';
    tooltip.style.pointerEvents = 'none';
  
    el.style.position = 'relative';
    el.appendChild(tooltip);
  
    el.addEventListener('mouseenter', () => {
      console.log('🎯 Hovered on:', el);
      tooltip.style.opacity = '1';
    });
  
    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  }
  