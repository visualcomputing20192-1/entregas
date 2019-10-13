let Vx1 = 200;
let Vx2 = 200;
let Vy1 = 100;
let Vy2 = 200;

let Hx1 = 250;
let Hx2 = 150;
let Hy1 = 200;
let Hy2 = 200;

var line1;
var line2;

function setup() {
  createCanvas(410, 300);
  noLoop();
  Vert = line(Vx1, Vy1, Vx2, Vy2);
  Vert.stroke('blue');
  Hor = line(Hx1, Hy1, Hx2, Hy2);
  Hor.stroke('red');
}

function draw() {
  background(204);
  Vert = line(Vx1, Vy1, Vx2, Vy2);
  Vert.stroke('blue');
  Hor = line(Hx1, Hy1, Hx2, Hy2);
  Hor.stroke('red');
}

function mousePressed() {
  if (Hx1 !== Vx1) {
    Vx1 = Hx1;
    Vx2 = Hx2;
    Vy1 = 150;
    Vy2 = 150;
  } else {
    Vx1 = 200;
    Vx2 = 200;
    Vy1 = 100;
    Vy2 = 200;
  }
  redraw();
}

