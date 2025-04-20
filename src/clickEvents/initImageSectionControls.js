export function initImageMaskControls(selectedElementRef) {
  const thumbs = document.querySelectorAll(".sc-image-mask-thumb");

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const maskUrl = thumb.dataset.mask;
      let element = selectedElementRef();

      if (!element || !maskUrl) return;

      if (element.id && element.id.startsWith("block-")) {
        let nestedImg = element.querySelector("img");
        if (nestedImg) {
          const visibleImg = Array.from(element.querySelectorAll("img")).find(img => {
            const style = window.getComputedStyle(img);
            return style.visibility !== "hidden" && style.display !== "none" && img.offsetWidth > 0 && img.offsetHeight > 0;
          });
          if (visibleImg) nestedImg = visibleImg;
          element = nestedImg;
        }
      }

      element.style.webkitMaskImage = `url("${maskUrl}")`;
      element.style.maskImage = `url("${maskUrl}")`;
      element.style.maskRepeat = "no-repeat";
      element.style.maskSize = "contain";
      element.style.maskPosition = "center";
      element.style.webkitMaskRepeat = "no-repeat";
      element.style.webkitMaskSize = "contain";
      element.style.webkitMaskPosition = "center";
      element.style.transition = "mask-image 0.3s ease, -webkit-mask-image 0.3s ease";
    });
  });
}
