/**
 * Lines
 * Christie Leung
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    
    // Gradient background
    for (let x = 0; x <= width; x++) {
        // Darker teal (0, 76, 76) to lighter teal (52, 167, 152)
        const r = map(x, 0, width, 0, 52);
        const g = map(x, 0, width, 76, 162);
        const b = map(x, 0, width, 76, 152);
        stroke(r, g, b);
        line(x, 0, x, height);
    }
       
    // Vertical lines
    let x = 0;
    let strokeColourX = 0;
    
    while (x <= width) {
        stroke(strokeColourX);
        // x and width have the same value
        line(x, 0, x, height);
        
        strokeColourX += 25;
        x += 50;
    }
    
    // Horizontal lines
    let y = 0;
    let strokeColourY = 0;
    
    while (y <= height) {
        stroke(strokeColourY);
        // y and height have the same value
        line(0, y, width, y);
        
        strokeColourY += 5;
        y += 5;
    }
}
