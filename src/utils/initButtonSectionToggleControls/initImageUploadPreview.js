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

  hiddenInput.addEventListener("click", (e) => e.stopPropagation());

  hiddenInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const selectedElement = getSelectedElement();
    if (!file || !selectedElement) return;

    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = function (e) {
      let svgElement;

      if (fileType === "image/svg+xml") {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(e.target.result, "image/svg+xml");
        svgElement = svgDoc.querySelector("svg");
        if (svgElement) {
          console.log("✅ SVG uploaded!");
        }
      } else {
        const base64Image = e.target.result;
        svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const imageNode = document.createElementNS("http://www.w3.org/2000/svg", "image");
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgElement.setAttribute("width", "20");
        svgElement.setAttribute("height", "20");
        svgElement.setAttribute("viewBox", "0 0 20 20");
        imageNode.setAttributeNS("http://www.w3.org/1999/xlink", "href", base64Image);
        imageNode.setAttribute("width", "20");
        imageNode.setAttribute("height", "20");
        svgElement.appendChild(imageNode);
        console.log("✅ Non-SVG image wrapped into SVG container.");
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

      const buttons = selectedElement.querySelectorAll("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");

      buttons.forEach(buttonLink => {
        const oldIcon = buttonLink.querySelector(".sqscraft-button-icon");
        if (oldIcon) oldIcon.remove();

        const clonedIcon = svgElement.cloneNode(true);
        const textDiv = buttonLink.querySelector(".sqs-html");

        if (textDiv) {
          buttonLink.insertBefore(clonedIcon, textDiv);
        } else {
          buttonLink.insertBefore(clonedIcon, buttonLink.firstChild);
        }
      });

      console.log("📄 Injected SVG Code:");
      console.log(svgElement.outerHTML);

      hiddenInput.value = "";
    };

    if (fileType === "image/svg+xml") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
}
