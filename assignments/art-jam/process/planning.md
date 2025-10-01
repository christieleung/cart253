# planning!!

# intital idea

my self-portrait is of me with my eyes closed, smiling, and surrounded by long, black hair

# interaction

some brainstorming:

> the hair is animated! flowing and the tiny curls are curling into spirals
> there are flowers on the canvas and when you either click on or hover over them, they spin, and as they spin, the rosy cheeks get rosier
> no extra elements on the canvas at first, but you can click to make flowers pop up
> there are polka dots floating in the background and maybe on top of the hair that fade in and out (glowing!), and when the mouse overlaps with the dots, they change colour

after a lot of deliberating, i've chosen to attempt:

> polka dots that turn into flowers!

    - they start to change as the mouse moves across the canvas
    - a winter into spring scene!! (which is fun because one of the characters of my chinese name means snow)
    - as the seasons change, the cheeks get rosier (happier because i love flowers)
    - the background colour changes too! (from light blue to light green?)

    > other possible interactions:
      - maybe as mouseX goes from left to right, the dots change into flowers and as mouseY goes up and down (constrained to the hair), the cheeks get redder because it simulates the hair being played with and that feels comforting and nice?
      - the cheeks get redder as you click on them to simulate being pinched

...feels a little ambitious considering my lack of js experience but i will try

# updated interaction

the above section was getting a little messy so here is the updated list of interactions:

> winter into spring scene:

    - changing background colour from light blue to light green using mouseX
    - changing snow into flowers using mouseX

> blushing:

    - changing the cheeks from light pink to a pinkish-red using keyPressed

> animated flowers:

    - rotating the flowers once they all appear on the canvas using mouseY

# things to do:

- draw face
  - circles for face, ears, and cheeks
  - arcs for the eyes and mouth
- draw hair
  - lots of circles layered on top of each other
  - for the curls, overlap circles (one hair colour, one background colour)
- draw polka dots
  - circles again!
- draw flowers
  - more circles!
- write conditional statements:
  - if mouseX moves across the canvas, then the snow will change into flowers
  - if mouseX moves across the canvas, then the sky colour will shift from blue to green
  <!-- - if the mouse is clicked, then the cheeks will turn redder (constrain to face) -->
  - if keyPressed, then the cheeks will turn redder
  - if mouseY moves up and down the canvas once all the flowers are displayed, then the flowers will rotate

# p5 functions to try?

- arc() for the facial features
- lerpColor() for transitioning the background colours
- map() for changing the background colours and dots into flowers
