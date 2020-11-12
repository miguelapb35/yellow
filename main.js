"use strict";

const svg = document.querySelector("svg");
const paths = svg.getElementsByTagName("path");
const zoom = 20;

if (window.location.href.indexOf("fullcpgrid") > -1) {

  // no animation in grid/preview mode
  for (const path of paths) {
    path.style.opacity = 1;
  }

} else {

  // -- WEB ANIMATIONS API (WAAPI) ----

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const seg = path.getPointAtLength(0);
    path.animate(
      {
        opacity: [0, 1],
        transform: [
          `matrix(${zoom}, 0, 0, ${zoom}, ${seg.x - zoom * seg.x}, ${seg.y - zoom * seg.y
          }`,
          "matrix(1, 0, 0, 1, 0, 0)"
        ],
        offset: [0, 1]
      },
      {
        duration: 5000,
        iterations: 1,
        delay: -1000 + paths.length * 50 - i * 50,
        fill: "forwards",
        easing: "ease-in-out"
      }
    );
  }
}