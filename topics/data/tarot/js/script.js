/**
 * Tarot
 * Christie Leung
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";

// Our tarot data
let tarot = undefined;

// Our fortune
let fortune = "Click to show a fortune.";

/**
 * Load tarot date
 */
function preload() {
    tarot = loadJSON("assets/data/tarot_interpretations.json")
}

/**
 * Create a canvas
*/
function setup() {
    createCanvas(800, 400);
}

/**
 * Display tarot
*/
function draw() {
    background(0);
    
    // Example: Fool Card Meaning
    //
    // Can be broken down:
    // const card = tarot.tarot_interpretations[0];
    // const meanings = card.meanings;
    // const shadows = meanings.shadow;
    // const fool = shadows[0];
    //
    // Or all in one length:
    // const fool = tarot.tarot_interpretations[0].meanings.shadow[0];
    
    // Display the information
    push();
    textSize(18);
    fill("yellow");
    textAlign(CENTER, CENTER);
    text(fortune, width / 2, height / 2);
    pop();
}

/**
 * Randomize a fortune on mouse press
 */
function mousePressed() {
    // Choose a random card
    const card = random(tarot.tarot_interpretations);
    // Choose a random fortune
    fortune = random(card.fortune_telling);
}