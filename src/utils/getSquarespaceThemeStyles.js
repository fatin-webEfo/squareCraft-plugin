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

  function createColorSwatch(color) {
    const div = document.createElement('div');
    div.className = 'sc-w-6 sc-h-6 sc-rounded-full sc-cursor-pointer sc-border';
    div.style.backgroundColor = color;
    div.title = color;
    div.addEventListener('click', () => {
      console.log("🎨 Selected color:", color);
    });
    return div;
  }

  function toggleColorPalette() {
    const dropdown = document.getElementById('colorPaletteDropdown');
    if (dropdown.classList.contains('sc-hidden')) {
      dropdown.classList.remove('sc-hidden');
      dropdown.innerHTML = '';

      paletteVars.forEach(varName => {
        const color = getColorFromVariable(varName);
        if (color) {
          dropdown.appendChild(createColorSwatch(color));
        }
      });
    } else {
      dropdown.classList.add('sc-hidden');
    }
  }

  document.getElementById('colorPalette').addEventListener('click', toggleColorPalette);
}
