(function (Fly) {
  'use strict';

  function Pipe(config) {
    this.context = config.context;
    
    this.imgTop = config.imgTop;
    this.imgBottom = config.imgBottom;

    this.imgW = this.imgTop.width;
    this.imgH = this.imgTop.height;
    this.x = config.x || 0;
    this.topY = 0;
    this.bottomY = 0;
    this.speed = -0.2;
    this.pipeSpace = 150;

    this.initPipeHeight();
  }

  // 每次生成的管道高度是随机的
  // 上下两个管道之间的距离是固定的( 150 )
  // 画布中展示的管道高度是不变

  Pipe.prototype = {
    constructor: Pipe,

    draw: function (delta) {
      var context = this.context;

      this.x += this.speed * delta;

      if (this.x <= -this.imgW) {
        this.x += this.imgW * 3 * 6;
        // 重新生成管道的高度
        this.initPipeHeight();
      }

      context.drawImage(this.imgTop, this.x, this.topY);
      context.drawImage(this.imgBottom, this.x, this.bottomY);

      // 描绘管道的路径
      context.rect(this.x, this.topY, this.imgW, this.imgH);
      context.rect(this.x, this.bottomY, this.imgW, this.imgH);
      // context.fill();
    },

    // 初始化管道高度和坐标
    // 这个方法什么时候调用？？？
    initPipeHeight: function () {
      // 随机生成上面管道的高度
      var pipeTopHeight = Math.random() * 200 + 50;
      // 上面管道的y坐标
      this.topY = pipeTopHeight - this.imgH;
      // 下面管道的y坐标
      this.bottomY = pipeTopHeight + this.pipeSpace;
    }
  };

  Fly.Pipe = Pipe;
})(Fly);