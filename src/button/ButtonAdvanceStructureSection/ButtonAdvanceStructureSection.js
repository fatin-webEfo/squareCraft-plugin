export function ButtonAdvanceStructureSection(){
    return `
   <div id="button-advance-structure" class="sc-p-2">
  <div id="button-advance-structure-button"
  class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1  sc-rounded-4px">
  <div class="sc-flex sc-gap-2 sc-items-center">
    <img
      loading="lazy"
      src="https://fatin-webefo.github.io/squareCraft-plugin/public/structure.svg"
      width="19px"
      alt=""/>
    <p class="sc-universal sc-roboto">Structure</p>
  </div>
  <img
    src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
    alt="sc-rotate-180"
    class="sc-rotate-180"/>
</div>
<div id="button-advance-structure-section"> <div class="sc-mt-2"> <p class="sc-universal sc-roboto sc-text-gray-300 sc-text-sm sc-font-thin" >Adjust button margin and padding with individual or global controls. </p></div>

<div class="sc-flex  sc-mt-2 sc-items-center sc-justify-between">
 <div class="sc-flex sc-gap-2 sc-items-center">
   <div class="toggle-container">
     <div class="toggle-bullet"></div>
   </div>
   <p class="sc-font-size-12 sc-universal sc-roboto">Enable</p>
 </div>
 <div
   class="sc-flex sc-gradiant-border sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-4px sc-bg sc-bg-454545">
   <p
     class="sc-font-thin sc-universal sc-font-size-12 sc-font-size-11 sc-roboto">
     Reset
   </p>
   <img
     src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
     alt="reset"/>
 </div>
</div>
<div class="sc-h-1px sc-mt-2 sc-bg-3f3f3f"></div>
<div id="button-advance-structure-section" class="">
 <div
 class="sc-mt-8 sc-flex-col sc-pb-30px sc-items-center sc-justify-center sc-gap-2">
 <div class="sc-relative sc-mt-2 sc-items-center sc-flex-col">
   <p
     class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
     style="bottom: 30px">
     0px
   </p>
   <div class="structure-top-box">
     <div id="structure-top-fill" class="structure-top-fill"></div>
   </div>
 </div>
 <div class="sc-flex sc-items-center sc-justify-center sc-gap-2">
   <div class="sc-flex sc-items-center sc-relative">
     <p
       class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
       style="right: 30px">
       0px
     </p>
     <div class="structure-left-box">
       <div id="structure-left-fill" class="structure-left-fill"></div>
     </div>
   </div>
   
   <div class="structure-allside-box sc-relative sc-bg-454545">
     <img
       src="https://fatin-webefo.github.io/squareCraft-plugin/public/structure-all-select.svg"
       class="sc-cursor-pointer"
       alt=""/>
     <p
       class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
       style="right: 18px">
       0px
     </p>
     <p
       class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
       style="top: 18px">
       0px
     </p>
     <p
       class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
       style="left: 18px">
       0px
     </p>
     <p
       class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
       style="bottom: 18px">
       0px
     </p>

     <div
     id="structure-all-side-left-bar"
       class="structure-all-side-left-bar sc-absolute sc-cursor-pointer"
       style="left: 2px"></div>
     <div
     id="structure-all-side-right-bar"
       class="structure-all-side-right-bar sc-absolute sc-cursor-pointer"
       style="right: 2px"></div>
     <div
     id="structure-all-side-top-bar"
       class="structure-all-side-top-bar sc-absolute sc-cursor-pointer"
       style="top: 2px"></div>
     <div
     id="structure-all-side-bottom-bar"
       class="structure-all-side-bottom-bar sc-absolute sc-cursor-pointer"
       style="bottom: 2px"></div>
   </div>

   <div class="sc-flex sc-items-center sc-justify-center sc-relative">
     <div class="structure-right-box">
       <div id="structure-right-fill" class="structure-right-fill"></div>
     </div>
     <p
       class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
       style="left: 30px">
       0px
     </p>
   </div>
 </div>
 <div class="sc-relative sc-items-center sc-flex-col">
   <div class="structure-bottom-box">
     <div id="structure-bottom-fill" class="structure-bottom-fill"></div>
   </div>
   <p
     class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
     style="top: 30px">
     0px
   </p>
 </div>
</div>
<div
 class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"></div>
<div class="sc-mt-4 ">
 <div>
   <div class="sc-flex sc-items-center sc-justify-between">
     <p class="sc-universal sc-text-md">Margin Gap</p>
     <div class="sc-flex sc-items-center sc-gap-3">
       <div
         class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f">
         <img
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
           width="10"
           alt="reset"/>
       </div>
       <div class="sc-flex sc-z-99999 sc-relative sc-items-center">
          <div class="sc-bg-3f3f3f sc-relative sc-py-1px sc-rounded-l sc-px-2 sc-w-25px">
            <p class="sc-universal sc-roboto sc-font-size-11">PX</p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-4px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
             <span class="sc-arrow-placeholder"></span>
             <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
     </div>
   </div>
 </div>
<div id="button-advance-marginTop"> <div  class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6">
 <div  class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full" style="width: 0%;"></div>
 <div  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half" style="left: 0%;">
 </div>
</div>
<div class="sc-grid sc-grid-cols-12 sc-mt-2">
 <div></div>
 <div style="padding: 2px 0px;" class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-font-size-12 sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-center  sc-px-1 sc-rounded-4px">
    <div id="button-advance-margin-gap-all"  class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-bg-454545 sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
       <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg" loading="lazy" alt="all-border">
       <p class="sc-font-thin sc-roboto sc-universal ">All</p>
    </div>
    <div id="button-advance-margin-gap-top" class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
       <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy" alt="top-border">
       <p class="sc-font-thin sc-roboto sc-universal ">Top</p>
    </div>
    <div id="button-advance-margin-gap-bottom"  class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
       <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg" loading="lazy" alt="bottom-border">
       <p class="sc-font-thin sc-roboto sc-universal ">Bottom</p>
    </div>
    <div id="button-advance-margin-gap-left" class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
       <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg" loading="lazy" alt="left-border">
       <p class="sc-font-thin sc-roboto sc-universal ">Left</p>
    </div>
    <div id="button-advance-margin-gap-right" class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
       <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg" loading="lazy" alt="right-border">
       <p class="sc-font-thin sc-roboto sc-universal ">Right</p>
    </div>
 </div>
</div></div></div>

<div class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"></div>

<div class="sc-mt-4 ">
 <div>
   <div class="sc-flex sc-items-center sc-justify-between">
     <p class="sc-universal sc-text-md">Padding Gap</p>
     <div class="sc-flex sc-items-center sc-gap-3">
       <div
         class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f">
         <img
           src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
           width="10"
           alt="reset"/>
       </div>
       <div class="sc-flex sc-z-99999 sc-relative sc-items-center">
          <div class="sc-bg-3f3f3f sc-relative sc-py-1px sc-rounded-l sc-px-2 sc-w-25px">
            <p class="sc-universal sc-roboto sc-font-size-11">PX</p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-4px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
             <span class="sc-arrow-placeholder"></span>
             <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
     </div>
   </div>
 </div>
 <div id="button-advance-paddingTop"> <div  class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6">
    <div  class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full" style="width: 0%;"></div>
    <div  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half" style="left: 0%;">
    </div>
 </div>
 <div class="sc-grid sc-grid-cols-12 sc-mt-2">
    <div></div>
    <div style="padding: 2px 0px;" class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-font-size-12 sc-font-thin   sc-border sc-border-solid sc-border-3f3f3f   sc-justify-center  sc-px-1 sc-rounded-4px">
       <div id="button-advance-padding-gap-all" class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-bg-454545 sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
          <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg" loading="lazy" alt="all-border">
          <p class="sc-font-thin sc-roboto sc-universal ">All</p>
       </div>
       <div id="button-advance-padding-gap-top"  class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
          <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg" loading="lazy" alt="top-border">
          <p class="sc-font-thin sc-roboto sc-universal ">Top</p>
       </div>
       <div id="button-advance-padding-gap-bottom" class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
          <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg" loading="lazy" alt="bottom-border">
          <p class="sc-font-thin sc-roboto sc-universal ">Bottom</p>
       </div>
       <div id="button-advance-padding-gap-left" class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
          <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg" loading="lazy" alt="left-border">
          <p class="sc-font-thin sc-roboto sc-universal ">Left</p>
       </div>
       <div id="button-advance-padding-gap-right" class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1">
          <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg" loading="lazy" alt="right-border">
          <p class="sc-font-thin sc-roboto sc-universal ">Right</p>
       </div>
    </div>
 </div></div>
</div>
</div>
</div>
</div>
    `;
}