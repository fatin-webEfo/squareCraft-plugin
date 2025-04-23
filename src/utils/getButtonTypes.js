export function getButtonTypes(buttonElement) {
    const classList = buttonElement.classList;
  
    if (classList.contains("sqs-button-element--primary")) return "Primary Button";
    if (classList.contains("sqs-button-element--secondary")) return "Secondary Button";
    if (classList.contains("sqs-button-element--tertiary")) return "Tertiary Button";
    return "Unknown Button";
  }
  