let x1 = 0;
let x2 = 800;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  //background(110);
  line(650, 100, 150, 100);
  line(650, 240, 150, 240);
  line(x1,0,x2, 340)
  drawLine();
  strokeWeight(1);
}

function drawLine(){
  if(x1<800){
    x1 += 15;  
  } 
  if(x2>0){
    x2 -= 15;
  }
}
