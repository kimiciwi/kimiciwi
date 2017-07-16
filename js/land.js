(function (Fly) {
  'use strict';

  function Land(config) {
    this.context = config.context;
    
    this.img = config.img;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.speed = -0.2;
    this.x = config.x || 0;
    this.y = config.y;
  }

  Land.prototype.draw = function (delta) {
    var context = this.context;

    this.x += this.speed * delta;
    if (this.x <= -this.imgW) {
      this.x += this.imgW * 4;
    }

    context.drawImage(this.img, this.x, this.y);
  };

  Fly.Land = Land;

})(Fly);