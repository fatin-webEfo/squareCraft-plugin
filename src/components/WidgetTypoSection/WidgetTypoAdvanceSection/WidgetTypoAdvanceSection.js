import { TypoAdvanceStructureSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceStructureSection/TypoAdvanceStructureSection.js";
import { TypoAdvanceScrollEffectSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceScrollEffectSection/TypoAdvanceScrollEffectSection.js";

export function WidgetTypoAdvanceSection() {
  return `
     <div id="advancedTypoSection">
     <div id="typo-advance-section">
        <div class="sc-flex sc-cursor-pointer sc-px-2 sc-mt-3 sc-items-center sc-justify-between">
           <div class="sc-flex sc-gap-2 sc-items-center">
             <img loading="lazy" src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance.png" width="19px" alt="">
             <p class="sc-universal sc-roboto">Advanced</p>
           </div>
           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="sc-rotate-180">
         </div>
         <div class="sc-h-1px sc-mt-2 sc-bg-3f3f3f"></div>
         <div class="sc-flex sc-px-2 sc-mt-2 sc-items-center sc-justify-between">
           <div class="sc-flex sc-gap-2 sc-items-center">
             <div class="toggle-container">
               <div class="toggle-bullet"></div>
             </div>
             <p class="sc-font-size-12 sc-universal sc-roboto">Enable</p>
           </div>
           <div class="sc-flex sc-gradiant-border sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-4px sc-bg sc-bg-454545">
             <p class="sc-font-thin sc-universal sc-font-size-12 sc-font-size-11 sc-roboto">
               Reset
             </p>
             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" alt="reset">
           </div>
         </div>
      ${TypoAdvanceStructureSection()}
          <div class="sc-h-1px  sc-bg-3f3f3f"></div>
      ${TypoAdvanceScrollEffectSection()}
      
    
      
        <div class="sc-mt-3"></div>
      </div>
   </div>
    `;
}
