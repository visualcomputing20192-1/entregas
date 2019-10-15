

void setup(){
  size(1024, 1024);
  smooth();
  noStroke();
  fill(0);
}

void draw(){
  background(255);
  int size = 50;
  int osc = 0;
  int sw = 0;
  for (int y = 0; y < 1024; y = y + size){
    for (int x = 0; x < 1024; x = x + size * 2){
      rect(x + osc, y, size, size);
    }
    if(osc == 50) {
      sw = 1;
    } else if(osc == 0){
      sw = 0;
    }
    if(sw == 0){
      osc = osc + 10;
    } else {
      osc = osc - 10;
    }
    stroke(128);
    line(0, y, 1024, y);
    stroke(0);
  }
}
