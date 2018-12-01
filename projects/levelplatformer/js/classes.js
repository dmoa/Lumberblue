//platforms
class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  show() {
    fill("#FFFFFF");
    rect(this.x, this.y, this.width, this.height);
  }
}

class Exit {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    show() {
      fill("#616");
      rect(this.x, this.y, this.width, this.height);
    }
}
