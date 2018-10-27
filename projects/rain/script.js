var particles = []
var numparticles = 60;
function setup() {
  // createCanvas(windowWidth,windowHeight);
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent("canvas");
  for (let i = 0; i < numparticles; i++) {
    let p = new Particle();
    particles.push(p);
  }
}

function draw() {
  background("#121212");
  for (let i = particles.length-1; i >= 0 ; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].finished()) {
          particles.splice(i, 1);
          let p = new Particle();
          particles.push(p);
      }
  }
}

class Particle {
  constructor() {
    this.x = random(0,width);
    this.y = random(-20,-70);
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
    noStroke();
    fill(0, 125, 0);
    rect(this.x, this.y, 2, 15);
  }
}
