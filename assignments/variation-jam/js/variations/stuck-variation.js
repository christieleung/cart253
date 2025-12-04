/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Images of a girl who feels stuck, can't think through her thoughts
let stuckImg = {
    girl: undefined
}

// Variable for mouse-drawing layer
let lineLayer = undefined;

/**
 * This will be called just before the stuck variation starts
 * Initializes the background and mouse-drawing layer
 */
function stuckSetup() {   
    background("silver"); 
    // Creates a new layer
    // Learned how to use function from: https://www.youtube.com/watch?v=TaluaAD9MKA
    lineLayer = createGraphics(700, 600);
    // Makes the layer transparent
    lineLayer.clear();
}

/**
 * This will be called every frame when the stuck variation is active
 * Draws the background, the girl image, and the mouse-drawing layer
 */
function stuckDraw() {
    // Draws a static-like, randomized grey background
    // Referenced code from: https://editor.p5js.org/Sekyi/sketches/rb6qBfKB3
    for (rectX = 0; rectX <= width; rectX = rectX + 5) {
        for (rectY = 0; rectY <= height; rectY = rectY + 5) {
            // Random light greys
            let grey = random(130, 230);
            fill(grey, grey, grey, 120);
            noStroke();
            rect(rectX, rectY, 3, 3);
        }
    }
    
    // Displays the image of the girl
    image(stuckImg.girl, 140, 180, 440, 290);
    
    // Draws a line following mouse movement in the mouse-drawing layer
    // Referenced code from: https://editor.p5js.org/brain/sketches/ojB-QN8Tv
    lineLayer.stroke(0);
    lineLayer.strokeWeight(2);
    lineLayer.line(mouseX, mouseY, pmouseX, pmouseY);
    
    // Displays mouse-drawing layer above everything else
    image(lineLayer, 0, 0);
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