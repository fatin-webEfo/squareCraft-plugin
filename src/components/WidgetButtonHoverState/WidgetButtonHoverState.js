export function WidgetButtonHoverState(){
    return`
     <div id="ButtonHoverState" class="sc-mt-4 sc-hidden  sc-roboto sc-font-light  sc-px-2">
            <div id="hover-colorButton"
               class="sc-bg-3f3f3f sc-mt-4 sc-relative sc-z-9999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
               <p class="sc-roboto  sc-universal ">Color</p>
               <img id="hover-heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
            <div id="hover-colorSection" class="sc-mt-3">
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
                     
                  </div>
               </div>
            </div>
          
          
          
            <div class=" sc-flex sc-items-center sc-gap-2">
             
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
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative  sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
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
               <div id="hover-buttonEffect"
               class="sc-bg-3f3f3f sc-mt-3 sc-relative  sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-6px">
               <p class="sc-roboto  sc-universal ">Button Effect</p>
               <img id="hover-heading1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>

           <div id="hover-buttonEffectSection" class="sc-mt-4 sc-hidden">
            <div class="sc-flex sc-items-center sc-gap-8px"> 
               <div >
               <p class="sc-universal sc-roboto sc-text-sm">Transition Type</p>
   
               <div class="sc-flex sc-mt-2 sc-relative sc-items-center">
                  <div  class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-16">
                  <p id="hover-buttonTransitionTypeLabel" class="sc-universal sc-roboto sc-text-sm">None</p>
                  </div>   
               
                  <div id="hover-buttonTransitionDropdown" class="sc-absolute sc-rounded-6px sc-hidden sc-border sc-border-solid sc-border-EF7C2F   sc-left-0 sc-top-[35px] sc-z-99999">
                  <div class="sc-bg-3f3f3f sc-py-1 sc-text-sm sc-px-2 sc-w-16  sc-bg-colo-EF7C2F-hover  sc-cursor-pointer" data-value="none">None</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="linear">Linear</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="ease-in">ease-in</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="ease-out">ease-out</div>
                  </div>
               
                  <div id="hover-buttonTransitionTypeSelect" class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" alt="">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" class="sc-rotate-180" alt="">
                  </div>
                  </div>
               </div>
            </div>
               <div id="hover-buttonEffectDurationSection">
               <p class="sc-universal sc-roboto sc-text-sm">Duration(ms)</p>
   
               <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
                  <div  class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-toogle">
                  <p id="hover-buttonDurationLabel" class="sc-universal sc-roboto sc-text-sm">None</p>
                  </div>   
               
                  <div id="hover-buttonDurationDropdown" class="sc-absolute sc-rounded-6px sc-hidden sc-border sc-border-solid sc-border-EF7C2F sc-h-dropdown sc-scrollBar  sc-left-0 sc-top-[35px] sc-z-[99999]">
                  <div class="sc-bg-3f3f3f sc-py-1 sc-text-sm sc-px-2 sc-w-toogle  sc-bg-colo-EF7C2F-hover  sc-cursor-pointer" data-value="none">None</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="100">100</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="300">300</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="500">500</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="700">700</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="1000">1000</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="1200">1200</div>
                  </div>
               
                  <div id="hover-buttonDurationSelect" class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" alt="">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" class="sc-rotate-180" alt="">
                  </div>
                  </div>
               </div>
            </div>
               <div id="hover-buttonEffectDelaySection">
               <p class="sc-universal sc-roboto sc-text-sm">Delay(ms)</p>
   
               <div class="sc-flex sc-mt-2 sc-relative sc-items-center">
                  <div  class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-toogle">
                  <p id="hover-buttonDelayLabel" class="sc-universal sc-roboto sc-text-sm">None</p>
                  </div>   
               
                  <div id="hover-buttonDelayDropdown" class="sc-absolute sc-rounded-6px sc-hidden sc-border sc-border-solid sc-border-EF7C2F sc-h-dropdown sc-scrollBar  sc-left-0 sc-top-[35px] sc-z-50">
                  <div class="sc-bg-3f3f3f sc-py-1 sc-text-sm sc-px-2 sc-w-toogle sc-bg-colo-EF7C2F-hover  sc-cursor-pointer" data-value="none">None</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="100">100</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="300">300</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="500">500</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="700">700</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="1000">1000</div>
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-toogle sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="1200">1200</div>
                  </div>
               
                  <div id="hover-buttonDelayTypeSelect" class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" alt="">
                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" class="sc-rotate-180" alt="">
                  </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="hover-buttonEffectSection" class="sc-mt-3">
            <p class="sc-universal sc-roboto sc-text-sm">Transform</p>
   
            <div class="sc-flex sc-mt-2 sc-relative sc-items-center">
               <div  class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-16">
               <p id="hover-buttonTransformTypeLabel" class="sc-universal sc-roboto sc-text-sm">None</p>
               </div>   
            
               <div id="hover-buttonTransformDropdown" class="sc-absolute sc-rounded-6px sc-hidden sc-border sc-border-solid sc-h-dropdown sc-scrollBar sc-border-EF7C2F   sc-left-0 sc-top-[35px] sc-z-[99999]">
               <div class="sc-bg-3f3f3f sc-py-1 sc-text-sm sc-px-2 sc-w-16 sc-bg-colo-EF7C2F-hover  sc-cursor-pointer" data-value="none">None</div>
               <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="TranslateX">TranslateX</div>
               <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="TranslateY">TranslateY</div>
               <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="RotateX">RotateX</div>
               <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="RotateY">RotateY</div>
               <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-text-sm sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover" data-value="Scale">Scale</div>
               </div>
            
               <div id="hover-buttonTransformTypeSelect" class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
               <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" alt="">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10" class="sc-rotate-180" alt="">
               </div>
               </div>
            </div>
         </div>
         <div class=" sc-mt-3 sc-flex sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
               <p class="sc-roboto sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Transform Position
               </p>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
   
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                     alt="reset">
               </div>
            </div>
            <div
               class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
               <p id="hover-buttoniconTransformPositionCount" class="sc-font-thin sc-roboto sc-universal sc-text-xs">0px</p>
               <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
         </div>
         <div id="hover-buttonIconTransformPositionField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
            <div id="hover-buttonIconTransformPositionFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
            <div id="hover-buttonIconTransformPositionBullet"
               class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
            </div>
         </div>
           </div>

           
          </div>
    `
}