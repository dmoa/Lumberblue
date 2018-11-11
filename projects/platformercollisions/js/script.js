let playery = 50;
let playerLength = 50;
let playerx = 50;
let playervy = 7;
let playervx = 5;
let acceleration = 0.01;
let jumping = true;
let boundaryThickness = 5;

let particles = [];
let numparticles = 60;

let platforms = [];
let platformstfL = 0;
let platformstfR = 0;
let platformstfF = 0;

function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent("canvas");
  noStroke();
  playerx = width / 2 - playerLength / 2;

  let platform1 = new Platform(boundaryThickness, height - boundaryThickness - 30, 120, 30);
  let platform2 = new Platform(200, 350, 70, 50 - boundaryThickness);
  let platform3 = new Platform(400, 350, 70, 50 - boundaryThickness);
  platforms.push(platform1);
  platforms.push(platform2);
  platforms.push(platform3);

  for (let i = 0; i < numparticles; i++) {
    let p = new Particle();
    particles.push(p);
  }
}


function draw() {
  background("#000000");


  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
      let p = new Particle();
      particles.push(p);
    }
  }

  fill("#888888");
  rect(0, 0, boundaryThickness, height);
  rect(0, height - boundaryThickness, width, height);
  rect(width - boundaryThickness, 0, boundaryThickness, height);

  //player
  fill("#FFFFFF");
  rect(playerx, playery, playerLength, playerLength);

  //update player

  if (playery + playervy >= height - playerLength - boundaryThickness) {
    playery = height - playerLength - boundaryThickness;
  }

  platformstfL = 0;
  platformstfR = 0;
  platformstfF = 0;
  for (let i = 0; i < platforms.length; i++) {
    if (playerx > boundaryThickness &&
      (playerx > platforms[i].x + platforms[i].width ||
        playerx + playerLength <= platforms[i].x ||
        playery + playerLength <= platforms[i].y)) {
      platformstfL++;
    }


    if (playerx + playerLength < width - boundaryThickness &&
      (playerx + playerLength < platforms[i].x ||
        playerx >= platforms[i].x + platforms[i].width ||
        playery + playerLength <= platforms[i].y)) {
      platformstfR++;
    }

    //corrects the little overlaps due to the decimal acceleration +  moving left and right
    if (playery + playervy + playerLength > platforms[i].y &&
      playery + playerLength < platforms[i].y + platforms[i].height / 2 &&
      playerx + playerLength > platforms[i].x &&
      playerx < platforms[i].x + platforms[i].width) {
      playery = platforms[i].y - playerLength;
    }

    //if all hope is lost in finding a bug it's prob here
    if (playerx + playervx + playerLength > platforms[i].x &&
      playery + playerLength > platforms[i].y &&
      playerx + playerLength < platforms[i].x) {
      playerx = platforms[i].x - playerLength;
    }

    if (playerx - playervx < platforms[i].x + platforms[i].width &&
      playery + playerLength > platforms[i].y &&
      playerx > platforms[i].x) {
      playerx = platforms[i].x + platforms[i].width;
    }



    // can i fall?
    if (playery < height - playerLength - boundaryThickness &&
      ((playerx + playerLength <= platforms[i].x ||
          playerx >= platforms[i].x + platforms[i].width) ||
        playery + playerLength < platforms[i].y)) {
      platformstfF++;
    }
  }

  if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && platformstfL == platforms.length) {
    playerx -= playervx;
  }
  if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && platformstfR == platforms.length) {
    playerx += playervx;
  }

  if (platformstfF == platforms.length) {
    if (!jumping) {
      acceleration = 1;
      jumping = true;
    }
    playery += playervy;
    playervy += acceleration;
    acceleration += 0.001;
  } else {
    playervy = 0;
    jumping = false;
  }




//platforms drawing
fill("#FFFFFF");
for (var i = 0; i < platforms.length; i++) {
  platforms[i].show();
}
}

//jumping
function keyPressed() {
  if (keyCode == 32 && !jumping) {
    playervy = -7;
    playery -= 10;
    acceleration = 0.3;
    jumping = true;
  }
}
