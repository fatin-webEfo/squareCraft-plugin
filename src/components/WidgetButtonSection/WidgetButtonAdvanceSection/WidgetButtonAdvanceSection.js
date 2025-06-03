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
              <p class="sc-universal sc-roboto">Advanced</p>
            </div>
            <img
              src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
              alt=""
            />
          </div>
          <div class="sc-h-1px sc-bg-3f3f3f"></div>
          <div class="sc-flex sc-mt-2 sc-px-2 sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <div class="toggle-container" id="toggleSwitch">
                <div class="toggle-bullet"></div>
              </div>
              <p id="toggleText" class="sc-font-size-12 sc-roboto sc-universal">Enable</p>
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
          <div class="sc-flex sc-px-2 sc-mt-2">
            <div
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px"
            >
              <div class="sc-flex  sc-gap-8px">
                <img
                  width="15px"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/button-advance/button-advance-effects-tab-head.svg"
                  loading="lazy"
                  alt=""
                />
                <p class="sc-roboto sc-font-size-14 sc-universal">Effects</p>
              </div>
              <img
                id="button-font-arrow"
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                class=""
                alt=""
              />
            </div>
          </div>

          <div class="sc-mt-4"></div>
        </div>
    `;
}