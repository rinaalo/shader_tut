const border = 60;
let exampleShader;

// load the shader
function preload() {
  exampleShader = loadShader('vertex.glsl', 'fragment.glsl');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  shader(exampleShader);
  noStroke();
  console.log("Press 's' to save as a 10 second gif :3");
}

function keyPressed() {
  if (key === 's') {
    saveGif('capture.gif', 10);
  }
}

function draw() {
  background(0);
  exampleShader.setUniform('uWave', false);
  exampleShader.setUniform('uTime', millis()/1000);
  plane(width, height);
  exampleShader.setUniform('uWave', true);
  exampleShader.setUniform('uTime', -millis()/1000);
  ellipse(0, 0, width - border, height - border, 150);
}