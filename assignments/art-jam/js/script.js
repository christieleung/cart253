/**
 * Self-Portrait
 * Christie Leung
 * 
 * My self-portrait!
 */

"use strict";

const face = {
    x: 170,
    y: 220,
    size: 180,
    fill: "#E5C298", // tan
    features: {
        strokeColour: "#000000", // black
        strokeWeight: 3
    }
};

let cheeks = {
    left: {
        x: 146,
        y: 273,
    },
    right: {
        x: 229,
        y: 262
    },
    width: 30,
    height: 22,
    fill: {
        r: 243,
        g: 172,
        b: 183
    }
};

const eyes = {
    left: {
        x: 140,
        y: 235,
        start: Math.PI / 4,
        stop: 3.2 * Math.PI / 4
    },
    
    right: {
        x: 218,
        y: 225,
        start: -11.3 * Math.PI / 6,
        stop: -4.3 * Math.PI / 3
    },
    width: 50,
    height: 35
};

const mouth = {
    x: 188,
    y: 265,
    width: 32,
    height: 28,
    start: Math.PI / 8,
    stop: 6.3 * Math.PI / 8
};

const hair = {
    parts: {
        behindHead: {
            x: 160,
            y: 210,
            size: 277
        },

        bottomLeft: {
            x: 80,
            y: 405,
            size: 400
        },
       
        topRight: {
            x: 298,
            y: 280,
            width: 120,
            height: 190
        },
        
        bottomRight: {
            x: 363,
            y: 465,
            size: 360
        }
    },
    fill: "#000000" // black
};

const curls = {
    place: {
        top: {
            x: 140,
            y: 80,
            size: 60
        },
        topLeft: {
            x: 45,
            y: 130,
            size: 60
        },
        bottomLeft: {
            x: 20,
            y: 200,
            size: 57
        },
        topRight: {
            x: 295,
            y: 165,
            size: 50
        },
        bottomRight: {
            x: 370,
            y: 265,
            size: 60
        },
        end: {
            x: 480,
            y: 320,
            size: 65
        }
    }
};

const curlMask = {
    place: {
        top: {
            x: 160,
            y: 70,
            size: 50
        },
        topLeft: {
            x: 40,
            y: 93,
            size: 80
        },
        bottomLeft: {
            x: 7,
            y: 165,
            size: 41
        },
        topRight: {
            x: 300,
            y: 145,
            size: 40
        },
        bottomRight: {
            x: 380,
            y: 240,
            size: 54
        },
        end: {
            x: 473,
            y: 288,
            size: 60
        },
    }
};

const bang = {
    left: {
        x: 90,
        y: 170,
        size: 110
    },
    right: {
        x: 205,
        y: 150,
        width: 150,
        height: 95
    },
};

const ear = {
    x: 70,
    y: 255,
    size: 35
};

const earCurl = {
    x: 110,
    y: 235,
    size: 85
};

const earCurlMask = {
    x: 143,
    y: 225,
    size: 100
};

let skyColour = {
    blue: {
        r: 173,
        g: 216,
        b: 230
    },
    green: {
        r: 163,
        g: 212,
        b: 104
    }
};

// Variables updated in function changeSkyColour()
let skyColourR = undefined;
let skyColourG = undefined;
let skyColourB = undefined;

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
    changeSkyColour();
    background(skyColourR, skyColourG, skyColourB);
    drawCurls();
    maskCurls();   
    drawHair();
    drawFace();
    drawEar();
    drawEarCurl();
    maskEarlCurl();
    drawCheeks();
    drawBangs();
    drawEyes();
    drawMouth();
    
    // drawSnow();
    // drawFlowers();
}

/**
 * Draws the face
*/
function drawFace() {
    push();
    noStroke();
    fill(face.fill);
    ellipse(face.x, face.y, face.size);
    pop();
}

/**
 * Draws the cheeks (left and right)
 */
function drawCheeks() {
    push();
    noStroke();
    fill(cheeks.fill.r, cheeks.fill.g, cheeks.fill.b);
    ellipse(cheeks.left.x, cheeks.left.y, cheeks.width, cheeks.height); // left cheek
    ellipse(cheeks.right.x, cheeks.right.y, cheeks.width, cheeks.height); // right cheek
    pop();
}

/**
 * Checks if the mouse is within the face, and if it is, make the cheeks redder with every mouse press 
 */
function mousePressed() {
    // Get the distance between the mouse and the face
    const d = dist(mouseX, mouseY, face.x, face.y);
    // Check if there is overlap (the mouse is within the face)
    const mouseIsInsideFace = (d <= face.size / 2);
    if (mouseIsInsideFace) {
        // If there is overlap, g and b values go down by 5 every time the mouse is pressed
        // Constrain g and b values to not go below 125 (min) or above 255 (max)
        cheeks.fill.g = constrain(cheeks.fill.g - 5, 125, 255); 
        cheeks.fill.b = constrain(cheeks.fill.b - 5, 125, 255);   
    }
}

/**
 * Draws the eyes (left and right)
 */
function drawEyes() {
    push();
    stroke(face.features.strokeColour);
    strokeWeight(face.features.strokeWeight);
    noFill();
    arc(eyes.left.x, eyes.left.y, eyes.width, eyes.height, eyes.left.start, eyes.left.stop); // left eye
    arc(eyes.right.x, eyes.right.y, eyes.width, eyes.height, eyes.right.start, eyes.right.stop); // right eye
    pop();
}

/**
 * Draws the mouth
 */
function drawMouth() {
    push();
    stroke(face.features.strokeColour);
    strokeWeight(face.features.strokeWeight);
    noFill();
    arc(mouth.x, mouth.y, mouth.width, mouth.height, mouth.start, mouth.stop);
    pop();
}

/**
 * Draws the hair (in sections)
*/
function drawHair() {
    push();
    noStroke();
    fill(hair.fill);
    ellipse(hair.parts.behindHead.x, hair.parts.behindHead.y, hair.parts.behindHead.size); // behind head
    ellipse(hair.parts.bottomLeft.x, hair.parts.bottomLeft.y, hair.parts.bottomLeft.size); // hair bottom left
    ellipse(hair.parts.topRight.x, hair.parts.topRight.y, hair.parts.topRight.width, hair.parts.topRight.height); // hair top right
    ellipse(hair.parts.bottomRight.x, hair.parts.bottomRight.y, hair.parts.bottomRight.size); // hair bottom right
    pop();
}

/**
 * Draws the curl placements (black circles)
*/
function drawCurls() {
    push();
    noStroke();
    fill(hair.fill); 
    ellipse(curls.place.top.x, curls.place.top.y, curls.place.top.size); // top curl
    ellipse(curls.place.topLeft.x, curls.place.topLeft.y, curls.place.topLeft.size); // top left curl
    ellipse(curls.place.bottomLeft.x, curls.place.bottomLeft.y, curls.place.bottomLeft.size); // bottom left curl
    ellipse(curls.place.topRight.x, curls.place.topRight.y, curls.place.topRight.size); // top right curl
    ellipse(curls.place.bottomRight.x, curls.place.bottomRight.y, curls.place.bottomRight.size); // bottom right curl
    ellipse(curls.place.end.x, curls.place.end.y, curls.place.end.size); // end curl
    pop();  
}

/**
 * Makes the curls (masks part of the black circles with bg colour circles)
*/
function maskCurls() {
    push();
    noStroke();
    fill(skyColourR, skyColourG, skyColourB); // blends in with background colour
    ellipse(curlMask.place.top.x, curlMask.place.top.y, curlMask.place.top.size); // top curl mask
    ellipse(curlMask.place.topLeft.x, curlMask.place.topLeft.y, curlMask.place.topLeft.size); // top left curl mask
    ellipse(curlMask.place.bottomLeft.x, curlMask.place.bottomLeft.y, curlMask.place.bottomLeft.size); // bottom left curl mask
    ellipse(curlMask.place.topRight.x, curlMask.place.topRight.y, curlMask.place.topRight.size); // top right curl mask
    ellipse(curlMask.place.bottomRight.x, curlMask.place.bottomRight.y, curlMask.place.bottomRight.size); // bottom right curl mask
    ellipse(curlMask.place.end.x, curlMask.place.end.y, curlMask.place.end.size); // end curl mask
    pop();
}

/**
 * Draws the slightly side-parted bangs (left and right side)
*/
function drawBangs() {
    push();
    noStroke();
    fill(hair.fill);
    ellipse(bang.left.x, bang.left.y, bang.left.size); // left bang
    ellipse(bang.right.x, bang.right.y, bang.right.width, bang.right.height); // right bang
    pop();
}

/**
 * Draws the ear
 */
function drawEar() {
    push();
    noStroke();
    fill(face.fill);
    ellipse(ear.x, ear.y, ear.size);
    pop();
}

/**
 * Draws the curl placement in front of the ear 
 */
function drawEarCurl() {
    push();
    noStroke();
    fill(hair.fill);
    ellipse(earCurl.x, earCurl.y, earCurl.size);
    pop();
}

/**
 * Makes the curl in front of the ear (uses the colour-masking method again)
 */
function maskEarlCurl() {
    push();
    noStroke();
    fill(face.fill);
    ellipse(earCurlMask.x, earCurlMask.y, earCurlMask.size);
    pop();
}

/**
 * Changes the background colour from blue (173, 216, 230) to green (163, 212, 104)
 * as the mouse moves from the left edge to the right edge of the canvas
 */
function changeSkyColour() {
    skyColourR = map(mouseX, 0, width, skyColour.blue.r, skyColour.green.r);
    skyColourG = map(mouseX, 0, width, skyColour.blue.g, skyColour.green.g);
    skyColourB = map(mouseX, 0, width, skyColour.blue.b, skyColour.green.b);
}