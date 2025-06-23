
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.js";

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
      duration: 1.2, // Effect speed
      ease: "power1.out",
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
      const ease = opt.getAttribute("data-value") || "linear";
      const element = getSelectedElement();
      const button = getValidButton(element);
      if (!button) return;

      gsap.fromTo(
        button,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease,
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

// initButtonAdvanceStyles.js