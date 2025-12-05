/**
 * This file contains the code to run *only* the daydreaming variation part of the program.
 * Note how it has its own draw, daydreamingDraw(), and its own keyPressed, daydreamingKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Daydreaming variation background colour
const daydreamBg = {
    fill: {
        // Light green
        r: 181,
        g: 208,
        b: 182
    }
}
// Image placeholders of daydreaming girl and what she's thinking about
let daydreamImg = {
    girl: undefined,
    bunny: undefined,
    cat: undefined,
    sakuraLightPink: undefined,
    sakuraDarkPink: undefined,
    orchid: undefined,
    record: undefined
}

// Position, scale, and rotation of daydream items
const daydreamItemProperties = {
    bunny: {
        x: 208,
        y: 148,
        scale: 0.13
    },
    sakuraLightPink: {
        x: 269,
        y: 170,
        scale: 0.14
    }, 
    sakuraDarkPink: {
        x: 380,
        y: 180,
        scale: 0.14
    }, 
    record: {
        x: 303,
        y: 158, 
        scale: 0.16
    },
    cat: {
        x: 400,
        y: 170,
        scale: 0.13
    },
    orchid: {
        x: 448,
        y: 143,
        scale: 0.165
    }
    
}

// Array for the daydream items
let daydreamItems = [];

// Array for the star particle cursor trail
let stars = [];

/**
 * This will be called just before the daydream variation starts
 * Initializes and positions the daydream items
 */
function daydreamingSetup() {
    // Resets daydream items
    daydreamItems = [];
    
    // Create daydream items, each has a position and scale
    daydreamItems.push(createDaydreamItem(daydreamImg.bunny, daydreamItemProperties.bunny.x, daydreamItemProperties.bunny.y,
        daydreamItemProperties.bunny.scale));
    daydreamItems.push(createDaydreamItem(daydreamImg.sakuraLightPink, daydreamItemProperties.sakuraLightPink.x, daydreamItemProperties.sakuraLightPink.y,
        daydreamItemProperties.sakuraLightPink.scale));
    daydreamItems.push(createDaydreamItem(daydreamImg.record, daydreamItemProperties.record.x, daydreamItemProperties.record.y,
        daydreamItemProperties.record.scale));
    daydreamItems.push(createDaydreamItem(daydreamImg.cat, daydreamItemProperties.cat.x, daydreamItemProperties.cat.y, daydreamItemProperties.cat.scale));
    daydreamItems.push(createDaydreamItem(daydreamImg.sakuraDarkPink, daydreamItemProperties.sakuraDarkPink.x, daydreamItemProperties.sakuraDarkPink.y,
        daydreamItemProperties.sakuraDarkPink.scale));
    daydreamItems.push(createDaydreamItem(daydreamImg.orchid, daydreamItemProperties.orchid.x, daydreamItemProperties.orchid.y, daydreamItemProperties.orchid.scale));
}

/**
 * This will be called every frame when the daydreaming variation is active
 * Draws the background, the daydream items, the girl, and the star particle trail
 */
function daydreamingDraw() {
    background(daydreamBg.fill.r, daydreamBg.fill.g, daydreamBg.fill.b);
    
    // Draw each item
    for (let item of daydreamItems) {
        image(item.img, item.x, item.y, item.width, item.height);
    }    
    
    // Display image of girl
    image(daydreamImg.girl, girl.x, girl.y, girl.width, girl.height);
    
    // Draw the star particle cursor trail
    drawStarParticles();
    updateStarParticles();
}

/**
 * Creates an item with a positon, and size in the daydreaming variation
 * Also tracks dragging state and mouse offset
 */
function createDaydreamItem(img, x, y, scale) {
    let item = {
            img: img,
            x: x,
            y: y,
            width: img.width * scale,
            height: img.height * scale,
            dragging: false,
            offsetX: 0,
            offsetY: 0
    };
    
    return item;
}

/**
 * This will be called whenever a key is pressed while the daydreaming variation is active
 * Returns to the main menu by pressing esc
 */
function daydreamingKeyPressed(event) {
    if (event.keyCode === key.esc) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the daydreaming variation is active
 * Checks if the cursor is over an item and enables dragging
 */
function daydreamingMousePressed() {
    for (let i = 0; i < daydreamItems.length; i++) {
        let item = daydreamItems[i];
        
        // Checks if mouse is inside the item
        if (mouseX > item.x && mouseX < item.x + item.width &&
            mouseY > item.y && mouseY < item.y + item.height) {
            
            // If it is, then the item can be dragged
            item.dragging = true;
        
            // Keeps item under mouse cursor
            item.offsetX = mouseX - item.x;
            item.offsetY = mouseY - item.y;

            // Removes item and adds it at the end of the array
            // Makes dragged item appear on top
            daydreamItems.push(daydreamItems.splice(i, 1)[0]);
            
            // Stops the loop so only one item is dragged at a time
            break; 
        }
    }
}

/**
 * Updates position of items being dragged by the mouse in the daydreaming variation
 * Also adds star particles!
 */
function daydreamingMouseDragged() {
    for (let item of daydreamItems) {
        if (item.dragging) {
            item.x = mouseX - item.offsetX;
            item.y = mouseY - item.offsetY;
        }
    }
    
    // Makes a star particle every 5th frame
    if (frameCount % 5 === 0) {
        // Adds a star particle only when an item is being dragged
        stars.push(createStarParticles(mouseX, mouseY));
    }    
}

/**
 * Stops dragging items once mouse is released in the daydreaming variation
 */
function daydreamingMouseReleased() {
    for (let item of daydreamItems) {
    item.dragging = false;
    }
}

/**
 * Creates a star particle with randomized position, size, speed, and colour
 */
function createStarParticles(x, y) {
    let starParticle = {
        // Creates particles scattered around the drag position (x, y)
        x: x + random(-6, 6),
        y: y + random(-6, 6),
        size: random(6, 10),
        // Makes the trail go slightly upwards
        speed: {
            x: random(-0.2, 0.2), 
            y: random(-0.6, -0.2)
        },
        // Randomizes colour
        fill: {
            r: random(200, 255),
            g: random(100, 255),
            b: random(100, 255),
        },
        // Fully opaque
        opacity: 255,
        // Number of points
        npoints: 5
    };
    
    return starParticle;
}

/**
 * Updates the position and transparency of the star particles
 */
function updateStarParticles() {
    // Loops through stars array in reverse to remove stars
    for (let i = stars.length - 1; i >= 0; i--) {
        let star = stars[i];
        
        // Updates position of star particles
        star.x += star.speed.x;
        star.y += star.speed.y;
        
        // Fades star out (increases transparency)
        star.opacity -= 10;

        // Removes the star once it's completely transparent
        if (star.opacity <= 0) {
            stars.splice(i, 1);
        }
    }
}

/**
 * Draws the star particle cursor trail
 */
function drawStarParticles() {
    push();
    noStroke();
    for (let starParticle of stars) {
        fill(starParticle.fill.r, starParticle.fill.g, starParticle.fill.b, starParticle.opacity);
        // Draws stars using star helper function
        star(starParticle.x, starParticle.y, starParticle.size / 2, starParticle.size, starParticle.npoints);
    }
    pop();
}

/**
 * Helper function to draw a star
 * From p5js documentation: https://archive.p5js.org/examples/form-star.html
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