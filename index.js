/*
@title: InterlappingCircles
@author: sosenteam
@snapshot: interlappingCirclePhoto.png
*/
//Changeable Parameters:


let pointCount = 5; //Number of Points
let minRingDist = 1.0; //Minium Distance between circles
let maxRingSize = 50; // Maxium size of circle
let circleResolution = 150; // Amount of points per circle

//Define Box
const width = 125;
const height = 125;
setDocDimensions(width, height);
//Define Edges for cut opperation
let bounds = [
  [0, 0],
  [width, 0],
  [width, height],
  [0, height]
];


// final lines
let finalLines = [];

// create a list of points
let pointList = [];
for (let i = 0; i < pointCount; i++) {
  pointList.push([randomPoint()]);
}

//for each point, draw multiple circles around the point using the unit circle (woo trig!)
for (let pointCount = 0; pointCount < pointList.length; pointCount++) {
  let point = pointList[pointCount][0]

  for (let dist = bt.randIntInRange(0, 10); dist < maxRingSize; dist += (bt.rand() + minRingDist) * 10) {
    let circle = [];
    //angle goes to 6.28 (2pi radians). 200 is the amount of points in the circle (resolution of circle)
    for (let angle = 0; angle < 6.28; angle += 6.28 / circleResolution) {
      let x = point[0] + (Math.cos(angle) * (dist));
      let y = point[1] + (Math.sin(angle) * (dist));
      circle.push([x, y]);
    }
    //Add each circle to the final draw list
    finalLines.push(circle);
  }
}


// keep within edges
finalLines = bt.cut(finalLines, [
  [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height]
  ]
]);
//draw lines
drawLines(finalLines);

//Generate random point in graph
function randomPoint() {
  let x = (bt.randInRange(1, width));
  let y = (bt.randInRange(1, height));
  return [x, y];
}
