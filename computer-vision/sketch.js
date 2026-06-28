// Computer Vision assignment - by Nicole
// this uses my webcam + the ml5 face detection model to find faces.
// my own system (the CHALLENGE) is a little "icebreaker" for a party:
// it counts the faces it sees and tells strangers when to say hi.

let video;
let faceApi;
let detections = [];

function setup() {
  createCanvas(640, 480);

  // turn on the webcam and hide the raw video (i draw it myself in draw())
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // start the ml5 Face API on the video
  const options = { withLandmarks: true, withDescriptors: false };
  faceApi = ml5.faceApi(video, options, modelReady);

  textAlign(CENTER, CENTER);
}

function modelReady() {
  console.log("Face API Ready!");
  faceApi.detect(gotFaces); // start looking for faces
}

function gotFaces(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  detections = results;       // remember the faces we found
  faceApi.detect(gotFaces);   // keep detecting over and over
}

function draw() {
  // show the webcam picture
  image(video, 0, 0, width, height);

  // draw a green box around each face
  if (detections.length > 0) {
    drawFaces(detections);
  }

  // my icebreaker system uses how many faces are in view
  drawIcebreaker(detections.length);
}

function drawFaces(detections) {
  for (let d of detections) {
    const { x, y, width, height } = d.alignedRect._box;
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    rect(x, y, width, height);
  }
}

// CHALLENGE: my own system - an icebreaker for strangers at a party.
// it changes its message based on how many faces (people) are in view.
function drawIcebreaker(faceCount) {
  // a dark banner across the top so the text is easy to read
  noStroke();
  fill(0, 160);
  rect(0, 0, width, 56);

  let message;
  if (faceCount === 0) {
    message = "Step in front of the camera...";
  } else if (faceCount === 1) {
    message = "1 person here - waiting for a stranger to join!";
  } else {
    message = faceCount + " strangers detected - say hi to each other!";
  }

  fill(255);
  textSize(22);
  text(message, width / 2, 28);
}
