export function initButtonAdvanceVerticalCustomTimelines(getSelectedElement) {
  const startBullet = document.getElementById("timeline-start-bullet");
  const endBullet = document.getElementById("timeline-end-bullet");

  if (!startBullet || !endBullet) return;

  let start = 0;
  let end = 70;

  gsap.registerPlugin(ScrollTrigger);

  const element = getSelectedElement();
  ScrollTrigger.create({
    trigger: element,
    start: `${start}% top`,
    end: `${end}% top`,
    toggleActions: "play none none reverse",
  });
}

export function initButtonAdvanceVerticalEntry(getSelectedElement) {
  const bullet = document.getElementById("button-advance-entry-Bullet");
  if (!bullet) return;

  bullet.addEventListener("mousedown", () => {
    const element = getSelectedElement();
    if (!element) return;
    gsap.set(element, { y: 50, opacity: 0 });
    gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    });
  });
}

export function initButtonAdvanceVerticalCenter(getSelectedElement) {
  const bullet = document.getElementById("button-advance-center-radiusBullet");
  if (!bullet) return;

  bullet.addEventListener("mousedown", () => {
    const element = getSelectedElement();
    if (!element) return;
    gsap.to(element, {
      scale: 1.1,
      duration: 0.5,
      ease: "power1.out",
    });
  });
}
export function initButtonAdvanceVerticalExit(getSelectedElement) {
  const bullet = document.getElementById("button-advance-exit-radiusBullet");
  if (!bullet) return;

  bullet.addEventListener("mousedown", () => {
    const element = getSelectedElement();
    if (!element) return;
    gsap.to(element, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
    });
  });
}
    
export function initButtonAdvanceVerticalEffectSpeed(getSelectedElement) {
  const bullet = document.getElementById(
    "button-advance-effectSpeed-radiusBullet"
  );
  if (!bullet) return;

  bullet.addEventListener("mousedown", () => {
    const element = getSelectedElement();
    if (!element) return;
    gsap.to(element, {
      y: -10,
      duration: 1.2,
      ease: "power1.out",
    });
  });
}
  
  
export function initButtonAdvanceVerticalEffectAnimation(getSelectedElement) {
  const options = document.querySelectorAll("[data-value]");
  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      const ease = opt.getAttribute("data-value") || "linear";
      const el = getSelectedElement();
      if (!el) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        ease: ease,
        duration: 1,
      });
    });
  });
}
  
