const border = 60;
let exampleShader;

let recording = false;
let recorder;
let chunks = [];

const frameRate = 60;

function keyPressed() {
  if (key === 's') {
    saveGif('capture.gif', 10);
  }

  if (key === 'r') {
    if (recording) {
      // stop recording
      console.log("Stopped recording");
      recorder.stop();
    } else {
      // start
      console.log("Started recording");
      recorder.start();
    }
    recording = !recording;
  }

}

function initRecorder() {
  chunks.length = 0;

  let stream = document.querySelector('canvas').captureStream(frameRate);

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };

  recorder.onstop = exportVideo;
}

function exportVideo(e) {
  const blob = new Blob(chunks, {type: 'video/webm'});

  // Draw video to screen
  const videoElement = document.createElement('video');
  videoElement.setAttribute('id', Date.now());
  videoElement.controls = true;
  document.body.appendChild(videoElement);
  videoElement.src = window.URL.createObjectURL(blob);

  // Download the video
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'recording.webm';
  a.click();
  window.URL.revokeObjectURL(url);
}

function preload() {
  exampleShader = loadShader('vertex.glsl', 'fragment.glsl');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  shader(exampleShader);
  noStroke();
  initRecorder();
  console.log("Press 's' to save as a 10 second gif :3");
  console.log("Press 'r' to begin and end a video recording >:3");

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