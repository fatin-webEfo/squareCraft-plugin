export function createHoverableArrowSVG() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "13");
    svg.setAttribute("height", "6");
    svg.setAttribute("viewBox", "0 0 13 6");
    svg.setAttribute("fill", "none");
    svg.classList.add("sc-hover-arrow");
  
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M11.5 5L6.5 1L1.5 5");
    path.setAttribute("stroke", "white");
    path.setAttribute("stroke-width", "1.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
  
    svg.appendChild(path);
    return svg;
  }
  