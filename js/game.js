(function (Fly) {
  'use strict';

  function Game(option) {
    this
      .imgSrcList = ['birds', 'land', 'pipe1', 'pipe2', 'sky'];
    this.isStart = true;
    this.lastFrameTime = new Date();
    this.curFrameTime = 0;
    this.delta = 0;

    // 游戏的英雄
    this.hero = null;

    // 游戏中的角色
    this.roles = [];

    // 创建canvas对象，并且获取到绘制上下文
    this.context = Fly.createCV(option.id);
  }

  Game.prototype = {
    constructor: Game,

    // 开始游戏
    start: function () {
      var that = this;

      Fly.loadImage(that.imgSrcList, function (imgList) {
        // 创建角色
        that.createRoles(imgList);
        // 渲染游戏
        that.draw(imgList);
        // 绑定事件
        that.bindEvent();
      });
    },

    // 结束游戏
    stop: function () {
      this.isStart = false;
    },

    // 绘制游戏
    draw: function (imgList) {
      var that = this,
        context = that.context;

      (function render() {
        that.curFrameTime = new Date();
        // delta 表示两帧时间间隔
        that.delta = that.curFrameTime - that.lastFrameTime;
        that.lastFrameTime = that.curFrameTime;

        // 清空画布
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // 开启新路径
        context.beginPath();
        // 保存状态
        context.save();

        // 绘制所有的角色
        that.roles.forEach(function (role) {
          role.draw(that.delta);
        });

        // 绘制小鸟
        that.hero.draw(that.delta);

        // 恢复状态
        context.restore();

        if (that.isStart) {
          requestAnimationFrame(render);
        }
      })();
    },

    // 创建游戏角色对象
    createRoles: function (imgList) {
      var roles = this.roles;
      var that = this;

      // 创建小鸟对象
      this.hero = Fly.factory('Bird', {
        img: imgList.birds,
        context: this.context,
        landPosY: imgList.sky.height - imgList.land.height
      });

      // 添加小鸟碰撞订阅， 当小鸟发生碰撞以后，调用 stop() 方法，停止游戏！
      this.hero.addListener(function() {
        that.stop();
      });

      // 创建天空对象
      for (var i = 0; i < 2; i++) {
        var sky = Fly.factory('Sky', {
          img: imgList.sky,
          x: imgList.sky.width * i,
          context: this.context
        });
        roles.push(sky);
      }

      // 创建管道对象
      for (var i = 0; i < 6; i++) {
        var pipe = Fly.factory('Pipe', {
          imgTop: imgList.pipe2,
          imgBottom: imgList.pipe1,
          x: imgList.pipe2.width * 3 * i + 300,
          context: this.context
        });

        roles.push(pipe);
      }

      // 创建陆地对象
      for (var i = 0; i < 4; i++) {
        var land = Fly.factory('Land', {
          img: imgList.land,
          x: imgList.land.width * i,
          y: (imgList.sky.height - imgList.land.height),
          context: this.context
        });

        roles.push(land);
      }
    },

    // 绑定事件
    bindEvent: function () {
      var that = this;

      // 小鸟跳动
      that.context.canvas.addEventListener('click', function () {
        that.hero.speed = -0.3;
      });
    }
  };

  var instance = null;

  Fly.Game = function( option ) {
    if(instance === null) {
      instance = new Game(option);
    }

    return instance;
  };

  // Fly.Game = Game;

})(Fly);