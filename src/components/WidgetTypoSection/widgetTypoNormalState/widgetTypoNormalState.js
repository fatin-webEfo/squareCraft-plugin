
import { createHeadingDropdown } from "https://fatin-webefo.github.io/squareCraft-plugin/generateHeadingDropdown.js";

export function widgetTypoNormalState(){
   const fontSizes = Array.from({ length: 40 }, (_, i) => `${i + 1}`),
     LetterSpacing = Array.from({ length: 40 }, (_, i) => `${i}`);
    return `
    <div id="typo-normal-state-section">
      <div class=" sc-mt-2 sc-px-2 sc-flex sc-justify-between">
   <p class="sc-text-sm sc-universal sc-roboto sc-text-gray-300">Text</p>
   <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
</div>
<div>
   <div id="heading1Part" class="sc-hidden" >
      <div class="sc-flex  sc-mt-2 sc-px-2">
         <div id="heading1"
            class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
            <div class="sc-active-bar sc-rounded-l"></div>
            <p class="sc-roboto  sc-universal ">Heading-1</p>
            <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
               class="sc-rotate-180" alt="">
         </div>
      </div>
      ${createHeadingDropdown("heading1Dropdown", fontSizes, LetterSpacing)}
   </div>
   <div id="heading2Part" class="sc-hidden">
      <div class="sc-flex sc-mt-2 sc-px-2">
         <div id="heading2"
            class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
            <p class="sc-roboto sc-font-size-14 sc-universal ">Heading-2</p>
            <img id="heading2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
               class="sc-rotate-180" alt="">
         </div>
      </div>
      ${createHeadingDropdown("heading2Dropdown", fontSizes, LetterSpacing)}
   </div>
   <div id="heading3Part" class="sc-hidden">
      <div class="sc-flex sc-mt-2 sc-px-2">
         <div id="heading3"
            class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
            <p class="sc-roboto sc-font-size-14 sc-universal ">Heading-3</p>
            <img id="heading3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
               class="sc-rotate-180" alt="">
         </div>
      </div>
      ${createHeadingDropdown("heading3Dropdown", fontSizes, LetterSpacing)}
   </div>
   <div id="heading4Part" class="sc-hidden">
      <div class="sc-flex sc-mt-2 sc-px-2">
         <div id="heading4"
            class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
            <p class="sc-roboto sc-font-size-14 sc-universal ">Heading-4</p>
            <img id="heading4Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
               class="sc-rotate-180" alt="">
         </div>
      </div>
      ${createHeadingDropdown("heading4Dropdown", fontSizes, LetterSpacing)}
   </div>
   <div id="paragraph1Part" class="sc-hidden">
      <div class="sc-flex sc-mt-2 sc-px-2">
         <div id="paragraph1"
            class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
            <p class="sc-roboto sc-font-size-14 sc-universal  ">Paragraph-1</p>
            <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
               class="sc-rotate-180" alt="">
         </div>
      </div>
      ${createHeadingDropdown(
         "paragraph1Dropdown",
         fontSizes,
         LetterSpacing
      )}
   </div>
   <div id="paragraph2Part" class="sc-hidden">
      <div class="sc-flex sc-mt-2 sc-px-2">
         <div id="paragraph2"
            class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
            <p class="sc-roboto sc-font-size-14 sc-universal  ">Paragraph-2</p>
            <img id="paragraph2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
               class="sc-rotate-180" alt="">
         </div>
      </div>
      ${createHeadingDropdown(
         "paragraph2Dropdown",
         fontSizes,
         LetterSpacing
      )}
   </div>
   <div id="paragraph3Part" class="sc-hidden">
      <div class="sc-flex sc-mt-2 sc-px-2">
         <div id="paragraph3"
            class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
            <p class="sc-roboto sc-font-size-14 sc-universal  ">Paragraph-3</p>
            <img id="paragraph3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
               class="sc-rotate-180" alt="">
         </div>
      </div>
      ${createHeadingDropdown(
         "paragraph3Dropdown",
         fontSizes,
         LetterSpacing
      )}
   </div>
</div>
  </div> 
    `;
}