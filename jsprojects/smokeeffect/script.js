let particles = [];

function setup() {
    // createCanvas(windowWidth,windowHeight);
    var myCanvas = createCanvas(600, 400);
    myCanvas.parent("canvas");
    let p = new Particle();
    particles.push(p);
}

function draw() {
    background("#121212");
    for (let i = 0; i < 5; i++) {
      let p = new Particle();
      particles.push(p);
    }
    for (let i = particles.length-1; i >= 0 ; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
            particles.splice(i, 1);
        }
    }
    fill(57,27,14,230);
    rect(275,300,50,100);
}

class Particle {
    constructor() {
        this.x = 300;
        this.y = 300;
        this.vx = random(-1, 1);
        this.vy = random(-5, -1);
        this.alpha = 255;
        this.r = random(50,55);
        this.b = random(50,55);
        this.g = random(50,55);
    }
    finished() {
        return this.alpha < 0;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.xv-=0.1;
        this.vy-=0.1;
        this.alpha -= 5;
    }
    show() {
        noStroke();
        fill(this.r,this.b,this.g, this.alpha);
        ellipse(this.x, this.y, 16);
    }
}
