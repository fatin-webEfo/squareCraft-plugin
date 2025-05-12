export function initImageUploadPreview(getSelectedElement) {
  const uploadButton = document.getElementById("imageupload");
  if (!uploadButton) return;

  const input = Object.assign(document.createElement("input"), {
    type: "file",
    accept: "image/*",
    style: "display: none"
  });
  document.body.appendChild(input);

  uploadButton.addEventListener("click", e => {
    e.stopPropagation();
    input.click();
  });

  input.addEventListener("click", e => e.stopPropagation());

  input.addEventListener("change", event => {
    const file = event.target.files[0];
    const selected = getSelectedElement?.();
    if (!file || !selected) return;

    const btn = selected.querySelector("a");
    if (!btn) return;

    const typeClass = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    if (!typeClass) return;

    const reader = new FileReader();
    reader.onload = e => {
      let svg = file.type === "image/svg+xml"
        ? new DOMParser().parseFromString(e.target.result, "image/svg+xml").querySelector("svg")
        : (() => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
            svg.setAttribute("viewBox", "0 0 20 20");
            img.setAttributeNS("http://www.w3.org/1999/xlink", "href", e.target.result);
            img.setAttribute("width", "20");
            img.setAttribute("height", "20");
            svg.appendChild(img);
            return svg;
          })();

      if (!svg) return;
      svg.classList.add("sqscraft-button-icon");

      document.querySelectorAll(`a.${typeClass}`).forEach(btn => {
        btn.querySelector(".sqscraft-button-icon")?.remove();
        btn.insertBefore(svg.cloneNode(true), btn.querySelector(".sqs-html") || btn.firstChild);

        btn.classList.add("sc-flex", "sc-items-center");
      });

      input.value = "";
    };

    file.type === "image/svg+xml"
      ? reader.readAsText(file)
      : reader.readAsDataURL(file);
  });
}
