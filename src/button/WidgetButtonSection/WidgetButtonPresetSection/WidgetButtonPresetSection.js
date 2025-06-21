export function WidgetButtonPresetSection() {
  return `
    <div id="presetSection" class="sc-p-4 sc-flex-col sc-gap-4 sc-rounded-2xl sc-bg-1e1e1e sc-text-white sc-shadow-md sc-text-sm">
      <div class="sc-flex sc-items-center sc-justify-between">
        <p class="sc-universal sc-font-size-16 sc-roboto">🎨 Style Presets</p>
      </div>
  
      <div class="sc-text-gray-400 sc-text-xs">Live preview of pre-built styles for typography, image, and buttons.</div>
  
      <div class="sc-grid sc-grid-cols-2 sc-gap-4" id="presetGrid">
        <div class="preset-card sc-bg-2a2a2a sc-rounded-xl sc-p-3 sc-flex-col sc-gap-2  sc-transition-all sc-cursor-pointer" data-aos="fade-up" data-aos-delay="0">
          <div class="sc-rounded-lg sc-overflow-hidden sc-bg-black sc-border sc-border-EF7C2F" style="width: 100%; height: 160px;">
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/preset-demo1.gif" alt="Bold Highlight Text" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div class="sc-font-medium sc-text-xs">Bold Highlight Text</div>
          <div class="sc-text-gray-400 sc-text-2xs">Text: Bold + Highlight + Center</div>
          <button class="sc-bg-EF7C2F sc-text-white sc-rounded-md sc-text-xs sc-py-1 sc-mt-2 sc-w-full sc-font-medium hover:sc-bg-orange-600 transition-all">Use This Preset</button>
        </div>
  
        <div class="preset-card sc-bg-2a2a2a sc-rounded-xl sc-p-3 sc-flex-col sc-gap-2  sc-transition-all sc-cursor-pointer" data-aos="fade-up" data-aos-delay="100">
          <div class="sc-rounded-lg sc-overflow-hidden sc-bg-black sc-border sc-border-EF7C2F" style="width: 100%; height: 160px;">
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/preset-demo2.gif" alt="Minimal Button" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div class="sc-font-medium sc-text-xs">Minimal Button</div>
          <div class="sc-text-gray-400 sc-text-2xs">Button: No border + Thin font</div>
          <button class="sc-bg-EF7C2F sc-text-white sc-rounded-md sc-text-xs sc-py-1 sc-mt-2 sc-w-full sc-font-medium hover:sc-bg-orange-600 transition-all">Use This Preset</button>
        </div>
  
        <div class="preset-card sc-bg-2a2a2a sc-rounded-xl sc-p-3 sc-flex-col sc-gap-2  sc-transition-all sc-cursor-pointer" data-aos="fade-up" data-aos-delay="200">
          <div class="sc-rounded-lg sc-overflow-hidden sc-bg-black sc-border sc-border-EF7C2F" style="width: 100%; height: 160px;">
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/preset-demo3.gif" alt="Shadow Pop" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div class="sc-font-medium sc-text-xs">Shadow Pop</div>
          <div class="sc-text-gray-400 sc-text-2xs">Button: Shadow + Hover Grow</div>
          <button class="sc-bg-EF7C2F sc-text-white sc-rounded-md sc-text-xs sc-py-1 sc-mt-2 sc-w-full sc-font-medium hover:sc-bg-orange-600 transition-all">Use This Preset</button>
        </div>
  
        <div class="preset-card sc-bg-2a2a2a sc-rounded-xl sc-p-3 sc-flex-col sc-gap-2  sc-transition-all sc-cursor-pointer" data-aos="fade-up" data-aos-delay="300">
          <div class="sc-rounded-lg sc-overflow-hidden sc-bg-black sc-border sc-border-EF7C2F" style="width: 100%; height: 160px;">
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/preset-demo4.gif" alt="Slide Hover" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div class="sc-font-medium sc-text-xs">Slide Hover</div>
          <div class="sc-text-gray-400 sc-text-2xs">Text: Slide left effect on hover</div>
          <button class="sc-bg-EF7C2F sc-text-white sc-rounded-md sc-text-xs sc-py-1 sc-mt-2 sc-w-full sc-font-medium hover:sc-bg-orange-600 transition-all">Use This Preset</button>
        </div>
      </div>
    </div>
  

    `;
}
