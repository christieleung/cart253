/**
 * Variation Jam
 * Christie Leung
 * 
 * ...
 */

"use strict";

let state = "menu";

// Variable for key codes
const key = {
    one: 49,
    two: 50,
    three: 51,
    esc: 27,
    space: 32
}

// Colour and size of the instruction panel background
// Positioning and spacing of the instruction text
const instructionPanel = {
    bg: {
        fill: {
        r: 245,
        g: 245,
        b: 210
        }, 
        opacity: 235,
        width: 530,
        height: 430, 
    },
    text: {
        offsetY: 150,
        lineSpacing: 30 
    }
   
}

// Position and size of the girl image
const girl = {
    x: 140,
    y: 180,
    width: 440,
    height: 290
}

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
    daydreamImg.record = loadImage('assets/images/record_daydream.png');
    
    // Anxious variation
    anxietyImg.girl = loadImage('assets/images/girl_anxious.png');
    anxietyImg.record = loadImage('assets/images/record_anxiety.png');
    anxietyImg.time = loadImage('assets/images/time.png');
    anxietyImg.health = loadImage('assets/images/health.png');
    anxietyImg.work = loadImage('assets/images/work.png');
    anxietyImg.reminderBlue = loadImage('assets/images/reminder_1.png');
    anxietyImg.reminderPurple = loadImage('assets/images/reminder_2.png');
    
    
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
 * Draws the instruction panel
 */
function drawInstructionPanel(instructionArray) {
    drawInstructionPanelBg(instructionArray);
    drawInstructionText(instructionArray);
}

/**
 * Draws the background rectangle for the instruction panel
 */
function drawInstructionPanelBg(instructionArray) {
    push();
    noStroke();
    fill(instructionPanel.bg.fill.r, instructionPanel.bg.fill.g, instructionPanel.bg.fill.b,
        instructionPanel.bg.opacity);
    rectMode(CENTER);
    rect(width / 2, height / 2, instructionPanel.bg.width, instructionPanel.bg.height);
    pop();   
}
 
/**
 * Draws the instruction text inside the panel
 */
function drawInstructionText(instructionArray) {
    push();
    fill(50);
    textAlign(CENTER, CENTER);
    textSize(20);
    let textStartingY = height / 2 - instructionPanel.bg.height / 2 + instructionPanel.text.offsetY;

    for (let i = 0; i < instructionArray.length; i++) {
        text(instructionArray[i], width / 2, textStartingY + i * instructionPanel.text.lineSpacing);
    }

    pop();
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
