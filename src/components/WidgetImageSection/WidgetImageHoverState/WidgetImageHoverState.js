export function WidgetImageHoverState() {
  return `
     <div id="image-hover-state" class="sc-huidden sc-mt-2 sc-px-2">
               <div id="image-hover-border"
                  class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px">
                  <p class="sc-roboto  sc-universal sc-font-size-14">Border</p>
                  <img id="image-hover-border-arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
               <div id="image-hover-border-section" class=" sc-mt-2 ">
                  <div class=" sc-flex sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300">
                           Border
                        </p>
                        <div id="image-hover-border-reset"
                           class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
    
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                              alt="reset">
                        </div>
                     </div>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p id="image-hover-BorderCount" class="sc-font-thin sc-roboto sc-universal sc-font-size-11">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                            <span id="image-hover-BorderIncrease" class="sc-arrow-placeholder"></span>
                            <span id="image-hover-BorderDecrease" class="sc-arrow-placeholder sc-rotate-180"></span>
                        </div>
                     </div>
                  </div>
    
                  <div id="image-hover-BorderField" class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div id="image-hover-BorderFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                     <div id="image-hover-BorderBullet"
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>
                  <div class="sc-grid sc-grid-cols-12 sc-mt-2">
                     <div></div>
                     <div style="padding: 2px 0px;"
                        class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-font-size-12 sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-center  sc-px-1 sc-rounded-4px">
                        <div id="image-hover-BorderAll"
                           class="sc-flex sc-px-1_5 sc-bg-454545 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg" loading="lazy"
                              alt="all-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">All</p>
                        </div>
                        <div id="image-hover-BorderTop"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy"
                              alt="top-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Top</p>
                        </div>
                        <div id="image-hover-BorderBottom"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg"
                              loading="lazy" alt="bottom-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Bottom</p>
                        </div>
                        <div id="image-hover-BorderLeft"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg"
                              loading="lazy" alt="left-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Left</p>
                        </div>
                        <div id="image-hover-BorderRight"
                           class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg"
                              loading="lazy" alt="right-border">
                           <p class="sc-font-thin sc-roboto sc-universal ">Right</p>
                        </div>
                     </div>
                  </div>
    
                  <div class="sc-mt-4 sc-gap-2 sc-grid sc-grid-cols-12">
                     <div class="sc-col-span-5">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300">
                           Border
                           Color
                        </p>
    
                        <div
                           class="sc-py-4px sc-relative sc-mt-2 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-1 sc-rounded-4px">
                           <p class="sc-font-size-12 sc-roboto sc-font-light sc-universal">Select</p>
                           <div class="sc-square-6  sc-cursor-pointer">
                           </div>
    
                           <div id="color-palette"
                              class="sc-absolute sc-hidden sc-border sc-border-solid sc-border-EF7C2F sc-top-12 sc-bg-3f3f3f sc-left-0 sc-p-1 sc-rounded-4px ">
                              <div class="sc-color-arrow"></div>
                              <div class="sc-flex sc-items-center sc-justify-between">
                                 <div id="border-colors" class="sc-flex sc-relative sc-items-center sc-gap-1">
    
    
                                 </div>
    
    
                                 <div class="sc-rounded-15px sc-px-2 sc-cursor-pointer sc-py-4px sc-bg-454545 sc-flex sc-gap-1">
                                    <p class="sc-universal sc-font-size-11 sc-roboto">RGB</p>
                                   <span="sc-arrow-placeholder sc-rotate-180"></span>
    
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
                                 class="sc-flex sc-justify-between sc-mt-2 sc-px-2 sc-py-0_5 sc-rounded-4px sc-bg-454545">
                                 <p id="color-code" class="sc-font-size-12 sc-roboto sc-font-light sc-universal">Select
                                 </p>
                                 <p id="color-transparency-count"
                                    class="sc-font-size-12 sc-roboto sc-font-light sc-universal">100%</p>
                              </div>
                           </div>
    
                        </div>
                     </div>
                     <div class="sc-col-span-7">
                        <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300">
                           Border
                           Style
                        </p>
                        <div style="padding: 2px 0px;"
                           class="sc-bg-3f3f3f sc-flex sc-font-size-11 sc-gap-1 sc-mt-2 sc-rounded-4px   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-between  sc-px-1 ">
    
    
                           <div id="image-hover-BorderTypeSolid" class="sc-py-4px sc-bg-454545 sc-w-full sc-rounded-4px ">
                              <p class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer   ">
                                 Solid
                              </p>
                           </div>
    
    
                           <div id="image-hover-BorderTypeDashed" class="sc-py-4px  sc-w-full sc-rounded-4px ">
                              <p class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer  ">
                                 Dashed
                              </p>
                           </div>
                           <div id="image-hover-BorderTypeDotted" class="sc-py-4px  sc-w-full sc-rounded-4px">
    
                              <p 
                                 class="sc-font-thin sc-roboto  sc-text-center sc-universal  sc-cursor-pointer  sc-rounded-4px">
                                 Dotted</p>
                           </div>
    
                        </div>
                     </div>
                  </div>
    
                  <div class="sc-mt-4">
                     <div class="  sc-flex sc-items-center sc-justify-between">
                        <div class="sc-flex sc-gap-2 sc-items-center">
                           <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300">
                              Border radius
                           </p>
                           <div id="border-radius-reset"
                              class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">
    
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                                 width="10" alt="reset">
                           </div>
                        </div>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p id="image-hover-BorderradiusCount" class="sc-font-thin sc-roboto sc-universal sc-font-size-11">0px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                               <span  id="image-hover-BorderradiusIncrease" class="sc-arrow-placeholder"></span>
                               <span id="image-hover-BorderradiusDecrease" class="sc-arrow-placeholder sc-rotate-180"></span>
                           </div>
                        </div>
                     </div>
                    <div id="image-hover-BorderradiusField" class="sc-rounded-15px sc-mt-2 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                   <div id="image-hover-BorderradiusFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                   <div id="image-hover-BorderradiusBullet"
                       class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                   </div>
                   </div>
                   
    
                  </div>
               </div>




               <div id="image-hover-filter"
               class="sc-bg-3f3f3f sc-mt-3 sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px">
               <p class="sc-roboto  sc-universal sc-font-size-14">Filter</p>
               <img id="image-hover-filter-arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                  class="sc-rotate-180" alt="">
            </div>
         </div>
    `;
}
