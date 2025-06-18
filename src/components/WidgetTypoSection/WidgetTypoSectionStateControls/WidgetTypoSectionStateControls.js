export function WidgetTypoSectionStateControls() {
  const tabButtons = document.querySelectorAll(
    "#typoSection .sc-mt-2 .sc-flex.sc-roboto > div"
  );
  const tabContents = [
    document.getElementById("typo-normal-state"),
    document.getElementById("typo-hover-state"),
  ];

  if (!tabButtons.length || tabContents.some((el) => el === null)) return;

  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b, i) => {
        if (i === index) {
          b.classList.add("sc-bg-color-EF7C2F", "sc-text-color-white");
          b.classList.remove("sc-bg-3f3f3f");
          if (tabContents[i]) tabContents[i].classList.remove("sc-hidden");
        } else {
          b.classList.remove("sc-bg-color-EF7C2F", "sc-text-color-white");
          b.classList.add("sc-bg-3f3f3f");
          if (tabContents[i]) tabContents[i].classList.add("sc-hidden");
        }
      });
    });
  });
}
