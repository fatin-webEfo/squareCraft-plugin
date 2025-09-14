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
    log("side:", panel.dataset.side);
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
    log("style:", panel.dataset.style);
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

  track.style.position = track.style.position || "relative";
  track.style.userSelect = "none";
  track.style.touchAction = "none";
  fill.style.touchAction = "none";
  knob.style.touchAction = "none";
  fill.style.zIndex = "1";
  knob.style.zIndex = "2";
  knob.style.pointerEvents = "auto";

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
  function ensureId(el) {
    if (!el.id) el.id = "sc-el-" + Math.random().toString(36).slice(2, 9);
    return el.id;
  }
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

    window.__sc_extcss_hover_border = window.__sc_extcss_hover_border || {};
    const bag = window.__sc_extcss_hover_border;
    bag[id] = Object.assign({}, bag[id] || {}, {
      [prop]: `${widthPx}px`,
      "border-style": style,
    });
    tag.textContent = `${hoverSelectors(id).join(", ")} { ${Object.entries(
      bag[id]
    )
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join(" ")} }`;
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

  function pctFromX(clientX) {
    const r = track.getBoundingClientRect();
    const x = clamp(clientX - r.left, 0, r.width);
    return r.width ? x / r.width : 0;
  }
  function setByPct(p) {
    const r = track.getBoundingClientRect();
    const x = clamp(p * r.width, 0, r.width);
    fill.style.width = `${x}px`;
    knob.style.left = `${x}px`;
    knob.style.top = "50%";
    knob.style.transform = "translate(-50%, -50%)";
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
    valuePill && (valuePill.textContent = `${v}px`);
    knob.setAttribute("aria-valuenow", String(v));
    knob.setAttribute("aria-valuemin", String(getRange().min));
    knob.setAttribute("aria-valuemax", String(getRange().max));
    setByValue(v);
    writeBorder(v);
  }

  const initVal = num(track.dataset.value, getRange().min);
  setByValue(initVal);
  writeBorder(initVal);
  knob.setAttribute("aria-valuenow", String(initVal));
  valuePill && (valuePill.textContent = `${initVal}px`);

  // drag state
  let dragging = false;
  const activate = () => {
    track.classList.remove("sc-bg-F6F6F6");
    track.classList.add("sc-bg-color-EF7C2F");
  };
  const deactivate = () => {
    track.classList.remove("sc-bg-color-EF7C2F");
    track.classList.add("sc-bg-F6F6F6");
  };

  const getX = (e) =>
    e?.clientX ??
    (e?.touches && e.touches[0]?.clientX) ??
    (e?.changedTouches && e.changedTouches[0]?.clientX);

  function start(clientX, captor, pid) {
    dragging = true;
    activate();
    commitFromPct(pctFromX(clientX));
    try {
      captor.setPointerCapture && pid != null && captor.setPointerCapture(pid);
    } catch {}
  }
  function move(clientX) {
    if (!dragging) return;
    commitFromPct(pctFromX(clientX));
  }
  function end(captor, pid) {
    if (!dragging) return;
    dragging = false;
    deactivate();
    try {
      captor.releasePointerCapture &&
        pid != null &&
        captor.releasePointerCapture(pid);
    } catch {}
  }

  // Bind to track, fill, and knob (works even if fill overlaps knob)
  const onPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const captor = e.currentTarget;
    start(e.clientX, captor, e.pointerId);
    const onMove = (ev) => {
      ev.preventDefault();
      move(ev.clientX);
    };
    const onUp = (ev) => {
      end(captor, ev.pointerId);
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("pointercancel", onUp, true);
    };
    window.addEventListener("pointermove", onMove, true);
    window.addEventListener("pointerup", onUp, true);
    window.addEventListener("pointercancel", onUp, true);
  };
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const captor = e.currentTarget;
    start(e.clientX, captor, null);
    const mm = (ev) => move(ev.clientX);
    const mu = () => {
      end(captor, null);
      window.removeEventListener("mousemove", mm, true);
      window.removeEventListener("mouseup", mu, true);
    };
    window.addEventListener("mousemove", mm, true);
    window.addEventListener("mouseup", mu, true);
  };
  const onTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const captor = e.currentTarget;
    start(getX(e), captor, null);
    const tm = (ev) => move(getX(ev));
    const tu = () => {
      end(captor, null);
      window.removeEventListener("touchmove", tm, true);
      window.removeEventListener("touchend", tu, true);
      window.removeEventListener("touchcancel", tu, true);
    };
    window.addEventListener("touchmove", tm, true);
    window.addEventListener("touchend", tu, true);
    window.addEventListener("touchcancel", tu, true);
  };
  const bindAll = (el) => {
    if ("onpointerdown" in window)
      el.addEventListener("pointerdown", onPointerDown, true);
    el.addEventListener("mousedown", onMouseDown, true);
    el.addEventListener("touchstart", onTouchStart, {
      capture: true,
      passive: false,
    });
  };
  [track, fill, knob].forEach(bindAll);

  // click-to-jump (when not dragging)
  track.addEventListener(
    "click",
    (e) => {
      if (dragging) return;
      e.preventDefault();
      e.stopPropagation();
      commitFromPct(pctFromX(e.clientX));
    },
    true
  );

  // keyboard nudge
  knob.addEventListener("keydown", (e) => {
    const { min, max, step } = getRange();
    const cur = num(track.dataset.value, min);
    let v = cur;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      v = clamp(cur - step, min, max);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      v = clamp(cur + step, min, max);
    } else return;
    e.preventDefault();
    track.dataset.value = v;
    valuePill && (valuePill.textContent = `${v}px`);
    setByValue(v);
    writeBorder(v);
    knob.setAttribute("aria-valuenow", String(v));
  });

  log("ready");
}
