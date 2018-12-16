class Rectangle {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.followmouse = {
      on: false,
      x: 0,
      y: 0
    }
  }
  draw() {
    noStroke();
    fill("#FFFFFF");
    rect(this.x, this.y, this.length, this.length);
  }
  update(mouseClicked) {
    this.changingCoords(mouseClicked);
    this.enforcingBoundaries();
  }
  enforcingBoundaries() {
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.length > width) {
      this.x = width - this.length;
    }

    if (this.y + this.length > height) {
      this.y = height - this.length;
    }
  }
  changingCoords(mouseClicked) {
    if (rectangle.followmouse.on) {
      rectangle.x = mouseX - rectangle.followmouse.x;
      rectangle.y = mouseY - rectangle.followmouse.y;
    }
    if (mouseClicked) {
      if (mouseX > this.x &&
        mouseX < this.x + this.length &&
        mouseY > this.y && mouseY < this.y + this.length) {
        this.followmouse.on = true;
        this.followmouse.x = mouseX - this.x;
        this.followmouse.y = mouseY - this.y;
      }
    }
  }
}
