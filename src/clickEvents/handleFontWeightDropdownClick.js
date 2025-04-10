let isDropdownOpen = false;

export function handleFontWeightDropdownClick(event) {
  const dropdownTrigger = event.target.closest("#font-weight-dropdown");
  const dropdownList = document.getElementById("font-weight-dropdown-list");

  if (!dropdownList) return;

  const clickedInsideList = dropdownList.contains(event.target);

  if (dropdownTrigger) {
    console.log("✅ Clicked inside dropdown trigger");

    if (!isDropdownOpen) {
      dropdownList.classList.remove("sc-hidden");
      console.log("🔽 Show dropdown");
      isDropdownOpen = true;
    } else {
      dropdownList.classList.add("sc-hidden");
      console.log("🔼 Hide dropdown");
      isDropdownOpen = false;
    }
  } else if (!clickedInsideList) {
    dropdownList.classList.add("sc-hidden");
    console.log("❌ Clicked outside, force hide dropdown");
    isDropdownOpen = false;
  }
}
