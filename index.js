// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a list of points
let pointList = [
  [
    [50, 50]
  ]
];
// for(let i = 0; i < 5; i++){
//   pointList.push([randomPoint()]);
// }

let point = pointList[0][0]
for (let dist = 10; dist < 100; dist += 20) {
  let dist = 10;
  let circle = [];


  for (let a = 0; a < 6.28; a += 6.28 / 200) {
    let x = point[0] + (Math.cos(a) * dist);
    let y = point[1] + (Math.sin(a) * dist);
    circle.push([x, y]);
  }

}


// add the polyline to the final lines
finalLines.push(circle);

// transform lines using the toolkit

// draw it
drawLines(finalLines);


function randomPoint() {
  let x = (bt.randInRange(1, width));
  let y = (bt.randInRange(1, height));
  return [x, y];
}
