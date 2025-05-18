export function createTooltip(el) {
    const tooltipText = el.getAttribute('data-sc-tooltip');
    if (!tooltipText) return;
  
    const tooltip = document.createElement('div');
    tooltip.className = 'sc-tooltip';
    tooltip.innerText = tooltipText;
  
    el.style.position = 'relative';
    el.appendChild(tooltip);
    el.onmouseenter = () => console.log('Hovered via onmouseenter');

  
    tooltip.style.display = 'block';
    tooltip.style.background = 'red';
    tooltip.style.color = 'white';
  
    el.addEventListener('mouseenter', () => {
      console.log('🎯 Hovered on tooltip element:', el);
    });
  }
  