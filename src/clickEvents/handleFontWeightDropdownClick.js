export function typoTabSelect(event) {
    const tab = event.target.closest('[id$="Select"]');
    if (!tab) return;
  
    const dropdownId = tab.id.split('-')[0];
    const allTabs = document.querySelectorAll(`#${dropdownId}-allSelect, #${dropdownId}-boldSelect, #${dropdownId}-italicSelect, #${dropdownId}-linkSelect`);
    const allDescs = document.querySelectorAll(`#scDesc-${dropdownId}-allSelect, #scDesc-${dropdownId}-boldSelect, #scDesc-${dropdownId}-italicSelect, #scDesc-${dropdownId}-linkSelect`);
  
    allTabs.forEach(t => {
      t.classList.remove("sc-select-activeTab-border");
      t.classList.add("sc-select-inActiveTab-border");
    });
  
    allDescs.forEach(d => d.classList.add("sc-hidden"));
  
    tab.classList.add("sc-select-activeTab-border");
    tab.classList.remove("sc-select-inActiveTab-border");
  
    const activeDesc = document.getElementById(`scDesc-${tab.id}`);
    if (activeDesc) activeDesc.classList.remove("sc-hidden");
  }
  