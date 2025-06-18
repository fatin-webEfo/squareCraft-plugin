export function HoverTypoAllSelect(fontSizes, LetterSpacing) {
  return `
        <div
        class="sc-mt-2  sc-text-color-white  ">
   
    <div class="sc-mt-2  sc-text-color-white  ">
       
            <div class="sc-mt-2 sc-relative sc-grid sc-grid-cols-12 sc-gap-2 ">
              <div  class="sc-flex sc-bg-494949 sc-pl-2 sc-col-span-7 sc-cursor-pointer sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-4px sc-items-center">
                 <div>
                 <p  class="sc-font-size-12 sc-universal sc-roboto sc-font-light">
                    400
                 </p>
                 </div>
                 <div class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-px-2 sc-h-9" >
                 <img class="sc-mx-auto sc-rotate-180 " width="10px" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                 </div>
              </div>
              
              <div  class="sc-absolute sc-w-100px sc-border sc-border-solid sc-border-EF7C2F sc-hidden sc-top-10 sc-z-99999 sc-scrollBar sc-max-h-140px sc-rounded-4px sc-bg-494949 sc-flex sc-flex-col sc-overflow-hidden">
                 <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer">300</div>
                 <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer">400</div>
                 <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer">500</div>
                 <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer">600</div>
                 <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer">700</div>
                 <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer">800</div>
                 <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer">900</div>
              </div>
              
        
              <div class="sc-flex sc-text-color-white sc-rounded-4px sc-relative sc-border sc-border-solid sc-border-585858 sc-items-center">
                 <div class="sc-flex sc-text-color-white sc-justify-between sc-col-span-4 sc-rounded-4px sc-items-center">
                   <div class="sc-font-size-container sc-roboto sc-universal sc-flex sc-justify-between sc-items-center sc-rounded-4px">
                     
                     <input type="text"  value="0"
                       class="sc-font-size-input sc-font-light sc-z-99999 sc-font-size-12 sc-text-color-white sc-bg-transparent  sc-universal sc-font-light">
               
                     <div class="sc-v-line"></div>
               
                     <div class="sc-flex sc-items-center sc-justify-center sc-ml-2">
                       <p class="sc-font-light sc-text-center sc-font-size-12 sc-universal">px</p>
                     </div>
               
                     <div 
                       class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-cursor-pointer sc-px-1_5 sc-tooltip-target"
                       style="height: 28px; margin-left: 12px; border-radius: 0px 5px 5px 0px;">
                       <div class="sc-tooltip sc-hidden">
                         <div class="tooltip-arrow"></div>
                         Letter spacing
                       </div>
                       <img  loading="lazy"
                         src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                         style="width: 12px;" class=" sc-mx-auto sc-cursor-pointer">
                     </div>
                   </div>
               
                   <div 
                     class="sc-absolute sc-hidden sc-scrollBar sc-z-99999 sc-border sc-border-solid sc-border-EF7C2F sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-12 sc-rounded-4px sc-border-585858 sc-mt-1">
                     ${ButtonLetterSpacing?.map(
                       (gap) => `
                       <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="${gap}">
                         ${gap}
                       </div>`
                     ).join("")}
                   </div>
                 </div>
               </div>
               
        
           </div>
    
    
            </div>


        </div>
         `;
}
