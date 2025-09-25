/**
 * Circle Master
 * Christie + Frid + Philippe
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000"
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

const target = {
  x: 300,
  y: 100,
  size: 120,
  fill: "#0000ff"
}


/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  frameRate(60)
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser(user);
  
  // Draw the user and puck and target
  drawUser();
  drawTarget();
  drawPuck();


  // Move puck when the user and puck overlap 
  // if we (user) overlap with the puck
  if (doCirclesOverlap(user, puck, dist)) {
    // then the puck will move
    let angle = Math.atan2(user.y - puck.y, user.x - puck.x)
    let overlap = howMuchDoCirclesOverlap(user, puck, dist)
    movePuck(puck, overlap, angle)
  }
}

function movePuck(puck, overlap, angle) {
  console.log({ angle, cos: Math.cos(angle), sin: Math.sin(angle) })
  
  
  /*
  We want the puck to move in the direction of the angle
  We need to use the angle to influence how much we push
  on the x, and y axis.
  Now what function should we use to do that?
  */
  puck.x += overlap + 10 * (Math.cos(angle))
  puck.y += overlap + 10 * (Math.sin(angle))
}


/**
 * Sets the user position to the mouse position
 */
function moveUser(user) {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

function drawTarget() {
  push();
  noStroke();
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}


/**
 * Checks whether or not two circles overlap.
 * Implementation copied from Overlapping Circles by Pippin Barr 
 * (https://editor.p5js.org/pippinbarr/sketches/NLnxtLMat)
 * 
 * @param c1 {Circle} Circle object
 * @param c2 {Circle} Another Circle object
 * @param dist {function} p5.js's dist function
 * @see https://editor.p5js.org/pippinbarr/sketches/NLnxtLMat
 * @returns Boolean: Whether or not the circles overlap
 */
function doCirclesOverlap(c1, c2, dist) {
  const distanceBetweenCenters = dist(c1.x, c1.y, c2.x, c2.y);
  const c1Radius = c1.size / 2;
  const c2Radius = c2.size / 2;
  return distanceBetweenCenters < c1Radius + c2Radius;
}

function howMuchDoCirclesOverlap(c1, c2, dist) {
  const distanceBetweenCenters = dist(c1.x, c1.y, c2.x, c2.y);
  const c1Radius = c1.size / 2;
  const c2Radius = c2.size / 2;
  return distanceBetweenCenters - (c1Radius + c2Radius);
}

/**
 * Calculates the angle between two circles using trigonometry
 * @param c1 {Circle} Circle object
 * @param c2 {Circle} Second object we want to get the angle of relative to c1
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asin
 * @returns Floating point Number: Angle between [0, 2π)
 */
function getAngleBetweenCircles(c1, c2) {
  const opposite = Math.sqrt((c1.y - c2.y)**2)
  const hypotenuse = Math.sqrt((c1.x-c2.x)**2 + (c1.y-c2.y)**2)
  return Math.asin(opposite / hypotenuse)
}