let bars1 = [];
let bars2 = [];
let whitelines = [];
let ex;
let i = 0;

function setup() {
  createCanvas(800, 600);
  background(0);
  ex = createGraphics(30, 30);
  ex.line(0, 15, 30, 15);
  ex.line(15, 0, 15, 30);
  image(ex, 385, 285);

  let step = 6.28319 / 12;

  for (let i = 0; i < 16; i++) {
    whitelines[i] = {
      canvas: createGraphics(800, 20),
      x: 0,
      y: 0 + i * 40
    };
  }

  for (let i = 0; i < 16; i++) {
    bars1[i] = {
      canvas: createGraphics(100, 20),
      x: 200,
      y: 0 + i * 40
    };
  }

  for (let i = 0; i < 16; i++) {
    bars2[i] = {
      canvas: createGraphics(100, 20),
      x: 500,
      y: 20 + i * 40
    };
  }
}

function draw() {
  whitelines.forEach(element => {
    element.canvas.noStroke();
    element.canvas.fill(256);
    element.canvas.rect(0, 0, 800, 20);
    image(element.canvas, element.x, element.y);
  });

  bars1.forEach(element => {
    element.canvas.noStroke();
    element.canvas.fill(150, 150, 150);
    element.canvas.rect(0, 0, 100, 20);
    image(element.canvas, element.x, element.y);
  });

  bars2.forEach(element => {
    element.canvas.noStroke();
    element.canvas.fill(150, 150, 150);
    element.canvas.rect(0, 0, 100, 20);
    image(element.canvas, element.x, element.y);
  });

  if (mouseIsPressed) {
    whitelines.forEach(element => {
      element.canvas.noStroke();
      element.canvas.fill(0);
      element.canvas.rect(0, 0, 800, 20);
      image(element.canvas, element.x, element.y);
    });

    bars1.forEach(element => {
      element.canvas.noStroke();
      element.canvas.fill(150, 150, 150);
      element.canvas.rect(0, 0, 100, 20);
      image(element.canvas, element.x, element.y);
    });
  }
}
