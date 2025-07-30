console.log("✅ SquareCraft plugin loaded from Link file section!");

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://fatin-webefo.github.io/squareCraft-plugin/index.css?v=" + Date.now();
styleLink.type = "text/css";
styleLink.media = "all";
document.head.appendChild(styleLink);


// Inject test class after load
styleLink.onload = () => {
  console.log("✅ CSS file loaded and applied.");
  document.body.classList.add("sc-test");
};

// index.js