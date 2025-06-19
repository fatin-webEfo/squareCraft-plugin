export function initImageUploadPreview(getSelectedElement) {
  const uploadButton = document.getElementById("imageupload");
  if (!uploadButton || uploadButton.dataset.listener === "true") return;

  uploadButton.dataset.listener = "true"; // ✅ prevent double binding

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

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";
    document.body.appendChild(input);

    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const selected = getSelectedElement?.();

      if (!file || !selected) {
        input.remove();
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
        input.remove();
      };
      reader.onerror = () => input.remove();

      reader.readAsDataURL(file);
    });

    input.click();
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
