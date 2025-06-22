export function detectBlockElementTypePure(block) {
  if (!block) return "unknown";

  const nestedTags = Array.from(block.querySelectorAll("*"));

  let type = "unknown";

  for (const el of nestedTags) {
    const tagName = el.tagName.toLowerCase();
    const classList = el.classList;

    if (tagName === "h1") return "text-h1";
    if (tagName === "h2") return "text-h2";
    if (tagName === "h3") return "text-h3";
    if (tagName === "h4") return "text-h4";

    if (tagName === "p") {
      if (classList.contains("sqsrte-large")) return "text-p1";
      if (classList.contains("sqsrte-small")) return "text-p3";
      return "text-p2";
    }

    if (tagName === "img") return "image";
    if (
      tagName === "a" &&
      (el.classList.contains("sqs-button-element--primary") ||
        el.classList.contains("sqs-button-element--secondary") ||
        el.classList.contains("sqs-button-element--tertiary"))
    ) {
      return "button";
    }

    if (tagName === "form") return "form";
  }

  return type;
}
