export function ButtonPresetMyPresetSection() {
  return `
    <div id="button-my-preset-section" class="">
                <p class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin">Save the current block’s styles from your library.</p>

                <div style="padding: 8px 0px 8px 0px;" class="sc-mt-2 sc-flex sc-justify-center sc-gap-3 sc-bg-color-EF7C2F sc-border sc-text-color-white sc-cursor-pointer sc-border-585858  sc-rounded-4px sc-border-solid">
                  <p class="sc-universal sc-text-sm sc-font-thin sc-text-center">
                    Design this block to save as a preset
                  </p>
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/white-plus.svg" alt="">

                </div>

                <div class="sc-h-1px sc-bg-3f3f3f sc-mt-3"></div>

                <div class="sc-mt-5">
                  <p class="sc-universal sc-text-sm sc-font-thin">Add your preset name</p>
                </div>

                <div class="sc-relative sc-flex sc-w-full">
                  <input placeholder="Type preset name" type="text" class="sc-w-full button-preset-name sc-font-thin" id="button-preset-name" />
                  <div>
                    <p class="sc-universal sc-absolute sc-top-4 sc-right-2 sc-text-gray-300 sc-text-sm sc-font-thin">5/10</p>
                  </div>
                </div>

                <div class="sc-h-1px sc-bg-3f3f3f sc-mt-4"></div>

                <div class="sc-w-full sc-flex sc-justify-between sc-mt-2">
                  <p class="sc-universal sc-text-sm sc-font-thin sc-text-gray-300">Button(1)</p>
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/white-threeDot.svg" class="sc-cursor-pointer sc-bg-3f3f3f sc-rounded-full sc-px-1 sc-py-1" alt="">

                </div>

                <div class="sc-h-1px sc-bg-3f3f3f sc-mt-3"></div>

                <div class="sc-w-full sc-flex sc-justify-between sc-mt-2">
                  <p class="sc-universal sc-text-sm sc-font-thin sc-text-gray-300">Button(1)</p>
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/white-threeDot.svg" class="sc-cursor-pointer sc-bg-3f3f3f sc-rounded-full sc-px-1 sc-py-1" alt="">

                </div>
     </div>
  `;
}