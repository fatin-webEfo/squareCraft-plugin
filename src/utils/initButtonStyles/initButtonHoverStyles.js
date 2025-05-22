const hoverShadowState = {
    Xaxis: 0,
    Yaxis: 0,
    Blur: 0,
    Spread: 0
  };
  
export function initHoverButtonShadowControls(getSelectedElement) {
  function applyHoverShadow() {
    const el = getSelectedElement?.();
    if (!el) return;

    const typeSelectors = [
      "a.sqs-button-element--primary",
      "a.sqs-button-element--secondary",
      "a.sqs-button-element--tertiary"
    ];

    let selectedButton;
    for (const selector of typeSelectors) {
      const btn = el.querySelector(selector);
      if (btn) {
        selectedButton = btn;
        break;
      }
    }

    if (!selectedButton) return;

    const buttonType = [...selectedButton.classList].find(cls =>
      cls.startsWith("sqs-button-element--")
    );
    if (!buttonType) return;

    const styleId = `sc-hover-shadow-${buttonType.replace(/--/g, "-")}`;
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const shadowValue = `${hoverShadowState.Xaxis}px ${hoverShadowState.Yaxis}px ${hoverShadowState.Blur}px ${hoverShadowState.Spread}px rgba(0,0,0,0.3)`;
    styleTag.innerHTML = `
      a.${buttonType}:hover {
        box-shadow: ${shadowValue} !important;
      }
    `;
  }

  function setupHoverShadowControl(type, max = 50) {
    const bullet = document.getElementById(`hover-buttonShadow${type}Bullet`);
    const field = document.getElementById(`hover-buttonShadow${type}Field`);
    const label = document.getElementById(`hover-buttonShadow${type}Count`);
    const incBtn = document.getElementById(`hover-ButtonShadow${type}Increase`);
    const decBtn = document.getElementById(`hover-ButtonShadow${type}Decrease`);

    if (!bullet || !field || !label) return;

    let fill = field.querySelector(".sc-shadow-fill");
    if (!fill) {
      fill = document.createElement("div");
      fill.className = "sc-shadow-fill";
      fill.style.position = "absolute";
      fill.style.top = "0";
      fill.style.left = "0";
      fill.style.height = "100%";
      fill.style.width = "0%";
      fill.style.backgroundColor = "#EF7C2F";
      fill.style.zIndex = "0";
      field.insertBefore(fill, bullet);
    }

    function update(val) {
      hoverShadowState[type] = Math.max(0, Math.min(max, val));
      const percent = (hoverShadowState[type] / max) * 100;
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      label.textContent = `${hoverShadowState[type]}px`;
      applyHoverShadow();
    }

    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const value = Math.round((x / rect.width) * max);
      update(value);
    }

    bullet.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const move = (eMove) => updateUI(eMove.clientX);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    field.addEventListener("click", (e) => updateUI(e.clientX));
    incBtn?.addEventListener("click", () => update(hoverShadowState[type] + 1));
    decBtn?.addEventListener("click", () => update(hoverShadowState[type] - 1));
    update(hoverShadowState[type] || 0);
  }

  setupHoverShadowControl("Xaxis", 30);
  setupHoverShadowControl("Yaxis", 30);
  setupHoverShadowControl("Blur", 50);
  setupHoverShadowControl("Spread", 30);
}



let hoverRotationInitialized = false;

export function initHoverButtonIconRotationControl(getSelectedElement) {
  if (hoverRotationInitialized) return;
  hoverRotationInitialized = true;

  const bullet = document.getElementById("hover-buttonIconRotationradiousBullet");
  const fill = document.getElementById("hover-buttonIconRotationradiousFill");
  const field = document.getElementById("hover-buttonIconRotationradiousField");
  const label = document.getElementById("hover-buttoniconRotationradiousCount");
  const incBtn = document.getElementById("hover-iconRotationIncrease");
  const decBtn = document.getElementById("hover-iconRotationDecrease");

  if (!bullet || !fill || !field || !label) return;

  let value = 0;
  const min = -180;
  const max = 180;
  let hasInteracted = false;

  function applyStyle() {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;

    const cls = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    if (!cls) return;

    const id = `sc-hover-style-transform-${cls.replace(/--/g, "-")}`;
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }

    style.innerHTML = `a.${cls}:hover .sqscraft-button-icon { transform: rotate(${value}deg) !important; }`;
  }

  function updateUI() {
    const percent = ((value - min) / (max - min)) * 100;
    bullet.style.left = `${percent}%`;
    fill.style.left = hasInteracted ? `${Math.min(percent, 50)}%` : `50%`;
    fill.style.width = `${Math.abs(percent - 50)}%`;
    label.textContent = `${value}deg`;
    applyStyle();
    console.log(`📦 Hover Icon Rotation: ${value}deg, Progress: ${percent.toFixed(2)}%`);
  }

  function setValue(newVal, reason = "") {
    const oldValue = value;
    value = Math.max(min, Math.min(max, newVal));
    updateUI();

    if (value === oldValue && reason !== "initial sync") {
      console.warn(`⚠️ Hover rotation didn't change from ${oldValue} ➝ ${newVal}`);
    } else {
      console.log(`🧭 arrow ${reason || 'set'} set rotation: ${oldValue} ➝ ${value}`);
    }
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    hasInteracted = true;
    const rect = field.getBoundingClientRect();
    const move = (eMove) => {
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      const mapped = min + ((x / rect.width) * (max - min));
      setValue(Math.round(mapped), "drag");
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  field.addEventListener("click", (e) => {
    hasInteracted = true;
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const mapped = min + ((x / rect.width) * (max - min));
    setValue(Math.round(mapped), "click");
  });

  incBtn?.addEventListener("click", () => {
    hasInteracted = true;
    setValue(value + 1, "increase");
  });

  decBtn?.addEventListener("click", () => {
    hasInteracted = true;
    setValue(value - 1, "decrease");
  });

  setTimeout(() => {
    const selected = getSelectedElement?.();
    const icon = selected?.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
    if (icon) {
      const match = icon.style.transform?.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
      if (match) {
        const rotation = parseFloat(match[1]);
        if (!isNaN(rotation)) {
          console.log("🧲 Hover Rotation synced from transform:", rotation);
          setValue(rotation, "initial sync");
          return;
        }
      }
    }
    setValue(0, "initial sync");
  }, 50);
}


let hoverSizeInitialized = false;

export function initHoverButtonIconSizeControl(getSelectedElement) {
  if (hoverSizeInitialized) return;
  hoverSizeInitialized = true;

  const bullet = document.getElementById("hover-buttonIconSizeradiousBullet");
  const fill = document.getElementById("hover-buttonIconSizeradiousFill");
  const field = document.getElementById("hover-buttonIconSizeradiousField");
  const label = document.getElementById("hover-buttoniconSizeradiousCount");
  const incBtn = document.getElementById("hover-iconSizeIncrease");
  const decBtn = document.getElementById("hover-iconSizeDecrease");

  if (!bullet || !fill || !field || !label) return;

  let value = 0;
  const max = 50;

  function applyStyle() {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;

    const cls = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    if (!cls) return;

    const id = `sc-hover-style-size-${cls.replace(/--/g, "-")}`;
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }

    style.innerHTML = `a.${cls}:hover .sqscraft-button-icon { width: ${value}px !important; height: auto !important; }`;
  }

  function updateUI() {
    const percent = (value / max) * 100;
    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
    label.textContent = `${value}px`;
    applyStyle();
    console.log(`📦 Hover Icon Size: ${value}px, Progress: ${percent.toFixed(2)}%`);
  }

  function setValue(newVal, reason = "") {
    const oldValue = value;
    value = Math.max(0, Math.min(max, newVal));
    updateUI();

    if (value === oldValue && reason !== "initial sync") {
      console.warn(`⚠️ setValue() failed to increase from ${oldValue} ➝ ${newVal}`);
    } else {
      console.log(`🧭 arrow ${reason || 'set'} set value: ${oldValue} ➝ ${value}`);
    }
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const move = (eMove) => {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      const mapped = (x / rect.width) * max;
      setValue(Math.round(mapped), "drag");
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  field.addEventListener("click", (e) => {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const mapped = (x / rect.width) * max;
    setValue(Math.round(mapped), "click");
  });

  incBtn?.addEventListener("click", () => setValue(value + 1, "increase"));
  decBtn?.addEventListener("click", () => setValue(value - 1, "decrease"));

  setTimeout(() => {
    const selected = getSelectedElement?.();
    const icon = selected?.querySelector(".sqscraft-button-icon, .sqscraft-image-icon");
    if (!icon || !icon.style.width) return;
    const size = parseInt(icon.style.width);
    if (!isNaN(size)) {
      console.log("🧲 One-time initial sync from icon width:", size);
      setValue(size, "initial sync");
    }
  }, 50);
}


let hoverSpacingInitialized = false;

export function initHoverButtonIconSpacingControl(getSelectedElement) {
  if (hoverSpacingInitialized) return;
  hoverSpacingInitialized = true;

  const bullet = document.getElementById("hover-buttonIconSpacingradiousBullet");
  const fill = document.getElementById("hover-buttonIconSpacingradiousFill");
  const field = document.getElementById("hover-buttonIconSpacingradiousField");
  const label = document.getElementById("hover-buttoniconSpacingradiousCount");
  const incBtn = document.getElementById("hover-iconSpacingIncrease");
  const decBtn = document.getElementById("hover-iconSpacingDecrease");

  if (!bullet || !fill || !field || !label) return;

  let value = 0;
  const max = 30;

  function applyStyle() {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;

    const cls = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    if (!cls) return;

    const id = `sc-hover-style-gap-${cls.replace(/--/g, "-")}`;
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }

    style.innerHTML = `a.${cls}:hover { gap: ${value}px !important; }`;
  }

  function updateUI() {
    const percent = (value / max) * 100;
    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
    label.textContent = `${value}px`;
    applyStyle();
    console.log(`📦 Hover Icon Spacing: ${value}px, Progress: ${percent.toFixed(2)}%`);
  }

  function setValue(newVal, reason = "") {
    const oldValue = value;
    value = Math.max(0, Math.min(max, newVal));
    updateUI();

    if (value === oldValue && reason !== "initial sync") {
      console.warn(`⚠️ Hover spacing didn't change from ${oldValue} ➝ ${newVal}`);
    } else {
      console.log(`🧭 arrow ${reason || 'set'} set spacing: ${oldValue} ➝ ${value}`);
    }
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const move = (eMove) => {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      const mapped = (x / rect.width) * max;
      setValue(Math.round(mapped), "drag");
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  field.addEventListener("click", (e) => {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const mapped = (x / rect.width) * max;
    setValue(Math.round(mapped), "click");
  });

  incBtn?.addEventListener("click", () => setValue(value + 1, "increase"));
  decBtn?.addEventListener("click", () => setValue(value - 1, "decrease"));

  setTimeout(() => {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (btn) {
      const gap = parseInt(window.getComputedStyle(btn).gap);
      if (!isNaN(gap)) {
        console.log("🧲 Hover Spacing synced from gap:", gap);
        setValue(gap, "initial sync");
      }
    }
  }, 50);
}


let hoverRadiusInitialized = false;

export function initHoverButtonBorderRadiusControl(getSelectedElement) {
  if (hoverRadiusInitialized) return;
  hoverRadiusInitialized = true;

  const fillField = document.getElementById("hover-buttonBorderRadiousField");
  const bullet = document.getElementById("hover-buttonBorderRadiousBullet");
  const fill = document.getElementById("hover-buttonBorderRadiousFill");
  const valueText = document.getElementById("hover-buttonBorderRadiousCount");
  const incBtn = document.getElementById("hover-buttonBorderRadiousIncrease");
  const decBtn = document.getElementById("hover-buttonBorderRadiousDecrease");
  const resetBtn = fillField?.previousElementSibling?.querySelector("img[alt='reset']");

  if (!fillField || !bullet || !fill || !valueText) return;

  let value = 0;

  function apply() {
    const el = getSelectedElement?.();
    if (!el) return;
    const btn = el.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;
    const cls = btn.classList.contains("sqs-button-element--secondary") ? "sqs-button-element--secondary" :
                btn.classList.contains("sqs-button-element--tertiary") ? "sqs-button-element--tertiary" :
                "sqs-button-element--primary";
    const id = `sc-hover-radius-${cls.replace(/--/g, "-")}`;
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }
    style.innerHTML = `
      a.${cls}:hover {
        border-radius: ${value}px !important;
        overflow: hidden !important;
      }
      a.${cls}:hover span,
      a.${cls}:hover .sqs-add-to-cart-button-inner {
        border-radius: ${value}px !important;
      }
    `;
  }

  function update(val) {
    value = Math.max(0, Math.min(50, val));
    const percent = (value / 50) * 100;
    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
    valueText.textContent = `${value}px`;
    apply();
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const move = (eMove) => {
      const rect = fillField.getBoundingClientRect();
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      update(Math.round((x / rect.width) * 50));
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  fillField.addEventListener("click", (e) => {
    const rect = fillField.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    update(Math.round((x / rect.width) * 50));
  });

  incBtn?.addEventListener("click", () => update(value + 1));
  decBtn?.addEventListener("click", () => update(value - 1));
  resetBtn?.addEventListener("click", () => update(0));
}


export function initHoverButtonBorderTypeToggle(getSelectedElement) {
    const typeButtons = [
      { id: "hover-buttonBorderTypeSolid", type: "solid" },
      { id: "hover-buttonBorderTypeDashed", type: "dashed" },
      { id: "hover-buttonBorderTypeDotted", type: "dotted" }
    ];
  
    typeButtons.forEach(({ id, type }) => {
      const el = document.getElementById(id);
      if (!el) return;
  
      el.onclick = () => {
        typeButtons.forEach(({ id }) => {
          const btn = document.getElementById(id);
          btn?.classList.remove("sc-bg-454545");
        });
  
        el.classList.add("sc-bg-454545");
  
        const selectedElement = getSelectedElement?.();
        if (!selectedElement) return;
  
        const sample = selectedElement.querySelector(
          "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
        );
        if (!sample) return;
  
        const typeClass = [...sample.classList].find(cls =>
          cls.startsWith("sqs-button-element--")
        );
        if (!typeClass) return;
  
        const styleId = `sc-hover-border-style-${typeClass.replace(/--/g, "-")}`;
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = styleId;
          document.head.appendChild(styleTag);
        }
  
        styleTag.innerHTML = `a.${typeClass}:hover { border-style: ${type} !important; }`;
      };
    });
  }
  

let hoverBorderInitialized = false;

export function initHoverButtonBorderControl(getSelectedElement) {
  if (hoverBorderInitialized) return;
  hoverBorderInitialized = true;

  const fill = document.getElementById("hover-buttonBorderFill");
  const bullet = document.getElementById("hover-buttonBorderBullet");
  const field = document.getElementById("hover-buttonBorderField");
  const valueText = document.getElementById("hover-buttonBorderCount");
  const incBtn = document.getElementById("hover-BorderIncrease");
  const decBtn = document.getElementById("hover-BorderDecrease");
  const resetBtn = valueText?.closest(".sc-flex")?.querySelector("img[alt='reset']");

  if (!fill || !bullet || !field || !valueText) return;
  if (!window.__squareCraftHoverBorderStateMap) window.__squareCraftHoverBorderStateMap = new Map();

  const sides = ["Top", "Right", "Bottom", "Left"];
  let currentSide = "All";
  let value = 0;

  function getKey() {
    const selected = getSelectedElement?.();
    const btn = selected?.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    const typeClass = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    return `${selected?.id || "block-id"}--${typeClass}`;
  }

  function applyStyle() {
    const selected = getSelectedElement?.();
    if (!selected) return;
    const btn = selected.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
    if (!btn) return;
    const typeClass = [...btn.classList].find(c => c.startsWith("sqs-button-element--"));
    const blockId = selected.id || "block-id";
    const key = `${blockId}--${typeClass}`;
    const state = window.__squareCraftHoverBorderStateMap.get(key) || { value: 0, side: "All" };
    const val = `${state.value}px`;
    const t = state.side === "Top" || state.side === "All" ? val : "0px";
    const r = state.side === "Right" || state.side === "All" ? val : "0px";
    const b = state.side === "Bottom" || state.side === "All" ? val : "0px";
    const l = state.side === "Left" || state.side === "All" ? val : "0px";

    const styleId = `hover-button-border-${blockId}-${typeClass}`;
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.innerHTML = `
      a.${typeClass}:hover {
        border-style: ${window.__squareCraftBorderStyle || "solid"} !important;
        border-color: ${window.__squareCraftHoverBorderColor || "black"} !important;
        border-radius: ${window.__squareCraftHoverRadius || 0}px !important;
        border-top-width: ${t} !important;
        border-right-width: ${r} !important;
        border-bottom-width: ${b} !important;
        border-left-width: ${l} !important;
      }
    `;
  }

  function update(val) {
    value = Math.max(0, Math.min(10, val));
    const percent = (value / 10) * 100;
    bullet.style.left = `${percent}%`;
    fill.style.width = `${percent}%`;
    valueText.textContent = `${value}px`;

    const key = getKey();
    let state = window.__squareCraftHoverBorderStateMap.get(key) || { value: 0, side: "All" };
    state.value = value;
    window.__squareCraftHoverBorderStateMap.set(key, state);
    applyStyle();
  }

  bullet.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const rect = field.getBoundingClientRect();
    const move = (eMove) => {
      const x = Math.min(Math.max(eMove.clientX - rect.left, 0), rect.width);
      update(Math.round((x / rect.width) * 10));
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  field.addEventListener("click", (e) => {
    const rect = field.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    update(Math.round((x / rect.width) * 10));
  });

  incBtn?.addEventListener("click", () => update(value + 1));
  decBtn?.addEventListener("click", () => update(value - 1));
  resetBtn?.addEventListener("click", () => update(0));

  ["All", ...sides].forEach((side) => {
    const el = document.getElementById(`hover-buttonBorder${side}`);
    if (!el) return;
    el.addEventListener("click", () => {
      ["All", ...sides].forEach((s) => document.getElementById(`hover-buttonBorder${s}`)?.classList.remove("sc-bg-454545"));
      el.classList.add("sc-bg-454545");

      const key = getKey();
      let state = window.__squareCraftHoverBorderStateMap.get(key) || { value: 0, side: "All" };
      state.side = side;
      currentSide = side;
      window.__squareCraftHoverBorderStateMap.set(key, state);
      applyStyle();
    });
  });

  update(value);
}




export function applyHoverButtonEffects(getSelectedElement) {
    const transition = document.getElementById("hover-buttonTransitionTypeLabel")?.textContent?.trim() || "none";
    const duration = document.getElementById("hover-buttonDurationLabel")?.textContent?.trim() || "0";
    const delay = document.getElementById("hover-buttonDelayLabel")?.textContent?.trim() || "0";
    const transformType = document.getElementById("hover-buttonTransformTypeLabel")?.textContent?.trim() || "none";
  
    const bullet = document.getElementById("hover-buttonIconTransformPositionBullet");
    const fill = document.getElementById("hover-buttonIconTransformPositionFill");
    const field = document.getElementById("hover-buttonIconTransformPositionField");
    const label = document.getElementById("hover-buttoniconTransformPositionCount");
  
    if (!bullet || !fill || !field || !label) return;
  
    function updateUI(clientX) {
      const rect = field.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      const value = Math.round((x / rect.width) * 180 - 90);
      bullet.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;
      label.textContent = `${value}px`;
      window.__squareCraftTransformDistance = value;
      applyHoverStyles();
    }
  
    bullet.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const move = (e) => updateUI(e.clientX);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  
    field.addEventListener("click", (e) => updateUI(e.clientX));
  
    function applyHoverStyles() {
      const distance = window.__squareCraftTransformDistance ?? 0;
      const selected = getSelectedElement?.();
      if (!selected) return;
  
      const button = selected.querySelector("a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary");
      if (!button) return;
  
      const typeClass = [...button.classList].find(cls => cls.startsWith("sqs-button-element--"));
      if (!typeClass) return;
  
      const transitionRule = `transition: all ${duration}ms ${transition} ${delay}ms !important;`;
  
      const iconStyleId = `sc-hover-style-size-${typeClass.replace(/--/g, '-')}`;
      const iconStyleTag = document.getElementById(iconStyleId);
      if (iconStyleTag) {
        iconStyleTag.innerHTML = iconStyleTag.innerHTML.replace(/transition:[^;]*;/g, '') + transitionRule;
      }
  
      const iconSpacingStyleId = `sc-hover-style-gap-${typeClass.replace(/--/g, '-')}`;
      const iconSpacingStyleTag = document.getElementById(iconSpacingStyleId);
      if (iconSpacingStyleTag) {
        iconSpacingStyleTag.innerHTML = iconSpacingStyleTag.innerHTML.replace(/transition:[^;]*;/g, '') + transitionRule;
      }
  
      const radiusStyleId = `sc-hover-radius-${typeClass.replace(/--/g, '-')}`;
      const radiusStyleTag = document.getElementById(radiusStyleId);
      if (radiusStyleTag) {
        radiusStyleTag.innerHTML = radiusStyleTag.innerHTML.replace(/transition:[^;]*;/g, '') + transitionRule;
      }
  
      const borderStyleId = `hover-border-style-${typeClass.replace(/--/g, '-')}`;
      const borderStyleTag = document.getElementById(borderStyleId);
      if (borderStyleTag) {
        borderStyleTag.innerHTML = borderStyleTag.innerHTML.replace(/transition:[^;]*;/g, '') + transitionRule;
      }
  
      const shadowStyleId = `sc-hover-shadow-${typeClass.replace(/--/g, '-')}`;
      const shadowStyleTag = document.getElementById(shadowStyleId);
      if (shadowStyleTag) {
        shadowStyleTag.innerHTML = shadowStyleTag.innerHTML.replace(/transition:[^;]*;/g, '') + transitionRule;
      }
  
      const iconRotateStyleId = `sc-hover-style-transform-${typeClass.replace(/--/g, '-')}`;
      const iconRotateStyleTag = document.getElementById(iconRotateStyleId);
      if (iconRotateStyleTag) {
        iconRotateStyleTag.innerHTML = iconRotateStyleTag.innerHTML.replace(/transition:[^;]*;/g, '') + transitionRule;
      }
  
      const styleId = `sc-hover-effects-${typeClass.replace(/--/g, "-")}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
  
      let transformRule = "none";
      if (transformType === "TranslateX") transformRule = `translateX(${distance}px)`;
      else if (transformType === "TranslateY") transformRule = `translateY(${distance}px)`;
      else if (transformType === "RotateX") transformRule = `rotateX(${distance}deg)`;
      else if (transformType === "RotateY") transformRule = `rotateY(${distance}deg)`;
      else if (transformType === "Scale") transformRule = `scale(${1 + distance / 100})`;
  
      styleTag.innerHTML = `
        a.${typeClass}:hover {
          ${transitionRule}
          transform: ${transformRule} !important;
        }
      `;
    }
  
    applyHoverStyles();
  }  
  

window.syncHoverButtonStylesFromElement = function (selectedElement) {
    if (!selectedElement) return;
  
    const sample = selectedElement.querySelector(
      "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary"
    );
    if (!sample) return;
  
    const typeClass = [...sample.classList].find(cls => cls.startsWith("sqs-button-element--"));
    if (!typeClass) return;
  
    const hoverKey = `hover--${typeClass}`;
  
    // 1. 🔄 Border Width
    const borderState = window.__squareCraftHoverBorderStateMap?.get(hoverKey) || { value: 0, side: "All" };
    const getPercent = (val, max) => `${(val / max) * 100}%`;
  
    const fill = document.getElementById("hover-buttonBorderFill");
    const bullet = document.getElementById("hover-buttonBorderBullet");
    const valueText = document.getElementById("hover-buttonBorderCount");
  
    const percent = (borderState.value / 10) * 100;
    if (fill && bullet && valueText) {
      fill.style.width = `${percent}%`;
      bullet.style.left = `${percent}%`;
      valueText.textContent = `${borderState.value}px`;
    }
  
    // 2. 🟢 Border Side Tab Sync
    const sides = ["Top", "Right", "Bottom", "Left", "All"];
    sides.forEach((side) => {
      const el = document.getElementById(`hover-buttonBorder${side}`);
      if (el) {
        el.classList.toggle("sc-bg-454545", borderState.side === side);
      }
    });
  
    // 3. 🔄 Border Style Type
    const style = window.__squareCraftBorderStyle || "solid";
    ["Solid", "Dashed", "Dotted"].forEach((type) => {
      const btn = document.getElementById(`hover-buttonBorderType${type}`);
      if (btn) btn.classList.toggle("sc-bg-454545", style === type.toLowerCase());
    });
  
    // 4. 🔄 Radius
    const radius = parseInt(window.__squareCraftHoverRadius || 0);
    const radPercent = (radius / 50) * 100;
    const radiusFill = document.getElementById("hover-buttonBorderRadiousFill");
    const radiusBullet = document.getElementById("hover-buttonBorderRadiousBullet");
    const radiusCount = document.getElementById("hover-buttonBorderRadiousCount");
  
    if (radiusFill && radiusBullet && radiusCount) {
      radiusFill.style.width = `${radPercent}%`;
      radiusBullet.style.left = `${radPercent}%`;
      radiusCount.textContent = `${radius}px`;
    }
  
    // 5. 🔄 Shadow
    const hoverShadow = window.hoverShadowState || {};
    ["Xaxis", "Yaxis", "Blur", "Spread"].forEach((type) => {
      const val = hoverShadow[type] || 0;
      const percent = `${(val / (type === "Blur" ? 50 : 30)) * 100}%`;
  
      const count = document.getElementById(`hover-buttonShadow${type}Count`);
      const fill = document.getElementById(`hover-buttonShadow${type}Fill`);
      const bullet = document.getElementById(`hover-buttonShadow${type}Bullet`);
  
      if (count) count.textContent = `${val}px`;
      if (fill) fill.style.width = percent;
      if (bullet) bullet.style.left = percent;
    });
  
    // You can similarly add for:
    // - hover icon rotation
    // - hover icon size
    // - hover spacing
    // - transform type and distance if needed
  };
