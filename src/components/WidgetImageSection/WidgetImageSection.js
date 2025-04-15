


export function WidgetImageSection(id) {

   return `

   <div id="imageSection">
            <div class="sc-flex sc-p-2 sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <img loading="lazy" src="https://fatin-webefo.github.io/squareCraft-plugin/public/iamgeicon.png"
                     alt="">
                  <p class="sc-universal sc-poppins">Image</p>
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
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p class="sc-font-thin sc-universal sc-text-sm sc-text-xs sc-poppins">Reset</p>
                  <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" alt="reset">
               </div>
            </div>
            <div class="sc-h-1px  sc-bg-3f3f3f"></div>
            <div class="sc-mt-3">
               <div class="sc-flex sc-poppins sc-px-2  sc-items-center sc-justify-between sc-gap-2">
                  <div
                     class="sc-cursor-pointer sc-bg-color-EF7C2F sc-w-full sc-font-thin sc-flex sc-items-center sc-text-sm sc-py-0_5 sc-rounded-6px sc-text-color-white sc-justify-center">
                     Normal
                  </div>
                  <div
                     class="sc-cursor-pointer sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-thin sc-flex sc-text-sm sc-py-0_5 sc-rounded-6px sc-items-center sc-justify-center">
                     Hover
                  </div>
               </div>
               <div class="sc-px-4">
                  <div class="sc-h-1px  sc-mt-3 sc-bg-3f3f3f"></div>
               </div>
            </div>

            <div class="sc-flex sc-mt-4 sc-px-2">
               <div id="borderButton"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <h5 class="sc-poppins sc-font-thin sc-universal  sc-text-color-white">Border</h5>
                  <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            <div id="borderSection" class="sc-px-2 sc-mt-3">
               <div class=" sc-px-2 sc-flex sc-items-center sc-justify-between">
                  <div class="sc-flex sc-gap-2 sc-items-center">
                     <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Border
                     </p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                           alt="reset">
                     </div>
                  </div>
                  <div
                     class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                     <p id="radiousCount" class="sc-font-thin sc-poppins sc-universal sc-text-xs">0px</p>
                     <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="9">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                           class="sc-rotate-180" alt="">
                     </div>
                  </div>
               </div>

               <div id="radiousField" class="sc-rounded-15px sc-relative sc-mt-3 sc-w-full sc-h-2 sc-bg-F6F6F6">
                  <div id="radiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
                  <div id="radiousBullet"
                     class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                  </div>
               </div>
               <div class="sc-grid sc-grid-cols-12 sc-mt-3">
                  <div></div>
                  <div style="padding: 2px 0px;"
                     class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-text-sm sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-between  sc-px-1 sc-rounded-6px">
                     <div
                        class="sc-flex sc-px-1_5 sc-cursor-pointer sc-py-0_5 sc-rounded-6px sc-bg-454545 sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg" loading="lazy"
                           alt="all-radious">
                        <p class="sc-font-thin sc-poppins sc-universal ">All</p>
                     </div>
                     <div
                        class="sc-flex sc-px-1_5 sc-cursor-pointer sc-py-0_5 sc-rounded-6px  sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy"
                           alt="top-radious">
                        <p class="sc-font-thin sc-poppins sc-universal ">Top</p>
                     </div>
                     <div
                        class="sc-flex sc-px-1_5 sc-cursor-pointer sc-py-0_5 sc-rounded-6px  sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg" loading="lazy"
                           alt="bottom-radious">
                        <p class="sc-font-thin sc-poppins sc-universal ">Bottom</p>
                     </div>
                     <div
                        class="sc-flex sc-px-1_5 sc-cursor-pointer sc-py-0_5 sc-rounded-6px  sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg" loading="lazy"
                           alt="left-radious">
                        <p class="sc-font-thin sc-poppins sc-universal ">Left</p>
                     </div>
                     <div
                        class="sc-flex sc-px-1_5 sc-cursor-pointer sc-py-0_5 sc-rounded-6px  sc-items-center sc-gap-1">
                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg" loading="lazy"
                           alt="right-radious">
                        <p class="sc-font-thin sc-poppins sc-universal ">Right</p>
                     </div>
                  </div>
               </div>
               <div class="sc-mt-4 sc-gap-2 sc-grid sc-grid-cols-12">
                  <div class="sc-col-span-5">
                     <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Border
                        Color
                     </p>
                     <div
                        class="sc-py-xs sc-mt-3 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-1_5 sc-rounded-6px">
                        <p class="sc-text-sm sc-poppins c-font-light sc-universal">#363544</p>
                        <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                     </div>
                  </div>
                  <div class="sc-col-span-7">
                     <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Border
                        Style
                     </p>
                     <div style="padding: 3px 0px;"
                        class="sc-bg-3f3f3f sc-flex sc-text-xs sc-gap-1 sc-mt-3 sc-rounded-6px   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-between  sc-px-1 ">


                        <div class="sc-py-0_5 sc-bg-454545 sc-w-full sc-rounded-6px ">
                           <p class="sc-font-thin sc-poppins  sc-text-center sc-universal  sc-cursor-pointer   ">Solid
                           </p>
                        </div>


                        <div class="sc-py-0_5  sc-w-full sc-rounded-6px ">
                           <p class="sc-font-thin sc-poppins  sc-text-center sc-universal  sc-cursor-pointer  ">Dashed
                           </p>
                        </div>
                        <div class="sc-py-0_5  sc-w-full sc-rounded-6px">

                           <p
                              class="sc-font-thin sc-poppins  sc-text-center sc-universal  sc-cursor-pointer  sc-rounded-6px">
                              Dotted</p>
                        </div>

                     </div>
                  </div>
               </div>

               <div class="sc-mt-4">
                  <div class="  sc-flex sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           Border Radious
                        </p>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                              alt="reset">
                        </div>
                     </div>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p class="sc-font-thin sc-poppins sc-universal sc-text-xs">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>
                  <div class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>

               </div>
            </div>

            <div class="sc-h-1px sc-mt-4 sc-bg-3f3f3f"></div>

           
               <div class="sc-mt-4 sc-px-2">
                  <div id="overLayButton"
                     class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1  sc-rounded-6px">
                     <h5 class="sc-poppins sc-font-thin sc-universal  sc-text-color-white">Overlay</h5>
                     <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                        class="sc-rotate-180" alt="">
                  </div> 
               </div>


                <div id="overLaySection" class="sc-px-2 sc-hidden sc-mt-3">  
                  <div class="sc-flex sc-gap-2 sc-items-center ">
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Overlay
                  </p>
                  <div
                     class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                        alt="reset">
                  </div>
               </div>
               <div class="sc-mt-4">
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Visible
                  </p>
               </div>
               <div class="sc-flex sc-mt-2 sc-items-center">
                  <div class="sc-bg-3f3f3f sc-py-1 sc-px-2 sc-rounded-l">
                     <p class="sc-universal sc-poppins sc-text-sm ">Yes</p>
                  </div>
                  <img style="width: 31px;" loading="lazy"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/imageArrow.svg" alt="">
               </div>
           
            <div class="sc-mt-4 sc-gap-2 sc-flex">
               <div class="">
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                     Color
                  </p>
                  <div
                     class="sc-py-0_5 sc-gap-5 sc-mt-2 sc-bg-3f3f3f sc-inActiveTab-border  sc-flex sc-justify-between sc-items-center sc-px-1_5 sc-rounded-6px">
                     <p class="sc-text-xs sc-poppins sc-font-light sc-universal">#363544</p>
                     <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                  </div>
               </div>
               <div class="">
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                     Width
                  </p>
                  <div class="sc-flex sc-mt-2 sc-items-center">
                     <div class="sc-bg-3f3f3f sc-py-1 sc-rounded-l sc-px-2">
                        <p class="sc-universal sc-poppins sc-text-sm ">20px</p>
                     </div>
                     <div class="sc-bg-454545 sc-px-2_5 sc-py-3">
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="10">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>

               </div>
               <div class="">
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                     Height
                  </p>
                  <div class="sc-flex sc-mt-2 sc-items-center">
                     <div class="sc-bg-3f3f3f sc-py-1 sc-rounded-l sc-px-2">
                        <p class="sc-universal sc-poppins sc-text-sm ">20px</p>
                     </div>
                     <div class="sc-bg-454545 sc-px-2_5 sc-py-3">
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="10">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="10"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>
                  <div>

                  </div>
               </div>


            </div>
            <div class="sc-mt-4">
               <div>
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Position
                  </p>
               </div>
               <div class="sc-flex sc-mt-2 sc-items-center">
                  <div class="sc-bg-3f3f3f sc-py-1 sc-w-40 sc-px-1_5 sc-rounded-l">
                     <p class="sc-universal sc-poppins sc-text-sm ">Custom</p>
                  </div>
                  <img style="width: 32px;" loading="lazy"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/imageArrow.svg" alt="">
               </div>
            </div>

          <div class="mt-3 sc-flex sc-mt-4 sc-items-center sc-gap-3">
               <div class="sc-w-full">
                  <div class="sc-flex sc-gap-2 sc-items-center sc-justify-between">
                     <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                        (X Axis)
                     </p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p class="sc-font-thin sc-poppins sc-universal sc-text-xs">50px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>

                     </div>

                  </div>
                  <div class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>
               </div>
               <div class="sc-w-full">
                  <div class="sc-flex sc-gap-2 sc-items-center sc-justify-between">
                     <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                        (X Axis)
                     </p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                        <p class="sc-font-thin sc-poppins sc-universal sc-text-xs">50px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>

                     </div>

                  </div>
                  <div class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>
               </div>
            </div>
         </div>



         <div class="sc-h-1px sc-mt-4 sc-bg-3f3f3f"></div>

              

               <div class="sc-px-2">
                  <div id="shadowButton"
                     class="sc-bg-3f3f3f sc-mt-4 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1  sc-rounded-6px">
                     <h5 class="sc-poppins sc-font-thin sc-universal  sc-text-color-white">Shadow</h5>
                     <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                        class="sc-rotate-180" alt="">
                  </div>


                 <div id="shadowSection" class="sc-hidden"> 
                  <div class="sc-flex sc-gap-2 sc-items-center sc-mt-3">
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300"> Shadow
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
                        <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           (X Axis)
                        </p>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p class="sc-font-thin sc-poppins sc-universal sc-text-xs">50px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>

                        </div>

                     </div>
                     <div class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                        <div
                           class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                        </div>
                     </div>
                  </div>
                  <div class="sc-w-full">
                     <div class="sc-flex sc-gap-2 sc-items-center sc-justify-between">
                        <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                           (X Axis)
                        </p>
                        <div
                           class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                           <p class="sc-font-thin sc-poppins sc-universal sc-text-xs">50px</p>
                           <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                                 width="9">
                              <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                                 class="sc-rotate-180" alt="">
                           </div>

                        </div>

                     </div>
                     <div class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                        <div
                           class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                        </div>
                     </div>
                  </div>
               </div>

               <div class="sc-mt-4">
                  <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
                     Color
                  </p>
                  <div class="sc-flex sc-mt-2">
                     <div
                        class="sc-py-0_5  sc-bg-3f3f3f   sc-flex sc-gap-5 sc-items-center sc-px-1_5 sc-rounded-6px">
                        <p class="sc-text-sm sc-poppins c-font-light sc-universal">#363544</p>
                        <div class="sc-square-6 sc-border-colors sc-cursor-pointer"></div>
                     </div>
                  </div>
               </div>
               <div class="sc-mt-4">
                  <div class="  sc-flex sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
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
                        <p class="sc-font-thin sc-poppins sc-universal sc-text-xs">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>
                  <div class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>

               </div>



               <div class="sc-mt-4">
                  <div class="  sc-flex sc-items-center sc-justify-between">
                     <div class="sc-flex sc-gap-2 sc-items-center">
                        <p class="sc-poppins sc-font-thin sc-universal  sc-text-sm sc-font-thin sc-text-gray-300">
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
                        <p class="sc-font-thin sc-poppins sc-universal sc-text-xs">0px</p>
                        <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt=""
                              width="9">
                           <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="9"
                              class="sc-rotate-180" alt="">
                        </div>
                     </div>
                  </div>
                  <div class="sc-rounded-15px sc-mt-3 sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
                     <div
                        class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
                     </div>
                  </div>

               </div>
            </div>
               </div>

               <div class="sc-h-1px sc-mt-4 sc-bg-3f3f3f"></div>
              
               <div class="sc-mt-6 sc-px-2">
                  <div class="sc-flex sc-justify-between sc-gap-2 sc-items-center">
                     <p style="font-size: 16px;" class="sc-poppins sc-font-thin sc-universal  sc-text-color-white">image
                        Masking</p>
                     <div
                        class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                           alt="reset">
                     </div>
                  </div>
                 <div class="sc-mt-3 sc-grid sc-grid-cols-12 sc-gap-2">
                        ${[...Array(8)].map((_, i) => {
                          const num = i + 1;
                          return `
                            <div class="sc-col-span-3 sc-bg-3f3f3f sc-rounded-6px sc-cursor-pointer sc-border-EF7C2F-hover sc-p-4 sc-flex sc-items-center sc-justify-center">
                              <img 
                                data-mask="https://fatin-webefo.github.io/squareCraft-plugin/public/imageMask%20(${num}).svg" 
                                class="sc-image-mask-thumb sc-w-full sc-h-full sc-object-contain" 
                                src="https://fatin-webefo.github.io/squareCraft-plugin/public/imageMask%20(${num}).svg" 
                                alt="Mask ${num}">
                            </div>
                          `;
                        }).join('')}
                      </div>
                      
                   
                   
               </div>


          

            <div class="sc-mt-4"> </div>
         </div>
    `
}