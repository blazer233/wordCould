import { handleAsyncTask as task } from "../tool_config";
export default function timeSlice(gen, ...arg) {
  // 传入参数生成 generator
  var g = gen(...arg);
  if (!g || typeof g.next !== "function") return;
  return function next() {
    //记录当前时间
    var start = performance.now();
    var res = null;
    do {
      // 迭代一次
      // 可以理解为 执行一个任务
      res = g.next();
    } while (!res.done && performance.now() - start < 16);
    if (res.done) return;
    task(next);
  };
}
