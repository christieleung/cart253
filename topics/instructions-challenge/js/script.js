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
    drawSky();
    drawOcean();
    drawSun();
    drawEvilShadow();
    drawMountainBack();
    drawMountainMiddle();
    drawMountainFront();
    drawMountainFrontest();
}

/**
 * Making the sky
 */
function drawSky() {
    background("#b62779")
}

/**
 * Drawing the ocean
 */
function drawOcean() {
    push();
    noStroke();
    fill("black");
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
    fill("#872657");
    rect(0, 350, 500, 50);
    pop(); 
    
    // Mountain shade
    push();
    noStroke();
    fill("#872657");
    triangle(250, 350, 330, 300, 200, 250); 
    pop();
}

/**
 * Drawing the second mountain range
 */
function drawMountainFront() {
    // Mountain base
    push();
    noStroke();
    fill("orange");
    rect(0, 300, 500, 100);
    pop();
    
    // Mountain peak
    push();
    noStroke();
    fill("orange");
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
    fill("#CC5500");
    rect(0, 270, 500, 70);
    pop();
    
    // Mountain peak
    push();
    noStroke();
    fill("#CC5500");
    triangle(230, 270, 420, 140, 500, 270); 
    pop();
}

/**
 * Drawing the fourth mountain range
 */
function drawMountainBack() {
    // Mountain base
    push();
    noStroke();
    fill("#1b4b4b");
    rect(0, 220, 500, 50);
    pop();
    
    // Mountain peak
    push();
    noStroke();
    fill("#1b4b4b");
    triangle(0, 220, 110, 130, 350, 240); 
    pop();
    
    // Mountain shade
    push();
    noStroke();
    fill("#1b4b4b");
    triangle(420, 140, 300, 220, 500, 220); 
    pop();
}

/**
 * Drawing ominous shadow behind the mountains
 */
function drawEvilShadow() {
    push();
    noStroke();
    fill("black");
    triangle(0, 140, 300, 220, 500, 220); 
    pop();
}

/**
 * Drawing the sun
 */
function drawSun() {
    push();
    noStroke();
    fill("orange");
    ellipse(100, 100, 100);
    pop();
}

