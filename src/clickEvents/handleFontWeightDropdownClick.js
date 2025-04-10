export function handleFontWeightDropdownClick(event) {
    const dropdownTrigger = event.target.closest("#font-weight-dropdown");
    const dropdownList = document.getElementById("font-weight-dropdown-list");
  
    if (!dropdownList) return;
  
    if (dropdownTrigger) {
      if (dropdownList.classList.contains("sc-hidden")) {
        dropdownList.classList.remove("sc-hidden");
        console.log("✅ sc-hidden removed: dropdown shown");
      } else {
        dropdownList.classList.add("sc-hidden");
        console.log("✅ sc-hidden added: dropdown hidden");
      }
    }
  }
  