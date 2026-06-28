// Sounds, Speech & Macros assignment - by Nicole
// this one sketch does all four things from the module:
//   1. listens to my microphone and grows a circle with the volume,
//      and turns the background red when it gets loud (the CHALLENGE)
//   2. a button plays a sound file (and i set the volume) (the CHALLENGE)
//   3. a button makes the computer talk out loud (text to speech)
//   4. holding the SPACEBAR turns what i say into text on screen (speech to text)

let mic;              // my microphone input
let mySound;          // the sound file the button plays
let recognition;      // the speech-to-text helper
let isListening = false;
let saidText = "";     // whatever the computer hears me say

function preload() {
  // load the sound once at the very start so it is ready to play
  mySound = loadSound("sound.wav");
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);

  // ---- microphone (part 1) ----
  mic = new p5.AudioIn();
  mic.start();

  // ---- buttons (part 2 and 3) ----
  let playButton = createButton("Play sound");
  playButton.mousePressed(playSound);

  let speakButton = createButton("Speak");
  speakButton.mousePressed(speak);

  // ---- speech to text (part 4) ----
  // webkitSpeechRecognition works in Chrome
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = function (event) {
      saidText = event.results[0][0].transcript;
    };
  }
}

function draw() {
  // get how loud the mic is right now (0 = quiet, 1 = loud)
  let volume = mic.getLevel();

  // CHALLENGE 1: change the background color based on the volume
  if (volume > 0.1) {
    background(255, 0, 0); // red when it is loud
  } else {
    background(0); // black when it is quiet
  }

  // draw a circle that grows when the mic gets louder
  let circleSize = map(volume, 0, 1, 20, 400);
  noStroke();
  fill(255, 220, 0);
  ellipse(width / 2, height / 2, circleSize, circleSize);

  // show what the computer heard me say
  fill(255);
  textSize(20);
  text(saidText, width / 2, height - 40);
  textSize(13);
  text("hold SPACEBAR and talk to turn speech into text", width / 2, height - 15);
}

// play the sound file. browsers need a click before any audio plays,
// so userStartAudio() wakes up the sound system first.
function playSound() {
  userStartAudio();
  mySound.setVolume(1.0); // CHALLENGE 2: i can change this number to make it louder/quieter
  mySound.play();
}

// make the computer say a sentence out loud (text to speech)
function speak() {
  let message = new SpeechSynthesisUtterance("hello, this is Nicole's sound sketch");
  message.rate = 1.0;  // how fast it talks
  message.pitch = 1.0; // how high or low it sounds
  window.speechSynthesis.speak(message);
}

// hold the spacebar down to start listening
function keyPressed() {
  if (keyCode === 32 && recognition && !isListening) {
    recognition.start();
    isListening = true;
  }
}

// let go of the spacebar to stop listening
function keyReleased() {
  if (keyCode === 32 && recognition && isListening) {
    recognition.stop();
    isListening = false;
  }
}
