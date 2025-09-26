/**
 * Self-Portrait
 * Christie Leung
 * 
 * My self-portrait!
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(500, 500);
}

/**
 * Fills the background and displays the face, hair, polka dots, and flowers
*/
function draw() {
    background("#ADD8E6"); // temporary blue bg colour
  
    // drawEyes();
    // drawMouth();
    // drawCheeks();
    
    drawCurls();
    maskCurls();   
    drawHair();
    drawFace();
    drawEar();
    drawEarCurl();
    drawBangs();
    
    // drawSnow();
    // drawFlowers();
}

/**
 * Draws the face
*/
function drawFace() {
    push();
    noStroke();
    fill("#E5C298");
    ellipse(165, 220, 180);
    pop();
}

/**
 * Draws the hair
*/
function drawHair() {
    push();
    noStroke();
    fill("#000000"); // black
    ellipse(160, 210, 277); // behind head
    ellipse(80, 405, 400); // hair bottom left
    ellipse(298, 280, 120, 190); // hair top right
    ellipse(363, 465, 360); // hair bottom right
    pop();
}

/**
 * Draws the curl placements (black circles)
*/
function drawCurls() {
    push();
    noStroke();
    fill("#000000"); 
    ellipse(140, 80, 60); // top curl
    ellipse(45, 130, 60); // top left curl
    ellipse(20, 200, 57); // bottom left curl
    ellipse(295, 170, 50); // top right curl
    ellipse(370, 265, 60); // bottom right curl
    ellipse(480, 320, 65); // end curl
    pop();  
}

/**
 * Makes the curl (masks part of black circles with bg colour circles)
*/
function maskCurls() {
    push();
    noStroke();
    fill("#ADD8E6");
    ellipse(160, 70, 50); // top curl mask
    ellipse(40, 90, 80); // top left curl mask
    ellipse(7, 165, 41); // bottom left curl mask
    ellipse(300, 150, 40); // top right curl mask
    ellipse(380, 240, 54); // bottom right curl mask
    ellipse(473, 288, 60); // end curl mask
    pop();
}

/**
 * Draws the slightly side-parted bangs
*/
function drawBangs() {
    push();
    noStroke();
    fill("#000000");
    ellipse(200, 145, 150, 100); // right bang
    ellipse(85, 175, 110); // left bang
    pop();
}

/**
 * Draws the ear
 */
function drawEar() {
    push();
    noStroke();
    fill("#E5C298");
    ellipse(67, 265, 35);
    pop();

/**
 * Draws the curl in front of the ear (uses the colour masking method again)
 */
function drawEarCurl() {
    push();
    noStroke();
    fill("#000000");
    ellipse(110, 250, 85);
    // ear curl mask
    fill("#E5C298");
    ellipse(140, 230, 90);
    pop();
}