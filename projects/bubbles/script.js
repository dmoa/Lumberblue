let particles = [];
function setup() {
    var myCanvas = createCanvas(windowWidth,windowHeight);
    myCanvas.parent("canvas");
    let p = new Particle();
    particles.push(p);
}

function draw() {
    background("#121212");
    let p = new Particle();
    particles.push(p);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
      if (particles[i].y<-17) {
        particles.splice(i,1);
      }
    }
    rect(windowWidth/2-25,windowHeight-100,50,100);
}

class Particle {
  constructor() {
    this.x = windowWidth/2;
    this.y = windowHeight-100;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
  show() {
    stroke(255);
    fill(255, 10);
    ellipse(this.x,this.y,16);
  }
}
