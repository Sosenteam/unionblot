// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
for (let j = 0; j < height; j += 11) {
  let sinLine = [];
  for (let i = 0; i < width; i++) {
    sinLine.push([i, j - (Math.cos(i / 10 * i)) * 10]);
  }
  finalLines.push(sinLine);

}

for(let p = 0; p < finalLines-1; p++){
  console.log("TEST  "+p);
}
// add the polyline to the final lines

// transform lines using the toolkit

// draw it
drawLines(finalLines);