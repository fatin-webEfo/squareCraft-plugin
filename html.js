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
           <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co.com/pry1mVGD/Group-28-1.png" width="140px" />
           <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text.</p>
           <div class="squareCraft-mt-2 squareCraft-relative">
               <label class="squareCraft-text-sm">Select Font</label>
               <select id="squareCraftFontSelect" class="squareCraft-w-full squareCraft-text-sm squareCraft-poppins squareCraft-font-light"
                   style="background: transparent; color: white; border: 1px solid white; padding: 5px;">
                   <option value="" selected disabled>Select Font</option>
                   ${fontOptions}
               </select>
           </div>
       </div>
   `;

   return htmlString;
}
