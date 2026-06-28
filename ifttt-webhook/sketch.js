// Webhooks assignment - by Nicole
// this connects my P5 sketch to a webhook so my sketch can talk to the web.
// pressing the UP arrow tells the webhook my smart lamp is ON, DOWN says OFF.
//
// NOTE: IFTTT webhooks now need a paid Pro plan, so i used Pipedream instead
// (free). it is the same idea as the tutorial: P5 sends an http request to a
// webhook URL, and the webhook runs an action (it emails me).
//
// my "new way": i also drew a lightbulb i can CLICK to toggle the lamp, and
// the whole canvas glows so i can see the light state on screen.

// my secret webhook URL comes from config.js (not uploaded to github)
let webhookURL = config.WEBHOOK_URL;

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

// my "new way" - clicking the mouse also controls the lamp
function mousePressed() {
  if (lightOn === true) {
    turnOff();
  } else {
    turnOn();
  }
}

// send the webhook request that means "lamp on".
// i add ?state=on to the end so my webhook knows which thing happened.
function turnOn() {
  httpGet(webhookURL + "?state=on");
  lightOn = true;
  print("sent state=on to my webhook"); // so i can check it in the console
}

// send the webhook request that means "lamp off"
function turnOff() {
  httpGet(webhookURL + "?state=off");
  lightOn = false;
  print("sent state=off to my webhook");
}
