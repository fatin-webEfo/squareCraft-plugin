export function ToolbarIconHtml(section) {
  return `
    <div id="sc-grabbing" class="sc-cursor-grabbing sc-w-full">
      <div class="sc-flex sc-roboto sc-universal sc-items-center sc-justify-between">
        <img class="sc-cursor-grabbing sc-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
      </div>
      <div class="sc-mt-4">
        <p class="sc-font-size-12 sc-universal sc-roboto sc-font-light">
          Powerful Visual Editor for Customizing Squarespace Sections in Real-Time.
        </p>
      </div>
    </div>
    <div class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"></div>
    <div class="sc-mt-6 sc-h-12 sc-roboto sc-flex sc-items-center sc-universal">
      <p class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Design</p>
      <p class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Advanced</p>
      <p class="sc-font-size-12 sc-px-4 sc-cursor-pointer tabHeader">Presets</p>
    </div>
    <div class="sc-border-t sc-border-solid sc-relative sc-border-color-494949 sc-w-full">
      <div class="sc-absolute sc-top-0 sc-left-0 sc-bg-color-EF7C2F sc-w-16 sc-h-1px sc-tab-active-indicator"></div>
    </div>
    <div class="sc-rounded-4px sc-h-350 sc-scrollBar sc-mt-6 sc-border sc-border-solid sc-border-EF7C2F sc-bg-color-3d3d3d">
      <div class="sc-flex ">
           <div class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
                
                  <p class="sc-roboto sc-font-size-14 sc-universal ">Structure</p>
                  <img id="button-font-arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="" alt="">
            </div>
        </div>
      <div class="sc-flex ">
           <div class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
                
                  <p class="sc-roboto sc-font-size-14 sc-universal ">Background</p>
                  <img id="button-font-arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="" alt="">
            </div>
        </div>
      <div class="sc-flex ">
           <div class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
                
                  <p class="sc-roboto sc-font-size-14 sc-universal ">Border</p>
                  <img id="button-font-arrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                     class="" alt="">
            </div>
        </div>
    </div>
    <div class="sc-mt-3">
      <div class="sc-flex sc-items-center sc-justify-between sc-gap-2">
        <div class="sc-cursor-pointer sc-roboto sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-font-size-12 sc-py-4px sc-rounded-4px sc-text-color-white sc-justify-center">
          Publish
        </div>
        <div class="sc-cursor-pointer sc-roboto sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-font-size-12 sc-py-4px sc-rounded-4px sc-items-center sc-justify-center">
          Reset
        </div>
      </div>
    </div>
  `;
}
