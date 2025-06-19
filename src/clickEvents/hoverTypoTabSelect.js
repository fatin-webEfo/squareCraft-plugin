export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked) return;

  const clickedId = clicked.id;
  const prefix = clickedId.replace(/-(all|bold|italic|link)Select$/, "");
  const tabSuffixes = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];

  tabSuffixes.forEach((suffix) => {
    const tabId = `${prefix}-${suffix}`;
    const tabEl = document.getElementById(tabId);
    const descEl = document.getElementById(`hover-scDesc-${tabId}`);

    if (tabEl) {
      tabEl.classList.remove("sc-select-activeTab-border");
      tabEl.classList.add("sc-select-inActiveTab-border");
    }

    if (descEl) {
      descEl.classList.add("sc-hidden");
    }
  });

  clicked.classList.remove("sc-select-inActiveTab-border");
  clicked.classList.add("sc-select-activeTab-border");

  const activeDesc = document.getElementById(`hover-scDesc-${clickedId}`);
  if (activeDesc) {
    activeDesc.classList.remove("sc-hidden");
  }
}
