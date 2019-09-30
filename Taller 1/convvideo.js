var img;
const convMatrix = [[1, 0, -1],[0, 0, 0],[-1, 0, 1]]
let convImg;

var video;
var convVideo;

function preload(){
    img = loadImage('https://ichef.bbci.co.uk/images/ic/768x432/p049tgdb.jpg');
    video = createCapture(VIDEO);
    video.size(640,480);
    video.hide();
}

function setup() {
  createCanvas(img.width*3, img.height*3);
  convImg = createGraphics(video.width, video.height);
  background(800);
  image(img, 0, video.height, img.width, img.height);
  img.loadPixels();
  convImg = img.get();
  convImg.loadPixels();
  imageConvolution(convImg, img);
  convImg.updatePixels();
  image(convImg, img.width, video.height, img.width, img.height);
}

function draw(){
  image(video, 0,0, video.width, video.height);
  convVideo = video.get();
  convVideo.loadPixels();
  video.loadPixels();
  imageConvolution(convVideo, video);
  convVideo.updatePixels();
  image(convVideo, video.width,0, video.width, video.height);
}

function imageConvolution(dta, orig){
  let size = 4*img.width*img.height;
  for (let i = 0; i < size; i += 4) {
    dta.pixels[i] = updatedPixels(i, orig);
    dta.pixels[i+1] = updatedPixels(i+1, orig);
    dta.pixels[i+2] = updatedPixels(i+2, orig);
  }
   
};

function updatedPixels(i, orig){
  return (pixelConvoluted(i-4-orig.width*4,0,0, orig) +
      pixelConvoluted(i-orig.width*4,0,1, orig) +
      pixelConvoluted(i-4,1,0, orig) +
      pixelConvoluted(i+orig.width*4,2,1, orig) +
      pixelConvoluted(i+4,1,2, orig) +
      pixelConvoluted(i,1,1, orig) +
      pixelConvoluted(i+4+orig.width*4,2,2, orig) +
      pixelConvoluted(i-4+orig.width*4,2,0, orig) +
      pixelConvoluted(i+4-orig.width*4,0,2, orig))
}

function pixelConvoluted(i, x, y, orig){
  return orig.pixels[i]*convMatrix[x][y]
}
