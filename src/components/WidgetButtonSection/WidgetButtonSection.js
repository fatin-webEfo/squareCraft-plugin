export function WidgetButtonSection() {
  const ButtonLetterSpacing = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const fontSizes = [
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
  ];

  return `
    <div id="buttonSection">
         <div class="sc-flex sc-p-2 sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
               <img loading="lazy" src="https://fatin-webefo.github.io/squareCraft-plugin/public/buttonicon.png"
                  alt="">
               <p id="buttonTypeDisplay" class="sc-universal sc-roboto">Button</p>
            </div>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
         </div>
         <div class="sc-h-1px sc-bg-3f3f3f"></div>
         <div class="sc-flex sc-px-2 sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
               <div class="toggle-container" id="toggleSwitch">
                  <div class="toggle-bullet"></div> 
               </div>
               <p id="toggleText" class="sc-text-sm sc-roboto">Enable</p>
            </div>
            <div
               class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-1 sc-bg sc-bg-454545">
               <p class="sc-font-light sc-universal sc-text-sm sc-text-xs">Reset</p>
               <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" alt="reset">
            </div>
         </div>
         <div class="sc-h-1px sc-bg-3f3f3f"></div>
         <div class="sc-mt-2">
            <div class="sc-flex sc-roboto sc-px-2 sc-items-center sc-justify-between sc-gap-2">
               <div id="buttonNormalStateClick"
                  class="sc-cursor-pointer sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-text-sm sc-py-1 sc-rounded-6px sc-text-color-white sc-justify-center">
                  Normal
               </div>
               <div id="buttonHoverStateClick"
                  class="sc-cursor-pointer sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-text-sm sc-py-1 sc-rounded-6px sc-items-center sc-justify-center">
                  Hover
               </div>
            </div>
            <div class="sc-px-4">
               <div class="sc-h-1px sc-mt-2 sc-bg-3f3f3f"></div>
            </div>
         </div>
         <div class="sc-mt-2 sc-px-2 sc-flex sc-justify-between">
            <p class="sc-text-sm sc-universal sc-roboto sc-text-gray-300">Button</p>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
         </div>
         <div id="ButtonNormalState" class="sc-mt-4 sc-px-2">
            <div class="sc-flex ">

               <div id="fontButton"
                  class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <div class="sc-active-bar sc-rounded-l"></div>
                  <p class="sc-roboto  sc-universal ">Font</p>
                  <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
         <div id="fontSection">
            <div class=" sc-relative sc-grid sc-mt-3 sc-grid-cols-12 sc-gap-2 ">

               <div id="buttonFontFamilyButton" class="sc-flex sc-relative sc-bg-494949 sc-h-9 sc-cursor-pointer sc-col-span-8 sc-rounded-6px sc-justify-between sc-border sc-border-solid sc-border-585858 sc-items-center">
                  <p class="sc-text-sm sc-roboto sc-font-light" style="background: transparent; color: white; border: none; outline: none; appearance: none; padding: 0 8px;">
                  Select Font
                  </p>
                  <div class="sc-bg-3f3f3f sc-px-2" style="height: 27px; padding: 0 3px; pointer-events: none;">
                  <img class="sc-rotate-180 sc-mt-3" width="12px" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               
               </div>
               <div id="buttonFontFamilyOptions" class="sc-absolute sc-border sc-border-solid sc-border-EF7C2F sc-w-190px sc-hidden sc-top-10 sc-z-99999 sc-scrollBar sc-h-dropdown sc-rounded-6px  sc-bg-494949 sc-flex sc-flex-col sc-overflow-hidden">
               <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-cursor-pointer" style="font-family: Arial, sans-serif;">Arial</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-cursor-pointer" style="font-family: 'Times New Roman', serif;">Times New Roman</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-cursor-pointer" style="font-family: 'Courier New', monospace;">Courier New</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-cursor-pointer" style="font-family: 'Georgia', serif;">Georgia</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-cursor-pointer" style="font-family: 'Verdana', sans-serif;">Verdana</div>
               </div>
               



            <div 
               class="sc-flex sc-bg-transparent  sc-h-9 sc-text-color-white sc-justify-between sc-col-span-4   sc-rounded-6px sc-border sc-border-solid sc-border-585858 sc-items-center ">
               <div class="sc-flex sc-text-color-white sc-items-center ">
                  <div
                     class="sc-flex sc-text-color-white sc-justify-between sc-col-span-4 sc-rounded-6px sc-items-center  ">
                     <div
                        class="sc-font-size-container sc-roboto sc-universal sc-flex sc-justify-between sc-items-center  sc-items-center sc-rounded-6px">
                        <input type="text" id="scButtonFontSizeInput" value="16"
                           class="sc-font-size-input sc-font-light sc-z-99999 sc-text-sm sc-text-color-white sc-bg-transparent  sc-universal sc-font-light">
                        <div class="sc-v-line"></div>
                        <div class="sc-flex sc-items-center  sc-justify-center  sc-items-center">
                           <p class=" sc-font-light sc-text-center sc-text-sm sc-ml-2  ">
                              px
                        </div>
                        <div id="scButtonFontSizeSelect" class="sc-bg-3f3f3f sc-cursor-pointer sc-px-1_5"
                           style="height: 28px;  margin-left: 0.85rem;   border-radius: 0px 5px 5px 0px;">
                           <img class=" sc-rotate-180 sc-mt-3" width="12px"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                        </div>
                     </div>
                     <div id="scButtonFontSizeOptions" class="sc-z-99999 sc-border sc-border-solid sc-border-EF7C2F sc-hidden sc-scrollBar sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-12
                  sc-rounded-6px sc-border sc-border-585858 sc-absolute 
                  sc-mt-1">
                        ${fontSizes
                        ?.map(
                           (size) => `
                        <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-text-sm" data-value="${size}">
                           ${size}</div>
                        `
                        )
                        .join("")}
                     </div>
                  </div>
               </div>
               <div class="sc-border-r sc-border-585858 "></div>
            </div>
         </div>

         <div class="sc-mt-2 sc-relative sc-grid sc-grid-cols-12 sc-gap-2 ">
            <div id="scButtonFontWeightSelect" class="sc-flex sc-bg-494949 sc-pl-2 sc-col-span-7 sc-cursor-pointer sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-6px sc-items-center">
               <div>
               <p id="scButtonFontWeightSelected" class="sc-text-sm sc-universal sc-roboto sc-font-light">
                  400
               </p>
               </div>
               <div class="sc-bg-3f3f3f sc-px-2" style="height: 27px; padding: 0 8px;">
               <img class="sc-mx-auto sc-rotate-180 sc-mt-3" width="10px" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
               </div>
            </div>
            
            <div id="scButtonFontWeightOptions" class="sc-absolute sc-w-190px sc-border sc-border-solid sc-border-EF7C2F sc-hidden sc-top-10 sc-z-99999 sc-scrollBar sc-h-dropdown sc-rounded-6px sc-bg-494949 sc-flex sc-flex-col sc-overflow-hidden">
               <div class="sc-dropdown-item sc-py-1px sc-text-center sc-text-sm sc-cursor-pointer">300</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center sc-text-sm sc-cursor-pointer">400</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center sc-text-sm sc-cursor-pointer">500</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center sc-text-sm sc-cursor-pointer">600</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center sc-text-sm sc-cursor-pointer">700</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center sc-text-sm sc-cursor-pointer">800</div>
               <div class="sc-dropdown-item sc-py-1px sc-text-center sc-text-sm sc-cursor-pointer">900</div>
            </div>
            

            <div class="sc-flex sc-text-color-white sc-px-1 
            sc-rounded-6px sc-relative sc-border sc-border-solid sc-border-585858 
            sc-items-center ">
               <div class="sc-Letter-spacing-container sc-flex sc-justify-between sc-items-center sc-flex sc-items-center sc-border 
               sc-border-solid sc-border-3d3d3d  sc-rounded-6px 
               ">
                  <input type="text" id="scButtonLetterSpacingInput" value="15px" class="sc-Letter-spacing-input sc-font-light sc-text-sm sc-text-color-white 
                  sc-bg-transparent sc-w-full  sc-py-1px sc-font-light">
                  <div id="scButtonLetterSpacingSelect" class="sc-mx-auto sc-ml-1 sc-flex sc-items-center sc-justify-center">
                     <img id="scButtonLetterSpacingDropdown" loading="lazy"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                        style="width: 12px;"
                        class=" sc-px-1 sc-flex sc-items-center sc-justify-center sc-mt-1 sc-mx-auto sc-cursor-pointer">
                  </div>
               </div>
               <div id="scButtonLetterSpacingOptions" class="sc-hidden sc-scrollBar sc-z-99999 sc-border sc-border-solid sc-border-EF7C2F sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-12
               sc-rounded-6px sc-border sc-border-585858 sc-absolute 
               sc-mt-1">
                  ${ButtonLetterSpacing?.map(
                     (gap) => `
                  <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-text-sm" data-value="${gap}">${gap}
                  </div>
                  `
                  ).join("")}
               </div>
            </div>

         </div>
         <div class=" sc-flex sc-mt-2 sc-gap-2 ">



         
      <div class="sc-flex sc-col-span-6 sc-justify-between  sc-items-center ">
            <div class="sc-flex sc-items-center  ">

               <div id="scButtonAllCapital" 
                  class="sc-pt-1_5 sc-pb-1 sc-px-2 sc-inActiveTab-border sc-cursor-pointer sc-rounded-l">

                  <p class="sc-universal sc-roboto sc-text-sm">AG</p>
               </div>
               <div id="scButtonAllSmall" 
                  class="sc-pt-1_5 sc-pb-1 sc-px-2 sc-inActiveTab-border sc-cursor-pointer ">

                  <p class="sc-universal sc-roboto sc-text-sm">ag</p>
               </div>
               <div id="scButtonFirstCapital" 
                  class="sc-pt-1_5 sc-pb-1 sc-px-2 sc-inActiveTab-border sc-rounded-r sc-cursor-pointer">

                  <p class="sc-universal sc-roboto sc-text-sm">Ag</p>
               </div>
            </div>
         </div>
         </div>

      
         </div>


            <div id="colorButton"
               class="sc-bg-3f3f3f sc-mt-4 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
               <p class="sc-roboto  sc-universal ">Color</p>
               <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
            <div id="colorSection" class="sc-mt-3 sc-hidden">
            <div class="sc-items-center sc-gap-3  sc-flex">
               <div id="bgColorSection" class=" ">
                  <p class="sc-text-xs sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">background Color
                  </p>
                  <div class="sc-col-span-5 sc-mt-2 sc-z-99999 sc-relative ">
                     <div class="sc-flex sc-w-30 sc-justify-between sc-items-center sc-px-2 sc-bg-3f3f3f sc-inActiveTab-border sc-rounded-6px sc-py-0_5">
                     <p id="buttonFontColorCode" class="sc-text-sm sc-roboto sc-universal">Select</p>
                     <div id="buttonFontColorPalate" class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                     </div>
                  
                     <div id="button-font-color-palette"
                     class="sc-absolute sc-z-99999 sc-border sc-hidden sc-border-solid sc-border-EF7C2F sc-top-12 sc-bg-3f3f3f sc-left-0 sc-p-1 sc-rounded-6px">
                     <div class="sc-button-fontcolor-arrow"></div>
                  
                     <div class="sc-flex sc-items-center sc-justify-between">
                        <div id="button-border-colors" class="sc-flex sc-relative sc-items-center sc-gap-1"></div>
                  
                        <div class="sc-rounded-15px sc-px-1_5 sc-py-0_5 sc-bg-454545 sc-flex sc-gap-1">
                           <p class="sc-universal sc-text-xs sc-roboto">RGB</p>
                           <img id="buttonParagraph1Arrow" width="10"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                           class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  
                     <div class="sc-h-1px sc-mt-2 sc-bg-color-gray"></div>
                  
                     <div class="sc-flex color-h-selection sc-mt-2 sc-items-center sc-gap-2">
                        <div id="button-color-selection-field" class="sc-relative">
                           <div id="button-color-selection-bar"
                           class="sc-w-2 sc-h-2 sc-absolute sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white">
                           </div>
                        </div>
                  
                        <div id="button-color-transparency-field" class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                           <div id="button-color-transparency-bar"
                           class="sc-absolute sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2">
                           </div>
                        </div>
                  
                        <div id="button-all-color-selection-field" class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                           <div id="button-all-color-selection-bar"
                           class="sc-absolute sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2">
                           </div>
                        </div>
                     </div>
                  
                     <div class="sc-flex sc-justify-between sc-mt-3 sc-px-2 sc-py-0_5 sc-rounded-6px sc-bg-454545">
                        <p id="button-color-code" class="sc-text-sm sc-roboto sc-font-light sc-universal">Select</p>
                        <p id="button-color-transparency-count" class="sc-text-sm sc-roboto sc-font-light sc-universal">100%</p>
                     </div>
                     </div>
                  </div>
               </div>
               <div id="textColorSection" class=" ">
                  <p class="sc-text-xs sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">Text Color
                  </p>
                  <div
                     class="sc-py-0_5 sc-mt-2 sc-w-30 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-2 sc-rounded-6px">
                     <p class="sc-text-sm sc-roboto c-font-light sc-universal">#363544</p>
                     <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                  </div>
               </div>
            </div>
            </div>


               <div id="iconButton"
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
                  <p class="sc-roboto  sc-universal ">Icon</p>
                  <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
      
            <div id="iconSection" class="sc-mt-3  sc-hidden">
            <div class="">
               <div class="sc-flex sc-items-center sc-gap-2">
                  <div>
                     <p class="sc-roboto sc-universal sc-text-sm sc-font-light sc-text-gray-300">Icon</p>
                     <div class="sc-flex sc-items-center  sc-mt-2">

                        <div 
                           class="sc-pt-1_5 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer sc-rounded-l">

                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/redo.svg"
                              class=" alignment-icon   sc-mx-auto" alt="left">
                        </div>
                        <div id="imageupload" 
                           class="sc-pt-1_5 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer ">

                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/imageupload.svg"
                              class=" alignment-icon   sc-mx-auto" alt="center">
                        </div>
                        <div id="iconLibraryButton"
                           class="sc-pt-1_5 sc-pb-1 sc-relative sc-roudned-r-md sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer">

                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/iconLibrary.svg"
                              class=" alignment-icon   sc-mx-auto" alt="right">

                              <div class="sc-absolute sc-hidden sc-p-2 sc-z-99999 sc-w-240 sc-border sc-border-solid sc-border-EF7C2F sc-rounded-md sc-top-12 sc-bg-color-3d3d3d  sc-left-0">
                               <div
                               style="
                                 position: absolute;
                                 top: -8px;
                                 left: 6px;
                                 width: 0;
                                 height: 0;
                                 border-left: 7px solid transparent;
                                 border-right: 7px solid transparent;
                                 border-bottom: 7px solid #fd8905;
                                 z-index: 99999;
                               "
                             ></div>
                            <div class="sc-absolute sc-flex sc-items-center sc-gap-3">
                            <div id="buttonIconSolidClick" class="sc-px-6 sc-py-4px sc-rounded-lg sc-bg-3f3f3f">
                              <div  class="sc-roboto   sc-text-xs sc-font-light sc-text-EF7C2F" >Solid</div>
                            </div>
                            <div id="buttonIconOutlineClick" class="sc-px-6 sc-py-4px sc-rounded-lg sc-bg-3f3f3f">
                              <div class="sc-roboto   sc-text-xs sc-font-light " >Outline</div>
                            </div>
                            </div>

                            <div id="buttonIconOutlineoptions" class="sc-mt-8 sc-scrollBar sc-justify-between sc-rounded-md sc-gap-2 sc-h-44 sc-p-1 sc-grid-cols-6 sc-bg-color-2c2c2c  ">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                            </div>
                            <div class="buttonIconSolidoptions"></div>
                              </div>
                        </div>

                     </div>
                  </div>
                  <div>
                     <p class="sc-roboto sc-universal sc-text-sm sc-font-light sc-text-gray-300">Icon Position</p>
                     <div class="sc-flex sc-mt-2 sc-relative sc-items-center">
                        <div id="iconPositionLabel" class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-16">
                        <p class="sc-universal sc-roboto sc-text-sm">Before</p>
                        </div>
                     
                        <div id="iconPositionDropdown" class="sc-absolute sc-rounded-6px  sc-border sc-border-solid sc-border-EF7C2F sc-hidden  sc-left-0 sc-top-[35px] sc-z-50">
                        <div class="sc-bg-3f3f3f sc-py-1 sc-text-sm sc-px-2 sc-w-16 sc-border-b sc-bg-colo-EF7C2F-hover  sc-cursor-pointer" data-value="before">Before</div>
                        <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="after">After</div>
                        </div>
                     
                        <div id="buttoniconPositionSection" class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" alt="">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" class="sc-rotate-180" alt="">
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>


         
            <div class="sc-mt-4 sc-flex sc-items-center sc-gap-2">
             
                 <div class="sc-w-full">
                  <div class=" sc-mt-3 sc-flex sc-w-full sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Rotation
                        </p>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
      
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                              alt="reset">
                        </div>
                     </div>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p id="buttoniconRotationradiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>
                  <div id="buttonIconRotationradiousField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div id="buttonIconRotationradiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                     <div id="buttonIconRotationradiousBullet"
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>
                  <div class="sc-mt-2 sc-flex sc-items-center sc-justify-between">
                     <p class="sc-universal sc-text-sm sc-roboto sc-font-light sc-text-color-EF7C2F">-180 deg</p>
                     <p class="sc-universal sc-text-sm sc-roboto sc-text-gray-300 sc-font-light">180 deg</p>
                  </div>
                 </div>                 
            </div>

            <div class="sc-w-full sc-mt-4">
               <div class=" sc-mt-3 sc-flex sc-w-full sc-items-center sc-justify-between">
                  <div class="sc-flex sc-gap-2 sc-items-center">
                     <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> icon Size
                     </p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
   
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                           alt="reset">
                     </div>
                  </div>
                  <div
                     class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                     <p id="buttoniconSizeradiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                     <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                           class="sc-rotate-180" alt="">
                     </div>
                  </div>
               </div>
               <div id="buttonIconSizeradiousField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
                  <div id="buttonIconSizeradiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                  <div id="buttonIconSizeradiousBullet"
                     class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                  </div>
               </div>
              </div>

            <div class="sc-mt-4 ">
               <p class="sc-text-xs sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">Icon Color
               </p>
               <div
                  class="sc-py-0_5 sc-mt-2 sc-w-30 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-2 sc-rounded-6px">
                  <p class="sc-text-sm sc-roboto sc-font-light sc-universal">#363544</p>
                  <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
               </div>
            </div>

            <div class=" sc-mt-3 sc-flex sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Icon Spacing
                  </p>
                  <div
                     class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                        alt="reset">
                  </div>
               </div>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p id="buttoniconSpacingradiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                        class="sc-rotate-180" alt="">
                  </div>
               </div>
            </div>
            <div id="buttonIconSpacingradiousField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
               <div id="buttonIconSpacingradiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
               <div id="buttonIconSpacingradiousBullet"
                  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
               </div>
            </div>
            <div class="sc-grid sc-grid-cols-12 sc-mt-3">
               <div></div>
               <div style="padding: 2px 0px;"
                  class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-text-sm sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-center  sc-px-1 sc-rounded-6px">
                 
                  <div id="buttonIconSpacingTop" data-value="Top"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy"
                        alt="top-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Top</p>
                  </div>
                  <div id="buttonIconSpacingBottom" data-value="Bottom"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg" loading="lazy"
                        alt="bottom-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Bottom</p>
                  </div>
                  <div id="buttonIconSpacingLeft" data-value="Left"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg" loading="lazy"
                        alt="left-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Left</p>
                  </div>
                  <div id="buttonIconSpacingRight" data-value="Right"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg" loading="lazy"
                        alt="right-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Right</p>
                  </div>
               </div>
            </div>
         </div>

            <div>
               <div id="bordersButton"
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
                  <p class="sc-roboto  sc-universal ">Border</p>
                  <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>

               <div id="bordersSection" class=" sc-mt-3 sc-hidden">
                  <div class=" sc-px-2 sc-flex sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           Border
                        </p>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                              alt="reset">
                        </div>
                     </div>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p id="buttonBorderCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>

                  <div id="buttonBorderField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div id="buttonBorderFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                     <div id="buttonBorderBullet"
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>
                  <div class="sc-grid sc-grid-cols-12 sc-mt-3">
                     <div></div>
                     <div style="padding: 2px 0px;"
                        class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-text-sm sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-center  sc-px-1 sc-rounded-6px">
                        <div id="buttonBorderAll"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg" loading="lazy"
                              alt="all-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">All</p>
                        </div>
                        <div id="buttonBorderTop"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy"
                              alt="top-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Top</p>
                        </div>
                        <div id="buttonBorderBottom"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg"
                              loading="lazy" alt="bottom-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Bottom</p>
                        </div>
                        <div id="buttonBorderLeft"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg"
                              loading="lazy" alt="left-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Left</p>
                        </div>
                        <div id="buttonBorderRight"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg"
                              loading="lazy" alt="right-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Right</p>
                        </div>
                     </div>
                  </div>

                  <div class="sc-mt-4 sc-gap-2 sc-grid sc-grid-cols-12">
                     <div class="sc-col-span-5">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           Border
                           Color
                        </p>

                        <div
                           class="sc-py-0_5 sc-relative sc-mt-3 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-1_5 sc-rounded-6px">
                           <p class="sc-text-sm sc-roboto sc-font-light sc-universal">Select</p>
                           <div class="sc-square-6 sc-border-colors sc-cursor-pointer">
                           </div>

                           <div id="color-palette"
                              class="sc-absolute sc-hidden sc-border sc-border-solid sc-border-EF7C2F sc-top-12 sc-bg-3f3f3f sc-left-0 sc-p-1 sc-rounded-6px ">
                              <div class="sc-color-arrow"></div>
                              <div class="sc-flex sc-items-center sc-justify-between">
                                 <div id="border-colors" class="sc-flex sc-relative sc-items-center sc-gap-1">


                                 </div>


                                 <div class="sc-rounded-15px sc-px-1_5 sc-py-0_5 sc-bg-454545 sc-flex sc-gap-1">
                                    <p class="sc-universal sc-text-xs sc-roboto">RGB</p>
                                    <img id="paragraph1Arrow" width="10"
                                       src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                                       class="sc-rotate-180" alt="">

                                 </div>
                              </div>

                              <div class="sc-h-1px sc-mt-2 sc-bg-color-gray"></div>
                              <div class="sc-flex color-h-selection sc-mt-2 sc-items-center sc-gap-2">
                                 <div id="color-selection-field" class="sc-relative">
                                    <div id="color-selection-bar"
                                       class="sc-w-2 sc-h-2 sc-absolute sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white">
                                    </div>
                                 </div>
                                 <div id="color-transparency-field"
                                    class="sc-h-full sc-w-3 sc-relative  sc-rounded-15px ">
                                    <div id="color-transparency-bar"
                                       class="sc-absolute  sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px  sc-cursor-grabbing  sc-h-2 sc-bg-color-f2f2f2">
                                    </div>
                                 </div>
                                 <div id="all-color-selction-field"
                                    class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                                    <div id="all-color-selction-bar"
                                       class="sc-absolute  sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2">
                                    </div>
                                 </div>
                              </div>
                              <div
                                 class="sc-flex sc-justify-between sc-mt-3 sc-px-2 sc-py-0_5 sc-rounded-6px sc-bg-454545">
                                 <p id="color-code" class="sc-text-sm sc-roboto sc-font-light sc-universal">Select
                                 </p>
                                 <p id="color-transparency-count"
                                    class="sc-text-sm sc-roboto sc-font-light sc-universal">100%</p>
                              </div>
                           </div>

                        </div>
                     </div>
                     <div class="sc-col-span-7">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           Border
                           Style
                        </p>
                        <div style="padding: 3px 0px;"
                           class="sc-bg-3f3f3f sc-flex sc-text-xs sc-gap-1 sc-mt-3 sc-rounded-6px   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-between  sc-px-1 ">


                           <div id="buttonBorderTypeSolid" class="sc-py-0_5  sc-w-full sc-rounded-6px ">
                              <p class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer   ">
                                 Solid
                              </p>
                           </div>


                           <div id="buttonBorderTypeDashed" class="sc-py-0_5  sc-w-full sc-rounded-6px ">
                              <p class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer  ">
                                 Dashed
                              </p>
                           </div>
                           <div id="buttonBorderTypeDotted" class="sc-py-0_5  sc-w-full sc-rounded-6px">

                              <p 
                                 class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer  sc-rounded-6px">
                                 Dotted</p>
                           </div>

                        </div>
                     </div>
                  </div>

                  <div class="sc-mt-4">
                     <div class="  sc-flex sc-items-center sc-justify-between">
                        <div class="sc-flex sc-gap-2 sc-items-center">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              Border Radious
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                                 width="10" alt="reset">
                           </div>
                        </div>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p id="buttonBorderRadiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>
                        </div>
                     </div>
                    <div id="buttonBorderRadiousField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
<div id="buttonBorderRadiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
<div id="buttonBorderRadiousBullet"
    class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
</div>
</div>


                  </div>
               </div>
            </div>


            <div id="shadowsButton"
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
                  <p class="sc-roboto  sc-universal ">Shadow</p>
                  <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
               <div id="shadowsSection" class="sc-hidden">
                  <div class="sc-flex sc-gap-2 sc-items-center sc-mt-3">
                     <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Shadow
                     </p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                           alt="reset">
                     </div>
                  </div>
                  <div class="mt-3 sc-flex sc-mt-4 sc-items-center sc-gap-3">
                     <div class="sc-w-full">
                        <div class="sc-flex sc-gap-2 sc-items-center sc-justify-between">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              (X Axis)
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                              <p id="buttonShadowXaxisCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                    width="9">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                    class="sc-rotate-180" alt="">
                              </div>

                           </div>

                        </div>
                        <div id="buttonShadowXaxisField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                           <div id="buttonShadowXaxisBullet"
                              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                           </div>
                        </div>
                     </div>
                     <div class="sc-w-full">
                        <div class="sc-flex sc-gap-2 sc-items-center sc-justify-between">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              (Y Axis)
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                              <p id="buttonShadowYaxisCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                    width="9">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                    class="sc-rotate-180" alt="">
                              </div>

                           </div>

                        </div>
                        <div id="buttonShadowYaxisField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                           <div id="buttonShadowYaxisBullet"
                              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="sc-mt-4">
                     <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                        Color
                     </p>
                     <div class="sc-flex sc-mt-2">
                        <div
                           class="sc-py-0_5  sc-bg-3f3f3f   sc-flex sc-gap-5 sc-items-center sc-px-1_5 sc-rounded-6px">
                           <p class="sc-text-sm sc-roboto c-font-light sc-universal">#363544</p>
                           <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                        </div>
                     </div>
                  </div>
                  <div class="sc-mt-4">
                     <div class="  sc-flex sc-items-center sc-justify-between">
                        <div class="sc-flex sc-gap-2 sc-items-center">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              Blur
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                                 alt="reset">
                           </div>
                        </div>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p id="buttonShadowBlurCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>
                        </div>
                     </div>
                     <div id="buttonShadowBlurField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                        <div id="buttonShadowBlurBullet"
                           class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                        </div>
                     </div>

                  </div>



                  <div class="sc-mt-4">
                     <div class="  sc-flex sc-items-center sc-justify-between">
                        <div class="sc-flex sc-gap-2 sc-items-center">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              Spread
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                                 alt="reset">
                           </div>
                        </div>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p id="buttonShadowSpreadCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>
                        </div>
                     </div>
                     <div id="buttonShadowSpreadField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                        <div id="buttonShadowSpreadBullet"
                           class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                        </div>
                     </div>

                  </div>
               </div>
         </div>
         <div id="ButtonHoverState" class="sc-mt-4 sc-roboto sc-font-light sc-hidden sc-px-2">
            <div id="hover-colorButton"
               class="sc-bg-3f3f3f sc-mt-4 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
               <p class="sc-roboto  sc-universal ">Color</p>
               <img id="hover-heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
            <div id="hover-colorSection" class="sc-mt-3 sc-hidden">
            <div class="sc-items-center sc-gap-3  sc-flex">
               <div id="hover-bgColorSection" class=" ">
                  <p class="sc-text-xs sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">background Color
                  </p>
                  <div class="sc-col-span-5 sc-mt-2 sc-z-99999 sc-relative ">
                     <div class="sc-flex sc-w-30 sc-justify-between sc-items-center sc-px-2 sc-bg-3f3f3f sc-inActiveTab-border sc-rounded-6px sc-py-0_5">
                     <p id="hover-buttonFontColorCode" class="sc-text-sm sc-roboto sc-universal">Select</p>
                     <div id="hover-buttonFontColorPalate" class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                     </div>
                  
                     <div id="hover-button-font-color-palette"
                     class="sc-absolute sc-z-99999 sc-border sc-hidden sc-border-solid sc-border-EF7C2F sc-top-12 sc-bg-3f3f3f sc-left-0 sc-p-1 sc-rounded-6px">
                     <div class="sc-button-fontcolor-arrow"></div>
                  
                     <div class="sc-flex sc-items-center sc-justify-between">
                        <div id="hover-button-border-colors" class="sc-flex sc-relative sc-items-center sc-gap-1"></div>
                  
                        <div class="sc-rounded-15px sc-px-1_5 sc-py-0_5 sc-bg-454545 sc-flex sc-gap-1">
                           <p class="sc-universal sc-text-xs sc-roboto">RGB</p>
                           <img id="hover-buttonParagraph1Arrow" width="10"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                           class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  
                     <div class="sc-h-1px sc-mt-2 sc-bg-color-gray"></div>
                  
                     <div class="sc-flex color-h-selection sc-mt-2 sc-items-center sc-gap-2">
                        <div id="hover-button-color-selection-field" class="sc-relative">
                           <div id="hover-button-color-selection-bar"
                           class="sc-w-2 sc-h-2 sc-absolute sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white">
                           </div>
                        </div>
                  
                        <div id="hover-button-color-transparency-field" class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                           <div id="hover-button-color-transparency-bar"
                           class="sc-absolute sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2">
                           </div>
                        </div>
                  
                        <div id="hover-button-all-color-selection-field" class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                           <div id="hover-button-all-color-selection-bar"
                           class="sc-absolute sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2">
                           </div>
                        </div>
                     </div>
                  
                     <div class="sc-flex sc-justify-between sc-mt-3 sc-px-2 sc-py-0_5 sc-rounded-6px sc-bg-454545">
                        <p id="hover-button-color-code" class="sc-text-sm sc-roboto sc-font-light sc-universal">Select</p>
                        <p id="hover-button-color-transparency-count" class="sc-text-sm sc-roboto sc-font-light sc-universal">100%</p>
                     </div>
                     </div>
                  </div>
               </div>
               <div id="hover-textColorSection" class=" ">
                  <p class="sc-text-xs sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">Text Color
                  </p>
                  <div
                     class="sc-py-0_5 sc-mt-2 sc-w-30 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-2 sc-rounded-6px">
                     <p class="sc-text-sm sc-roboto c-font-light sc-universal">#363544</p>
                     <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                  </div>
               </div>
            </div>
            </div>
          
          
               <div id="hover-iconButton"
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
                  <p class="sc-roboto  sc-universal ">Icon</p>
                  <img id="hover-heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
          
            <div id="hover-iconSection" class="sc-mt-3  sc-hidden">
            <div class="">
               <div class="sc-flex sc-items-center sc-gap-2">
                  <div>
                     <p class="sc-roboto sc-universal sc-text-sm sc-font-light sc-text-gray-300">Icon</p>
                     <div class="sc-flex sc-items-center  sc-mt-2">
          
                        <div 
                           class="sc-pt-1_5 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer sc-rounded-l">
          
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/redo.svg"
                              class=" alignment-icon   sc-mx-auto" alt="left">
                        </div>
                        <div id="hover-imageupload" 
                           class="sc-pt-1_5 sc-pb-1 sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer ">
          
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/imageupload.svg"
                              class=" alignment-icon   sc-mx-auto" alt="center">
                        </div>
                        <div id="hover-iconLibraryButton"
                           class="sc-pt-1_5 sc-pb-1 sc-relative sc-roudned-r-md sc-px-1_5 sc-inActiveTab-border sc-cursor-pointer">
          
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/iconLibrary.svg"
                              class=" alignment-icon   sc-mx-auto" alt="right">
          
                              <div class="sc-absolute sc-hidden sc-p-2 sc-z-99999 sc-w-240 sc-border sc-border-solid sc-border-EF7C2F sc-rounded-md sc-top-12 sc-bg-color-3d3d3d  sc-left-0">
                               <div
                               style="
                                 position: absolute;
                                 top: -8px;
                                 left: 6px;
                                 width: 0;
                                 height: 0;
                                 border-left: 7px solid transparent;
                                 border-right: 7px solid transparent;
                                 border-bottom: 7px solid #fd8905;
                                 z-index: 99999;
                               "
                             ></div>
                            <div class="sc-absolute sc-flex sc-items-center sc-gap-3">
                            <div id="hover-buttonIconSolidClick" class="sc-px-6 sc-py-4px sc-rounded-lg sc-bg-3f3f3f">
                              <div  class="sc-roboto   sc-text-xs sc-font-light sc-text-EF7C2F" >Solid</div>
                            </div>
                            <div id="hover-buttonIconOutlineClick" class="sc-px-6 sc-py-4px sc-rounded-lg sc-bg-3f3f3f">
                              <div class="sc-roboto   sc-text-xs sc-font-light " >Outline</div>
                            </div>
                            </div>
          
                            <div id="hover-buttonIconOutlineoptions" class="sc-mt-8 sc-scrollBar sc-justify-between sc-rounded-md sc-gap-2 sc-h-44 sc-p-1 sc-grid-cols-6 sc-bg-color-2c2c2c  ">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                             <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/outline-icons/outlineIcon%20(1).svg" class="sc-rounded-md sc-mx-auto sc-bg-3f3f3f sc-px-1 sc-py-4px" width="20" height="20" alt="">
                            </div>
                            <div class="buttonIconSolidoptions"></div>
                              </div>
                        </div>
          
                     </div>
                  </div>
                  <div>
                     <p class="sc-roboto sc-universal sc-text-sm sc-font-light sc-text-gray-300">Icon Position</p>
                     <div class="sc-flex sc-mt-2 sc-relative sc-items-center">
                        <div id="hover-iconPositionLabel" class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-16">
                        <p class="sc-universal sc-roboto sc-text-sm">Before</p>
                        </div>
                     
                        <div id="hover-iconPositionDropdown" class="sc-absolute sc-rounded-6px  sc-border sc-border-solid sc-border-EF7C2F sc-hidden  sc-left-0 sc-top-[35px] sc-z-50">
                        <div class="sc-bg-3f3f3f sc-py-1 sc-text-sm sc-px-2 sc-w-16 sc-border-b sc-bg-colo-EF7C2F-hover  sc-cursor-pointer" data-value="before">Before</div>
                        <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="after">After</div>
                        </div>
                     
                        <div id="hover-buttoniconPositionSection" class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" alt="">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" class="sc-rotate-180" alt="">
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          
          
          
            <div class="sc-mt-4 sc-flex sc-items-center sc-gap-2">
             
                 <div class="sc-w-full">
                  <div class=" sc-mt-3 sc-flex sc-w-full sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Rotation
                        </p>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
          
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                              alt="reset">
                        </div>
                     </div>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p id="hover-buttoniconRotationradiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>
                  <div id="hover-buttonIconRotationradiousField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div id="hover-buttonIconRotationradiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                     <div id="hover-buttonIconRotationradiousBullet"
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>
                  <div class="sc-mt-2 sc-flex sc-items-center sc-justify-between">
                     <p class="sc-universal sc-text-sm sc-roboto sc-font-light sc-text-color-EF7C2F">-180 deg</p>
                     <p class="sc-universal sc-text-sm sc-roboto sc-text-gray-300 sc-font-light">180 deg</p>
                  </div>
                 </div>                 
            </div>
          
            <div class="sc-w-full sc-mt-4">
               <div class=" sc-mt-3 sc-flex sc-w-full sc-items-center sc-justify-between">
                  <div class="sc-flex sc-gap-2 sc-items-center">
                     <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> icon Size
                     </p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
          
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                           alt="reset">
                     </div>
                  </div>
                  <div
                     class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                     <p id="hover-buttoniconSizeradiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                     <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                           class="sc-rotate-180" alt="">
                     </div>
                  </div>
               </div>
               <div id="hover-buttonIconSizeradiousField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
                  <div id="hover-buttonIconSizeradiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                  <div id="hover-buttonIconSizeradiousBullet"
                     class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                  </div>
               </div>
              </div>
          
            <div class="sc-mt-4 ">
               <p class="sc-text-xs sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">Icon Color
               </p>
               <div
                  class="sc-py-0_5 sc-mt-2 sc-w-30 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-2 sc-rounded-6px">
                  <p class="sc-text-sm sc-roboto sc-font-light sc-universal">#363544</p>
                  <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
               </div>
            </div>
          
            <div class=" sc-mt-3 sc-flex sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Icon Spacing
                  </p>
                  <div
                     class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
          
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                        alt="reset">
                  </div>
               </div>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p id="hover-buttoniconSpacingradiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                        class="sc-rotate-180" alt="">
                  </div>
               </div>
            </div>
            <div id="hover-buttonIconSpacingradiousField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
               <div id="hover-buttonIconSpacingradiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
               <div id="hover-buttonIconSpacingradiousBullet"
                  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
               </div>
            </div>
            <div class="sc-grid sc-grid-cols-12 sc-mt-3">
               <div></div>
               <div style="padding: 2px 0px;"
                  class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-text-sm sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-center  sc-px-1 sc-rounded-6px">
                 
                  <div id="hover-buttonIconSpacingTop" data-value="Top"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy"
                        alt="top-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Top</p>
                  </div>
                  <div id="hover-buttonIconSpacingBottom" data-value="Bottom"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg" loading="lazy"
                        alt="bottom-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Bottom</p>
                  </div>
                  <div id="hover-buttonIconSpacingLeft" data-value="Left"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg" loading="lazy"
                        alt="left-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Left</p>
                  </div>
                  <div id="hover-buttonIconSpacingRight" data-value="Right"
                     class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-rounded-6px  sc-items-center sc-gap-1">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg" loading="lazy"
                        alt="right-radious">
                     <p class="sc-font-thin sc-roboto sc-universal ">Right</p>
                  </div>
               </div>
            </div>
          </div>
          
            <div>
               <div id="hover-bordersButton"
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
                  <p class="sc-roboto  sc-universal ">Border</p>
                  <img id="hover-heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
          
               <div id="hover-bordersSection" class=" sc-mt-3 sc-hidden">
                  <div class=" sc-px-2 sc-flex sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           Border
                        </p>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
          
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                              alt="reset">
                        </div>
                     </div>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p id="hover-buttonBorderCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>
          
                  <div id="hover-buttonBorderField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div id="hover-buttonBorderFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                     <div id="hover-buttonBorderBullet"
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>
                  <div class="sc-grid sc-grid-cols-12 sc-mt-3">
                     <div></div>
                     <div style="padding: 2px 0px;"
                        class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-text-sm sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-center  sc-px-1 sc-rounded-6px">
                        <div id="hover-buttonBorderAll"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg" loading="lazy"
                              alt="all-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">All</p>
                        </div>
                        <div id="hover-buttonBorderTop"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy"
                              alt="top-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Top</p>
                        </div>
                        <div id="hover-buttonBorderBottom"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg"
                              loading="lazy" alt="bottom-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Bottom</p>
                        </div>
                        <div id="hover-buttonBorderLeft"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg"
                              loading="lazy" alt="left-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Left</p>
                        </div>
                        <div id="hover-buttonBorderRight"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg"
                              loading="lazy" alt="right-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Right</p>
                        </div>
                     </div>
                  </div>
          
                  <div class="sc-mt-4 sc-gap-2 sc-grid sc-grid-cols-12">
                     <div class="sc-col-span-5">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           Border
                           Color
                        </p>
          
                        <div
                           class="sc-py-0_5 sc-relative sc-mt-3 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-1_5 sc-rounded-6px">
                           <p class="sc-text-sm sc-roboto sc-font-light sc-universal">Select</p>
                           <div class="sc-square-6 sc-border-colors sc-cursor-pointer">
                           </div>
          
                           <div id="hover-color-palette"
                              class="sc-absolute sc-hidden sc-border sc-border-solid sc-border-EF7C2F sc-top-12 sc-bg-3f3f3f sc-left-0 sc-p-1 sc-rounded-6px ">
                              <div class="sc-color-arrow"></div>
                              <div class="sc-flex sc-items-center sc-justify-between">
                                 <div id="hover-border-colors" class="sc-flex sc-relative sc-items-center sc-gap-1">
          
          
                                 </div>
          
          
                                 <div class="sc-rounded-15px sc-px-1_5 sc-py-0_5 sc-bg-454545 sc-flex sc-gap-1">
                                    <p class="sc-universal sc-text-xs sc-roboto">RGB</p>
                                    <img id="hover-paragraph1Arrow" width="10"
                                       src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                                       class="sc-rotate-180" alt="">
          
                                 </div>
                              </div>
          
                              <div class="sc-h-1px sc-mt-2 sc-bg-color-gray"></div>
                              <div class="sc-flex color-h-selection sc-mt-2 sc-items-center sc-gap-2">
                                 <div id="hover-color-selection-field" class="sc-relative">
                                    <div id="hover-color-selection-bar"
                                       class="sc-w-2 sc-h-2 sc-absolute sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white">
                                    </div>
                                 </div>
                                 <div id="hover-color-transparency-field"
                                    class="sc-h-full sc-w-3 sc-relative  sc-rounded-15px ">
                                    <div id="hover-color-transparency-bar"
                                       class="sc-absolute  sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px  sc-cursor-grabbing  sc-h-2 sc-bg-color-f2f2f2">
                                    </div>
                                 </div>
                                 <div id="hover-all-color-selction-field"
                                    class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                                    <div id="hover-all-color-selction-bar"
                                       class="sc-absolute  sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2">
                                    </div>
                                 </div>
                              </div>
                              <div
                                 class="sc-flex sc-justify-between sc-mt-3 sc-px-2 sc-py-0_5 sc-rounded-6px sc-bg-454545">
                                 <p id="hover-color-code" class="sc-text-sm sc-roboto sc-font-light sc-universal">Select
                                 </p>
                                 <p id="hover-color-transparency-count"
                                    class="sc-text-sm sc-roboto sc-font-light sc-universal">100%</p>
                              </div>
                           </div>
          
                        </div>
                     </div>
                     <div class="sc-col-span-7">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           Border
                           Style
                        </p>
                        <div style="padding: 3px 0px;"
                           class="sc-bg-3f3f3f sc-flex sc-text-xs sc-gap-1 sc-mt-3 sc-rounded-6px   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-between  sc-px-1 ">
          
          
                           <div id="hover-buttonBorderTypeSolid" class="sc-py-0_5  sc-w-full sc-rounded-6px ">
                              <p class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer   ">
                                 Solid
                              </p>
                           </div>
          
          
                           <div id="hover-buttonBorderTypeDashed" class="sc-py-0_5  sc-w-full sc-rounded-6px ">
                              <p class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer  ">
                                 Dashed
                              </p>
                           </div>
                           <div id="hover-buttonBorderTypeDotted" class="sc-py-0_5  sc-w-full sc-rounded-6px">
          
                              <p 
                                 class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer  sc-rounded-6px">
                                 Dotted</p>
                           </div>
          
                        </div>
                     </div>
                  </div>
          
                  <div class="sc-mt-4">
                     <div class="  sc-flex sc-items-center sc-justify-between">
                        <div class="sc-flex sc-gap-2 sc-items-center">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              Border Radious
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
          
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                                 width="10" alt="reset">
                           </div>
                        </div>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p id="hover-buttonBorderRadiousCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>
                        </div>
                     </div>
                    <div id="hover-buttonBorderRadiousField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
          <div id="hover-buttonBorderRadiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
          <div id="hover-buttonBorderRadiousBullet"
          class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
          </div>
          </div>
          
          
                  </div>
               </div>
            </div>
          
          
            <div id="hover-shadowsButton"
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
                  <p class="sc-roboto  sc-universal ">Shadow</p>
                  <img id="hover-heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
               <div id="hover-shadowsSection" class="sc-hidden">
                  <div class="sc-flex sc-gap-2 sc-items-center sc-mt-3">
                     <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Shadow
                     </p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
          
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                           alt="reset">
                     </div>
                  </div>
                  <div class="mt-3 sc-flex sc-mt-4 sc-items-center sc-gap-3">
                     <div class="sc-w-full">
                        <div class="sc-flex sc-gap-2 sc-items-center sc-justify-between">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              (X Axis)
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                              <p id="hover-buttonShadowXaxisCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                    width="9">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                    class="sc-rotate-180" alt="">
                              </div>
          
                           </div>
          
                        </div>
                        <div id="hover-buttonShadowXaxisField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                           <div id="hover-buttonShadowXaxisBullet"
                              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                           </div>
                        </div>
                     </div>
                     <div class="sc-w-full">
                        <div class="sc-flex sc-gap-2 sc-items-center sc-justify-between">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              (Y Axis)
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                              <p id="hover-buttonShadowYaxisCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                    width="9">
                                 <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                    class="sc-rotate-180" alt="">
                              </div>
          
                           </div>
          
                        </div>
                        <div id="hover-buttonShadowYaxisField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                           <div id="hover-buttonShadowYaxisBullet"
                              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                           </div>
                        </div>
                     </div>
                  </div>
          
                  <div class="sc-mt-4">
                     <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                        Color
                     </p>
                     <div class="sc-flex sc-mt-2">
                        <div
                           class="sc-py-0_5  sc-bg-3f3f3f   sc-flex sc-gap-5 sc-items-center sc-px-1_5 sc-rounded-6px">
                           <p class="sc-text-sm sc-roboto c-font-light sc-universal">#363544</p>
                           <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                        </div>
                     </div>
                  </div>
                  <div class="sc-mt-4">
                     <div class="  sc-flex sc-items-center sc-justify-between">
                        <div class="sc-flex sc-gap-2 sc-items-center">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              Blur
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
          
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                                 alt="reset">
                           </div>
                        </div>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p id="hover-buttonShadowBlurCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>
                        </div>
                     </div>
                     <div id="hover-buttonShadowBlurField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                        <div id="hover-buttonShadowBlurBullet"
                           class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                        </div>
                     </div>
          
                  </div>
          
          
          
                  <div class="sc-mt-4">
                     <div class="  sc-flex sc-items-center sc-justify-between">
                        <div class="sc-flex sc-gap-2 sc-items-center">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                              Spread
                           </p>
                           <div
                              class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                                 alt="reset">
                           </div>
                        </div>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p id="hover-buttonShadowSpreadCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>
                        </div>
                     </div>
                     <div id="hover-buttonShadowSpreadField" class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                        <div id="hover-buttonShadowSpreadBullet"
                           class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                        </div>
                     </div>
          
                  </div>
               </div>
          </div>
         <div class="sc-mt-4"></div>
      </div>
   `;
}
