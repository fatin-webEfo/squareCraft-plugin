export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked) return;

  const clickedId = clicked.id; 

  const prefix = clickedId.replace(/-(all|bold|italic|link)Select$/, "");

  const tabSuffixes = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];

  tabSuffixes.forEach((suffix) => {
    const fullTabId = `${prefix}-${suffix}`;
    const tab = document.getElementById(fullTabId);
    const desc = document.getElementById(`hover-scDesc-${fullTabId}`);

    if (tab) {
      tab.classList.remove("sc-select-activeTab-border");
      tab.classList.add("sc-select-inActiveTab-border");
    }

    if (desc) {
      desc.classList.add("sc-hidden");
    }
  });

  // Apply to clicked
  clicked.classList.remove("sc-select-inActiveTab-border");
  clicked.classList.add("sc-select-activeTab-border");

  const activeDesc = document.getElementById(`hover-scDesc-${clickedId}`);
  if (activeDesc) {
    activeDesc.classList.remove("sc-hidden");
  }
}
