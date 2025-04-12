


export function WidgetImageSection(id){
   
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
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-1 sc-bg sc-bg-454545">
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

            <div class="sc-flex sc-mt-4 sc-px-2">
               <div id="paragraph1"
                  class="sc-bg-3f3f3f sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-6px">
                  <h5 class="sc-poppins sc-font-light sc-universal  sc-text-color-white">Border</h5>
                  <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="sc-rotate-180" alt="">
               </div>
            </div>
            <div class="sc-mt-2 sc-px-2 sc-flex sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <p class="sc-poppins sc-font-light sc-universal  sc-text-sm sc-font-light sc-text-gray-300"> Border
                  </p>
                  <div
                     class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10" alt="reset">
                  </div>
               </div>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p id="radiousCount" class="sc-font-light sc-poppins sc-universal sc-text-sm sc-text-xs">50px</p>
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-1"> 
                     <img id="paragraph1Arrow"src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="" width="8">
                     <img id="paragraph1Arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" width="8" class="sc-rotate-180"alt=""> 
                     </div>
               </div>
            </div>
          <div class="sc-mt-4 sc-px-2">
           <div id="radiousField" class="sc-rounded-15px sc-relative sc-w-full sc-h-2 sc-bg-F6F6F6">
             <div id="radiousFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
             <div id="radiousBullet" class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"></div>
           </div>
         </div>

            <div class="sc-mt-4"> </div>
         </div>
    `
}