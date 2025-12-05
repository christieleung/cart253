/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Background colour and rectangle (square) starting position, spacing (between), size, 
// greyscale values, and opacity for the animated static background
const staticBg = {
    // Silver (canvas fill)
    fill: {
        r: 192,
        g: 192,
        b: 192
    },
    rect: {
        startingPosition: 0,
        spacing: 5,
        size: 3,
        // Lighter greys (static squares)
        greyscale: {
            lowerRange: 130,
            upperRange: 240
        },
        opacity: 120
    }    
}

// Image placeholder of a girl who feels stuck
let stuckImg = {
    girl: undefined
}

// Variable for mouse-drawing layer
let lineLayer = undefined;

// Mouse-drawing stroke colour and weight
const mouseDrawing = {
    // Black
    stroke: {
        fill: {
            r: 0,
            g: 0,
            b: 0
        }
    },
    strokeWeight: 2
}

/**
 * This will be called just before the stuck variation starts
 * Initializes the background and mouse-drawing layer
 */
function stuckSetup() {   
    background(staticBg.fill.r, staticBg.fill.g, staticBg.fill.b); 
    // Creates a new layer
    // Learned how to use function from: https://www.youtube.com/watch?v=TaluaAD9MKA
    lineLayer = createGraphics(width, height);
    // Makes the layer transparent
    lineLayer.clear();
}

/**
 * This will be called every frame when the stuck variation is active
 * Draws the background, the girl image, and the mouse-drawing layer
 */
function stuckDraw() {
    // Draws the static background
    drawStatic();
  
    // Displays the image of the girl
    image(stuckImg.girl, girl.x, girl.y, girl.width, girl.height);
    
    // Draws the lines in the mouse-drawing layer
    drawLines();
}

/**
 * Draws a static-like, randomized greyscale background using tiny squares
 * Referenced code from: https://editor.p5js.org/Sekyi/sketches/rb6qBfKB3
 */
function drawStatic() {
    push();
    for (let rectX = staticBg.rect.startingPosition; rectX <= width; rectX += staticBg.rect.spacing) {
        for (let rectY = staticBg.rect.startingPosition; rectY <= height; rectY += staticBg.rect.spacing) {
            let staticGreyscale = random(
                staticBg.rect.greyscale.lowerRange,
                staticBg.rect.greyscale.upperRange);
            
            noStroke();
            fill(staticGreyscale, staticBg.rect.opacity);
            rect(rectX, rectY, staticBg.rect.size, staticBg.rect.size);
        }
    }
    pop();
}

/**
 * Draws a line following mouse movement in the mouse-drawing layer
 * Referenced code from: https://editor.p5js.org/brain/sketches/ojB-QN8Tv
 */
function drawLines() {
    push();
    lineLayer.stroke(mouseDrawing.stroke.fill.r, mouseDrawing.stroke.fill.g, mouseDrawing.stroke.fill.b);
    lineLayer.strokeWeight(mouseDrawing.strokeWeight);
    lineLayer.line(mouseX, mouseY, pmouseX, pmouseY);
    
    // Displays mouse-drawing layer (at the origin) above everything else
    image(lineLayer, 0, 0);
    pop();
}

/**
 * This will be called whenever a key is pressed while the stuck variation is active
 * Returns to the main menu by pressing esc
 */
function stuckKeyPressed(event) {
    if (event.keyCode === key.esc) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the stuck variation is active
 */
function stuckMousePressed() {
    
}