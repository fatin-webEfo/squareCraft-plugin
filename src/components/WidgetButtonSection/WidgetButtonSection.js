
import { getCurrentButtonType  } from "https://fatin-webefo.github.io/squareCraft-plugin/src/components/BlockType/detectBlockElementTypes.js";


export async function WidgetButtonSection() {
   let buttonType = getCurrentButtonType();
   let tries = 0;
   while (buttonType === "Unknown Button" && tries < 20) {
      await new Promise(res => setTimeout(res, 500));
      buttonType = getCurrentButtonType();
      tries++;
   }
   

   console.log("✅ Final Button Type Used:", buttonType);
   return `

     <div id="buttonSection">
         <div  class="sc-flex sc-p-2 sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
               <img loading="lazy" src="https://fatin-webefo.github.io/squareCraft-plugin/public/buttonicon.png" alt="">
               <p class="sc-universal sc-roboto">${buttonType}</p>
            </div>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
         </div>
         <div class="sc-h-1px sc-bg-3f3f3f"></div>
         <div class="sc-flex sc-px-2   sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
               <div class="toggle-container" id="toggleSwitch">
                  <div class="toggle-bullet"></div>
               </div>
               <p id="toggleText" class="sc-text-sm sc-roboto">Enable</p>
            </div>
           <div class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-1 sc-bg sc-bg-454545">
           <p class="sc-font-light sc-universal sc-text-sm sc-text-xs">Reset</p>
           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" alt="reset">
           </div>
         </div>
         <div class="sc-h-1px  sc-bg-3f3f3f"></div>
         <div class="sc-mt-2">
            <div class="sc-flex sc-roboto sc-px-2  sc-items-center sc-justify-between sc-gap-2">
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
            <p class="sc-text-sm sc-universal sc-roboto sc-text-gray-300">Button</p>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
         </div>
   
       
   
   
         <div class="sc-mt-4"> </div>
       </div>
    `
}