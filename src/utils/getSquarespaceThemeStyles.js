export async function startThemeStyleLogger() {
  let lastSnapshot = "";

  async function extractThemeStyles() {
    const result = {
      fonts: new Set(),
      fontSizes: new Set(),
      buttons: [],
      colors: new Set(),
    };

    const stylesheets = [...document.styleSheets];

    for (const sheet of stylesheets) {
      try {
        const rules = sheet.cssRules ? [...sheet.cssRules] : [];
        rules.forEach(rule => {
          const selector = rule.selectorText || "";
          const style = rule.style;
          if (!style) return;

          if (style.fontFamily) result.fonts.add(style.fontFamily.trim());
          if (style.fontSize) result.fontSizes.add(style.fontSize.trim());

          for (let i = 0; i < style.length; i++) {
            const prop = style[i];
            const value = style.getPropertyValue(prop).trim();
            if (prop.includes("color") && value.startsWith("#")) {
              result.colors.add(value);
            }
          }

          if (
            selector.includes("button") ||
            selector.includes(".sqs-block-button-element") ||
            selector.includes(".button")
          ) {
            result.buttons.push({
              selector,
              backgroundColor: style.backgroundColor || null,
              color: style.color || null,
              borderRadius: style.borderRadius || null,
              fontSize: style.fontSize || null,
              fontFamily: style.fontFamily || null,
            });
          }
        });
      } catch (e) {}
    }

    return {
      fonts: [...result.fonts],
      fontSizes: [...result.fontSizes],
      buttons: result.buttons,
      colors: [...result.colors],
    };
  }

  async function startLogging() {
    setInterval(async () => {
      const htmlSnapshot = document.body.innerHTML.length;
      if (htmlSnapshot !== lastSnapshot) {
        lastSnapshot = htmlSnapshot;
        const styles = await extractThemeStyles();
        console.clear();
        console.log("🎨 Fonts:", styles.fonts);
        console.log("🔠 Font Sizes:", styles.fontSizes);
        console.log("🎯 Buttons:", styles.buttons);
        console.log("🌈 Colors:", styles.colors);
      }
    }, 2000);
  }

  await startLogging();
}
