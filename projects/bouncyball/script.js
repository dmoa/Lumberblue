var balls = [];
function setup() {
  var myCanvas = createCanvas(400, 400);
  myCanvas.parent("canvas");
  let ball = new Ball();
  balls.push(ball);
}

function draw() {
  background("#121212");
  for (let i = balls.length-1; i >= 0 ; i--) {
      balls[i].update();
      balls[i].show();
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xv = random(1,5);
    this.yv = random(1,5);
    this.length = 10;
    this.r = random(10,255);
    this.b = random(10,255);
  }
  update() {
    this.x += this.xv;
    this.y += this.yv;
    if (this.x > width - this.length || this.x < 0) {
      this.xv *=-1
    }
    if (this.y > height - this.length || this.y < 0) {
      this.yv *=-1
    }
  }
  show() {
    fill(this.r,125,this.b);
    rect(this.x,this.y,this.length,this.length);
  }
}
function keyPressed() {
  if (keyCode === 32) {
    let ball = new Ball();
     ball.x = balls[balls.length-1].x;
     ball.y = balls[balls.length-1].y;
    ball.xv = balls[balls.length-1].xv*-1;
    ball.yv = balls[balls.length-1].yv*-1;
    balls.push(ball);
  }
}
