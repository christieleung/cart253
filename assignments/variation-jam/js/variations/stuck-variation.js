/**
 * This file contains the code to run *only* the stuck variation part of the program.
 * Note how it has its own draw, stuckDraw(), and its own keyPressed, stuckKeyPressed().
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

// Array for instruction text in the stuck variation
const stuckInstructions = [
    "✴︎ when i'm feeling stuck! ✴︎",
    "",
    "• draw messy webs of thoughts using the mouse",
    "• press (delete) to erase them",
    "• press (space) to toggle this instruction panel",
    "• press (esc) to return to the menu",
    "• have your sound on!",
];

// Shows and hides instruction panel
let showStuckInstructions = true;

// Stores image of a girl who feels stuck
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
 * Initializes the instructions panel and mouse-drawing layer
 */
function stuckSetup() {   
    // Resets instruction panel to visible
    showStuckInstructions = true;
    
    // Creates a new layer
    // Learned how to use function from: https://www.youtube.com/watch?v=TaluaAD9MKA
    lineLayer = createGraphics(width, height);
    // Makes the layer transparent
    lineLayer.clear();
    
    // Play static sound effect in the background
    sounds.static.loop();
}

/**
 * This will be called every frame when the stuck variation is active
 * Draws the background, the girl image, and the mouse-drawing layer
 */
function stuckDraw() {
    background(staticBg.fill.r, staticBg.fill.g, staticBg.fill.b);
    // Draws the animated static squares
    drawStatic();
  
    // Displays the image of the girl
    image(stuckImg.girl, girl.x, girl.y, girl.width, girl.height);
    
    // Draws the lines in the mouse-drawing layer
    drawLines();
    
    // Draw instruction panel only if active
    if (showStuckInstructions) {
        drawInstructionPanel(stuckInstructions);
    }
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
    
    // Displays mouse-drawing layer (at the origin) above the girl and static bg
    image(lineLayer, 0, 0);
    pop();
}

/**
 * This will be called whenever a key is pressed while the stuck variation is active
 * Handles returning to the menu, showing/hiding the instruction panel, and erasing drawn lines
 */
function stuckKeyPressed(event) {
    // Return to the main menu by pressing esc
    if (event.keyCode === key.esc) {
        // Stop playing static sound
        if (sounds.static.isPlaying()) {
            sounds.static.stop();
        }
        state = "menu";
    }
    
    // Toggle instructions by pressing space
    if (event.keyCode === key.space) {
        showStuckInstructions = !showStuckInstructions;
    }
    
    // Erase lines by pressing delete
    if (event.keyCode === key.delete) {
        lineLayer.clear();
    }
}

/**
 * This will be called whenever the mouse is pressed while the stuck variation is active
 */
function stuckMousePressed() {
    // Didn't end up using it but keeping it here in case I want to add to it!
}