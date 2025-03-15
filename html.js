export function html() {
   const fontFamilies = [
      "Arial", "Verdana", "Times New Roman", "Courier New", "Georgia",
      "Palatino", "Garamond", "Comic Sans MS", "Trebuchet MS", "Arial Black",
      "Impact", "Tahoma", "Helvetica"
   ];

   const fontOptions = fontFamilies
      .map(font => `<option value="${font}" style="font-family: '${font}', sans-serif;">${font}</option>`)
      .join("");

   const htmlString = `
       <div class="squareCraft-p-4 squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
           <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co/pry1mVGD/Group-28-1.png" width="140px" />
           <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text.</p>
           <div class="squareCraft-mt-2 squareCraft-relative">
               <label class="squareCraft-text-sm">Select Font</label>
               <select id="squareCraftFontSelect" class="squareCraft-w-full squareCraft-rounded-md squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                   style="background: black; color: white; border: 1px solid white; padding: 5px;">
                   <option class="squareCraft-cursor-pointer" value="" selected disabled>Select Font</option>
                   ${fontOptions}
               </select>
           </div>
       </div>
   `;

   const parser = new DOMParser();
   const doc = parser.parseFromString(htmlString, "text/html");
   const isValidHTML = doc.body.children.length > 0;

   if (!isValidHTML) {
      console.error("❌ Error: Invalid HTML structure!");
      return "❌ Error: Invalid HTML structure!";
   }

   setTimeout(() => {
      const fontSelect = document.getElementById("squareCraftFontSelect");
      if (!fontSelect) {
          console.error("❌ Font select element not found!");
          return;
      }
  
      console.log("✅ Font options loaded:", fontOptions);
  
      fontSelect.addEventListener("change", function () {
          const selectedFont = fontSelect.value;
          const selectedBlock = document.querySelector(".squareCraft-selected");
  
          if (!selectedBlock) {
              console.warn("⚠️ No block selected to apply font change.");
              return;
          }
  
          const textElements = selectedBlock.querySelectorAll("h1, h2, h3, h4, p, strong, em, a");
  
          if (textElements.length === 0) {
              console.warn("⚠️ No text elements found inside the selected block.");
              return;
          }
  
          textElements.forEach(element => {
              element.style.setProperty("font-family", selectedFont, "important");
          });
  
          console.log(`🔄 Updated font family to: ${selectedFont} for ${textElements.length} elements inside ${selectedBlock.id}`);
  
          // Send message to parent (if needed)
          window.parent.postMessage({ type: "FONT_CHANGE", font: selectedFont }, "*");
      });
  
  }, 500);
  
  
   return htmlString;
}
