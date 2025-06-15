import { createHeadingDropdown } from "https://fatin-webefo.github.io/squareCraft-plugin/generateHeadingDropdown.js";

export function widgetTypoHoverState() {
  const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return `
    <div id="typo-hover-state" class="sc-hidden sc-mt-2 sc-px-2">
      <div class="sc-flex sc-justify-between">
        <p class="sc-text-sm sc-universal sc-roboto sc-text-gray-300">Hover Text</p>
        <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
      </div>
      <div>

        <div id="heading1HoverPart" class="sc-hidden sc-mb-2">
          <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="heading1Hover"
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-EF7C2F sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
              <div class="sc-active-bar sc-rounded-l"></div>
              <p class="sc-roboto sc-universal sc-font-size-14">Heading-1</p>
              <img id="heading1HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="Heading-1">
            </div>
          </div>
          ${createHeadingDropdown("heading1HoverDropdown", fontSizes, LetterSpacing)}
        </div>

        <div id="heading2HoverPart" class="sc-hidden sc-mb-2">
          <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="heading2Hover"
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
              <p class="sc-roboto sc-universal sc-font-size-14">Heading-2</p>
              <img id="heading2HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="Heading-2">
            </div>
          </div>
          ${createHeadingDropdown("heading2HoverDropdown", fontSizes, LetterSpacing)}
        </div>

        <div id="heading3HoverPart" class="sc-hidden sc-mb-2">
          <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="heading3Hover"
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
              <p class="sc-roboto sc-universal sc-font-size-14">Heading-3</p>
              <img id="heading3HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="Heading-3">
            </div>
          </div>
          ${createHeadingDropdown("heading3HoverDropdown", fontSizes, LetterSpacing)}
        </div>

        <div id="heading4HoverPart" class="sc-hidden sc-mb-2">
          <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="heading4Hover"
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
              <p class="sc-roboto sc-universal sc-font-size-14">Heading-4</p>
              <img id="heading4HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="Heading-4">
            </div>
          </div>
          ${createHeadingDropdown("heading4HoverDropdown", fontSizes, LetterSpacing)}
        </div>

        <div id="paragraph1HoverPart" class="sc-hidden sc-mb-2">
          <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="paragraph1Hover"
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
              <p class="sc-roboto sc-universal sc-font-size-14">Paragraph-1</p>
              <img id="paragraph1HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="Paragraph-1">
            </div>
          </div>
          ${createHeadingDropdown("paragraph1HoverDropdown", fontSizes, LetterSpacing)}
        </div>

        <div id="paragraph2HoverPart" class="sc-hidden sc-mb-2">
          <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="paragraph2Hover"
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
              <p class="sc-roboto sc-universal sc-font-size-14">Paragraph-2</p>
              <img id="paragraph2HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="Paragraph-2">
            </div>
          </div>
          ${createHeadingDropdown("paragraph2HoverDropdown", fontSizes, LetterSpacing)}
        </div>

        <div id="paragraph3HoverPart" class="sc-hidden sc-mb-2">
          <div class="sc-flex sc-mt-2 sc-px-2">
            <div id="paragraph3Hover"
              class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex sc-border-hover-3d3d3d sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
              <p class="sc-roboto sc-universal sc-font-size-14">Paragraph-3</p>
              <img id="paragraph3HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="Paragraph-3">
            </div>
          </div>
          ${createHeadingDropdown("paragraph3HoverDropdown", fontSizes, LetterSpacing)}
        </div>

      </div>
    </div>
  `;
}
