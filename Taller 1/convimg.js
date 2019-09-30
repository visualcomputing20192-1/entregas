var img;
const convMatrix = [[1, 0 , -1],[0, 0, 0],[-1, 0, 1]]

function preload(){
    img = loadImage('https://images.unsplash.com/photo-1470723710355-95304d8aece4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80%27');
}

function setup() {
  createCanvas(img.width*2, img.height);
  convImg = createGraphics(250, 250);
  background(800);
  image(img, 0, 0, img.width, img.height);
  img.loadPixels();
  imageConvolution();
  img.updatePixels();
  image(img, img.width, 0, img.width, img.height);
}

function imageConvolution(){
  let size = 4*img.width*img.height;
  for (let i = 0; i < size; i += 4) {
    img.pixels[i] = (
      pixelConvoluted(i-4-img.width*4,0,0) +
      pixelConvoluted(i-img.width*4,0,1) +
      pixelConvoluted(i-4,1,0) +
      pixelConvoluted(i+img.width*4,2,1) +
      pixelConvoluted(i+4,1,2) +
      pixelConvoluted(i,1,1) +
      pixelConvoluted(i+4+img.width*4,2,2) +
      pixelConvoluted(i-4+img.width*4,2,0) +
      pixelConvoluted(i+4-img.width*4,0,2)
    );
  };
};

function pixelConvoluted(i, x, y){
  return img.pixels[i]*convMatrix[x][y]
}

