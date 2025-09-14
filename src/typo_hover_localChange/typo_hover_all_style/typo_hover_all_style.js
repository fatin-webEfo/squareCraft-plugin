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
  if (document.body.dataset.scHoverTypoAllBorderBound === "1") {
    return;
  }
  document.body.dataset.scHoverTypoAllBorderBound = "1";
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
    const items = panel.querySelectorAll(itemSel);
    items.forEach((n) => {
      n.classList.remove(activeClass);
      if (!n.classList.contains(inactiveClass)) n.classList.add(inactiveClass);
    });
    el.classList.add(activeClass);
    el.classList.remove(inactiveClass);
    panel.dataset.side = (el.id || "").replace(
      "typo-all-hover-border-side-",
      ""
    );
    log("active side set", panel.dataset.side);
  }

  function setActiveStyle(panel, el) {
    const items = panel.querySelectorAll(styleItemSel);
    items.forEach((n) => {
      n.classList.remove(activeClass);
      if (!n.classList.contains(inactiveClass)) n.classList.add(inactiveClass);
    });
    el.classList.add(activeClass);
    el.classList.remove(inactiveClass);
    panel.dataset.style = (el.id || "").replace(
      "typo-all-hover-border-style-",
      ""
    );
    log("active style set", panel.dataset.style);
  }

  root.querySelectorAll(panelSel).forEach((panel) => {
    const items = panel.querySelectorAll(itemSel);
    const current = Array.from(items).find((n) =>
      n.classList.contains(activeClass)
    );
    if (current) setActive(panel, current);
    else if (items[0]) setActive(panel, items[0]);
  });

  root.querySelectorAll(stylePanelSel).forEach((panel) => {
    const items = panel.querySelectorAll(styleItemSel);
    const current = Array.from(items).find((n) =>
      n.classList.contains(activeClass)
    );
    if (current) setActiveStyle(panel, current);
    else if (items[0]) setActiveStyle(panel, items[0]);
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
    const body = Object.entries(bag[id])
      .map(([k, v]) => `${k}: ${v} !important;`)
      .join(" ");
    tag.textContent = `${hoverSelectors(id).join(", ")} { ${body} }`;
    log("applied border", { id, side, style, widthPx });
  }

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }

  function getBounds() {
    const rect = track.getBoundingClientRect();
    const k = knob.getBoundingClientRect();
    return { rect, knobW: k.width || 12 };
  }

  function getRange() {
    const min = Number(track?.dataset.min ?? 0);
    const max = Number(track?.dataset.max ?? 20);
    const step = Number(track?.dataset.step ?? 1);
    return { min, max, step };
  }

  function quantize(v, step) {
    if (step <= 0) return v;
    return Math.round(v / step) * step;
  }

  function pctFromClientX(clientX) {
    const { rect } = getBounds();
    const x = clamp(clientX - rect.left, 0, rect.width);
    return rect.width ? x / rect.width : 0;
  }

  function setByPct(p) {
    const { rect, knobW } = getBounds();
    const x = clamp(p * rect.width, 0, rect.width);
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
    const raw = min + p * (max - min);
    return quantize(raw, step);
  }

  function commitFromPct(p) {
    const v = valueFromPct(p);
    track.dataset.value = String(v);
    setByValue(v);
    writeBorder(v);
  }

  let dragging = false;

  function startDrag(clientX) {
    if (!track || !fill || !knob) return;
    dragging = true;
    track.classList.remove("sc-bg-F6F6F6");
    track.classList.add("sc-bg-color-EF7C2F");
    commitFromPct(pctFromClientX(clientX));
  }

  function moveDrag(clientX) {
    if (!dragging) return;
    commitFromPct(pctFromClientX(clientX));
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("sc-bg-color-EF7C2F");
    track.classList.add("sc-bg-F6F6F6");
  }

  if (track && fill && knob) {
    const initVal = Number(track.dataset.value ?? 1);
    setByValue(initVal);
    writeBorder(initVal);

    const onPointerDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
      track.setPointerCapture?.(e.pointerId);
      startDrag(e.clientX);
      const move = (ev) => moveDrag(ev.clientX);
      const up = (ev) => {
        endDrag();
        track.releasePointerCapture?.(ev.pointerId);
        window.removeEventListener("pointermove", move, true);
        window.removeEventListener("pointerup", up, true);
        window.removeEventListener("pointercancel", up, true);
      };
      window.addEventListener("pointermove", move, true);
      window.addEventListener("pointerup", up, true);
      window.addEventListener("pointercancel", up, true);
    };

    track.addEventListener("pointerdown", onPointerDown, true);
    fill.addEventListener("pointerdown", onPointerDown, true);
    knob.addEventListener("pointerdown", onPointerDown, true);

    track.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      commitFromPct(pctFromClientX(e.clientX));
    });
  } else {
    log("width track elements missing");
  }

  log("ready");
}


