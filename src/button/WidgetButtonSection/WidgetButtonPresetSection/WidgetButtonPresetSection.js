export function WidgetButtonPresetSection(){
    return `
   <div id="presetSection" class="sc-p-4 sc-flex-col sc-gap-4 sc-rounded-2xl sc-bg-2a2a2a sc-text-white sc-shadow-md">
  <div class="sc-flex sc-items-center sc-justify-between">
    <h2 class="sc-font-bold sc-text-xl sc-universal">🎨 Style Presets</h2>
    <button id="applyPreset" class="sc-bg-EF7C2F sc-text-white sc-rounded-xl sc-px-4 sc-py-2 sc-text-sm sc-font-medium sc-transition-all hover:sc-bg-orange-600 hover:sc-scale-105">
      Apply Selected Preset
    </button>
  </div>

  <div class="sc-text-sm sc-text-gray-300">
    Preview and apply saved design styles instantly to your text, image, or button blocks.
  </div>

  <div class="sc-grid sc-grid-cols-2 sc-gap-4" id="presetGrid">
    <!-- Preset Card Example -->
    <div class="preset-card sc-bg-1f1f1f sc-rounded-xl sc-p-3 sc-flex-col sc-gap-2 sc-cursor-pointer sc-transition-all sc-duration-300 sc-border sc-border-transparent hover:sc-border-EF7C2F">
      <div class="sc-rounded-lg sc-overflow-hidden sc-h-28 sc-bg-black">
        <video autoplay loop muted class="sc-w-full sc-h-full sc-object-cover">
          <source src="https://fatin-webefo.github.io/squareCraft-plugin/public/preset-demo1.mp4" type="video/mp4">
        </video>
      </div>
      <div class="sc-font-medium sc-text-base sc-pt-2">Bold Highlight Text</div>
      <div class="sc-text-xs sc-text-gray-400">Text: Bold + Highlight + Center</div>
      <button class="sc-bg-EF7C2F sc-text-white sc-rounded-md sc-text-xs sc-py-1 sc-mt-2 sc-w-full sc-font-medium hover:sc-bg-orange-600 transition-all">Use This Preset</button>
    </div>

    <div class="preset-card sc-bg-1f1f1f sc-rounded-xl sc-p-3 sc-flex-col sc-gap-2 sc-cursor-pointer sc-transition-all sc-duration-300 sc-border sc-border-transparent hover:sc-border-EF7C2F">
      <div class="sc-rounded-lg sc-overflow-hidden sc-h-28 sc-bg-black">
        <video autoplay loop muted class="sc-w-full sc-h-full sc-object-cover">
          <source src="https://fatin-webefo.github.io/squareCraft-plugin/public/preset-demo2.mp4" type="video/mp4">
        </video>
      </div>
      <div class="sc-font-medium sc-text-base sc-pt-2">Minimal Button</div>
      <div class="sc-text-xs sc-text-gray-400">Button: No border + Thin font</div>
      <button class="sc-bg-EF7C2F sc-text-white sc-rounded-md sc-text-xs sc-py-1 sc-mt-2 sc-w-full sc-font-medium hover:sc-bg-orange-600 transition-all">Use This Preset</button>
    </div>
  </div>
</div>

    `;
}