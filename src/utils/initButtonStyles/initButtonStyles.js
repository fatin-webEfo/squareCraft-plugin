export function initButtonStyles(selectedButtonElement) {
    if (!selectedButtonElement) return;

    const fontFamilyOptions = document.getElementById("buttonFontFamilyOptions");
    const fontSizeInput = document.getElementById("scButtonFontSizeInput");
    const fontWeightOptions = document.getElementById("scButtonFontWeightOptions");
    const letterSpacingInput = document.getElementById("scLetterSpacingInput");
    const fontSizeOptions = document.getElementById("scButtonFontSizeOptions");

    const buttonContainer = selectedButtonElement.querySelector('.sqs-block-button-container');
    if (!buttonContainer) return;

    let buttonElement = buttonContainer.querySelector('a.sqs-block-button-element');
    if (!buttonElement) {
        buttonElement = buttonContainer.querySelector('button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary');
    }
    if (!buttonElement) return;

    let buttonTypeClass = "sqs-button-element--primary";
    if (buttonElement.classList.contains("sqs-button-element--secondary")) {
        buttonTypeClass = "sqs-button-element--secondary";
    } else if (buttonElement.classList.contains("sqs-button-element--tertiary")) {
        buttonTypeClass = "sqs-button-element--tertiary";
    }

    function getAllSameTypeSpansFromBody() {
        return Array.from(document.body.querySelectorAll(`a.${buttonTypeClass}, button.${buttonTypeClass}`))
            .map(btn => btn.querySelector('.sqs-html span') || btn.querySelector('.sqs-add-to-cart-button-inner') || btn.querySelector('span'))
            .filter(span => span);
    }

    function getAllSameTypeContainersFromBody() {
        return Array.from(document.body.querySelectorAll(`a.${buttonTypeClass}, button.${buttonTypeClass}`))
            .map(btn => btn.closest('.sqs-block-button-container'))
            .filter(container => container);
    }

    function applyStyleToSpans(property, value) {
        getAllSameTypeSpansFromBody().forEach(span => {
            span.style.setProperty(property, value, 'important');
        });
    }

    function applyAlignmentToContainers(align) {
        getAllSameTypeContainersFromBody().forEach(container => {
            container.style.setProperty('text-align', align, 'important');
        });
    }

    if (fontFamilyOptions) {
        fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                const fontFamily = item.style.fontFamily;
                applyStyleToSpans('font-family', fontFamily);
            });
        });
    }

    if (fontSizeOptions && fontSizeInput) {
        fontSizeOptions.querySelectorAll(".sc-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                const selectedSize = item.getAttribute("data-value");
                fontSizeInput.value = selectedSize;
                fontSizeInput.dispatchEvent(new Event('input'));
            });
        });
        fontSizeInput.addEventListener("input", (e) => {
            const fontSize = e.target.value;
            applyStyleToSpans('font-size', `${fontSize}px`);
        });
    }

    if (fontWeightOptions) {
        fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                const fontWeight = item.innerText.trim();
                applyStyleToSpans('font-weight', fontWeight);
            });
        });
    }

    if (letterSpacingInput) {
        letterSpacingInput.addEventListener("input", (e) => {
            const spacing = e.target.value.replace('px', '');
            applyStyleToSpans('letter-spacing', `${spacing}px`);
        });
    }

    ["scTextAlignLeft", "scTextAlignCenter", "scTextAlignRight", "scTextAlignJustify"].forEach(id => {
        const alignButton = document.getElementById(id);
        if (alignButton) {
            alignButton.addEventListener("click", () => {
                const align = alignButton.getAttribute("data-align");
                applyAlignmentToContainers(align);
            });
        }
    });
}
