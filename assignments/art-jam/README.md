Art Jam: Self-Portrait

Christie Leung

[View this project online](https://christieleung.github.io/cart253/assignments/art-jam/)

## Description

> - This program is an interactive self-portrait controlled by the mouse (x and y position) and keyboard ('c'/'C' and 'r'/'R')!

> - As the user moves the mouse from left to right, the seasons change from winter to spring, with each snowflake transforming into a pink flower, and the sky changing from a light blue to a light green.
> - Once all the flowers have bloomed, the user can now move the mouse up and down along the edge of (or on the white space outside) the canvas to rotate them.
> - The user is encouraged to go back and forth across the portrait! (Or stay in one season, or even an in-between state if they prefer that?)
> - At any time, the user can also make the blush more intense by pressing the 'c'/'C' key (turns redder in increments) and reset the colour by pressing the 'r'/'R' key.
> - This blushing function allows the user to create their own narrative! For example, starting with the reddest cheeks in winter and resetting it when spring arrives could reflect a change temperature whereas gradually making the cheeks redder as the flowers bloom could symbolize the character (me) becoming happier. The user can also just choose their own default blush shade since the level of redness stays until they reset it.

> - Note: I wanted to include winter and spring in this self-portrait because they feel personal to me. Snow is a character in my Chinese name (xue - 雪), and spring has been my favourite season since I was young. Plus, I wanted this project to feel whimsical and soft, and I think that flowers and spring are the embodiment of that (snowflakes too!).

## Screenshot(s)

> ![Image of winter, default blush](./assets/images/winter-normal-blush.jpeg)

> ![Image of mid-season transition (half-winter, half-spring) and medium blush](./assets/images/mid-medium-blush.jpeg)

> ![Image of spring, the reddest blush, and spinning flowers](./assets/images/spring-full-blush-spin.jpeg)

## Attribution

> - This project uses [p5.js](https://p5js.org)
> - New p5 functions I tried were: arc(), map(), translate(), and rotate()

> - While I was able to decipher arc() and map() from reading the p5 reference documents alone, I had to watch a YouTube video by The Coding Train (https://www.youtube.com/watch?v=o9sgjuh-CBM) to understand rotate(), and consequently, translate()

> - I also referenced other p5.js projects for parts of my code:
> - Crescent Moon, by kmaschmeyer (https://editor.p5js.org/kmaschmeyer/sketches/eoGKf6Djx): I used this colour-masking ellipse technique to draw the hair curls
> - Floral Pattern, by nhaninsummer (https://editor.p5js.org/nhaninsummer/sketches/th-vkqguc): I followed how they input (x,y) into their drawFlower function to draw petals using addition and subtraction in my own program, and seeing this project also made me realize how I could make the dot coordinates (for the snow, flowers, and rotating flowers) reusable

> - The key codes used in the blushing interaction are from: https://www.toptal.com/developers/keycode

## License

This project is licensed under a Creative Commons Attribution ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en)) license with the exception of libraries and other components with their own licenses.
