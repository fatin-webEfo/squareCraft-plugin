import { createHeadingDropdown } from 'https://fatin-webefo.github.io/squareCraft-plugin/generateHeadingDropdown.js';


export function WidgetTypoSection(){
    
   const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
   const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
   
    return `
     <div id="typoSection">
      <div  class="sc-flex sc-p-2 sc-items-center sc-justify-between">
         <div class="sc-flex sc-gap-2 sc-items-center">
            <img loading="lazy" src="https://fatin-webefo.github.io/squareCraft-plugin/public/T.svg" alt="">
            <p class="sc-universal sc-poppins">Typography</p>
         </div>
         <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
      </div>
      <div class="sc-h-1px sc-bg-3f3f3f"></div>
      <div class="sc-flex sc-px-2   sc-items-center sc-justify-between">
         <div class="sc-flex sc-gap-2 sc-items-center">
            <div class="toggle-container" id="toggleSwitch">
               <div class="toggle-bullet"></div>
            </div>
            <p id="toggleText" class="sc-text-sm sc-poppins">Enable</p>
         </div>
        <div class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-1 sc-bg sc-bg-454545">
        <p class="sc-font-light sc-universal sc-text-sm sc-text-xs">Reset</p>
        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" alt="reset">
        </div>
      </div>
      <div class="sc-h-1px  sc-bg-3f3f3f"></div>
      <div class="sc-mt-2">
         <div class="sc-flex sc-poppins sc-px-2  sc-items-center sc-justify-between sc-gap-2">
            <div
               class="sc-cursor-pointer sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-text-sm sc-py-1 sc-rounded-6px sc-text-color-white sc-justify-center">
               Normal
            </div>
            <div
               class="sc-cursor-pointer sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-text-sm sc-py-1 sc-rounded-6px sc-items-center sc-justify-center">
               Hover
            </div>
         </div>
         <div class="sc-px-4">
            <div class="sc-h-1px  sc-mt-2 sc-bg-3f3f3f"></div>
         </div>
      </div>
      <div class=" sc-mt-2 sc-px-2 sc-flex sc-justify-between">
         <p class="sc-text-sm sc-universal sc-poppins sc-text-gray-300">Text</p>
         <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
      </div>

      <div>
         <div id="heading1Part" class="sc-hidden" >

            <div class="sc-flex  sc-mt-2 sc-px-2">

               <div id="heading1"
                  class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <div class="sc-active-bar sc-rounded-l"></div>
                  <p class="sc-poppins  sc-universal sc-text-sm ">Heading-1</p>
                  <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>

            ${createHeadingDropdown('heading1Dropdown', fontSizes, LetterSpacing)}
         </div>

         <div id="heading2Part" class="sc-hidden">
            <div class="sc-flex sc-mt-2 sc-px-2">
               <div id="heading2"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <p class="sc-poppins sc-universal sc-text-sm ">Heading-2</p>
                  <img id="heading2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            ${createHeadingDropdown('heading2Dropdown', fontSizes, LetterSpacing)}
         </div>

         <div id="heading3Part" class="sc-hidden">
            <div class="sc-flex sc-mt-2 sc-px-2">
               <div id="heading3"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <p class="sc-poppins sc-universal sc-text-sm ">Heading-3</p>
                  <img id="heading3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            ${createHeadingDropdown('heading3Dropdown', fontSizes, LetterSpacing)}
         </div>

         <div id="heading4Part" class="sc-hidden">
            <div class="sc-flex sc-mt-2 sc-px-2">
               <div id="heading4"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <p class="sc-poppins sc-universal sc-text-sm ">Heading-4</p>
                  <img id="heading4Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            ${createHeadingDropdown('heading4Dropdown', fontSizes, LetterSpacing)}
         </div>

         <div id="paragraph1Part" class="sc-hidden">
            <div class="sc-flex sc-mt-2 sc-px-2">
               <div id="paragraph1"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <p class="sc-poppins sc-universal sc-text-sm ">Paragraph-1</p>
                  <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            ${createHeadingDropdown('paragraph1Dropdown', fontSizes, LetterSpacing)}
         </div>

         <div id="paragraph2Part" class="sc-hidden">
            <div class="sc-flex sc-mt-2 sc-px-2">
               <div id="paragraph2"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <p class="sc-poppins sc-universal sc-text-sm ">Paragraph-2</p>
                  <img id="paragraph2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            ${createHeadingDropdown('paragraph2Dropdown', fontSizes, LetterSpacing)}
         </div>

         <div id="paragraph3Part" class="sc-hidden">
            <div class="sc-flex sc-mt-2 sc-px-2">
               <div id="paragraph3"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <p class="sc-poppins sc-universal sc-text-sm ">Paragraph-3</p>
                  <img id="paragraph3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            ${createHeadingDropdown('paragraph3Dropdown', fontSizes, LetterSpacing)}
         </div>
      </div>


      <div class="sc-mt-4"> </div>
    </div>
    `
}