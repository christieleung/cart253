/**
 * This file contains the code to run *only* the anxious variation part of the program.
 * Note how it has its own draw, anxiousDraw(), and its own keyPressed, anxiousKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Anxious variation background colour
const anxiousBg = {
    fill: {
        // Blue-grey
        r: 127,
        g: 146,
        b: 163
    }
}

// Array for the instruction text in the anxious variation
const anxiousInstructions = [
    "✴︎ when i'm feeling anxious! ✴︎",
    "",
    "• click & drag items around",
    "• press (space) to toggle this instruction panel",
    "• press (esc) to return to the menu",
    "• have your sound on!",
];

// Shows and hides instruction panel
let showAnxiousInstructions = true;

// Image placeholders for the anxious girl and what she's thinking about
let anxietyImg = {
    girl: undefined,
    record: undefined,
    work: undefined,
    reminderBlue: undefined,
    reminderPurple: undefined,
    time: undefined,
    health: undefined
}

// Position, scale, and rotation of anxiety items
const anxietyItemProperties = {
    record: {
        x: 213,
        y: 155,
        scale: 0.16
    },
    work: {
        x: {
            first: 260,
            second: 280,
            third: 410,
            fourth: 415
        },
        y: {
            first: 163,
            second: 170,
            third: 172,
            fourth: 163
        },
        scale: 0.20,
        rotation: Math.PI / 27
    },
    reminderPurple: {
        x: {
            first: 300,
            second: 427
        },
        y: {
            first: 186,
            second: 173
        },
        scale: 0.16,
        rotation: Math.PI / 20
    },
    reminderBlue: {
        x: 443,
        y: 183,
        scale: 0.16,
        rotation: Math.PI / 20
    },
    time: {
        x: 350,
        y: 158,
        scale: 0.18
    },
    health: {
        x: 330,
        y: 176,
        scale: 0.21
    }
}

// Array for the anxiety items
let anxietyItems = [];

// Array for the spiral particle cursor trail while dragging
let spirals = [];

/**
 * This will be called just before the anxious variation starts
 * Initializes the instructions panel and creates anxiety items with positions and scales
 */
function anxiousSetup() {
    // Resets instruction panel to visible
    showAnxiousInstructions = true;
    
    // Resets anxiety items
    anxietyItems = [];
    
    // Create anxiety items, each has a position and scale
    // Some items have sound and rotation
    anxietyItems.push(createAnxietyItem(anxietyImg.record, anxietyItemProperties.record.x, anxietyItemProperties.record.y,
        anxietyItemProperties.record.scale, { sound: sounds.anxietySong }));
    anxietyItems.push(createAnxietyItem(anxietyImg.work, anxietyItemProperties.work.x.first, anxietyItemProperties.work.y.first,
        anxietyItemProperties.work.scale));
    anxietyItems.push(createAnxietyItem(anxietyImg.work, anxietyItemProperties.work.x.second, anxietyItemProperties.work.y.second,
        anxietyItemProperties.work.scale));
    anxietyItems.push(createAnxietyItem(anxietyImg.reminderPurple, anxietyItemProperties.reminderPurple.x.first,
        anxietyItemProperties.reminderPurple.y.first, anxietyItemProperties.reminderPurple.scale));
    anxietyItems.push(createAnxietyItem(anxietyImg.time, anxietyItemProperties.time.x, anxietyItemProperties.time.y,
        anxietyItemProperties.time.scale, { sound: sounds.ticking }));
    anxietyItems.push(createAnxietyItem(anxietyImg.health, anxietyItemProperties.health.x, anxietyItemProperties.health.y, anxietyItemProperties.health.scale));
    anxietyItems.push(createAnxietyItem(anxietyImg.work, anxietyItemProperties.work.x.third, anxietyItemProperties.work.y.third,
        anxietyItemProperties.work.scale));
    // Anxiety items with a slight rotation
    anxietyItems.push(createAnxietyItem(anxietyImg.work, anxietyItemProperties.work.x.fourth, anxietyItemProperties.work.y.fourth,
        anxietyItemProperties.work.scale, { rotation: anxietyItemProperties.work.rotation }));
    anxietyItems.push(createAnxietyItem(anxietyImg.reminderPurple, anxietyItemProperties.reminderPurple.x.second, anxietyItemProperties.reminderPurple.y.second,
        anxietyItemProperties.reminderPurple.scale, { rotation: anxietyItemProperties.reminderPurple.rotation }));
    anxietyItems.push(createAnxietyItem(anxietyImg.reminderBlue, anxietyItemProperties.reminderBlue.x, anxietyItemProperties.reminderBlue.y,
        anxietyItemProperties.reminderBlue.scale, { rotation: anxietyItemProperties.reminderBlue.rotation }));
}

/**
 * This will be called every frame when the anxious variation is active
 * Draws the background, the anxiety items, the girl, and the spiral particle trail
 */
function anxiousDraw() {
    background(anxiousBg.fill.r, anxiousBg.fill.g, anxiousBg.fill.b);
    
    // Draw each item
    for (let item of anxietyItems) {
        
        // If the item has a rotation, then draw the image rotated
        if (item.rotation !== 0) {
            push();
            // New origin
            translate(item.x + item.width / 2, item.y + item.height / 2);
            rotate(item.rotation);
            // Draw image centered relative to new origin
            imageMode(CENTER);
            image(item.img, 0, 0, item.width, item.height);
            pop();
            
        // Otherwise, draw the item normally
        } else {
            image(item.img, item.x, item.y, item.width, item.height);
        }
    }
    // Display image of girl
    image(anxietyImg.girl, girl.x, girl.y, girl.width, girl.height);
    
    // Draw the spiral particle cursor trail
    drawSpiralParticles();
    updateSpiralParticles();
    
     // Draw instruction panel only if active
    if (showAnxiousInstructions) {
        drawInstructionPanel(anxiousInstructions);
    }
}

/**
 * Creates an item with a positon, and size in the anxious variation
 * Also tracks dragging state and mouse offset
 * Some items have a rotation and sound
 */
function createAnxietyItem(img, x, y, scale, options = {}) {
    let item = {
            img: img,
            x: x,
            y: y,
            width: img.width * scale,
            height: img.height * scale,
            dragging: false,
            offsetX: 0,
            offsetY: 0,
            rotation: options.rotation || 0,
            sound: options.sound || null
    };
    
    return item;
}

/**
 * This will be called whenever a key is pressed while the anxious variation is active
 * Handles returning to the menu and showing/hiding the instruction panel
 */
function anxiousKeyPressed(event) {
    
    // Return to the main menu by pressing esc
    if (event.keyCode === key.esc) {
        state = "menu";
    }
    
    // Toggle instructions by pressing space
    if (event.keyCode === key.space) {
        showAnxiousInstructions = !showAnxiousInstructions;
    }
}

/**
 * This will be called whenever the mouse is pressed while the anxious variation is active
 * Checks if the cursor is over an item and enables dragging
 */
function anxiousMousePressed() {
    for (let i = 0; i < anxietyItems.length; i++) {
        let item = anxietyItems[i];
        
        // Checks if mouse is inside the item
        if (mouseX > item.x && mouseX < item.x + item.width &&
            mouseY > item.y && mouseY < item.y + item.height) {
            
            // If it is, then the item can be dragged
            item.dragging = true;
        
            // Keeps item under mouse cursor
            item.offsetX = mouseX - item.x;
            item.offsetY = mouseY - item.y;
            
            // Play sound only when drag starts
            if (item.sound) {
                item.sound.play();
            }
            
            // Removes item and adds it at the end of the array
            // Makes dragged item appear on top
            anxietyItems.push(anxietyItems.splice(i, 1)[0]);
            
            // Stops the loop so only one item is dragged at a time
            break; 
        }
    }
}

/**
 * Updates position of items being dragged by the mouse in the anxious variation
 * Also adds spiral particles!
 */
function anxiousMouseDragged() {
    for (let item of anxietyItems) {
        if (item.dragging) {
            item.x = mouseX - item.offsetX;
            item.y = mouseY - item.offsetY;
            
            // Trembling effect
            let tremors = 3;
            item.x += random(-tremors, tremors);
            item.y += random(-tremors, tremors);
        }
    }
    
    // Makes a spiral particle every 5th frame
    if (frameCount % 5 === 0) {
        // Adds a spiral particle only when an item is being dragged
        spirals.push(createSpiralParticles(mouseX, mouseY));
    }    
}

/**
 * Stops dragging items once mouse is released in the anxious variation
 */
function anxiousMouseReleased() {
    for (let item of anxietyItems) {
        // Stops playing sound
        if (item.sound) {
            item.sound.stop();  
        }
        item.dragging = false;
    }
}

/**
 * Creates a spiral particle with randomized position, size, speed, and colour
 */
function createSpiralParticles(x, y) {
    let spiralParticle = {
        // Creates particles scattered around the drag position (x, y)
        x: x + random(-6, 6),
        y: y + random(-6, 6),
        size: random(8, 12),
        // Makes the trail go slightly upwards
        speed: {
            x: random(-0.2, 0.2), 
            y: random(-0.6, -0.2)
        },
        // Randomizes colour
        fill: {
            r: random(20, 50),
            g: random(0, 10),
            b: random(30, 50)
        },
         // Fully opaque
        opacity: 255, 
        strokeWeight: 1.5
    };
    
    return spiralParticle;
}

/**
 * Updates the position and opacity of the spiral particles
 */
function updateSpiralParticles() {
    // Loops through spiral array in reverse to remove spiral
    for (let i = spirals.length - 1; i >= 0; i--) {
        let spiral = spirals[i];
        
        // Updates position of spiral particles
        spiral.x += spiral.speed.x;
        spiral.y += spiral.speed.y;
        
        // Fades spiral out (increases transparency)
        spiral.opacity -= 5;

        // Removes the star once it's completely transparent
        if (spiral.opacity <= 0) {
            spirals.splice(i, 1);
        }
    }
}

/**
 * Draws the spiral particle cursor trail
 */
function drawSpiralParticles() {
    push();
    noFill();
    
    for (let spiralParticle of spirals) {
        stroke(spiralParticle.fill.r, spiralParticle.fill.g, spiralParticle.fill.b, spiralParticle.opacity);
        strokeWeight(spiralParticle.strokeWeight);
        // Draws spirals using spiral helper function
        spiral(spiralParticle.x, spiralParticle.y, spiralParticle.size);
    }
    
    pop();
}

/**
 * Helper function to draw a spiral
 * Referenced p5js star documentation: https://archive.p5js.org/examples/form-star.htmland 
 * and geeksforgeeks spiral animation effect: 
 * https://www.geeksforgeeks.org/javascript/how-to-create-a-rotating-spiral-animation-effect-using-p5-js/
 */
function spiral(x, y, radius) {
    beginShape();
    let nturns = 4; 
    let npoints = 100;
    for (let i = 0; i < npoints; i++) {
        let r = map(i, 0, npoints, 0, radius);
        let angle = map(i, 0, npoints, 0, TWO_PI * nturns);
        let sx = x + cos(angle) * r;
        let sy = y + sin(angle) * r;
        vertex(sx, sy);
    }
    endShape();
}