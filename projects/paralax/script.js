let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
const CTX_W = canvas.width;
const CTX_W_M = canvas.width / 2;
const CTX_H = canvas.height;
const CTX_H_M = canvas.height / 2;
let fps = 0;
let lastFpsUpdate = 0;
let lastFpsUpdateTime = 0;
let skyV = 50;
let grassV = 90;
let lastTime = 0;
let skyOffset = 0;
let grassOffset = 0;


let grass = new Image();
let base_image = new Image();
base_image.src = 'cloudsDarker.png';
grass.src = 'grass.png';



//updating coordinates
function update(now) {
  fps = calFps(now);
  skyOffset = skyOffset < CTX_W ? skyOffset + skyV / fps : 0;
  grassOffset = grassOffset < CTX_W ? grassOffset + grassV / fps : 0;
}

//calculating fps
function calFps(now) {
    let fps = 1000 / (now - lastTime);
    lastTime = now;
    return fps;
}

//drawing
function draw() {
  ctx.save(); //
  ctx.translate(-skyOffset,0);
  ctx.drawImage(base_image,0,0);
  ctx.drawImage(base_image,base_image.width-10,0);
  ctx.restore(); // takes it back to the previous coordinates of 0,0

  ctx.save(); //
  ctx.translate(-grassOffset,0);
  ctx.drawImage(grass,0,CTX_H-grass.height);
  ctx.drawImage(grass,grass.width-10,CTX_H-grass.height);
  ctx.drawImage(grass,(grass.width-10)*2,CTX_H-grass.height);
  ctx.restore(); // takes it back to the previous coordinates of 0,0
}

//executing function
function animate(now) {
    if (now == undefined) {
        now = (+new Date);
    }
    draw();
    update(now);
    window.requestAnimationFrame(animate);
}

animate();
