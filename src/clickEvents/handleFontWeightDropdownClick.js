export function handleFontWeightDropdownClick(event) {
    const dropdown = document.getElementById("font-weight-dropdown");
    const list = document.getElementById("font-weight-dropdown-list");
  
    if (!dropdown || !list) return;
  
    const clickedInsideTrigger = dropdown.contains(event.target);
    const clickedInsideList = list.contains(event.target);
  
    if (clickedInsideTrigger) {
      if (list.classList.contains("sc-hidden")) {
        list.classList.remove("sc-hidden");
      } else {
        list.classList.add("sc-hidden");
      }
    } else if (!clickedInsideList) {
      list.classList.add("sc-hidden");
    }
  }
  