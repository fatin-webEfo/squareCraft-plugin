import { createHeadingDropdown } from 'https://fatin-webefo.github.io/squareCraft-plugin/generateHeadingDropdown.js';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];
const letterSpacings = ['1px', '2px', '3px', '4px', '5px'];

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

      ${createHeadingDropdown('heading1Dropdown', fontSizes, letterSpacings)}
      ${createHeadingDropdown('heading2Dropdown', fontSizes, letterSpacings)}
    </div>
  `;
}

const htmlString = html();

const parser = new DOMParser();
const doc = parser.parseFromString(htmlString, "text/html");
const isValidHTML = doc.body.children.length > 0;

console.log("📄 Parsed Document:", doc);
console.log(`✅ Is Valid HTML: ${isValidHTML}`);

if (!isValidHTML) {
  console.error("❌ Error: Invalid HTML structure!");
} else {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JavaScript Loaded and Executed!");

    function addHeadingEventListeners() {
      const heading1 = document.getElementById("heading1");
      if (heading1) {
        heading1.addEventListener("mouseover", () => {
          console.log("Hovered over Heading 1");
        });

        heading1.addEventListener("click", () => {
          console.log("Clicked on Heading 1");
        });

        console.log("✅ Event listeners added to Heading 1");
      } else {
        console.warn("⚠️ heading1 not found in DOM!");
      }
    }

    setTimeout(addHeadingEventListeners, 1000);
  });
}
