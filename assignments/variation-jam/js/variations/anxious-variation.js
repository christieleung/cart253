/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Images of anxious girl and what she's thinking about
let anxietyImg = {
    girl: undefined,
    record: undefined
}

// Array for the anxiety items
let anxietyItems = [];

// Array for the spiral particle cursor trail
let spirals = [];

/**
 * This will be called just before the anxious variation starts
 */
function anxiousSetup() {
    // Resets anxiety items
    anxietyItems = [];
    
     // Create anxiety items, each has a position and scale
    anxietyItems.push(createAnxietyItem(anxietyImg.record, 213, 158, 0.16));
}

/**
 * This will be called every frame when the anxious variation is active
 */
function anxiousDraw() {
    background("silver");
    
    // Draw each item
    for (let item of anxietyItems) {
        image(item.img, item.x, item.y, item.w, item.h);
    }    
    
    // Display image of girl
    image(anxietyImg.girl, 140, 180, 440, 290);
    
    drawSpiralParticles();
    updateSpiralParticles();
}

/**
 * Displays the item image, positon, and size in the anxious variation
 */
function createAnxietyItem(img, x, y, scale) {
    let item = {
            img: img,
            x: x,
            y: y,
            w: img.width * scale,
            h: img.height * scale,
            dragging: false,
            offsetX: 0,
            offsetY: 0
    };
    
    return item;
}

/**
 * This will be called whenever a key is pressed while the anxious variation is active
 */
function anxiousKeyPressed(event) {
    if (event.keyCode === key.esc) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the anxious variation is active
 */
function anxiousMousePressed() {
    for (let i = 0; i < anxietyItems.length; i++) {
        let item = anxietyItems[i];
        
        // Checks if mouse is inside the item
        if (mouseX > item.x && mouseX < item.x + item.w &&
            mouseY > item.y && mouseY < item.y + item.h) {
            
            // If it is, then the item can be dragged
            item.dragging = true;
        
            // Keeps item under mouse cursor
            item.offsetX = mouseX - item.x;
            item.offsetY = mouseY - item.y;

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
 */
function anxiousMouseDragged() {
    for (let item of anxietyItems) {
        if (item.dragging) {
            item.x = mouseX - item.offsetX;
            item.y = mouseY - item.offsetY;
            
            // Trembling effect
            let tremors = 2;
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
        alpha: 255
    };
    
    return spiralParticle;
}

/**
 * Updates the position and transparency of the spiral particles
 */
function updateSpiralParticles() {
    // Loops through spiral array in reverse to remove spiral
    for (let i = spirals.length - 1; i >= 0; i--) {
        let spiral = spirals[i];
        
        // Updates position of spiral particles
        spiral.x += spiral.speed.x;
        spiral.y += spiral.speed.y;
        
        // Fades spiral out (increases transparency)
        spiral.alpha -= 5;

        // Removes the star once it's completely transparent
        if (spiral.alpha <= 0) {
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
    strokeWeight(1.5);
    
    for (let spiralParticle of spirals) {
        stroke(spiralParticle.fill.r, spiralParticle.fill.g, spiralParticle.fill.b, spiralParticle.alpha);
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