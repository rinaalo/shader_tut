precision highp float;
#define INTENSITY 13.

attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform float uTime;
uniform bool uWave;

varying vec2 vTexCoord;
varying vec4 vVertexColor;

void main() {
  vec4 position = vec4(aPosition, 1.0);
  if (uWave) {
    position.xy += vec2(cos(uTime + position.y * INTENSITY)/INTENSITY,
                        sin(uTime + position.x * INTENSITY) / INTENSITY);
  }
  // Apply the camera transform
  vec4 viewModelPosition = uModelViewMatrix * position;
  // Position the vertex
  gl_Position = uProjectionMatrix * viewModelPosition;
  // Pass data to fragment shader
  vTexCoord = aTexCoord;
  vVertexColor = aVertexColor;
}