export function typoTabSelect(event) {
    const clicked = event.target.closest("div[id$='Select']");
    if (!clicked) return;
  
    const dropdown = clicked.closest("[id$='Dropdown']");
    if (!dropdown) {
      console.warn("⚠️ Dropdown container not found for:", clicked.id);
      return;
    }
  
    console.log("📌 Clicked tab:", clicked.id);
  
    const baseId = clicked.id.split("-")[0];
    const styleIds = ["allSelect", "boldSelect", "italicSelect", "linkSelect"];
  
    styleIds.forEach((suffix) => {
      const fullId = `${baseId}-${suffix}`;
      const tab = dropdown.querySelector(`#${fullId}`);
      const desc = dropdown.querySelector(`#scDesc-${fullId}`);
  
      if (tab) {
        if (tab === clicked) {
          tab.classList.add("sc-select-activeTab-border");
          tab.classList.remove("sc-select-inActiveTab-border");
          console.log(`✅ Activated tab: ${fullId}`);
        } else {
          tab.classList.remove("sc-select-activeTab-border");
          tab.classList.add("sc-select-inActiveTab-border");
          console.log(`🧹 Deactivated tab: ${fullId}`);
        }
      } else {
        console.error(`❌ Tab not found: #${fullId}`);
      }
  
      if (desc) {
        if (clicked.id === fullId) {
          desc.classList.remove("sc-hidden");
          console.log(`📖 Showing description: scDesc-${fullId}`);
        } else {
          desc.classList.add("sc-hidden");
          console.log(`🙈 Hiding description: scDesc-${fullId}`);
        }
      } else {
        console.error(`❌ Description not found: #scDesc-${fullId}`);
      }
    });
  }
  