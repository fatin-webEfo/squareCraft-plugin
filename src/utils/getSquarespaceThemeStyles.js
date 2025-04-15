export async function getSquarespaceThemeStyles() {
  const paletteVars = [
    '--accent-hsl',
    '--black-hsl',
    '--white-hsl',
    '--darkAccent-hsl',
    '--lightAccent-hsl'
  ];

  function getColorFromVariable(varName) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value ? `hsl(${value})` : null;
  }

  async function logThemeStyles() {
    const fonts = new Set();
    const fontSizes = new Set();
    const buttons = [];

    document.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.fontFamily) fonts.add(style.fontFamily);
      if (style.fontSize) fontSizes.add(style.fontSize);
    });

    const themeColors = {};
    paletteVars.forEach(varName => {
      const color = getColorFromVariable(varName);
      if (color) {
        themeColors[varName] = color;
      }
    });

    console.clear();
    console.log("🎨 Fonts:", [...fonts]);
    console.log("🔠 Font Sizes:", [...fontSizes]);
    console.log("🎯 Buttons: (detecting skipped for speed)");
    console.log("🌈 Theme Colors:", themeColors);
  }

  let lastSnapshot = '';

  async function startTracking() {
    setInterval(async () => {
      const htmlSnapshot = document.body.innerHTML.length;
      if (htmlSnapshot !== lastSnapshot) {
        lastSnapshot = htmlSnapshot;
        await logThemeStyles();
      }
    }, 2000);
  }

  await startTracking();
}
