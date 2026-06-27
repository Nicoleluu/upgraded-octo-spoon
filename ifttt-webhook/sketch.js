// Webhooks assignment - by Nicole
// this connects my P5 sketch to IFTTT with a webhook.
// pressing the UP arrow turns my smart plug ON, DOWN turns it OFF.
// my "new way": i also drew a lightbulb that i can CLICK to toggle the lamp,
// and the whole canvas glows so i can see the light state on screen.

// my secret webhooks key comes from config.js (not uploaded to github)
let apiKey = config.IFTTT_KEY;

// these are the two event names i made in IFTTT
let eventOn = "turn_on";
let eventOff = "turn_off";

// this remembers if the lamp is on, so the screen can show it
let lightOn = false;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER); // so my text lines up in the middle
}

function draw() {
  // the background glows yellow when the lamp is on, dark when it is off
  if (lightOn === true) {
    background(255, 214, 10);
  } else {
    background(20);
  }

  // ---- draw a simple lightbulb in the middle ----
  // the glass part (a circle)
  if (lightOn === true) {
    fill(255, 255, 200); // bright glass when on
  } else {
    fill(90); // dull grey glass when off
  }
  stroke(0);
  strokeWeight(3);
  ellipse(width / 2, 180, 120, 120);

  // the metal base of the bulb (a little rectangle)
  fill(120);
  rectMode(CENTER);
  rect(width / 2, 250, 50, 40);

  // ---- text so i know what to do ----
  noStroke();
  if (lightOn === true) {
    fill(0);
    text("LAMP IS ON", width / 2, 320);
  } else {
    fill(255);
    text("LAMP IS OFF", width / 2, 320);
  }
  text("UP = on   /   DOWN = off   /   click bulb to toggle", width / 2, 360);
}

// keyPressed runs once each time i press a key (from the tutorial)
function keyPressed() {
  if (keyCode === UP_ARROW) {
    turnOn();
  } else if (keyCode === DOWN_ARROW) {
    turnOff();
  }
}

// my "new way" - clicking the mouse also controls the real lamp
function mousePressed() {
  if (lightOn === true) {
    turnOff();
  } else {
    turnOn();
  }
}

// send the webhook that turns the plug ON
function turnOn() {
  httpGet("https://maker.ifttt.com/trigger/" + eventOn + "/with/key/" + apiKey);
  lightOn = true;
  print("sent turn_on to IFTTT"); // so i can check it in the console
}

// send the webhook that turns the plug OFF
function turnOff() {
  httpGet("https://maker.ifttt.com/trigger/" + eventOff + "/with/key/" + apiKey);
  lightOn = false;
  print("sent turn_off to IFTTT");
}
