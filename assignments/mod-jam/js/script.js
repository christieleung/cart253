/**
 * Mod Jam (Goodnight Frog)
 * Christie Leung
 * 
 * A game of catching flies with your frog-tongue
 * Frog can't fall asleep before its belly is full, help frog catch flies before night falls!
 * 
 * Instructions:
 * - Press the space bar to switch between title, instructions, game, and ending screens
 * - Move the frog with the left and right arrow keys
 * - Press the space bar to launch the tongue
 * - Catch 10 flies before night falls (30 second timer)
 * - Double hit to catch the flies trapped in bubbles (pop the bubble first)
 * - Have the sound on!
 *  
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our Frog in the game state
const frog = {
    // The frog's body has a position, size, speed, and colour
    body: {
        x: 320,
        y: 450,
        w: 157,
        h: 105,
        speed: 7,
        // Mossy green
        fill: {
            r: 124,
            g: 161,
            b: 78
        },
        // Position and size for the parts behind the eyes
        behindEyes: {
            x: 40,
            y: 46,
        },
        sizeFactor: 0.26
    },
    
    // The frog's tongue has a position, size, speed, state, and colour
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound
        // Dark pink
        fill: {
            r: 213,
            g: 84,
            b: 118
        }
    }
};

// Our fly with wings in the game state
// Has a position, size, and colour
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    // Black
    fill: {
        r: 0,
        g: 0, 
        b: 0
    },
    wing: {
        // Stroke weight of wings
        strokeWeight: 1.8,
        // Factor to multiply by to make the wings proportional to the fly body size
        // How much smaller the wings are than the body
        sizeFactor: 0.9,
        // Factor to control the angle of the wings
        ratio: 2.5
    }
};

// Default fly movement for the game state
// Has a speed, angle, and amplitude (input into sine function) 
let flyMovement = {
    speed: 2,
    angle: 0,
    amplitude: 30,
    midline: 200
}

// Fly wing length calculation for the same state
const wingLength = fly.size * fly.wing.sizeFactor; 

// Bubbles (that some flies are randomly trapped in) in the game state
const bubble = {
    // Light blue and transparent
    fill: {
        r: 187,
        g: 238,
        b: 255,
        transparency: 100
    },
    strokeWeight: 1.7,
    // How much larger the bubble is than the fly
    sizeFactor: 3.1
}

// Bubble size calculation for the game state
const bubbleSize = fly.size * bubble.sizeFactor

// Key codes for the left arrow, right arrow, and space bar
const keyCode = {
    left: 37,
    right: 39,
    space: 32
}

// Background colour on the title and instructions screen
const bg = {
    // Muted light blue
    fill: {
        r: 140,
        g: 190,
        b: 214
    }
}

// Lily pads on the title screen
const lilyPad = {
    // Full lily pad position, size, and speed
    full: {
        x: 520,
        y: 125,
        size: 145,
        speed: 0.007
    },
    // Lily pad base colour
    base: {
        // Bright green
        fill: {
            r: 60,
            g: 140,
            b: 75
        }
        },
    // Star pattern colour and parameters (radius, number of points)
    star: {
         // Yellow green
        fill: {
            r: 178,
            g: 224,
            b: 128
        },
        // Multiplying factors for star radii
        factor: {
            radius1: 0.03,
            radius2: 0.3
        },
        points: 6
        },
    // Arc parameters (position, size, angle) and speed of the lily pad with a notch
        notch: {
        x: 130,
        y: 330,
        w: 145,
        h: 145,
        startAngle: Math.PI / 2.5, 
        endAngle: -7.5 * Math.PI / 4,
        speed: 0.005
    }
}    

// Stripes in the background of the title screen
let stripe = {
    // Space between each stripe
    spacing: 25,
    // White with 50% transparency
    fill: {
        r: 255,
        g: 255,
        b: 255,
        transparency: 50
    },
    strokeWeight: 3
}

// Frog heads on the instructions screen
const frogHead = {
    // Frog head positions
    position: {
        x: {
            hungry: 100,
            catching: 320,
            sleeping: 540
        },
        y: 150        
    },
    // Frog head size
    head: {
        w: 100,
        h: 68
    },
    // Part behind left eye
    left: {
        x: -26,
        y: -30,
        size: 30
    },
    // Part behind right eye
    right: {
        x: 26,
        y: -30,
        size: 30
    }
}

// Frog faces on the instruction screen
// Note: position values are offset from the (x, y) of the frog heads
const frogFace = {
    // Frog facial features colour
    // Black
    features: {
        r: 0,
        g: 0,
        b: 0,
        strokeWeight: 3
    },
    // Frog eye positions, size
    eyes: {
        open: {
            x: 25,
            y: 32,
            size: 9
        },
        closed: {
            x: 30,
            y: 30,
            length: 20
        }
    },
    // Frog mouth stroke weight, size, angle
    mouth: {
        frown: {
            w: 25,
            h: 20,
            startAngle: Math.PI,
            endAngle: 0
        },
        smile: {
            y: 5,
            w: 25,
            h: 20,
            startAngle: 0,
            endAngle: Math.PI
        }
    },
    // Frog tongue position and stroke weight
    tongue: {
        y1: 36,
        y2: 90,
        strokeWeight: 11
    },
}    

// Tiny fly on instructions screen
const tinyFly = {
    // Tiny fly body position and size
    body: {
        x: 25,
        y: 110,
        size: 7,
    },
    // Tiny fly wings position, size, and stroke weight
    wings: {
        x1: 25,
        leftx2: 31,
        rightx2: 19,
        y1: 110,
        y2: 113,
        strokeWeight: 1.5
    },
    // Position of the fly trapped in a bubble and its bubble
    bubble: {
        x: 63,
        y: 30
    }
}

// Position of the 'zzz' above sleeping frog head on the instructions screen
const tinyZzz = {
    x1: 3,
    x2: 20,
    x3: 5,
    y1: 50,
    y2: 60,
    y3: 70
}

// Rounded box position, size, corner radius, and colour on the instructions screen
const instructionsBox = {
    x: 50,
    y: 215,
    w: 540,
    h: 160,
    corner: 15,
    // White with transparency
    fill: {
        r: 255,
        g: 255,
        b: 255,
        transparency: 150
    }
}

// Progress bar position, size, corner radius, and colour in the game state
const progressBar = {
    x: 30,
    y: 30,
    w: 200,
    h: 25,
    corner: 12,
    // White with transparency
    fill: {
        r: 255,
        g: 255,
        b: 255,
        transparency: 150
    }
}

// Sky fill and timer settings in the game state
let sky = {
    fill: {
        // Light blue
        start: {
            r: 140,
            g: 190,
            b: 214
        },
        // Dark blue
        end: {
            r: 43,
            g: 44,
            b: 90
        }
    },
    timer: {
        // 30 second timer (in milliseconds)
        start: 0,
        end: 30000
    }
}

// Frog body position and size on both ending screens (sleeping and hungry)
// Note: position values are offset from (x, y)
const endingFrog = {
    head: {
        main: {
            w: 175,
            h: 120
        },
        behindEyes: {
            x: 46,
            y: 50,
            size: 45
        }
    },
    hands: {
        sleeping: {
            x: 80,
            y: 50,
        },
        hungry: {
            x: 50,
            y: 50
        },
        w: 50,
        h: 30
    }
}    

// Sleeping frog face, pillow, and blanket on the ending (sleeping) screen
// Each element has specific shape parameters (position, size, angle) and colours
// Note: position values are offset from (x, y)
const sleepingFrog = {
    // Pink background and blanket
    bgFill: {
        r: 232,
        g: 187,
        b: 199
    },
    eyes: {
        x1: 55,
        x2: 40,
        y: 52
    },
    smile: {
        y: 10
    },
    pillow: {
        x: 112,
        y: 100,
        w: 220,
        h: 125,
        corner: 20,
        // White
        fill: {
            r: 255,
            g: 255,
            b: 255
        }
    },
    blanket: {
        y: 170,
        w: 500,
        h: 250,
        startAngle: 7 * Math.PI / 5.9,
        endAngle: 11 * Math.PI / 6.05
    },
    zzz: {
        x1: 15,
        x2: 40,
        x3: 68,
        y1: 78,
        y2: 91,
        y3: 82
    }
}

// Hungry frog face and lily pad stuffie
// Each element has specific shape parameters (position, size) and colours
// Note: position values are offset from (x, y)
const hungryFrog = {
    eyes: {
        x: 45,
        y: 50,
        size: 15
    },
    tears: {
        x: 53,
        y: 43,
        w: 12,
        h: 7,
        // Light blue
        fill: {
            r: 135,
            g: 193,
            b: 255
        }
    },
    stuffie: {
        y: 65,
        w: 100,
        h: 100,
        // Green
        fill: {
            r: 0,
            g: 128,
            b: 0
        }
    }
}

// Variable that holds the appropriate action verb based on what the user needs to do
let actionVerb = "press space";

// Variable that allows for different states (title, instructions, game, sleep, hungry)
let state = "instructions"; // remember to change back to "title" after!

// Variables that control the rotation of the lily pads
// Set default angular position to 0 for no rotation at start
let lilyPadRotation = 0;
let lilyPadNotchRotation = 0;

// Variable that keeps track of how many flies have been caught
let fliesCaught = 0;
// Variable that defines the total number of flies needed to fill the progress bar (10)
const maxFlies = 10;

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    
    // Give the fly its first random position
    resetFly();
}

/**
 * Draw the title, instructions, game, or ending (sleeping) state
*/
function draw() {
    if (state === "title") {
        title();
    }   
    else if (state === "instructions") {
        instructions();
    }
    else if (state === "game") {
        game();
    }
    else if (state === "sleep") {
        sleep();
    }
    else if (state === "hungry") {
        hungry();
    }
}

/**
 * Displays the title screen
 */
function title() {
    // A light blue
    background(bg.fill.r, bg.fill.g, bg.fill.b);
    
    // Draws vertical stripes in the background
    drawStripes();
    
    // The title
    push();
    textSize(30);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(40, 80, 30);
    text("goodnight frog", width / 2, height / 2.1);
    pop();
    
    // Displays the full lily pad
    drawLilyPadFull(lilyPad.full.x, lilyPad.full.y, lilyPad.full.size);
    
    // Displays the lily pad with a notch
    drawLilyPadNotch();
        
    // Rotates the lily pads at specified speeds
        lilyPadRotation += lilyPad.full.speed; 
        lilyPadNotchRotation -= lilyPad.notch.speed;
    
    // The instruction to go to the how to play (instructions) screen
    push();
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(40, 80, 30);
    // emoticons copied from: https://emojicombos.com/star
    text(`⋆˚꩜｡ ${actionVerb} to begin! ⋆˙⟡`, width / 2, 3 * height / 3.5);
    pop();
}

/**
 * Draws a full lily pad with a star at the top left of the canvas
 */
function drawLilyPadFull(x, y, a) {
    push();
    // Sets the origin to the position of lily pad (becomes the centre of rotation)
    translate(x, y);
    // Rotates lily pad
    rotate(lilyPadRotation);
    // Draws lily pad base
    fill(lilyPad.base.fill.r, lilyPad.base.fill.g, lilyPad.base.fill.b);
    noStroke();
    ellipse(0, 0, a); 
    // Draws small central star pattern (veins)
    fill(lilyPad.star.fill.r, lilyPad.star.fill.g, lilyPad.star.fill.b);
    star(0, 0, a * lilyPad.star.factor.radius1, a * lilyPad.star.factor.radius2, lilyPad.star.points);
    pop();
}

/**
 * Draws a lily pad with a notch at the bottom left of the canvas
 */
function drawLilyPadNotch() {
    push();
    // Sets the origin to the position of the lily pad (becomes the centre of rotation)
    translate(lilyPad.notch.x, lilyPad.notch.y);
    // Rotates lily pad with a notch
    rotate(lilyPadNotchRotation);
    fill(lilyPad.base.fill.r, lilyPad.base.fill.g, lilyPad.base.fill.b);
    noStroke();
    arc(0, 0, lilyPad.notch.w, lilyPad.notch.h,
        lilyPad.notch.startAngle, lilyPad.notch.endAngle);
    pop(); 
}
 
/**
 * Draws vertical stripes across the canvas
 */
function drawStripes() {
    push();
    stroke(stripe.fill.r, stripe.fill.g, stripe.fill.b, stripe.fill.transparency);
    strokeWeight(stripe.strokeWeight);

    // Draws vertical lines that span the width of the canvas and are as tall as the height
    for (let x = 0; x < width; x += stripe.spacing) {
        line(x, 0, x, height);
    }
    pop();
}

/**
 * Displays the instructions screen
**/
function instructions() {
    background(bg.fill.r, bg.fill.g, bg.fill.b);

    // Instruction box background
    push();
    fill(instructionsBox.fill.r, instructionsBox.fill.g, instructionsBox.fill.b, instructionsBox.fill.transparency);
    noStroke();
    rect(instructionsBox.x, instructionsBox.y, instructionsBox.w, instructionsBox.h, instructionsBox.corner);
    pop();

    // The instructions on how to play
    push();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(40, 80, 30);
    text('catch 10 flies to help the frog fall asleep before night falls!', width / 2, height / 1.95);
    text('watch out for the fly bubbles! (double hit to catch)', width / 2, height / 1.73);
    text('move the frog using the left and right arrow keys', width / 2, height / 1.55);
    text('launch the tongue with the space bar', width / 2, height / 1.41);
    // The instruction to go to the game screen
    textSize(18);
    text(`⋆˚꩜｡ ${actionVerb} to play! ⋆˙⟡`, width / 2, 3 * height / 3.5);
    pop();
    
    // Draws the tongue and fly for the "catching frog" at the same coordinates as the head
    // Separated from the other mood functions because it needs to be called first 
    // so that the start of the tongue is covered by the head
    drawFrogFace(frogHead.position.x.catching, frogHead.position.y, "catching");
    
    // Draws a frog head at the specified (x, y) coordinates
    drawFrogHead(frogHead.position.x.hungry, frogHead.position.y);
    drawFrogHead(frogHead.position.x.catching, frogHead.position.y);
    drawFrogHead(frogHead.position.x.sleeping, frogHead.position.y);
}

/**
 * Draws the frog heads on the instructions screen
**/
function drawFrogHead(x, y) {
    push();
    translate(x, y);
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    noStroke();
    ellipse(0, 0, frogHead.head.w, frogHead.head.h); // Head
    ellipse(frogHead.left.x, frogHead.left.y, frogHead.left.size); // Part behind left eye
    ellipse(frogHead.right.x, frogHead.right.y, frogHead.right.size); // Part behind right eye
    pop();
    
    // Draws the expression at the same coordinates as the head
    drawFrogFace(frogHead.position.x.hungry, frogHead.position.y, "hungry");
    drawFrogFace(frogHead.position.x.sleeping, frogHead.position.y, "sleeping");
}

/**
 * Draws the frog face and accompanying elements depending on the mood on the instructions screen
 * (if the frog is hungry, catching flies, or sleeping)
 * Note: Inst short for instructions state
**/
function drawFrogFace(x, y, mood) {
    if (mood === "hungry") {
        // Open eyes, frowning mouth
        drawEyesInst(x, y);   
        drawFrownInst(x, y);
    }
    
    if (mood === "catching") { 
        // Tongue launched, a tiny fly with wings nearby
        drawTongueInst(x, y);
        drawTinyFlyInst(x, y);
        drawTinyFlyInst(x + tinyFly.bubble.x, y + tinyFly.bubble.y);
        drawBubbleInst(x + tinyFly.bubble.x, y + tinyFly.bubble.y);
    }
    
    if (mood === "sleeping") {
        // Closed eyes, smiling mouth, Zzz above head
        drawClosedEyesInst(x, y);
        drawSmileInst(x, y);
        drawZzzInst(x, y);
    }
}

/**
 * Draws the frog eyes on the instructions screen (hungry mood)
**/
function drawEyesInst(x, y) {
    push();
    fill(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    noStroke();
    ellipse(x - frogFace.eyes.open.x, y - frogFace.eyes.open.y, frogFace.eyes.open.size);
    ellipse(x + frogFace.eyes.open.x, y - frogFace.eyes.open.y, frogFace.eyes.open.size);
    pop();
}
       
/**
 * Draws the frowning mouth on the instructions screen (hungry mood)
 */
function drawFrownInst(x, y) {
   push();
    noFill();
    stroke(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    strokeWeight(frogFace.features.strokeWeight);
    arc(x, y, frogFace.mouth.frown.w, frogFace.mouth.frown.h,
        frogFace.mouth.frown.startAngle, frogFace.mouth.frown.endAngle);
    pop(); 
}
    
/**
 * Draws the tongue on the instructions screen (catching mood)
 */
function drawTongueInst(x, y) {
    push();
    stroke(frog.tongue.fill.r, frog.tongue.fill.g, frog.tongue.fill.b);
    strokeWeight(frogFace.tongue.strokeWeight);
    line(x, y - frogFace.tongue.y1, x, y - frogFace.tongue.y2);
    pop();
}

/**
 * Draws the tiny fly on the instructions screen (catching mood)
 */
function drawTinyFlyInst(x, y) { 
    drawTinyFlyBody(x, y);
    drawTinyFlyWingsInst(x, y);
}

/**
 * Draws the tiny fly body on the instructions screen (catching mood)
 */
function drawTinyFlyBody(x, y) {
    push();
    fill(fly.fill.r, fly.fill.g, fly.fill.b);
    noStroke();
    ellipse(x - tinyFly.body.x, y - tinyFly.body.y, tinyFly.body.size);
    pop(); 
}

/**
 * Draws the tiny fly wings on the instructions screen (catching mood)
 */
function drawTinyFlyWingsInst(x, y) {
    push();
    stroke(fly.fill.r, fly.fill.g, fly.fill.b);
    strokeWeight(tinyFly.wings.strokeWeight);
    // Left wing
    line(x - tinyFly.wings.x1, y - tinyFly.wings.y1,
        x - tinyFly.wings.leftx2, y - tinyFly.wings.y2); 
    // Right wing
    line(x - tinyFly.wings.x1, y - tinyFly.wings.y1,
        x - tinyFly.wings.rightx2, y - tinyFly.wings.y2);  
    pop();
}

/**
 * Draws the bubble around the tiny fly on the instructions screen (catching mood)
 */
function drawBubbleInst(x, y) {
    push();
    fill(bubble.fill.r, bubble.fill.g, bubble.fill.b, bubble.fill.transparency);
    stroke(bubble.fill.r, bubble.fill.g, bubble.fill.b);
    strokeWeight(bubble.strokeWeight);
    ellipse(x - tinyFly.body.x, y - tinyFly.body.y, 21);
    pop();
}

/**
 * Draws the closed eyes on the instructions screen (sleeping mood)
 */
function drawClosedEyesInst(x, y) {
    push();
    noFill();
    stroke(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    strokeWeight(frogFace.features.strokeWeight);
    // Closed left eye
    line(x - frogFace.eyes.closed.x, y - frogFace.eyes.closed.y,
        x - frogFace.eyes.closed.length, y - frogFace.eyes.closed.y); 
     // Closed right eye
    line(x + frogFace.eyes.closed.length, y - frogFace.eyes.closed.y,
        x + frogFace.eyes.closed.x, y - frogFace.eyes.closed.y);
    pop();
}

/**
 * Draws the smiling mouth on the instructions screen (sleeping mood)
 */
function drawSmileInst(x, y) {
    push();
    noFill();
    stroke(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    strokeWeight(frogFace.features.strokeWeight);
    arc(x, y - frogFace.mouth.smile.y, frogFace.mouth.smile.w, frogFace.mouth.smile.h,
        frogFace.mouth.smile.startAngle, frogFace.mouth.smile.endAngle);
    pop();
}        

/**
 * Draws the Zzz above the head on the instructions screen (sleeping mood)
 */
function drawZzzInst(x, y) {
    push();
    fill(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    textSize(20);
    text('z', x + tinyZzz.x1, y - tinyZzz.y1);
    text('z', x + tinyZzz.x2, y - tinyZzz.y2);
    text('z', x - tinyZzz.x3, y - tinyZzz.y3);
    pop();
}

/**
 * Runs the frog game
**/
function game() {
    // Measures how much time has passed since timer started
    let elapsed = millis() - sky.timer.start;
    // If the timer runs out before the needed number of flies have been caught,
    // then the game ends and goes to the losing (hungry) ending screen
    if (elapsed > sky.timer.end && fliesCaught < maxFlies) {
        state = "hungry";
        return;
    }
    // Amount to interpolate between the two sky colours
    // Constrained to make sure it doesn't go above or beyond specifiec colour range
    let amt = constrain(elapsed / sky.timer.end, 0, 1);
    // Blend the two sky colours
    let gameSky = lerpColor(color(sky.fill.start.r, sky.fill.start.g, sky.fill.start.b), color(sky.fill.end.r,sky.fill.end.g, sky.fill.end.b), amt);
    background(gameSky);
        
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawProgressBar();
}

/**
 * Moves the fly horizontally according to its speed and vertically along a sine wave 
 * Resets the fly if it gets all the way to the right
 * Referenced code from: https://editor.p5js.org/crecord/sketches/ByWfYwbjb
 */
function moveFly() {
    // Increases the sine wave angle so the fly oscillates up and down
    flyMovement.angle += 0.1;
    // Sets the fly's vertical position based on the sine wave
    fly.y = flyMovement.midline + sin(flyMovement.angle) * flyMovement.amplitude
    // Moves the fly horizontally
    fly.x += flyMovement.speed;
    // Handles the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Displays the fly in the game state
 */
function drawFly() {
    drawBubble();
    drawFlyBody();
    drawFlyWings();
}

/**
 * Draws the fly body as a black circle
 */
function drawFlyBody() {
    push();
    noStroke();
    fill(fly.fill.r, fly.fill.g, fly.fill.b);
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Draws the wings as two black diagonal lines
*/
function drawFlyWings() {
    push();
    stroke(fly.fill.r, fly.fill.g, fly.fill.b);
    strokeWeight(fly.wing.strokeWeight);
    // Left Wing
    line(fly.x, fly.y, fly.x - wingLength, fly.y - wingLength / fly.wing.ratio);
    // Right Wing
    line(fly.x, fly.y, fly.x + wingLength,  fly.y - wingLength / fly.wing.ratio);
    pop();
}

/**
 * Draws the bubble the fly is trapped in in the game state
 */
function drawBubble() {
    if (fly.inBubble) {
        push();
        fill(bubble.fill.r, bubble.fill.g, bubble.fill.b, bubble.fill.transparency);
        stroke(bubble.fill.r, bubble.fill.g, bubble.fill.b);
        strokeWeight(bubble.strokeWeight);
        ellipse(fly.x, fly.y, bubbleSize);
        pop();
    }
}

/**
 * Resets the fly to the left, and randomizes the oscillation midline, speed, and angle
 */
function resetFly() {
    fly.x = 0;
    flyMovement.midline = random(80, 300);
    flyMovement.speed = random(1, 4);
    flyMovement.angle = random(0, Math.TWO_PI);
    
    // 40% chance the fly will be trapped in a bubble
    if (random() < 0.4) {
        fly.inBubble = true;
    }
    else {
        fly.inBubble = false;
    }
}

/**
 * Moves the frog using the left and right arrow keys in the game state
 */
function moveFrog() { 
    if (keyIsDown(keyCode.left)) {
        frog.body.x -= frog.body.speed;
    } 
    if (keyIsDown(keyCode.right)) {
        frog.body.x += frog.body.speed;
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body) in the game state
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill(frog.tongue.fill.r, frog.tongue.fill.g, frog.tongue.fill.b);
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke(frog.tongue.fill.r, frog.tongue.fill.g, frog.tongue.fill.b);
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body (back of head)
    push();
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    noStroke();
    // Main part of head
    ellipse(frog.body.x, frog.body.y, frog.body.w, frog.body.h);
    // Parts behind eyes
    ellipse(frog.body.x - frog.body.behindEyes.x, frog.body.y - frog.body.behindEyes.y, frog.body.w * frog.body.sizeFactor); // left eye
    ellipse(frog.body.x + frog.body.behindEyes.x, frog.body.y - frog.body.behindEyes.y, frog.body.w * frog.body.sizeFactor); // right eye
    pop();
}

/**
 * Handles the tongue overlapping the fly in the game state
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const overlapped = (d < frog.tongue.size / 2 + fly.size / 2);
    if (overlapped) {
        
        if (fly.inBubble) {
            // Pop the bubble
            fly.inBubble = false;
            
            // Bring back the tongue
            frog.tongue.state = "inbound";
        }
        else {
            // Reset the fly
            resetFly();
            
            // Bring back the tongue
            frog.tongue.state = "inbound";
            
            // Increase the score with each fly caught, cap at max number of flies
            if (fliesCaught < maxFlies) {
                fliesCaught++;
            }
            // If max flies are caught, change from game state to sleeping state
            if (fliesCaught >= maxFlies) {
                state = "sleep";
                return;
            }
        }
    }
}

/**
 * Draws the progress bar as a rounded rectangle in the game state
 * Fills with each fly caught
 */
function drawProgressBar() {
    // Variable that calculates how much of the progress bar should be filled based on 
    // the number of flies caught (0 = empty, 1 = full)
    const progress = constrain(fliesCaught / maxFlies, 0, 1);
    // Converts that calculation into a filled width on the progress bar
    const filled = progressBar.w * progress;
    
    // Empty Bar
    push();
    noStroke();
    fill(progressBar.fill.r, progressBar.fill.b, progressBar.fill.g, progressBar.fill.transparency);
    rect(progressBar.x, progressBar.y, progressBar.w, progressBar.h, progressBar.corner);
    pop();
  
    // Filled Bar
    push();
    noStroke();
    // Same colour as lily pad star
    fill(lilyPad.star.fill.r, lilyPad.star.fill.g, lilyPad.star.fill.b);
    rect(progressBar.x, progressBar.y,filled, progressBar.h, progressBar.corner);
    pop();
}    

/**
 * Displays the winning ending screen (sleeping)
 */
function sleep() {
    background(sleepingFrog.bgFill.r, sleepingFrog.bgFill.g, sleepingFrog.bgFill.b);
    drawSleepingFrog(width / 2, height / 2);
    drawZzz(width / 2, height / 2);
    
    // Winning message
    push();
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    text(`shhhh! frog is sleeping`, width / 2, height / 6.5);
    pop();
    
    // The instruction to play again
    push();
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    // emoticons copied from: https://emojicombos.com/star
    text(`⋆˚꩜｡ ${actionVerb} to play again! ⋆˙⟡`, width / 2, 3 * height / 3.5);
    pop();
}

/**
 * Draws the sleeping frog tucked in its blanket on the ending screen (sleeping)
 */
function drawSleepingFrog(x, y) {
    drawPillow(x, y);
    drawSleepingFrogBody(x, y);
    drawSleepingFrogFace(x, y);    
    drawBlanket(x, y);
}

/**
 * Draws a rounded rectangle as a pillow on the ending screen (sleeping)
 */
function drawPillow(x, y) {
    push();
    noStroke();
    fill(sleepingFrog.pillow.fill.r, sleepingFrog.pillow.fill.g, sleepingFrog.pillow.fill.b)
    rect(x - sleepingFrog.pillow.x, y - sleepingFrog.pillow.y, sleepingFrog.pillow.w,
        sleepingFrog.pillow.h, sleepingFrog.pillow.corner);
    pop();
}

/**
 * Draws the frog on the ending screen (sleeping)
 */
function drawSleepingFrogBody(x, y) {
    push();
    noStroke();
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    // Head
    ellipse(x, y, endingFrog.head.main.w, endingFrog.head.main.h);
    ellipse(x - endingFrog.head.behindEyes.x, y - endingFrog.head.behindEyes.y, endingFrog.head.behindEyes.size);
    ellipse(x + endingFrog.head.behindEyes.x, y - endingFrog.head.behindEyes.y, endingFrog.head.behindEyes.size);
    // Hands
    ellipse(x - endingFrog.hands.sleeping.x, y + endingFrog.hands.sleeping.y, endingFrog.hands.w, endingFrog.hands.h);
    ellipse(x + endingFrog.hands.sleeping.x, y + endingFrog.hands.sleeping.y, endingFrog.hands.w, endingFrog.hands.h);
    pop();
}

/**
 * Draws the sleeping face (closed eyes and a smile) on the ending screen (sleeping)
 */
function drawSleepingFrogFace(x, y) {
    push();
    stroke(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    noFill();
    strokeWeight(frogFace.features.strokeWeight);
    // Closed left eye
    line(x - sleepingFrog.eyes.x1, y - sleepingFrog.eyes.y, x - sleepingFrog.eyes.x2, y - sleepingFrog.eyes.y);
    // Closed right eye
    line(x + sleepingFrog.eyes.x1, y - sleepingFrog.eyes.y, x + sleepingFrog.eyes.x2, y - sleepingFrog.eyes.y);
     // Smile (uses same parameter values as frog on instructions screen except for y offset)
    arc(x, y - sleepingFrog.smile.y, frogFace.mouth.smile.w, frogFace.mouth.smile.h,
        frogFace.mouth.smile.startAngle, frogFace.mouth.smile.endAngle);
    pop();
}

/**
 * Draws the blanket outline as a curve (part of an arc) on the ending screen (sleeping)
 */
function drawBlanket(x, y) {
    push();
    // Uses same fill as background so the blanket looks like it's encompassing the screen
    fill(sleepingFrog.bgFill.r, sleepingFrog.bgFill.g, sleepingFrog.bgFill.b);
    // Uses same stroke colour and weight as facial features
    stroke(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    strokeWeight(frogFace.features.strokeWeight);
    arc(x, y + sleepingFrog.blanket.y, sleepingFrog.blanket.w, sleepingFrog.blanket.h,
        sleepingFrog.blanket.startAngle, sleepingFrog.blanket.endAngle);
    pop();
}

/**
 * Draws the Zzz above the head on the ending screen (sleeping)
 */
function drawZzz(x, y) {
    push();
    fill(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    textSize(30);
    text('z', x + sleepingFrog.zzz.x1, y - sleepingFrog.zzz.y1);
    text('Z', x + sleepingFrog.zzz.x2, y - sleepingFrog.zzz.y2);
    text('z', x + sleepingFrog.zzz.x3, y - sleepingFrog.zzz.y3);
    pop();
}

/**
 * Displays the losing ending screen (hungry)
 */
function hungry() {
    background("#2B2C5A");
    drawHungryFrog(width / 2, height / 2);
    
    // Losing message
    push();
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    text(`frog is still hungry and couldn't fall asleep`, width / 2, height / 6.5);
    text(`try again tomorrow?`, width / 2, height / 4.8);
    pop();

    // The instruction to play again
    push();
    textSize(18);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    // emoticons copied from: https://emojicombos.com/star
    text(`⋆˚꩜｡ ${actionVerb} to play again! ⋆˙⟡`, width / 2, 3 * height / 3.5);
    pop();
}

/**
 * Draws the hungry frog with tears in its eyes, hugging a small lily pad stuffie for comfort
 * on the losing ending screen (hungry)
 */
function drawHungryFrog(x, y) {
    drawHungryFrogHead(x, y);
    drawHungryFrogFace(x, y);
    drawTears(x, y);
    drawLilyPadStuffie(x, y);
    drawHungryFrogHands(x, y);
}

/**
 * Draws the frog head on the ending screen (hungry) 
 */
function drawHungryFrogHead(x, y) {
    push();
    noStroke();
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    // Head
    ellipse(x, y, endingFrog.head.main.w, endingFrog.head.main.h);
    ellipse(x - endingFrog.head.behindEyes.x, y - endingFrog.head.behindEyes.y, endingFrog.head.behindEyes.size);
    ellipse(x + endingFrog.head.behindEyes.x, y - endingFrog.head.behindEyes.y, endingFrog.head.behindEyes.size);
}

/**
 * Draws the frog hands on the ending screen (hungry) 
 */
function drawHungryFrogHands(x, y) {
    push();
    noStroke();
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    ellipse(x - endingFrog.hands.hungry.x, y + endingFrog.hands.hungry.y, endingFrog.hands.w, endingFrog.hands.h);
    ellipse(x + endingFrog.hands.hungry.x, y + endingFrog.hands.hungry.y, endingFrog.hands.w, endingFrog.hands.h);
    pop();
}

/**
 * Draws the eyes and frown on the ending screen (hungry) 
 */
function drawHungryFrogFace(x, y) {
    // Eyes
    push();
    noStroke();
    fill(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    ellipse(x - hungryFrog.eyes.x, y - hungryFrog.eyes.y, hungryFrog.eyes.size);
    ellipse(x + hungryFrog.eyes.x, y - hungryFrog.eyes.y, hungryFrog.eyes.size);
    pop();
    
    // Mouth
    push();
    stroke(frogFace.features.r, frogFace.features.g, frogFace.features.b);
    noFill();
    strokeWeight(frogFace.features.strokeWeight);
     // Frown (uses same parameter values as frog on instructions screen except for y offset)
    arc(x, y, frogFace.mouth.frown.w, frogFace.mouth.frown.h,
        frogFace.mouth.frown.startAngle, frogFace.mouth.frown.endAngle);
    pop();
}

/**
 * Draws the tears on the hungry crying frog face on the ending screen (hungry)
 */
function drawTears(x, y) {
    push();
    noStroke();
    fill(hungryFrog.tears.fill.r, hungryFrog.tears.fill.g, hungryFrog.tears.fill.b);
    ellipse(x - hungryFrog.tears.x, y - hungryFrog.tears.y, hungryFrog.tears.w, hungryFrog.tears.h);
    ellipse(x + hungryFrog.tears.x, y - hungryFrog.tears.y, hungryFrog.tears.w, hungryFrog.tears.h);
    pop();
}

/**
 * Draws the small lily pad stuffie on the ending screen (hungry)
 */
function drawLilyPadStuffie(x, y) {
    push();
    noStroke();
    fill(0, 128, 0);
    arc(x, y + hungryFrog.stuffie.y, hungryFrog.stuffie.w, hungryFrog.stuffie.h, lilyPad.notch.startAngle, lilyPad.notch.endAngle);
    pop();
}

/**
 * Changes the state (title, instructions, game, ending) when the space bar is pressed
 * Also launches the tongue (if it's not launched yet)
 */
function keyPressed(event) {
    // Checks if the space bar is pressed
    if (event.keyCode === keyCode.space) {
        // Handles the different states
        if (state === "title") {
            state = "instructions";
        }
        else if (state === "instructions") {
            state = "game";
            // Starts the sky colour change (game timer)
            sky.timer.start = millis(); 
        
        }
        else if (state === "game") {
            if (frog.tongue.state === "idle") {
                frog.tongue.state = "outbound";
            }
        } 
        // For both ending screens (winning (sleep) or losing (hungry)
        else if (state === "sleep" || state === "hungry") {
            state = "title";
            // Resets the progress bar
            fliesCaught = 0;
        }    
    }
}

/**
 * Helper function to draw star shape
 * Code from p5js star example: https://archive.p5js.org/examples/form-star.html
 */ 
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}