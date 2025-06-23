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
      duration: 1.2,
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
      const effect = opt.getAttribute("data-value");
      const element = getSelectedElement();
      const button = getValidButton(element);
      if (!element || !button || !effect) return;

      let animation = {};

      if (effect === "entry") {
        animation = {
          from: { y: 60, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          start: "top 80%",
        };
      }

      if (effect === "center") {
        animation = {
          to: { scale: 1.05, duration: 0.4, ease: "power1.out" },
          start: "center center",
        };
      }

      if (effect === "exit") {
        animation = {
          to: { y: -40, opacity: 0, duration: 0.5, ease: "power1.in" },
          start: "bottom 30%",
        };
      }

      if (effect === "speed") {
        animation = {
          from: { y: 20, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 1.2, ease: "power1.out" },
          start: "top 90%",
        };
      }

      if (effect === "zoom-in") {
        animation = {
          from: { scale: 0.8, opacity: 0 },
          to: { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          start: "top 85%",
        };
      }

      if (effect === "zoom-out") {
        animation = {
          from: { scale: 1.2, opacity: 0 },
          to: { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          start: "top 85%",
        };
      }

      if (animation.from) {
        gsap.fromTo(button, animation.from, {
          ...animation.to,
          scrollTrigger: {
            trigger: element,
            start: animation.start,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.to(button, {
          ...animation.to,
          scrollTrigger: {
            trigger: element,
            start: animation.start,
            toggleActions: "play none none reverse",
          },
        });
      }
    });
  });
}
