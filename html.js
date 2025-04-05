import { createHeadingDropdown } from 'https://fatin-webefo.github.io/squareCraft-plugin/generateHeadingDropdown.js';

const fontSizes = [12, 14, 16, 18, 20, 22, 24];
const LetterSpacing = ['1px', '2px', '3px', '4px', '5px'];

export function html() {
   const htmlString =  `
    <div class="sc-widget-container sc-bg-color-2c2c2c sc-text-color-white sc-p-4" id="sc-widget-container">
      <h3 class="sc-widget-title">🎨 squareCraft Widget</h3>

      <label class="sc-label" for="scFontSize">Font Size:</label>
      <input type="number" id="scFontSize" class="sc-input" value="16" min="10" max="50">

      <label class="sc-label" for="scBgColor">Background Color:</label>
      <input type="color" id="scBgColor" class="sc-input" value="#ffffff">

      <label class="sc-label" for="scBorderRadius">Border Radius:</label>
      <input type="range" id="scBorderRadius" class="sc-input" min="0" max="50" value="0">
      <p class="sc-text">Border Radius: <span id="borderRadiusValue">0px</span></p>

      ${createHeadingDropdown('heading1Dropdown', fontSizes, LetterSpacing)}
    </div>
  `;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const isValidHTML = doc.body.children.length > 0;

  console.log("📄 Parsed Document:", doc);
  console.log(`✅ Is Valid HTML: ${isValidHTML}`);

  if (!isValidHTML) {
     console.error("❌ Error: Invalid HTML structure!");
     return "❌ Error: Invalid HTML structure!";
  }

  document.addEventListener("DOMContentLoaded", async function () {
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
           console.error("❌ heading1 not found in DOM!");
        }
     }

     setTimeout(addHeadingEventListeners, 1000);
  });


  return htmlString;
}


