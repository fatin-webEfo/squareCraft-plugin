export function initImageUploadPreview(getSelectedElement) {
  const uploadButton = document.getElementById("imageupload");
  if (!uploadButton) return;

  let isUploading = false;

  function createInput() {
    const input = Object.assign(document.createElement("input"), {
      type: "file",
      accept: "image/*",
      style: "display: none",
    });

    uploadButton.parentNode.insertBefore(input, uploadButton.nextSibling);

    input.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isUploading) {
        e.preventDefault();
        return false;
      }
    });

    input.addEventListener("change", (event) => {
      isUploading = true;
      const file = event.target.files[0];
      const selected = getSelectedElement?.();
      if (!file || !selected) {
        isUploading = false;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const image = document.createElement("img");
        image.src = e.target.result;
        image.width = 20;
        image.height = 20;
        image.classList.add("sqscraft-button-icon");

        applyIconToButtons(image);

        setTimeout(() => {
          input.remove();
          isUploading = false;
          createInput();
        }, 100);
      };

      reader.readAsDataURL(file);
    });

    return input;
  }

  function applyIconToButtons(iconNode) {
    const selected = getSelectedElement?.();
    if (!selected || !iconNode) return;

    const btn = selected.querySelector("a");
    if (!btn) return;

    const typeClass = [...btn.classList].find((c) =>
      c.startsWith("sqs-button-element--")
    );
    if (!typeClass) return;

    document.querySelectorAll(`a.${typeClass}`).forEach((b) => {
      b.querySelector(".sqscraft-button-icon")?.remove();
      b.insertBefore(
        iconNode.cloneNode(true),
        b.querySelector(".sqs-html") || b.firstChild
      );
      b.classList.add("sc-flex", "sc-items-center");
    });
  }

  let input = createInput();

  uploadButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isUploading && input) {
      input.click();
    }
  });

  const allIcons = [
    ...document.querySelectorAll(
      "#buttonIconSolidoptions img, #buttonIconOutlineoptions img"
    ),
  ];

  allIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const imgURL = icon.getAttribute("src");
      const image = document.createElement("img");
      image.src = imgURL;
      image.width = 20;
      image.height = 20;
      image.classList.add("sqscraft-button-icon");

      applyIconToButtons(image);
    });
  });
}
