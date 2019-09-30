let img;
function preload() {
  img = loadImage('https://static01.nyt.com/images/2019/09/17/world/17indonesia-fire-1/merlin_160780767_7fe8f349-b026-4376-9920-b12ef80d57f1-articleLarge.jpg?quality=75&auto=webp&disable=upscale');
}

function setup() {
  createCanvas(img.width*3, img.height*3);
  image(img, 0, 0);
  grayScale();
  luma();
}

function normal() {
  image(img, 0, 0);
}

function grayScale() {
  let d = 1;
  let length = 4 * (width * d) * (height * d);
  let original = img.get();
  original.loadPixels();

  for (let i = 0; i < length; i += 4) {
    let average =
      (original.pixels[i] + original.pixels[i + 1] + original.pixels[i + 2]) /
      3;
    original.pixels[i] = average;
    original.pixels[i + 1] = average;
    original.pixels[i + 2] = average;
  }
  original.updatePixels();
  image(original, img.width, 0);
}

function luma() {
  let d = 1;
  let length = 4 * (width * d) * (height * d);
  let original = img.get();
  original.loadPixels();

  for (let i = 0; i < length; i += 4) {
    let average =
      (original.pixels[i]*0.3 + original.pixels[i + 1]*0.59 + original.pixels[i + 2]*0.11);
    original.pixels[i] = average;
    original.pixels[i + 1] = average;
    original.pixels[i + 2] = average;
  }
  original.updatePixels();
  image(original, img.width, img.height);
}

