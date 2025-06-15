export function WidgetTypoSectionStateControls() {
  const normalTab = document.querySelector(
    "#typoSection .sc-flex .sc-bg-color-EF7C2F"
  );
  const hoverTab = document.querySelector(
    "#typoSection .sc-flex .sc-bg-3f3f3f"
  );

  const normalState = document.getElementById("typo-normal-state");
  const hoverState = document.getElementById("typo-hover-state");

  if (!normalTab || !hoverTab || !normalState || !hoverState) return;

  normalTab.addEventListener("click", () => {
    normalState.classList.remove("sc-hidden");
    hoverState.classList.add("sc-hidden");

    normalTab.classList.add("sc-bg-color-EF7C2F", "sc-text-color-white");
    normalTab.classList.remove("sc-bg-3f3f3f");

    hoverTab.classList.remove("sc-bg-color-EF7C2F", "sc-text-color-white");
    hoverTab.classList.add("sc-bg-3f3f3f");
  });

  hoverTab.addEventListener("click", () => {
    hoverState.classList.remove("sc-hidden");
    normalState.classList.add("sc-hidden");

    hoverTab.classList.add("sc-bg-color-EF7C2F", "sc-text-color-white");
    hoverTab.classList.remove("sc-bg-3f3f3f");

    normalTab.classList.remove("sc-bg-color-EF7C2F", "sc-text-color-white");
    normalTab.classList.add("sc-bg-3f3f3f");
  });
}
