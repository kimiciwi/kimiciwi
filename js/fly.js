(function (window) {
  'use strict';

  // FlyObj 就是 FlappyBird 游戏的全局对象
  var FlyObj = {};

  // 创建工厂函数
  // 用来统一处理游戏中所有对象的创建
  // type 表示要创建对象的类型
  // option 表示传递给构造函数的参数
  FlyObj.factory = function(type, option) {
    switch(type) {
      case 'Bird':
        return new FlyObj.Bird(option);
      case 'Land':
        return new FlyObj.Land(option);
      case 'Pipe':
        return new FlyObj.Pipe(option);
      case 'Sky':
        return new FlyObj.Sky(option);
    }
  };

  // 工具型的方法放到FlyObj对象中（ utils.js 存储所有的工具方法 ）
  // 因为 loadImage 方法，与游戏中的任何角色都没有关系
  FlyObj.loadImage = function (srcList, callback) {
    var count = 0,
      length = srcList.length,
      imgList = {};

    srcList.forEach(function (srcVal) {
      var img = new Image();
      img.src = './images/' + srcVal + '.png';
      imgList[srcVal] = img;
      img.onload = function () {
        count++;
        if (count >= length) {
          // 此时，就说明所有图片都加载完成
          callback(imgList);
        }
      };
    });
  };

  // 将角度转化为弧度
  FlyObj.toRadian = function (angle) {
    return angle / 180 * Math.PI;
  };

  // 动态创建canvas
  FlyObj.createCV = function( id ) {
    // 处理默认值
    var container = document.getElementById(id) || document;

    // 创建canvas对象
    var cv = document.createElement('canvas');
    cv.width = 800;
    cv.height = 600;

    // 获取绘制上下文
    var context = cv.getContext('2d');

    // 放到页面中
    container.appendChild( cv );

    return context;
  }

  // 暴露到全局环境中
  window.Fly = FlyObj;
})(window);