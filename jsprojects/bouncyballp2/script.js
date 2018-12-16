var balls = [];

function setup() {
  var myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas");
  let ball = new Ball();
  balls.push(ball);
}

function draw() {
  background("#121212");
  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].update();
    balls[i].show();
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xv = random(1, 5);
    this.yv = random(1, 5);
    this.length = 10;
    this.r = random(10, 255);
    this.b = random(10, 255);
  }
  update() {
    this.x += this.xv;
    this.y += this.yv;
    if (this.x < 0) {
      this.xv *= -1;
      let ball = new Ball();
      ball.x = this.x;
      ball.y = this.y;
      ball.xv = this.xv;
      ball.yv = this.yv * -1;
      balls.push(ball);
    }
    if (this.x > width - this.length) {
      this.xv *= -1;
      let ball = new Ball();
      ball.x = this.x;
      ball.y = this.y;
      ball.xv = this.xv;
      ball.yv = this.yv * -1;
      balls.push(ball);
    }
    if (this.y < 0) {
      this.yv *= -1;
      let ball = new Ball();
      ball.x = this.x;
      ball.y = this.y;
      ball.yv = this.yv;
      ball.xv = this.xv * -1;
      balls.push(ball);
    }
    if (this.y > height - this.length) {
      this.yv *= -1;
      let ball = new Ball();
      ball.x = this.x;
      ball.y = this.y;
      ball.yv = this.yv;
      ball.xv = this.xv * -1;
      balls.push(ball);
    }
  }
  show() {
    fill(this.r, 125, this.b);
    rect(this.x, this.y, this.length, this.length);
  }
}
