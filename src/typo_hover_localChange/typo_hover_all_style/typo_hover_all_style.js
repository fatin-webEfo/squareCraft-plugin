export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") {
    return;
  }
  document.body.dataset.scHoverTypoAllBound = "1";
  const log = (...a) => console.log("[hover-typo-all:font]", ...a);

  const root = document.getElementById("sc-widget-container") || document;
  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;

  log("init", {
    hasRoot: !!root,
    rootId: root.id,
    selType: typeof getSelectedElement,
  });

  const TYPE_TO_SELECTOR = {
    heading1: "h1",
    heading2: "h2",
    heading3: "h3",
    heading4: "h4",
    paragraph1: "p.sqsrte-large",
    paragraph2: "p:not(.sqsrte-large):not(.sqsrte-small)",
    paragraph3: "p.sqsrte-small",
  };

  function ensureId(el) {
    if (!el.id) el.id = "sc-el-" + Math.random().toString(36).slice(2, 9);
    return el.id;
  }

  function allTypeHoverSelectors(scopeId) {
    const hostHover = [`#${scopeId}:hover`];
    const descOnHostHoverBase = Object.values(TYPE_TO_SELECTOR).map(
      (s) => `#${scopeId}:hover ${s}`
    );
    const descOnHostHover = descOnHostHoverBase.flatMap((s) => [
      s,
      `${s} span`,
      `${s} a`,
    ]);
    const selfHoverBase = Object.values(TYPE_TO_SELECTOR).map(
      (s) => `#${scopeId} ${s}:hover`
    );
    const selfHover = selfHoverBase.flatMap((s) => [s, `${s} span`, `${s} a`]);
    return [...hostHover, ...descOnHostHover, ...selfHover];
  }

  function writeExternal(styles) {
    const host = sel && sel();
    if (!host) {
      log("writeExternal: no host element");
      return;
    }
    const id = ensureId(host);
    const tagId = `style-${id}-hover`;
    let tag = document.getElementById(tagId);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = tagId;
      document.head.appendChild(tag);
      log("created style tag", { tagId });
    }
    window.__sc_extcss_hover = window.__sc_extcss_hover || {};
    const bag = window.__sc_extcss_hover;
    bag[id] = Object.assign({}, bag[id] || {}, styles);
    const body = Object.entries(bag[id])
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join(" ");
    tag.textContent = `${allTypeHoverSelectors(id).join(", ")} { ${body} }`;
    log("applied hover styles", { id, styles: bag[id] });
  }

  function commitWeight(v) {
    const val = String(v || "").trim();
    if (!val) {
      log("commitWeight: empty");
      return;
    }
    log("commitWeight", val);
    writeExternal({ "font-weight": val });
  }

  function commitLetterSpacing(raw) {
    if (raw == null) {
      log("commitLetterSpacing: null");
      return;
    }
    const s = String(raw).trim();
    if (!s) {
      log("commitLetterSpacing: empty");
      return;
    }
    const val = /^\-?\d+(\.\d+)?$/.test(s) ? `${s}px` : s;
    log("commitLetterSpacing", { raw, val });
    writeExternal({ "letter-spacing": val });
  }

  const weightBtnSel = "#hover-typo-allSelect-font-weight";
  const weightListSel = "#hover-typo-allSelect-font-weight-list";
  const spacingBtnSel = "#hover-typo-allSelect-letter-spacing";
  const spacingInputSel = "#typo-all-hover-font-section .sc-font-size-input";
  const panelSel = "#typo-all-hover-font-section";

  function el(s, scope = root) {
    return scope.querySelector(s);
  }
  function hide(elm) {
    if (elm && !elm.classList.contains("sc-hidden"))
      elm.classList.add("sc-hidden");
  }
  function toggle(elm) {
    if (elm) elm.classList.toggle("sc-hidden");
  }

  function listWithin(target) {
    const panel = target.closest(panelSel) || root;
    const n = el(weightListSel, panel);
    log("listWithin", { found: !!n });
    return n;
  }
  function spacingBtnWithin(target) {
    const panel = target.closest(panelSel) || root;
    const n = el(spacingBtnSel, panel);
    log("spacingBtnWithin", { found: !!n });
    return n;
  }
  function spacingListWithin(target) {
    const panel = target.closest(panelSel) || root;
    const wrap = spacingBtnWithin(target)?.closest(
      ".sc-flex.sc-text-color-white.sc-mt-2.sc-rounded-4px.sc-relative.sc-border.sc-border-solid.sc-border-585858.sc-items-center"
    );
    const n = wrap ? wrap.querySelector(".sc-absolute") : null;
    log("spacingListWithin", { found: !!n });
    return n;
  }
  function spacingInputWithin(target) {
    const panel = target.closest(panelSel) || root;
    const n = el(spacingInputSel, panel);
    log("spacingInputWithin", { found: !!n });
    return n;
  }
  function hideAllOpenLists(except) {
    root.querySelectorAll(`${weightListSel}:not(.sc-hidden)`).forEach((n) => {
      if (!except || !n.contains(except)) {
        hide(n);
        log("hide weight list");
      }
    });
    root
      .querySelectorAll(`${panelSel} .sc-absolute:not(.sc-hidden)`)
      .forEach((n) => {
        if (!except || !n.contains(except)) {
          hide(n);
          log("hide spacing list");
        }
      });
  }

  root.addEventListener(
    "pointerdown",
    (e) => {
      log("pointerdown", { target: e.target });

      const wb = e.target.closest(weightBtnSel);
      if (wb) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const list = listWithin(wb);
        toggle(list);
        log("toggle weight list", {
          visible: list && !list.classList.contains("sc-hidden"),
        });
        const arrow = wb.querySelector("img,svg");
        if (arrow)
          arrow.classList.toggle(
            "sc-rotate-180",
            !list?.classList.contains("sc-hidden")
          );
        const sl = spacingListWithin(wb);
        hide(sl);
        return;
      }

      const wi = e.target.closest(`${weightListSel} .sc-dropdown-item`);
      if (wi) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const panel = wi.closest(panelSel) || root;
        const v = (wi.textContent || "").trim();
        const btn = el(weightBtnSel, panel);
        const lbl = btn?.querySelector("p");
        if (lbl) lbl.textContent = ` ${v} `;
        commitWeight(v);
        const list = el(weightListSel, panel);
        hide(list);
        const arrow = btn?.querySelector("img,svg");
        if (arrow) arrow.classList.add("sc-rotate-180");
        log("selected weight", v);
        return;
      }

      const sb = e.target.closest(spacingBtnSel);
      if (sb) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const sl = spacingListWithin(sb);
        toggle(sl);
        log("toggle spacing list", {
          visible: sl && !sl.classList.contains("sc-hidden"),
        });
        const wl = listWithin(sb);
        hide(wl);
        return;
      }

      const sl = spacingListWithin(e.target);
      const si = e.target.closest(".sc-dropdown-item");
      if (sl && si && sl.contains(si)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const v = (si.dataset.value ?? si.textContent ?? "").trim();
        const inp = spacingInputWithin(si);
        if (inp) inp.value = v;
        commitLetterSpacing(v);
        hide(sl);
        log("selected letter-spacing", v);
        return;
      }

      const insideWeight =
        e.target.closest(weightListSel) || e.target.closest(weightBtnSel);
      const insideSpacing =
        e.target.closest(spacingBtnSel) || (sl && sl.contains(e.target));
      if (!insideWeight && !insideSpacing) {
        log("click outside, hide all lists");
        hideAllOpenLists(null);
      }
    },
    true
  );

  const initPanels = root.querySelectorAll(panelSel);
  log("panels found", initPanels.length);
  initPanels.forEach((panel, i) => {
    const inp = el(spacingInputSel, panel);
    if (inp && !inp.dataset.bound) {
      inp.dataset.bound = "1";
      let t;
      const go = () => {
        log("input commit letter-spacing", inp.value);
        commitLetterSpacing(inp.value);
      };
      inp.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(go, 120);
      });
      inp.addEventListener("change", go);
      inp.addEventListener("blur", go);
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          go();
          inp.blur();
        }
      });
    } else {
      log("no spacing input in panel", i);
    }
    const wList = el(weightListSel, panel);
    hide(wList);
    const sList = panel.querySelector(".sc-absolute");
    hide(sList);
    log("lists hidden initially", {
      hasWeightList: !!wList,
      hasSpacingList: !!sList,
    });
  });

  log("ready");
}


function initHoverTypoAllBorderControls(opts = {}) {
  const {
    trackId = "typo-all-hover-border-width-track",
    knobId = "typo-all-hover-border-width-knob",
    fillId = "typo-all-hover-border-width-fill",
    inputId = "typo-all-hover-border-width-input", // optional numeric <input>, if you have one
    min = 0,
    max = 20,
    step = 1,
    onChange = (v) => {}, // callback when value changes
  } = opts;

  const track = document.getElementById(trackId);
  const knob = document.getElementById(knobId);
  const fill = document.getElementById(fillId);
  const input = document.getElementById(inputId) || null;

  if (!track || !knob || !fill) {
    console.warn("initHoverTypoAllBorderControls: missing required elements");
    return;
  }

  // Internal state
  let value =
    input && !isNaN(parseFloat(input.value)) ? parseFloat(input.value) : min;
  value = Math.min(max, Math.max(min, value));
  let dragging = false;

  function pctFromValue(v) {
    return ((v - min) / (max - min)) * 100;
  }
  function valueFromPct(pct) {
    const raw = min + ((max - min) * pct) / 100;
    // snap to step
    const snapped = Math.round(raw / step) * step;
    return Math.min(max, Math.max(min, snapped));
  }
  function layout() {
    // guard against hidden elements returning 0 width
    const rect = track.getBoundingClientRect();
    const trackW = rect.width || track.offsetWidth || 1;
    const pct = pctFromValue(value);
    const px = (pct / 100) * trackW;

    fill.style.width = `${pct}%`;
    knob.style.left = `${px}px`;
    knob.style.transform = "translate(-50%, -50%)"; // center it if knob is absolutely centered by top/left
    if (input) input.value = value;
    onChange(value, pct);
  }

  function setFromClientX(clientX) {
    const rect = track.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    value = valueFromPct(pct);
    layout();
  }

  // Mouse
  function onDown(e) {
    e.preventDefault();
    dragging = true;
    track.classList.add("sc-cursor-grabbing");
    setFromClientX(e.clientX);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp, { once: true });
  }
  function onMove(e) {
    if (!dragging) return;
    setFromClientX(e.clientX);
  }
  function onUp() {
    dragging = false;
    track.classList.remove("sc-cursor-grabbing");
    window.removeEventListener("mousemove", onMove);
  }

  // Touch
  function onTouchStart(e) {
    const t = e.touches[0];
    if (!t) return;
    dragging = true;
    setFromClientX(t.clientX);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { once: true });
  }
  function onTouchMove(e) {
    if (!dragging) return;
    const t = e.touches[0];
    if (!t) return;
    e.preventDefault();
    setFromClientX(t.clientX);
  }
  function onTouchEnd() {
    dragging = false;
    window.removeEventListener("touchmove", onTouchMove);
  }

  // Click on track jumps knob
  function onTrackClick(e) {
    // Ignore if the click originated from the knob itself while dragging
    if (e.target === knob && dragging) return;
    setFromClientX(e.clientX);
  }

  // Keyboard (when knob is focused)
  function onKeyDown(e) {
    const k = e.key;
    if (k === "ArrowLeft" || k === "ArrowDown") {
      e.preventDefault();
      value = Math.max(min, value - step);
      layout();
    } else if (k === "ArrowRight" || k === "ArrowUp") {
      e.preventDefault();
      value = Math.min(max, value + step);
      layout();
    } else if (k === "Home") {
      e.preventDefault();
      value = min;
      layout();
    } else if (k === "End") {
      e.preventDefault();
      value = max;
      layout();
    }
  }

  // Input field (if present)
  function onInputChange(e) {
    const v = parseFloat(e.target.value);
    if (isNaN(v)) return;
    value = Math.min(max, Math.max(min, Math.round(v / step) * step));
    layout();
  }

  // Make sure elements are focusable for a11y
  knob.setAttribute("tabindex", "0");
  knob.setAttribute("role", "slider");
  knob.setAttribute("aria-valuemin", String(min));
  knob.setAttribute("aria-valuemax", String(max));
  const updateAria = () => knob.setAttribute("aria-valuenow", String(value));

  // Pointer-event setup (track & knob must receive events; fill should not)
  // Your CSS already matches this, which is good. :contentReference[oaicite:0]{index=0}

  // Bind
  track.addEventListener("mousedown", onDown);
  knob.addEventListener("mousedown", onDown);
  track.addEventListener("click", onTrackClick);

  track.addEventListener("touchstart", onTouchStart, { passive: true });
  knob.addEventListener("touchstart", onTouchStart, { passive: true });

  knob.addEventListener("keydown", onKeyDown);
  if (input) input.addEventListener("change", onInputChange);

  // Keep aria live
  const ro = new MutationObserver(updateAria);
  ro.observe(knob, { attributes: true, attributeFilter: ["style"] });

  // Initial paint
  layout();
  updateAria();

  // Public API (optional)
  return {
    get value() {
      return value;
    },
    set value(v) {
      value = Math.min(max, Math.max(min, v));
      layout();
    },
    destroy() {
      track.removeEventListener("mousedown", onDown);
      knob.removeEventListener("mousedown", onDown);
      track.removeEventListener("click", onTrackClick);
      track.removeEventListener("touchstart", onTouchStart);
      knob.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      knob.removeEventListener("keydown", onKeyDown);
      if (input) input.removeEventListener("change", onInputChange);
      ro.disconnect();
    },
  };
}


