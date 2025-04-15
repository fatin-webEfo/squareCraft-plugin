export function getSquarespaceThemeStyles() {
    const result = {
      fonts: new Set(),
      fontSizes: new Set(),
      buttons: [],
      colors: new Set(),
    };
  
    const stylesheets = [...document.styleSheets];
  
    stylesheets.forEach(sheet => {
      try {
        const rules = [...sheet.cssRules || []];
  
        rules.forEach(rule => {
          const selector = rule.selectorText || "";
          const style = rule.style;
  
          if (!style) return;
  
          if (style.fontFamily) {
            result.fonts.add(style.fontFamily.trim());
          }
  
          if (style.fontSize) {
            result.fontSizes.add(style.fontSize.trim());
          }
  
          for (let i = 0; i < style.length; i++) {
            const prop = style[i];
            const value = style.getPropertyValue(prop).trim();
            if (prop.includes("color") && value.startsWith("#")) {
              result.colors.add(value);
            }
          }
  
          if (selector.includes("button") || selector.includes(".sqs-block-button-element") || selector.includes(".button")) {
            result.buttons.push({
              selector,
              backgroundColor: style.backgroundColor || null,
              color: style.color || null,
              borderRadius: style.borderRadius || null,
              fontSize: style.fontSize || null,
              fontFamily: style.fontFamily || null
            });
          }
        });
  
      } catch (e) {
      }
    });
  
    const finalResult = {
      fonts: [...result.fonts],
      fontSizes: [...result.fontSizes],
      colors: [...result.colors],
      buttons: result.buttons
    };
  
    console.log("🎨 Fonts:", finalResult.fonts);
    console.log("🔠 Font Sizes:", finalResult.fontSizes);
    console.log("🎯 Buttons:", finalResult.buttons);
    console.log("🌈 Colors:", finalResult.colors);
  
    return finalResult;
  }
  