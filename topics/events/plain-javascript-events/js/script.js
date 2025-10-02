/**
 * Plain Javascript Events
 * Christie Leung
 * 
 * Experimenting with event handling in Plain Javascript
 */

"use strict";

// Information about current and possible background fills
const bg = {
    fill: "#000000",
    fills: {
        black: "#000000",
        white: "#ffffff"
    },
    switchKey: 32 // Space bar
};

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
    
    // Listen for keypressess
    window.addEventListener("keydown", changeBG);
}

/**
 * Displays the background
*/
function draw() {
    background(bg.fill);
}

/**
 * Switches the background from black to white
 */
function changeBG(event) {
    if (event.keyCode === bg.switchKey) {
        if (bg.fill === bg.fills.black) {
            bg.fill = bg.fills.white;
        }
        else {
            bg.fill = bg.fills.black;
        }
    }
}

// events:
// "mousedown" "mouseup" "mousemove" "mouseenter" "mouseleave" "dblclick"
// "keydown" "keyup"
// "online" "offline"
// scroll