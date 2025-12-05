/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Menu text with title and variation names
const menuInstruction = [
    "a peek inside my head!",
    "",
    "press (number key) to enter each mind state:",
    "(1) daydreaming",
    "(2) anxious",
    "(3) stuck"
]

// Menu screen background colour
const menuBg = {
    fill: {
        r: 245,
        g: 245,
        b: 220
    }
}

// Space between, thickness, and colour of the stripes for the gingham background pattern
const gingham = {
    spacing: 18,
    width: 18,
    horizontal: {
        // Brown + transparency
        fill: {
            r: 128,
            g: 90,
            b: 64,
        },
        opacity: 90
    },
    vertical: {
        // Pink
        fill: {
            r: 255,
            g: 192,
            b: 203
        }
    }
}

// Colour, opacity, and size of the menu panel background
// Colour of the menu panel text
const menuPanel = {
    bg: {
       fill: {
            r: 245,
            g: 245,
            b: 210
        }, 
        opacity: 200,
        width: 530,
        height: 430  
    },
    text: {
       fill: {
            r: 55,
            g: 55,
            b: 55
        },  
        strokeWeight: 2
    }
   
}

/**
 * Display the main menu
 * Draws a gingham background, a text panel, and the menu instructions
 */
function menuDraw() {
    background(menuBg.fill.r, menuBg.fill.g, menuBg.fill.b);
    
    drawGingham();
    // Resets blend mode (colour mixing)
    blendMode(BLEND);
    
    // Draw menu instructions with bigger font size
    drawInstructionPanel(menuInstruction, 22);
}

/**
 * Draws the gingham background
 */
function drawGingham() {
    drawGinghamHorizontal();
    drawGinghamVertical();
}

/**
 * Draws the horizontal gingham stripes
 */
function drawGinghamHorizontal() {
    push();
    // Mix and darken colours where the horizontal and vertical stripes overlap
    blendMode(MULTIPLY);
    noStroke();
    fill(gingham.horizontal.fill.r, gingham.horizontal.fill.g, gingham.horizontal.fill.b, gingham.horizontal.opacity);
    
    for (let y = 0; y <= height; y += gingham.width + gingham.spacing) {
        rect(0, y, width, gingham.width);
    }
    
    pop();
}
    
/**
 * Draws the vertical gingham stripes
 */
function drawGinghamVertical() {
    push();
    blendMode(MULTIPLY);
    noStroke();
    fill(gingham.vertical.fill.r, gingham.vertical.fill.g, gingham.vertical.fill.b);
    
    for (let x = 0; x <= width; x += gingham.width + gingham.spacing) {
        rect(x, 0, gingham.width, height);      
    }
    
    pop();
}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {
    switch (event.keyCode) {
        case key.one:
            state = "daydreaming-variation";
            daydreamingSetup();
            break;

        case key.two:
            state = "anxious-variation";
            anxiousSetup();
            break;

        case key.three:
            state = "stuck-variation";
            stuckSetup();
            break;
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {

}