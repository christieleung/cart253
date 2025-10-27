/**
 * Mod Jam
 * Christie Leung
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

// Key codes for the left arrow, right arrow, and space bar
const keyCode = {
    left: 37,
    right: 39,
    space: 32
}

// Variable that holds the appropriate action verb based on what the user needs to do
let actionVerb = "press space";

// Variable that allows for different states
let state = "instructions"; // remember to change back to "title" after!

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

/**
 * Draw the title, instructions, or game state
*/
function draw() {
    if (state === "title") {
        title();
    }   
    else if (state === "instructions") {
        instructions();
    }
    else if (state === "game") {
        game();
    }
}

/**
 * Displays the title screen
 */
function title() {
    // A light blue
    background("#87ceeb");
    
    // The title
    push();
    textSize(30);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(40, 80, 30);
    text("goodnight frog", width / 2, height / 2.1);
    pop();
    
    // Draws the full lily pad
    drawLilyPadFull(520, 125, 145);
    
    // Draws the lily pad with a notch
    push();
    fill(60, 140, 75); // Green
    noStroke();
    arc(130, 330, 145, 145, Math.PI/2.5, -7.5*Math.PI/4);
    pop();

    // The instruction to go to the how to play (instructions) screen
    push();
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(40, 80, 30);
    // emoticons copied from: https://emojicombos.com/star
    text(`⋆˚꩜｡ ${actionVerb} to begin! ⋆˙⟡`, width / 2, 3 * height / 3.5);
    pop();
}

function drawLilyPadFull(x, y, a) {
    push();
    // Draws lily pad base
    fill(60, 140, 75); // Green
    noStroke();
    ellipse(x, y, a); 
    // Draws small central star pattern (veins)
    fill(178, 224, 128); // Light green
    star(x, y, a * 0.03, a * 0.3, 6);
    pop();
}

/**
 * Displays the instructions screen
**/
function instructions() {
    background("#87ceeb");
    
    // The instructions on how to play
    push();
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(40, 80, 30);
    text();
    // The instruction to go to the game screen
    textSize(18);
    text(`⋆˚꩜｡ ${actionVerb} to play! ⋆˙⟡`, width / 2, 3 * height / 3.5);
    pop();
    
    // Draws a frog head at the specified (x, y) coordinates
    drawFrogHead(100, 200);
    drawFrogHead(320, 200);
    drawFrogHead(540, 200);
}

/**
 * Draws the frog heads on the instructions screen
**/
function drawFrogHead(x, y) {
    push();
    translate(x, y);
    fill("green");
    noStroke();
    
    // values before shifting origin to (x, y) using translate
    // ellipse(100, 200, 100, 70);
    // ellipse(75, 170, 30);
    // ellipse(125, 170, 30);
    ellipse(0, 0, 100, 70); // head
    ellipse(-25, -30, 30); // part behind left eye
    ellipse(25, -30, 30); // part behind right eye
    pop();
    
    // drawFrogFace();
}

/**
 * Runs the frog game
**/
function game() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    let frogSpeed = 7;
    
    if (keyIsDown(keyCode.left)) {
        frog.body.x -= frogSpeed;
    } 
    if (keyIsDown(keyCode.right)) {
        frog.body.x += frogSpeed;
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Changes the state (title, instructions, game) when the space bar is pressed
 * Also launches the tongue (if it's not launched yet)
 */
function keyPressed(event) {
    // Checks if the space bar is pressed
    if (event.keyCode === keyCode.space) {
        // Handles the different states
    if (state === "title") {
        state = "instructions";
    }
    else if (state === "instructions") {
        state = "game";
    }
    else if (state === "game") {
        if (frog.tongue.state === "idle") {
            frog.tongue.state = "outbound";
        }
    } 
    }
}

/**
 * Helper function to draw star shape
 * Code from p5js star example: https://archive.p5js.org/examples/form-star.html
 */ 
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

