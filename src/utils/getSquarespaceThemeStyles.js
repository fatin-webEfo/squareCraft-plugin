export async function getSquarespaceThemeStyles() {
  let lastSnapshot = "";

  function normalizeColor(value) {
    return value
      .replace(/\s+/g, "")
      .toLowerCase()
      .replace(/;$/, "");
  }

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
            if (
              prop.includes("color") &&
              value &&
              value !== "inherit" &&
              value !== "transparent" &&
              value !== "currentColor"
            ) {
              result.colors.add(normalizeColor(value));
            }
          }

          const isThemeButton =
            selector.includes("button") ||
            selector.includes(".sqs-block-button-element") ||
            selector.includes(".button");

          const bg = style.backgroundColor;
          const color = style.color;
          const radius = style.borderRadius;
          const fontSize = style.fontSize;
          const fontFamily = style.fontFamily;

          if (
            isThemeButton &&
            (bg || color || radius || fontSize || fontFamily)
          ) {
            result.buttons.push({
              selector: selector.slice(0, 100),
              backgroundColor: bg || null,
              color: color || null,
              borderRadius: radius || null,
              fontSize: fontSize || null,
              fontFamily: fontFamily || null,
            });
          }
        });
      } catch (e) {}
    }

    const uniqueButtons = [];
    const seen = new Set();
    for (const btn of result.buttons) {
      const key = JSON.stringify(btn);
      if (!seen.has(key)) {
        uniqueButtons.push(btn);
        seen.add(key);
      }
    }

    const cleanColors = [...result.colors].filter((c, i, arr) => arr.indexOf(c) === i);

    return {
      fonts: [...result.fonts],
      fontSizes: [...result.fontSizes],
      buttons: uniqueButtons.slice(0, 5),
      colors: cleanColors.slice(0, 10),
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
