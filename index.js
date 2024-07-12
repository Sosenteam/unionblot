/*
@title: UnionedPolygons
@author: sosenteam
@snapshot: photo1.png
*/
//Changeable Parameters:
let pointCount = 2; //Number of Points
let circleResolution = 150; // Amount of points per ring (looks best between 3-20 or 150+)
let maxRingSize = 200; // Maxium size of ring
let ringDist = 1; // Starting Ring Distance
let rateOfRingChange = 1.25; // Ring Distance Change 
let mergeLines = true // Connect Lines
//SHIFT
let horizontalShift = -0.5; // Recommended -1-1
let verticleShift = -0.2; // Recommended -1-1
//OFFSET
let offsetEnabled = true;
//Define Box
const width = 125;
const height = 125;

//Code Start ----------------------------------------------------------------------------
const ringCount = Math.floor(Math.log(maxRingSize / ringDist) / Math.log(rateOfRingChange)) + 1;
//

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
for (let pc = 0; pc < pointList.length; pc++) {
  let point = pointList[pc][0]
  let circleLines = []; // for containing all rings of one point
  let currentRingDist = ringDist;
  for (let dist = 0; dist < maxRingSize; dist += currentRingDist) {
    currentRingDist = currentRingDist * rateOfRingChange;
    let circle = [];
    //circle points
    for (let angle = 0; angle < 6.28; angle += 6.28 / circleResolution) {
      let x = point[0] + (Math.cos(angle) * (dist));
      let y = point[1] + (Math.sin(angle) * (dist));
      x += dist * horizontalShift;
      y += dist * verticleShift;
      circle.push([x, y]);

    }
    // //Add each circle to the final draw list
    circleLines.push(circle);
  }
  almostLines.push(circleLines);
}



//Merge Lines
if (mergeLines) {
  //union all lines, going by ring 
  for (let r = 0; r < almostLines[0].length; r += 1) {
    let mergedLines = [almostLines[0][r]];
    for (let p = 1; p < pointCount; p++) {
      mergedLines = (bt.union(mergedLines, [almostLines[p][r]]));
    }
    if (offsetEnabled) {
    const modifiedPolylines = bt.iteratePoints(bt.copy(mergedLines), (pt, t) => {
      const [x, y] = pt;
      return [x + Math.cos((t * 6.28)), y + Math.sin(t * 6.28)];
    });
    finalLines.push(modifiedPolylines);
    }
    finalLines.push(mergedLines);
  }
} else {
  //Copy Lines from pre-merged lines
  finalLines = bt.copy(almostLines);
  if (offsetEnabled) {
    const modifiedPolylines = bt.iteratePoints(bt.copy(almostLines), (pt, t) => {
      const [x, y] = pt;
      return [x + Math.cos((t * 6.28)), y + Math.sin(t * 6.28)];
    });
    finalLines.push(modifiedPolylines);
    }
}
//Cut and Draw Lines
for (let o = 0; o < finalLines.length; o++) {
  //Keep Lines in Bounds
  finalLines[o] = bt.cut(finalLines[o], bounds);
  drawLines(finalLines[o]);
}

//Generate random point in graph
function randomPoint() {
  let x = (bt.randInRange(1, width));
  let y = (bt.randInRange(1, height));
  return [x, y];
}
