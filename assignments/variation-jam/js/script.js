/**
 * Variation Jam
 * Christie Leung
 * 
 * ...
 */

"use strict";

let state = "daydreaming-variation";

/**
 * Create the canvas
*/
function setup() {
    createCanvas(700, 600);
    
    switch (state) {
        case "daydreaming-variation":
            daydreamingSetup();
    }
}

/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "daydreaming-variation":
            daydreamingDraw();
            break
        case "anxious-variation":
            greenDraw();
            break;
        case "stuck-variation":
            blueDraw();
            break;
    }
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "daydreaming-variation":
           daydreamingMousePressed();
            break
        case "anxious-variation":
            greenMousePressed();
            break;
        case "stuck-variation":
            blueMousePressed();
            break;
    }
}

/**
 * Listen for mouse dragged and call the function for it in the
 * current state
 */
function mouseDragged() {
    switch (state) {
        case "daydreaming-variation":
           daydreamingMouseDragged();
    }
}

/**
 * Listen for mouse released and call the function for it in the
 * current state
 */
function mouseReleased() {
    switch (state) {
        case "daydreaming-variation":
            daydreamingMouseReleased();
    }
}

/**
 * Listen for keypressed and call the function for it in the
 * current state
 */
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "daydreaming-variation":
            daydreamingKeyPressed(event);
            break
        case "anxious-variation":
            greenKeyPressed(event);
            break;
        case "stuck-variation":
            blueKeyPressed(event);
            break;
    }
}
