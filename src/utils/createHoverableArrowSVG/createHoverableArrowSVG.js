export function createHoverableArrowSVG(id, rotate = false) {
  const parser = new DOMParser();
  const svgString = `
    <svg width="9" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg"
         class="sc-hover-arrow sc-arrow-trigger sc-arrow-placeholder${rotate ? ' sc-rotate-180' : ''}" id="${id}">
      <path id="Vector 175" d="M11.5 5L6.5 1L1.5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  return doc.documentElement;
}
