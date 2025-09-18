export function initHoverTypoAllBorderControls(getSelectedElement) {
  if (document.body.dataset.scHoverTypoAllBorderBound === "1") return;
  const root = document.getElementById("sc-widget-container") || document;
  const track = root.querySelector("#typo-all-hover-border-width-track");
  const fill = root.querySelector("#typo-all-hover-border-width-fill");
  const knob = root.querySelector("#typo-all-hover-border-width-knob");
  const pill = root.querySelector("#typo-all-hover-border-width-value");
  if (!track || !fill || !knob) {
    requestAnimationFrame(() =>
      initHoverTypoAllBorderControls(getSelectedElement)
    );
    return;
  }
  document.body.dataset.scHoverTypoAllBorderBound = "1";
  const sidePanelSel = "#typo-all-hover-border-sides";
  const sideItemSel = [
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
  const ACTIVE = "sc-bg-454545";
  const INACTIVE = "sc-bg-3f3f3f";
  function markActive(panel, selector, btn, dataKey, stripPrefix) {
    panel.querySelectorAll(selector).forEach((n) => {
      n.classList.remove(ACTIVE);
      if (!n.classList.contains(INACTIVE)) n.classList.add(INACTIVE);
    });
    btn.classList.add(ACTIVE);
    btn.classList.remove(INACTIVE);
    if (dataKey && stripPrefix) {
      panel.dataset[dataKey] = (btn.id || "")
        .replace(stripPrefix, "")
        .toLowerCase();
    }
  }
  root.querySelectorAll(sidePanelSel).forEach((panel) => {
    const items = panel.querySelectorAll(sideItemSel);
    if (items[0])
      markActive(
        panel,
        sideItemSel,
        items[0],
        "side",
        "typo-all-hover-border-side-"
      );
  });
  root.querySelectorAll(stylePanelSel).forEach((panel) => {
    const items = panel.querySelectorAll(styleItemSel);
    if (items[0])
      markActive(
        panel,
        styleItemSel,
        items[0],
        "style",
        "typo-all-hover-border-style-"
      );
  });
  root.addEventListener(
    "pointerdown",
    (e) => {
      const sideBtn = e.target.closest(sideItemSel);
      if (sideBtn) {
        const panel = sideBtn.closest(sidePanelSel);
        if (!panel) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        markActive(
          panel,
          sideItemSel,
          sideBtn,
          "side",
          "typo-all-hover-border-side-"
        );
        const val = +((track && track.dataset.value) || 0);
        writeBorder(val);
        return;
      }
      const styleBtn = e.target.closest(styleItemSel);
      if (styleBtn) {
        const panel = styleBtn.closest(stylePanelSel);
        if (!panel) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        markActive(
          panel,
          styleItemSel,
          styleBtn,
          "style",
          "typo-all-hover-border-style-"
        );
        const val = +((track && track.dataset.value) || 0);
        writeBorder(val);
        return;
      }
    },
    true
  );
  knob.setAttribute("role", "slider");
  knob.tabIndex = knob.tabIndex || 0;
  track.style.touchAction = "none";
  knob.style.touchAction = "none";
  track.style.userSelect = "none";
  knob.style.userSelect = "none";
  const num = (v, d) => (v == null || v === "" || isNaN(+v) ? d : +v);
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const quant = (v, s) => Math.round(v / s) * s;
  function getRange() {
    return {
      min: num(track.dataset.min, 0),
      max: num(track.dataset.max, 20),
      step: Math.max(1, num(track.dataset.step, 1)),
    };
  }
  function ensureId(el) {
    if (!el) return null;
    if (!el.id) el.id = "sc-el-" + Math.random().toString(36).slice(2, 9);
    return el.id;
  }
  function hoverSelectors(scopeId) {
    const parts = ["", " h1", " h2", " h3", " h4", " p", " a", " span"];
    return parts.map((s) => `#${scopeId}:hover${s}`);
  }
  function writeBorder(widthPx) {
    const host =
      typeof getSelectedElement === "function"
        ? getSelectedElement()
        : getSelectedElement;
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
      root.querySelector(sidePanelSel)?.dataset.side || "all"
    ).toLowerCase();
    const style = (
      root.querySelector(stylePanelSel)?.dataset.style || "solid"
    ).toLowerCase();
    const w = Math.max(0, Math.round(widthPx));
    const map =
      side === "all"
        ? { t: w, r: w, b: w, l: w }
        : {
            top: { t: w, r: 0, b: 0, l: 0 },
            right: { t: 0, r: w, b: 0, l: 0 },
            bottom: { t: 0, r: 0, b: w, l: 0 },
            left: { t: 0, r: 0, b: 0, l: w },
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
  const rect = () => track.getBoundingClientRect();
  function pctFromX(clientX) {
    const r = rect();
    const x = clamp(clientX - r.left, 0, r.width);
    return r.width ? x / r.width : 0;
  }
  function setByPct(p) {
    const r = rect();
    const x = clamp(p * r.width, 0, r.width);
    fill.style.width = x + "px";
    knob.style.left = x + "px";
  }
  function valueFromPct(p) {
    const { min, max, step } = getRange();
    return quant(min + p * (max - min), step);
  }
  function setByValue(v) {
    const { min, max } = getRange();
    const p = clamp((v - min) / (max - min || 1), 0, 1);
    setByPct(p);
  }
  function commitFromPct(p) {
    const v = valueFromPct(p);
    track.dataset.value = String(v);
    if (pill) pill.textContent = `${v}px`;
    knob.setAttribute("aria-valuemin", String(getRange().min));
    knob.setAttribute("aria-valuemax", String(getRange().max));
    knob.setAttribute("aria-valuenow", String(v));
    setByValue(v);
    writeBorder(v);
  }
  function initPosition() {
    const initVal = num(track.dataset.value, getRange().min);
    setByValue(initVal);
    if (pill) pill.textContent = `${initVal}px`;
    knob.setAttribute("aria-valuenow", String(initVal));
    writeBorder(initVal);
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
  let dragging = false;
  let moved = false;
  const getX = (e) =>
    e?.clientX ??
    (e?.touches && e.touches[0] && e.touches[0].clientX) ??
    (e?.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX) ??
    0;
  const onPMove = (e) => move(e);
  const onPUp = (e) => end(e);
  const onMMove = (e) => move(e);
  const onMUp = (e) => end(e);
  const onTMove = (e) => move(e);
  const onTEnd = (e) => end(e);
  function bindMoves(bind) {
    if (bind) {
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
  function startDrag(e) {
    dragging = true;
    moved = false;
    if (e.pointerId != null && knob.setPointerCapture) {
      try {
        knob.setPointerCapture(e.pointerId);
      } catch {}
    }
    commitFromPct(pctFromX(getX(e)));
    bindMoves(true);
  }
  function move(e) {
    if (!dragging) return;
    if (e.cancelable) e.preventDefault();
    moved = true;
    commitFromPct(pctFromX(getX(e)));
  }
  function end(e) {
    if (!dragging) return;
    dragging = false;
    bindMoves(false);
    if (e && e.pointerId != null && knob.releasePointerCapture) {
      try {
        knob.releasePointerCapture(e.pointerId);
      } catch {}
    }
  }
  function bindPress(el) {
    const h = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      startDrag(e);
    };
    if ("PointerEvent" in window)
      el.addEventListener("pointerdown", h, { capture: true, passive: false });
    el.addEventListener("mousedown", h, true);
    el.addEventListener("touchstart", h, { capture: true, passive: false });
  }
  bindPress(track);
  bindPress(knob);
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
    else if (e.key === "Home") v = min;
    else if (e.key === "End") v = max;
    else return;
    e.preventDefault();
    track.dataset.value = String(v);
    if (pill) pill.textContent = `${v}px`;
    setByValue(v);
    writeBorder(v);
    knob.setAttribute("aria-valuenow", String(v));
  });
  track.addEventListener("dragstart", (e) => e.preventDefault());
  knob.addEventListener("dragstart", (e) => e.preventDefault());
}
