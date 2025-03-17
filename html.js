

export function html() {

   const fontSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
   const LetterSpacing = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

  

   const htmlString = `
   <div
      class="squareCraft-p-4  squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
      <div class="squareCraft-flex squareCraft-poppins squareCraft-universal squareCraft-items-center squareCraft-justify-between">
         <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
        
      </div>
      <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text
         of the printing and typesetting industry.
      </p>
      <div
         class="squareCraft-mt-6 squareCraft-poppins squareCraft-border-t squareCraft-border-dashed squareCraft-border-color-494949  squareCraft-w-full">
      </div>
      <div class="squareCraft-mt-6 squareCraft-poppins squareCraft-flex  squareCraft-items-center squareCraft-universal">
         <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader ">Design</p>
         <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Advanced</p>
         <p class="squareCraft-text-sm squareCraft-px-4 squareCraft-cursor-pointer tabHeader">Presets</p>
      </div>
      <div
         class="squareCraft-border-t squareCraft-border-solid squareCraft-relative squareCraft-border-color-494949 squareCraft-w-full">
         <div
            class="squareCraft-absolute squareCraft-top-0 squareCraft-left-0 squareCraft-bg-colo-EF7C2F squareCraft-w-16 squareCraft-h-1px">
         </div>
      </div>
      <div
         class="squareCraft-rounded-6px squareCraft-h-350 squareCraft-mt-6  squareCraft-border squareCraft-border-solid squareCraft-border-EF7C2F squareCraft-bg-color-3d3d3d">
         <div class="squareCraft-flex squareCraft-p-2 squareCraft-items-center squareCraft-justify-between">
            <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
               <img loading="lazy"
                  src="https://fatin-webefo.github.io/squareCraft-plugin/public/T.svg" alt="">
               <p class="squareCraft-universal squareCraft-poppins">Typography</p>
            </div>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" alt="">
         </div>
         <div class="squareCraft-h-1px squareCraft-bg-3f3f3f"></div>
         <div
            class="squareCraft-flex squareCraft-px-2   squareCraft-items-center squareCraft-justify-between">
            <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
               <div class="toggle-container" id="toggleSwitch">
                  <div class="toggle-bullet"></div>
               </div>
               <p id="toggleText" class="squareCraft-text-sm squareCraft-poppins">Enable</p>
            </div>
         </div>
         <div class="squareCraft-h-1px  squareCraft-bg-3f3f3f"></div>
         <div class="squareCraft-mt-2">
            <div
               class="squareCraft-flex squareCraft-poppins squareCraft-px-2  squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
               <div
                  class="squareCraft-cursor-pointer squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">
                  Normal
               </div>
               <div
                  class="squareCraft-cursor-pointer squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">
                  Hover
               </div>
            </div>
            <div class="squareCraft-px-4">
               <div class="squareCraft-h-1px  squareCraft-mt-2 squareCraft-bg-3f3f3f"></div>
            </div>
         </div>
         <div class=" squareCraft-mt-2 squareCraft-px-2 squareCraft-flex squareCraft-justify-between">
            <p class="squareCraft-text-sm squareCraft-universal squareCraft-poppins">Text</p>
            <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/eye.svg" width="12px" />
         </div>
         
<div>
  <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
    <div id="heading1" class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-text-hover-EF7C2F squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
      <p class="squareCraft-poppins squareCraft-universal ">Heading-1</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="squareCraft-rotate-180" alt="">
    </div>
  </div>

  <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
    <div class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-text-hover-EF7C2F squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
      <p class="squareCraft-poppins squareCraft-universal ">Heading-2</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="squareCraft-rotate-180" alt="">
    </div>
  </div>

  <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
    <div class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-text-hover-EF7C2F squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
      <p class="squareCraft-poppins squareCraft-universal ">Heading-3</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="squareCraft-rotate-180" alt="">
    </div>
  </div>

  <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
    <div class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-text-hover-EF7C2F squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
      <p class="squareCraft-poppins squareCraft-universal ">Heading-4</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="squareCraft-rotate-180" alt="">
    </div>
  </div>

  <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
    <div class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-text-hover-EF7C2F squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
      <p class="squareCraft-poppins squareCraft-universal ">Paragraph-1</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="squareCraft-rotate-180" alt="">
    </div>
  </div>

  <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
    <div class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-text-hover-EF7C2F squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
      <p class="squareCraft-poppins squareCraft-universal ">Paragraph-2</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="squareCraft-rotate-180" alt="">
    </div>
  </div>

  <div class="squareCraft-flex squareCraft-mt-2 squareCraft-px-2">
    <div class="squareCraft-bg-3f3f3f squareCraft-flex squareCraft-text-hover-EF7C2F squareCraft-cursor-pointer squareCraft-px-2 squareCraft-justify-between squareCraft-py-1 squareCraft-w-full squareCraft-rounded-6px">
      <p class="squareCraft-poppins squareCraft-universal ">Paragraph-3</p>
      <img src="https://fatin-webefo.github.io/squareCraft-plugin/public/arrow.svg" class="squareCraft-rotate-180" alt="">
    </div>
  </div>
</div>

      
         <div class="squareCraft-mt-4"> </div>
      </div>
      <div class="squareCraft-mt-4">
         <div
            class="squareCraft-flex  squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
            <div
               class="squareCraft-cursor-pointer squareCraft-poppins squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">
               Publish
            </div>
            <div
               class="squareCraft-cursor-pointer squareCraft-poppins squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1 squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">
               Reset
            </div>
         </div>
       
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
        console.log("✅ JavaScript Loaded and Executed!");

        const fontSelect = document.getElementById("squareCraftFontSelect");
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
            const isEnabled = localStorage.getItem("squareCraft_enabled") === "true";
            localStorage.setItem("squareCraft_enabled", !isEnabled);
            toggleText.innerText = !isEnabled ? "Disable" : "Enable";
            console.log(`🔁 Toggle Switched: ${!isEnabled ? "Enabled" : "Disabled"}`);
        }

        toggleSwitch.addEventListener("click", toggleEnableDisable);

        if (localStorage.getItem("squareCraft_enabled") === "true") {
            toggleText.innerText = "Disable";
        }

        async function fetchFonts(startIndex = 0, limit = 10) {
            try {
                let cachedFonts = JSON.parse(localStorage.getItem("squareCraft_fonts")) || [];
                if (cachedFonts.length > startIndex) {
                    return cachedFonts.slice(startIndex, startIndex + limit);
                }

                const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                const fonts = data.items.map(font => font.family);
                localStorage.setItem("squareCraft_fonts", JSON.stringify(fonts));

                console.log(`✅ Loaded ${fonts.length} fonts from API.` , fonts);

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
