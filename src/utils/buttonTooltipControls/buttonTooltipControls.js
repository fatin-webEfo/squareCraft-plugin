export function initSimpleTooltipHover() {
    document.querySelectorAll('[id="imageupload"]').forEach(el => {
      const tooltip = el.querySelector('.sc-tooltip');
      if (!tooltip) return;
  
      el.addEventListener('mouseenter', () => {
        tooltip.classList.remove('sc-hidden');
      });
  
      el.addEventListener('mouseleave', () => {
        tooltip.classList.add('sc-hidden');
      });
    });
  }
  