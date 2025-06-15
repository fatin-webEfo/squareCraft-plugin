export function typoAllSelect(fontSizes, LetterSpacing) {
  return `
       <div
       class="sc-mt-2 sc-relative sc-grid  sc-grid-cols-12 sc-gap-2 ">
  
       <div id="scFontSelect"
         class="sc-flex sc-relative sc-bg-494949 sc-h-9 sc-cursor-pointer sc-col-span-8 sc-rounded-4px sc-justify-between sc-border sc-border-solid sc-border-585858 sc-items-center">
              <p id="font-name" class="sc-font-size-12 sc-roboto sc-font-light" style="background: transparent; color: white; border: none; outline: none; appearance: none; padding: 0 8px;">
              Select Font
              </p>
              <div class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-px-2 sc-h-9">
              <img class="sc-rotate-180" width="12px" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
              </div>
           
           </div>
           <div id="buttonFontFamilyOptions" class="sc-absolute sc-border sc-border-solid sc-border-EF7C2F sc-w-190px sc-hidden sc-top-10 sc-z-999999 sc-scrollBar sc-h-dropdown sc-rounded-4px  sc-bg-494949 sc-flex sc-flex-col sc-overflow-hidden">

           </div>
  
  
  
       <div
          class="sc-flex sc-bg-transparent sc-h-9 sc-text-color-white sc-justify-between sc-col-span-4   sc-rounded-4px sc-border sc-border-solid sc-border-585858 sc-items-center ">
          <div class="sc-flex sc-text-color-white sc-items-center ">
            <div
               class="sc-flex sc-text-color-white sc-justify-between sc-col-span-4 sc-rounded-4px sc-items-center  ">
               <div
                  class="sc-font-size-container sc-roboto sc-universal sc-flex sc-justify-between sc-items-center  sc-items-center sc-rounded-4px ">
                  <input type="text" id="scButtonFontSizeInput" value="16"
                     class="sc-font-size-input sc-font-light sc-z-99999 sc-font-size-12 sc-text-color-white sc-bg-transparent  sc-universal sc-font-light">
                  <div class="sc-v-line"></div>
                  <div class="sc-flex sc-items-center  sc-justify-center  sc-items-center">
                     <p class=" sc-font-light sc-text-center sc-font-size-12 sc-mx-2  ">
                        px
                  </div>
                  <div id="scButtonFontSizeSelect" class="sc-bg-3f3f3f sc-cursor-pointer sc-px-2 sc-ml-1_2"
                     style="height: 28px;    border-radius: 0px 5px 5px 0px;">
                     <img class=" sc-rotate-180 sc-mt-3" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>
               <div id="scButtonFontSizeOptions" class="sc-z-99999 sc-border sc-border-solid sc-border-EF7C2F sc-hidden sc-scrollBar sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-12
            sc-rounded-4px sc-border sc-border-585858 sc-absolute 
            sc-mt-1">
                  ${fontSizes
                    ?.map(
                      (size) => `
                  <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-font-size-12" data-value="${size}">
                     ${size}</div>`
                    )
                    .join("")}
               </div>
            </div>
         </div>
          <div class="sc-border-r sc-border-585858 "></div>
       </div>
    </div>
      
       <div
          class="sc-mt-2  sc-grid sc-grid-cols-12 sc-gap-2 ">
           <div id="scButtonFontWeightSelect" class="sc-flex sc-bg-494949 sc-pl-2 sc-col-span-7 sc-cursor-pointer sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-4px sc-items-center">
           <div>
           <p id="scButtonFontWeightSelected" class="sc-font-size-12 sc-universal sc-roboto sc-font-light">
              400
           </p>
           </div>
           <div class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-px-2 sc-h-9" >
           <img class="sc-mx-auto sc-rotate-180 " width="10px" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
           </div>
        </div>
  
          <div class="sc-col-span-5 sc-px-1 sc-bg-3f3f3f sc-inActiveTab-border sc-flex sc-justify-between sc-items-center  sc-rounded-4px">
             <p id="textcolorHtml" class="sc-text-sm sc-poppins sc-universal">Select</p>
             <div id="textColorPalate" class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
          </div>
         <div>
          
         </div>
       </div>
       <div
          class=" sc-flex  sc-gap-2 ">
 
          
          <div
             class="sc-flex sc-col-span-5 sc-justify-between  sc-items-center ">
            <div
                class="sc-flex sc-items-center  id="squareCraftAllTextAlign">
                
                <div id="scTextAlignLeft" data-align="left" class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer sc-rounded-l">
  
                   <img 
                      src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                      class=" alignment-icon   sc-mx-auto" alt="left">
                </div>
                 <div id="scTextAlignCenter" data-align="center" class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer ">
  
                   <img 
                      src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                      class=" alignment-icon   sc-mx-auto" alt="center">
                </div>
                 <div id="scTextAlignRight" data-align="right" class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer">
  
                   <img 
                      src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                      class=" alignment-icon   sc-mx-auto" alt="right">
                </div>
                <div id="scTextAlignJustify" data-align="justify" class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer sc-rounded-r">
  
                   <img 
                      src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                      class=" alignment-icon   sc-mx-auto" alt="justify">
                </div>
                
             </div>
          </div>
 
 
          <div class="sc-flex sc-text-color-white sc-rounded-4px sc-relative sc-border sc-border-solid sc-border-585858 sc-items-center">
          <div class="sc-flex sc-text-color-white sc-justify-between sc-col-span-4 sc-rounded-4px sc-items-center">
            <div class="sc-font-size-container sc-roboto sc-universal sc-flex sc-justify-between sc-items-center sc-rounded-4px">
              
              <input type="text" id="scButtonLetterSpacingInput" value="0"
                class="sc-font-size-input sc-font-light sc-z-99999 sc-font-size-12 sc-text-color-white sc-bg-transparent  sc-universal sc-font-light">
        
              <div class="sc-v-line"></div>
        
              <div class="sc-flex sc-items-center sc-justify-center sc-px-7px">
                <p class="sc-font-light sc-text-center sc-font-size-12 sc-universal">px</p>
              </div>
        
              <div id="scButtonLetterSpacingSelect"
                class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-cursor-pointer sc-px-1_5 sc-tooltip-target"
                style="height: 28px;  border-radius: 0px 5px 5px 0px;">
                <div class="sc-tooltip sc-hidden">
                  <div class="tooltip-arrow"></div>
                  Letter spacing
                </div>
                <img id="scButtonLetterSpacingDropdown" loading="lazy"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                  style="width: 12px;" class=" sc-mx-auto sc-cursor-pointer">
              </div>
            </div>
        
            <div id="scButtonLetterSpacingOptions"
              class="sc-absolute sc-hidden sc-scrollBar sc-z-99999 sc-border sc-border-solid sc-border-EF7C2F sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-12 sc-rounded-4px sc-border-585858 sc-mt-1">
              ${LetterSpacing?.map(
                (gap) => `
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="${gap}">
                  ${gap}
                </div>`
              ).join("")}
            </div>
          </div>
        </div>
         <div class="sc-flex sc-text-color-white sc-rounded-4px sc-relative sc-border sc-border-solid sc-border-585858 sc-items-center">
          <div class="sc-flex sc-text-color-white sc-justify-between sc-col-span-4 sc-rounded-4px sc-items-center">
            <div class="sc-font-size-container sc-roboto sc-universal sc-flex sc-justify-between sc-items-center sc-rounded-4px">
              
              <input type="text" id="scButtonLetterSpacingInput" value="0" class="sc-font-size-input sc-font-light sc-z-99999 sc-font-size-12 sc-text-color-white sc-bg-transparent  sc-universal sc-font-light">
        
              <div class="sc-v-line"></div>
        
              <div class="sc-flex sc-items-center sc-justify-center sc-px-7px">
                <p class="sc-font-light sc-text-center sc-font-size-12 sc-universal">px</p>
              </div>
        
              <div id="scButtonLetterSpacingSelect" class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-cursor-pointer sc-px-1_5 sc-tooltip-target" style="height: 28px;  border-radius: 0px 5px 5px 0px;">
                <div class="sc-tooltip sc-hidden">
                  <div class="tooltip-arrow"></div>
                  Letter spacing
                </div>
              <img id="scLetterSpacingDropdown" loading="lazy"
   src="https://i.ibb.co.com/G460VVdR/Vector.png"
 style="width: 15px;"  class=" sc-px-1 sc-flex sc-items-center sc-justify-center sc-mx-auto sc-cursor-pointer">
              </div>
            </div>
        
            <div id="scButtonLetterSpacingOptions" class="sc-absolute sc-hidden sc-scrollBar sc-z-99999 sc-border sc-border-solid sc-border-EF7C2F sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-12 sc-rounded-4px sc-border-585858 sc-mt-1">
              
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="0">
                  0
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="1">
                  1
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="2">
                  2
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="3">
                  3
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="4">
                  4
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="5">
                  5
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="6">
                  6
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="7">
                  7
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="8">
                  8
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="9">
                  9
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="10">
                  10
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="11">
                  11
                </div>
                <div class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12" data-value="12">
                  12
                </div>
            </div>
          </div>
        </div>
  
       </div>
  
       <div
      class="sc-flex sc-col-span-6 sc-mt-2 sc-justify-between  sc-items-center ">
     <div
         class="sc-flex sc-items-center" id="squareCraftAllTextTransform">
         
         <div id="scTextTransformUppercase" 
                   data-text-transform="uppercase"  class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer sc-rounded-l">
 
            <p class="sc-universal sc-poppins sc-text-sm squareCraft-text-transform">AG</p>
         </div>
          <div id="scTextTransformLowercase" 
                   data-text-transform="lowercase"  data-align="center" class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer ">
 
           <p class="sc-universal sc-poppins sc-text-sm squareCraft-text-transform">ag</p>
         </div>
          <div id="scTextTransformCapitalize" 
                   data-text-transform="capitalize"  data-align="right" class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer">
 
           <p class="sc-universal sc-poppins sc-text-sm squareCraft-text-transform">Ag</p>
         </div>
         <div id="scTextTransformNone" 
                   data-text-transform="small-caps"  class="sc-pt-1 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer sc-rounded-r">
           <p class="sc-universal sc-poppins sc-text-sm squareCraft-text-transform">AG</p>
         </div>
         </div>
      </div>
  
       <div class="sc-mt-4 ">
          <p class="sc-text-xs sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-poppins">Text Highlight</p>
          <div class="sc-py-4px sc-mt-2 sc-bg-3f3f3f sc-inActiveTab-border sc-w-50 sc-flex sc-justify-between sc-items-center sc-px-1 sc-rounded-4px">
             <p class="sc-text-sm sc-poppins c-font-light sc-universal" id="texHeightlistHtml">Select</p>
             <div id="texHeightlistPalate" class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
          </div>
       </div>
        `;
}
