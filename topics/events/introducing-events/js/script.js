/**
 * Introducing events
 * Christie Leung
 * 
 * Taking a look at how events work in Javascript and p5
 * 
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
    background(0);
}

/**
 * Does nothing!
*/
function draw() {

}

/**
 * Draws a circle at the mouse location
 */
function mousePressed() {
    push();
    noStroke()
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 50);
    pop();
}