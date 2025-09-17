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


// Hover Typo — Border Width (custom progressbar like button slider)
export function initHoverTypoAllBorderControls(getSelectedElement) {
  const root = document.getElementById("sc-widget-container") || document;

  // UI bits for the width slider
  const field = root.querySelector("#typo-all-hover-border-width-track");
  const fill  = root.querySelector("#typo-all-hover-border-width-fill");
  const bullet = root.querySelector("#typo-all-hover-border-width-knob");
  const valueText = root.querySelector("#typo-all-hover-border-width-value");

  // Side/style groups (for All/Top/Right/Bottom/Left + Solid/Dashed/Dotted)
  const sidePanel = root.querySelector("#typo-all-hover-border-sides");
  const stylePanel = root.querySelector("#typo-all-hover-border-style-wrap");

  // If the slider isn’t on the page, bail gracefully
  if (!field || !fill || !bullet || !valueText) return;

  // Range config (same style as your button slider)
  const max = Number(field.dataset.max ?? 20);
  const min = Number(field.dataset.min ?? 0);
  const step = Math.max(1, Number(field.dataset.step ?? 1));

  let widthVal = clamp(quant(Number(field.dataset.value ?? min), step), min, max);

  // --- utils
  function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }
  function quant(v, s)    { return Math.round(v / s) * s; }
  function toPercent(v)   { return ((v - min) / (max - min)) * 100; }

  function ensureId(el) {
    if (!el) return null;
    if (!el.id) el.id = "sc-el-" + Math.random().toString(36).slice(2, 9);
    return el.id;
  }

  function hoverSelectors(scopeId) {
    const parts = ["", " h1", " h2", " h3", " h4", " p", " a", " span"];
    return parts.map((s) => `#${scopeId}:hover${s}`);
  }

  function getSide() {
    return (sidePanel?.dataset.side || "all").toLowerCase();
  }

  function getStyle() {
    return (stylePanel?.dataset.style || "solid").toLowerCase();
  }

  function applyBorder() {
    const host = typeof getSelectedElement === "function" ? getSelectedElement() : getSelectedElement;
    if (!host) return;

    const id = ensureId(host);
    const tagId = `style-${id}-hover-border`;
    let tag = document.getElementById(tagId);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = tagId;
      document.head.appendChild(tag);
    }

    const side = getSide();
    const style = getStyle();
    const w = Math.max(0, Math.round(widthVal));

    const map =
      side === "all"
        ? { t: w, r: w, b: w, l: w }
        : {
            top:    { t: w, r: 0, b: 0, l: 0 },
            right:  { t: 0, r: w, b: 0, l: 0 },
            bottom: { t: 0, r: 0, b: w, l: 0 },
            left:   { t: 0, r: 0, b: 0, l: w },
          }[side] || { t: 0, r: 0, b: 0, l: 0 };

    const css = [
      `border-style:${style} !important`,
      `border-top-width:${map.t}px !important`,
      `border-right-width:${map.r}px !important`,
      `border-bottom-width:${map.b}px !important`,
      `border-left-width:${map.l}px !important`,
    ].join(";");

    tag.textContent = `${hoverSelectors(id).join(",")} { ${css}; }`;
  }

  function paint(val) {
    const pct = clamp(toPercent(val), 0, 100);
    fill.style.width = pct + "%";
    bullet.style.left = pct + "%";
    valueText.textContent = `${val}px`;
  }

  function updateUI(val) {
    widthVal = clamp(quant(val, step), min, max);
    // keep the latest in dataset (mirrors your pattern)
    field.dataset.value = String(widthVal);
    paint(widthVal);
    applyBorder();
  }

  // --- drag like button slider
  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const move = (eMove) => {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width || 0);
      const v = min + (x / (rect.width || 1)) * (max - min);
      updateUI(v);
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  // click on track (ignore when clicking the knob itself)
  field.addEventListener("click", (e) => {
    if (e.target === bullet) return;
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width || 0);
    const v = min + (x / (rect.width || 1)) * (max - min);
    updateUI(v);
  });

  // re-apply when side/style choice changes
  root.addEventListener(
    "pointerdown",
    (e) => {
      const sideBtn = e.target.closest?.(
        "#typo-all-hover-border-side-all, #typo-all-hover-border-side-top, #typo-all-hover-border-side-right, #typo-all-hover-border-side-bottom, #typo-all-hover-border-side-left"
      );
      if (sideBtn) {
        const panel = sideBtn.closest("#typo-all-hover-border-sides");
        if (panel) panel.dataset.side = (sideBtn.id || "").replace("typo-all-hover-border-side-", "").toLowerCase();
        // mimic active class flipping (keeps your UI in sync)
        panel?.querySelectorAll("div[id^='typo-all-hover-border-side-']").forEach((n) => {
          n.classList.remove("sc-bg-454545");
          if (!n.classList.contains("sc-bg-3f3f3f")) n.classList.add("sc-bg-3f3f3f");
        });
        sideBtn.classList.add("sc-bg-454545");
        sideBtn.classList.remove("sc-bg-3f3f3f");
        applyBorder();
        return;
      }

      const styleBtn = e.target.closest?.(
        "#typo-all-hover-border-style-solid, #typo-all-hover-border-style-dashed, #typo-all-hover-border-style-dotted"
      );
      if (styleBtn) {
        const panel = styleBtn.closest("#typo-all-hover-border-style-wrap");
        if (panel) panel.dataset.style = (styleBtn.id || "").replace("typo-all-hover-border-style-", "").toLowerCase();
        panel?.querySelectorAll("div[id^='typo-all-hover-border-style-']").forEach((n) => {
          n.classList.remove("sc-bg-454545");
          if (!n.classList.contains("sc-bg-3f3f3f")) n.classList.add("sc-bg-3f3f3f");
        });
        styleBtn.classList.add("sc-bg-454545");
        styleBtn.classList.remove("sc-bg-3f3f3f");
        applyBorder();
      }
    },
    true
  );

  // initial paint
  setTimeout(() => {
    // if dataset.value is missing, keep min (like your button init)
    updateUI(Number.isFinite(Number(field.dataset.value)) ? Number(field.dataset.value) : min);
  }, 50);
}






