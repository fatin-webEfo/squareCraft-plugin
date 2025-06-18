export function HoverTypoAllSelect(fontSizes, LetterSpacing) {
  return `
          <div class="sc-mt-2 sc-text-color-white">
              <div
                class="sc-mt-3 sc-relative sc-grid sc-grid-cols-12 sc-gap-8px"
              >
                <div class="sc-col-span-7">
                  <p class="sc-font-size-11 sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">
                    Font weight
                  </p>
                  <div
                    class="sc-flex sc-bg-494949 sc-pl-2 sc-col-span-7 sc-mt-2 sc-cursor-pointer sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-4px sc-items-center"
                  >
                    <div>
                      <p
                        class="sc-font-size-12 sc-universal sc-roboto sc-font-light"
                      >
                        400
                      </p>
                    </div>
                    <div
                      class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-px-2 sc-h-9"
                    >
                      <img
                        class="sc-mx-auto sc-rotate-180"
                        width="10px"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="sc-absolute sc-w-100px sc-border sc-border-solid sc-border-EF7C2F sc-hidden sc-top-10 sc-z-99999 sc-scrollBar sc-max-h-140px sc-rounded-4px sc-bg-494949 sc-flex sc-flex-col sc-overflow-hidden"
                >
                  <div
                    class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer"
                  >
                    300
                  </div>
                  <div
                    class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer"
                  >
                    400
                  </div>
                  <div
                    class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer"
                  >
                    500
                  </div>
                  <div
                    class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer"
                  >
                    600
                  </div>
                  <div
                    class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer"
                  >
                    700
                  </div>
                  <div
                    class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer"
                  >
                    800
                  </div>
                  <div
                    class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12 sc-cursor-pointer"
                  >
                    900
                  </div>
                </div>

                <div class="sc-flex-col sc-col-span-4">
                  <p class="sc-font-size-11 sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto">
                    Font spacing
                  </p>
                  <div
                    class="sc-flex sc-text-color-white sc-mt-2 sc-rounded-4px sc-relative sc-border sc-border-solid sc-border-585858 sc-items-center"
                  >
                    <div
                      class="sc-flex sc-text-color-white sc-justify-between sc-col-span-4 sc-rounded-4px sc-items-center"
                    >
                      <div
                        class="sc-font-size-container sc-roboto sc-universal sc-flex sc-justify-between sc-items-center sc-rounded-4px"
                      >
                        <input
                          type="text"
                          value="0"
                          class="sc-font-size-input sc-font-light sc-z-99999 sc-font-size-12 sc-text-color-white sc-bg-transparent sc-universal sc-font-light"
                        />

                        <div class="sc-v-line"></div>

                        <div
                          class="sc-flex sc-items-center sc-justify-center sc-ml-2"
                        >
                          <p
                            class="sc-font-light sc-text-center sc-font-size-12 sc-universal"
                          >
                            px
                          </p>
                        </div>

                        <div
                          class="sc-bg-3f3f3f sc-flex sc-items-center sc-justify-center sc-cursor-pointer sc-px-1_5 sc-tooltip-target"
                          style="
                            height: 28px;
                            margin-left: 12px;
                            border-radius: 0px 5px 5px 0px;
                          "
                        >
                          <div class="sc-tooltip sc-hidden">
                            <div class="tooltip-arrow"></div>
                            Letter spacing
                          </div>
                          <img
                            loading="lazy"
                            src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                            style="width: 12px"
                            class="sc-mx-auto sc-cursor-pointer"
                          />
                        </div>
                      </div>

                      <div
                        class="sc-absolute sc-hidden sc-scrollBar sc-z-99999 sc-border sc-border-solid sc-border-EF7C2F sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-12 sc-rounded-4px sc-border-585858 sc-mt-1"
                      >
                        ${LetterSpacing?.map(
                          (gap) => `
                        <div
                          class="sc-dropdown-item sc-py-1px sc-text-center sc-font-size-12"
                          data-value="${gap}"
                        >
                          ${gap}
                        </div>
                        `
                        ).join("")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sc-items-center sc-gap-2 sc-mt-3 sc-flex">
                <div class=" ">
                  <p
                    class="sc-font-size-11 sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto"
                  >
                    Background Color
                  </p>
                  <div class="sc-col-span-5 sc-mt-2 sc-z-99999 sc-relative">
                    <div
                      class="sc-flex sc-w-30 sc-justify-between sc-items-center sc-px-1 sc-bg-3f3f3f sc-inActiveTab-border sc-rounded-4px sc-py-4px"
                    >
                      <p class="sc-font-size-12 sc-roboto sc-universal">Select</p>
                      <div class="sc-square-6 sc-cursor-pointer"></div>
                    </div>
  
                    <div
                      class="sc-absolute sc-z-99999 sc-border sc-hidden sc-border-solid sc-border-EF7C2F sc-top-12 sc-bg-3f3f3f sc-left-0 sc-p-1_5 sc-rounded-4px"
                    >
                      <div class="sc-button-fontcolor-arrow"></div>
  
                      <div class="sc-flex sc-items-center sc-justify-between">
                        <div
                          class="sc-flex sc-relative sc-items-center sc-gap-1"
                        ></div>
  
                        <div class="sc-relative sc-inline-block sc-w-auto">
                          <div
                            class="sc-rounded-15px sc-px-2 sc-cursor-pointer sc-py-4px sc-bg-454545 sc-flex sc-items-center sc-gap-2"
                          >
                            <p class="sc-universal sc-font-size-11 sc-roboto">
                              RGB
                            </p>
                            <span
                              class="sc-arrow-placeholder sc-rotate-180"
                            ></span>
                          </div>
  
                          <div
                            class="sc-absolute sc-border sc-border-solid sc-border-EF7C2F sc-left-0 sc-w-full sc-text-sm sc-z-999999 sc-rounded-15px sc-bg-494949 sc-flex sc-hidden sc-top-6 sc-flex-col sc-overflow-hidden"
                          >
                            <div
                              class="sc-cursor-pointer sc-dropdown-item sc-py-2px sc-px-2 sc-rounded-t-14px"
                              data-format="RGB"
                            >
                              RGB
                            </div>
                            <div
                              class="sc-cursor-pointer sc-dropdown-item sc-py-2px sc-px-2"
                              data-format="HSL"
                            >
                              HSL
                            </div>
                            <div
                              class="sc-cursor-pointer sc-dropdown-item sc-py-2px sc-px-2 sc-rounded-b-14px"
                              data-format="HEX"
                            >
                              HEX
                            </div>
                          </div>
                        </div>
                      </div>
  
                      <div class="sc-h-1px sc-mt-2 sc-bg-color-gray"></div>
  
                      <div
                        class="sc-flex color-h-selection sc-mt-2 sc-items-center sc-gap-2"
                      >
                        <div class="sc-relative">
                          <div
                            class="sc-w-2 sc-h-2 sc-absolute sc-cursor-pointer sc-rounded-full sc-border sc-border-solid sc-border-white"
                          ></div>
                        </div>
  
                        <div class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                          <div
                            class="sc-absolute sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2"
                          ></div>
                        </div>
  
                        <div class="sc-h-full sc-w-3 sc-relative sc-rounded-15px">
                          <div
                            class="sc-absolute sc-w-5 sc-left-half sc-shadow-sm sc-rounded-15px sc-cursor-grabbing sc-h-2 sc-bg-color-f2f2f2"
                          ></div>
                        </div>
                      </div>
  
                      <div
                        class="sc-flex sc-justify-between sc-mt-2 sc-px-2 sc-py-0_5 sc-rounded-4px sc-bg-454545"
                      >
                        <p
                          class="sc-font-size-12 sc-roboto sc-font-light sc-universal"
                        >
                          Select
                        </p>
                        <p
                          class="sc-font-size-12 sc-roboto sc-font-light sc-universal"
                        >
                          100%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class=" ">
                  <p
                    class="sc-font-size-11 sc-font-thin sc-mt-4 sc-universal sc-text-gray-300 sc-roboto"
                  >
                    Text Color
                  </p>
                  <div
                    class="sc-py-0_5 sc-mt-2 sc-w-30 sc-bg-3f3f3f sc-inActiveTab-border sc-flex sc-justify-between sc-items-center sc-px-1 sc-rounded-4px"
                  >
                    <p
                      class="sc-font-size-12 sc-roboto c-font-light sc-universal"
                    >
                      #363544
                    </p>
                    <div class="sc-square-6 sc-cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
         `;
}
