export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked || !clicked.id.startsWith("hover-")) return;

  const [prefix, rawId, tabType] = clicked.id.split("-");
  const baseId = rawId.replace("Dropdown", ""); // "heading2"
  const styleIds = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];

  if (!styleIds.includes(tabType)) return;

  styleIds.forEach((type) => {
    const tabId = `hover-${rawId}-${type}`;
    const descId = `hover-scDesc-${rawId}-${type}`;

    const tab = document.getElementById(tabId);
    const desc = document.getElementById(descId);

    if (tab) {
      tab.classList.toggle("sc-select-activeTab-border", tabId === clicked.id);
      tab.classList.toggle(
        "sc-select-inActiveTab-border",
        tabId !== clicked.id
      );
    }

    if (desc) {
      desc.classList.toggle("sc-hidden", tabId !== clicked.id);
    }
  });

  const hoverParts = [
    "hover-heading1Part",
    "hover-heading2Part",
    "hover-heading3Part",
    "hover-heading4Part",
    "hover-paragraph1Part",
    "hover-paragraph2Part",
    "hover-paragraph3Part",
  ];

  hoverParts.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("sc-hidden");
  });

  const currentPart = document.getElementById(`hover-${baseId}Part`);
  if (currentPart) currentPart.classList.remove("sc-hidden");
}
