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
  
    uploadButton.addEventListener("click", () => {
      hiddenInput.click();
    });
  
    hiddenInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          let previewImg = document.getElementById("imagePreviewSmall");
          if (!previewImg) {
            previewImg = document.createElement("img");
            previewImg.id = "imagePreviewSmall";
            previewImg.loading = "lazy";
            previewImg.style.width = "30px"; 
            previewImg.style.objectFit = "cover";
            previewImg.style.marginTop = "10px";
  
            uploadButton.parentNode.appendChild(previewImg);
          }
          previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
  