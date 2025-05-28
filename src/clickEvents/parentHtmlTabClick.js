export function parentHtmlTabClick() {
  const headers = document.querySelectorAll(".tabHeader");

  const designTab = document.getElementById("designTab");
  const advancedTab = document.getElementById("advancedTab");
  const presetsTab = document.getElementById("presetsTab");

  if (!designTab || !advancedTab || !presetsTab) {
    console.error("❌ One or more tab content containers are missing.");
    return;
  }

  headers.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      designTab.classList.add("sc-hidden");
      advancedTab.classList.add("sc-hidden");
      presetsTab.classList.add("sc-hidden");

      if (index === 0) designTab.classList.remove("sc-hidden");
      if (index === 1) advancedTab.classList.remove("sc-hidden");
      if (index === 2) presetsTab.classList.remove("sc-hidden");
    });
  });

  designTab.classList.remove("sc-hidden");
  advancedTab.classList.add("sc-hidden");
  presetsTab.classList.add("sc-hidden");
}