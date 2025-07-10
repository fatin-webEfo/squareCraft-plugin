
import { ButtonPresetMyPresetSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/button/ButtonPresetMyPresetSection/ButtonPresetMyPresetSection.js";
import { ButtonPresetLibrarySection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/button/ButtonPresetLibrarySection/ButtonPresetLibrarySection.js";


export function WidgetButtonPresetSection() {
  return `
   <div id="button-presetSection">
            <div class="sc-flex sc-roboto sc-p-2 sc-items-center sc-justify-between sc-gap-2">
              <div id="button-my-preset-tab" class="sc-cursor-pointer sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-font-size-12 sc-py-1 sc-rounded-4px sc-text-color-white sc-justify-center">
                My Preset
              </div>
              <div id="button-preset-library-tab" class="sc-cursor-pointer sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-font-size-12 sc-py-1 sc-rounded-4px sc-items-center sc-justify-center">
                Preset Library
              </div>
            </div>

            <div class="sc-px-2">
            ${ButtonPresetMyPresetSection()}
            ${ButtonPresetLibrarySection()}
            </div>
    </div>
  

    `;
}
