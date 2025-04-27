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
  
          let iconImg = buttonLink.querySelector("img.sqscraft-button-icon");
          if (!iconImg) {
            iconImg = document.createElement("img");
            iconImg.className = "sqscraft-button-icon";
            iconImg.style.width = "18px";
            iconImg.style.objectFit = "cover";
            iconImg.style.borderRadius = "50%";
            iconImg.style.marginRight = "8px";
            const textDiv = buttonLink.querySelector(".sqs-html");
            if (textDiv) {
              buttonLink.insertBefore(iconImg, textDiv);
            } else {
              buttonLink.insertBefore(iconImg, buttonLink.firstChild);
            }
          }
  
          iconImg.src = e.target.result;
  
          hiddenInput.value = "";
        };
        reader.readAsDataURL(file);
      }
    });
  }
  