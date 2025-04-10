export function handleFontWeightDropdownClick(event) {
    const dropdown = document.getElementById("font-weight-dropdown");
    const list = document.getElementById("font-weight-dropdown-list");
  
    if (!dropdown || !list) return;
  
    const clickedInsideTrigger = dropdown.contains(event.target);
    const clickedInsideList = list.contains(event.target);
  
    console.log("[Dropdown Debug] trigger:", clickedInsideTrigger, "list:", clickedInsideList);
  
    if (clickedInsideTrigger) {
      console.log("[Dropdown Debug] Clicked on dropdown trigger");
      if (list.classList.contains("sc-hidden")) {
        list.classList.remove("sc-hidden");
        console.log("[Dropdown Debug] Showing dropdown list");
      } else {
        list.classList.add("sc-hidden");
        console.log("[Dropdown Debug] Hiding dropdown list");
      }
    } else if (!clickedInsideList) {
      list.classList.add("sc-hidden");
      console.log("[Dropdown Debug] Clicked outside, hiding dropdown");
    }
  }
  