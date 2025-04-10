export function handleFontWeightDropdownClick(event) {
    const dropdownTrigger = event.target.closest("#font-weight-dropdown");
    const dropdownList = document.getElementById("font-weight-dropdown-list");
  
    if (!dropdownList) return;
  
    if (dropdownTrigger) {
      console.log("✅ Clicked inside dropdown trigger");
  
      if (dropdownList.classList.contains("sc-hidden")) {
        dropdownList.classList.remove("sc-hidden");
        console.log("🔽 Show dropdown");
      } else {
        dropdownList.classList.add("sc-hidden");
        console.log("🔼 Hide dropdown");
      }
    }
    else if (!dropdownList.contains(event.target)) {
      dropdownList.classList.add("sc-hidden");
      console.log("❌ Clicked outside, hide dropdown");
    }
  }
  