//platforms
class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  show() {
    rect(this.x, this.y, this.width, this.height);
  }
}


//for rain
class Particle {
  constructor() {
    this.x = random(0, width);
    this.y = random(-20, -300);
    this.vx = random(-0.01, 0.01);
    this.vy = random(3, 6);
  }
  finished() {
    return this.y > height;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
  show() {
    fill("#EEEEEE");
    rect(this.x, this.y, 2, 15);
  }
}
