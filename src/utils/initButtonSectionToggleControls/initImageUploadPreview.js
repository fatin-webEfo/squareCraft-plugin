export function initImageUploadPreview(selectedElement) {
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
      hiddenInput.click();
    });
  
    hiddenInput.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  
    hiddenInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (!selectedElement) {
            console.error("❌ No selected button element found!");
            return;
          }
  
          const buttonTextWrapper = selectedElement.querySelector(".sqs-html span");
          if (!buttonTextWrapper) {
            console.error("❌ No text wrapper found inside the button!");
            return;
          }
  
          let existingIcon = selectedElement.querySelector("img.sqscraft-button-icon");
          if (existingIcon) {
            existingIcon.remove();
          }
  
          const iconImg = document.createElement("img");
          iconImg.src = e.target.result;
          iconImg.className = "sqscraft-button-icon";
          iconImg.loading = "lazy";
          iconImg.style.width = "18px";
          iconImg.style.objectFit = "cover";
          iconImg.style.borderRadius = "50%";
          iconImg.style.marginRight = "8px";
          iconImg.style.verticalAlign = "middle";
  
          const parentDiv = buttonTextWrapper.parentNode;
          parentDiv.insertBefore(iconImg, buttonTextWrapper);
  
          parentDiv.style.display = "flex";
          parentDiv.style.alignItems = "center";
          parentDiv.style.justifyContent = "center";
          parentDiv.style.gap = "6px";
  
          hiddenInput.value = "";
        };
        reader.readAsDataURL(file);
      }
    });
  }
  