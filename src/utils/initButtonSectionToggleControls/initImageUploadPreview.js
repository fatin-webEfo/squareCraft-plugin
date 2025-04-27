hiddenInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const selectedElement = getSelectedElement();
  
    if (file && selectedElement) {
      const fileType = file.type;
  
      if (fileType !== "image/svg+xml") {
        alert("❌ Please upload an SVG file. Only SVG icons can be styled later.");
        hiddenInput.value = "";
        return;
      }
  
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
  
        let iconImg = buttonLink.querySelector(".sqscraft-button-icon");
        if (iconImg) {
          iconImg.remove();
        }
  
        iconImg = document.createElement("img");
        iconImg.className = "sqscraft-button-icon";
        iconImg.src = e.target.result;
  
        iconImg.style.height = "1em";
        iconImg.style.width = "auto";
        iconImg.style.maxHeight = "20px";
        iconImg.style.objectFit = "contain";
        iconImg.style.marginRight = "8px";
        iconImg.style.verticalAlign = "middle";
  
        const textDiv = buttonLink.querySelector(".sqs-html");
        if (textDiv) {
          buttonLink.insertBefore(iconImg, textDiv);
        } else {
          buttonLink.insertBefore(iconImg, buttonLink.firstChild);
        }
  
        hiddenInput.value = "";
      };
      reader.readAsDataURL(file);
    }
  });
  