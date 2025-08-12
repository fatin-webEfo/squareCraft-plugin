export function TypoAdvanceStructureSection() {
  return `
 <div  class="sc-p-2">
<div
  id="Typo-advance-structure"
  class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
>
  <div class="sc-flex sc-gap-2 sc-items-center">
    <img
      loading="lazy"
      src="https://fatin-webefo.github.io/squareCraft-plugin/public/structure.svg"
      width="19px"
      alt=""
    />
    <p class="sc-universal sc-roboto">Structure</p>
  </div>
  <img
    src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
    alt="sc-rotate-180"
    class="sc-rotate-180"
  />
</div>
<div id="Typo-advance-structure-section">
  <div class="sc-mt-2">
    <p
      class="sc-universal sc-roboto sc-text-gray-300 sc-text-sm sc-font-thin"
    >
      Adjust typo margin and padding with individual or global controls.
    </p>
  </div>

  <div class="sc-flex sc-mt-2 sc-items-center sc-justify-between">
    <div class="sc-flex sc-gap-2 sc-items-center">
      <div class="toggle-container">
        <div class="toggle-bullet"></div>
      </div>
      <p class="sc-font-size-12 sc-universal sc-roboto">Enable</p>
    </div>
    <div id="Typo-advance-structure-reset-all"
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
  <div class="sc-h-1px sc-mt-2 sc-bg-3f3f3f"></div>
  <div  class="">
    <div
      class="sc-mt-8 sc-flex-col sc-pb-30px sc-items-center sc-justify-center sc-gap-2"
    >
      <div class="sc-relative sc-mt-2 sc-items-center sc-flex-col">
        <input  id="Typo-structure-margin-top-count"
          class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
          style="bottom: 30px"
        >
         
        <div class="Typo-structure-margin-top-box">
          <div
            id="Typo-structure-margin-top-fill"
            class="Typo-structure-margin-top-fill"
          ></div>
        </div>
      </div>
      <div class="sc-flex sc-items-center sc-justify-center sc-gap-2">
        <div class="sc-flex sc-items-center sc-relative">
          <input  id="Typo-structure-margin-left-count"
          class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
            style="right: 30px"
          >
           
          <div class="Typo-structure-margin-left-box">
            <div
              id="Typo-structure-margin-left-fill"
              class="Typo-structure-margin-left-fill"
            ></div>
          </div>
        </div>

        <div class="Typo-structure-allside-box sc-relative sc-bg-454545">
          <img
            src="https://fatin-webefo.github.io/squareCraft-plugin/public/structure-all-select.svg"
            class="sc-cursor-pointer"
            alt=""
          />
          <input  id="Typo-structure-padding-right-count"
            class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
            style="right: 18px"
          >
          <input id="Typo-structure-padding-top-count"
            class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
            style="top: 18px"
          >
          <input id="Typo-structure-padding-left-count"
           class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
            style="left: 18px"
          >
          <input id="Typo-structure-padding-bottom-count"
           class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
            style="bottom: 18px"
          >

          <div
            id="Typo-structure-padding-left"
            class="Typo-structure-padding-left sc-absolute sc-cursor-pointer"
            style="left: 2px"
          ></div>
          <div
            id="Typo-structure-padding-right"
            class="Typo-structure-padding-right sc-absolute sc-cursor-pointer"
            style="right: 2px"
          ></div>
          <div
            id="Typo-structure-padding-top"
            class="Typo-structure-padding-top sc-absolute sc-cursor-pointer"
            style="top: 2px"
          ></div>
          <div
            id="Typo-structure-padding-bottom"
            class="Typo-structure-padding-bottom sc-absolute sc-cursor-pointer"
            style="bottom: 2px"
          ></div>
        </div>

        <div class="sc-flex sc-items-center sc-justify-center sc-relative">
          <div class="Typo-structure-margin-right-box">
            <div
              id="Typo-structure-margin-right-fill"
              class="Typo-structure-margin-right-fill"
            ></div>
          </div>
         <div class="sc-flex sc-items-center"> 
          <div>
            <input id="Typo-structure-margin-right-count"
            class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
            style="left: 30px"
            
            >
          </div>

         </div>
           
        </div>
      </div>
      <div class="sc-relative sc-items-center sc-flex-col">
        <div class="Typo-structure-margin-bottom-box">
          <div
            id="Typo-structure-margin-bottom-fill"
            class="Typo-structure-margin-bottom-fill"
          ></div>
        </div>
        <input  id="Typo-structure-margin-bottom-count"
          class="sc-universal sc-input sc-w-30px  sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute sc-text-center"
            value="0"
          style="top: 30px"
          >
      </div>
    </div>

    <div
      class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"
    ></div>
    <div class="sc-mt-4">
      <div>
        <div class="sc-flex sc-items-center sc-justify-between">
          <p class="sc-universal sc-text-md">Margin Gap</p>
          <div class="sc-flex sc-items-center sc-gap-3">
            <div id="Typo-advance-margin-reset"
              class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                width="10"
                alt="reset"
              />
            </div>
            <div class="sc-flex sc-z-99999 sc-relative sc-items-center">
              <div
                class="sc-bg-3f3f3f sc-relative sc-py-1px sc-rounded-l sc-px-2 sc-w-25px"
              >
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
      <div id="Typo-advance-marginTop">
        <div
          class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
        >
          <div id="Typo-advance-margin-gap-fill"
            class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            style="width: 0%"
          ></div>
          <div id="Typo-advance-margin-gap-bullet"
            class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            style="left: 0%"
          ></div>
        </div>
        <div class="sc-grid sc-grid-cols-12 sc-mt-2">
          <div></div>
          <div
            style="padding: 2px 0px"
            class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-font-size-12 sc-font-thin sc-border sc-border-solid sc-border-3f3f3f sc-justify-center sc-px-1 sc-rounded-4px"
          >
            <div
              id="Typo-advance-margin-gap-all"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-bg-454545 sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg"
                loading="lazy"
                alt="all-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">All</p>
            </div>
            <div
              id="Typo-advance-margin-gap-top"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg"
                loading="lazy"
                alt="top-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Top</p>
            </div>
            <div
              id="Typo-advance-margin-gap-bottom"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg"
                loading="lazy"
                alt="bottom-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Bottom</p>
            </div>
            <div
              id="Typo-advance-margin-gap-left"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg"
                loading="lazy"
                alt="left-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Left</p>
            </div>
            <div
              id="Typo-advance-margin-gap-right"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg"
                loading="lazy"
                alt="right-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Right</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"
    ></div>

    <div class="sc-mt-4">
      <div>
        <div class="sc-flex sc-items-center sc-justify-between">
          <p class="sc-universal sc-text-md">Padding Gap</p>
          <div class="sc-flex sc-items-center sc-gap-3">
            <div id="Typo-advance-padding-reset"
              class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
                width="10"
                alt="reset"
              />
            </div>
            <div class="sc-flex sc-z-99999 sc-relative sc-items-center">
              <div
                class="sc-bg-3f3f3f sc-relative sc-py-1px sc-rounded-l sc-px-2 sc-w-25px"
              >
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
      <div id="Typo-advance-paddingTop">
        <div
          class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
        >
          <div id="Typo-advance-padding-gap-fill"
            class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            style="width: 0%"
          ></div>
          <div id="Typo-advance-padding-gap-bullet"
            class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            style="left: 0%"
          ></div>
        </div>
        <div class="sc-grid sc-grid-cols-12 sc-mt-2">
          <div></div>
          <div
            style="padding: 2px 0px"
            class="sc-bg-3f3f3f sc-flex sc-col-span-11 sc-font-size-12 sc-font-thin sc-border sc-border-solid sc-border-3f3f3f sc-justify-center sc-px-1 sc-rounded-4px"
          >
            <div
              id="Typo-advance-padding-gap-all"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-bg-454545 sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/all.svg"
                loading="lazy"
                alt="all-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">All</p>
            </div>
            <div
              id="Typo-advance-padding-gap-top"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/top.svg"
                loading="lazy"
                alt="top-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Top</p>
            </div>
            <div
              id="Typo-advance-padding-gap-bottom"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/bottom.svg"
                loading="lazy"
                alt="bottom-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Bottom</p>
            </div>
            <div
              id="Typo-advance-padding-gap-left"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/left.svg"
                loading="lazy"
                alt="left-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Left</p>
            </div>
            <div
              id="Typo-advance-padding-gap-right"
              class="sc-flex sc-px-1_5 sc-justify-center sc-w-full sc-cursor-pointer sc-py-4px sc-rounded-4px sc-items-center sc-gap-1"
            >
              <img
                src="https://fatin-webefo.github.io/squareCraft-plugin/public/right.svg"
                loading="lazy"
                alt="right-border"
              />
              <p class="sc-font-thin sc-roboto sc-universal">Right</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

    `;
}
