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
    items.push(daydreamItem(img.record, 310, 158, 0.16));
    items.push(daydreamItem(img.cat, 397, 170, 0.13));
    items.push(daydreamItem(img.sakuraDarkPink, 372, 180, 0.14));
    items.push(daydreamItem(img.orchid, 448, 143, 0.16));
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
        h: img.height * scale
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

}