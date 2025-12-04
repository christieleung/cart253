/**
 * Variation Jam
 * Christie Leung
 * 
 * ...
 */

"use strict";

let state = "anxious-variation";

/**
 * Preload images
 */
function preload() {
    // Daydreaming variation
    daydreamImg.girl = loadImage('assets/images/girl_daydream.png');
    daydreamImg.bunny = loadImage('assets/images/bunny.png');
    daydreamImg.cat = loadImage('assets/images/cat.png');
    daydreamImg.sakuraLightPink = loadImage('assets/images/sakura_light_pink.png');
    daydreamImg.sakuraDarkPink = loadImage('assets/images/sakura_dark_pink.png');
    daydreamImg.orchid = loadImage('assets/images/orchid.png');
    daydreamImg.record = loadImage('assets/images/record.png');
    
    // Anxious variation
    anxietyImg.girl = loadImage('assets/images/girl_anxious.png');
    anxietyImg.record = loadImage('assets/images/record.png');
    
    // Stuck variation
    stuckImg.girl = loadImage('assets/images/girl_think.png')
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(700, 600);
    
    switch (state) {
        case "daydreaming-variation":
            daydreamingSetup();
            break
        case "anxious-variation":
            anxiousSetup();
            break;
        case "stuck-variation":
            stuckSetup();
            break;
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
            anxiousDraw();
            break;
        case "stuck-variation":
            stuckDraw();
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
            anxiousMousePressed();
            break;
        case "stuck-variation":
            stuckMousePressed();
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
        case "anxious-variation":
            anxiousMouseDragged();
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
        case "anxious-variation":
            anxiousMouseReleased();
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
            anxiousKeyPressed(event);
            break;
        case "stuck-variation":
            stuckKeyPressed(event);
            break;
    }
}
