export function TypoAdvanceScrollEffectHorizontalSection() {
  return `
    <div
         id="Typo-advance-horizontal-section"
         class="sc-bg-454545 sc-hidden sc-mt-2 sc-border sc-border-solid sc-border-EF7C2F sc-p-2 sc-rounded-4px">
         <div class="sc-flex sc-flex-col sc-gap-2">
           <div class="sc-flex sc-gap-2 sc-items-center">
             <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
               Custom Timeline
             </p>
             <div
               id="Typo-horizontal-custom-timeline-reset"
               class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
             >
               <img
                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                 width="10"
                 alt="reset"
               />
             </div>
           </div>
 
           <div class="sc-relative sc-mt-2 sc-h-2 sc-bg-F6F6F6 sc-rounded-15px">
             <div
               id="Typo-horizontal-timeline-start-fill"
               class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
               style="left: 0%; width: 0%"
             ></div>
             <div
               id="Typo-horizontal-timeline-end-fill"
               class="sc-absolute sc-bg-F6B67B sc-h-2 sc-rounded-r-full"
               style="right: 0%; width: 0%"
             ></div>
 
             <div
               id="Typo-horizontal-timeline-start-bullet"
               class="sc-absolute sc-w-3 sc-h-3 sc-bg-color-EF7C2F sc-rounded-full sc-cursor-pointer sc-top-half"
               style="left: 0%"
             ></div>
             <div
               id="Typo-horizontal-timeline-end-bullet"
               class="sc-absolute sc-w-3 sc-h-3 sc-bg-F6B67B sc-rounded-full sc-cursor-pointer sc-top-half"
               style="right: 0%"
             ></div>
           </div>
 
           <div
             class="sc-flex sc-mt-1 sc-justify-between sc-font-size-12 sc-text-gray-300"
           >
             <p class="sc-universal sc-roboto">
               Start <span id="Typo-horizontal-timelineStartValue">0%</span>
             </p>
             <p class="sc-universal sc-roboto">
               End <span id="Typo-horizontal-timelineEndValue">0%</span>
             </p>
           </div>
           <div
             id="Typo-horizontal-custom-timeline-border"
             class="sc-mt-1 horizontal-custom-timeline-border"
           >
             <div
               id="Typo-horizontal-custom-timeline-arrow"
               class="sc-absolute sc-top-6px"
             ></div>
           </div>
         </div>
 
         <div class="sc-w-full sc-mt-8">
           <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
             <div class="sc-flex sc-gap-2 sc-items-center">
               <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                 Entry
               </p>
               <div
                 id="Typo-horizontal-advance-entry-reset"
                 class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
               >
                 <img
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                   width="10"
                   alt="reset"
                 />
               </div>
             </div>
             <div
               class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg-3f3f3f"
             >
               <p
                 id="Typo-horizontal-advance-entry-count"
                 class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
               >
                 0px
               </p>
               <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                 <span
                   id="Typo-horizontal-advance-entry-increase"
                   class="sc-arrow-placeholder"
                 ></span>
                 <span
                   id="Typo-horizontal-advance-entry-decrease"
                   class="sc-arrow-placeholder sc-rotate-180"
                 ></span>
               </div>
             </div>
           </div>
           <div
             id="Typo-horizontal-advance-entry-field"
             class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
           >
             <div
               id="Typo-horizontal-advance-entry-fill"
               class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
             ></div>
             <div
               id="Typo-horizontal-advance-entry-bullet"
               class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
             ></div>
           </div>
         </div>
         <div class="sc-w-full sc-mt-3">
           <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
             <div class="sc-flex sc-gap-2 sc-items-center">
               <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                 Center
               </p>
               <div
                 id="Typo-horizontal-advance-center-reset"
                 class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
               >
                 <img
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                   width="10"
                   alt="reset"
                 />
               </div>
             </div>
             <div
               class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg-3f3f3f"
             >
               <p
                 id="Typo-horizontal-advance-center-count"
                 class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
               >
                 0px
               </p>
               <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                 <span
                   id="Typo-horizontal-advance-center-increase"
                   class="sc-arrow-placeholder"
                 ></span>
                 <span
                   id="Typo-horizontal-advance-center-decrease"
                   class="sc-arrow-placeholder sc-rotate-180"
                 ></span>
               </div>
             </div>
           </div>
           <div
             id="Typo-horizontal-advance-center-field"
             class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
           >
             <div
               id="Typo-horizontal-advance-center-fill"
               class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
             ></div>
             <div
               id="Typo-horizontal-advance-center-bullet"
               class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
             ></div>
           </div>
         </div>
         <div class="sc-w-full sc-mt-3">
           <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
             <div class="sc-flex sc-gap-2 sc-items-center">
               <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                 Exit
               </p>
               <div
                 id="Typo-horizontal-advance-exit-reset"
                 class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
               >
                 <img
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                   width="10"
                   alt="reset"
                 />
               </div>
             </div>
             <div
               class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg-3f3f3f"
             >
               <p
                 id="Typo-horizontal-advance-exit-count"
                 class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
               >
                 0px
               </p>
               <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                 <span
                   id="Typo-horizontal-advance-exit-increase"
                   class="sc-arrow-placeholder"
                 ></span>
                 <span
                   id="Typo-horizontal-advance-exit-decrease"
                   class="sc-arrow-placeholder sc-rotate-180"
                 ></span>
               </div>
             </div>
           </div>
           <div
             id="Typo-horizontal-advance-exit-field"
             class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
           >
             <div
               id="Typo-horizontal-advance-exit-fill"
               class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
             ></div>
             <div
               id="Typo-horizontal-advance-exit-bullet"
               class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
             ></div>
           </div>
         </div>
 
         <div class="sc-mt-6 sc-z-99999">
           <p class="sc-universal sc-roboto sc-font-size-12">Effect Animation</p>
 
           <div
             class="sc-flex sc-mt-2 sc-relative sc-items-center sc-z-99999"
             id="Typo-horizontal-effect-animation-dropdown-container"
           >
             <div
               class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-full"
             >
               <p
                 id="Typo-horizontal-effect-animation-value"
                 class="sc-universal sc-roboto sc-font-size-12"
               >
                 None
               </p>
             </div>
 
             <div
               id="Typo-horizontal-effect-animation-type-arrow"
               class="sc-bg-color-2c2c2c sc-cursor-pointer sc-px-2_5 sc-py-0_5px"
             >
               <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                 <span class="sc-arrow-placeholder"></span>
                 <span class="sc-arrow-placeholder sc-rotate-180"></span>
               </div>
             </div>
 
             <div
               id="Typo-horizontal-effect-animation-type-list"
               class="sc-absolute sc-rounded-4px sc-max-h-140px sc-hidden sc-border sc-border-solid sc-scrollBar sc-border-EF7C2F sc-left-0 sc-top-4px sc-z-99999"
             >
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-bg-colo-EF7C2F-hover sc-cursor-pointer"
                 data-value="none"
               >
                 None
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="linear"
               >
                 Linear
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="ease-in"
               >
                 Ease In
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="ease-out"
               >
                 Ease Out
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="ease-in-out"
               >
                 Ease In Out
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="power1.out"
               >
                 Power1
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="power2.out"
               >
                 Power2
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="power3.out"
               >
                 Power3
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="power4.out"
               >
                 Power4
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="expo.out"
               >
                 Expo
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="elastic.out"
               >
                 Elastic
               </div>
 
               <div
                 class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                 data-value="bounce.out"
               >
                 Bounce
               </div>
             </div>
           </div>
         </div>
       </div>
    `;
}
