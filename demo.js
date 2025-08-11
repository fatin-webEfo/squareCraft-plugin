export function TypoBlurAdvanceSyncCustomTimelineArrow(selectedElement) {
  if (!selectedElement) return;
  const content = selectedElement.querySelector(".sqs-block-content");
  if (!content) return;

  const REG = (window.__scBlurReg ||= new WeakMap());
  REG.get(selectedElement)?.kill?.();

  const hasGsap = !!window.gsap && !!window.ScrollTrigger;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  const readPct = (v, d) => {
    const raw = getComputedStyle(content).getPropertyValue(v);
    const n = parseFloat(String(raw).replace("%", "").trim());
    return Number.isFinite(n) ? n : d;
  };

  const start = () => readPct("--sc-Typo-blur-scroll-start", 0) / 100;
  const end = () => readPct("--sc-Typo-blur-scroll-end", 100) / 100;
  const entry = () => readPct("--sc-Typo-blur-scroll-entry", 100) / 100;
  const center = () => readPct("--sc-Typo-blur-scroll-center", 100) / 100;
  const exit = () => readPct("--sc-Typo-blur-scroll-exit", 100) / 100;

  const state = {
    st: null,
    raf: 0,
    tick: 0,
    killed: false,
    lastTarget: NaN,
    lastVars: "",
    proxy: { o: +getComputedStyle(content).blur || 1 },
    kill() {
      this.killed = true;
      if (this.st) this.st.kill();
      cancelAnimationFrame(this.raf);
      clearTimeout(this.tick);
      REG.delete(selectedElement);
    },
  };

  const drive = (val) => {
    const ease = window.__typoScrollEase || "none";
    if (!hasGsap) {
      content.style.setProperty("blur", String(val), "important");
      state.lastTarget = val;
      return;
    }
    if (val !== state.lastTarget) {
      state.lastTarget = val;
      gsap.killTweensOf(state.proxy);
      gsap.to(state.proxy, {
        o: val,
        ease: ease === "none" ? "none" : ease,
        duration: ease === "none" ? 0 : 0.6,
        overwrite: true,
        onUpdate: () =>
          content.style.setProperty(
            "blur",
            String(state.proxy.o),
            "important"
          ),
      });
    } else {
      content.style.setProperty("blur", String(val), "important");
    }
  };

  const arrow = document.getElementById("Typo-blur-custom-timeline-arrow");
  const updateArrow = (t, s, e) => {
    if (!arrow) return;
    arrow.style.left = `${t * 100}%`;
    arrow.style.transform = "translateX(-50%)";
    arrow.style.backgroundColor =
      t < s - 0.001 ? "#EF7C2F" : t > e + 0.001 ? "#F6B67B" : "#FFFFFF";
  };

  const apply = () => {
    const t = getViewportProgress(selectedElement);
    const s = start(),
      e = end();
    const ent = entry(),
      cen = center(),
      exi = exit();

    let o;
    if (t < s) {
      const k = s <= 0 ? 1 : Math.min(t / s, 1);
      o = ent + (cen - ent) * k;
    } else if (t > e) {
      const k = 1 - e <= 0 ? 1 : Math.min((t - e) / (1 - e), 1);
      o = cen + (exi - cen) * k;
    } else {
      o = cen;
    }

    drive(Math.max(0, Math.min(1, o)));
    updateArrow(t, s, e);
  };

  if (hasGsap) {
    ScrollTrigger.getById?.(`typo-blur:${selectedElement.id}`)?.kill();
    state.st = ScrollTrigger.create({
      id: `typo-blur:${selectedElement.id}`,
      trigger: selectedElement,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: apply,
      onRefresh: apply,
    });
    ScrollTrigger.refresh(true);
  } else {
    window.addEventListener("scroll", apply, { passive: true });
  }

  const headObserver = new MutationObserver(apply);
  headObserver.observe(document.head, { childList: true, subtree: true });
  const contentObserver = new MutationObserver(apply);
  contentObserver.observe(content, {
    attributes: true,
    attributeFilter: ["style"],
  });
  window.addEventListener("resize", apply, { passive: true });

  state.raf = requestAnimationFrame(function loop() {
    if (!state.killed) {
      apply();
      state.raf = requestAnimationFrame(loop);
    }
  });

  state.tick = setTimeout(function pollVars() {
    if (state.killed) return;
    const key = [start(), end(), entry(), center(), exit()].join("|");
    if (key !== state.lastVars) {
      state.lastVars = key;
      apply();
    }
    state.tick = setTimeout(pollVars, 120);
  }, 120);

  REG.set(selectedElement, state);
}