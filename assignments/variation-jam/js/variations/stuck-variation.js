/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */


// Images of a girl who feels stuck, can't think through her thoughts
let stuckImg = {
    girl: undefined
}

/**
 * This will be called just before the stuck variation starts
 */
function stuckSetup() {
    background("silver");
    // Display image of girl
    image(stuckImg.girl, 140, 180, 440, 290);
}

/**
 * This will be called every frame when the stuck variation is active
 */
function stuckDraw() {
    // Draws a line following the mouse's position
    // Referenced code from: https://editor.p5js.org/brain/sketches/ojB-QN8Tv
    stroke(0);
    strokeWeight(2);
    line(mouseX, mouseY, pmouseX, pmouseY);
}

/**
 * This will be called whenever a key is pressed while the stuck variation is active
 */
function stuckKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the stuck variation is active
 */
function stuckMousePressed() {
    
}