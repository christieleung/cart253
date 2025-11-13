/**
 * Terrible New Car
 * Christie Leung
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let fishData = undefined;
let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";

/**
 * Load the car and fish data
 */
function preload() {
    carData = loadJSON("assets/data/cars.json");
    fishData = loadJSON("assets/data/fish.json");   
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    // Chooses a random car brand
    let car = random(carData.cars);
    // Chooses a random fish species
    let fish = random(fishData.fish);
    // Puts them together
    carName = car + " " + fish;
}