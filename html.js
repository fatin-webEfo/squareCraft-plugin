export function html() {
    const fontFamilies = [
       "Arial", "Verdana", "Times New Roman", "Courier New", "Georgia",
       "Palatino", "Garamond", "Comic Sans MS", "Trebuchet MS", "Arial Black",
       "Impact", "Tahoma", "Helvetica"
    ];
 
    const fontOptions = fontFamilies
       .map(font => `<div class="squareCraft-dropdown-item squareCraft-px-3 squareCraft-py-1" data-value="${font}" style="font-family: '${font}', sans-serif;">${font}</div>`)
       .join("");
 
    const htmlString = `
        <div class="squareCraft-p-4 squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
            <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co/pry1mVGD/Group-28-1.png" width="140px" />
            <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text.</p>
            
            <div class="squareCraft-mt-2 squareCraft-relative">
                <label class="squareCraft-text-sm">Select Font</label>
                <div id="squareCraftFontSelect" class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-bg-494949 squareCraft-rounded-md squareCraft-px-3 squareCraft-py-1 squareCraft-cursor-pointer">
                    <span class="squareCraft-text-sm squareCraft-poppins squareCraft-font-light">Select Font</span>
                    <span class="squareCraft-dropdown-arrow">▼</span>
                </div>
                <div id="squareCraft-font-dropdown" class="squareCraft-hidden squareCraft-dropdown-content squareCraft-bg-color-2c2c2c squareCraft-border squareCraft-border-solid squareCraft-border-585858 squareCraft-rounded-md squareCraft-scroll">
                    ${fontOptions}
                </div>
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
        const dropdown = document.getElementById("squareCraft-font-dropdown");
        const selectedText = fontSelect.querySelector("span");
        
        if (!fontSelect || !dropdown) {
            console.error("❌ Font select elements not found!");
            return;
        }
   
        fontSelect.addEventListener("click", () => {
            dropdown.classList.toggle("squareCraft-hidden");
            fontSelect.querySelector(".squareCraft-dropdown-arrow").style.transform = 
                dropdown.classList.contains("squareCraft-hidden") ? "rotate(0deg)" : "rotate(180deg)";
        });
   
        dropdown.querySelectorAll(".squareCraft-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                const font = item.dataset.value;
                selectedText.textContent = font;
                selectedText.style.fontFamily = `'${font}', sans-serif`;
                dropdown.classList.add("squareCraft-hidden");
                fontSelect.querySelector(".squareCraft-dropdown-arrow").style.transform = "rotate(0deg)";
   
                const selectedBlock = document.querySelector(".squareCraft-selected");
                if (selectedBlock) {
                    const textElements = selectedBlock.querySelectorAll("h1, h2, h3, h4, p, strong, em, a");
                    textElements.forEach(element => {
                        element.style.setProperty("font-family", font, "important");
                    });
                    console.log(`🔄 Updated font family to: ${font}`);
                    window.parent.postMessage({ type: "FONT_CHANGE", font: font }, "*");
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (event) => {
            if (!fontSelect.contains(event.target)) {
                dropdown.classList.add("squareCraft-hidden");
                fontSelect.querySelector(".squareCraft-dropdown-arrow").style.transform = "rotate(0deg)";
            }
        });
   
    }, 500);
   
    return htmlString;
}