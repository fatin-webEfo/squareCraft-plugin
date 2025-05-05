export function initImageUploadPreview(getSelectedElement) {
  const uploadButton = document.getElementById("imageupload");
  if (!uploadButton) return;

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "file";
  hiddenInput.accept = "image/*";
  hiddenInput.style.display = "none";
  document.body.appendChild(hiddenInput);

  uploadButton.addEventListener("click", (e) => {
    e.stopPropagation();
    hiddenInput.click();
  });

  hiddenInput.addEventListener("click", (e) => e.stopPropagation());

  hiddenInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const selectedElement = getSelectedElement();
    if (!file || !selectedElement) return;

    const container = selectedElement.querySelector(".sqs-block-button-container");
    if (!container) return;

    const button = container.querySelector("a");
    if (!button) return;

    let typeClass = "sqs-button-element--primary";
    if (button.classList.contains("sqs-button-element--secondary")) typeClass = "sqs-button-element--secondary";
    else if (button.classList.contains("sqs-button-element--tertiary")) typeClass = "sqs-button-element--tertiary";

    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = function (e) {
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
        imageNode.setAttributeNS("http://www.w3.org/1999/xlink", "href", base64Image);
        imageNode.setAttribute("width", "20");
        imageNode.setAttribute("height", "20");
        svgElement.appendChild(imageNode);
      }

      if (!svgElement) return;

      svgElement.classList.add("sqscraft-button-icon");
      svgElement.style.height = "1em";
      svgElement.style.width = "auto";
      svgElement.style.maxHeight = "20px";
      svgElement.style.objectFit = "contain";
      svgElement.style.marginRight = "8px";
      svgElement.style.verticalAlign = "middle";

      const allSameTypeButtons = document.querySelectorAll(`a.${typeClass}`);
      allSameTypeButtons.forEach(btn => {
        const oldIcon = btn.querySelector(".sqscraft-button-icon");
        if (oldIcon) oldIcon.remove();

        const clonedIcon = svgElement.cloneNode(true);
        const textDiv = btn.querySelector(".sqs-html");
        if (textDiv) {
          btn.insertBefore(clonedIcon, textDiv);
        } else {
          btn.insertBefore(clonedIcon, btn.firstChild);
        }
      });

      hiddenInput.value = "";
    };

    if (fileType === "image/svg+xml") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
}
