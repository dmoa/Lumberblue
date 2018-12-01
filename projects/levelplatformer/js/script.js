function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent("canvas");
  noStroke();
  playerx = width / 2 - playerLength / 2;
  platforms = alllevels[currentlevel];
  changinglevel = false;
}

function draw() {
  background("#000000");

  //drawing boundaries of canvas
  fill("#888888");
  rect(0, 0, boundaryThickness, height);
  rect(0, height - boundaryThickness, width, height);
  rect(width - boundaryThickness, 0, boundaryThickness, height);

  //player
  fill("#666666");
  rect(playerx, playery, playerLength, playerLength);


  if (!changinglevel) {
    //updating Exit
    if (currentlevel + 1 < alllevels.length &&
      ((playerx + playerLength >= platforms[0].x &&
          playerx + playerLength <= platforms[0].x + platforms[0].width) ||
        (playerx >= platforms[0].x &&
          playerx <= platforms[0].x + platforms[0].width) ||
        (platforms[0].x > playerx && platforms[0].x < playerx + playerLength)) &&
      ((playery + playerLength >= platforms[0].y &&
          playery + playerLength <= platforms[0].y + platforms[0].height) ||
        playery >= platforms[0].y &&
        playery <= platforms[0].y + platforms[0].height)) {
      changinglevel = true;
      displaylevel = currentlevel + 1;
    }
    //update player

    if (playery + playervy >= height - playerLength - boundaryThickness) {
      playery = height - playerLength - boundaryThickness;
    }
    if (playerx - playervx < boundaryThickness) {
      playerx = boundaryThickness;
    }
    if (playerx + playerLength + playervx > width - boundaryThickness) {
      playerx = width - boundaryThickness - playerLength;
    }
    platformstfL = 0;
    platformstfR = 0;
    platformstfF = 0;

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

    if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && platformstfL == platforms.length) {
      playerx -= playervx;
    }
    if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && platformstfR == platforms.length) {
      playerx += playervx;
    }
    //OVERHERE UNDER HERE
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
    background(255, 220, 100, alphalevelchange);
    textSize(64);
    fill(0, 0, 0);
    textAlign(CENTER);
    text(displaylevel, width / 2, height / 2);
    alphalevelchange += alphainterval;
    if (alphalevelchange >= 255) {
      alphainterval = -2;
      currentlevel++;
      platforms = alllevels[currentlevel];
    }
    if (alphalevelchange < 0) {
      alphainterval = 3;
      alphalevelchange = 0;
      changinglevel = false;
    }
  }
}

//jumping
function keyPressed() {
  if ((keyCode == 32) && !jumping) {
    playervy = -7;
    playery -= 10;
    acceleration = 0.3;
    jumping = true;
  }
}
