export function WidgetButtonAdvanceSection(){


    return `
   <div id="button-advance-section">
        <div class="sc-flex sc-p-2 sc-items-center sc-justify-between">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <img
              loading="lazy"
              src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance.png"
              width="19px"
              alt=""
            />
            <p class="sc-universal sc-roboto">Scroll Effects</p>
          </div>
          <img
            src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
            alt="sc-rotate-180"
          />
        </div>
        <div class="sc-h-1px sc-bg-3f3f3f"></div>
        <div class="sc-flex sc-px-2 sc-mt-2 sc-items-center sc-justify-between">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <div class="toggle-container" id="toggleSwitch">
              <div class="toggle-bullet"></div>
            </div>
            <p id="toggleText" class="sc-font-size-12 sc-universal sc-roboto">Enable</p>
          </div>
          <div
            class="sc-flex sc-gradiant-border sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-px-2 sc-py-4px sc-bg sc-bg-454545"
          >
            <p
              class="sc-font-thin sc-universal sc-font-size-12 sc-font-size-11 sc-roboto"
            >
              Reset
            </p>
            <img
              src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
              alt="reset"
            />
          </div>
        </div>
        <div class="sc-px-2 sc-mt-2 sc-flex-col sc-gap-2">
          <div class="sc-flex ">
             <div
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <div class="sc-flex sc-items-center sc-gap-8px">
                 <img
                   width="13px"
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-vertical.svg"
                   loading="lazy"
                   alt=""
                 />
                 <p class="sc-roboto sc-font-size-14 sc-universal">Vertical</p>
               </div>
               <img
                 id="button-font-arrow"
                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                 class=""
                 alt=""
               />
             </div>

             
           </div>
          <div class="sc-bg-454545 sc-p-2 sc-rounded-4px"> <div class="sc-w-full">
            <div class=" sc-flex sc-w-full sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300"> Entry
                  </p>
                  <div id="icon-size-reset"
                     class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                        alt="reset">
                  </div>
               </div>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p id="buttoniconSizeradiusCount" class="sc-font-thin sc-roboto sc-universal sc-font-size-11">0px</p>
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                      <span id="buttoniconSizeIncrease" class="sc-arrow-placeholder"></span>
                      <span id="buttoniconSizeDecrease" class="sc-arrow-placeholder sc-rotate-180"></span>
                  </div>
               </div>
            </div>
            <div id="buttonIconSizeradiusField" class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6">
               <div id="buttonIconSizeradiusFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
               <div id="buttonIconSizeradiusBullet"
                  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
               </div>
            </div>
           </div>
           <div class="sc-w-full sc-mt-3">
            <div class=" sc-flex sc-w-full sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300"> Center
                  </p>
                  <div id="icon-size-reset"
                     class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                        alt="reset">
                  </div>
               </div>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p id="buttoniconSizeradiusCount" class="sc-font-thin sc-roboto sc-universal sc-font-size-11">0px</p>
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                      <span id="buttoniconSizeIncrease" class="sc-arrow-placeholder"></span>
                      <span id="buttoniconSizeDecrease" class="sc-arrow-placeholder sc-rotate-180"></span>
                  </div>
               </div>
            </div>
            <div id="buttonIconSizeradiusField" class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6">
               <div id="buttonIconSizeradiusFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
               <div id="buttonIconSizeradiusBullet"
                  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
               </div>
            </div>
           </div>
           <div class="sc-w-full sc-mt-3">
            <div class=" sc-flex sc-w-full sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300"> Exit
                  </p>
                  <div id="icon-size-reset"
                     class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                        alt="reset">
                  </div>
               </div>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p id="buttoniconSizeradiusCount" class="sc-font-thin sc-roboto sc-universal sc-font-size-11">0px</p>
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                      <span id="buttoniconSizeIncrease" class="sc-arrow-placeholder"></span>
                      <span id="buttoniconSizeDecrease" class="sc-arrow-placeholder sc-rotate-180"></span>
                  </div>
               </div>
            </div>
            <div id="buttonIconSizeradiusField" class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6">
               <div id="buttonIconSizeradiusFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
               <div id="buttonIconSizeradiusBullet"
                  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
               </div>
            </div>
           </div>
           <div class="sc-w-full sc-mt-3">
            <div class=" sc-flex sc-w-full sc-items-center sc-justify-between">
               <div class="sc-flex sc-gap-2 sc-items-center">
                  <p class="sc-roboto sc-font-thin sc-universal  sc-font-size-12 sc-font-thin sc-text-gray-300"> Effect Speed
                  </p>
                  <div id="icon-size-reset"
                     class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5  sc-bg sc-bg-454545">

                     <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10"
                        alt="reset">
                  </div>
               </div>
               <div
                  class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-2 sc-px-2 sc-py-0_5 sc-bg sc-bg-454545">
                  <p id="buttoniconSizeradiusCount" class="sc-font-thin sc-roboto sc-universal sc-font-size-11">0px</p>
                  <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                      <span id="buttoniconSizeIncrease" class="sc-arrow-placeholder"></span>
                      <span id="buttoniconSizeDecrease" class="sc-arrow-placeholder sc-rotate-180"></span>
                  </div>
               </div>
            </div>
            <div id="buttonIconSizeradiusField" class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6">
               <div id="buttonIconSizeradiusFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
               <div id="buttonIconSizeradiusBullet"
                  class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half">
               </div>
            </div>
           </div></div>
          <div class="sc-flex ">
             <div
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <div class="sc-flex sc-items-center sc-gap-8px">
                 <img
                   width="18px"
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-horizontal.svg"
                   loading="lazy"
                   alt=""
                 />
                 <p class="sc-roboto sc-font-size-14 sc-universal">Horizontal</p>
               </div>
               <img
                 id="button-font-arrow"
                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                 class="sc-rotate-180"
                 alt=""
               />
             </div>
           </div>
          <div class="sc-flex ">
             <div
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <div class="sc-flex sc-items-center sc-gap-8px">
                 <img
                   width="15px"
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-opacity.png"
                   loading="lazy"
                   alt=""
                 />
                 <p class="sc-roboto sc-font-size-14 sc-universal">Opacity</p>
               </div>
               <img
                 id="button-font-arrow"
                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                 class="sc-rotate-180"
                 alt=""
               />
             </div>
           </div>
          <div class="sc-flex ">
             <div
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <div class="sc-flex sc-items-center sc-gap-8px">
                 <img
                   width="17px"
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-scale.png"
                   loading="lazy"
                   alt=""
                 />
                 <p class="sc-roboto sc-font-size-14 sc-universal">Scale</p>
               </div>
               <img
                 id="button-font-arrow"
                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                 class="sc-rotate-180"
                 alt=""
               />
             </div>
           </div>
          <div class="sc-flex ">
             <div
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <div class="sc-flex sc-items-center sc-gap-8px">
                 <img
                   width="17px"
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-rotate.png"
                   loading="lazy"
                   alt=""
                 />
                 <p class="sc-roboto sc-font-size-14 sc-universal">Rotate</p>
               </div>
               <img
                 id="button-font-arrow"
                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                 class="sc-rotate-180"
                 alt=""
               />
             </div>
           </div>
          <div class="sc-flex ">
             <div
               class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
               <div class="sc-flex sc-items-center sc-gap-8px">
                 <img
                   width="15px"
                   src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-blur.png"
                   loading="lazy"
                   alt=""
                 />
                 <p class="sc-roboto sc-font-size-14 sc-universal">Blur</p>
               </div>
               <img
                 id="button-font-arrow"
                 src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                 class="sc-rotate-180"
                 alt=""
               />
             </div>
           </div>
        </div>

        

        <div class="sc-mt-4"></div>
      </div>
    `;
}