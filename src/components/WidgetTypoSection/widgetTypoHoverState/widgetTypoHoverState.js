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
        ${["heading1", "heading2", "heading3", "heading4", "paragraph1", "paragraph2", "paragraph3"]
          .map((id, i) => {
            const label = id.includes("heading") ? `Heading-${id.slice(-1)}` : `Paragraph-${id.slice(-1)}`;
            const borderClass = i === 0 ? "sc-border-hover-EF7C2F" : "sc-border-hover-3d3d3d";
            return `
              <div id="${id}HoverPart" class="sc-hidden">
                <div class="sc-flex sc-mt-2 sc-px-2">
                  <div id="${id}Hover"
                    class="sc-bg-3f3f3f sc-relative sc-z-99999 sc-flex ${borderClass} sc-border sc-border-solid sc-border-3f3f3f sc-cursor-pointer sc-px-2 sc-justify-between sc-py-1 sc-w-full sc-rounded-4px">
                    ${i === 0 ? '<div class="sc-active-bar sc-rounded-l"></div>' : ""}
                    <p class="sc-roboto sc-universal sc-font-size-14">${label}</p>
                    <img id="${id}HoverArrow" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="sc-rotate-180" alt="">
                  </div>
                </div>
                ${createHeadingDropdown(`${id}HoverDropdown`, fontSizes, LetterSpacing)}
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}
