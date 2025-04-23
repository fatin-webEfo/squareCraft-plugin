export let currentButtonType = "Button";

export function getButtonTypes(buttonElement) {
  const classList = buttonElement.classList;

  if (classList.contains("sqs-button-element--primary")) currentButtonType = "Primary Button";
  else if (classList.contains("sqs-button-element--secondary")) currentButtonType = "Secondary Button";
  else if (classList.contains("sqs-button-element--tertiary")) currentButtonType = "Tertiary Button";
  else currentButtonType = "Unknown Button";

  console.log("👉 Button Type Detected:", currentButtonType);
  return currentButtonType;
}
        