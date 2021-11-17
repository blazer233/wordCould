let demo = [
  { x: 1, y: 1, text: "javaScript" },
  { x: 2, y: 2, text: "java" },
  { x: 3, y: 3, text: "python" }
];
let demo1 = [
  { x: 10, y: 20 },
  { x: 30, y: 30 },
  { x: 40, y: 40 },
  { x: 50, y: 60 }
];
for (let i = 0; i < demo.length; i++) {
  let point = demo[i];
  let s = i;
  while (point.x < 3) {
    point = Object.assign(point, demo1[s]);
    s++;
  }
}
console.log(demo);
