// P5 Intro assignment - by Nicole
// this is a little "mood light" that changes with the time
// and a shape that follows my mouse around.

// this variable remembers which shape to draw.
// it starts as a circle, and clicking the mouse switches it.
let shapeIsCircle = true;

function setup() {
  // setup only runs one time at the start
  createCanvas(600, 600); // make the drawing window 600 by 600
}

function draw() {
  // draw runs over and over again, so things can move and change

  // ---- COLORS + TIME ----
  // i use second() (0 to 59) to slowly change the background color.
  // map() turns the seconds into a number between 0 and 255 for the color.
  let s = second();
  let backgroundColor = map(s, 0, 59, 0, 255);
  background(backgroundColor, 120, 200); // R changes with time, G and B stay the same

  // CHALLENGE answer: a yellow background looks like background(255, 255, 0);

  // ---- THE SHAPE THAT FOLLOWS THE MOUSE ----
  // the size grows and shrinks using millis() (how long the sketch has run).
  // sin() makes it bounce smoothly instead of jumping.
  let size = 100 + sin(millis() / 300) * 50;

  stroke(255);     // white outline
  strokeWeight(4); // make the outline a bit thick
  fill(255, 200, 0); // a warm yellow fill for the light

  if (shapeIsCircle === true) {
    // draw a circle where the mouse is
    ellipse(mouseX, mouseY, size, size);
  } else {
    // or draw a square where the mouse is
    rectMode(CENTER); // so the square is centered on the mouse
    rect(mouseX, mouseY, size, size);
  }

  // ---- TEXT (advanced extra) ----
  // show the current time in the corner like a little clock
  noStroke();
  fill(255);
  textSize(20);
  text("time: " + hour() + ":" + minute() + ":" + second(), 20, 30);
  text("click to change the shape", 20, 580);

  // print the seconds to the console so i can watch it change (tip from the tutorial)
  print(second());
}

// mousePressed is a new function from the p5 reference (the ADVANCED part).
// it runs one time whenever i click the mouse.
function mousePressed() {
  // flip the shape from circle to square or back
  shapeIsCircle = !shapeIsCircle;
}
