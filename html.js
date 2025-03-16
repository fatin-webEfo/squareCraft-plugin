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
        console.log("🚀 Initializing font dropdown setup...");
    
        const fontSelect = document.getElementById("squareCraftFontSelect");
        console.log("🔍 Checking for fontSelect:", fontSelect);
    
        if (!fontSelect) {
            console.error("❌ Font select element (#squareCraftFontSelect) not found!");
            return;
        }
    
        const dropdownContainer = fontSelect.closest(".squareCraft-dropdown");
        console.log("🔍 Checking for dropdownContainer:", dropdownContainer);
    
        if (!dropdownContainer) {
            console.error("❌ Dropdown container (.squareCraft-dropdown) not found!");
            return;
        }
    
        const dropdown = dropdownContainer.querySelector(".squareCraft-dropdown-content");
        console.log("🔍 Checking for dropdown content:", dropdown);
    
        if (!dropdown) {
            console.error("❌ Dropdown content (.squareCraft-dropdown-content) not found!");
            return;
        }
    
        console.log("✅ Font options loaded:", fontFamilies);
    
        // ✅ Prevent dropdown from closing when clicking inside
        dropdown.addEventListener("click", function (event) {
            console.log("🖱️ Click inside dropdown detected:", event.target);
            event.stopPropagation(); // Stops the event from reaching the outside click listener
        });
    
        // ✅ Toggle dropdown visibility on click
        fontSelect.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents dropdown from being closed by outside click detection
            const isVisible = dropdown.style.display === "block";
            dropdown.style.display = isVisible ? "none" : "block";
            console.log(`📂 Dropdown ${isVisible ? "closed" : "opened"}`);
        });
    
        // ✅ Handle font selection
        dropdown.addEventListener("click", function (event) {
            const selectedFont = event.target.dataset.font;
            console.log("🎯 Click event inside dropdown:", event.target, "Selected Font:", selectedFont);
    
            if (!selectedFont) {
                console.warn("⚠️ Clicked element has no font data, ignoring...");
                return;
            }
    
            fontSelect.textContent = selectedFont + " ▼";
            dropdown.style.display = "none";
            console.log(`✅ Font selected: ${selectedFont}`);
    
            const selectedBlock = document.querySelector(".squareCraft-selected");
            console.log("🔍 Checking for selected block:", selectedBlock);
    
            if (!selectedBlock) {
                console.warn("⚠️ No block selected to apply font change.");
                return;
            }
    
            const textElements = selectedBlock.querySelectorAll("h1, h2, h3, h4, p, strong, em, a");
            console.log("📝 Found text elements:", textElements.length, textElements);
    
            if (textElements.length === 0) {
                console.warn("⚠️ No text elements found inside the selected block.");
                return;
            }
    
            textElements.forEach(element => {
                console.log(`🎨 Applying font "${selectedFont}" to element:`, element);
                element.style.setProperty("font-family", selectedFont, "important");
            });
    
            console.log(`🔄 Updated font family to: ${selectedFont} for ${textElements.length} elements inside ${selectedBlock.id}`);
            window.parent.postMessage({ type: "FONT_CHANGE", font: selectedFont }, "*");
        });
    
        // ✅ Hide dropdown when clicking outside (except inside dropdown)
        document.addEventListener("click", function (event) {
            if (!dropdownContainer.contains(event.target)) {
                dropdown.style.display = "none";
                console.log("📂 Clicked outside, dropdown closed.");
            }
        });
    
    }, 500);
    
   
   
    return htmlString;
 }