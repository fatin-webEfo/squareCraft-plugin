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

  async function logThemeColors() {
    const themeColors = {};
    paletteVars.forEach(varName => {
      const color = getColorFromVariable(varName);
      if (color) {
        themeColors[varName] = color;
      }
    });

    console.clear();
    console.log("🌈 Squarespace Theme Colors:", themeColors);
  }

  let lastSnapshot = '';

  async function startTracking() {
    setInterval(async () => {
      const htmlSnapshot = document.body.innerHTML.length;
      if (htmlSnapshot !== lastSnapshot) {
        lastSnapshot = htmlSnapshot;
        await logThemeColors();
      }
    }, 2000);
  }

  await startTracking();
}
