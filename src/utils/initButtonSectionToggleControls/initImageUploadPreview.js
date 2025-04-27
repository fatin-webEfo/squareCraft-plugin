export function initImageUploadPreview(getSelectedElement) {
    const uploadButton = document.getElementById("imageupload");
  
    if (!uploadButton) {
      console.error("❌ imageupload button not found!");
      return;
    }
  
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "file";
    hiddenInput.accept = "image/*";
    hiddenInput.style.display = "none";
  
    document.body.appendChild(hiddenInput);
  
    uploadButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const selectedElement = getSelectedElement();
      console.log("✅ Selected Element on click:", selectedElement);
      hiddenInput.click();
    });
  
    hiddenInput.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  
    hiddenInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const selectedElement = getSelectedElement();
  
      if (file && selectedElement) {
        const fileType = file.type;
  
        const reader = new FileReader();
        reader.onload = function (e) {
          const container = selectedElement.querySelector(".sqs-block-button-container");
          if (!container) {
            console.error("❌ sqs-block-button-container not found inside selected element!");
            return;
          }
  
          const buttonLink = container.querySelector("a");
          if (!buttonLink) {
            console.error("❌ Button link <a> not found inside container!");
            return;
          }
  
          const oldIcon = buttonLink.querySelector(".sqscraft-button-icon");
          if (oldIcon) {
            oldIcon.remove();
          }
  
          let svgElement;
  
          if (fileType === "image/svg+xml") {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(e.target.result, "image/svg+xml");
            svgElement = svgDoc.querySelector("svg");
          } else {
            const base64Image = e.target.result;
            svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const imageNode = document.createElementNS("http://www.w3.org/2000/svg", "image");
            svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgElement.setAttribute("width", "20");
            svgElement.setAttribute("height", "20");
            svgElement.setAttribute("viewBox", "0 0 20 20");
            imageNode.setAttributeNS(null, "href", base64Image);
            imageNode.setAttribute("width", "20");
            imageNode.setAttribute("height", "20");
            svgElement.appendChild(imageNode);
          }
  
          if (!svgElement) {
            console.error("❌ Failed to create SVG element.");
            return;
          }
  
          svgElement.classList.add("sqscraft-button-icon");
          svgElement.style.height = "1em";
          svgElement.style.width = "auto";
          svgElement.style.maxHeight = "20px";
          svgElement.style.objectFit = "contain";
          svgElement.style.marginRight = "8px";
          svgElement.style.verticalAlign = "middle";
  
          const textDiv = buttonLink.querySelector(".sqs-html");
          if (textDiv) {
            buttonLink.insertBefore(svgElement, textDiv);
          } else {
            buttonLink.insertBefore(svgElement, buttonLink.firstChild);
          }
  
          console.log("✅ Injected SVG Code:");
          console.log(svgElement.outerHTML);
  
          hiddenInput.value = "";
        };
  
        if (fileType === "image/svg+xml") {
          reader.readAsText(file);
        } else {
          reader.readAsDataURL(file);
        }
      }
    });
  }
  