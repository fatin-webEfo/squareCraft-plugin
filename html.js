export function html() {
    console.log('🟢 Initializing html() function');
    
    const fontFamilies = [
       "Arial", "Verdana", "Times New Roman", "Courier New", "Georgia",
       "Palatino", "Garamond", "Comic Sans MS", "Trebuchet MS", "Arial Black",
       "Impact", "Tahoma", "Helvetica"
    ];
    console.log('📚 Font families loaded:', fontFamilies);
 
    const fontOptions = fontFamilies
       .map(font => `<div class="squareCraft-dropdown-item squareCraft-px-3 squareCraft-py-2 squareCraft-cursor-pointer squareCraft-hover:bg-494949" data-value="${font}" style="font-family: '${font}', sans-serif;">${font}</div>`)
       .join("");
    console.log('🎨 Font options HTML generated');

    const htmlString = `
        <div class="squareCraft-p-4 squareCraft-text-color-white squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-bg-color-2c2c2c squareCraft-rounded-15px squareCraft-w-300px">
            <img id="squareCraft-grabbing" class="squareCraft-cursor-grabbing squareCraft-universal" src="https://i.ibb.co/pry1mVGD/Group-28-1.png" width="140px" />
            <p class="squareCraft-text-sm squareCraft-mt-6 squareCraft-poppins squareCraft-font-light">Lorem Ipsum is simply dummy text.</p>
            
            <div class="squareCraft-mt-2 squareCraft-relative">
                <div id="squareCraftFontSelect" class="squareCraft-flex squareCraft-items-center squareCraft-justify-between squareCraft-bg-494949 squareCraft-rounded-md squareCraft-px-3 squareCraft-py-2 squareCraft-universal squareCraft-cursor-pointer">
                    <span class="squareCraft-text-sm squareCraft-poppins squareCraft-font-light">Select Font</span>
                    <span class="squareCraft-dropdown-arrow">▼</span>
                </div>
                <div id="squareCraft-font-dropdown" style="display: none; position: absolute; left: 0; right: 0; top: 100%; z-index: 99999;" class="squareCraft-mt-1 squareCraft-dropdown-content squareCraft-bg-color-2c2c2c squareCraft-border squareCraft-border-solid squareCraft-border-3d3d3d squareCraft-rounded-md squareCraft-max-h-40 squareCraft-overflow-y-auto">
                    ${fontOptions}
                </div>
            </div>
        </div>
    `;
    console.log('📄 HTML string generated');

    // Add event listeners after a short delay to ensure DOM is ready
    setTimeout(() => {
        console.log('⏰ Setting up event listeners');
        
        const fontSelect = document.getElementById('squareCraftFontSelect');
        const dropdown = document.getElementById('squareCraft-font-dropdown');
        const dropdownItems = document.querySelectorAll('.squareCraft-dropdown-item');
        const arrow = document.querySelector('.squareCraft-dropdown-arrow');
        
        console.log('🔍 Found elements:', {
            fontSelect: !!fontSelect,
            dropdown: !!dropdown,
            dropdownItems: dropdownItems.length,
            arrow: !!arrow
        });

        if (fontSelect && dropdown) {
            fontSelect.addEventListener('click', (e) => {
                console.log('🖱️ Font select clicked');
                e.stopPropagation();
                const isHidden = dropdown.style.display === 'none';
                dropdown.style.display = isHidden ? 'block' : 'none';
                arrow.style.transform = isHidden ? 'rotate(180deg)' : '';
                console.log('Dropdown visibility:', dropdown.style.display);
            });
        }

        if (dropdownItems) {
            dropdownItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    console.log('📝 Font item clicked:', e.target.dataset.value);
                    const selectedFont = e.target.dataset.value;
                    const selectedElement = document.querySelector('.squareCraft-selected');
                    const fontSelectText = fontSelect.querySelector('span');
                    
                    if (selectedElement) {
                        console.log('✅ Applying font to selected element:', selectedFont);
                        selectedElement.style.fontFamily = selectedFont;
                        fontSelectText.textContent = selectedFont;
                        fontSelectText.style.fontFamily = selectedFont;
                    } else {
                        console.warn('⚠️ No element selected to apply font');
                    }
                    
                    dropdown.style.display = 'none';
                    arrow.style.transform = '';
                });
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#squareCraftFontSelect')) {
                console.log('📍 Click outside dropdown - closing');
                dropdown.style.display = 'none';
                arrow.style.transform = '';
            }
        });
    }, 500);

    return htmlString;
}