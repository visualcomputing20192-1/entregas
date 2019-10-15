void setup(){
  size(1024, 1024);
  smooth();
  fill(64);
  noStroke();
}

void draw(){
  background(196);
  for (int x = 0; x < 1024; x = x + 50){
    for (int y = 0; y < 1024; y = y + 50){
      rect(x, y, 40, 40);
    }
  }
}
