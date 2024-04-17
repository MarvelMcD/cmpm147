// sketch.js - purpose and description here
// Author: Marvel McDowell
// Date: 4/16/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file


// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}
function setup() {  
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}


let seed = 6969;

const sandColor = "#87392a";
const skyColor = "#fa6f25";
const cloudColor = "#663730";
const cloudColor2 = "#592d2a";
const sunCoreColor ="#f9ba85";
const sunCoreCore = "#fff3ad";
const sunOuterColor = "#e9511e";
const waveColor = "#437d6c";

function setup() {
  createCanvas(400, 200);
  createButton("reimagine").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);

  background(100);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, height);
  
  fill(sunOuterColor);
  ellipse((200 + sin((2.5 * PI * millis()) / 2000.0) / 2), 100, 200, 30);
  fill(sunCoreColor);
  ellipse((200 + sin((2 * PI * millis()) / 1000.0) / 2), 100, 80, 15);
  fill(sunOuterColor);
  ellipse((200 + sin((2 * PI * millis()) / 2000.0) / 2) + seed * 40, 100, 200, 30);
  fill(sunCoreCore);
  ellipse((200 + noise((2 * PI * millis()) / 500000.0) * 20), 105, 50, 15);

  fill(sandColor);
  rect(0, height / 1.5, width, height / 3);

  fill(cloudColor);
  beginShape();
  vertex(0, (height /2));
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 10 - height / 50;
    vertex(x, y +2);
  }
  vertex(width, height / 2);
  endShape();
  
  fill(cloudColor);
  beginShape();
  vertex(0, (height /5));
  const steps3 = 10;
  for (let i = 0; i < steps3 + 1; i++) {
    let x = (width * i) / steps3;
    let y =
      height / 2 - (random() * random() * random() * height) / 10 - height / 50;
    vertex(x, y -50);
  }
  vertex(width, height / 5);
  endShape();
  
  fill(cloudColor2);
  beginShape();
  vertex(0, (height /2));
  const steps2 = 10;
  for (let i = 0; i < steps2 + 1; i++) {
    let x = (width * i) / steps2;
    let y =
      height / 2 - (random() * random() * random() * height) / 10 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2.5);
  endShape();
  
  fill(waveColor);
  rect(0, 128, width, 20);

  // let noiseScale = 0.02; // Adjust this for the scale of the waves
  // let noiseMax = 51; // Maximum value for noise amplitude
  // fill(waveColor);
  // beginShape();
  // for (let x = 0; x < width; x += 10) {
  //   let noiseValue = noise(x * noiseScale, millis() * 0.0001);
  //   let y = height / 1.5 + map(noiseValue, 0, 1, 0, noiseMax);
  //   y = constrain(y, height / 3.5, height); // Ensure y stays within the bottom half of the canvas
  //   vertex(x, y -10);
  // }
  // endShape();
  
  
  fill(waveColor);
  beginShape();
  for (let x = 0; x < width*2; x += 10) {
    let y = height / 2 + map(sin((x + millis()) * 0.0009), -1, 5, 50, 40);
    vertex(x, y);
  }
  endShape();
}