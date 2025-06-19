export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked) return;

  const clickedId = clicked.id; // e.g. heading1Dropdown-boldSelect
  const parentId = clicked.closest("div[id]").id; // e.g. heading1Dropdown

  const tabIds = [
    `${parentId}-allSelect`,
    `${parentId}-boldSelect`,
    `${parentId}-italicSelect`,
    `${parentId}-linkSelect`,
  ];

  tabIds.forEach((tabId) => {
    const tabButton = document.getElementById(tabId);
    const desc = document.getElementById(`hover-scDesc-${tabId}`);

    if (tabButton) {
      tabButton.classList.remove("sc-select-activeTab-border");
      tabButton.classList.add("sc-select-inActiveTab-border");
    }

    if (desc) {
      desc.classList.add("sc-hidden");
    }
  });

  clicked.classList.remove("sc-select-inActiveTab-border");
  clicked.classList.add("sc-select-activeTab-border");

  const activeDesc = document.getElementById(`hover-scDesc-${clickedId}`);
  if (activeDesc) {
    activeDesc.classList.remove("sc-hidden");
  }
}
