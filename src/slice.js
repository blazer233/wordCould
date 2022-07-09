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
    } while (res.done !== true && performance.now() - start < 16);
    if (res.done) return; //generator 已经迭代完了，所有分割的任务都完成了
    setTimeout(next, 100); // 将剩余的任务放在下一次 宏任务 执行
  };
}
