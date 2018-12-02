function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent("canvas");
  noStroke();
  playerx = width / 2 - playerLength / 2;
  platforms = alllevels[currentlevel];
  changinglevel = false;

  textAlign(CENTER);
  textSize(64);

}

function draw() {
  if (startedgame) {
    background("#333333");

    //pointy arrows
    textSize(40);
    fill(0, 0, 0);
    if (currentlevel == 1) {
      text("➜", 360, 385);
    } else if (currentlevel == 2) {
      text("⬑", 280, 385);
      text("⬅", 225, 340);
    } else if (currentlevel == 3) {
      text("⬈", 300, 325);
    }

    if (end) {
      console.log(alphalevelchange);
      fill(57, 204, 204, alphalevelchange);
      textSize(50);
      text("thanks for playing!", width / 2, 100);
    }

    //drawing boundaries of canvas
    fill("#888888");
    rect(0, 0, boundaryThickness, height);
    rect(0, height - boundaryThickness, width, height);
    rect(width - boundaryThickness, 0, boundaryThickness, height);

    //player
    fill("#39CCCC");
    rect(playerx, playery, playerLength, playerLength);

    platformstfL = 0;
    platformstfR = 0;
    platformstfF = 0;
    //updating Exit
    if (((playerx + playerLength >= platforms[0].x &&
          playerx + playerLength <= platforms[0].x + platforms[0].width) ||
        (playerx >= platforms[0].x &&
          playerx <= platforms[0].x + platforms[0].width) ||
        (platforms[0].x > playerx && platforms[0].x < playerx + playerLength)) &&
      ((playery + playerLength >= platforms[0].y &&
          playery + playerLength <= platforms[0].y + platforms[0].height) ||
        playery >= platforms[0].y &&
        playery <= platforms[0].y + platforms[0].height)) {
      changinglevel = true;
      if (currentlevel + 2 < alllevels.length) {
        displaylevel = currentlevel + 1;
      } else {
        displaylevel = "game complete"
        end = true;
      }
    }
    //update player
    //currentlevel + 1 < alllevels.length &&
    if (playery + playervy >= height - playerLength - boundaryThickness) {
      playery = height - playerLength - boundaryThickness;
    }
    if (playerx - playervx < boundaryThickness) {
      playerx = boundaryThickness;
    }
    if (playerx + playerLength + playervx > width - boundaryThickness) {
      playerx = width - boundaryThickness - playerLength;
    }

    for (let i = 0; i < platforms.length; i++) {
      if ([playervy] < 0 && playery > platforms[i].y &&
        playery + playervy < platforms[i].y + platforms[i].height &&
        ((playerx < platforms[i].x + platforms[i].width &&
          playerx > platforms[i].x) || (playerx + playerLength > platforms[i].x &&
          playerx + playerLength < platforms[i].x + platforms[i].width))) {
        playery = platforms[i].y + platforms[i].height;
        playervy = 0;
      }

      //corrects the little overlaps due to the decimal acceleration +  moving left and right

      if (playery + playervy + playerLength > platforms[i].y &&
        playery + playerLength < platforms[i].y + platforms[i].height &&
        playerx + playerLength > platforms[i].x &&
        playerx < platforms[i].x + platforms[i].width) {
        playery = platforms[i].y - playerLength;
      }

      //if all hope is lost in finding a bug it's prob here
      if (playerx + playervx + playerLength > platforms[i].x &&
        (playery + playerLength > platforms[i].y &&
          playery < platforms[i].y + platforms[i].height) &&
        playerx + playerLength < platforms[i].x + platforms[i].width) {
        playerx = platforms[i].x - playerLength;
      }

      if (playerx - playervx < platforms[i].x + platforms[i].width &&
        playery + playerLength > platforms[i].y &&
        playery < platforms[i].y + platforms[i].height &&
        playerx > platforms[i].x) {
        playerx = platforms[i].x + platforms[i].width;
      }
      // rwgfdasccdsfhdgfbsvdc\
      if (playerx > boundaryThickness &&
        (playerx > platforms[i].x + platforms[i].width ||
          playerx + playerLength <= platforms[i].x ||
          playery + playerLength <= platforms[i].y ||
          playery > platforms[i].y + platforms[i].height)) {
        platformstfL++;
      }


      if (playerx + playerLength < width - boundaryThickness &&
        (playerx + playerLength < platforms[i].x ||
          playerx >= platforms[i].x + platforms[i].width ||
          playery + playerLength <= platforms[i].y ||
          playery > platforms[i].y + platforms[i].height)) {
        platformstfR++;
      }

      // can i fall?
      if (playery + playerLength + playervy < height - boundaryThickness &&
        ((playerx + playerLength <= platforms[i].x ||
            playerx >= platforms[i].x + platforms[i].width) ||
          playery + playerLength < platforms[i].y)) {
        platformstfF++;
      } else if (playery + playervy < height - playerLength - boundaryThickness &&
        playery + playerLength >= platforms[i].y + platforms[i].height) {
        platformstfF++;
      }
    }
    if (changinglevel) {
      platformstfL = 0;
      platformstfR = 0;
      platformstfF = 0;
    }
    if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && platformstfL == platforms.length) {
      playerx -= playervx;
    }
    if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && platformstfR == platforms.length) {
      playerx += playervx;
    }


    if (platformstfF == platforms.length) {
      if (!jumping) {
        jumping = true;
        acceleration = 0.3;
      }
      playery += playervy;
      playervy += acceleration;
      acceleration += 0.001;
    } else {
      playervy = 0;
      jumping = false;
    }
    //platforms drawing
    for (var i = 0; i < platforms.length; i++) {
      platforms[i].show();
    }
    if (changinglevel) {
      background(1, 255, 112, alphalevelchange);
      fill(0, 0, 0, alphalevelchange);
      textSize(64);
      text(displaylevel, width / 2, height / 2);
      alphalevelchange += alphainterval;
      if (alphalevelchange >= 255) {
        alphainterval = -5;
        currentlevel++;
        platforms = alllevels[currentlevel];
      }
      if (alphalevelchange < -20) {
        alphainterval = 1.5;
        alphalevelchange = 0;
        changinglevel = false;
      }
    }
  } else {
    background("#333333");
    fill(255, 255, 255)
    textSize(50);
    text("press enter to start", width / 2, height / 2);
    fill("#39CCCC");
    rect(600 / 2 - playerLength / 2, height / 2 + 100, 50, 50);
    textSize(20);
    text("player", 600 / 2, height / 2 + 175);
    fill("#888888")
    rect(600 / 2 - playerLength / 2 - 100, height / 2 + 100, 50, 50);
    text("platform", 600 / 2 - 100, height / 2 + 175);
    fill("#DF00FF");
    rect(600 / 2 - playerLength / 2 + 100, height / 2 + 100, 50, 50);
    text("exit", 600 / 2 + 100, height / 2 + 175);
  }


}

//jumping
function keyPressed() {
  if ((keyCode == 32 || keyCode == 87 || keyCode == 38) && !jumping && !changinglevel) {
    playervy = -7;
    playery -= 10;
    acceleration = 0.3;
    jumping = true;
  }
  if (keyCode == 13) {
    startedgame = true;
  }
}
