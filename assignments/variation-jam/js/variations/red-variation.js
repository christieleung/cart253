/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */


// Images of daydreaming girl and what she's thinking about
let img = {
    girlDaydream: undefined,
    bunny: undefined,
    cat: undefined,
    sakuraLightPink: undefined,
    sakuraDarkPink: undefined,
    orchid: undefined,
    record: undefined
}

// Array for the daydream items
let items = [];

/**
 * Preload images
 */
function preload() {
    img.girlDaydream = loadImage('assets/images/girl_daydream.png');
    img.bunny = loadImage('assets/images/bunny.png');
    img.cat = loadImage('assets/images/cat.png');
    img.sakuraLightPink = loadImage('assets/images/sakura_light_pink.png');
    img.sakuraDarkPink = loadImage('assets/images/sakura_dark_pink.png');
    img.orchid = loadImage('assets/images/orchid.png');
    img.record = loadImage('assets/images/record.png');
}

/**
 * This will be called just before the red variation starts
 */
function daydreamingSetup() {
    // Create daydream items, each has a position and scale
    items.push(daydreamItem(img.bunny, 208, 148, 0.13));
    items.push(daydreamItem(img.sakuraLightPink, 269, 170, 0.14));
    items.push(daydreamItem(img.record, 303, 158, 0.16));
    items.push(daydreamItem(img.cat, 400, 170, 0.13));
    items.push(daydreamItem(img.sakuraDarkPink, 380, 180, 0.14));
    items.push(daydreamItem(img.orchid, 448, 143, 0.165));
}

/**
 * This will be called every frame when the red variation is active
 */
function daydreamingDraw() {
    background('silver');
    
    // Draw each item
    for (let item of items) {
        image(item.img, item.x, item.y, item.w, item.h);
    }    
    
    // Display image of girl
    image(img.girlDaydream, 140, 180, 440, 290);
}

/**
 * Displays the item image, positon, and size
 */
function daydreamItem(img, x, y, scale) {
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
 * This will be called whenever a key is pressed while the red variation is active
 */
function daydreamingKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the red variation is active
 */
function daydreamingMousePressed() {
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        
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
            items.push(items.splice(i, 1)[0]);
            
            // Stops the loop so only one item is dragged at a time
            break; 
        }
    }
}

/**
 * Updates position of items being dragged by the mouse
 */
function daydreamingMouseDragged() {
    for (let item of items) {
        if (item.dragging) {
            item.x = mouseX - item.offsetX;
            item.y = mouseY - item.offsetY;
        }
    }
}

/**
 * Stops dragging items once mouse is released
 */
function daydreamingMouseReleased() {
    for (let item of items) {
    item.dragging = false;
    }
}