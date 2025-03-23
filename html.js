

export function html() {

   const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
   const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]



   const htmlString = `
      <div
   class="squareCraft-p-4  squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
   <div id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-w-full">
   <div
   class="squareCraft-flex squareCraft-poppins squareCraft-universal squareCraft-items-center squareCraft-justify-between">
   <img  class="squareCraft-cursor-grabbing squareCraft-universal"
      src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />

</div>
<p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply
   dummy text
   of the printing and typesetting industry.
</p>
  </div>
   <div
      class="squareCraft-mt-6 squareCraft-poppins squareCraft-border-t squareCraft-border-dashed squareCraft-border-color-494949  squareCraft-w-full">
   </div>
   <div
      class="squareCraft-mt-6 squareCraft-poppins squareCraft-flex  squareCraft-items-center squareCraft-universal">
      <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader ">Design</p>
      <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Advanced</p>
      <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Presets</p>
   </div>
   <div
      class="squareCraft-border-t squareCraft-border-solid squareCraft-relative squareCraft-border-color-494949 squareCraft-w-full">
      <div
         class="squareCraft-absolute squareCraft-top-0 squareCraft-left-0 squareCraft-bg-colo-EF7C2F squareCraft-w-16 squareCraft-h-1px">
      </div>
   </div>
   <div
      class="squareCraft-rounded-6px squareCraft-h-350 squareCraft-scrollBar squareCraft-mt-6  squareCraft-border squareCraft-border-solid squareCraft-border-EF7C2F squareCraft-bg-color-3d3d3d">
      <div class="squareCraft-flex squareCraft-p-2 squareCraft-items-center squareCraft-justify-between">
         <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
            <img loading="lazy" src="https://fatin-webefo.github.io/squareCraft-plugin/public/T.svg" alt="">
            <p class="squareCraft-universal squareCraft-poppins">Typography</p>
         </div>
         <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
      </div>
      <div class="squareCraft-h-1px squareCraft-bg-3f3f3f"></div>
      <div class="squareCraft-flex squareCraft-px-2   squareCraft-items-center squareCraft-justify-between">
         <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
            <div class="toggle-container" id="toggleSwitch">
               <div class="toggle-bullet"></div>
            </div>
            <p id="toggleText" class="squareCraft-text-sm squareCraft-poppins">Enable</p>
         </div>
      </div>
      <div class="squareCraft-h-1px  squareCraft-bg-3f3f3f"></div>
      <div class="squareCraft-mt-2">
         <div
            class="squareCraft-flex squareCraft-poppins squareCraft-px-2  squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
            <div
               class="squareCraft-cursor-pointer squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">
               Normal
            </div>
            <div
               class="squareCraft-cursor-pointer squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">
               Hover
            </div>
         </div>
         <div class="squareCraft-px-4">
            <div class="squareCraft-h-1px  squareCraft-mt-2 squareCraft-bg-3f3f3f"></div>
         </div>
      </div>
      <div class=" squareCraft-mt-2 squareCraft-px-2 squareCraft-flex squareCraft-justify-between">
         <p class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-text-gray-300">Text</p>
         <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
      </div>

      <div>
         <div class="">

            <div class="squareCraft-flex  squareCraft-mt-2 squareCraft-px-2">
               
               <div id="heading1"
                  class="squareCraft-bg-3f3f3f squareCraft-relative squareCraft-z-99999 squareCraft-flex squareCraft-border-hover-EF7C2F squareCraft-border squareCraft-border-solid squareCraft-border-3f3f3f squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
                  <div class="squareCraft-active-bar"></div>
                  <p class="squareCraft-poppins  squareCraft-universal squareCraft-text-sm ">Heading-1</p>
                  <img id="heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="squareCraft-rotate-180" alt="">
               </div>
            </div>

            <div id="heading1Dropdown" >
               
               <div class="squareCraft-mt-2 squareCraft-px-2  squareCraft-gap-2">
                  
                  <div
                     class="squareCraft-flex squareCraft-mt-2 squareCraft-justify-between  squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between  ">
                        <div class="squareCraft-px-2 squareCraft-py-1_2px squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-l">
                           <p class=" squareCraft-universal   squareCraft-text-sm  squareCraft-poppins">A</p>

                        </div>

                        <div class=" squareCraft-px-2 squareCraft-py-1_2px squareCraft-activeTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  squareCraft-poppins">
                              B</p>

                        </div>
                        <div class="squareCraft-px-2 squareCraft-py-1px squareCraft-inActiveTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">
                              I</p>
                        </div>

                        <div class="squareCraft-px-2 squareCraft-py-0_5px squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-r">
                           <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="" alt="">

                        </div>

                     </div>
                  </div>
               </div>
              <div class="squareCraft-mt-2 squareCraft-px-2">
               <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Style</p>

               <div
               class="squareCraft-mt-2 squareCraft-relative squareCraft-grid  squareCraft-grid-cols-12 squareCraft-gap-2 ">

               <div id="squareCraftFontSelect"
                  class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-8 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
                  <select class=" squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                     style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
                     <option value="" selected disabled hidden>Select Font</option>
                  </select>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2"
                     style="height: 27px; padding: 0 3px; pointer-events: none;">
                     <img class="squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>



               <div
                  class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                              squareCraft-rounded-6px 
                              ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                                 squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                           <div class="squareCraft-v-line"></div>
                           <div
                              class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p
                                 class=" squareCraft-font-light squareCraft-text-sm squareCraft-px-1  ">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-1_5 squareCraft-ml-2"
                              style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px"
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                              squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                              squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div
                              class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
              </div>
               <div
                  class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-7  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div class="  squareCraft-px-2   ">
                        <p
                           class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">
                           Regular</p>
                     </div>
                     <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                        <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                     </div>
                  </div>
                  <div class="squareCraft-col-span-5 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
                 <div>
                  
                 </div>
               </div>
               <div
                  class=" squareCraft-px-2 squareCraft-flex  squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between  squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-items-center  ">
                        <div class="squareCraft-pt-1 squareCraft-pb-1 squareCraft-px-1_5 squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-l">

                           <img id="squareCraftTextAlignLeft" data-align="left"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                              class=" alignment-icon   squareCraft-mx-auto" alt="justify">
                        </div>
                        
                        <div class="squareCraft-pt-1 squareCraft-pb-1 squareCraft-px-1_5 squareCraft-inActiveTab-border squareCraft-cursor-pointer ">

                           <img id="squareCraftTextAlignLeft" data-align="left"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                              class=" alignment-icon   squareCraft-mx-auto" alt="justify">
                        </div>
                        <div class="squareCraft-pt-1 squareCraft-pb-1 squareCraft-px-1_5 squareCraft-inActiveTab-border squareCraft-cursor-pointer">

                           <img id="squareCraftTextAlignLeft" data-align="left"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                              class=" alignment-icon   squareCraft-mx-auto" alt="justify">
                        </div>
                        <div class="squareCraft-pt-1 squareCraft-pb-1 squareCraft-px-1_5 squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-r">

                           <img id="squareCraftTextAlignLeft" data-align="left"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                              class=" alignment-icon   squareCraft-mx-auto" alt="justify">
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-px-1 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="squareCraft-mx-auto squareCraft-ml-1 squareCraft-flex squareCraft-items-center squareCraft-justify-center">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px;"  class=" squareCraft-px-1 squareCraft-flex squareCraft-items-center squareCraft-justify-center squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-px-1 
                  squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                  squareCraft-items-center ">
               <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                     squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                     ">
                  <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                     class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                        squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                  <div class="squareCraft-mx-auto squareCraft-ml-1 squareCraft-flex squareCraft-items-center squareCraft-justify-center">
                     <img id="squareCraftLetterSpacingDropdown"
                        src="https://i.ibb.co.com/G460VVdR/Vector.png"
                      style="width: 15px;"  class=" squareCraft-px-1 squareCraft-flex squareCraft-items-center squareCraft-justify-center squareCraft-mx-auto squareCraft-cursor-pointer">
                  </div>
               </div>
               <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                     squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                     squareCraft-mt-1">
                  ${LetterSpacing?.map(gap => `
                  <div
                     class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                     data-value="${gap}">${gap}
                  </div>
                  `).join('')}
               </div>
            </div>

               </div>

               <div
                  class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2">
                  <div
                     class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <p
                           class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           Ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">

                     </div>
                  </div>
               </div>

               <div class="squareCraft-mt-4 squareCraft-px-2">
                  <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Text Highlight</p>
                  <div class="squareCraft-py-1 squareCraft-mt-2 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
               </div>
               <div class="squareCraft-px-2">
                  <div class="squareCraft-h-1px  squareCraft-mt-4 squareCraft-bg-3f3f3f"></div>

               </div>
            </div>
         </div>


         <div>
            <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
               <div id="heading2"
                  class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-border-hover-EF7C2F squareCraft-border squareCraft-border-solid squareCraft-border-3f3f3f squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
                  <p class="squareCraft-poppins squareCraft-universal squareCraft-text-sm ">Heading-2</p>
                  <img id="heading2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="squareCraft-rotate-180" alt="">
               </div>
            </div>
             <div id="heading2Dropdown" class="squareCraft-hidden">
               
               <div class="squareCraft-mt-2 squareCraft-px-2  squareCraft-gap-2">
                  
                  <div
                     class="squareCraft-flex squareCraft-mt-2 squareCraft-justify-between  squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between  ">
                        <div class="squareCraft-px-2 squareCraft-py-1_2px squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-l">
                           <p class=" squareCraft-universal   squareCraft-text-sm  squareCraft-poppins">A</p>

                        </div>

                        <div class=" squareCraft-px-2 squareCraft-py-1_2px squareCraft-activeTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  squareCraft-poppins">
                              B</p>

                        </div>
                        <div class="squareCraft-px-2 squareCraft-py-1px squareCraft-inActiveTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">
                              I</p>
                        </div>

                        <div class="squareCraft-px-2 squareCraft-py-0_5px squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-r">
                           <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="" alt="">

                        </div>

                     </div>
                  </div>
               </div>
              <div class="squareCraft-mt-2 squareCraft-px-2">
               <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Style</p>

               <div
               class="squareCraft-mt-2 squareCraft-relative squareCraft-grid  squareCraft-grid-cols-12 squareCraft-gap-2 ">

               <div id="squareCraftFontSelect"
                  class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-8 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
                  <select class=" squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                     style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
                     <option value="" selected disabled hidden>Select Font</option>
                  </select>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2"
                     style="height: 27px; padding: 0 3px; pointer-events: none;">
                     <img class="squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>



               <div
                  class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                              squareCraft-rounded-6px 
                              ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                                 squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                           <div class="squareCraft-v-line"></div>
                           <div
                              class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p
                                 class=" squareCraft-font-light squareCraft-text-sm squareCraft-px-1  ">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-1_5 squareCraft-ml-2"
                              style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px"
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                              squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                              squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div
                              class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
              </div>
               <div
                  class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-7  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div class="  squareCraft-px-2   ">
                        <p
                           class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">
                           Regular</p>
                     </div>
                     <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                        <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                     </div>
                  </div>
                  <div class="squareCraft-col-span-5 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
                 <div>
                  
                 </div>
               </div>
               <div
                  class=" squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <img id="squareCraftTextAlignLeft" data-align="left"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                           class="squareCraft-cursor-pointer alignment-icon   squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignRight" data-align="right"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignCenter" data-align="center"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignJustify" data-align="justify"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto " alt="">
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="18px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://i.ibb.co.com/G460VVdR/Vector.png"
                            style="width: 16px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>

               </div>

               <div
                  class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2">
                  <div
                     class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <p
                           class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           Ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">

                     </div>
                  </div>
               </div>

               <div class="squareCraft-mt-4 squareCraft-px-2">
                  <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Text Highlight</p>
                  <div class="squareCraft-py-1 squareCraft-mt-2 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
               </div>
               <div class="squareCraft-px-2">
                  <div class="squareCraft-h-1px  squareCraft-mt-4 squareCraft-bg-3f3f3f"></div>

               </div>
            </div>
         </div>

         <div>
            <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
               <div id="heading3"
                  class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-border-hover-EF7C2F squareCraft-border squareCraft-border-solid squareCraft-border-3f3f3f squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
                  <p class="squareCraft-poppins squareCraft-universal squareCraft-text-sm ">Heading-3</p>
                  <img id="heading3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="squareCraft-rotate-180" alt="">
               </div>
            </div>
             <div id="heading3Dropdown" class="squareCraft-hidden">
               
               <div class="squareCraft-mt-2 squareCraft-px-2  squareCraft-gap-2">
                  
                  <div
                     class="squareCraft-flex squareCraft-mt-2 squareCraft-justify-between  squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between  ">
                        <div class="squareCraft-px-2 squareCraft-py-1_2px squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-l">
                           <p class=" squareCraft-universal   squareCraft-text-sm  squareCraft-poppins">A</p>

                        </div>

                        <div class=" squareCraft-px-2 squareCraft-py-1_2px squareCraft-activeTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  squareCraft-poppins">
                              B</p>

                        </div>
                        <div class="squareCraft-px-2 squareCraft-py-1px squareCraft-inActiveTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">
                              I</p>
                        </div>

                        <div class="squareCraft-px-2 squareCraft-py-0_5px squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-r">
                           <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="" alt="">

                        </div>

                     </div>
                  </div>
               </div>
              <div class="squareCraft-mt-2 squareCraft-px-2">
               <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Style</p>

               <div
               class="squareCraft-mt-2 squareCraft-relative squareCraft-grid  squareCraft-grid-cols-12 squareCraft-gap-2 ">

               <div id="squareCraftFontSelect"
                  class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-8 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
                  <select class=" squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                     style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
                     <option value="" selected disabled hidden>Select Font</option>
                  </select>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2"
                     style="height: 27px; padding: 0 3px; pointer-events: none;">
                     <img class="squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>



               <div
                  class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                              squareCraft-rounded-6px 
                              ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                                 squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                           <div class="squareCraft-v-line"></div>
                           <div
                              class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p
                                 class=" squareCraft-font-light squareCraft-text-sm squareCraft-px-1  ">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-1_5 squareCraft-ml-2"
                              style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px"
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                              squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                              squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div
                              class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
              </div>
               <div
                  class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-7  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div class="  squareCraft-px-2   ">
                        <p
                           class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">
                           Regular</p>
                     </div>
                     <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                        <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                     </div>
                  </div>
                  <div class="squareCraft-col-span-5 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
                 <div>
                  
                 </div>
               </div>
               <div
                  class=" squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <img id="squareCraftTextAlignLeft" data-align="left"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                           class="squareCraft-cursor-pointer alignment-icon   squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignRight" data-align="right"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignCenter" data-align="center"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignJustify" data-align="justify"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto " alt="">
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="18px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://i.ibb.co.com/G460VVdR/Vector.png"
                            style="width: 16px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>

               </div>

               <div
                  class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2">
                  <div
                     class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <p
                           class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           Ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">

                     </div>
                  </div>
               </div>

               <div class="squareCraft-mt-4 squareCraft-px-2">
                  <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Text Highlight</p>
                  <div class="squareCraft-py-1 squareCraft-mt-2 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
               </div>
               <div class="squareCraft-px-2">
                  <div class="squareCraft-h-1px  squareCraft-mt-4 squareCraft-bg-3f3f3f"></div>

               </div>
            </div>
         </div>

         <div>
            <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
               <div id="heading4"
                  class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-border-hover-EF7C2F squareCraft-border squareCraft-border-solid squareCraft-border-3f3f3f squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
                  <p class="squareCraft-poppins squareCraft-universal squareCraft-text-sm ">Heading-4</p>
                  <img id="heading4Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="squareCraft-rotate-180" alt="">
               </div>
            </div>
             <div id="heading4Dropdown" class="squareCraft-hidden">
               
               <div class="squareCraft-mt-2 squareCraft-px-2  squareCraft-gap-2">
                  
                  <div
                     class="squareCraft-flex squareCraft-mt-2 squareCraft-justify-between  squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between  ">
                        <div class="squareCraft-px-2 squareCraft-py-1_2px squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-l">
                           <p class=" squareCraft-universal   squareCraft-text-sm  squareCraft-poppins">A</p>

                        </div>

                        <div class=" squareCraft-px-2 squareCraft-py-1_2px squareCraft-activeTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  squareCraft-poppins">
                              B</p>

                        </div>
                        <div class="squareCraft-px-2 squareCraft-py-1px squareCraft-inActiveTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">
                              I</p>
                        </div>

                        <div class="squareCraft-px-2 squareCraft-py-0_5px squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-r">
                           <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="" alt="">

                        </div>

                     </div>
                  </div>
               </div>
              <div class="squareCraft-mt-2 squareCraft-px-2">
               <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Style</p>

               <div
               class="squareCraft-mt-2 squareCraft-relative squareCraft-grid  squareCraft-grid-cols-12 squareCraft-gap-2 ">

               <div id="squareCraftFontSelect"
                  class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-8 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
                  <select class=" squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                     style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
                     <option value="" selected disabled hidden>Select Font</option>
                  </select>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2"
                     style="height: 27px; padding: 0 3px; pointer-events: none;">
                     <img class="squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>



               <div
                  class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                              squareCraft-rounded-6px 
                              ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                                 squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                           <div class="squareCraft-v-line"></div>
                           <div
                              class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p
                                 class=" squareCraft-font-light squareCraft-text-sm squareCraft-px-1  ">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-1_5 squareCraft-ml-2"
                              style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px"
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                              squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                              squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div
                              class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
              </div>
               <div
                  class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-7  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div class="  squareCraft-px-2   ">
                        <p
                           class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">
                           Regular</p>
                     </div>
                     <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                        <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                     </div>
                  </div>
                  <div class="squareCraft-col-span-5 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
                 <div>
                  
                 </div>
               </div>
               <div
                  class=" squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <img id="squareCraftTextAlignLeft" data-align="left"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                           class="squareCraft-cursor-pointer alignment-icon   squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignRight" data-align="right"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignCenter" data-align="center"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignJustify" data-align="justify"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto " alt="">
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="18px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://i.ibb.co.com/G460VVdR/Vector.png"
                            style="width: 16px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>

               </div>

               <div
                  class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2">
                  <div
                     class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <p
                           class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           Ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">

                     </div>
                  </div>
               </div>

               <div class="squareCraft-mt-4 squareCraft-px-2">
                  <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Text Highlight</p>
                  <div class="squareCraft-py-1 squareCraft-mt-2 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
               </div>
               <div class="squareCraft-px-2">
                  <div class="squareCraft-h-1px  squareCraft-mt-4 squareCraft-bg-3f3f3f"></div>

               </div>
            </div>
         </div>

         <div>
            <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
               <div id="paragraph1"
                  class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-border-hover-EF7C2F squareCraft-border squareCraft-border-solid squareCraft-border-3f3f3f squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
                  <p class="squareCraft-poppins squareCraft-universal squareCraft-text-sm ">Paragraph-1</p>
                  <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="squareCraft-rotate-180" alt="">
               </div>
            </div>
            <div id="paragraph1Dropdown" class="squareCraft-hidden">
               
               <div class="squareCraft-mt-2 squareCraft-px-2  squareCraft-gap-2">
                  
                  <div
                     class="squareCraft-flex squareCraft-mt-2 squareCraft-justify-between  squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between  ">
                        <div class="squareCraft-px-2 squareCraft-py-1_2px squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-l">
                           <p class=" squareCraft-universal   squareCraft-text-sm  squareCraft-poppins">A</p>

                        </div>

                        <div class=" squareCraft-px-2 squareCraft-py-1_2px squareCraft-activeTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  squareCraft-poppins">
                              B</p>

                        </div>
                        <div class="squareCraft-px-2 squareCraft-py-1px squareCraft-inActiveTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">
                              I</p>
                        </div>

                        <div class="squareCraft-px-2 squareCraft-py-0_5px squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-r">
                           <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="" alt="">

                        </div>

                     </div>
                  </div>
               </div>
              <div class="squareCraft-mt-2 squareCraft-px-2">
               <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Style</p>

               <div
               class="squareCraft-mt-2 squareCraft-relative squareCraft-grid  squareCraft-grid-cols-12 squareCraft-gap-2 ">

               <div id="squareCraftFontSelect"
                  class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-8 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
                  <select class=" squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                     style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
                     <option value="" selected disabled hidden>Select Font</option>
                  </select>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2"
                     style="height: 27px; padding: 0 3px; pointer-events: none;">
                     <img class="squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>



               <div
                  class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                              squareCraft-rounded-6px 
                              ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                                 squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                           <div class="squareCraft-v-line"></div>
                           <div
                              class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p
                                 class=" squareCraft-font-light squareCraft-text-sm squareCraft-px-1  ">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-1_5 squareCraft-ml-2"
                              style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px"
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                              squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                              squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div
                              class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
              </div>
               <div
                  class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-7  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div class="  squareCraft-px-2   ">
                        <p
                           class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">
                           Regular</p>
                     </div>
                     <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                        <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                     </div>
                  </div>
                  <div class="squareCraft-col-span-5 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
                 <div>
                  
                 </div>
               </div>
               <div
                  class=" squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <img id="squareCraftTextAlignLeft" data-align="left"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                           class="squareCraft-cursor-pointer alignment-icon   squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignRight" data-align="right"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignCenter" data-align="center"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignJustify" data-align="justify"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto " alt="">
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="18px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://i.ibb.co.com/G460VVdR/Vector.png"
                            style="width: 16px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>

               </div>

               <div
                  class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2">
                  <div
                     class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <p
                           class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           Ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">

                     </div>
                  </div>
               </div>

               <div class="squareCraft-mt-4 squareCraft-px-2">
                  <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Text Highlight</p>
                  <div class="squareCraft-py-1 squareCraft-mt-2 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
               </div>
               <div class="squareCraft-px-2">
                  <div class="squareCraft-h-1px  squareCraft-mt-4 squareCraft-bg-3f3f3f"></div>

               </div>
            </div>
         </div>

         <div>
            <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
               <div id="paragraph2"
                  class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-border-hover-EF7C2F squareCraft-border squareCraft-border-solid squareCraft-border-3f3f3f squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
                  <p class="squareCraft-poppins squareCraft-universal squareCraft-text-sm ">Paragraph-2</p>
                  <img id="paragraph2Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="squareCraft-rotate-180" alt="">
               </div>
            </div>
            <div id="paragraph2Dropdown" class="squareCraft-hidden">
               
               <div class="squareCraft-mt-2 squareCraft-px-2  squareCraft-gap-2">
                  
                  <div
                     class="squareCraft-flex squareCraft-mt-2 squareCraft-justify-between  squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between  ">
                        <div class="squareCraft-px-2 squareCraft-py-1_2px squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-l">
                           <p class=" squareCraft-universal   squareCraft-text-sm  squareCraft-poppins">A</p>

                        </div>

                        <div class=" squareCraft-px-2 squareCraft-py-1_2px squareCraft-activeTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  squareCraft-poppins">
                              B</p>

                        </div>
                        <div class="squareCraft-px-2 squareCraft-py-1px squareCraft-inActiveTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">
                              I</p>
                        </div>

                        <div class="squareCraft-px-2 squareCraft-py-0_5px squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-r">
                           <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="" alt="">

                        </div>

                     </div>
                  </div>
               </div>
              <div class="squareCraft-mt-2 squareCraft-px-2">
               <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Style</p>

               <div
               class="squareCraft-mt-2 squareCraft-relative squareCraft-grid  squareCraft-grid-cols-12 squareCraft-gap-2 ">

               <div id="squareCraftFontSelect"
                  class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-8 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
                  <select class=" squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                     style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
                     <option value="" selected disabled hidden>Select Font</option>
                  </select>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2"
                     style="height: 27px; padding: 0 3px; pointer-events: none;">
                     <img class="squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>



               <div
                  class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                              squareCraft-rounded-6px 
                              ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                                 squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                           <div class="squareCraft-v-line"></div>
                           <div
                              class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p
                                 class=" squareCraft-font-light squareCraft-text-sm squareCraft-px-1  ">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-1_5 squareCraft-ml-2"
                              style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px"
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                              squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                              squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div
                              class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
              </div>
               <div
                  class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-7  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div class="  squareCraft-px-2   ">
                        <p
                           class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">
                           Regular</p>
                     </div>
                     <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                        <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                     </div>
                  </div>
                  <div class="squareCraft-col-span-5 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
                 <div>
                  
                 </div>
               </div>
               <div
                  class=" squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <img id="squareCraftTextAlignLeft" data-align="left"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                           class="squareCraft-cursor-pointer alignment-icon   squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignRight" data-align="right"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignCenter" data-align="center"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignJustify" data-align="justify"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto " alt="">
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="18px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://i.ibb.co.com/G460VVdR/Vector.png"
                            style="width: 16px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>

               </div>

               <div
                  class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2">
                  <div
                     class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <p
                           class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           Ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">

                     </div>
                  </div>
               </div>

               <div class="squareCraft-mt-4 squareCraft-px-2">
                  <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Text Highlight</p>
                  <div class="squareCraft-py-1 squareCraft-mt-2 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
               </div>
               <div class="squareCraft-px-2">
                  <div class="squareCraft-h-1px  squareCraft-mt-4 squareCraft-bg-3f3f3f"></div>

               </div>
            </div>
         </div>

         <div>
            <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
               <div id="paragraph3"
                  class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-border-hover-EF7C2F squareCraft-border squareCraft-border-solid squareCraft-border-3f3f3f squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
                  <p class="squareCraft-poppins squareCraft-universal squareCraft-text-sm ">Paragraph-3</p>
                  <img id="paragraph3Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="squareCraft-rotate-180" alt="">
               </div>
            </div>
            <div id="paragraph3Dropdown" class="squareCraft-hidden">
               
               <div class="squareCraft-mt-2 squareCraft-px-2  squareCraft-gap-2">
                  
                  <div
                     class="squareCraft-flex squareCraft-mt-2 squareCraft-justify-between  squareCraft-items-center ">
                     <div class="squareCraft-flex squareCraft-items-center squareCraft-justify-between  ">
                        <div class="squareCraft-px-2 squareCraft-py-1_2px squareCraft-inActiveTab-border squareCraft-cursor-pointer squareCraft-rounded-l">
                           <p class=" squareCraft-universal   squareCraft-text-sm  squareCraft-poppins">A</p>

                        </div>

                        <div class=" squareCraft-px-2 squareCraft-py-1_2px squareCraft-activeTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-bold squareCraft-universal squareCraft-text-sm  squareCraft-poppins">
                              B</p>

                        </div>
                        <div class="squareCraft-px-2 squareCraft-py-1px squareCraft-inActiveTab-border squareCraft-cursor-pointer">
                           <p
                              class="squareCraft-font-italic squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-mx-auto">
                              I</p>
                        </div>

                        <div class="squareCraft-px-2 squareCraft-py-0_5px squareCraft-activeTab-border squareCraft-cursor-pointer squareCraft-rounded-r">
                           <img src="https://i.ibb.co.com/jvHLfd8c/Group.png" class="" alt="">

                        </div>

                     </div>
                  </div>
               </div>
              <div class="squareCraft-mt-2 squareCraft-px-2">
               <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Style</p>

               <div
               class="squareCraft-mt-2 squareCraft-relative squareCraft-grid  squareCraft-grid-cols-12 squareCraft-gap-2 ">

               <div id="squareCraftFontSelect"
                  class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-8 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
                  <select class=" squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                     style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
                     <option value="" selected disabled hidden>Select Font</option>
                  </select>
                  <div class="squareCraft-bg-3f3f3f squareCraft-px-2"
                     style="height: 27px; padding: 0 3px; pointer-events: none;">
                     <img class="squareCraft-rotate-180" width="12px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                  </div>
               </div>



               <div
                  class="squareCraft-flex squareCraft-bg-transparent squareCraft-h-9 squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4   squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center ">
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-text-color-white squareCraft-justify-between squareCraft-col-span-4 squareCraft-rounded-6px squareCraft-items-center  ">
                        <div class="squareCraft-font-size-container squareCraft-poppins squareCraft-universal squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center  
                              squareCraft-rounded-6px 
                              ">
                           <input type="text" id="squareCraftFontSizeInput" value="16" class="squareCraft-font-size-input squareCraft-font-light squareCraft-z-99999 squareCraft-text-sm squareCraft-text-color-white 
                                 squareCraft-bg-transparent  squareCraft-universal squareCraft-font-light">
                           <div class="squareCraft-v-line"></div>
                           <div
                              class="squareCraft-flex squareCraft-items-center  squareCraft-justify-center  squareCraft-items-center">
                              <p
                                 class=" squareCraft-font-light squareCraft-text-sm squareCraft-px-1  ">
                                 px
                           </div>
                           <div class="squareCraft-bg-3f3f3f squareCraft-px-1_5 squareCraft-ml-2"
                              style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                              <img class=" squareCraft-rotate-180 " width="12px"
                                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                           </div>
                        </div>
                        <div id="squareCraftFontSizeOptions" class="squareCraft-hidden  squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                              squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                              squareCraft-mt-1">
                           ${fontSizes?.map(size => `
                           <div
                              class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                              data-value="${size}">${size}</div>
                           `).join('')}
                        </div>
                     </div>
                  </div>
                  <div class="squareCraft-border-r squareCraft-border-585858 "></div>
               </div>
            </div>
              </div>
               <div
                  class="squareCraft-mt-2  squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-bg-494949  squareCraft-col-span-7  squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div class="  squareCraft-px-2   ">
                        <p
                           class="squareCraft-text-sm squareCraft-universal squareCraft-poppins squareCraft-font-light">
                           Regular</p>
                     </div>
                     <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px;">
                        <img class=" squareCraft-mx-auto squareCraft-rotate-180" width="10px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                     </div>
                  </div>
                  <div class="squareCraft-col-span-5 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
                 <div>
                  
                 </div>
               </div>
               <div
                  class=" squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2 ">
                  <div
                     class="squareCraft-flex squareCraft-col-span-5 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <img id="squareCraftTextAlignLeft" data-align="left"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                           class="squareCraft-cursor-pointer alignment-icon   squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignRight" data-align="right"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignCenter" data-align="center"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto" alt="">
                        <div class="squareCraft-v-line"></div>
                        <img id="squareCraftTextAlignJustify" data-align="justify"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                           class="squareCraft-cursor-pointer alignment-icon    squareCraft-mx-auto " alt="">
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="15px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>
                  <div class="squareCraft-flex squareCraft-text-color-white squareCraft-w-full squareCraft-justify-between squareCraft-col-span-3 
                        squareCraft-rounded-6px squareCraft-border squareCraft-border-solid squareCraft-border-585858 
                        squareCraft-items-center ">
                     <div class="squareCraft-Letter-spacing-container squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-flex squareCraft-items-center squareCraft-border 
                           squareCraft-border-solid squareCraft-border-3d3d3d  squareCraft-rounded-6px 
                           ">
                        <input type="text" id="squareCraftLetterSpacingInput" value="18px"
                           class="squareCraft-Letter-spacing-input squareCraft-font-light squareCraft-text-sm squareCraft-text-color-white 
                              squareCraft-bg-transparent squareCraft-w-full  squareCraft-py-1px squareCraft-font-light">
                        <div class="">
                           <img id="squareCraftLetterSpacingDropdown"
                              src="https://i.ibb.co.com/G460VVdR/Vector.png"
                            style="width: 16px;"  class=" squareCraft-px-1  squareCraft-mt-1 squareCraft-mx-auto squareCraft-cursor-pointer">
                        </div>
                     </div>
                     <div id="squareCraftLetterSpacingOptions" class="squareCraft-hidden squareCraft-h-44 squareCraft-font-sm squareCraft-bg-3f3f3f squareCraft-w-20
                           squareCraft-rounded-6px squareCraft-border squareCraft-border-585858 squareCraft-absolute 
                           squareCraft-mt-1">
                        ${LetterSpacing?.map(gap => `
                        <div
                           class="squareCraft-dropdown-item squareCraft-py-1px squareCraft-text-center  squareCraft-text-sm"
                           data-value="${gap}">${gap}
                        </div>
                        `).join('')}
                     </div>
                  </div>

               </div>

               <div
                  class="squareCraft-mt-2 squareCraft-grid squareCraft-px-2  squareCraft-grid-cols-12 squareCraft-gap-2">
                  <div
                     class="squareCraft-flex squareCraft-col-span-7 squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-6px squareCraft-items-center ">
                     <div
                        class="squareCraft-flex squareCraft-poppins  squareCraft-items-center squareCraft-justify-between squareCraft-w-full ">
                        <p
                           class=" squareCraft-mx-2 squareCraft-w-full squareCraft-text-center squareCraft-universal squareCraft-text-sm ">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           Ag</p>
                        <div class="squareCraft-v-line"></div>
                        <p
                           class=" squareCraft-universal  squareCraft-text-sm squareCraft-text-center squareCraft-w-full squareCraft-mx-auto">
                           AG</p>
                        <div class="squareCraft-v-line"></div>
                        <img class=" squareCraft-rounded-6px squareCraft-rotate-180 squareCraft-px-1_5" width="12px"
                           src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">

                     </div>
                  </div>
               </div>

               <div class="squareCraft-mt-4 squareCraft-px-2">
                  <p class="squareCraft-text-xs squareCraft-font-thin squareCraft-mt-4 squareCraft-universal squareCraft-text-gray-300 squareCraft-poppins">Text Highlight</p>
                  <div class="squareCraft-py-1 squareCraft-mt-2 squareCraft-bg-3f3f3f squareCraft-inActiveTab-border squareCraft-flex squareCraft-justify-between squareCraft-items-center squareCraft-px-2 squareCraft-rounded-6px">
                     <p class="squareCraft-text-sm squareCraft-poppins squareCraft-universal">#363544</p>
                     <div class="squareCraft-square-6 squareCraft-border-colors squareCraft-cursor-pointer"></div>
                  </div>
               </div>
               <div class="squareCraft-px-2">
                  <div class="squareCraft-h-1px  squareCraft-mt-4 squareCraft-bg-3f3f3f"></div>

               </div>
            </div>
         </div>
      </div>


      <div class="squareCraft-mt-4"> </div>
   </div>
   <div class="squareCraft-mt-4">
      <div class="squareCraft-flex  squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
         <div
            class="squareCraft-cursor-pointer squareCraft-poppins squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">
            Publish
         </div>
         <div
            class="squareCraft-cursor-pointer squareCraft-poppins squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">
            Reset
         </div>
      </div>

   </div>
</div>
    `;

   const parser = new DOMParser();
   const doc = parser.parseFromString(htmlString, "text/html");
   const isValidHTML = doc.body.children.length > 0;

   console.log("📄 Parsed Document:", doc);
   console.log(`✅ Is Valid HTML: ${isValidHTML}`);

   if (!isValidHTML) {
      console.error("❌ Error: Invalid HTML structure!");
      return "❌ Error: Invalid HTML structure!";
   }

   document.addEventListener("DOMContentLoaded", async function () {
      console.log("✅ JavaScript Loaded and Executed!");

      function addHeadingEventListeners() {
         const heading1 = document.getElementById("heading1");
         if (heading1) {
            heading1.addEventListener("mouseover", () => {
               console.log("Hovered over Heading 1");
            });

            heading1.addEventListener("click", () => {
               console.log("Clicked on Heading 1");
            });

            console.log("✅ Event listeners added to Heading 1");
         } else {
            console.error("❌ heading1 not found in DOM!");
         }
      }

      setTimeout(addHeadingEventListeners, 1000);
   });


   return htmlString;



}
