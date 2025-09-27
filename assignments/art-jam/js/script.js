/**
 * Self-Portrait
 * Christie Leung
 * 
 * My self-portrait!
 */

"use strict";

const face = {
    x: 165,
    y: 220,
    size: 180,
    fill: "#E5C298" // tan
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
            y: 170,
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
            y: 90,
            size: 80
        },
        bottomLeft: {
            x: 7,
            y: 165,
            size: 41
        },
        topRight: {
            x: 300,
            y: 150,
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
        x: 85,
        y: 175,
        size: 110
    },
    right: {
        x: 200,
        y: 145,
        width: 150,
        height: 100
    },
};

const ear = {
    x: 67,
    y: 265,
    size: 35
};

const earCurl = {
    x: 110,
    y: 250,
    size: 85
};

const earCurlMask = {
    x: 140,
    y: 230,
    size: 90
};


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
    background("#ADD8E6"); // temporary blue bg colour
  
    // drawEyes();
    // drawMouth();
    // drawCheeks();
    
    drawCurls();
    maskCurls();   
    drawHair();
    drawFace();
    drawEar();
    drawEarCurl();
    maskEarlCurl();
    drawBangs();
    
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
    fill("#ADD8E6");
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

