export function WidgetButtonPresetSection() {
  const presets = [
    {
      title: "Bold Highlight Text",
      description: "Text: Bold + Highlight + Center",
      image: "preset-demo1.gif",
    },
    {
      title: "Minimal Button",
      description: "Button: No border + Thin font",
      image: "preset-demo2.gif",
    },
    {
      title: "Shadow Pop",
      description: "Button: Shadow + Hover Grow",
      image: "preset-demo3.gif",
    },
    {
      title: "Slide Hover",
      description: "Text: Slide left effect on hover",
      image: "preset-demo4.gif",
    },
  ];

  return `
    <div id="presetSection" class="sc-p-4 sc-flex-col sc-gap-4 sc-rounded-2xl sc-bg-1e1e1e sc-text-white sc-shadow-md sc-text-sm">
      <div class="sc-flex sc-items-center sc-justify-between">
        <h2 class="sc-font-semibold sc-text-lg">🎨 Style Presets</h2>
        <button id="applyPreset" class="sc-bg-EF7C2F sc-text-white sc-rounded-lg sc-px-4 sc-py-1.5 sc-text-xs sc-font-medium sc-transition-all hover:sc-bg-orange-600 hover:sc-scale-105">
          Apply Selected
        </button>
      </div>
  
      <div class="sc-text-gray-400 sc-text-xs">Live preview of pre-built styles for typography, image, and buttons.</div>
  
      <div class="sc-grid sc-grid-cols-2 sc-gap-4" id="presetGrid">
        ${presets
          .map(
            (preset, index) => `
          <div class="preset-card sc-bg-2a2a2a sc-rounded-xl sc-p-3 sc-flex-col sc-gap-2 sc-border sc-border-333333 hover:sc-border-EF7C2F sc-transition-all sc-cursor-pointer" data-aos="fade-up" data-aos-delay="${
            index * 100
          }">
            <div class="sc-rounded-lg sc-overflow-hidden sc-bg-black sc-border sc-border-262626" style="width: 100%; height: 160px;">
              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/${
                preset.image
              }" alt="${
              preset.title
            }" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div class="sc-font-semibold sc-text-sm">${preset.title}</div>
            <div class="sc-text-gray-400 sc-text-xs">${preset.description}</div>
            <button class="sc-bg-EF7C2F sc-text-white sc-rounded-md sc-text-xs sc-py-1 sc-mt-2 sc-w-full sc-font-medium hover:sc-bg-orange-600 transition-all">Use This Preset</button>
          </div>`
          )
          .join("")}
      </div>
  
      <div class="sc-flex sc-justify-between sc-mt-6">
        <button class="sc-bg-EF7C2F sc-text-white sc-px-6 sc-py-1.5 sc-rounded-md sc-text-sm sc-font-semibold hover:sc-bg-orange-600">Publish</button>
        <button class="sc-bg-444444 sc-text-white sc-px-6 sc-py-1.5 sc-rounded-md sc-text-sm hover:sc-bg-555555">Reset</button>
      </div>
    </div>
  
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>AOS.init({ once: true });</script>
    `;
}
