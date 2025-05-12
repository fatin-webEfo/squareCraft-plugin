export function initHoverButtonSectionToggleControls() {
  const hoverSections = {
    "hover-colorButton": "hover-colorSection",
    "hover-iconButton": "hover-iconSection",
    "hover-bordersButton": "hover-bordersSection",
    "hover-shadowsButton": "hover-shadowsSection",
    "hover-buttonEffect": "hover-buttonEffectSection"
  };

  Object.keys(hoverSections).forEach((buttonId) => {
    const button = document.getElementById(buttonId);
    const sectionId = hoverSections[buttonId];

    if (button && document.getElementById(sectionId)) {
      button.addEventListener("click", () => {
        Object.keys(hoverSections).forEach((otherButtonId) => {
          const otherSectionId = hoverSections[otherButtonId];
          const otherSection = document.getElementById(otherSectionId);

          if (otherSection) {
            if (otherButtonId === buttonId) {
              otherSection.classList.remove("sc-hidden");
              otherSection.classList.add("sc-visible");
              otherSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            } else {
              otherSection.classList.add("sc-hidden");
              otherSection.classList.remove("sc-visible");
            }
          }
        });
      });
    }
  });

  // 🎯 Effect Type Dropdown
  const effectTypeDropdown = document.getElementById("hover-buttonTransitionDropdown");
  const effectTypeSelect = document.getElementById("hover-buttonTransitionTypeSelect");
  const effectTypeLabel = document.getElementById("hover-buttonTransitionTypeLabel");

  if (effectTypeSelect && effectTypeDropdown && effectTypeLabel) {
    effectTypeSelect.addEventListener("click", (e) => {
      e.stopPropagation();
      effectTypeDropdown.classList.toggle("sc-hidden");
    });

    effectTypeDropdown.querySelectorAll("[data-value]").forEach(item => {
      item.addEventListener("click", () => {
        effectTypeLabel.textContent = item.getAttribute("data-value");
        effectTypeDropdown.classList.add("sc-hidden");
      });
    });

    document.addEventListener("click", (e) => {
      if (!effectTypeDropdown.contains(e.target) && !effectTypeSelect.contains(e.target)) {
        effectTypeDropdown.classList.add("sc-hidden");
      }
    });
  }

  // ⏱️ Duration Dropdown
  const durationDropdown = document.getElementById("hover-all-color-selction-bar");
  const durationSelect = document.getElementById("hover-buttonDuration Select");
  const durationLabel = document.getElementById("hover-buttonDurationLabel");

  if (durationDropdown && durationSelect && durationLabel) {
    durationSelect.addEventListener("click", (e) => {
      e.stopPropagation();
      durationDropdown.classList.toggle("sc-hidden");
    });

    durationDropdown.querySelectorAll("[data-value]").forEach(item => {
      item.addEventListener("click", () => {
        durationLabel.textContent = item.getAttribute("data-value");
        durationDropdown.classList.add("sc-hidden");
      });
    });

    document.addEventListener("click", (e) => {
      if (!durationDropdown.contains(e.target) && !durationSelect.contains(e.target)) {
        durationDropdown.classList.add("sc-hidden");
      }
    });
  }

  // ⏳ Delay Dropdown
  const delayDropdown = document.getElementById("hover-buttonDelayDropdown");
  const delaySelect = document.getElementById("hover-buttonDelayTypeSelect");
  const delayLabel = document.getElementById("hover-buttonDelayLabel");

  if (delayDropdown && delaySelect && delayLabel) {
    delaySelect.addEventListener("click", (e) => {
      e.stopPropagation();
      delayDropdown.classList.toggle("sc-hidden");
    });

    delayDropdown.querySelectorAll("[data-value]").forEach(item => {
      item.addEventListener("click", () => {
        delayLabel.textContent = item.getAttribute("data-value");
        delayDropdown.classList.add("sc-hidden");
      });
    });

    document.addEventListener("click", (e) => {
      if (!delayDropdown.contains(e.target) && !delaySelect.contains(e.target)) {
        delayDropdown.classList.add("sc-hidden");
      }
    });
  }
}
