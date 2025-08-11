export function opacityInitEffectAnimationDropdownToggle() {
  const arrow = document.getElementById(
    "Typo-opacity-effect-animation-type-arrow"
  );
  const list = document.getElementById(
    "Typo-opacity-effect-animation-type-list"
  );
  const display = document.getElementById(
    "Typo-opacity-effect-animation-value"
  );

  if (!arrow || !list || !display) return;

  arrow.onclick = () => {
    list.classList.toggle("sc-hidden");
  };

  const items = list.querySelectorAll("[data-value]");
  items.forEach((item) => {
    item.onclick = () => {
      const selected = item.getAttribute("data-value");
      display.textContent = item.textContent;
      display.setAttribute("data-value", selected);

      // Optional: save animation effect to style property of selected element
      const el =
        typeof getSelectedElement === "function" ? getSelectedElement() : null;
      if (el && el.id?.startsWith("block-")) {
        el.querySelector(".sqs-block-content")?.style.setProperty(
          "--sc-Typo-opacity-effect-animation",
          selected
        );
      }

      list.classList.add("sc-hidden");
    };
  });

  document.addEventListener("click", (e) => {
    if (!arrow.contains(e.target) && !list.contains(e.target)) {
      list.classList.add("sc-hidden");
    }
  });
}
