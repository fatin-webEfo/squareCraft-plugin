export function hoverTypoTabSelect(event) {
  const clicked = event.target.closest("div[id$='Select']");
  if (!clicked) return;

  const parentId = clicked.parentElement?.parentElement?.parentElement?.id;
  const clickedTabId = clicked.id;

  if (!parentId || !clickedTabId) return;

  const tabIds = [
    `${parentId}-allSelect`,
    `${parentId}-boldSelect`,
    `${parentId}-italicSelect`,
    `${parentId}-linkSelect`,
  ];

  tabIds.forEach((id) => {
    const tabEl = document.getElementById(id);
    if (tabEl) {
      tabEl.classList.remove("sc-select-activeTab-border");
      tabEl.classList.add("sc-select-inActiveTab-border");
    }

    const desc = document.getElementById(`hover-scDesc-${id}`);
    if (desc) desc.classList.add("sc-hidden");
  });

  clicked.classList.remove("sc-select-inActiveTab-border");
  clicked.classList.add("sc-select-activeTab-border");

  const activeDesc = document.getElementById(`hover-scDesc-${clickedTabId}`);
  if (activeDesc) activeDesc.classList.remove("sc-hidden");
}
