import handleArray from "../handle";
import {
  getAllPoints,
  drawSpiral,
  CONFIG,
  CANVAS_SIZE as size,
  MOCK_DATA as mock,
} from "../tool_config";
import { schedule } from "./index";

export default function paintSpiral(dom, config = CONFIG) {
  mock.sort((a, b) => b.fontSize - a.fontSize);
  const ctx = dom.getContext("2d");
  [dom.width, dom.height] = size;
  const points = getAllPoints(size, config.large); // 所有放置点
  mock.forEach((item, i) => {
    item.text = config.showIndex ? `${i}${item.text}` : item.text;
    item._height = item.fontSize * 1;
    item = Object.assign(item, points[i]);
  });
  let lastOne = [];
  if (config.showSpiral) {
    drawSpiral(ctx, points, size);
  }
  let idx = 0;
  while (idx < mock.length) {
    schedule(
      handleArray.bind(null, ctx, lastOne, points, mock, idx, config.isArea)
    );
    idx++;
  }
}
paintSpiral(document.querySelector("#app"));
