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

  gsap.fromTo(
    button,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

export function initButtonAdvanceVerticalCenter(getSelectedElement) {
  const element = getSelectedElement();
  const button = getValidButton(element);
  if (!button) return;

  gsap.to(button, {
    scale: 1.05,
    duration: 0.4,
    ease: "power1.out",
    immediateRender: false,
    scrollTrigger: {
      trigger: element,
      start: "center center",
      toggleActions: "play none none reverse",
    },
  });
}

export function initButtonAdvanceVerticalExit(getSelectedElement) {
  const element = getSelectedElement();
  const button = getValidButton(element);
  if (!button) return;

  gsap.to(button, {
    y: -40,
    opacity: 0,
    duration: 0.5,
    ease: "power1.in",
    immediateRender: false,
    scrollTrigger: {
      trigger: element,
      start: "bottom 30%",
      toggleActions: "play none none reverse",
    },
  });
}

export function initButtonAdvanceVerticalEffectSpeed(getSelectedElement) {
  const element = getSelectedElement();
  const button = getValidButton(element);
  if (!button) return;

  gsap.fromTo(
    button,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power1.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

export function initButtonAdvanceVerticalEffectAnimation(getSelectedElement) {
  const options = document.querySelectorAll("[data-value]");
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      const effect = opt.getAttribute("data-value");
      const element = getSelectedElement();
      const button = getValidButton(element);
      if (!element || !button || !effect) return;

      const easingMap = {
        linear: "none",
        "ease-in": "power1.in",
        "ease-out": "power1.out",
        "zoom-in": "power4.out",
        "zoom-out": "power4.in",
      };

      const ease = easingMap[effect] || "power1.out";

      gsap.fromTo(
        button,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease,
          immediateRender: false,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });
}
