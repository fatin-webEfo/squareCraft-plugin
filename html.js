export function html() {
   const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
   const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

   const htmlString = `
       <div class="squareCraft-p-4 squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
                <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
 
       <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text.</p>
           <div class="squareCraft-mt-2 squareCraft-relative">
               <label class="squareCraft-text-sm">Select Font</label>
               <select id="squareCraftFontSelect" class="squareCraft-w-full squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                   style="background: transparent; color: white; border: 1px solid white; padding: 5px;">
                   <option value="" selected disabled hidden>Loading Fonts...</option>
               </select>
           </div>
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
       console.log("✅ JavaScript Loaded!");

       const fontSelect = document.getElementById("squareCraftFontSelect");

       if (!fontSelect) {
           console.error("❌ ERROR: Font select element not found!");
           return;
       }

       async function fetchFonts() {
           try {
               let cachedFonts = JSON.parse(localStorage.getItem("squareCraft_fonts")) || [];
               if (cachedFonts.length) {
                   console.log("📦 Loading fonts from cache:", cachedFonts.length);
                   return cachedFonts;
               }

               console.log("🌍 Fetching fonts from Google API...");
               const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk");

               if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

               const data = await response.json();
               const fonts = data.items.map(font => font.family);
               localStorage.setItem("squareCraft_fonts", JSON.stringify(fonts));
               console.log("✅ Fetched fonts:", fonts.length);

               return fonts;
           } catch (error) {
               console.error("🚨 Error fetching fonts:", error);
               return [];
           }
       }

       async function populateFontDropdown() {
           const fonts = await fetchFonts();
           if (!fonts.length) {
               fontSelect.innerHTML = `<option disabled>No fonts available</option>`;
               return;
           }

           fontSelect.innerHTML = `<option value="" selected disabled>Select Font</option>`;

           fonts.forEach(font => {
               const option = document.createElement("option");
               option.value = font;
               option.innerText = font;
               option.style.fontFamily = `'${font}', sans-serif`;
               fontSelect.appendChild(option);
           });

           console.log("✅ Dropdown populated with fonts!");
       }

       await populateFontDropdown();

       fontSelect.addEventListener("change", function () {
           const selectedFont = fontSelect.value;
           fontSelect.style.fontFamily = `'${selectedFont}', sans-serif`;
           console.log(`✅ Font changed to: ${selectedFont}`);
       });
   });

   return htmlString;
}
