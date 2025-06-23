import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/index.js";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.2/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

function getValidButton(el) {
  return el?.querySelector(
    "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary," +
      "button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary"
  );
}

export function initButtonAdvanceVerticalCustomTimelines(getSelectedElement) {
  const element = getSelectedElement();
  if (!element) return;

  ScrollTrigger.create({
    trigger: element,
    start: "10% top",
    end: "70% top",
    toggleActions: "play none none reverse",
  });
}

export function initButtonAdvanceVerticalEntry(getSelectedElement) {
  const element = getSelectedElement();
  const button = getValidButton(element);
  if (!button) return;

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    toggleActions: "play none none reverse",
    toggleClass: { targets: button, className: "sc-entry-animate" },
  });
}

export function initButtonAdvanceVerticalCenter(getSelectedElement) {
  const element = getSelectedElement();
  const button = getValidButton(element);
  if (!button) return;

  ScrollTrigger.create({
    trigger: element,
    start: "center center",
    toggleActions: "play none none reverse",
    toggleClass: { targets: button, className: "sc-center-animate" },
  });
}

export function initButtonAdvanceVerticalExit(getSelectedElement) {
  const element = getSelectedElement();
  const button = getValidButton(element);
  if (!button) return;

  ScrollTrigger.create({
    trigger: element,
    start: "bottom 30%",
    toggleActions: "play none none reverse",
    toggleClass: { targets: button, className: "sc-exit-animate" },
  });
}

export function initButtonAdvanceVerticalEffectSpeed(getSelectedElement) {
  const element = getSelectedElement();
  const button = getValidButton(element);
  if (!button) return;

  ScrollTrigger.create({
    trigger: element,
    start: "top 90%",
    toggleActions: "play none none reverse",
    toggleClass: { targets: button, className: "sc-speed-animate" },
  });
}

export function initButtonAdvanceVerticalEffectAnimation(getSelectedElement) {
  const options = document.querySelectorAll("[data-value]");
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      const effect = opt.getAttribute("data-value");
      const element = getSelectedElement();
      const button = getValidButton(element);
      if (!element || !button || !effect) return;

      const validClasses = [
        "sc-ease-linear",
        "sc-ease-in",
        "sc-ease-out",
        "sc-zoom-in",
        "sc-zoom-out",
      ];

      validClasses.forEach((cls) => button.classList.remove(cls));

      if (effect === "linear") button.classList.add("sc-ease-linear");
      if (effect === "ease-in") button.classList.add("sc-ease-in");
      if (effect === "ease-out") button.classList.add("sc-ease-out");
      if (effect === "zoom-in") button.classList.add("sc-zoom-in");
      if (effect === "zoom-out") button.classList.add("sc-zoom-out");
    });
  });
}
