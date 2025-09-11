/**
 * Rainbow Mountains
 * Frid and Christie
 * 
 * A sunset landscape of a mountain range.
 * 
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * Drawing our landscape scene
*/
function draw() {
    drawSunset();
    drawOcean();
    drawSun();
    drawMountainBack();
    drawMountainMiddle();
    drawMountainFront();
    drawMountainFrontest();
}

/**
 * Making the sky
 */
function drawSunset() {
    background("#FF724C")
}

/**
 * Drawing the ocean
 */
function drawOcean() {
    push();
    noStroke();
    fill("blue");
    rect(0, 400, 500, 100);
    pop();
}


/**
 * Drawing the first mountain range
 */
function drawMountainFrontest() {
    // Mountain base
    push();
    noStroke();
    fill("purple");
    rect(0, 350, 500, 50);
    pop(); 
}

/**
 * Drawing the second mountain range
 */
function drawMountainFront() {
    // Mountain base
    push();
    noStroke();
    fill("brown");
    rect(0, 300, 500, 100);
    pop();
    
    // Mountain peak
    push();
    noStroke();
    fill("brown");
    triangle(0, 300, 250, 300, 200, 250); 
    pop();
}

/**
 * Drawing the third mountain range
 */
function drawMountainMiddle() {
    // Mountain base
    push();
    noStroke();
    fill("red");
    rect(0, 270, 500, 70);
    pop();
    
    // Mountain peak
    push();
    noStroke();
    fill("red");
    triangle(250, 270, 420, 140, 500, 270); 
    pop();
}

/**
 * Drawing the fourth mountain range
 */
function drawMountainBack() {
    // Mountain base
    push();
    noStroke();
    fill("green");
    rect(0, 220, 500, 50);
    pop();
    
    // // Mountain peak
    push();
    noStroke();
    fill("green");
    triangle(0, 220, 110, 130, 230, 240); 
    pop();
}

/**
 * Drawing the sun
 */
function drawSun() {
    push();
    noStroke();
    fill("yellow");
    ellipse(100, 100, 100);
    pop();
}

