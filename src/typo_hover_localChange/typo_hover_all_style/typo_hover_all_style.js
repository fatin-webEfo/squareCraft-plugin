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


export function initHoverTypoAllBorderControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBorderBound === "1") return;
  document.body.dataset.scHoverTypoAllBorderBound = "1";

  const track = document.getElementById("typo-all-hover-border-width-track");
  const knob = document.getElementById("typo-all-hover-border-width-knob");
  const fill = document.getElementById("typo-all-hover-border-width-fill");
  const valueEl = document.getElementById("typo-all-hover-border-width-value");
  const sideAll = document.getElementById("typo-all-hover-border-side-all");
  const sideTop = document.getElementById("typo-all-hover-border-side-top");
  const sideBottom = document.getElementById(
    "typo-all-hover-border-side-bottom"
  );
  const sideLeft = document.getElementById("typo-all-hover-border-side-left");
  const sideRight = document.getElementById("typo-all-hover-border-side-right");
  const styleWrap = document.getElementById("typo-all-hover-border-style-wrap");
  const styleSolid = document.getElementById(
    "typo-all-hover-border-style-solid"
  );
  const styleDashed = document.getElementById(
    "typo-all-hover-border-style-dashed"
  );
  const styleDotted = document.getElementById(
    "typo-all-hover-border-style-dotted"
  );
  if (
    !track ||
    !knob ||
    !fill ||
    !sideAll ||
    !sideTop ||
    !sideBottom ||
    !sideLeft ||
    !sideRight ||
    !styleWrap ||
    !styleSolid ||
    !styleDashed ||
    !styleDotted
  )
    return;

  let pct = 0;
  let dragging = false;
  let styleKind = "solid";
  let sideMode = "all";

  function sel() {
    return typeof getSelectedElement === "function"
      ? getSelectedElement()
      : getSelectedElement;
  }

  function ensureId(el) {
    if (!el) return null;
    if (!el.id) el.id = "sc-el-" + Math.random().toString(36).slice(2, 9);
    return el.id;
  }

  function writeHoverBorderCss() {
    const host = sel();
    if (!host) return;
    const id = ensureId(host);
    const tagId = `style-${id}-hover-border`;
    let tag = document.getElementById(tagId);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = tagId;
      document.head.appendChild(tag);
    }
    const w = Math.round(pct);
    const map = {
      all: { top: w, right: w, bottom: w, left: w },
      top: { top: w, right: 0, bottom: 0, left: 0 },
      bottom: { top: 0, right: 0, bottom: w, left: 0 },
      left: { top: 0, right: 0, bottom: 0, left: w },
      right: { top: 0, right: w, bottom: 0, left: 0 },
    }[sideMode] || { top: 0, right: 0, bottom: 0, left: 0 };

    const rule = `
#${id}:hover,
#${id}:hover h1,#${id}:hover h2,#${id}:hover h3,#${id}:hover h4,
#${id}:hover p,#${id}:hover a,#${id}:hover span{
  border-style:${styleKind} !important;
  border-top-width:${map.top}px !important;
  border-right-width:${map.right}px !important;
  border-bottom-width:${map.bottom}px !important;
  border-left-width:${map.left}px !important;
}`;
    tag.textContent = rule;
    track.dispatchEvent(
      new CustomEvent("sc:hoverBorderApply", {
        detail: { percent: pct, style: styleKind, side: sideMode },
      })
    );
  }

  function setPercent(p) {
    pct = Math.max(0, Math.min(100, p));
    knob.style.position = "absolute";
    knob.style.left = pct + "%";
    fill.style.left = "0%";
    fill.style.width = pct + "%";
    knob.dataset.value = String(Math.round(pct));
    if (valueEl) valueEl.textContent = String(Math.round(pct));
    track.dispatchEvent(
      new CustomEvent("sc:hoverBorderWidthChange", { detail: { percent: pct } })
    );
    writeHoverBorderCss();
  }

  function percentFromClientX(clientX) {
    const r = track.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    return (x / r.width) * 100;
  }

  function start(e) {
    dragging = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setPercent(percentFromClientX(x));
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end, { once: true });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end, { once: true });
  }

  function move(e) {
    if (!dragging) return;
    if (e.cancelable) e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setPercent(percentFromClientX(x));
  }

  function end() {
    dragging = false;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("touchmove", move);
  }

  function nudge(delta) {
    setPercent(pct + delta);
  }

  function setActive(el, on) {
    if (!el) return;
    el.classList.toggle("sc-bg-454545", !!on);
  }

  function chooseSide(mode) {
    sideMode = mode;
    setActive(sideAll, mode === "all");
    setActive(sideTop, mode === "top");
    setActive(sideBottom, mode === "bottom");
    setActive(sideLeft, mode === "left");
    setActive(sideRight, mode === "right");
    track.dispatchEvent(
      new CustomEvent("sc:hoverBorderSideChange", {
        detail: { side: sideMode },
      })
    );
    writeHoverBorderCss();
  }

  function chooseStyle(kind) {
    styleKind = kind;
    setActive(styleSolid, kind === "solid");
    setActive(styleDashed, kind === "dashed");
    setActive(styleDotted, kind === "dotted");
    track.dispatchEvent(
      new CustomEvent("sc:hoverBorderStyleChange", {
        detail: { style: styleKind },
      })
    );
    writeHoverBorderCss();
  }

  track.addEventListener("pointerdown", start);
  knob.addEventListener("pointerdown", start);
  track.addEventListener("touchstart", start, { passive: false });
  knob.addEventListener("touchstart", start, { passive: false });
  track.addEventListener("click", (e) =>
    setPercent(percentFromClientX(e.clientX))
  );
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nudge(1);
    else if (e.key === "ArrowLeft") nudge(-1);
    else if (e.key === "Home") setPercent(0);
    else if (e.key === "End") setPercent(100);
  });

  sideAll.addEventListener("click", () => chooseSide("all"));
  sideTop.addEventListener("click", () => chooseSide("top"));
  sideBottom.addEventListener("click", () => chooseSide("bottom"));
  sideLeft.addEventListener("click", () => chooseSide("left"));
  sideRight.addEventListener("click", () => chooseSide("right"));

  styleSolid.addEventListener("click", () => chooseStyle("solid"));
  styleDashed.addEventListener("click", () => chooseStyle("dashed"));
  styleDotted.addEventListener("click", () => chooseStyle("dotted"));

  chooseSide("all");
  chooseStyle("solid");
  setPercent(0);
}

