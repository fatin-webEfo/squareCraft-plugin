export function initButtonAdvanceStructureStyles(getSelectedElement) {
  const block = getSelectedElement();
  if (!block) return;

  const blockId = block.id;
  const button = block.querySelector("a.sqs-button-element--primary");
  if (!button) return;

  const styleId = `sc-structure-style-${blockId}`;
  let styleTag = document.getElementById(styleId);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  const updateStyles = (type, value) => {
    const existingStyles = styleTag.innerHTML.split(";");
    const cleanStyles = existingStyles.filter((line) => !line.includes(type));
    cleanStyles.push(`${type}:${value}px`);

    styleTag.innerHTML = `
        #${blockId} a.sqs-button-element--primary {
          ${cleanStyles.join(";")};
        }
      `;
  };

  const syncMargin = (dir, px) => {
    updateStyles(`margin-${dir}`, px);
  };

  const syncPadding = (dir, px) => {
    updateStyles(`padding-${dir}`, px);
  };

  return {
    syncMargin,
    syncPadding,
  };
}
