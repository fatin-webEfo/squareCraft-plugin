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

    function getAllSameTypeButtons() {
        return Array.from(document.body.querySelectorAll(`a.${buttonTypeClass}, button.${buttonTypeClass}`));
    }

    function updateExternalStyles(property, value) {
        const styleId = `sc-button-style-${buttonTypeClass.replace(/--/g, "-")}`;
        let styleTag = document.getElementById(styleId);

        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
        }

        const spansSelector = `a.${buttonTypeClass} .sqs-html span, button.${buttonTypeClass} .sqs-add-to-cart-button-inner, button.${buttonTypeClass} span`;
        const buttonContainerSelector = `a.${buttonTypeClass}, button.${buttonTypeClass}`;

        if (property === "text-align") {
            styleTag.innerHTML = `${buttonContainerSelector} { text-align: ${value} !important; }` + (styleTag.innerHTML || "");
        } else {
            let rules = styleTag.innerHTML.split("}").filter(Boolean).map(rule => rule + "}");
            let existingSpanRule = rules.find(r => r.includes(spansSelector));

            if (existingSpanRule) {
                let updatedRule = existingSpanRule.replace(new RegExp(`${property}:.*?;`, "g"), "").replace("}", ` ${property}: ${value} !important; }`);
                rules = rules.map(r => r.includes(spansSelector) ? updatedRule : r);
            } else {
                rules.push(`${spansSelector} { ${property}: ${value} !important; }`);
            }

            styleTag.innerHTML = rules.join("\n");
        }
    }

    if (fontFamilyOptions) {
        fontFamilyOptions.querySelectorAll(".sc-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                const fontFamily = item.style.fontFamily;
                updateExternalStyles('font-family', fontFamily);
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
            updateExternalStyles('font-size', `${fontSize}px`);
        });
    }

    if (fontWeightOptions) {
        fontWeightOptions.querySelectorAll(".sc-dropdown-item").forEach(item => {
            item.addEventListener("click", () => {
                const fontWeight = item.innerText.trim();
                updateExternalStyles('font-weight', fontWeight);
            });
        });
    }

    if (letterSpacingInput) {
        letterSpacingInput.addEventListener("input", (e) => {
            const spacing = e.target.value.replace('px', '');
            updateExternalStyles('letter-spacing', `${spacing}px`);
        });
    }

    ["scTextAlignLeft", "scTextAlignCenter", "scTextAlignRight", "scTextAlignJustify"].forEach(id => {
        const alignButton = document.getElementById(id);
        if (alignButton) {
            alignButton.addEventListener("click", () => {
                const align = alignButton.getAttribute("data-align");
                updateExternalStyles('text-align', align);
            });
        }
    });
}
