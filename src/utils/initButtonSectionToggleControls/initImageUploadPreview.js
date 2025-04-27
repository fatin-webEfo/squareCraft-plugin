export function initImageUploadPreview() {
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
          uploadButton.innerHTML = "";
  
          const iconImg = document.createElement("img");
          iconImg.src = e.target.result;
          iconImg.loading = "lazy";
          iconImg.style.width = "20px";
          iconImg.style.height = "20px";
          iconImg.style.objectFit = "cover";
          iconImg.style.borderRadius = "50%"; 
  
          const textSpan = document.createElement("span");
          textSpan.textContent = "Upload Icon"; 
          textSpan.style.marginLeft = "8px"; 
          textSpan.style.fontSize = "14px"; 
          textSpan.style.fontFamily = "inherit"; 
  
          uploadButton.style.display = "flex";
          uploadButton.style.alignItems = "center";
          uploadButton.style.justifyContent = "center";
          uploadButton.style.gap = "8px";
  
          uploadButton.appendChild(iconImg);
          uploadButton.appendChild(textSpan);
  
          hiddenInput.value = "";
        };
        reader.readAsDataURL(file);
      }
    });
  }
  