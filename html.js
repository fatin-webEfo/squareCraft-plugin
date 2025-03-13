export function html() {
   async function fetchGoogleFonts() {
       try {
           const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBPpLHcfY1Z1SfUIe78z6UvPe-wF31iwRk");
           if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

           const data = await response.json();
           const googleFonts = data.items.map(font => font.family);
           updateFontDropdown(googleFonts);
       } catch (error) {
           console.error("🚨 Error fetching Google Fonts:", error);
       }
   }

   function updateFontDropdown(fonts) {
       const fontDropdown = document.getElementById("squareCraftFontDropdown");
       if (!fontDropdown) return;

       fontDropdown.innerHTML = fonts.map(font => `<option value="${font}" style="font-family: '${font}', sans-serif;">${font}</option>`).join('');
   }

   document.addEventListener("DOMContentLoaded", fetchGoogleFonts);

   return `
       <div>
        <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
           <select id="squareCraftFontDropdown">
               <option value="" selected disabled hidden>Loading Fonts...</option>
           </select>
       </div>
   `;
}
