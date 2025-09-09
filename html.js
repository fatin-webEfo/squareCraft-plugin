// html.js — lightweight, virtual-DOM-ish, lazy modules

// ⚠️ NO top-level imports anymore — everything is dynamically imported on demand.

export function html() {
  // Minimal shell only. Placeholders exist so external code waiting for
  // #typoSection/#imageSection/#buttonSection can succeed quickly.
  return `
  <div class="sc-p-2 z-index-high sc-text-color-white sc-overflow-x-none sc-border sc-border-solid sc-border-3d3d3d sc-bg-color-2c2c2c sc-rounded-15px sc-w-300px">
    <div id="sc-grabbing" class="sc-cursor-grabbing sc-w-full">
      <div class="sc-flex sc-roboto sc-universal sc-items-center sc-justify-between">
        <img class="sc-cursor-grabbing sc-universal" src="https://fatin-webefo.github.io/squareCraft-plugin/public/squarecraft-text-logo-transparent.svg" width="140" alt="SquareCraft"/>
      </div>
      <div class="sc-mt-2">
        <p class="sc-font-size-12 sc-universal sc-roboto sc-font-light">
          Powerful Visual Editor for Customizing Squarespace Text Styles in Real-Time.
        </p>
      </div>
    </div>

    <div class="sc-mt-4 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"></div>

    <div class="sc-mt-6 sc-h-12 sc-roboto sc-flex sc-items-center sc-universal" id="sc-tabbar">
      <p id="design-tab"   class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader sc-active">Design</p>
      <p id="advanced-tab" class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Advanced</p>
      <p id="preset-tab"   class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Presets</p>
    </div>

    <div class="sc-border-t sc-border-solid sc-relative sc-border-color-494949 sc-w-full">
      <div class="sc-absolute sc-top-0 sc-left-0 sc-bg-color-EF7C2F sc-w-16 sc-h-1px sc-tab-active-indicator"></div>
    </div>

    <div id="tabContentWrapper" class="sc-rounded-4px sc-h-350 sc-transition-height sc-scrollBar sc-mt-6 sc-border sc-border-solid sc-border-EF7C2F sc-bg-color-3d3d3d">
      <!-- Design (default) -->
      <div id="designTab">
        <!-- lightweight placeholders so external waiters can resolve -->
        <div id="typoSection"></div>
        <div id="imageSection"></div>
        <div id="buttonSection"></div>
      </div>

      <!-- Advanced (lazy) -->
      <div id="advancedTab" class="sc-hidden">
        <div id="advancedButtonSection"></div>
        <div id="advancedTypoSection"></div>
        <div id="advancedImageSection"></div>
      </div>

      <!-- Presets (lazy) -->
      <div id="presetsTab" class="sc-hidden">
        <div id="presetButtonSection"></div>
        <div id="presetTypoSection"></div>
        <div id="presetImageSection"></div>
      </div>
    </div>

    <div class="sc-mt-3">
      <div class="sc-flex sc-items-center sc-justify-between sc-gap-2">
        <div id="publish" class="sc-cursor-pointer sc-roboto sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-font-size-12 sc-py-1 sc-rounded-4px sc-text-color-white sc-justify-center">Publish</div>
        <div id="reset"    class="sc-cursor-pointer sc-roboto sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-font-size-12 sc-py-1 sc-rounded-4px sc-items-center sc-justify-center">Reset</div>
      </div>
    </div>
  </div>
  `;
}

/**
 * initToggleSwitch()
 * Backward-compatible entry that now also wires the tabs + lazy loads content.
 * (Your host already calls this. No other changes needed.)
 */
export function initToggleSwitch() {
  // Toggle switch still optional — only bind if present.
  (async () => {
    try {
      const { getToggleState, setToggleState } = await import(
        "https://fatin-webefo.github.io/squareCraft-plugin/toggleState.js"
      );

      const toggleSwitch = document.getElementById("toggleSwitch");
      const toggleText = document.getElementById("toggleText");
      const toggleBullet = toggleSwitch?.querySelector(".toggle-bullet");

      if (toggleSwitch && toggleText && toggleBullet) {
        let isEnabled = getToggleState();

        const updateToggleUI = () => {
          if (!toggleSwitch || !toggleBullet || !toggleText) return;
          if (isEnabled) {
            toggleSwitch.style.backgroundColor = "#EF7C2F";
            toggleBullet.style.left = "auto";
            toggleBullet.style.right = "1.5px";
            toggleText.textContent = "Enable";
          } else {
            toggleSwitch.style.backgroundColor = "#747372";
            toggleBullet.style.left = "2px";
            toggleBullet.style.right = "auto";
            toggleText.textContent = "Disable";
          }
        };

        updateToggleUI();
        toggleSwitch.addEventListener("click", () => {
          isEnabled = !isEnabled;
          setToggleState(isEnabled);
          updateToggleUI();
        });
      }
    } catch {
      // toggle is optional; ignore errors silently to avoid blocking UI init
    }
  })();

  // ---- Lightweight tab system + lazy rendering ----

  const $$ = (sel) => document.querySelector(sel);

  const state = {
    designLoaded: false,
    advancedLoaded: false,
    presetsLoaded: false,
  };

  // Render helpers: fill a container with module HTML only once.
  const renderDesign = async () => {
    if (state.designLoaded) return;
    state.designLoaded = true;

    // Fetch only what we need for Design tab
    const [
      { WidgetTypoSection },
      { WidgetImageSection },
      { WidgetButtonSection },
    ] = await Promise.all([
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/WidgetTypoSection.js"
      ),
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/WidgetImageSection.js"
      ),
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonSection.js"
      ),
    ]);

    const typoEl = $$("#typoSection");
    const imageEl = $$("#imageSection");
    const buttonEl = $$("#buttonSection");

    if (typoEl) typoEl.innerHTML = WidgetTypoSection("typoSection");
    if (imageEl) imageEl.innerHTML = WidgetImageSection("imageSection");
    if (buttonEl) buttonEl.innerHTML = WidgetButtonSection("buttonSection");
  };

  const renderAdvanced = async () => {
    if (state.advancedLoaded) return;
    state.advancedLoaded = true;

    const [
      { WidgetButtonAdvanceSection },
      { WidgetTypoAdvanceSection },
      { WidgetImageAdvanceSection },
    ] = await Promise.all([
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonAdvanceSection/WidgetButtonAdvanceSection.js"
      ),
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/WidgetTypoAdvanceSection/WidgetTypoAdvanceSection.js"
      ),
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/WidgetImageAdvanceSection/WidgetImageAdvanceSection.js"
      ),
    ]);

    const b = $$("#advancedButtonSection");
    const t = $$("#advancedTypoSection");
    const i = $$("#advancedImageSection");

    if (b) b.innerHTML = WidgetButtonAdvanceSection();
    if (t) t.innerHTML = WidgetTypoAdvanceSection();
    if (i) i.innerHTML = WidgetImageAdvanceSection();
  };

  const renderPresets = async () => {
    if (state.presetsLoaded) return;
    state.presetsLoaded = true;

    const [
      { WidgetButtonPresetSection },
      { WidgetTypoPresetSection },
      { WidgetImagePresetSection },
    ] = await Promise.all([
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonPresetSection/WidgetButtonPresetSection.js"
      ),
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/WidgetTypoPresetSection/WidgetTypoPresetSection.js"
      ),
      import(
        "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/WidgetImagePresetSection/WidgetImagePresetSection.js"
      ),
    ]);

    const b = $$("#presetButtonSection");
    const t = $$("#presetTypoSection");
    const i = $$("#presetImageSection");

    if (b) b.innerHTML = WidgetButtonPresetSection();
    if (t) t.innerHTML = WidgetTypoPresetSection();
    if (i) i.innerHTML = WidgetImagePresetSection();
  };

  // Tab switching (classList toggles only)
  const tabs = {
    design: {
      header: $$("#design-tab"),
      panel: $$("#designTab"),
      load: renderDesign,
    },
    advanced: {
      header: $$("#advanced-tab"),
      panel: $$("#advancedTab"),
      load: renderAdvanced,
    },
    preset: {
      header: $$("#preset-tab"),
      panel: $$("#presetsTab"),
      load: renderPresets,
    },
  };

  const setActiveTab = async (key) => {
    Object.entries(tabs).forEach(([k, { header, panel }]) => {
      if (!header || !panel) return;
      const isActive = k === key;
      header.classList.toggle("sc-active", isActive);
      panel.classList.toggle("sc-hidden", !isActive);
    });
    // lazy load content for the selected tab
    try {
      await tabs[key].load();
    } catch (e) {
      console.warn("Tab load failed:", e);
    }
  };

  // Event delegation for tab clicks (single lightweight handler)
  const tabbar = document.getElementById("sc-tabbar");
  if (tabbar && !tabbar.dataset.bound) {
    tabbar.dataset.bound = "1";
    tabbar.addEventListener("click", (e) => {
      const id = e.target?.id;
      if (id === "design-tab") setActiveTab("design");
      if (id === "advanced-tab") setActiveTab("advanced");
      if (id === "preset-tab") setActiveTab("preset");
    });
  }

  // Load the default Design tab as soon as we're idle (or next tick fallback).
  const kick = () => setActiveTab("design");
  if ("requestIdleCallback" in window) {
    requestIdleCallback(kick, { timeout: 300 });
  } else {
    setTimeout(kick, 0);
  }

  // Optional small UX: focusable Publish/Reset without heavy listeners
  const pub = document.getElementById("publish");
  const rst = document.getElementById("reset");
  if (pub && !pub.dataset.bound) {
    pub.dataset.bound = "1";
    pub.addEventListener("click", () => {
      // Keep this no-op/light; real logic should live in the host script
      pub.classList.add("sc-pressed");
      setTimeout(() => pub.classList.remove("sc-pressed"), 120);
    });
  }
  if (rst && !rst.dataset.bound) {
    rst.dataset.bound = "1";
    rst.addEventListener("click", () => {
      // Clear only local UI bits; avoid full reflows
      // (Host script can listen and perform resets against selected element)
      const wrap = document.getElementById("tabContentWrapper");
      if (!wrap) return;
      // Do not drop placeholders; just re-render current tab lazily
      state.designLoaded = false;
      state.advancedLoaded = false;
      state.presetsLoaded = false;
      // Reload currently active tab
      if ($$("#design-tab")?.classList.contains("sc-active"))
        setActiveTab("design");
      else if ($$("#advanced-tab")?.classList.contains("sc-active"))
        setActiveTab("advanced");
      else setActiveTab("preset");
    });
  }
}
  