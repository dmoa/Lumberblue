let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
const CTX_W = canvas.width;
const CTX_W_M = canvas.width / 2;
const CTX_H = canvas.height;
const CTX_H_M = canvas.height / 2;

//spritesheet
let allHailTheOnlySpriteSheet = new Image();
allHailTheOnlySpriteSheet.src = "welcomer.png"

let cuteboiCellTing = [
  {
    up: 1,
    right: 2,
    down: 3,
    left: 4
  },
  { //up
    left: 81,
    top: 6,
    width: 54,
    height: 87
  },
  { //right
    left: 87,
    top: 108,
    width: 14 * 3,
    height: 27 * 3
  },
  { // down
    left: 81,
    top: 198,
    width: 18 * 3,
    height: 29 * 3
  },
  { //left
    left: 87,
    top: 300,
    width: 14 * 3,
    height: 27 * 3
  }
]

let painter = new Painter(cuteboiCellTing);
let spriteyboi = new Sprite('a', [], painter);
spriteyboi.width = 14 * 3;
spriteyboi.height = 27 * 3;
spriteyboi.y = CTX_W/2 - spriteyboi.height;

//so that update doesn't lose scope of painter/this
function updateKeypress(){
  spriteyboi.update();
}

document.onkeydown = updateKeypress;

function animate() {
    ctx.clearRect(0, 0, CTX_W, CTX_H);
    ctx.beginPath();
    ctx.rect(0, 0, CTX_W, CTX_H);
    ctx.fillStyle="#121212";
    ctx.fill();
    spriteyboi.draw();
    // ctx.drawImage(cuteboiTing, CTX_W_M - cuteboiTing.naturalWidth / 2, CTX_H_M - cuteboiTing.naturalHeight / 2);
     window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);
