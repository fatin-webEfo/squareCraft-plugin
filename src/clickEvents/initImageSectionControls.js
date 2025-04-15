export function initImageMaskControls(selectedElementRef) {
    const thumbs = document.querySelectorAll(".sc-image-mask-thumb");
  
    thumbs.forEach(thumb => {
      thumb.addEventListener("click", () => {
        const maskUrl = thumb.dataset.mask;
        const element = selectedElementRef(); 
  
        if (element && maskUrl) {
          element.style.webkitMaskImage = `url("${maskUrl}")`;
          element.style.maskImage = `url("${maskUrl}")`;
          element.style.maskRepeat = "no-repeat";
          element.style.maskSize = "cover";
          element.style.webkitMaskRepeat = "no-repeat";
          element.style.webkitMaskSize = "cover";
        }
      });
    });
  }
  