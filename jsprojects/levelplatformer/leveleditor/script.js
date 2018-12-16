function setup() {
  let myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas");
}

let rectangle = new Rectangle(100, 100, 100);

function draw() {
  background("#121212");

  rectangle.draw();
  rectangle.update(false);
}

function mousePressed() {
  rectangle.update(true);
}

function mouseReleased() {
  rectangle.followmouse.on = false;
}
