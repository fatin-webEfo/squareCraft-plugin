

export function html() {

   const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
   const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]



   const htmlString = `
     <div
      class="sc-p-4  sc-text-color-white sc-border sc-border-solid sc-border-3d3d3d sc-bg-color-2c2c2c sc-rounded-15px sc-w-300px">
      <div class="sc-flex sc-poppins sc-universal sc-items-center sc-justify-between">
         <img id="sc-grabbing" class="sc-cursor-grabbing sc-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
        
      </div>
      <p class="sc-text-sm sc-mt-6 sc-poppins sc-font-light">Lorem Ipsum is simply dummy text
         of the printing and typesetting industry.
      </p>
      <div
         class="sc-mt-6 sc-poppins sc-border-t sc-border-dashed sc-border-color-494949  sc-w-full">
      </div>
      <div class="sc-mt-6 sc-poppins sc-flex  sc-items-center sc-universal">
         <p class="sc-text-sm sc-px-4 sc-cursor-pointer tabHeader ">Design</p>
         <p class="sc-text-sm sc-px-4 sc-cursor-pointer tabHeader">Advanced</p>
         <p class="sc-text-sm sc-px-4 sc-cursor-pointer tabHeader">Presets</p>
      </div>
      <div
         class="sc-border-t sc-border-solid sc-relative sc-border-color-494949 sc-w-full">
         <div
            class="sc-absolute sc-top-0 sc-left-0 sc-bg-colo-EF7C2F sc-w-16 sc-h-1px">
         </div>
      </div>
      <div
         class="sc-rounded-6px  sc-mt-6  sc-border sc-border-solid sc-border-EF7C2F sc-bg-color-3d3d3d">
         <div class="sc-flex sc-p-2 sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
               <img loading="lazy"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/T.svg" alt="">
               <p class="sc-universal sc-poppins">Typography</p>
            </div>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
         </div>
         <div class="sc-h-1px sc-bg-3f3f3f"></div>
         <div
            class="sc-flex sc-px-2   sc-items-center sc-justify-between">
            <div class="sc-flex sc-gap-2 sc-items-center">
               <div class="toggle-container" id="toggleSwitch">
                  <div class="toggle-bullet"></div>
               </div>
               <p id="toggleText" class="sc-text-sm sc-poppins">Enable</p>
            </div>
         </div>
         <div class="sc-h-1px  sc-bg-3f3f3f"></div>
         <div class="sc-mt-2">
            <div
               class="sc-flex sc-poppins sc-px-2  sc-items-center sc-justify-between sc-gap-2">
               <div
                  class="sc-cursor-pointer sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-text-sm sc-py-1px sc-rounded-6px sc-text-color-white sc-justify-center">
                  Normal
               </div>
               <div
                  class="sc-cursor-pointer sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-text-sm sc-py-1px sc-rounded-6px sc-items-center sc-justify-center">
                  Hover
               </div>
            </div>
            <div class="sc-px-4">
               <div class="sc-h-1px  sc-mt-2 sc-bg-3f3f3f"></div>
            </div>
         </div>
         <div class=" sc-mt-2 sc-px-2 sc-flex sc-justify-between">
            <p class="sc-text-sm sc-universal sc-poppins">Text</p>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
         </div>
         <div class="sc-mt-2 sc-relative sc-grid sc-w-full sc-grid-cols-12 sc-gap-2 sc-px-2">
<div id="scFontSelect" class="sc-flex sc-bg-494949 sc-h-9 sc-col-span-7 sc-rounded-6px sc-justify-between sc-border sc-border-solid sc-border-585858 sc-items-center">
    <select  class="sc-w-full sc-text-sm sc-poppins sc-font-light" 
        style="background: transparent; color: white; border: none; outline: none; appearance: none; cursor: pointer; padding: 0 8px;">
        <option value="" selected disabled hidden>Select Font</option>
    </select>
    <div class="sc-bg-3f3f3f sc-px-2" style="height: 27px; padding: 0 8px; pointer-events: none;">
        <img class="sc-rotate-180" width="12px" src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
    </div>
</div>



            <div class="sc-flex sc-bg-transparent sc-h-9 sc-text-color-white sc-justify-between sc-col-span-4   sc-rounded-6px sc-border sc-border-solid sc-border-585858 sc-items-center ">
               <div class="sc-flex sc-text-color-white sc-items-center ">
                  <div class="sc-flex sc-text-color-white sc-justify-between sc-col-span-4 sc-rounded-6px sc-items-center  ">
                     <div class="sc-font-size-container sc-poppins sc-universal sc-flex sc-justify-between sc-items-center sc-flex sc-items-center  
                        sc-rounded-6px 
                        ">
                        <input type="text" id="scFontSizeInput" value="16" 
                           class="sc-font-size-input sc-font-light sc-z-99999 sc-text-sm sc-text-color-white 
                           sc-bg-transparent  sc-universal sc-font-light">
                             <div class="sc-v-line"></div>
                        <div class="sc-flex sc-items-center  sc-justify-center  sc-items-center">
                           <p class="sc-flex sc-font-light sc-text-sm sc-px-1_5 sc-items-center sc-justify-center sc-items-center">
                              px
                        </div>
                        <div class="sc-bg-3f3f3f sc-px-2 sc-ml-1" style="height: 27px; padding: 0 8px; border-radius: 0px 5px 5px 0px;">
                           <img class=" sc-rotate-180 " width="12px" 
                              src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
                        </div>
                     </div>
                     <div id="scFontSizeOptions" class="sc-hidden  sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-20
                        sc-rounded-6px sc-border sc-border-585858 sc-absolute 
                        sc-mt-1">
                        ${fontSizes?.map(size => `
                        <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-text-sm" 
                           data-value="${size}">${size}</div>
                        `).join('')}
                     </div>
                  </div>
               </div>
               <div class="sc-border-r sc-border-585858 "></div>
            </div>
         </div>
         <div class="sc-mt-2  sc-grid sc-px-2 sc-w-full sc-grid-cols-12 sc-gap-2 ">
            <div class="sc-flex sc-bg-494949  sc-col-span-6  sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-6px sc-items-center ">
               <div class="  sc-px-2 sc-w-full  ">
                  <p class="sc-text-sm sc-universal sc-poppins sc-font-light">Regular</p>
               </div>
               <div class="sc-bg-3f3f3f sc-px-2" style="height: 27px; padding: 0 8px;">
                  <img class=" sc-mx-auto sc-rotate-180" width="10px"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
               </div>
            </div>
            <div class="sc-flex sc-justify-between sc-col-span-4  sc-rounded-6px sc-border sc-border-solid sc-border-585858 sc-items-center ">
               <div class="sc-flex sc-mx-auto sc-items-center sc-justify-center">
                  <img class=" sc-rounded-6px sc-rotate-180" width="12px"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">
               </div>
                 <div class="sc-v-line"></div>
               <div class="sc-flex sc-mx-auto sc-items-center sc-justify-center sc-border sc-border-585858 sc-w-13px sc-border-solid sc-h-13px">
               </div>
                 <div class="sc-v-line"></div>
               <img class=" sc-rounded-6px sc-rotate-180 sc-flex sc-mx-auto sc-items-center sc-justify-center" width="12px"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/gap.svg" alt="">
            </div>
         </div>
         <div class="sc-mt-2 sc-grid sc-px-2 sc-w-full sc-grid-cols-12 sc-gap-2 ">
            <div class="sc-flex sc-col-span-5 sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-6px sc-items-center ">
               <div
                  class="sc-flex sc-items-center sc-justify-between sc-w-full ">
                  <img id="scTextAlignLeft" data-align="left"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (1).svg"
                     class="sc-cursor-pointer alignment-icon   sc-mx-auto"  alt="">
                  <div class="sc-v-line"></div>
                  <img id="scTextAlignRight" data-align="right"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (3).svg"
                     class="sc-cursor-pointer alignment-icon    sc-mx-auto"  alt="">
                  <div class="sc-v-line"></div>
                  <img id="scTextAlignCenter" data-align="center"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (2).svg"
                     class="sc-cursor-pointer alignment-icon    sc-mx-auto"  alt="">
                  <div class="sc-v-line"></div>
                  <img id="scTextAlignJustify" data-align="justify"
                     src="https://fatin-webefo.github.io/squareCraft-plugin/public/alignment (4).svg"
                     class="sc-cursor-pointer alignment-icon    sc-mx-auto "  alt="">
               </div>
            </div>
            <div class="sc-flex sc-text-color-white sc-justify-between sc-col-span-3 
               sc-rounded-6px sc-border sc-border-solid sc-border-585858 
               sc-items-center sc-w-full ">
               <div class="sc-Letter-spacing-container sc-flex sc-justify-between sc-items-center sc-flex sc-items-center sc-border 
                  sc-border-solid sc-border-3d3d3d  sc-rounded-6px 
                  ">
                  <input type="text" id="scLetterSpacingInput" value="15px" class="sc-Letter-spacing-input sc-font-light sc-text-sm sc-text-color-white 
                     sc-bg-transparent sc-w-full  sc-py-1px sc-font-light">
                  <div class="">
                     <img id="scLetterSpacingDropdown"
                        src="https://fatin-webefo.github.io/squareCraft-plugin/public/line-spacing.svg"
                        class=" sc-px-1 sc-ml-1 sc-mx-auto sc-cursor-pointer" >
                  </div>
               </div>
               <div id="scLetterSpacingOptions" class="sc-hidden sc-h-44 sc-font-sm sc-bg-3f3f3f sc-w-20
                  sc-rounded-6px sc-border sc-border-585858 sc-absolute 
                  sc-mt-1">
                  ${LetterSpacing?.map(gap => `
                  <div class="sc-dropdown-item sc-py-1px sc-text-center  sc-text-sm"
                     data-value="${gap}">${gap}</div>
                  `).join('')}
               </div>   
            </div>

         </div>
         <div class="sc-mt-2 sc-grid sc-px-2 sc-w-full sc-grid-cols-12 sc-gap-2">
            <div class="sc-flex sc-col-span-6 sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-6px sc-items-center ">
               <div
                  class="sc-flex sc-px-2 sc-items-center sc-justify-between sc-w-full ">
                 <p class="sc-font-bold sc-universal sc-text-sm  ">B</p>
                  <div class="sc-v-line"></div>
                 <p class="sc-font-italic sc-universal  sc-text-sm sc-text-center sc-mx-auto">I</p>
                  <div class="sc-v-line"></div>
                <p class="sc-font-underline sc-universal sc-text-sm sc-text-center sc-mx-auto">U</p>
                  <div class="sc-v-line"></div> 
                  <p class="sc-font-underline sc-universal sc-text-sm sc-text-center sc-mx-auto">abc</p>
                  <div class="sc-v-line"></div> 
                  <img id="scTextAlignJustify" data-align="justify"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/T.png"
                  class="sc-cursor-pointer  "  alt="">
                 
               </div>
            </div>
         </div>
         <div class="sc-mt-2 sc-grid sc-px-2 sc-w-full sc-grid-cols-12 sc-gap-2">
            <div class="sc-flex sc-col-span-6 sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-6px sc-items-center ">
               <div
                  class="sc-flex sc-poppins  sc-items-center sc-justify-between sc-w-full ">
                 <p class=" sc-mx-2 sc-w-full sc-text-center sc-universal sc-text-sm ">AG</p>
                  <div class="sc-v-line"></div>
                 <p class=" sc-universal  sc-text-sm sc-text-center sc-w-full sc-mx-auto">ag</p>
                  <div class="sc-v-line"></div>
                  <p class=" sc-universal  sc-text-sm sc-text-center sc-w-full sc-mx-auto">Ag</p>
                  <div class="sc-v-line"></div> 
                  <p class=" sc-universal  sc-text-sm sc-text-center sc-w-full sc-mx-auto">AG</p>
                  <div class="sc-v-line"></div> 
                  <img class=" sc-rounded-6px sc-rotate-180 sc-px-1_5" width="12px"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">
                 
               </div>
            </div>

            <div class="sc-flex sc-col-span-5 sc-justify-between sc-border sc-border-solid sc-border-585858 sc-rounded-6px sc-items-center ">
               <div
                  class="sc-flex sc-poppins  sc-items-center sc-justify-between sc-w-full ">
                 <p class=" sc-mx-2 sc-w-full sc-text-center sc-universal sc-text-sm ">RLT</p>
                  <div class="sc-v-line"></div>
                 <p class=" sc-universal  sc-text-sm sc-text-center sc-w-full sc-mx-auto">LTR</p>
                  <div class="sc-v-line"></div>
                  <img class=" sc-rounded-6px sc-rotate-180 sc-px-2" width="12px"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/dot.svg" alt="">                  
               </div>
            </div>
         </div>
        

      
         <div class="sc-mt-2"> </div>
      </div>
      <div class="sc-mt-4">
         <div
            class="sc-flex  sc-items-center sc-justify-between sc-gap-2">
            <div
               class="sc-cursor-pointer sc-poppins sc-bg-color-EF7C2F sc-w-full sc-font-light sc-flex sc-items-center sc-text-sm sc-py-1 sc-rounded-6px sc-text-color-white sc-justify-center">
               Publish
            </div>
            <div
               class="sc-cursor-pointer sc-poppins sc-bg-3f3f3f sc-w-full sc-text-color-white sc-font-light sc-flex sc-text-sm sc-py-1 sc-rounded-6px sc-items-center sc-justify-center">
               Reset
            </div>
         </div>
       
      </div>
   </div>
    `

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

      const fontSelect = document.getElementById("scFontSelect");
      const toggleSwitch = document.getElementById("toggleSwitch");
      const toggleText = document.getElementById("toggleText");

      if (!fontSelect) {
         console.error("❌ ERROR: Font select element not found!");
         return;
      }

      if (!toggleSwitch || !toggleText) {
         console.error("❌ ERROR: Toggle switch or text not found!");
         return;
      }

      function toggleEnableDisable() {
         const isEnabled = localStorage.getItem("sc_enabled") === "true";
         localStorage.setItem("sc_enabled", !isEnabled);
         toggleText.innerText = !isEnabled ? "Disable" : "Enable";
         console.log(`🔁 Toggle Switched: ${!isEnabled ? "Enabled" : "Disabled"}`);
      }

      toggleSwitch.addEventListener("click", toggleEnableDisable);

      if (localStorage.getItem("sc_enabled") === "true") {
         toggleText.innerText = "Disable";
      }

      async function fetchFonts(startIndex = 0, limit = 10) {
         try {
            let cachedFonts = JSON.parse(localStorage.getItem("sc_fonts")) || [];
            if (cachedFonts.length > startIndex) {
               return cachedFonts.slice(startIndex, startIndex + limit);
            }

            const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const fonts = data.items.map(font => font.family);
            localStorage.setItem("sc_fonts", JSON.stringify(fonts));

            console.log(`✅ Loaded ${fonts.length} fonts from API.`, fonts);

            return fonts.slice(startIndex, startIndex + limit);
         } catch (error) {
            console.error("🚨 Error fetching fonts:", error);
            return [];
         }
      }

      async function loadFonts() {
         const fonts = await fetchFonts(0, 10);
         if (!fonts.length) {
            console.warn("⚠️ No new fonts loaded.");
            return;
         }

         console.log(`📌 Appending ${fonts.length} fonts to the dropdown.`);

         fonts.forEach(font => {
            const option = document.createElement("option");
            option.value = font;
            option.innerText = font;
            option.style.fontFamily = `'${font}', sans-serif`;
            fontSelect.appendChild(option);
         });
      }

      await loadFonts();
   });

   return htmlString;



}
