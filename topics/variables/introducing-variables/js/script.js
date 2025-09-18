/**
 * Introducing Variables
 * Christie Leung
 * 
 * Learning what a variable is and does!
 */

"use strict";

/**
 * Create a canvas
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * Draws a circle in the centre of the canvas
*/
function draw() {
    background(0);
    
    // Draw the circle
    push();
    fill(mouseX, mouseY, 0);
    noStroke();
    ellipse(width / 2, height / 2, mouseX, mouseY);
    pop();
}

