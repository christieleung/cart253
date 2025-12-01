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

// // Array for the spiral particle cursor trail
// let spiral = [];

/**
 * This will be called just before the anxious variation starts
 */
function anxiousSetup() {
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
    if (event.keyCode === 27) {
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
        }
    }
    
    // // Makes a spiral particle every 5th frame
    // if (frameCount % 5 === 0) {
    //     // Adds a spiral particle only when an item is being dragged
    //     spiral.push(createSpiralParticles(mouseX, mouseY));
    // }    
}

/**
 * Stops dragging items once mouse is released in the anxious variation
 */
function anxiousMouseReleased() {
    for (let item of anxietyItems) {
    item.dragging = false;
    }
}
