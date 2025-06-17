  import { HovercreateHeadingDropdown } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/WidgetTypoSection/HovercreateHeadingDropdown/HovercreateHeadingDropdown.js";

  export function widgetTypoHoverState() {
    const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
    const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    return `
      <div id="typo-hover-state" class="sc-hidden sc-mt-2 ">
        <div class="sc-px-2 sc-mt-2 sc-flex sc-justify-between">
      <p class="sc-text-sm sc-universal sc-roboto sc-text-gray-300"> Hover Text</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
   </div>
   <div>
      <div id="hover-heading1Part" class="sc-hidden">
         <div class="sc-flex  sc-mt-2 sc-px-2">
            <div id="hover-heading1"
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <div class="sc-active-bar sc-rounded-l"></div>
               <p class="sc-roboto  sc-universal ">Heading-1</p>
               <img id="hover-heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
         ${HovercreateHeadingDropdown("hover-heading1Dropdown", fontSizes, LetterSpacing)}
      </div>
      <div id="hover-heading2Part" class="sc-hidden">
         <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="hover-heading2"
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <p class="sc-roboto sc-font-size-14 sc-universal ">Heading-2</p>
               <img id="hover-heading2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
         ${HovercreateHeadingDropdown("hover-heading2Dropdown", fontSizes, LetterSpacing)}
      </div>
      <div id="hover-heading3Part" class="sc-hidden">
         <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="hover-heading3"
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <p class="sc-roboto sc-font-size-14 sc-universal ">Heading-3</p>
               <img id="hover-heading3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
         ${HovercreateHeadingDropdown("hover-heading3Dropdown", fontSizes, LetterSpacing)}
      </div>
      <div id="hover-heading4Part" class="sc-hidden">
         <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="hover-heading4"
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <p class="sc-roboto sc-font-size-14 sc-universal ">Heading-4</p>
               <img id="hover-heading4Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
         ${HovercreateHeadingDropdown("hover-heading4Dropdown", fontSizes, LetterSpacing)}
      </div>
      <div id="hover-paragraph1Part" class="sc-hidden">
         <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="hover-paragraph1"
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <p class="sc-roboto sc-font-size-14 sc-universal  ">Paragraph-1</p>
               <img id="hover-paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
         ${HovercreateHeadingDropdown(
           "hover-paragraph1Dropdown",
           fontSizes,
           LetterSpacing
         )}
      </div>
      <div id="hover-paragraph2Part" class="sc-hidden">
         <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="hover-paragraph2"
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <p class="sc-roboto sc-font-size-14 sc-universal  ">Paragraph-2</p>
               <img id="hover-paragraph2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
         ${HovercreateHeadingDropdown(
           "hover-paragraph2Dropdown",
           fontSizes,
           LetterSpacing
         )}
      </div>
      <div id="hover-paragraph3Part" class="sc-hidden">
         <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="hover-paragraph3"
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <p class="sc-roboto sc-font-size-14 sc-universal  ">Paragraph-3</p>
               <img id="hover-paragraph3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
         ${HovercreateHeadingDropdown(
           "hover-paragraph3Dropdown",
           fontSizes,
           LetterSpacing
         )}
      </div>
   </div>
      </div>
    `;
  }
