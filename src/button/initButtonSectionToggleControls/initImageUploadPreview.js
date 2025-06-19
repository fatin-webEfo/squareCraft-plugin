export function initImageUploadPreview(getSelectedElement) {
  const uploadButton = document.getElementById("imageupload");
  if (!uploadButton) return;

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  let isBusy = false;

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

  uploadButton.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isBusy) return;

    isBusy = true;
    fileInput.value = ""; // allow same file reselect
    setTimeout(() => {
      fileInput.click();
    }, 50); // delay prevents instant double trigger
  });

  fileInput.addEventListener("click", (e) => e.stopPropagation());

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const selected = getSelectedElement?.();

    if (!file || !selected) {
      isBusy = false;
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
      isBusy = false;
    };
    reader.onerror = () => {
      isBusy = false;
    };

    reader.readAsDataURL(file);
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
