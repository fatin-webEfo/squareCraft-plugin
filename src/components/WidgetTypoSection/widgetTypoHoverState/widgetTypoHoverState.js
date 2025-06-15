import { createHeadingDropdown } from "https://fatin-webefo.github.io/squareCraft-plugin/generateHeadingDropdown.js";

export function widgetTypoHoverState() {
  const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return `
    <div id="typo-hover-state" class="sc-hidden sc-mt-2 sc-px-2">
      <div class="sc-flex sc-justify-between">
        <p class=" sc-universal sc-roboto sc-text-gray-300">Hover Text Section</p>
      </div>
    </div>
  `;
}
