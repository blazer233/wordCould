import { hitTest, outLineTest, CANVAS_SIZE as size } from "./tool_config";

export default function handleArray(ctx, lastOne, points, baseData, i, isArea) {
  let point = baseData[i];
  ctx.fillStyle = point.color;
  ctx.font = point.fontSize + "px Arial";
  point._width = ctx.measureText(point.text).width;
  ctx.beginPath();
  if (lastOne.length) {
    let s = i;
    while (
      !lastOne.every(one => hitTest(point, one) && !outLineTest(point, size))
    ) {
      point = { ...point, ...points[s] };
      s++;
    }
  } else {
    point.x = point.x - point._width / 2;
    point.y = point.y - point._height / 2;
  }
  lastOne.push(point);
  // /*画文字*/
  ctx.fillText(point.text, point.x, point.y + point._height);
  // /*画框*/
  isArea && ctx.strokeRect(point.x, point.y + 6, point._width, point._height);
}
