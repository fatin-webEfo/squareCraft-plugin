export function detectBlockElementTypePure(block) {
  let type = null;

  if (block.classList.contains("sqs-block-image")) {
    type = "image";
  } else {
    block
      .querySelectorAll("h1, h2, h3, h4, p, img, a, button")
      .forEach((el) => {
        const tag = el.tagName.toLowerCase();
        const cls = el.classList;

        if (
          !type &&
          (["h1", "h2", "h3", "h4"].includes(tag) ||
            (tag === "p" &&
              !cls.contains("rte-placeholder") &&
              el.innerText.trim()))
        ) {
          type = "text";
        }

        if (
          !type &&
          tag === "img" &&
          el.closest(".sqs-image-content") &&
          el.closest(".fluid-image-editor-wrapper")
        ) {
          type = "image";
        }

        if (!type && (tag === "a" || tag === "button")) {
          type = "button";
        }
      });
  }

  return type || "unknown";
}
