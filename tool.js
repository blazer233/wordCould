/** 阿基米德螺线, 用于初始化位置函数, 调用后返回一个获取位置的函数
 * @param {*} size 画布大小, [width, height]
 * @param {*} { step = 0.1, b = 1, a = 0 }  步长(弧度), 螺距, 起始点距中心的距离
 * @returns
 */

const archimedeanSpiral = (size, { step = 0.1, b = 1, a = 0 } = {}) => {
  const e = size[0] / size[1]; // 根据画布长宽比例进行对应缩放
  // 参数t为当前弧度值
  return function (t) {
    return [e * (a + b * (t *= step)) * Math.cos(t), (a + b * t) * Math.sin(t)];
  };
};

const hitTest = (obj = {}, obj2) => {
  var objW = obj._width;
  var objH = obj._height;
  var objL = obj.x; //x
  var objT = obj.y; //y

  var obj2W = obj2._width;
  var obj2H = obj2._height;
  var obj2L = obj2.x;
  var obj2T = obj2.y;
  // true 没碰上
  // false 碰上了
  return (
    objL + objW < obj2L ||
    objT + objH < obj2T ||
    objL > obj2L + obj2W ||
    objT > obj2T + obj2H
  );
};
const outLineTest = (point, size) => {
  return (
    Number(point.x) + Number(point._width) > size[0] ||
    Number(point.y) + Number(point._height) > size[1]
  );
};

function motion(radius = 5) {
  // curvity: 曲率，值越大越接近圆的曲率
  var i = 0,
    j = (curvity = 0.05);

  return function () {
    i = i + j;
    /**        * 阿基米德螺线： r = 15*i, ang = 12        * 双曲螺线： r = 200/i, ang = 18        **/
    var r = radius * Math.pow(i, 0.5),
      ang = 36,
      x = r * Math.sin(i),
      y = r * Math.cos(i);

    i < 0 && (j = curvity);
    i > ang && (j = -curvity);

    return [x, y];
  };
}

const CANVAS_SIZE = [1000, 900];
