export function html() {

   const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
   const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

   async function fetchGoogleFonts() {
       try {
           let cachedFonts = JSON.parse(localStorage.getItem("squareCraft_fonts")) || [];

           if (cachedFonts.length > 0) {
               console.log("📌 Using cached fonts...");
               updateFontDropdown(cachedFonts);
               return;
           }

           console.log("⏳ Fetching fonts from Google API...");
           const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk");

           if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

           const data = await response.json();
           const googleFonts = data.items.map(font => font.family);

           localStorage.setItem("squareCraft_fonts", JSON.stringify(googleFonts));

           console.log("✅ Google Fonts loaded successfully!");
           updateFontDropdown(googleFonts);
       } catch (error) {
           console.error("🚨 Error fetching Google Fonts:", error);
           updateFontDropdown([], true); // Indicate failure
       }
   }

   function updateFontDropdown(fonts, error = false) {
       const fontDropdown = document.getElementById("squareCraftFontDropdown");
       if (!fontDropdown) return;

       // Clear existing options
       fontDropdown.innerHTML = `<option value="" selected disabled hidden>${error ? "Failed to Load Fonts" : "Select Font"}</option>`;

       if (!error) {
           fonts.forEach(font => {
               const option = document.createElement("option");
               option.value = font;
               option.innerText = font;
               option.style.fontFamily = `'${font}', sans-serif`;
               fontDropdown.appendChild(option);
           });

           console.log("🎯 Font dropdown updated successfully!");
       }
   }

   document.addEventListener("DOMContentLoaded", () => {
       fetchGoogleFonts();
   });

   const htmlString = `
       <div class="squareCraft-p-4 squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
           
           <!-- Font Family Dropdown -->
           <div id="squareCraftFontSelect" class="squareCraft-flex squareCraft-bg-494949 squareCraft-h-9 squareCraft-col-span-7 squareCraft-rounded-6px squareCraft-justify-between squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-items-center">
               <select id="squareCraftFontDropdown" class="squareCraft-w-full squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                   style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px; max-height: 250px; overflow-y: auto;">
                   <option value="" selected disabled hidden>Loading Fonts...</option>
               </select>
               <div class="squareCraft-bg-3f3f3f squareCraft-px-2" style="height: 27px; padding: 0 8px; pointer-events: none;">
                   <img class="squareCraft-rotate-180" width="12px" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
               </div>
           </div>
       </div>
   `;

   const parser = new DOMParser();
   const doc = parser.parseFromString(htmlString, "text/html");
   const isValidHTML = doc.body.children.length > 0;
   return isValidHTML ? htmlString : "❌ Error: Invalid HTML structure!";
}
