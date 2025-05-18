export function createTooltip(el) {
    const tooltipText = el.getAttribute('data-sc-tooltip');
    if (!tooltipText) return;
    el.removeAttribute('title');
    const tooltip = document.createElement('div');
    tooltip.className = 'sc-tooltip';
    tooltip.innerText = tooltipText;
  
    Object.assign(tooltip.style, {
      position: 'absolute',
      top: '-30px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#000',
      color: 'white',
      fontSize: '10px',
      padding: '4px 8px',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
      zIndex: '999999',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.2s ease',
      border: '0.5px solid #f0640834'
    });
  
    document.body.appendChild(tooltip);
  
    el.addEventListener('mouseenter', () => {
      const rect = el.getBoundingClientRect();
      tooltip.style.top = `${rect.top - 30}px`;
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.opacity = '1';
      tooltip.style.display = 'block';
    });
  
    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.display = 'none';
    });
  }
  