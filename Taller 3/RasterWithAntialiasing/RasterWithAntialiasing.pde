import nub.primitives.*;
import nub.core.*;
import nub.processing.*;

// 1. Nub objects
Scene scene;
Node node;
Vector v1, v2, v3;
Vector p = new Vector(0, 0);
// timing
TimingTask spinningTask;
boolean yDirection;
// scaling is a power of 2
int n = 4;

// 2. Hints
boolean triangleHint = true;
boolean gridHint = true;
boolean debug = true;
boolean shadeHint = false;

// 3. Use FX2D, JAVA2D, P2D or P3D
String renderer = P2D;

// 4. Window dimension
int dim = 9;

void settings() {
  size(int(pow(2, dim)), int(pow(2, dim)), renderer);
}

void setup() {
  rectMode(CENTER);
  scene = new Scene(this);
  if (scene.is3D())
    scene.setType(Scene.Type.ORTHOGRAPHIC);
  scene.setRadius(width/2);
  scene.fit(1);

  // not really needed here but create a spinning task
  // just to illustrate some nub timing features. For
  // example, to see how 3D spinning from the horizon
  // (no bias from above nor from below) induces movement
  // on the node instance (the one used to represent
  // onscreen pixels): upwards or backwards (or to the left
  // vs to the right)?
  // Press ' ' to play it
  // Press 'y' to change the spinning axes defined in the
  // world system.
  spinningTask = new TimingTask(scene) {
    @Override
      public void execute() {
      scene.eye().orbit(scene.is2D() ? new Vector(0, 0, 1) :
        yDirection ? new Vector(0, 1, 0) : new Vector(1, 0, 0), PI / 100);
    }
  };

  node = new Node();
  node.setScaling(width/pow(2, n));

  // init the triangle that's gonna be rasterized
  randomizeTriangle();
}

void draw() {
  background(0);
  stroke(0, 255, 0);
  if (gridHint)
    scene.drawGrid(scene.radius(), (int)pow(2, n));
  if (triangleHint)
    drawTriangleHint();
  push();
  scene.applyTransformation(node);
  triangleRaster();
  pop();
}

// Implement this function to rasterize the triangle.
// Coordinates are given in the node system which has a dimension of 2^n
void triangleRaster() {
  // node.location converts points from world to node
  // here we convert v1 to illustrate the idea
  if (debug) {
    push();
    noStroke();
    fill(255, 0, 0, 125);
    float area = edgeFunction(v1, v2, v3)/2;


    for (int i=(int)-pow(2, n)/2; i<=(int)pow(2, n)/2; i++) {
      for (int j=(int)-pow(2, n)/2; j<=(int)pow(2, n)/2; j++) {
        p.set(i, j);

        float w1_1 = edgeFunction(v2, v3, new Vector(p.x()+0.25, p.y()+0.25))/area;
        float w1_2 = edgeFunction(v2, v3, new Vector(p.x()+0.25, p.y()+0.75))/area;
        float w1_3 = edgeFunction(v2, v3, new Vector(p.x()+0.75, p.y()+0.25))/area;
        float w1_4 = edgeFunction(v2, v3, new Vector(p.x()+0.75, p.y()+0.75))/area;
        float w2_1 = edgeFunction(v3, v1, new Vector(p.x()+0.25, p.y()+0.25))/area;
        float w2_2 = edgeFunction(v3, v1, new Vector(p.x()+0.25, p.y()+0.75))/area;
        float w2_3 = edgeFunction(v3, v1, new Vector(p.x()+0.75, p.y()+0.25))/area;
        float w2_4 = edgeFunction(v3, v1, new Vector(p.x()+0.75, p.y()+0.75))/area;
        float w3_1 = edgeFunction(v1, v2, new Vector(p.x()+0.25, p.y()+0.25))/area;
        float w3_2 = edgeFunction(v1, v2, new Vector(p.x()+0.25, p.y()+0.75))/area;
        float w3_3 = edgeFunction(v1, v2, new Vector(p.x()+0.75, p.y()+0.25))/area;
        float w3_4 = edgeFunction(v1, v2, new Vector(p.x()+0.75, p.y()+0.75))/area;
          
        float w12_1 = edgeFunction(v3, v2, new Vector(p.x()+0.25, p.y()+0.25))/area;
        float w12_2 = edgeFunction(v3, v2, new Vector(p.x()+0.25, p.y()+0.75))/area;
        float w12_3 = edgeFunction(v3, v2, new Vector(p.x()+0.75, p.y()+0.25))/area;
        float w12_4 = edgeFunction(v3, v2, new Vector(p.x()+0.75, p.y()+0.75))/area;
        float w22_1 = edgeFunction(v1, v3, new Vector(p.x()+0.25, p.y()+0.25))/area;
        float w22_2 = edgeFunction(v1, v3, new Vector(p.x()+0.25, p.y()+0.75))/area;
        float w22_3 = edgeFunction(v1, v3, new Vector(p.x()+0.75, p.y()+0.25))/area;
        float w22_4 = edgeFunction(v1, v3, new Vector(p.x()+0.75, p.y()+0.75))/area;
        float w32_1 = edgeFunction(v2, v1, new Vector(p.x()+0.25, p.y()+0.25))/area;
        float w32_2 = edgeFunction(v2, v1, new Vector(p.x()+0.25, p.y()+0.75))/area;
        float w32_3 = edgeFunction(v2, v1, new Vector(p.x()+0.75, p.y()+0.25))/area;
        float w32_4 = edgeFunction(v2, v1, new Vector(p.x()+0.75, p.y()+0.75))/area;
          
        boolean inOne = isIn(w1_1, w2_1, w3_1, w12_1, w22_1, w32_1);
        boolean inTwo = isIn(w1_2, w2_2, w3_2, w12_2, w22_2, w32_2);
        boolean inThree = isIn(w1_3, w2_3, w3_3, w12_3, w22_3, w32_3);
        boolean inFour = isIn(w1_4, w2_4, w3_4, w12_4, w22_4, w32_4);
        float colIntens = inSum(inOne, inTwo, inThree, inFour);
        
        fill(255, colIntens*255);
        square(p.x()+0.5, p.y()+0.5, 1);
      }
    }    
    pop();
  }
}

boolean isIn(float w1, float w2, float w3, float w12, float w22, float w32) {
  return ((w1 >= 0 && w2 >= 0 && w3 >= 0) || (w12 >= 0 && w22 >= 0 && w32 >= 0));
}

float inSum(boolean a, boolean b, boolean c, boolean d) {
  if (a&&b&&c&&d) {
    return 1.0;
  } else if ((a&&b&&c&&(!d))||(a&&b&&(!c)&&d)||(a&&(!b)&&c&&d)||((!a)&&b&&c&&d)) {
    return 0.75;
  } else if ((a&&b&&(!c)&&(!d))||(a&&(!b)&&c&&(!d))||((!a)&&b&&c&&(!d))||(a&&(!b)&&(!c)&&d)||((!a)&&b&&(!c)&&d)||((!a)&&(!b)&&c&&d)) {
    return 0.5;
  } else if ((!a)&&(!b)&&(!c)&&(!d)){
    return 0.0;
  } else {
    return 0.25;
  }
}

float edgeFunction(Vector a, Vector b, Vector p) {

  float e = (p.x() - node.location(a).x())*(node.location(b).y() - node.location(a).y()) - (p.y() - node.location(a).y())*(node.location(b).x() - node.location(a).x()); 
  return e;
}

void randomizeTriangle() {
  int low = -width/2;
  int high = width/2;
  v1 = new Vector(random(low, high), random(low, high));
  v2 = new Vector(random(low, high), random(low, high));
  v3 = new Vector(random(low, high), random(low, high));
}

void drawTriangleHint() {
  push();

  if (shadeHint)
    noStroke();
  else {
    strokeWeight(2);
    noFill();
  }
  beginShape(TRIANGLES);
  if (shadeHint)
    fill(255, 0, 0);
  else
    stroke(255, 0, 0);
  vertex(v1.x(), v1.y());
  if (shadeHint)
    fill(0, 255, 0);
  else
    stroke(0, 255, 0);
  vertex(v2.x(), v2.y());
  if (shadeHint)
    fill(0, 0, 255);
  else
    stroke(0, 0, 255);
  vertex(v3.x(), v3.y());
  endShape();

  strokeWeight(5);
  stroke(255, 0, 0);
  point(v1.x(), v1.y());
  stroke(0, 255, 0);
  point(v2.x(), v2.y());
  stroke(0, 0, 255);
  point(v3.x(), v3.y());

  pop();
}

void keyPressed() {
  if (key == 'g')
    gridHint = !gridHint;
  if (key == 't')
    triangleHint = !triangleHint;
  if (key == 's')
    shadeHint = !shadeHint;
  if (key == 'd')
    debug = !debug;
  if (key == '+') {
    n = n < 7 ? n+1 : 2;
    node.setScaling(width/pow( 2, n));
  }
  if (key == '-') {
    n = n >2 ? n-1 : 7;
    node.setScaling(width/pow( 2, n));
  }
  if (key == 'r')
    randomizeTriangle();
  if (key == ' ')
    if (spinningTask.isActive())
      spinningTask.stop();
    else
      spinningTask.run();
  if (key == 'y')
    yDirection = !yDirection;
}
