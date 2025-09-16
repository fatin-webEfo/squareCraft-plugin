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

  const root = document.getElementById("sc-widget-container") || document;
  const sel =
    typeof getSelectedElement === "function"
      ? getSelectedElement
      : () => getSelectedElement;

  const ids = {
    sidesWrap: "#typo-all-hover-border-sides",
    sideAll: "#typo-all-hover-border-side-all",
    sideTop: "#typo-all-hover-border-side-top",
    sideBottom: "#typo-all-hover-border-side-bottom",
    sideLeft: "#typo-all-hover-border-side-left",
    sideRight: "#typo-all-hover-border-side-right",
    styleWrap: "#typo-all-hover-border-style-wrap",
    styleSolid: "#typo-all-hover-border-style-solid",
    styleDashed: "#typo-all-hover-border-style-dashed",
    styleDotted: "#typo-all-hover-border-style-dotted",
    track: "#typo-all-hover-border-width-track",
    fill: "#typo-all-hover-border-width-fill",
    knob: "#typo-all-hover-border-width-knob",
  };

  function q(s, scope = root) {
    return scope.querySelector(s);
  }
  function qa(s, scope = root) {
    return Array.from(scope.querySelectorAll(s));
  }

  let side = "all";
  let bstyle = "solid";
  let pct = 0;
  let dragging = false;

  function setActive(el, yes) {
    if (!el) return;
    el.classList.toggle("sc-activeTab-border", !!yes);
    el.classList.toggle("sc-inActiveTab-border", !yes);
  }

  function setSide(next) {
    side = next;
    const map = {
      all: q(ids.sideAll),
      top: q(ids.sideTop),
      bottom: q(ids.sideBottom),
      left: q(ids.sideLeft),
      right: q(ids.sideRight),
    };
    Object.entries(map).forEach(([k, node]) => setActive(node, k === next));
    const track = q(ids.track);
    if (track)
      track.dispatchEvent(
        new CustomEvent("sc:hoverBorderSideChange", { detail: { side: next } })
      );
  }

  function setStyle(next) {
    bstyle = next;
    const map = {
      solid: q(ids.styleSolid),
      dashed: q(ids.styleDashed),
      dotted: q(ids.styleDotted),
    };
    Object.entries(map).forEach(([k, node]) => setActive(node, k === next));
    const track = q(ids.track);
    if (track)
      track.dispatchEvent(
        new CustomEvent("sc:hoverBorderStyleChange", {
          detail: { style: next },
        })
      );
  }

  function setPercent(p) {
    pct = Math.max(0, Math.min(100, p));
    const track = q(ids.track);
    const fill = q(ids.fill);
    const knob = q(ids.knob);
    if (!track || !fill || !knob) return;

    track.style.position = "relative";
    fill.style.position = "absolute";
    fill.style.left = "0%";
    fill.style.top = "0";
    fill.style.height = "100%";
    fill.style.width = pct + "%";

    knob.style.position = "absolute";
    knob.style.top = "50%";
    knob.style.left = pct + "%";
    knob.style.transform = "translate(-50%, -50%)";

    knob.dataset.value = String(Math.round(pct));

    track.dispatchEvent(
      new CustomEvent("sc:hoverBorderWidthChange", { detail: { percent: pct } })
    );
  }

  function percentFromClientX(clientX) {
    const track = q(ids.track);
    if (!track) return 0;
    const r = track.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    return (x / r.width) * 100;
  }

  function startDrag(e) {
    const knob = q(ids.knob);
    if (!knob) return;
    dragging = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setPercent(percentFromClientX(x));
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag, { once: true });
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("touchend", endDrag, { once: true });
  }

  function moveDrag(e) {
    if (!dragging) return;
    if (e.cancelable) e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setPercent(percentFromClientX(x));
  }

  function endDrag() {
    dragging = false;
    window.removeEventListener("pointermove", moveDrag);
    window.removeEventListener("touchmove", moveDrag);
  }

  function nudge(delta) {
    setPercent(pct + delta);
  }

  const track = q(ids.track);
  const knob = q(ids.knob);
  const fill = q(ids.fill);

  if (track && knob && fill) {
    track.addEventListener("pointerdown", (e) => {
      startDrag(e);
    });
    knob.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      startDrag(e);
    });
    track.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        startDrag(e);
      },
      { passive: false }
    );
    knob.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        startDrag(e);
      },
      { passive: false }
    );

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
  }

  const sideEls = [
    [ids.sideAll, "all"],
    [ids.sideTop, "top"],
    [ids.sideBottom, "bottom"],
    [ids.sideLeft, "left"],
    [ids.sideRight, "right"],
  ];
  sideEls.forEach(([selId, key]) => {
    const n = q(selId);
    if (!n) return;
    n.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSide(key);
    });
  });

  const styleEls = [
    [ids.styleSolid, "solid"],
    [ids.styleDashed, "dashed"],
    [ids.styleDotted, "dotted"],
  ];
  styleEls.forEach(([selId, key]) => {
    const n = q(selId);
    if (!n) return;
    n.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setStyle(key);
    });
  });

  setSide("all");
  setStyle("solid");
  setPercent(0);

  const target = sel && sel();
  if (target && !target.dataset.scHoverTypoAllBorderApplied) {
    target.dataset.scHoverTypoAllBorderApplied = "1";
  }
}
