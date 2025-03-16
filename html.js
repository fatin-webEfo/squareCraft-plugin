export function html() {
    console.log('🟢 Initializing html() function');
    
    const fontFamilies = [
       "Arial", "Verdana", "Times New Roman", "Courier New", "Georgia",
       "Palatino", "Garamond", "Comic Sans MS", "Trebuchet MS", "Arial Black",
       "Impact", "Tahoma", "Helvetica"
    ];
    console.log('📚 Font families loaded:', fontFamilies);
 
    const fontOptions = fontFamilies
       .map(font => `<div class="squareCraft-dropdown-item" data-value="${font}" style="font-family: '${font}', sans-serif; padding: 8px 12px; cursor: pointer;">${font}</div>`)
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
                <div id="squareCraft-font-dropdown" 
                     style="
                            position: absolute; 
                            top: 10px; 
                            left: 0; 
                            background: #2c2c2c; 
                            border: 1px solid #3d3d3d; 
                            border-radius: 6px; 
                            margin-top: 4px; 
                            max-height: 200px; 
                            overflow-y: auto; 
                            z-index: 99999;">
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
            // Add styles to dropdown items
            dropdownItems.forEach(item => {
                item.style.padding = '8px 12px';
                item.style.cursor = 'pointer';
                item.style.transition = 'background-color 0.2s ease';
                item.style.color = 'white';
            });

            fontSelect.addEventListener('click', (e) => {
                console.log('🖱️ Font select clicked');
                e.stopPropagation();
                const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
                dropdown.style.display = isHidden ? 'block' : 'none';
                arrow.style.transform = isHidden ? 'rotate(180deg)' : '';
                console.log('Dropdown visibility:', dropdown.style.display);

                // Log dropdown position and dimensions
                if (isHidden) {
                    const rect = dropdown.getBoundingClientRect();
                    console.log('Dropdown position:', {
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                        visible: rect.top > 0 && rect.top < window.innerHeight
                    });
                }
            });

            // Add hover effect to dropdown items
            dropdownItems.forEach(item => {
                item.addEventListener('mouseover', () => {
                    item.style.backgroundColor = '#EF7C2F';
                });
                item.addEventListener('mouseout', () => {
                    item.style.backgroundColor = '';
                });
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
                dropdown.style.display = 'none';
                arrow.style.transform = '';
            }
        });
    }, 500);

    return htmlString;
}