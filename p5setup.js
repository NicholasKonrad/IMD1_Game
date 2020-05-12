new p5();

width = windowWidth;
height = windowHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
}

function resizeHandler() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
}

window.addEventListener("resize", resizeHandler);
