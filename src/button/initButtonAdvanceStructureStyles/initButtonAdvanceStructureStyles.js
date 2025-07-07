export function initButtonAdvanceStructureStyles(getSelectedElement) {
  const marginMap = {
    top: "button-structure-margin-top-count",
    bottom: "button-structure-margin-bottom-count",
    left: "button-structure-margin-left-count",
    right: "button-structure-margin-right-count",
  };

  const paddingMap = {
    top: "button-structure-padding-top-count",
    bottom: "button-structure-padding-bottom-count",
    left: "button-structure-padding-left-count",
    right: "button-structure-padding-right-count",
  };

  const updateStyles = () => {
    const block = getSelectedElement();
    if (!block) return;

    const blockId = block.id;
    const blockButtons = block.querySelectorAll(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
    );

    const buttonSelector = Array.from(blockButtons)
      .map((btn) => {
        if (
          btn.classList.contains("sqs-button-element--primary") ||
          btn.classList.contains("sqs-button-element--secondary") ||
          btn.classList.contains("sqs-button-element--tertiary")
        ) {
          return `#${blockId} a.${btn.classList[1]}`;
        }
        return null;
      })
      .filter(Boolean)
      .join(", ");
      
    const styleId = `sc-structure-style-${blockId}`;

    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const cssParts = [];

    Object.entries(marginMap).forEach(([side, id]) => {
      const el = document.getElementById(id);
      if (el) {
        const value = parseInt(el.textContent.replace("px", "").trim()) || 0;
        cssParts.push(`margin-${side}:${value}px`);
      }
    });

    Object.entries(paddingMap).forEach(([side, id]) => {
      const el = document.getElementById(id);
      if (el) {
        const value = parseInt(el.textContent.replace("px", "").trim()) || 0;
        cssParts.push(`padding-${side}:${value}px`);
      }
    });

    const cssString = `${buttonSelector} { ${cssParts.join("; ")} }`;
    styleTag.innerHTML = cssString;

    console.log("🔄 Real-time Button Styles Applied:\n", cssString);
  };

  const observer = new MutationObserver(updateStyles);

  Object.values({ ...marginMap, ...paddingMap }).forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      observer.observe(el, {
        characterData: true,
        subtree: true,
        childList: true,
      });
    }
  });

  updateStyles(); // initial run
}
