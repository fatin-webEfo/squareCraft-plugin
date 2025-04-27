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
        };
        reader.readAsDataURL(file);
      }
    });
  }
  