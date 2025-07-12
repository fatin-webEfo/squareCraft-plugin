import { TypoAdvanceScrollEffectVerticalSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceScrollEffectVerticalSection/TypoAdvanceScrollEffectVerticalSection.js";
import { TypoAdvanceScrollEffectHorizontalSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceScrollEffecthorizontalSection/TypoAdvanceScrollEffecthorizontalSection.js";
import { TypoAdvanceScrollEffectOpacitySection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceScrollEffectOpacitySection/TypoAdvanceScrollEffectOpacitySection.js";
import { TypoAdvanceScrollEffectScaleSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceScrollEffectScaleSection/TypoAdvanceScrollEffectScaleSection.js";
import { TypoAdvanceScrollEffectRotateSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceScrollEffectRotateSection/TypoAdvanceScrollEffectRotateSection.js";
import { TypoAdvanceScrollEffectBlurSection } from "https://fatin-webefo.github.io/squareCraft-plugin/src/Typo/TypoAdvanceScrollEffectBlurSection/TypoAdvanceScrollEffectBlurSection.js";

export function TypoAdvanceScrollEffectSection() {
  return `
  <div id="Typo-advance-scrollEffects" class="sc-px-2 sc-mt-2">
  <div class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1  sc-rounded-4px">
     <div class="sc-flex sc-gap-2 sc-items-center">
       <img
         loading="lazy"
         src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance.png"
         width="19px"
         alt=""/>
       <p class="sc-universal sc-roboto">Scroll Effects</p>
     </div>
     <img
       src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
       alt="sc-rotate-180"
     />
   </div>
  <div class="sc-mt-2"> <p class="sc-universal sc-roboto sc-text-gray-300 sc-text-sm sc-font-thin" >Select one or multiple features to enable smooth scroll effects for the button animation. </p></div>
   <div class="sc-h-1px sc-mt-2 sc-bg-3f3f3f"></div>
   <div class="sc-flex  sc-mt-2 sc-items-center sc-justify-between">
     <div class="sc-flex sc-gap-2 sc-items-center">
       <div class="toggle-container">
         <div class="toggle-bullet"></div>
       </div>
       <p class="sc-font-size-12 sc-universal sc-roboto">Enable</p>
     </div>
     <div id="Typo-advance-scroll-reset"
       class="sc-flex sc-gradiant-border sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-4px sc-bg sc-bg-454545">
       <p
         class="sc-font-thin sc-universal sc-font-size-12 sc-font-size-11 sc-roboto">
         Reset
       </p>
       <img
         src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
         alt="reset"/>
     </div>
   </div>
   <div class=" sc-mt-2 sc-flex-col sc-gap-2">
     <div class="sc-flex">
       <div
         id="Typo-advance-vertical"
         class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px"
       >
         <div class="sc-flex sc-items-center sc-gap-8px">
           <img
             width="13px"
             src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-vertical.svg"
             loading="lazy"
             alt=""
           />
           <p class="sc-roboto sc-font-size-14 sc-universal">Vertical</p>
         </div>
         <img
           id="Typo-advance-vertical-arrow"
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
           class="rotate-180"
           alt=""
         />
       </div>
     </div>
 
    ${TypoAdvanceScrollEffectVerticalSection()}
     <div class="">
       <div
         id="Typo-advance-horizontal"
         class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px">
         <div class="sc-flex sc-items-center sc-gap-8px">
           <img
             width="18px"
             src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-horizontal.svg"
             loading="lazy"
             alt=""
           />
           <p class="sc-roboto sc-font-size-14 sc-universal">Horizontal</p>
         </div>
         <img
           id="Typo-advance-horizontal-arrow"
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
           class="sc-rotate-180"
           alt=""
         />
       </div>
      ${TypoAdvanceScrollEffectHorizontalSection()}
     </div>
     <div class=" ">
       <div
         id="Typo-advance-opacity"
         class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px">
         <div class="sc-flex sc-items-center sc-gap-8px">
           <img
             width="15px"
             src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-opacity.png"
             loading="lazy"
             alt=""
           />
           <p class="sc-roboto sc-font-size-14 sc-universal">Opacity</p>
         </div>
         <img
           id="Typo-advance-opacity-arrow"
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
           class="sc-rotate-180"
           alt=""
         />
       </div>
      ${TypoAdvanceScrollEffectOpacitySection()}
     </div>
     <div class=" ">
       <div
         id="Typo-advance-scale"
         class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
       >
         <div class="sc-flex sc-items-center sc-gap-8px">
           <img
             width="17px"
             src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-scale.png"
             loading="lazy"
             alt=""
           />
           <p class="sc-roboto sc-font-size-14 sc-universal">Scale</p>
         </div>
         <img
           id="Typo-advance-scale-arro"
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
           class="sc-rotate-180"
           alt=""
         />
       </div>
       ${TypoAdvanceScrollEffectScaleSection()}
     </div>
     <div class="">
       <div
         id="Typo-advance-rotate"
         class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
       >
         <div class="sc-flex sc-items-center sc-gap-8px">
           <img
             width="17px"
             src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-rotate.png"
             loading="lazy"
             alt=""
           />
           <p class="sc-roboto sc-font-size-14 sc-universal">Rotate</p>
         </div>
         <img
           id="Typo-advance-rotate-arrow"
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
           class="sc-rotate-180"
           alt=""
         />
       </div>
      ${TypoAdvanceScrollEffectRotateSection()}
     </div>
     <div class="">
       <div
         id="Typo-advance-blur"
         class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
       >
         <div class="sc-flex sc-items-center sc-gap-8px">
           <img
             width="15px"
             src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-blur.png"
             loading="lazy"
             alt=""
           />
           <p class="sc-roboto sc-font-size-14 sc-universal">Blur</p>
         </div>
         <img
           id="Typo-advance-blur-arrow"
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
           class="sc-rotate-180"
           alt=""
         />
       </div>
      ${TypoAdvanceScrollEffectBlurSection()}
     </div>
   </div>
 </div>
    `;
}
