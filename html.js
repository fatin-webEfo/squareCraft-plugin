import { createHeadingDropdown } from './generateHeadingDropdown.js';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];
const LetterSpacings = ['1px', '2px', '3px', '4px', '5px'];

export function html() {
  return `
    <div class="squareCraft-widget-container squareCraft-bg-color-2c2c2c squareCraft-text-color-white squareCraft-p-4" id="squareCraft-widget-container">
      <h3 class="squareCraft-widget-title">🎨 SquareCraft Widget</h3>

      <label class="squareCraft-label" for="squareCraftFontSize">Font Size:</label>
      <input type="number" id="squareCraftFontSize" class="squareCraft-input" value="16" min="10" max="50">

      <label class="squareCraft-label" for="squareCraftBgColor">Background Color:</label>
      <input type="color" id="squareCraftBgColor" class="squareCraft-input" value="#ffffff">

      <label class="squareCraft-label" for="squareCraftBorderRadius">Border Radius:</label>
      <input type="range" id="squareCraftBorderRadius" class="squareCraft-input" min="0" max="50" value="0">
      <p class="squareCraft-text">Border Radius: <span id="borderRadiusValue">0px</span></p>

      ${createHeadingDropdown('heading1Dropdown', fontSizes, LetterSpacings)}
      ${createHeadingDropdown('heading2Dropdown', fontSizes, LetterSpacings)}
    </div>
  `;
}
