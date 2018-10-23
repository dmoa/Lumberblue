function Sprite(name, behaviours, painter) {
    this.name = name || null;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.behaviours = behaviours || [];
    this.painter = painter || null;
    this.heightDiff;
    this.velocity = 0;
    this.tempHeight = 0;
}
Sprite.prototype = {
    draw : function(){
      if (this.painter !== null) {
        this.painter.draw(this, ctx);
      }
    },
    changeDirection : function(whatType) {
      //gets the current height
      this.tempHeight = this.height;
      //what direction it is telling us to be
      this.painter.cellIndex = whatType;
      //changing the height and width
      this.width = this.painter.cells[this.painter.cellIndex].width;
      this.height = this.painter.cells[this.painter.cellIndex].height;
      //changing the y coord slightly so the height diff doesn't affect the y coord of your player
      this.y -= this.height-this.tempHeight;
    },
    update: function(whatType) {
      if (event.keyCode == 68||event.keyCode == 39) {
          this.changeDirection(this.painter.cells[0].right);
          this.x+=5;
      }
      if (event.keyCode == 37 || event.keyCode ==  65) {
          this.changeDirection(this.painter.cells[0].left);
          this.x-=5;
      }
      if (event.keyCode == 38||event.keyCode == 87) {
          this.changeDirection(this.painter.cells[0].up);
      }
      if (event.keyCode == 40 || event.keyCode ==  83) {
          this.changeDirection(this.painter.cells[0].down);
      }
      // if (event.keyCode == 32) {
      //     this.velocity = 50;
      //
      // }
    }
}


function Painter(cells) {
  this.cells = cells || [];
  this.cellIndex = 2;
  // *sigh*
}

Painter.prototype = {
  draw: function(spriteTing, ctx) {
    let c = this.cells[this.cellIndex];
    ctx.beginPath();
    ctx.rect(0,CTX_H/2,CTX_W,50);
    ctx.fillStyle = "#003366";
    ctx.fill();
    ctx.drawImage(allHailTheOnlySpriteSheet,c.left,c.top, c.width , c.height,spriteTing.x,spriteTing.y,spriteTing.width,spriteTing.height);
    // spriteyboi.y -=spriteyboi.velocity;
    // spriteyboi.velocity+=5;
  }
}
