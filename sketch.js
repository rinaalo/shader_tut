const border = 20;
let exampleShader;

// load the shader
function preload() {
  exampleShader = loadShader('vertex.glsl', 'fragment.glsl');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  
  // use the shader
  shader(exampleShader);
  noStroke();
}

function draw() {
  background(0);
  exampleShader.setUniform('uTime', millis()/1000);
  //shader(exampleShader);
  // run shader by drawing something
  //rect(0, 0, width, height);
  ellipse(0, 0, width - border, height - border, 150);
  //plane(width, height);
}