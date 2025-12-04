/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

// Images of daydreaming girl and what she's thinking about
let daydreamImg = {
    girl: undefined,
    bunny: undefined,
    cat: undefined,
    sakuraLightPink: undefined,
    sakuraDarkPink: undefined,
    orchid: undefined,
    record: undefined
}

// Array for the daydream items
let daydreamItems = [];

// Array for the star particle cursor trail
let stars = [];

/**
 * This will be called just before the daydream variation starts
 */
function daydreamingSetup() {
    // Resets daydream items
    daydreamItems = [];
    
    // Create daydream items, each has a position and scale
    daydreamItems.push(createDaydreamItem(daydreamImg.bunny, 208, 148, 0.13));
    daydreamItems.push(createDaydreamItem(daydreamImg.sakuraLightPink, 269, 170, 0.14));
    daydreamItems.push(createDaydreamItem(daydreamImg.record, 303, 158, 0.16));
    daydreamItems.push(createDaydreamItem(daydreamImg.cat, 400, 170, 0.13));
    daydreamItems.push(createDaydreamItem(daydreamImg.sakuraDarkPink, 380, 180, 0.14));
    daydreamItems.push(createDaydreamItem(daydreamImg.orchid, 448, 143, 0.165));
}

/**
 * This will be called every frame when the daydream variation is active
 */
function daydreamingDraw() {
    background('silver');
    
    // Draw each item
    for (let item of daydreamItems) {
        image(item.img, item.x, item.y, item.w, item.h);
    }    
    
    // Display image of girl
    image(daydreamImg.girl, 140, 180, 440, 290);
    
    drawStarParticles();
    updateStarParticles();
}

/**
 * Displays the item image, positon, and size in the daydream variation
 */
function createDaydreamItem(img, x, y, scale) {
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
 * This will be called whenever a key is pressed while the daydream variation is active
 */
function daydreamingKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the daydream variation is active
 */
function daydreamingMousePressed() {
    for (let i = 0; i < daydreamItems.length; i++) {
        let item = daydreamItems[i];
        
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
            daydreamItems.push(daydreamItems.splice(i, 1)[0]);
            
            // Stops the loop so only one item is dragged at a time
            break; 
        }
    }
}

/**
 * Updates position of items being dragged by the mouse in the daydream variation
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
 * Stops dragging items once mouse is released in the daydream variation
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
        size: random(5, 9),
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
        alpha: 255
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
        star.alpha -= 10;

        // Removes the star once it's completely transparent
        if (star.alpha <= 0) {
            stars.splice(i, 1);
        }
    }
}

/**
 * Draws the star particle cursor trail
 */
function drawStarParticles() {
    noStroke();
    for (let starParticle of stars) {
        fill(starParticle.fill.r, starParticle.fill.g, starParticle.fill.b, starParticle.alpha);
        // Draws stars using star helper function
        star(starParticle.x, starParticle.y, starParticle.size / 2, starParticle.size, 5);
    }
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