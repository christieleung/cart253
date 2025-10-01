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
    // tan
    fill: {
        r: 229,
        g: 194,
        b: 152
    },
    features: {
        // black
        strokeColour: {
            r: 0,
            g: 0,
            b: 0
        }, 
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
    // pink
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
    fill: {
        r: 0,
        g: 0,
        b: 0
    }
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

let dot = {
    // x-coordinates of dots (snow, flowers, rotating flowers)
    x: {
        first: 50,
        second: 75,
        third: 225,
        fourth: 235,
        fifth: 305,
        sixth: 365,
        seventh: 430,
        eighth: 455,
        ninth: 460
    },
    // y-coordinates of dots (snow, flowers, rotating flowers)
    y: {
        first: 65,
        second: 370,
        third: 445,
        fourth: 33,
        fifth: 300,
        sixth: 118,
        seventh: 395,
        eighth: 225,
        ninth: 45
    },
    fill: {
         // white
        snow: {
            r: 255,
            g: 255,
            b: 255
        }, 
        // yellow
        center: {
            r: 255,
            g: 222,
            b: 33
        } 
    },
    size: 12
}

let petal = {
    // pink
    fill: {
        r: 238,
        g: 135,
        b: 166
    },
    size: 10,
    offset: 11
}

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
    drawSnowOrFlower();
}

/**
 * Draws the face
*/
function drawFace() {
    push();
    noStroke();
    fill(face.fill.r, face.fill.g, face.fill.b);
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
 * Turns the cheeks a bit redder every time a key is pressed
 */
function keyPressed() {
    // Constrain g and b values to not go below 125 (min) or above 255 (max)
        cheeks.fill.g = constrain(cheeks.fill.g - 5, 125, 255); 
        cheeks.fill.b = constrain(cheeks.fill.b - 5, 125, 255);
}

/**
 * Draws the eyes (left and right)
 */
function drawEyes() {
    push();
    stroke(face.features.strokeColour.r, face.features.strokeColour.g, face.features.strokeColour.b);
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
    stroke(face.features.strokeColour.r, face.features.strokeColour.g, face.features.strokeColour.b);
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
    fill(hair.fill.r, hair.fill.g, hair.fill.b);
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
    fill(hair.fill.r, hair.fill.g, hair.fill.b); 
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
    fill(hair.fill.r, hair.fill.g, hair.fill.b);
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
    fill(face.fill.r, face.fill.g, face.fill.b);
    ellipse(ear.x, ear.y, ear.size);
    pop();
}

/**
 * Draws the curl placement in front of the ear 
 */
function drawEarCurl() {
    push();
    noStroke();
    fill(hair.fill.r, hair.fill.g, hair.fill.b);
    ellipse(earCurl.x, earCurl.y, earCurl.size);
    pop();
}

/**
 * Makes the curl in front of the ear (uses the colour-masking method again)
 */
function maskEarlCurl() {
    push();
    noStroke();
    fill(face.fill.r, face.fill.g, face.fill.b);
    ellipse(earCurlMask.x, earCurlMask.y, earCurlMask.size);
    pop();
}

/**
 * Changes the background colour from blue (173, 216, 230) to green (163, 212, 104)
 * as the mouse moves from the left edge to the right edge of the canvas
 */
function changeSkyColour() {
    // Constrain the colour change to the canvas width
    let constrainedMouseX = constrain(mouseX, 0, width); 
    
    skyColourR = map(constrainedMouseX, 0, width, skyColour.blue.r, skyColour.green.r);
    skyColourG = map(constrainedMouseX, 0, width, skyColour.blue.g, skyColour.green.g);
    skyColourB = map(constrainedMouseX, 0, width, skyColour.blue.b, skyColour.green.b);
}

/**
 * Draws the snow! (white dots)
 */
function drawSnow(x, y) {
    push();
    noStroke();
    fill(dot.fill.snow.r, dot.fill.snow.g, dot.fill.snow.b); 
    ellipse(x, y, dot.size); // white snow dot
    pop();
}

/**
 * Draws the flowers! (yellow centers, four pink petals)
 */
function drawFlower(x, y) {
    push();
    noStroke();
    fill(dot.fill.center.r, dot.fill.center.g, dot.fill.center.b);
    ellipse(x, y, dot.size); // yellow flower dot (center)
    fill(petal.fill.r, petal.fill.g, petal.fill.b);
    ellipse(x - petal.offset, y, petal.size); // left petal
    ellipse(x + petal.offset, y, petal.size); // right petal
    ellipse(x, y + petal.offset, petal.size); // top petal
    ellipse(x, y - petal.offset, petal.size); // bottom petal
    pop();
}

/**
 * Rotates the flowers!
 */
function rotateFlower(x, y) {
    push();
    // Change origin from (0,0) to (x, y) to rotate around dot position
    translate(x, y); 
    // Rotate based on the mouse's vertical position
    rotate(mouseY * 0.01); 
    noStroke();
    fill(dot.fill.center.r, dot.fill.center.g, dot.fill.center.b);
    // Change (x, y) in the ellipses to (0, 0) as origin has changed to dot position
    ellipse(0, 0, dot.size); // rotating flower dot (center)
    fill(petal.fill.r, petal.fill.g, petal.fill.b);
    ellipse(0 - petal.offset, 0, petal.size); // left petal
    ellipse(0 + petal.offset, 0, petal.size); // right petal
    ellipse(0, 0 + petal.offset, petal.size); // top petal
    ellipse(0, 0 - petal.offset, petal.size); // bottom petal
    pop();
}

/**
 * Draws either snow or a flower depending on where the mouse's horizontal position is along the canvas 
 * (move the mouse from left to right to change the snow into a flower and vice versa) 
 * Once all the snow has been transformed into flowers (after the ninth dot), the flowers can be
 * rotated using the mouse's vertical position (move the mouse up and down to spin!)
 */
function drawSnowOrFlower() {
    // The snow, flowers, and rotating flowers all have the same position values (same dot)
    
    let allFlowersOnScreen = mouseX >= dot.x.ninth;
    
    if (allFlowersOnScreen) {
        rotateFlower(dot.x.first, dot.y.first);
        rotateFlower(dot.x.second, dot.y.second);
        rotateFlower(dot.x.third, dot.y.third);
        rotateFlower(dot.x.fourth, dot.y.fourth);
        rotateFlower(dot.x.fifth, dot.y.fifth);
        rotateFlower(dot.x.sixth, dot.y.sixth);
        rotateFlower(dot.x.seventh, dot.y.seventh);
        rotateFlower(dot.x.eighth, dot.y.eighth);
        rotateFlower(dot.x.ninth, dot.y.ninth);
    }
    else {
        if (mouseX < dot.x.first) {
        drawSnow(dot.x.first, dot.y.first);
        } else {
        drawFlower(dot.x.first, dot.y.first);
        }

        if (mouseX < dot.x.second) {
        drawSnow(dot.x.second, dot.y.second);
        } else {
            drawFlower(dot.x.second, dot.y.second);
        }

        if (mouseX < dot.x.third) {
            drawSnow(dot.x.third, dot.y.third);
        } else {
            drawFlower(dot.x.third, dot.y.third);
        }

        if (mouseX < dot.x.fourth) {
            drawSnow(dot.x.fourth, dot.y.fourth);
        } else {
            drawFlower(dot.x.fourth, dot.y.fourth);
        }

        if (mouseX < dot.x.fifth) {
            drawSnow(dot.x.fifth, dot.y.fifth);
        } else {
            drawFlower(dot.x.fifth, dot.y.fifth);
        }

        if (mouseX < dot.x.sixth) {
            drawSnow(dot.x.sixth, dot.y.sixth);
        } else {
            drawFlower(dot.x.sixth, dot.y.sixth);
        }

        if (mouseX < dot.x.seventh) {
            drawSnow(dot.x.seventh, dot.y.seventh);
        } else {
            drawFlower(dot.x.seventh, dot.y.seventh);
        }

        if (mouseX < dot.x.eighth) {
            drawSnow(dot.x.eighth, dot.y.eighth);
        } else {
            drawFlower(dot.x.eighth, dot.y.eighth);
        }

        if (mouseX < dot.x.ninth) {
            drawSnow(dot.x.ninth, dot.y.ninth);
        } else {
            drawFlower(dot.x.ninth, dot.y.ninth);
        }
    }    
}


// Can't bring myself to delete this so I'm keeping the old blushing function here...
    /**
      * Checks if the mouse is within the face, and if it is, make the cheeks redder with every mouse press 
      */
// function mousePressed() {
//     // Get the distance between the mouse and the face
//     const d = dist(mouseX, mouseY, face.x, face.y);
//     // Check if there is overlap (the mouse is within the face)
//     const mouseIsInsideFace = (d <= face.size / 2);
//     if (mouseIsInsideFace) {
//         // If there is overlap, g and b values go down by 5 every time the mouse is pressed
//         // Constrain g and b values to not go below 125 (min) or above 255 (max)
//         cheeks.fill.g = constrain(cheeks.fill.g - 5, 125, 255); 
//         cheeks.fill.b = constrain(cheeks.fill.b - 5, 125, 255);   
//     }
// }