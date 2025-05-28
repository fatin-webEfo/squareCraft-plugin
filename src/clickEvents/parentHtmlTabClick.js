export function parentHtmlTabClick() {
  const headers = document.querySelectorAll(".tabHeader");
  const designTab = document.getElementById("designTab");
  const advancedTab = document.getElementById("advancedTab");
  const presetsTab = document.getElementById("presetsTab");

  if (!designTab || !advancedTab || !presetsTab || headers.length < 3) {
    console.error("❌ One or more tab headers or content containers are missing.");
    return;
  }

  const tabMap = {
    "design-tab": designTab,
    "advanced-tab": advancedTab,
    "preset-tab": presetsTab
  };

  headers.forEach(tab => {
    tab.addEventListener("click", () => {
      Object.values(tabMap).forEach(section => section.classList.add("sc-hidden"));

      const targetId = tab.id;
      const targetSection = tabMap[targetId];
      if (targetSection) {
        targetSection.classList.remove("sc-hidden");
      }
    });
  });

  designTab.classList.remove("sc-hidden");
  advancedTab.classList.add("sc-hidden");
  presetsTab.classList.add("sc-hidden");
}
