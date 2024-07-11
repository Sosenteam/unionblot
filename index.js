/*
@title: InterlappingCircles
@author: sosenteam
@snapshot: interlappingCirclePhoto.png
*/
//Changeable Parameters:

//
let pointCount = 50; //Number of Points
let maxRingSize = 30; // Maxium size of circle 
let circleResolution = 3; // Amount of points per circle (looks best between 3-20 or 50+)
let ringDist = 0.1; // Starting Ring Distance
let rateOfRingChange = 1.05; // Ring Distance Change 

//Define Box
const width = 125;
const height = 125;
setDocDimensions(width, height);
//Define Edges for cut opperation
let bounds = [
  [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height]
  ]
];


// final lines
let almostLines = [];
let finalLines = [];

// create a list of points
let pointList = [];
for (let i = 0; i < pointCount; i++) {
  pointList.push([randomPoint()]);
}
//for each point, draw multiple circles around the point using the unit circle (woo trig!)

// all points
for (let pointCount = 0; pointCount < pointList.length; pointCount++) {
  let point = pointList[pointCount][0]
  let circleLines = [];
  let currentRingDist = ringDist; // Use a separate variable to track the current ring distance
  for (let dist = 0; dist < maxRingSize; dist += currentRingDist) {
    currentRingDist = currentRingDist * rateOfRingChange;
    let circle = [];
    //circle points
    for (let angle = 0; angle < 6.28; angle += 6.28 / circleResolution) {
      let x = point[0] + (Math.cos(angle) * (dist));
      let y = point[1] + (Math.sin(angle) * (dist));
      circle.push([x, y]);

    }
    // //Add each circle to the final draw list
    // finalLines.push(circle);
    circleLines.push(circle);

  }
  almostLines.push(circleLines);
}
console.log(almostLines);
console.log(almostLines[0][0]);
// keep within edges
// 
//draw lines
  for (let r = 0; r < almostLines[0].length; r++) {
    let mergedLines = [almostLines[0][r]];
    for(let p = 1; p < pointCount; p++){
      mergedLines = (bt.union(mergedLines, [almostLines[p][r]]));
    }
    finalLines.push(mergedLines);
  }


for (let o = 0; o < finalLines.length; o++) {
  //
  finalLines[o] = bt.cut(finalLines[o], bounds);
  drawLines(finalLines[o]);
}

//Generate random point in graph
function randomPoint() {
  let x = (bt.randInRange(1, width));
  let y = (bt.randInRange(1, height));
  return [x, y];
}
