export function detectBlockElementTypes(block) {
  if (!block) return "Unknown Button";

  let foundType = null;
  let currentButtonType = "Unknown Button";

  const btn = block.querySelector(
    "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, " +
      "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
  );
  if (btn) {
    foundType = "button";
    if (btn.classList.contains("sqs-button-element--primary"))
      currentButtonType = "Primary Button";
    else if (btn.classList.contains("sqs-button-element--secondary"))
      currentButtonType = "Secondary Button";
    else if (btn.classList.contains("sqs-button-element--tertiary"))
      currentButtonType = "Tertiary Button";
    else currentButtonType = "Button";
  }

  if (!foundType) {
    const isImageBlock = block.classList.contains("sqs-block-image");
    const img = block.querySelector(
      ":scope .sqs-image-content img, :scope .fluid-image-editor-wrapper img, :scope img"
    );
    if (isImageBlock || img) foundType = "image";
  }

  if (!foundType) {
    const textEl = block.querySelector(
      ":scope h1, :scope h2, :scope h3, :scope h4, :scope p:not(.rte-placeholder)"
    );
    if (textEl && textEl.textContent.trim()) foundType = "text";
  }

  const buttonTypeEl = document.getElementById("buttonTypeDisplay");
  if (buttonTypeEl) buttonTypeEl.textContent = currentButtonType;

  const last = document.body.dataset.scLastPanelType || "";
  if (foundType !== last) {
    const hide = (id) =>
      document.getElementById(id)?.classList.add("sc-hidden");
    const show = (id) =>
      document.getElementById(id)?.classList.remove("sc-hidden");

    const allSections = [
      "typoSection",
      "imageSection",
      "buttonSection",
      "advancedTypoSection",
      "advancedImageSection",
      "advancedButtonSection",
      "presetTypoSection",
      "presetImageSection",
      "presetButtonSection",
    ];
    allSections.forEach(hide);

    if (foundType === "text") {
      show("typoSection");
      show("advancedTypoSection");
      show("presetTypoSection");
    } else if (foundType === "image") {
      show("imageSection");
      show("advancedImageSection");
      show("presetImageSection");
    } else if (foundType === "button") {
      show("buttonSection");
      show("advancedButtonSection");
      show("presetButtonSection");
    }

    document.body.dataset.scLastPanelType = foundType || "";
  }

  return currentButtonType;
}
