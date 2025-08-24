export async function handleBlockClick(event, context) {
  const {
    getTextType,
    getHoverTextType,
    setSelectedElement,
    selectedElement,
    setLastClickedBlockId,
    setLastClickedElement,
    setLastAppliedAlignment,
    setLastActiveAlignmentElement,
  } = context;

  const block = event.target.closest('[id^="block-"]');
  if (!block) return;

  if (selectedElement && selectedElement !== block) {
    selectedElement.style.outline = "";
    selectedElement.classList.remove("sc-selected");
    selectedElement.querySelectorAll("h1,h2,h3,h4,p").forEach((el) => {
      el.style.border = "";
      el.style.borderRadius = "";
      el.style.padding = "";
    });
  }

  setSelectedElement(block);
  block.classList.add("sc-selected");

  setLastClickedBlockId(block.id);
  setLastClickedElement(block);

  const fastType = (() => {
    if (
      block.querySelector(
        "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
      )
    )
      return "button";
    if (
      block.classList.contains("sqs-block-image") ||
      block.querySelector(
        ".sqs-image-content .fluid-image-editor-wrapper img, .fluid-image-editor-wrapper img"
      )
    )
      return "image";
    if (block.querySelector("h1,h2,h3,h4,p")) return "text";
    return "text";
  })();

  await waitForIds([
    "typoSection",
    "imageSection",
    "buttonSection",
    "advancedTypoSection",
    "advancedImageSection",
    "advancedButtonSection",
    "presetTypoSection",
    "presetImageSection",
    "presetButtonSection",
  ]);

  const hide = (id) => document.getElementById(id)?.classList.add("sc-hidden");
  const show = (id) =>
    document.getElementById(id)?.classList.remove("sc-hidden");

  [
    "typoSection",
    "imageSection",
    "buttonSection",
    "advancedTypoSection",
    "advancedImageSection",
    "advancedButtonSection",
    "presetTypoSection",
    "presetImageSection",
    "presetButtonSection",
  ].forEach(hide);

  if (fastType === "text") {
    show("typoSection");
    show("advancedTypoSection");
    show("presetTypoSection");
  } else if (fastType === "image") {
    show("imageSection");
    show("advancedImageSection");
    show("presetImageSection");
  } else {
    show("buttonSection");
    show("advancedButtonSection");
    show("presetButtonSection");
  }

  if (typeof window.syncButtonStylesFromElement === "function")
    window.syncButtonStylesFromElement(block);
  if (typeof window.syncHoverButtonStylesFromElement === "function")
    window.syncHoverButtonStylesFromElement(block);
  if (typeof window.updateActiveButtonBars === "function")
    window.updateActiveButtonBars();

  let appliedTextAlign = window.getComputedStyle(block).textAlign;
  if (!appliedTextAlign || appliedTextAlign === "start") {
    const nested = block.querySelector("h1,h2,h3,h4,p");
    if (nested) appliedTextAlign = window.getComputedStyle(nested).textAlign;
  }
  if (appliedTextAlign) {
    setLastAppliedAlignment(appliedTextAlign);
    const map = {
      left: "scTextAlignLeft",
      center: "scTextAlignCenter",
      right: "scTextAlignRight",
      justify: "scTextAlignJustify",
    };
    const activeIcon = document.getElementById(map[appliedTextAlign]);
    if (activeIcon) {
      activeIcon.classList.add("sc-activeTab-border");
      activeIcon.classList.remove("sc-inActiveTab-border");
      setLastActiveAlignmentElement(activeIcon);
    }
  }

  if (fastType !== "text") return;

  const allParts = [
    "heading1Part",
    "heading2Part",
    "heading3Part",
    "heading4Part",
    "paragraph1Part",
    "paragraph2Part",
    "paragraph3Part",
  ];
  const allTabs = [
    "heading1",
    "heading2",
    "heading3",
    "heading4",
    "paragraph1",
    "paragraph2",
    "paragraph3",
  ];
  const visibleParts = new Set();
  const innerTextElements = block.querySelectorAll("h1,h2,h3,h4,p");

  innerTextElements.forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const r = getTextType(tag, el);
    if (r) {
      visibleParts.add(`${r.type}Part`);
      el.style.border = `1px solid ${r.borderColor}`;
      el.style.borderRadius = "4px";
      el.style.padding = "2px 4px";
    }
  });

  await waitForPartsAndTabsReady(allParts, allTabs);

  allParts.forEach((id) => {
    const part = document.getElementById(id);
    if (part) part.classList.toggle("sc-hidden", !visibleParts.has(id));
  });

  visibleParts.forEach((partId) => {
    const typeId = partId.replace("Part", "");
    const tab = document.getElementById(typeId);
    if (!tab) return;

    tab.onmouseenter = () => {
      const b = document.getElementById(block.id);
      const t = typeId.startsWith("heading")
        ? `h${typeId.replace("heading", "")}`
        : "p";
      b.querySelectorAll(t).forEach((el) => {
        const r = getTextType(t, el);
        if (r?.type === typeId) el.style.outline = `2px solid ${r.borderColor}`;
      });
    };

    tab.onmouseleave = () => {
      const b = document.getElementById(block.id);
      b.querySelectorAll("h1,h2,h3,h4,p").forEach(
        (el) => (el.style.outline = "")
      );
    };
  });

  const hoverParts = allParts.map((id) => `hover-${id}`);
  const hoverTabs = allTabs.map((id) => `hover-${id}`);
  const visibleHoverParts = new Set();

  innerTextElements.forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const r = getHoverTextType(tag, el);
    if (r) {
      visibleHoverParts.add(`hover-${r.type}Part`);
      el.style.border = `1px dashed ${r.borderColor}`;
      el.style.borderRadius = "4px";
      el.style.padding = "2px 4px";
    }
  });

  await waitForPartsAndTabsReady(hoverParts, hoverTabs);

  hoverParts.forEach((id) => {
    const part = document.getElementById(id);
    if (part) part.classList.toggle("sc-hidden", !visibleHoverParts.has(id));
  });

  visibleHoverParts.forEach((partId) => {
    const typeId = partId.replace("hover-", "").replace("Part", "");
    const tab = document.getElementById(`hover-${typeId}`);
    if (!tab) return;

    tab.onmouseenter = () => {
      const b = document.getElementById(block.id);
      const t = typeId.startsWith("heading")
        ? `h${typeId.replace("heading", "")}`
        : "p";
      b.querySelectorAll(t).forEach((el) => {
        const r = getHoverTextType(t, el);
        if (r?.type === typeId)
          el.style.outline = `2px dashed ${r.borderColor}`;
      });
    };

    tab.onmouseleave = () => {
      const b = document.getElementById(block.id);
      b.querySelectorAll("h1,h2,h3,h4,p").forEach(
        (el) => (el.style.outline = "")
      );
    };
  });
}

async function waitForIds(ids, tries = 20, delay = 50) {
  for (let i = 0; i < tries; i++) {
    if (ids.every((id) => document.getElementById(id))) return;
    await new Promise((r) => setTimeout(r, delay));
  }
}

async function waitForPartsAndTabsReady(allParts, allTabs) {
  for (let attempt = 0; attempt < 10; attempt++) {
    const partsReady = allParts.every((id) => document.getElementById(id));
    const tabsReady = allTabs.every((id) => document.getElementById(id));
    if (partsReady && tabsReady) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
