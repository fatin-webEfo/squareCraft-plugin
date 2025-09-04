export function initHoverTypoAllFontControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBound === "1") {
    console.warn("[hover-typo-all] already bound, skipping");
    return;
  }
  document.body.dataset.scHoverTypoAllBound = "1";

  const log = (...a) => console.log("[hover-typo-all]", ...a);

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
  if (document.body.dataset.scHoverBorderAllBound === "1") return;
  document.body.dataset.scHoverBorderAllBound = "1";

  const section = document.getElementById("typo-all-hover-border-section");
  if (!section) return;

  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;

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
    const host = ["#" + scopeId + ":hover"];
    const base = Object.values(TYPE_TO_SELECTOR).map(
      (s) => `#${scopeId}:hover ${s}`
    );
    const base2 = [];
    for (let i = 0; i < base.length; i++) {
      base2.push(base[i], `${base[i]} span`, `${base[i]} a`);
    }
    const selfBase = Object.values(TYPE_TO_SELECTOR).map(
      (s) => `#${scopeId} ${s}:hover`
    );
    const self2 = [];
    for (let i = 0; i < selfBase.length; i++) {
      self2.push(selfBase[i], `${selfBase[i]} span`, `${selfBase[i]} a`);
    }
    return host.concat(base2, self2);
  }
  function getCtx() {
    const host = sel && sel();
    if (!host) return {};
    const id = ensureId(host);
    const tagId = `style-${id}-hover-border`;
    let tag = document.getElementById(tagId);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = tagId;
      document.head.appendChild(tag);
    }
    window.__sc_extcss_hover = window.__sc_extcss_hover || {};
    window.__sc_extcss_hover[id] = window.__sc_extcss_hover[id] || {};
    return { id, tag, bag: window.__sc_extcss_hover[id] };
  }
  function flush() {
    const ctx = getCtx();
    if (!ctx.id || !ctx.tag || !ctx.bag) return;
    const parts = [];
    for (const k in ctx.bag) parts.push(`${k}: ${ctx.bag[k]} !important;`);
    ctx.tag.textContent = `${hoverSelectors(ctx.id).join(", ")} { ${parts.join(
      " "
    )} }`;
  }
  function setProps(obj) {
    const ctx = getCtx();
    if (!ctx.bag) return;
    for (const k in obj) ctx.bag[k] = obj[k];
    flush();
  }
  function removeKeys(keys) {
    const ctx = getCtx();
    if (!ctx.bag) return;
    for (let i = 0; i < keys.length; i++) delete ctx.bag[keys[i]];
    flush();
  }
  function parseColor(s) {
    if (!s) return "";
    const x = String(s).trim();
    return x;
  }

  let activeSide = "all";
  let borderStyle = "solid";

  function commitBorderWidth(px) {
    const v = Math.max(0, Math.round(px)) + "px";
    if (activeSide === "all") {
      removeKeys([
        "border-top-width",
        "border-right-width",
        "border-bottom-width",
        "border-left-width",
      ]);
      setProps({ "border-width": v });
    } else {
      const key = `border-${activeSide}-width`;
      setProps({ [key]: v });
    }
  }
  function commitBorderStyle(style) {
    borderStyle = style;
    if (activeSide === "all") {
      removeKeys([
        "border-top-style",
        "border-right-style",
        "border-bottom-style",
        "border-left-style",
      ]);
      setProps({ "border-style": style });
    } else {
      const key = `border-${activeSide}-style`;
      setProps({ [key]: style });
    }
  }
  function commitBorderColor(color) {
    const c = parseColor(color);
    if (!c) return;
    if (activeSide === "all") {
      removeKeys([
        "border-top-color",
        "border-right-color",
        "border-bottom-color",
        "border-left-color",
      ]);
      setProps({ "border-color": c });
    } else {
      const key = `border-${activeSide}-color`;
      setProps({ [key]: c });
    }
  }
  function commitBorderRadius(px) {
    const v = Math.max(0, Math.round(px)) + "px";
    setProps({ "border-radius": v });
  }

  function bindSlider(trackEl, fillEl, knobEl, maxPx, onChange) {
    if (!trackEl || !fillEl || !knobEl) return;
    function setFromClientX(x) {
      const r = trackEl.getBoundingClientRect();
      const t = Math.min(Math.max(0, x - r.left), r.width);
      const ratio = r.width ? t / r.width : 0;
      const px = Math.round(ratio * maxPx);
      const pct = (px / maxPx) * 100;
      fillEl.style.width = pct + "%";
      const half = (knobEl.offsetWidth || 6) / 2;
      knobEl.style.left = `calc(${pct}% - ${half}px)`;
      onChange(px);
    }
    function setFromPx(px) {
      const pct = Math.max(0, Math.min(100, (px / maxPx) * 100));
      fillEl.style.width = pct + "%";
      const half = (knobEl.offsetWidth || 6) / 2;
      knobEl.style.left = `calc(${pct}% - ${half}px)`;
      onChange(px);
    }
    let dragging = false;
    trackEl.addEventListener("pointerdown", (e) => {
      dragging = true;
      try {
        trackEl.setPointerCapture(e.pointerId);
      } catch {}
      setFromClientX(e.clientX);
    });
    trackEl.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      setFromClientX(e.clientX);
    });
    trackEl.addEventListener("pointerup", (e) => {
      dragging = false;
      try {
        trackEl.releasePointerCapture(e.pointerId);
      } catch {}
    });
    setFromPx(0);
  }

  const sideAll = document.getElementById("typo-all-hover-border-side-all");
  const sideTop = document.getElementById("typo-all-hover-border-side-top");
  const sideBottom = document.getElementById(
    "typo-all-hover-border-side-bottom"
  );
  const sideLeft = document.getElementById("typo-all-hover-border-side-left");
  const sideRight = document.getElementById("typo-all-hover-border-side-right");
  const sidesArr = [sideAll, sideTop, sideBottom, sideLeft, sideRight];

  function setActiveSide(side) {
    activeSide = side;
    for (let i = 0; i < sidesArr.length; i++)
      sidesArr[i] && sidesArr[i].classList.remove("sc-bg-454545");
    if (side === "all" && sideAll) sideAll.classList.add("sc-bg-454545");
    if (side === "top" && sideTop) sideTop.classList.add("sc-bg-454545");
    if (side === "bottom" && sideBottom)
      sideBottom.classList.add("sc-bg-454545");
    if (side === "left" && sideLeft) sideLeft.classList.add("sc-bg-454545");
    if (side === "right" && sideRight) sideRight.classList.add("sc-bg-454545");
    commitBorderStyle(borderStyle);
  }

  sideAll && sideAll.addEventListener("click", () => setActiveSide("all"));
  sideTop && sideTop.addEventListener("click", () => setActiveSide("top"));
  sideBottom &&
    sideBottom.addEventListener("click", () => setActiveSide("bottom"));
  sideLeft && sideLeft.addEventListener("click", () => setActiveSide("left"));
  sideRight &&
    sideRight.addEventListener("click", () => setActiveSide("right"));

  const styleSolid = document.getElementById(
    "typo-all-hover-border-style-solid"
  );
  const styleDashed = document.getElementById(
    "typo-all-hover-border-style-dashed"
  );
  const styleDotted = document.getElementById(
    "typo-all-hover-border-style-dotted"
  );
  const stylesArr = [styleSolid, styleDashed, styleDotted];

  function setActiveStyle(style) {
    borderStyle = style;
    for (let i = 0; i < stylesArr.length; i++)
      stylesArr[i] && stylesArr[i].classList.remove("sc-bg-454545");
    if (style === "solid" && styleSolid)
      styleSolid.classList.add("sc-bg-454545");
    if (style === "dashed" && styleDashed)
      styleDashed.classList.add("sc-bg-454545");
    if (style === "dotted" && styleDotted)
      styleDotted.classList.add("sc-bg-454545");
    commitBorderStyle(style);
  }

  styleSolid &&
    styleSolid.addEventListener("click", () => setActiveStyle("solid"));
  styleDashed &&
    styleDashed.addEventListener("click", () => setActiveStyle("dashed"));
  styleDotted &&
    styleDotted.addEventListener("click", () => setActiveStyle("dotted"));

  const widthVal = document.getElementById("typo-all-hover-border-width-value");
  const widthTrack = document.getElementById(
    "typo-all-hover-border-width-track"
  );
  const widthFill = document.getElementById("typo-all-hover-border-width-fill");
  const widthKnob = document.getElementById("typo-all-hover-border-width-knob");

  bindSlider(widthTrack, widthFill, widthKnob, 20, (px) => {
    if (widthVal) widthVal.textContent = px + "px";
    commitBorderWidth(px);
  });

  const radiusVal = document.getElementById(
    "typo-all-hover-border-radius-value"
  );
  const radiusTrack = document.getElementById(
    "typo-all-hover-border-radius-track"
  );
  const radiusFill = document.getElementById(
    "typo-all-hover-border-radius-fill"
  );
  const radiusKnob = document.getElementById(
    "typo-all-hover-border-radius-knob"
  );

  bindSlider(radiusTrack, radiusFill, radiusKnob, 40, (px) => {
    if (radiusVal) radiusVal.textContent = px + "px";
    commitBorderRadius(px);
  });

  const colorChip = document.getElementById("typo-all-hover-border-color-chip");
  const colorDropdown = document.getElementById(
    "typo-all-hover-border-color-dropdown"
  );

  colorChip &&
    colorChip.addEventListener("click", () => {
      const c = getComputedStyle(colorChip).backgroundColor;
      commitBorderColor(c);
    });

  colorDropdown &&
    colorDropdown.addEventListener("click", (e) => {
      const t = e.target;
      const c = t && t.dataset ? t.dataset.color : null;
      if (c) {
        commitBorderColor(c);
        if (colorChip) colorChip.style.background = c;
      }
    });

  document.addEventListener("sc-color-picked", (e) => {
    const c = e && e.detail ? e.detail.color : "";
    if (!c) return;
    commitBorderColor(c);
    if (colorChip) colorChip.style.background = c;
  });

  const resetBtn = document.getElementById("typo-all-outline-reset");
  resetBtn &&
    resetBtn.addEventListener("click", () => {
      const ctx = getCtx();
      if (ctx.bag) {
        for (const k in ctx.bag) if (k.startsWith("border-")) delete ctx.bag[k];
        flush();
      }
      if (widthVal) widthVal.textContent = "0px";
      if (radiusVal) radiusVal.textContent = "0px";
      if (widthFill) widthFill.style.width = "0%";
      if (radiusFill) radiusFill.style.width = "0%";
      if (widthKnob) widthKnob.style.left = "calc(0% - 6px)";
      if (radiusKnob) radiusKnob.style.left = "calc(0% - 6px)";
      setActiveSide("all");
      setActiveStyle("solid");
    });

  setActiveSide("all");
  setActiveStyle("solid");
}
