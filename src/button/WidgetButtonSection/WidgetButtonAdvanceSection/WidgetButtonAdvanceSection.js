export function WidgetButtonAdvanceSection(){


    return `
  <div id="button-advance-section">
  <div
    class="sc-flex sc-cursor-pointer sc-p-2 sc-items-center sc-justify-between"
  >
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
      <div class="toggle-container">
        <div class="toggle-bullet"></div>
      </div>
      <p class="sc-font-size-12 sc-universal sc-roboto">Enable</p>
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
    <div class="sc-flex">
      <div
        id="button-advance-vertical"
        class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px"
      >
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
          id="button-advance-vertical-arrow"
          src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
          class=""
          alt=""
        />
      </div>
    </div>

    <div
      id="button-advance-vertical-section"
      class="sc-bg-454545 sc-border sc-border-solid sc-border-EF7C2F sc-p-2 sc-rounded-4px"
    >
      <div class="sc-flex sc-flex-col sc-gap-2">
        <div class="sc-flex sc-gap-2 sc-items-center">
          <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
            Custom Timeline
          </p>
          <div
            id="vertical-custom-timeline-reset"
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
            id="vertical-timeline-start-fill"
            class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            style="left: 0%; width: 0%"
          ></div>
          <div
            id="vertical-timeline-end-fill"
            class="sc-absolute sc-bg-F6B67B sc-h-2 sc-rounded-r-full"
            style="right: 0; transform: scaleX(0); transform-origin: right"
          ></div>

          <div
            id="vertical-timeline-start-bullet"
            class="sc-absolute sc-w-3 sc-h-3 sc-bg-color-EF7C2F sc-rounded-full sc-cursor-pointer sc-top-half"
            style="left: 0%"
          ></div>
          <div
            id="vertical-timeline-end-bullet"
            class="sc-absolute sc-w-3 sc-h-3 sc-bg-F6B67B sc-rounded-full sc-cursor-pointer sc-top-half"
            style="right: 0%"
          ></div>
        </div>

        <div
          class="sc-flex sc-mt-1 sc-justify-between sc-font-size-12 sc-text-gray-300"
        >
          <p class="sc-universal sc-roboto">
            Start <span id="vertical-timelineStartValue">0%</span>
          </p>
          <p class="sc-universal sc-roboto">
            End <span id="vertical-timelineEndValue">0%</span>
          </p>
        </div>
        <div id="vertical-custom-timeline-border" class="sc-mt-1 custom-timeline-border">
          <div id="vertical-custom-timeline-arrow" class="sc-absolute sc-top-6px"></div>
        </div>
      </div>

      <div class="sc-w-full sc-mt-25px">
        <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
              Entry
            </p>
            <div
              id="vertical-button-advance-entry-reset"
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
              id="vertical-button-advance-entry-count"
              class="sc-font-thin sc-roboto sc-universal sc-font-size-11">
              -100%
            </p>
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
              <span
                id="vertical-button-advance-entry-increase"
                class="sc-arrow-placeholder"
              ></span>
              <span
                id="vertical-button-advance-entry-decrease"
                class="sc-arrow-placeholder sc-rotate-180"
              ></span>
            </div>
          </div>
        </div>
        <div
          id="vertical-button-advance-entry-Field"
          class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
        >
          <div
            id="vertical-button-advance-entry-Fill"
            class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
          ></div> 
          <div
            id="vertical-button-advance-entry-bullet"
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
              id="vertical-button-advance-center-reset"
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
              id="vertical-button-advance-center-Count"
              class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
            >
              -100%
            </p>
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
              <span
                id="vertical-button-advance-center-increase"
                class="sc-arrow-placeholder"
              ></span>
              <span
                id="vertical-button-advance-center-decrease"
                class="sc-arrow-placeholder sc-rotate-180"
              ></span>
            </div>
          </div>
        </div>
        <div
          id="vertical-button-advance-center-field"
          class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
        >
          <div
            id="vertical-button-advance-center-Fill"
            class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
          ></div>
          <div
            id="vertical-button-advance-center-bullet"
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
              id="vertical-button-advance-exit-reset"
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
              id="vertical-button-advance-exit-Count"
              class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
            >
              -100%
            </p>
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
              <span
                id="vertical-button-advance-exit-increase"
                class="sc-arrow-placeholder"
              ></span>
              <span
                id="vertical-button-advance-exit-decrease"
                class="sc-arrow-placeholder sc-rotate-180"
              ></span>
            </div>
          </div>
        </div>
        <div
          id="vertical-button-advance-exit-field"
          class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
        >
          <div
            id="vertical-button-advance-exit-Fill"
            class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
          ></div>
          <div
            id="vertical-button-advance-exit-bullet"
            class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
          ></div>
        </div>
      </div>

      <div class="sc-mt-6 sc-z-[99999]">
        <p class="sc-universal sc-roboto sc-font-size-12">Effect Animation</p>

        <div
          class="sc-flex sc-mt-2 sc-relative sc-items-center sc-z-[99999]"
          id="vertical-effect-animation-dropdown-container"
        >
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-full"
          >
            <p
              id="vertical-effect-animation-value"
              class="sc-universal sc-roboto sc-font-size-12"
            >
              None
            </p>
          </div>

          <div
            id="vertical-effect-animation-type-arrow"
            class="sc-bg-color-2c2c2c sc-cursor-pointer sc-px-2_5 sc-py-0_5px"
          >
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>

          <div
            id="vertical-effect-animation-type-list"
            class="sc-absolute sc-rounded-4px sc-max-h-140px sc-hidden sc-border sc-border-solid sc-scrollBar sc-border-EF7C2F sc-left-0 sc-top-4px sc-z-[99999]"
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
    <div class="">
      <div
        id="button-advance-horizontal"
        class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px">
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
          id="button-advance-horizontal-arrow"
          src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
          class="sc-rotate-180"
          alt=""
        />
      </div>
      <div
        id="button-advance-horizontal-section"
        class="sc-bg-454545 sc-hidden sc-mt-2 sc-border sc-border-solid sc-border-EF7C2F sc-p-2 sc-rounded-4px"
      >
        <div class="sc-flex sc-flex-col sc-gap-2">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
              Custom Timeline
            </p>
            <div
              id="horizontal-custom-timeline-reset"
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
              id="horizontal-timeline-start-fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
              style="left: 0%; width: 0%"
            ></div>
            <div
              id="horizontal-timeline-end-fill"
              class="sc-absolute sc-bg-F6B67B sc-h-2 sc-rounded-r-full"
              style="right: 0%; width: 0%"
            ></div>

            <div
              id="horizontal-timeline-start-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-color-EF7C2F sc-rounded-full sc-cursor-pointer sc-top-half"
              style="left: 0%"
            ></div>
            <div
              id="horizontal-timeline-end-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-F6B67B sc-rounded-full sc-cursor-pointer sc-top-half"
              style="right: 0%"
            ></div>
          </div>

          <div
            class="sc-flex sc-mt-1 sc-justify-between sc-font-size-12 sc-text-gray-300"
          >
            <p class="sc-universal sc-roboto">
              Start <span id="horizontal-timelineStartValue">0%</span>
            </p>
            <p class="sc-universal sc-roboto">
              End <span id="horizontal-timelineEndValue">0%</span>
            </p>
          </div>
        </div>

        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Entry
              </p>
              <div
                id="horizontal-button-advance-entry-reset"
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
                id="horizontal-button-advance-entry-count"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="horizontal-button-advance-entry-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="horizontal-button-advance-entry-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="horizontal-button-advance-entry-Field"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="horizontal-button-advance-entry-Fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="horizontal-button-advance-entry-bullet"
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
                id="horizontal-button-advance-center-reset"
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
                id="horizontal-button-advance-center-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="horizontal-button-advance-center-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="horizontal-button-advance-center-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="horizontal-button-advance-center-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="horizontal-button-advance-center-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="horizontal-button-advance-center-radiusBullet"
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
                id="horizontal-button-advance-exit-reset"
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
                id="horizontal-button-advance-exit-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="horizontal-button-advance-exit-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="horizontal-button-advance-exit-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="horizontal-button-advance-exit-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="horizontal-button-advance-exit-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="horizontal-button-advance-exit-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>
        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Effect Speed
              </p>
              <div
                id="horizontal-button-advance-effectSpeed-reset"
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
                id="horizontal-button-advance-effectSpeed-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="horizontal-button-advance-effectSpeed-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="horizontal-button-advance-effectSpeed-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="horizontal-button-advance-effectSpeed-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="horizontal-button-advance-effectSpeed-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="horizontal-button-advance-effectSpeed-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>

        <div class="sc-mt-6 sc-z-[99999]">
          <p class="sc-universal sc-roboto sc-font-size-12">Effect Animation</p>
  
          <div
            class="sc-flex sc-mt-2 sc-relative sc-items-center sc-z-[99999]"
            id="horizontal-effect-animation-dropdown-container"
          >
            <div
              class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-full"
            >
              <p
                id="horizontal-effect-animation-value"
                class="sc-universal sc-roboto sc-font-size-12"
              >
                None
              </p>
            </div>
  
            <div
              id="horizontal-effect-animation-type-arrow"
              class="sc-bg-color-2c2c2c sc-cursor-pointer sc-px-2_5 sc-py-0_5px"
            >
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                <span class="sc-arrow-placeholder"></span>
                <span class="sc-arrow-placeholder sc-rotate-180"></span>
              </div>
            </div>
  
            <div
              id="horizontal-effect-animation-type-list"
              class="sc-absolute sc-rounded-4px sc-max-h-140px sc-hidden sc-border sc-border-solid sc-scrollBar sc-border-EF7C2F sc-left-0 sc-top-4px sc-z-[99999]"
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
    </div>
    <div class=" ">
      <div
        id="button-advance-opacity"
        class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
      >
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
          id="button-advance-opacity-arrow"
          src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
          class="sc-rotate-180"
          alt=""
        />
      </div>
      <div
        id="button-advance-opacity-section"
        class="sc-bg-454545 sc-hidden sc-mt-2 sc-border sc-border-solid sc-border-EF7C2F sc-p-2 sc-rounded-4px"
      >
        <div class="sc-flex sc-flex-col sc-gap-2">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
              Custom Timeline
            </p>
            <div
            id="opacity-custom-timeline-reset"
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
              id="opacity-timeline-start-fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
              style="left: 0%; width: 0%"
            ></div>
            <div
              id="opacity-timeline-end-fill"
              class="sc-absolute sc-bg-F6B67B sc-h-2 sc-rounded-r-full"
              style="right: 0%; width: 0%"
            ></div>

            <div
              id="opacity-timeline-start-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-color-EF7C2F sc-rounded-full sc-cursor-pointer sc-top-half"
              style="left: 0%"
            ></div>
            <div
              id="opacity-timeline-end-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-F6B67B sc-rounded-full sc-cursor-pointer sc-top-half"
              style="right: 0%"
            ></div>
          </div>

          <div
            class="sc-flex sc-mt-1 sc-justify-between sc-font-size-12 sc-text-gray-300"
          >
            <p class="sc-universal sc-roboto">
              Start <span id="opacity-timelineStartValue">0%</span>
            </p>
            <p class="sc-universal sc-roboto">
              End <span id="opacity-timelineEndValue">0%</span>
            </p>
          </div>
        </div>

        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Entry
              </p>
              <div
                id="opacity-button-advance-entry-reset"
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
                id="opacity-button-advance-entry-count"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="opacity-button-advance-entry-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="opacity-button-advance-entry-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="opacity-button-advance-entry-Field"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="opacity-button-advance-entry-Fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="opacity-button-advance-entry-bullet"
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
                id="opacity-button-advance-center-reset"
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
                id="opacity-button-advance-center-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="opacity-button-advance-center-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="opacity-button-advance-center-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="opacity-button-advance-center-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="opacity-button-advance-center-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="opacity-button-advance-center-radiusBullet"
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
                id="opacity-button-advance-exit-reset"
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
                id="opacity-button-advance-exit-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="opacity-button-advance-exit-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="opacity-button-advance-exit-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="opacity-button-advance-exit-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="opacity-button-advance-exit-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="opacity-button-advance-exit-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>
        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Effect Speed
              </p>
              <div
                id="opacity-button-advance-effectSpeed-reset"
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
                id="opacity-button-advance-effectSpeed-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="opacity-button-advance-effectSpeed-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="opacity-button-advance-effectSpeed-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="opacity-button-advance-effectSpeed-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="opacity-button-advance-effectSpeed-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="opacity-button-advance-effectSpeed-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>

        <div class="sc-mt-6 sc-z-[99999]">
          <p class="sc-universal sc-roboto sc-font-size-12">Effect Animation</p>
  
          <div
            class="sc-flex sc-mt-2 sc-relative sc-items-center sc-z-[99999]"
            id="opacity-effect-animation-dropdown-container"
          >
            <div
              class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-full"
            >
              <p
                id="opacity-effect-animation-value"
                class="sc-universal sc-roboto sc-font-size-12"
              >
                None
              </p>
            </div>
  
            <div
              id="opacity-effect-animation-type-arrow"
              class="sc-bg-color-2c2c2c sc-cursor-pointer sc-px-2_5 sc-py-0_5px"
            >
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                <span class="sc-arrow-placeholder"></span>
                <span class="sc-arrow-placeholder sc-rotate-180"></span>
              </div>
            </div>
  
            <div
              id="opacity-effect-animation-type-list"
              class="sc-absolute sc-rounded-4px sc-max-h-140px sc-hidden sc-border sc-border-solid sc-scrollBar sc-border-EF7C2F sc-left-0 sc-top-4px sc-z-[99999]"
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
    </div>
    <div class=" ">
      <div
        id="button-advance-scale"
        class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
      >
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
          id="button-advance-scale-arro"
          src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
          class="sc-rotate-180"
          alt=""
        />
      </div>
      <div
        id="button-advance-scale-section"
        class="sc-bg-454545 sc-hidden sc-mt-2 sc-border sc-border-solid sc-border-EF7C2F sc-p-2 sc-rounded-4px"
      >
        <div class="sc-flex sc-flex-col sc-gap-2">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
              Custom Timeline
            </p>
            <div
              id="scale-custom-timeline-reset"
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
              id="scale-timeline-start-fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
              style="left: 0%; width: 0%"
            ></div>
            <div
              id="scale-timeline-end-fill"
              class="sc-absolute sc-bg-F6B67B sc-h-2 sc-rounded-r-full"
              style="right: 0%; width: 0%"
            ></div>

            <div
              id="scale-timeline-start-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-color-EF7C2F sc-rounded-full sc-cursor-pointer sc-top-half"
              style="left: 0%"
            ></div>
            <div
              id="scale-timeline-end-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-F6B67B sc-rounded-full sc-cursor-pointer sc-top-half"
              style="right: 0%"
            ></div>
          </div>

          <div
            class="sc-flex sc-mt-1 sc-justify-between sc-font-size-12 sc-text-gray-300"
          >
            <p class="sc-universal sc-roboto">
              Start <span id="scale-timelineStartValue">0%</span>
            </p>
            <p class="sc-universal sc-roboto">
              End <span id="scale-timelineEndValue">0%</span>
            </p>
          </div>
        </div>

        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Entry
              </p>
              <div
                id="scale-button-advance-entry-reset"
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
                id="scale-button-advance-entry-count"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="scale-button-advance-entry-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="scale-button-advance-entry-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="scale-button-advance-entry-Field"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="scale-button-advance-entry-Fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="scale-button-advance-entry-bullet"
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
                id="scale-button-advance-center-reset"
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
                id="scale-button-advance-center-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="scale-button-advance-center-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="scale-button-advance-center-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="scale-button-advance-center-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="scale-button-advance-center-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="scale-button-advance-center-radiusBullet"
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
                id="scale-button-advance-exit-reset"
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
                id="scale-button-advance-exit-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="scale-button-advance-exit-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="scale-button-advance-exit-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="scale-button-advance-exit-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="scale-button-advance-exit-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="scale-button-advance-exit-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>
        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Effect Speed
              </p>
              <div
                id="scale-button-advance-effectSpeed-reset"
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
                id="scale-button-advance-effectSpeed-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="scale-button-advance-effectSpeed-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="scale-button-advance-effectSpeed-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="scale-button-advance-effectSpeed-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="scale-button-advance-effectSpeed-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="scale-button-advance-effectSpeed-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>

        <div class="sc-mt-6 sc-z-[99999]">
          <p class="sc-universal sc-roboto sc-font-size-12">Effect Animation</p>
  
          <div
            class="sc-flex sc-mt-2 sc-relative sc-items-center sc-z-[99999]"
            id="scale-effect-animation-dropdown-container"
          >
            <div
              class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-full"
            >
              <p
                id="scale-effect-animation-value"
                class="sc-universal sc-roboto sc-font-size-12"
              >
                None
              </p>
            </div>
  
            <div
              id="scale-effect-animation-type-arrow"
              class="sc-bg-color-2c2c2c sc-cursor-pointer sc-px-2_5 sc-py-0_5px"
            >
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                <span class="sc-arrow-placeholder"></span>
                <span class="sc-arrow-placeholder sc-rotate-180"></span>
              </div>
            </div>
  
            <div
              id="scale-effect-animation-type-list"
              class="sc-absolute sc-rounded-4px sc-max-h-140px sc-hidden sc-border sc-border-solid sc-scrollBar sc-border-EF7C2F sc-left-0 sc-top-4px sc-z-[99999]"
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
    </div>
    <div class="">
      <div
        id="button-advance-rotate"
        class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
      >
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
          id="button-advance-rotate-arrow"
          src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
          class="sc-rotate-180"
          alt=""
        />
      </div>
      <div
        id="button-advance-rotate-section"
        class="sc-bg-454545 sc-hidden sc-mt-2 sc-border sc-border-solid sc-border-EF7C2F sc-p-2 sc-rounded-4px"
      >
        <div class="sc-flex sc-flex-col sc-gap-2">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
              Custom Timeline
            </p>
            <div
              id="rotate-custom-timeline-reset"
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
              id="rotate-timeline-start-fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
              style="left: 0%; width: 0%"
            ></div>
            <div
              id="rotate-timeline-end-fill"
              class="sc-absolute sc-bg-F6B67B sc-h-2 sc-rounded-r-full"
              style="right: 0%; width: 0%"
            ></div>

            <div
              id="rotate-timeline-start-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-color-EF7C2F sc-rounded-full sc-cursor-pointer sc-top-half"
              style="left: 0%"
            ></div>
            <div
              id="rotate-timeline-end-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-F6B67B sc-rounded-full sc-cursor-pointer sc-top-half"
              style="right: 0%"
            ></div>
          </div>

          <div
            class="sc-flex sc-mt-1 sc-justify-between sc-font-size-12 sc-text-gray-300"
          >
            <p class="sc-universal sc-roboto">
              Start <span id="rotate-timelineStartValue">0%</span>
            </p>
            <p class="sc-universal sc-roboto">
              End <span id="rotate-timelineEndValue">0%</span>
            </p>
          </div>
        </div>

        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Entry
              </p>
              <div
                id="rotate-button-advance-entry-reset"
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
                id="rotate-button-advance-entry-count"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="rotate-button-advance-entry-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="rotate-button-advance-entry-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="rotate-button-advance-entry-Field"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="rotate-button-advance-entry-Fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="rotate-button-advance-entry-bullet"
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
                id="rotate-button-advance-center-reset"
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
                id="rotate-button-advance-center-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="rotate-button-advance-center-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="rotate-button-advance-center-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="rotate-button-advance-center-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="rotate-button-advance-center-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="rotate-button-advance-center-radiusBullet"
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
                id="rotate-button-advance-exit-reset"
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
                id="rotate-button-advance-exit-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="rotate-button-advance-exit-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="rotate-button-advance-exit-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="rotate-button-advance-exit-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="rotate-button-advance-exit-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="rotate-button-advance-exit-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>
        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Effect Speed
              </p>
              <div
                id="rotate-button-advance-effectSpeed-reset"
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
                id="rotate-button-advance-effectSpeed-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="rotate-button-advance-effectSpeed-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="rotate-button-advance-effectSpeed-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="rotate-button-advance-effectSpeed-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="rotate-button-advance-effectSpeed-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="rotate-button-advance-effectSpeed-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>

        <div class="sc-mt-6 sc-z-[99999]">
          <p class="sc-universal sc-roboto sc-font-size-12">Effect Animation</p>
  
          <div
            class="sc-flex sc-mt-2 sc-relative sc-items-center sc-z-[99999]"
            id="rotate-effect-animation-dropdown-container"
          >
            <div
              class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-full"
            >
              <p
                id="rotate-effect-animation-value"
                class="sc-universal sc-roboto sc-font-size-12"
              >
                None
              </p>
            </div>
  
            <div
              id="rotate-effect-animation-type-arrow"
              class="sc-bg-color-2c2c2c sc-cursor-pointer sc-px-2_5 sc-py-0_5px"
            >
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                <span class="sc-arrow-placeholder"></span>
                <span class="sc-arrow-placeholder sc-rotate-180"></span>
              </div>
            </div>
  
            <div
              id="rotate-effect-animation-type-list"
              class="sc-absolute sc-rounded-4px sc-max-h-140px sc-hidden sc-border sc-border-solid sc-scrollBar sc-border-EF7C2F sc-left-0 sc-top-4px sc-z-[99999]"
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
    </div>
    <div class="">
      <div
        id="button-advance-blur"
        class="sc-bg-3f3f3f sc-relative sc-z-9999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-rounded-4px"
      >
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
          id="button-advance-blur-arrow"
          src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
          class="sc-rotate-180"
          alt=""
        />
      </div>
      <div
        id="button-advance-blur-section"
        class="sc-bg-454545 sc-hidden sc-mt-2 sc-border sc-border-solid sc-border-EF7C2F sc-p-2 sc-rounded-4px"
      >
        <div class="sc-flex sc-flex-col sc-gap-2">
          <div class="sc-flex sc-gap-2 sc-items-center">
            <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
              Custom Timeline
            </p>
            <div
              id="blur-custom-timeline-reset"
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
              id="blur-timeline-start-fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
              style="left: 0%; width: 0%"
            ></div>
            <div
              id="blur-timeline-end-fill"
              class="sc-absolute sc-bg-F6B67B sc-h-2 sc-rounded-r-full"
              style="right: 0%; width: 0%"
            ></div>

            <div
              id="blur-timeline-start-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-color-EF7C2F sc-rounded-full sc-cursor-pointer sc-top-half"
              style="left: 0%"
            ></div>
            <div
              id="blur-timeline-end-bullet"
              class="sc-absolute sc-w-3 sc-h-3 sc-bg-F6B67B sc-rounded-full sc-cursor-pointer sc-top-half"
              style="right: 0%"
            ></div>
          </div>

          <div
            class="sc-flex sc-mt-1 sc-justify-between sc-font-size-12 sc-text-gray-300"
          >
            <p class="sc-universal sc-roboto">
              Start <span id="blur-timelineStartValue">0%</span>
            </p>
            <p class="sc-universal sc-roboto">
              End <span id="blur-timelineEndValue">0%</span>
            </p>
          </div>
        </div>

        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Entry
              </p>
              <div
                id="blur-button-advance-entry-reset"
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
                id="blur-button-advance-entry-count"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="blur-button-advance-entry-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="blur-button-advance-entry-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="blur-button-advance-entry-Field"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="blur-button-advance-entry-Fill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="blur-button-advance-entry-bullet"
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
                id="blur-button-advance-center-reset"
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
                id="blur-button-advance-center-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="blur-button-advance-center-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="blur-button-advance-center-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="blur-button-advance-center-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="blur-button-advance-center-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="blur-button-advance-center-radiusBullet"
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
                id="blur-button-advance-exit-reset"
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
                id="blur-button-advance-exit-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="blur-button-advance-exit-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="blur-button-advance-exit-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="blur-button-advance-exit-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="blur-button-advance-exit-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="blur-button-advance-exit-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>
        <div class="sc-w-full sc-mt-3">
          <div class="sc-flex sc-w-full sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
              <p class="sc-roboto sc-font-thin sc-universal sc-font-size-14">
                Effect Speed
              </p>
              <div
                id="blur-button-advance-effectSpeed-reset"
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
                id="blur-button-advance-effectSpeed-radiusCount"
                class="sc-font-thin sc-roboto sc-universal sc-font-size-11"
              >
                0px
              </p>
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-1">
                <span
                  id="blur-button-advance-effectSpeed-Increase"
                  class="sc-arrow-placeholder"
                ></span>
                <span
                  id="blur-button-advance-effectSpeed-Decrease"
                  class="sc-arrow-placeholder sc-rotate-180"
                ></span>
              </div>
            </div>
          </div>
          <div
            id="blur-button-advance-effectSpeed-radiusField"
            class="sc-rounded-15px sc-relative sc-mt-2 sc-w-full sc-h-2 sc-bg-F6F6F6"
          >
            <div
              id="blur-button-advance-effectSpeed-radiusFill"
              class="sc-absolute sc-bg-color-EF7C2F sc-h-2 sc-rounded-l-full"
            ></div>
            <div
              id="blur-button-advance-effectSpeed-radiusBullet"
              class="sc-absolute sc-bg-color-EF7C2F sc-w-3 sc-h-3 sc-rounded-full sc-cursor-pointer sc-top-half"
            ></div>
          </div>
        </div>

        <div class="sc-mt-6 sc-z-[99999]">
          <p class="sc-universal sc-roboto sc-font-size-12">Effect Animation</p>
  
          <div
            class="sc-flex sc-mt-2 sc-relative sc-items-center sc-z-[99999]"
            id="blur-effect-animation-dropdown-container">
            <div
              class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-full">
              <p
                id="blur-effect-animation-value"
                class="sc-universal sc-roboto sc-font-size-12">
                None
              </p>
            </div>
  
            <div
              id="blur-effect-animation-type-arrow"
              class="sc-bg-color-2c2c2c sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                <span class="sc-arrow-placeholder"></span>
                <span class="sc-arrow-placeholder sc-rotate-180"></span>
              </div>
            </div>
  
            <div
              id="blur-effect-animation-type-list"
              class="sc-absolute sc-rounded-4px sc-max-h-140px sc-hidden sc-border sc-border-solid sc-scrollBar sc-border-EF7C2F sc-left-0 sc-top-4px sc-z-[99999]">
              <div
                class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-bg-colo-EF7C2F-hover sc-cursor-pointer"
                data-value="none">
                None
              </div>
  
              <div
                class="sc-bg-3f3f3f sc-py-1 sc-font-size-12 sc-px-2 sc-w-16 sc-cursor-pointer sc-bg-colo-EF7C2F-hover"
                data-value="linear">
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
    </div>
  </div>

  <div
    class="sc-flex sc-p-2 sc-cursor-pointer sc-mt-2 sc-items-center sc-justify-between"
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
  <div class="sc-h-1px sc-bg-3f3f3f"></div>
  <div
    class="sc-mt-8 sc-flex-col sc-pb-30px sc-items-center sc-justify-center sc-gap-2"
  >
    <div class="sc-relative sc-mt-2 sc-items-center sc-flex-col">
      <p
        class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
        style="bottom: 30px"
      >
        0px
      </p>
      <div class="structure-top-box">
        <div class="structure-top-fill"></div>
      </div>
    </div>
    <div class="sc-flex sc-items-center sc-justify-center sc-gap-2">
      <div class="sc-flex sc-items-center sc-relative">
        <p
          class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
          style="right: 30px"
        >
          0px
        </p>
        <div class="structure-left-box">
          <div class="structure-left-fill"></div>
        </div>
      </div>
      <div class="structure-allside-box sc-relative sc-bg-454545">
        <img
          src="https://fatin-webefo.github.io/squareCraft-plugin/public/structure-all-select.svg"
          class="sc-cursor-pointer"
          alt=""
        />
        <p
          class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
          style="right: 18px"
        >
          0px
        </p>
        <p
          class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
          style="top: 18px"
        >
          0px
        </p>
        <p
          class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
          style="left: 18px"
        >
          10px
        </p>
        <p
          class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
          style="bottom: 18px"
        >
          10px
        </p>

        <div
          class="structure-all-side-left-bar sc-absolute"
          style="left: 2px"
        ></div>
        <div
          class="structure-all-side-right-bar sc-absolute"
          style="right: 2px"
        ></div>
        <div
          class="structure-all-side-top-bar sc-absolute"
          style="top: 2px"
        ></div>
        <div
          class="structure-all-side-bottom-bar sc-absolute"
          style="bottom: 2px"
        ></div>
      </div>

      <div class="sc-flex sc-items-center sc-justify-center sc-relative">
        <div class="structure-right-box">
          <div class="structure-right-fill"></div>
        </div>
        <p
          class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
          style="left: 30px"
        >
          10px
        </p>
      </div>
    </div>
    <div class="sc-relative sc-items-center sc-flex-col">
      <div class="structure-bottom-box">
        <div class="structure-bottom-fill"></div>
      </div>
      <p
        class="sc-universal sc-text-sm sc-text-gray-300 sc-font-thin sc-absolute"
        style="top: 30px"
      >
        0px
      </p>
    </div>
  </div>
  <div
    class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"
  ></div>
  <div class="sc-mt-4 sc-px-2">
    <div>
      <div class="sc-flex sc-items-center sc-justify-between">
        <p class="sc-universal sc-text-md">Margin Gap</p>
        <div class="sc-flex sc-items-center sc-gap-3">
          <div
            class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
          >
            <img
              src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
              width="10"
              alt="reset"
            />
          </div>
          <div class="sc-flex sc-z-[99999] sc-relative sc-items-center">
            <div
              class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-25px"
            >
              <p class="sc-universal sc-roboto sc-font-size-12">PX</p>
            </div>
            <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                <span class="sc-arrow-placeholder"></span>
                <span class="sc-arrow-placeholder sc-rotate-180"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sc-mt-4 sc-flex sc-items-center 2 sc-gap-3">
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Top
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Right
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Bottom
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Left
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="sc-mt-6 sc-roboto sc-border-t sc-border-t-dashed sc-border-color-494949 sc-w-full"
  ></div>

  <div class="sc-mt-4 sc-px-2">
    <div>
      <div class="sc-flex sc-items-center sc-justify-between">
        <p class="sc-universal sc-text-md">Padding Gap</p>
        <div class="sc-flex sc-items-center sc-gap-3">
          <div
            class="sc-flex sc-cursor-pointer sc-gradiant-border sc-items-center sc-rounded-15px sc-gap-1 sc-p-1_5 sc-bg-3f3f3f"
          >
            <img
              src="https://fatin-webefo.github.io/squareCraft-plugin/public/reset.svg"
              width="10"
              alt="reset"
            />
          </div>
          <div class="sc-flex sc-z-[99999] sc-relative sc-items-center">
            <div
              class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-2 sc-w-25px"
            >
              <p class="sc-universal sc-roboto sc-font-size-12">PX</p>
            </div>
            <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
              <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
                <span class="sc-arrow-placeholder"></span>
                <span class="sc-arrow-placeholder sc-rotate-180"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sc-mt-4 sc-flex sc-items-center sc-gap-3">
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Top
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Right
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Bottom
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="sc-universal sc-font-size-12 sc-font-light sc-text-gray-300">
          Left
        </p>
        <div class="sc-flex sc-mt-2 sc-z-[99999] sc-relative sc-items-center">
          <div
            class="sc-bg-3f3f3f sc-relative sc-py-1 sc-rounded-l sc-px-1 sc-w-25px"
          >
            <p class="sc-universal sc-roboto sc-font-size-12 sc-font-light">
              10 px
            </p>
          </div>
          <div class="sc-bg-454545 sc-cursor-pointer sc-px-2_5 sc-py-0_5px">
            <div class="sc-flex sc-flex-col sc-items-center sc-gap-2">
              <span class="sc-arrow-placeholder"></span>
              <span class="sc-arrow-placeholder sc-rotate-180"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sc-mt-4"></div>
</div>

    `;
}