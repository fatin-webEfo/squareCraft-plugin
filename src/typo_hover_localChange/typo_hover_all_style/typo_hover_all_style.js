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
  if (document.body.dataset.scInitHoverTypoAllBorderControls === "1") return;
  document.body.dataset.scInitHoverTypoAllBorderControls = "1";

  const track = document.getElementById("typo-all-hover-border-width-track");
  const fill = document.getElementById("typo-all-hover-border-width-fill");
  const knob = document.getElementById("typo-all-hover-border-width-knob");
  const count = document.getElementById("typo-all-hover-border-width-value");

  const sideAll = document.getElementById("typo-all-hover-border-side-all");
  const sideTop = document.getElementById("typo-all-hover-border-side-top");
  const sideBottom = document.getElementById(
    "typo-all-hover-border-side-bottom"
  );
  const sideLeft = document.getElementById("typo-all-hover-border-side-left");
  const sideRight = document.getElementById("typo-all-hover-border-side-right");

  if (
    !track ||
    !fill ||
    !knob ||
    !count ||
    !sideAll ||
    !sideTop ||
    !sideBottom ||
    !sideLeft ||
    !sideRight
  )
    return;

  const min = Number(track.dataset.min ?? 0);
  const max = Number(track.dataset.max ?? 20);
  const step = Math.max(1, Number(track.dataset.step ?? 1));

  function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n));
  }
  function quant(v, s) {
    return Math.round(v / s) * s;
  }
  function toPercent(v) {
    return ((v - min) / (max - min)) * 100;
  }

  function fromClientX(clientX) {
    const r = track.getBoundingClientRect();
    const x = clamp(clientX - r.left, 0, r.width || 0);
    const p = r.width ? x / r.width : 0;
    return quant(min + p * (max - min), step);
  }

  function currentValue() {
    const raw = Number(track.dataset.value);
    if (Number.isFinite(raw)) return clamp(quant(raw, step), min, max);
    return min;
  }

  function paint(v) {
    const pct = clamp(toPercent(v), 0, 100);
    fill.style.width = pct + "%";
    knob.style.left = pct + "%";
    count.textContent = `${v}px`;
  }

  function getActiveSides() {
    const isOn = (el) =>
      el.classList.contains("sc-activeTab-border") &&
      !el.classList.contains("sc-inActiveTab-border");
    if (isOn(sideAll))
      return { top: true, right: true, bottom: true, left: true };
    return {
      top: isOn(sideTop),
      right: isOn(sideRight),
      bottom: isOn(sideBottom),
      left: isOn(sideLeft),
    };
  }

  function ensureId(el) {
    if (!el.id) el.id = `sc-typo-${Math.random().toString(36).slice(2, 9)}`;
    return el.id;
  }

  function writeBorder(v) {
    const selected =
      typeof getSelectedElement === "function" ? getSelectedElement() : null;
    if (!selected) return;
    const sides = getActiveSides();
    const id = ensureId(selected);
    const t = sides.top ? v : 0;
    const r = sides.right ? v : 0;
    const b = sides.bottom ? v : 0;
    const l = sides.left ? v : 0;
    let tag = document.getElementById(`sc-hover-border-${id}`);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = `sc-hover-border-${id}`;
      document.head.appendChild(tag);
    }
    tag.textContent = `#${CSS.escape(
      id
    )}:hover{border-style:solid;border-color:currentColor;border-width:${t}px ${r}px ${b}px ${l}px !important}`;
    selected.dataset.scHoverBorderWidth = String(v);
  }

  function setValue(v) {
    const val = clamp(quant(v, step), min, max);
    track.dataset.value = String(val);
    paint(val);
    writeBorder(val);
  }

  let dragging = false;

  knob.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragging = true;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    setValue(fromClientX(e.clientX));
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });

  track.addEventListener("click", (e) => {
    if (e.target === knob) return;
    setValue(fromClientX(e.clientX));
  });

  [sideAll, sideTop, sideRight, sideBottom, sideLeft].forEach((el) => {
    el.addEventListener("click", () => {
      const v = currentValue();
      writeBorder(v);
    });
  });

  setTimeout(() => setValue(currentValue()), 0);
}







