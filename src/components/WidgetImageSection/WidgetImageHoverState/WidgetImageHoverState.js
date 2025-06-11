export function WidgetImageHoverState() {
  return `
    <div id="image-hover-state" class="sc-huidden">
      <div class="sc-flex sc-mt-2 sc-px-2">
        <div id="hover-borderButton"
          class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-2 sc-w-full sc-rounded-4pxx">
          <h5 class="sc-roboto sc-font-size-14 sc-universal sc-font-thin">Border</h5>
          <img id="hover-button-shadow-arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
            class="sc-rotate-180" alt="">
        </div>
      </div>
  
      <div id="hover-borderSection" class="sc-px-2 sc-mt-3">
        <div class="sc-flex sc-items-center sc-justify-between">
          <p class="sc-roboto sc-font-thin sc-text-sm sc-text-gray-300">Border Style</p>
          <div class="sc-flex sc-gap-2">
            <div id="hover-borderStyleSolid" class="sc-bg-454545 sc-px-2 sc-rounded-4px sc-cursor-pointer">Solid</div>
            <div id="hover-borderStyleDashed" class="sc-bg-454545 sc-px-2 sc-rounded-4px sc-cursor-pointer">Dashed</div>
            <div id="hover-borderStyleDotted" class="sc-bg-454545 sc-px-2 sc-rounded-4px sc-cursor-pointer">Dotted</div>
          </div>
        </div>
  
        <div class="sc-mt-3">
          <p class="sc-roboto sc-font-thin sc-text-sm sc-text-gray-300">Border Width</p>
          <div id="hover-borderWidthSlider" class="sc-h-2 sc-bg-F6F6F6 sc-rounded-15px sc-relative">
            <div id="hover-borderWidthFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
            <div id="hover-borderWidthBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"></div>
          </div>
        </div>
  
        <div class="sc-mt-3">
          <p class="sc-roboto sc-font-thin sc-text-sm sc-text-gray-300">Border Radius</p>
          <div id="hover-borderRadiusSlider" class="sc-h-2 sc-bg-F6F6F6 sc-rounded-15px sc-relative">
            <div id="hover-borderRadiusFill" class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"></div>
            <div id="hover-borderRadiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"></div>
          </div>
        </div>
      </div>
  
      <div class="sc-px-2 sc-mt-4">
        <div id="hover-shadowButton"
          class="sc-bg-3f3f3f sc-flex sc-justify-between sc-items-center sc-py-2 sc-px-2 sc-rounded-4px sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer">
          <h5 class="sc-roboto sc-font-size-14 sc-font-thin">Shadow</h5>
          <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="">
        </div>
      </div>
  
      <div id="hover-shadowSection" class="sc-hidden sc-px-2 sc-mt-3">
        <div class="sc-mt-3">
          <p class="sc-roboto sc-font-thin sc-text-sm sc-text-gray-300">X Axis</p>
          <div id="hover-shadowXSlider" class="sc-h-2 sc-bg-F6F6F6 sc-rounded-15px sc-relative">
            <div class="hover-shadow-bullet sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"></div>
          </div>
        </div>
  
        <div class="sc-mt-3">
          <p class="sc-roboto sc-font-thin sc-text-sm sc-text-gray-300">Y Axis</p>
          <div id="hover-shadowYSlider" class="sc-h-2 sc-bg-F6F6F6 sc-rounded-15px sc-relative">
            <div class="hover-shadow-bullet sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"></div>
          </div>
        </div>
  
        <div class="sc-mt-3">
          <p class="sc-roboto sc-font-thin sc-text-sm sc-text-gray-300">Blur</p>
          <div id="hover-shadowBlurSlider" class="sc-h-2 sc-bg-F6F6F6 sc-rounded-15px sc-relative">
            <div class="hover-shadow-bullet sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"></div>
          </div>
        </div>
  
        <div class="sc-mt-3">
          <p class="sc-roboto sc-font-thin sc-text-sm sc-text-gray-300">Spread</p>
          <div id="hover-shadowSpreadSlider" class="sc-h-2 sc-bg-F6F6F6 sc-rounded-15px sc-relative">
            <div class="hover-shadow-bullet sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"></div>
          </div>
        </div>
      </div>
  
      <div class="sc-mt-6 sc-px-2">
        <div class="sc-flex sc-justify-between sc-gap-2 sc-items-center">
          <p style="font-size: 16px;" class="sc-roboto sc-font-size-14 sc-universal sc-font-thin">Image Masking</p>
          <div class="sc-flex sc-cursor-pointer sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg sc-bg-454545 sc-gradiant-border">
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg" width="10" alt="reset">
          </div>
        </div>
        <div class="sc-mt-3 sc-grid sc-grid-cols-12 sc-gap-2">
          ${[...Array(16)]
            .map((_, i) => {
              const num = i + 1;
              return `
              <div class="sc-col-span-3 sc-bg-3f3f3f sc-rounded-4px sc-cursor-pointer sc-border-EF7C2F-hover sc-p-4 sc-flex sc-items-center sc-justify-center">
                <img data-mask="https://fatin-webefo.github.io/squareCraft-plugin/public/imageMask%20(${num}).svg"
                     class="sc-image-mask-thumb sc-w-full sc-h-full sc-object-contain"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/imageMask%20(${num}).svg"
                     alt="Mask ${num}" />
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    </div>
    `;
}
