
import { getToggleState, setToggleState } from 'https://fatin-webefo.github.io/squareCraft-plugin/toggleState.js';
import { WidgetTypoSection } from 'https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/WidgetTypoSection.js';
import { WidgetTypoAdvanceSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/WidgetTypoAdvanceSection/WidgetTypoAdvanceSection.js";
import { WidgetImageSection } from 'https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/WidgetImageSection.js';
import { WidgetImageAdvanceSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/WidgetImageAdvanceSection/WidgetImageAdvanceSection.js";
import { WidgetButtonSection } from 'https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonSection.js';
import { WidgetButtonPresetSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonPresetSection/WidgetButtonPresetSection.js";
import { WidgetImagePresetSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetImageSection/WidgetImagePresetSection/WidgetImagePresetSection.js";
import { WidgetTypoPresetSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/WidgetTypoPresetSection/WidgetTypoPresetSection.js";
import { WidgetButtonAdvanceSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/button/WidgetButtonSection/WidgetButtonAdvanceSection/WidgetButtonAdvanceSection.js";


export function html() {

   const htmlString = `
     <div class="sc-p-2  z-index-high sc-text-color-white sc-border sc-border-solid sc-border-3d3d3d sc-bg-color-2c2c2c sc-rounded-15px sc-w-300px">
  <div id="sc-grabbing" class="sc-cursor-grabbing sc-w-full">
    <div class="sc-flex sc-roboto sc-universal sc-items-center sc-justify-between">
      <img class="sc-cursor-grabbing sc-universal" src="https://fatin-webefo.github.io/squareCraft-plugin/public/squarecraft-text-logo-transparent.svg" width="140px" />
    </div>
    <div class="sc-mt-2">
      <p class="sc-font-size-12  sc-universal sc-roboto sc-font-light">Powerful Visual Editor for Customizing Squarespace Text Styles in Real-Time. </p>
    </div>
  </div>
  <div class="sc-mt-4 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949  sc-w-full"></div>
  <div class="sc-mt-6 sc-h-12 sc-roboto sc-flex  sc-items-center sc-universal">
    <p id="design-tab" class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader ">Design</p>
    <p id="advanced-tab" class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Advanced</p>
    <p id="preset-tab" class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Presets</p>
  </div>
  <div class="sc-border-t sc-border-solid sc-relative  sc-border-color-494949 sc-w-full">
    <div class="sc-absolute sc-top-0 sc-left-0 sc-bg-color-EF7C2F sc-w-16 sc-h-1px sc-tab-active-indicator"></div>
  </div>
  <div id="tabContentWrapper" class="sc-rounded-4px sc-h-350 sc-transition-height sc-scrollBar sc-mt-6 sc-border sc-border-solid sc-border-EF7C2F sc-bg-color-3d3d3d">
    <div id="designTab"> ${WidgetTypoSection(
      "typoSection"
    )} ${WidgetImageSection("imageSection")} ${WidgetButtonSection(
     "buttonSection"
   )} </div>
    <div id="advancedTab" class="sc-hidden">
      <div id="advancedButtonSection">${WidgetButtonAdvanceSection()}</div>
      <div id="advancedTypoSection">${WidgetTypoAdvanceSection()}</div>
      <div id="advancedImageSection">${WidgetImageAdvanceSection()}</div>
    </div>
    <div id="presetsTab" class="sc-hidden">
      <div id="presetButtonSection">${WidgetButtonPresetSection()}</div>
      <div id="presetTypoSection">${WidgetTypoPresetSection()}</div>
      <div id="presetImageSection">${WidgetImagePresetSection()}</div>
    </div>
  </div>
  <div class="sc-mt-3">
    <div class="sc-flex  sc-items-center sc-justify-between sc-gap-2">
      <div id="publish" class="sc-cursor-pointer sc-roboto sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-font-size-12 sc-py-1 sc-rounded-4px sc-text-color-white sc-justify-center"> Publish </div>
      <div class="sc-cursor-pointer sc-roboto sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-font-size-12 sc-py-1 sc-rounded-4px sc-items-center sc-justify-center"> Reset </div>
    </div>
  </div>
</div>
    `;

   const parser = new DOMParser();
   const doc = parser.parseFromString(htmlString, "text/html");
   const isValidHTML = doc.body.children.length > 0;

   if (!isValidHTML) {
      console.error("❌ Error: Invalid HTML structure!");
      return "❌ Error: Invalid HTML structure!";
   }

   document.addEventListener("DOMContentLoaded", async function () {


      function addHeadingEventListeners() {
         const heading1 = document.getElementById("heading1");
         if (heading1) {
            heading1.addEventListener("mouseover", () => {
            });

            heading1.addEventListener("click", () => {
            });
         } else {
            console.error("❌ heading1 not found in DOM!");
         }
      }

      setTimeout(addHeadingEventListeners, 1000);
   });

   return htmlString;

}
export function initToggleSwitch() {
   const toggleSwitch = document.getElementById("toggleSwitch");
   const toggleText = document.getElementById("toggleText");
   const toggleBullet = toggleSwitch?.querySelector(".toggle-bullet");

   if (!toggleSwitch || !toggleText || !toggleBullet) {
      return;
   }

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





