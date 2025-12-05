/**
 * Variation Jam (a peek inside my head!)
 * 
 * Christie Leung
 * 
 * This project explores what the inside of my head looks like when I'm daydreaming, feeling anxious, or feeling stuck. 
 * Each version features a girl with a matching expression and experience. The images were hand-drawn and then coloured in Photoshop.
 * 
 * The daydreaming and anxious variations include draggable items. When an item is dragged, a sound effect plays and a thematic cursor 
 * trail appears–randomized stars in daydreaming and randomized spirals in anxious. The items in the anxious state also slightly tremble.  
 * 
 * There are no items at all in the stuck variation. Instead, the mouse becomes a pen, allowing you to draw all over the canvas, 
 * or do nothing at all. The drawings can be cleared by pressing (delete / backspace).
 *  
 * Mouse controls:
 * - Click items to select, drag to move them around in the daydreaming and anxious variations 
 * - Draw freely with the mouse in the stuck variation
 * 
 * Keyboard controls:
 * - Press (1), (2), or (3) to enter each variation
 * - Press (space) to show or hide the intructions panel
 * - Press (escape) to return to the menu
 * - Press (delete / backspace) to clear drawings in the stuck variation
 * 
 * Have the sound on!
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Variable that allows for different states 
// (states: menu, daydreaming-variation, anxious-variation, stuck-variation)
let state = "menu";

// Variable for key codes
const key = {
    one: 49,
    two: 50,
    three: 51,
    esc: 27,
    space: 32,
    delete: 8
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
        fill: {
            r: 55,
            g: 55,
            b: 55    
        },
        offsetY: 143,
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

// Stores sound effects
const sounds = {
    daydreamingSong: undefined,
    anxietySong: undefined,
    shimmering: undefined,
    ticking: undefined,
    paperCrinkle: undefined,
    stickyNote: undefined,
    writing: undefined,
    heartbeat: undefined,
    static: undefined,
};

/**
 * Preload images and sounds
 */
function preload() {
    preloadImages();
    preloadSounds();
}

/**
 * Preload image assets
 */
function preloadImages() {
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
 * Preload sound assets and sets volume
 */
function preloadSounds() {
    // MP3s
    // Crimson and Clover, cover by The Shacks, downloaded from: https://www.youtube.com/watch?v=5sUeNgPLijE
    sounds.daydreamingSong = loadSound("assets/sounds/crimson_and_clover_the_shacks.mp3");
    // Sets volume to 10%
    sounds.daydreamingSong.setVolume(0.10);
    
    // Who Knows, by Daniel Caesar, downloaded from: https://www.youtube.com/watch?v=glscfhJyZHo&list=RDglscfhJyZHo&start_radio=1
    sounds.anxietySong = loadSound("assets/sounds/who_knows_daniel_caesar.mp3");
    sounds.anxietySong.setVolume(0.10);
    
    // From Pixabay: https://pixabay.com/sound-effects/shimmering-object-79354/
    sounds.shimmering = loadSound("assets/sounds/shimmering.mp3");
    sounds.shimmering.setVolume(0.35);
    
    // From Pixabay: https://pixabay.com/sound-effects/clock-ticking-down-376897/
    sounds.ticking = loadSound("assets/sounds/clock_ticking.mp3");
    sounds.ticking.setVolume(0.25);
    
    // From Pixabay: https://pixabay.com/sound-effects/paper-crinkle-291786/
    sounds.paperCrinkle = loadSound("assets/sounds/paper_crinkle.mp3");
    sounds.paperCrinkle.setVolume(0.20);
    
    // From Pixabay: https://pixabay.com/sound-effects/turning-book-page-79935/
    sounds.stickyNote = loadSound("assets/sounds/page.mp3");
    sounds.stickyNote.setVolume(0.40);
    
    // From Pixabay: https://pixabay.com/sound-effects/scribble-6144/
    sounds.writing = loadSound("assets/sounds/writing.mp3");
    sounds.writing.setVolume(0.40);
    
    // From Pixabay: https://pixabay.com/sound-effects/heartbeat-sound-effect-111218/
    sounds.heartbeat = loadSound("assets/sounds/heartbeat.mp3");
    sounds.heartbeat.setVolume(0.40);
    
    // From Pixabay: https://pixabay.com/sound-effects/tv-static-noise-291374/
    sounds.static = loadSound("assets/sounds/static.mp3");
    sounds.static.setVolume(0.11); 
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
 * Sets default font size to 20
 */
function drawInstructionPanel(instructionArray, fontSize = 20) {
    drawInstructionPanelBg(instructionArray);
    drawInstructionText(instructionArray, fontSize);
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
function drawInstructionText(instructionArray, fontSize) {
    push();
    fill(instructionPanel.text.fill.r, instructionPanel.text.fill.g, instructionPanel.text.fill.b);
    textAlign(CENTER, CENTER);
    textSize(fontSize);
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
