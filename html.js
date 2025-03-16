export function html() {
    const fontFamilies = [
       "Arial", "Verdana", "Times New Roman", "Courier New", "Georgia",
       "Palatino", "Garamond", "Comic Sans MS", "Trebuchet MS", "Arial Black",
       "Impact", "Tahoma", "Helvetica"
    ];

    const fontOptions = fontFamilies
       .map(font => `<div class="squareCraft-font-option" data-font="${font}" style="font-family: '${font}', sans-serif; padding: 5px; cursor: pointer;">
           ${font}
       </div>`)
       .join("");

    const htmlString = `
        <div class="squareCraft-p-4 squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
            <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co/pry1mVGD/Group-28-1.png" width="140px" />
            <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text.</p>
            
            <div class="squareCraft-mt-2 squareCraft-relative">
                <label class="squareCraft-text-sm">Select Font</label>
                
                <!-- Custom Dropdown -->
                <div class="squareCraft-dropdown">
                    <p id="squareCraftFontSelect" class="squareCraft-selected-font" style="background: black; color: white; border: 1px solid white; padding: 5px; cursor: pointer;">
                        Select Font
                    </p>
                    <div class="squareCraft-dropdown-content" style="display: none; background: #333; border: 1px solid white; padding: 5px; max-height: 150px; overflow-y: auto;">
                        ${fontOptions}
                    </div>
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
        const dropdown = fontSelect.nextElementSibling;

        if (!fontSelect || !dropdown) {
            console.error("❌ Custom font dropdown elements not found!");
            return;
        }

        console.log("✅ Font options loaded:", fontFamilies);

        // Toggle dropdown visibility on click
        fontSelect.addEventListener("click", function () {
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        });

        // Handle font selection
        dropdown.addEventListener("click", function (event) {
            const selectedFont = event.target.dataset.font;
            if (!selectedFont) return;

            fontSelect.textContent = selectedFont; // Update selected font in dropdown
            dropdown.style.display = "none"; // Hide dropdown after selection

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
            window.parent.postMessage({ type: "FONT_CHANGE", font: selectedFont }, "*");
        });

    }, 500);

    return htmlString;
}
