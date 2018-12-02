//platforms
class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  show() {
    fill("#888888");
    rect(this.x, this.y, this.width, this.height);
  }
}

let exitcolors = ["#616", "#626", "#800080", "#7815A9", "	#9F00C5", "#DF00FF"];

class Exit {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = exitcolors[Math.floor(Math.random() * exitcolors.length)];
    }
    show() {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }
}
