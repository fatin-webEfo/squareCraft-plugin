
console.log('SquareCraft plugin loaded from Link file section!');

// Add your plugin code here
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href =
    "https://fatin-webefo.github.io/squareCraft-plugin/index.css";
  styleLink.type = "text/css";
  styleLink.media = "all";
  document.head.appendChild(styleLink);