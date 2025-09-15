export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") {
    return;
  }
  document.body.dataset.scHoverTypoAllBound = "1";

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
export function initHoverTypoAllBorderControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBorderBound === "1") return;
  document.body.dataset.scHoverTypoAllBorderBound = "1";

  const log = (...a) => console.log("[hover-typo-all:border]", ...a);
  const root = document.getElementById("sc-widget-container") || document;

  const panelSel = "#typo-all-hover-border-sides";
  const itemSel = [
    "#typo-all-hover-border-side-all",
    "#typo-all-hover-border-side-top",
    "#typo-all-hover-border-side-bottom",
    "#typo-all-hover-border-side-left",
    "#typo-all-hover-border-side-right",
  ].join(",");
  const stylePanelSel = "#typo-all-hover-border-style-wrap";
  const styleItemSel = [
    "#typo-all-hover-border-style-solid",
    "#typo-all-hover-border-style-dashed",
    "#typo-all-hover-border-style-dotted",
  ].join(",");
  const activeClass = "sc-bg-454545";
  const inactiveClass = "sc-bg-3f3f3f";

  function setActive(panel, el) {
    panel.querySelectorAll(itemSel).forEach((n) => {
      n.classList.remove(activeClass);
      if (!n.classList.contains(inactiveClass)) n.classList.add(inactiveClass);
    });
    el.classList.add(activeClass);
    el.classList.remove(inactiveClass);
    panel.dataset.side = (el.id || "").replace(
      "typo-all-hover-border-side-",
      ""
    );
  }
  function setActiveStyle(panel, el) {
    panel.querySelectorAll(styleItemSel).forEach((n) => {
      n.classList.remove(activeClass);
      if (!n.classList.contains(inactiveClass)) n.classList.add(inactiveClass);
    });
    el.classList.add(activeClass);
    el.classList.remove(inactiveClass);
    panel.dataset.style = (el.id || "").replace(
      "typo-all-hover-border-style-",
      ""
    );
  }

  root.querySelectorAll(panelSel).forEach((panel) => {
    const items = panel.querySelectorAll(itemSel);
    setActive(
      panel,
      Array.from(items).find((n) => n.classList.contains(activeClass)) ||
        items[0]
    );
  });
  root.querySelectorAll(stylePanelSel).forEach((panel) => {
    const items = panel.querySelectorAll(styleItemSel);
    setActiveStyle(
      panel,
      Array.from(items).find((n) => n.classList.contains(activeClass)) ||
        items[0]
    );
  });

  root.addEventListener(
    "pointerdown",
    (e) => {
      const btn = e.target.closest(itemSel);
      if (btn) {
        const panel = btn.closest(panelSel);
        if (!panel) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setActive(panel, btn);
        return;
      }
      const styleBtn = e.target.closest(styleItemSel);
      if (styleBtn) {
        const panel = styleBtn.closest(stylePanelSel);
        if (!panel) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        setActiveStyle(panel, styleBtn);
        return;
      }
    },
    true
  );

  const track = root.querySelector("#typo-all-hover-border-width-track");
  const fill = root.querySelector("#typo-all-hover-border-width-fill");
  const knob = root.querySelector("#typo-all-hover-border-width-knob");
  const valuePill = root.querySelector("#typo-all-hover-border-width-value");
  if (!track || !fill || !knob) {
    log("slider elements missing");
    return;
  }

  track.style.setProperty("position", "relative", "important");
  track.style.setProperty("user-select", "none", "important");
  track.style.setProperty("touch-action", "none", "important");
  track.style.setProperty("overflow", "visible", "important");
  fill.style.setProperty("position", "absolute", "important");
  fill.style.setProperty("left", "0px", "important");
  fill.style.setProperty("top", "0px", "important");
  fill.style.setProperty("height", "100%", "important");
  fill.style.setProperty("pointer-events", "none", "important");
  knob.style.setProperty("position", "absolute", "important");
  knob.style.setProperty("top", "50%", "important");
  knob.style.setProperty("transform", "translate(-50%, -50%)", "important");
  knob.style.setProperty("touch-action", "none", "important");
  knob.style.setProperty("z-index", "2", "important");
  knob.setAttribute("role", "slider");
  knob.tabIndex = knob.tabIndex || 0;

  const TYPE_TO_SELECTOR = {
    heading1: "h1",
    heading2: "h2",
    heading3: "h3",
    heading4: "h4",
    paragraph1: "p.sqsrte-large",
    paragraph2: "p:not(.sqsrte-large):not(.sqsrte-small)",
    paragraph3: "p.sqsrte-small",
  };
  const ensureId = (el) =>
    (el.id ||= "sc-el-" + Math.random().toString(36).slice(2, 9));
  function hoverSelectors(scopeId) {
    const base = Object.values(TYPE_TO_SELECTOR).map(
      (s) => `#${scopeId}:hover ${s}`
    );
    const exp = base.flatMap((s) => [s, `${s} span`, `${s} a`]);
    return [`#${scopeId}:hover`, ...exp];
  }
  function writeBorder(widthPx) {
    const host =
      typeof getSelectedElement === "function" ? getSelectedElement() : null;
    if (!host) return;
    const id = ensureId(host);
    const tagId = `style-${id}-hover-border`;
    let tag = document.getElementById(tagId);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = tagId;
      document.head.appendChild(tag);
    }
    const side = (
      root.querySelector(panelSel)?.dataset.side || "all"
    ).toLowerCase();
    const style = (
      root.querySelector(stylePanelSel)?.dataset.style || "solid"
    ).toLowerCase();
    const prop = side === "all" ? "border-width" : `border-${side}-width`;
    window.__sc_extcss_hover_border ||= {};
    const bag = window.__sc_extcss_hover_border;
    bag[id] = {
      ...(bag[id] || {}),
      [prop]: `${widthPx}px`,
      "border-style": style,
    };
    const css = Object.entries(bag[id])
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join(" ");
    tag.textContent = `${hoverSelectors(id).join(", ")} { ${css} }`;
  }

  const num = (v, d) => (v == null || v === "" || isNaN(+v) ? d : +v);
  function getRange() {
    return {
      min: num(track.dataset.min, 0),
      max: num(track.dataset.max, 20),
      step: Math.max(1, num(track.dataset.step, 1)),
    };
  }
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const quant = (v, s) => Math.round(v / s) * s;

  const rect = () => track.getBoundingClientRect();
  function pctFromX(clientX) {
    const r = rect();
    const x = clamp(clientX - r.left, 0, r.width);
    return r.width ? x / r.width : 0;
  }
  function setByPct(p) {
    const r = rect();
    const x = clamp(p * r.width, 0, r.width);
    fill.style.setProperty("width", `${x}px`, "important");
    knob.style.setProperty("left", `${x}px`, "important");
  }
  function setByValue(px) {
    const { min, max } = getRange();
    const p = clamp((px - min) / (max - min || 1), 0, 1);
    setByPct(p);
  }
  function valueFromPct(p) {
    const { min, max, step } = getRange();
    return quant(min + p * (max - min), step);
  }
  function commitFromPct(p) {
    const v = valueFromPct(p);
    track.dataset.value = String(v);
    if (valuePill) valuePill.textContent = `${v}px`;
    knob.setAttribute("aria-valuemin", String(getRange().min));
    knob.setAttribute("aria-valuemax", String(getRange().max));
    knob.setAttribute("aria-valuenow", String(v));
    setByValue(v);
    writeBorder(v);
  }

  function initPosition() {
    const initVal = num(track.dataset.value, getRange().min);
    setByValue(initVal);
    writeBorder(initVal);
    if (valuePill) valuePill.textContent = `${initVal}px`;
    knob.setAttribute("aria-valuenow", String(initVal));
  }
  if (rect().width === 0) {
    requestAnimationFrame(() => requestAnimationFrame(initPosition));
  } else {
    initPosition();
  }

  const ro = new ResizeObserver(() => {
    const v = num(track.dataset.value, getRange().min);
    setByValue(v);
  });
  ro.observe(track);

  let dragging = false,
    moved = false,
    activePid = null;
  const activate = () => {
    track.classList.remove("sc-bg-F6F6F6");
    track.classList.add("sc-bg-color-EF7C2F");
  };
  const deactivate = () => {
    track.classList.remove("sc-bg-color-EF7C2F");
    track.classList.add("sc-bg-F6F6F6");
  };

  const getX = (e) =>
    e?.clientX ?? e?.touches?.[0]?.clientX ?? e?.changedTouches?.[0]?.clientX;

  function start(e, captor, pid) {
    dragging = true;
    moved = false;
    activePid = pid;
    activate();
    commitFromPct(pctFromX(getX(e)));
    try {
      if (captor.setPointerCapture && pid != null)
        captor.setPointerCapture(pid);
    } catch {}
    bindMoves(true);
  }
  function move(e) {
    if (!dragging) return;
    moved = true;
    e.preventDefault();
    commitFromPct(pctFromX(getX(e)));
  }
  function end(e, captor) {
    if (!dragging) return;
    dragging = false;
    activePid = null;
    deactivate();
    try {
      if (captor.releasePointerCapture)
        captor.releasePointerCapture(e?.pointerId);
    } catch {}
    bindMoves(false);
  }

  const onPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const captor = track;
    start(e, captor, e.pointerId);
  };
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    start(e, track, null);
  };
  const onTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    start(e, track, null);
  };

  function bind(el) {
    if ("PointerEvent" in window)
      el.addEventListener("pointerdown", onPointerDown, {
        capture: true,
        passive: false,
      });
    el.addEventListener("mousedown", onMouseDown, true);
    el.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: false,
    });
  }
  bind(track);
  bind(knob);

  const onPMove = (e) => move(e);
  const onPUp = (e) => {
    end(e, track);
  };
  const onMMove = (e) => move(e);
  const onMUp = () => {
    end(null, track);
  };
  const onTMove = (e) => move(e);
  const onTEnd = () => {
    end(null, track);
  };

  function bindMoves(on) {
    if (on) {
      if ("PointerEvent" in window) {
        window.addEventListener("pointermove", onPMove, {
          capture: true,
          passive: false,
        });
        window.addEventListener("pointerup", onPUp, {
          capture: true,
          passive: false,
        });
        window.addEventListener("pointercancel", onPUp, {
          capture: true,
          passive: false,
        });
      }
      window.addEventListener("mousemove", onMMove, true);
      window.addEventListener("mouseup", onMUp, true);
      window.addEventListener("touchmove", onTMove, {
        capture: true,
        passive: false,
      });
      window.addEventListener("touchend", onTEnd, {
        capture: true,
        passive: false,
      });
      window.addEventListener("touchcancel", onTEnd, {
        capture: true,
        passive: false,
      });
    } else {
      if ("PointerEvent" in window) {
        window.removeEventListener("pointermove", onPMove, true);
        window.removeEventListener("pointerup", onPUp, true);
        window.removeEventListener("pointercancel", onPUp, true);
      }
      window.removeEventListener("mousemove", onMMove, true);
      window.removeEventListener("mouseup", onMUp, true);
      window.removeEventListener("touchmove", onTMove, true);
      window.removeEventListener("touchend", onTEnd, true);
      window.removeEventListener("touchcancel", onTEnd, true);
    }
  }

  track.addEventListener(
    "click",
    (e) => {
      if (dragging || moved) return;
      e.preventDefault();
      e.stopPropagation();
      commitFromPct(pctFromX(e.clientX));
    },
    true
  );

  knob.addEventListener("keydown", (e) => {
    const { min, max, step } = getRange();
    const cur = num(track.dataset.value, min);
    let v = cur;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown")
      v = clamp(cur - step, min, max);
    else if (e.key === "ArrowRight" || e.key === "ArrowUp")
      v = clamp(cur + step, min, max);
    else return;
    e.preventDefault();
    track.dataset.value = String(v);
    if (valuePill) valuePill.textContent = `${v}px`;
    setByValue(v);
    writeBorder(v);
    knob.setAttribute("aria-valuenow", String(v));
  });

  track.addEventListener("dragstart", (e) => e.preventDefault());
  knob.addEventListener("dragstart", (e) => e.preventDefault());

  log("ready");
}



