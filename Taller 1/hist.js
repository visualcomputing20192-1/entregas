let img;
let hist;

let threshold = 100;

function preload() {
  img = loadImage(
    'https://static01.nyt.com/images/2019/09/17/world/17indonesia-fire-1/merlin_160780767_7fe8f349-b026-4376-9920-b12ef80d57f1-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
  );
}

function setup() {
  hist = [];
  for (let i = 0; i < 256; i++) {
    hist[i] = 0;
  }

  createCanvas(img.width * 3, img.height * 3);
  image(img, 0, 0);
  grayscale();
  histogram();
  segmented();
}

function normal() {
  image(img, 0, 0);
}

function grayscale() {
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

function histogram() {
  let d = 1;
  let length = 4 * (width * d) * (height * d);
  let original = img.get();
  original.loadPixels();

  for (let i = 0; i < length; i += 4) {
    let average = (
      (original.pixels[i] + original.pixels[i + 1] + original.pixels[i + 2]) /
      3
    ).toFixed(0);

    hist[average] += 1;
  }

  stroke(300, 100, 80);
  translate(10, 0);
  for (x = 0; x < 256; x++) {
    index = hist[x];
    console.log(index);

    y1 = img.height - (index * img.height) / max(hist);
    y2 = img.height;

    xPos = (img.width / 255) * x;

    line(img.width + xPos, y1, img.width + xPos, y2);
  }
}

function segmented() {
  let d = 1;
  let length = 4 * (width * d) * (height * d);
  let original = img.get();
  original.loadPixels();

  for (let i = 0; i < length; i += 4) {
    let average =
      original.pixels[i] + original.pixels[i + 1] + original.pixels[i + 2] / 3;

    original.pixels[i] = average > threshold ? 255 : 1;
    original.pixels[i + 1] = average > threshold ? 255 : 1;
    original.pixels[i + 2] = average > threshold ? 255 : 1;
  }
  original.updatePixels();
  image(original, img.width, img.height);
}
