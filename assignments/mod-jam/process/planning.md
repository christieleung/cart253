## brainstorming

concept:
froggy food coma! / goodnight frog
- the frog can't fall asleep until its belly is full (catch 10 flies)

title screen:
- pond vibe!
- blue background
- lilypads
  - full circles (simple or with a central star pattern)?
  - pac-man arcs?
- ripples
  - on click, on hover, or appear randomly overtime?
  - one ring or concentric rings?
- title in center
- press space bar or click to continue (click anywhere? button?)

reworking title screen:
- instead of ripples (feels too realistic with current cutesy cartoon feel), add a fun pattern to the water
  - diagonal stripes! (sort of simulates ripples/current)
- make the lily pads spin!!! (floating)

instructions screen:
- frogs with instructional speech bubbles
  - three frog heads (3 ellipses for the head, 2 ellipses for the eyes)
    - one hungry (sad face, tear?): help me catch a fly
    - one back of head, tongue launched: how to catch a fly (controls)
    - one sleeping (closed eyes, smiling, with zzz): you win!
- press space bar or click to continue (again, click anywhere? button?)

ending:
- frog falls asleep!
- same sleepy frog as on instructions screen with zzz's above head
- maybe some text on screen? (goodnight!)
- darker background?
- cute snoring audio

scoring:
- progress bar 
  - rounded rectangle to match ellipses
  - top left corner
- tiny fly drawing at one end
- number at the other?

fly movement: 
- either perlin noise or oscillating in a sine function
  - leaning towards noise(), i like how organic it feels
- also add tiny wings to fly
  - two diagonal lines (keeping it simple!)

audio effects:
- fly buzzing
- tongue slurp
- snoring
- pond or soft background music?

control system:
- move the frog with the left and right arrow keys
- press space bar to launch tongue

other added features:
- some flies are trapped in bubbles
  - randomized chance
  - can't skip it since the bubble fly will bounce back?
  - thought about making these count for 2x points but doesn't make sense since the frog wouldn't feel fuller from popping a bubble
  - bubble popping sound

alternatively...
- help frog catch 10 flies to fall asleep before night falls
- implement a time limit (60 seconds?)
- background gets darker overtime (light to dark blue) 
- win = frog falls asleep 
- lose = frog is sad (animated tears?)