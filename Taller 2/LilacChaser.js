let circles = [];
let ex;
let i = 0;

function setup() {
  createCanvas(800, 600);
  background(153);
  ex = createGraphics(30, 30);
  ex.line(0, 15, 30, 15);
  ex.line(15, 0, 15, 30);
  image(ex, 385, 285);

  let step = 6.28319 / 12;

  for (let i = 0; i < 12; i++) {
    circles[i] = {
      canvas: createGraphics(30, 30),
      x: 200 * cos(i * step),
      y: 200 * sin(i * step)
    };
  }
}

function draw() {
  circles.forEach(element => {
    element.canvas.noStroke();
    element.canvas.fill(256, 0, 256);
    //element.canvas.ellipse(15, 15, 30);
    image(element.canvas, element.x + 385, element.y + 285);
  });
}

var mine = setInterval(() => {
  circles[i % 12].canvas.clear();
  circles[i % 12].canvas.fill(256, 0, 256);
  circles[i % 12].canvas.ellipse(15, 15, 30);

  setTimeout(() => {
    circles[i % 12].canvas.clear();
    circles[i % 12].canvas.fill(153, 153, 153);
    circles[i % 12].canvas.ellipse(15, 15, 30);
  }, 200);
  i++;
}, 200);
